// useAttendance.ts
// Unified custom React hook — combines all data fetching, actions, and NEW features:
//   • search/filter state
//   • streak calculation
//   • weekly summary
//   • refresh / auto-refresh every 60s

import { useState, useEffect, useCallback } from 'react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useActivityLogger } from '@/hooks/useActivityLogger';
import {
  AttendanceRecord,
  MonthlyStats,
  AttendanceStats,
  StreakInfo,
  WeeklySummary,
} from './attendanceTypes';
import {
  getCurrentTimeBasedStatus,
  computeMonthlyStats,
  computeAttendanceStats,
  computeStreakInfo,
  computeWeeklySummary,
  buildAndDownloadCSV,
  filterAttendanceRecords,
} from './attendanceUtils';

interface UseAttendanceProps {
  adminProfile: any;
  isSuperAdmin: boolean;
  selectedDate: Date;
  selectedMonth: Date;
}

export const useAttendance = ({
  adminProfile,
  isSuperAdmin,
  selectedDate,
  selectedMonth,
}: UseAttendanceProps) => {
  const { toast } = useToast();
  const { logActivity } = useActivityLogger();

  // ── Raw data state ─────────────────────────────────────────────────────────
  const [attendanceData,    setAttendanceData]    = useState<AttendanceRecord[]>([]);
  const [allAdmins,         setAllAdmins]         = useState<any[]>([]);
  const [todayAttendance,   setTodayAttendance]   = useState<any[]>([]);
  const [myAttendance,      setMyAttendance]      = useState<any>(null);
  const [monthlyAttendance, setMonthlyAttendance] = useState<any[]>([]);
  const [isLoading,         setIsLoading]         = useState(false);

  // ── Override dialog state ─────────────────────────────────────────────────
  const [showOverrideDialog,        setShowOverrideDialog]        = useState(false);
  const [selectedRecordForOverride, setSelectedRecordForOverride] = useState<AttendanceRecord | null>(null);
  const [overrideStatus,            setOverrideStatus]            = useState<string>('present');
  const [overrideReason,            setOverrideReason]            = useState<string>('');

  // ── Export state ───────────────────────────────────────────────────────────
  const [selectedAdminForExport, setSelectedAdminForExport] = useState<string>('');

  // ── NEW: Search state ──────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState<string>('');

  // ── NEW: Last refreshed timestamp ─────────────────────────────────────────
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // ── Fetch functions ───────────────────────────────────────────────────────

  const fetchAdmins = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('admins').select('*').eq('is_active', true);
      if (error) throw error;
      setAllAdmins(data || []);
    } catch (err) {
      console.error('Error fetching admins:', err);
    }
  }, []);

  const fetchAttendanceData = useCallback(async () => {
    if (!isSuperAdmin) return;
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const { data, error } = await supabase
        .from('attendance')
        .select('*, admin:admins!admin_id(name, email, role)')
        .eq('date', dateStr)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setAttendanceData(data || []);
    } catch (err) {
      console.error('Error fetching attendance data:', err);
    }
  }, [isSuperAdmin, selectedDate]);

  const fetchTodayAttendance = useCallback(async () => {
    if (!isSuperAdmin) return;
    try {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      const { data, error } = await supabase
        .from('attendance')
        .select('*, admin:admins!admin_id(name, email, role)')
        .eq('date', todayStr);
      if (error) throw error;
      setTodayAttendance(data || []);
    } catch (err) {
      console.error('Error fetching today attendance:', err);
    }
  }, [isSuperAdmin]);

  const fetchMyAttendance = useCallback(async () => {
    if (!adminProfile) return;
    try {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('admin_id', adminProfile.id)
        .eq('date', todayStr)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      setMyAttendance(data);
    } catch (err) {
      console.error('Error fetching my attendance:', err);
    }
  }, [adminProfile]);

  const fetchMonthlyAttendance = useCallback(async () => {
    if (!adminProfile) return;
    try {
      const monthStart = format(startOfMonth(selectedMonth), 'yyyy-MM-dd');
      const monthEnd   = format(endOfMonth(selectedMonth), 'yyyy-MM-dd');
      let query = supabase.from('attendance').select('*').gte('date', monthStart).lte('date', monthEnd);
      if (!isSuperAdmin) query = query.eq('admin_id', adminProfile.id);
      const { data, error } = await query;
      if (error) throw error;
      setMonthlyAttendance(data || []);
    } catch (err) {
      console.error('Error fetching monthly attendance:', err);
    }
  }, [adminProfile, isSuperAdmin, selectedMonth]);

  // ── NEW: Refresh all data ─────────────────────────────────────────────────
  const refreshAll = useCallback(() => {
    fetchAdmins();
    fetchAttendanceData();
    fetchTodayAttendance();
    fetchMyAttendance();
    fetchMonthlyAttendance();
    setLastRefreshed(new Date());
  }, [fetchAdmins, fetchAttendanceData, fetchTodayAttendance, fetchMyAttendance, fetchMonthlyAttendance]);

  // ── Auto-refresh every 60 seconds ─────────────────────────────────────────
  useEffect(() => {
    if (!adminProfile) return;
    refreshAll();
    const interval = setInterval(refreshAll, 60_000);
    return () => clearInterval(interval);
  }, [selectedDate, selectedMonth, adminProfile]);

  // ── Actions ───────────────────────────────────────────────────────────────

  const markAttendance = async (reason: string, onSuccess: () => void) => {
    if (!adminProfile) return;
    const currentHour = new Date().getHours();
    if (currentHour < 6) {
      toast({ title: 'Too Early', description: 'Attendance marking opens at 6 AM', variant: 'destructive' });
      return;
    }

    const status   = getCurrentTimeBasedStatus(new Date());
    const todayStr = format(new Date(), 'yyyy-MM-dd');

    try {
      setIsLoading(true);
      const { data: existing } = await supabase
        .from('attendance').select('id').eq('admin_id', adminProfile.id).eq('date', todayStr).single();

      if (existing) {
        toast({ title: 'Already Marked', description: 'Your attendance for today has already been recorded' });
        return;
      }

      const { error } = await supabase.from('attendance').insert({
        admin_id: adminProfile.id,
        date: todayStr,
        status,
        reason: reason || null,
        marked_by: adminProfile.id,
        marked_at: new Date().toISOString(),
        check_in_time: new Date().toISOString(),
      } as any);
      if (error) throw error;

      await logActivity('Marked attendance', { status, date: todayStr, time: format(new Date(), 'HH:mm:ss'), reason: reason || undefined });

      toast({
        title: 'Attendance Marked',
        description: `Marked as "${status.charAt(0).toUpperCase() + status.slice(1)}"`,
      });

      onSuccess();
      fetchMyAttendance();
      fetchMonthlyAttendance();
      if (isSuperAdmin) { fetchAttendanceData(); fetchTodayAttendance(); }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to mark attendance', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const overrideAttendanceStatus = async () => {
    if (!adminProfile || !isSuperAdmin || !selectedRecordForOverride) return;
    if (!overrideReason.trim()) {
      toast({ title: 'Error', description: 'Please provide a reason for the override', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.from('attendance').update({
        status: overrideStatus,
        override_status: overrideStatus,
        override_reason: overrideReason,
        overridden_by: adminProfile.id,
        overridden_at: new Date().toISOString(),
      } as any).eq('id', selectedRecordForOverride.id);
      if (error) throw error;

      await logActivity('Overrode attendance status', {
        admin: selectedRecordForOverride.admin?.name,
        date: selectedRecordForOverride.date,
        old_status: selectedRecordForOverride.status,
        new_status: overrideStatus,
        reason: overrideReason,
      });

      toast({
        title: 'Attendance Updated',
        description: `Status changed to ${overrideStatus} for ${selectedRecordForOverride.admin?.name}`,
      });

      setShowOverrideDialog(false);
      setSelectedRecordForOverride(null);
      setOverrideStatus('present');
      setOverrideReason('');
      fetchAttendanceData();
      fetchTodayAttendance();
      fetchMonthlyAttendance();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to update attendance', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const exportAttendanceCSV = async (adminId?: string) => {
    try {
      const monthStart = format(startOfMonth(selectedMonth), 'yyyy-MM-dd');
      const monthEnd   = format(endOfMonth(selectedMonth), 'yyyy-MM-dd');
      let query = supabase.from('attendance')
        .select('*, admin:admins!admin_id(name, email, role)')
        .gte('date', monthStart).lte('date', monthEnd).order('date', { ascending: true });
      if (adminId) query = query.eq('admin_id', adminId);
      const { data, error } = await query;
      if (error) throw error;
      buildAndDownloadCSV(data, allAdmins, adminId, selectedMonth);
      toast({ title: 'Export Complete', description: 'Attendance data exported successfully' });
    } catch {
      toast({ title: 'Export Failed', description: 'Failed to export attendance data', variant: 'destructive' });
    }
  };

  // ── Derived data ──────────────────────────────────────────────────────────
  const myStats:     MonthlyStats    = computeMonthlyStats(monthlyAttendance, selectedMonth, adminProfile?.id);
  const stats:       AttendanceStats = computeAttendanceStats(allAdmins, todayAttendance);

  // NEW: streak and weekly summary
  const streakInfo:     StreakInfo      = adminProfile
    ? computeStreakInfo(monthlyAttendance, adminProfile.id, selectedMonth)
    : { currentStreak: 0, longestStreak: 0 };

  const weeklySummary: WeeklySummary[] = computeWeeklySummary(monthlyAttendance, selectedMonth, adminProfile?.id);

  // NEW: filtered records for the table (search applied)
  const filteredAttendanceData = filterAttendanceRecords(attendanceData, searchTerm);

  return {
    // raw data
    attendanceData,
    filteredAttendanceData,
    allAdmins,
    todayAttendance,
    myAttendance,
    monthlyAttendance,
    isLoading,
    lastRefreshed,

    // derived
    myStats,
    stats,
    streakInfo,
    weeklySummary,

    // search
    searchTerm,
    setSearchTerm,

    // override dialog
    showOverrideDialog,    setShowOverrideDialog,
    selectedRecordForOverride, setSelectedRecordForOverride,
    overrideStatus,        setOverrideStatus,
    overrideReason,        setOverrideReason,

    // export
    selectedAdminForExport, setSelectedAdminForExport,

    // actions
    markAttendance,
    overrideAttendanceStatus,
    exportAttendanceCSV,
    refreshAll,
  };
};
