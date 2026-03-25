// attendanceUtils.ts
// Pure helper functions for AttendanceTracker
// Includes original helpers + NEW: streak calculator, weekly summary, search filter

import React from 'react';
import { Check, X, Clock, AlertCircle } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachWeekOfInterval } from 'date-fns';
import {
  AttendanceRecord,
  MonthlyStats,
  AttendanceStats,
  StreakInfo,
  WeeklySummary,
  TIME_WINDOWS,
} from './attendanceTypes';

// ── Time helpers ─────────────────────────────────────────────────────────────

export const getCurrentTimeBasedStatus = (date = new Date()): string => {
  const totalMinutes = date.getHours() * 60 + date.getMinutes();
  if (totalMinutes >= TIME_WINDOWS.PRESENT_START && totalMinutes < TIME_WINDOWS.PRESENT_END) return 'present';
  if (totalMinutes >= TIME_WINDOWS.PRESENT_END && totalMinutes < TIME_WINDOWS.LATE_END) return 'late';
  return 'absent';
};

export const getTimeBasedMessage = () => {
  const hours = new Date().getHours();
  if (hours >= 6 && hours < 11)  return { status: 'Present', message: 'Mark now',                  color: 'text-blue-500' };
  if (hours >= 11 && hours < 17) return { status: 'Late',    message: 'Late',                       color: 'text-gray-400' };
  if (hours >= 17)               return { status: 'Absent',  message: 'Absent',                     color: 'text-gray-500' };
  return                                { status: 'Early',   message: 'Attendance opens at 6 AM',   color: 'text-gray-500' };
};

// ── Badge / icon helpers ──────────────────────────────────────────────────────

export const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case 'present': return 'bg-blue-500 text-white border-blue-500';
    case 'absent':  return 'bg-gray-700 text-white border-gray-700';
    case 'late':    return 'bg-gray-500 text-white border-gray-500';
    default:        return 'bg-gray-600 text-white border-gray-600';
  }
};

export const getStatusIcon = (status: string): React.ReactElement => {
  switch (status) {
    case 'present': return <Check className="h-4 w-4" />;
    case 'absent':  return <X className="h-4 w-4" />;
    case 'late':    return <Clock className="h-4 w-4" />;
    default:        return <AlertCircle className="h-4 w-4" />;
  }
};

// ── Stats calculators ─────────────────────────────────────────────────────────

export const computeMonthlyStats = (
  monthlyAttendance: any[],
  selectedMonth: Date,
  adminId?: string
): MonthlyStats => {
  const records = adminId
    ? monthlyAttendance.filter(a => a.admin_id === adminId)
    : monthlyAttendance;

  const present = records.filter(a => a.status === 'present').length;
  const late    = records.filter(a => a.status === 'late').length;

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === selectedMonth.getMonth() &&
    today.getFullYear() === selectedMonth.getFullYear();

  const totalDays = isCurrentMonth ? today.getDate() : endOfMonth(selectedMonth).getDate();
  const absent    = Math.max(totalDays - (present + late), 0);
  const score     = present + late * 0.5;
  const percentage = totalDays > 0 ? Math.round((score / totalDays) * 100) : 0;

  return { present, late, absent, totalDays, score, percentage };
};

export const computeAttendanceStats = (allAdmins: any[], todayAttendance: any[]): AttendanceStats => {
  const total      = allAdmins.length;
  const present    = todayAttendance.filter(a => a.status === 'present').length;
  const absent     = todayAttendance.filter(a => a.status === 'absent').length;
  const late       = todayAttendance.filter(a => a.status === 'late').length;
  const notMarked  = total - todayAttendance.length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
  return { total, present, absent, late, notMarked, percentage };
};

// ── NEW: Streak calculator ────────────────────────────────────────────────────
/**
 * Calculates the current consecutive attendance streak and the longest streak
 * in the selected month for the given admin's records.
 */
export const computeStreakInfo = (
  monthlyAttendance: any[],
  adminId: string,
  selectedMonth: Date
): StreakInfo => {
  const records = monthlyAttendance
    .filter(a => a.admin_id === adminId && (a.status === 'present' || a.status === 'late'))
    .map(a => a.date)
    .sort();

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === selectedMonth.getMonth() &&
    today.getFullYear() === selectedMonth.getFullYear();

  const totalDays = isCurrentMonth ? today.getDate() : endOfMonth(selectedMonth).getDate();
  const monthStart = startOfMonth(selectedMonth);

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = format(new Date(monthStart.getFullYear(), monthStart.getMonth(), d), 'yyyy-MM-dd');
    if (records.includes(dateStr)) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  // Current streak = consecutive days ending at today/last day
  tempStreak = 0;
  for (let d = totalDays; d >= 1; d--) {
    const dateStr = format(new Date(monthStart.getFullYear(), monthStart.getMonth(), d), 'yyyy-MM-dd');
    if (records.includes(dateStr)) {
      tempStreak++;
    } else {
      break;
    }
  }
  currentStreak = tempStreak;

  return { currentStreak, longestStreak };
};

// ── NEW: Weekly summary ───────────────────────────────────────────────────────
/**
 * Breaks the selected month's attendance into week-by-week summary buckets.
 */
export const computeWeeklySummary = (
  monthlyAttendance: any[],
  selectedMonth: Date,
  adminId?: string
): WeeklySummary[] => {
  const records = adminId
    ? monthlyAttendance.filter(a => a.admin_id === adminId)
    : monthlyAttendance;

  const monthStart = startOfMonth(selectedMonth);
  const monthEnd   = endOfMonth(selectedMonth);
  const weeks      = eachWeekOfInterval({ start: monthStart, end: monthEnd }, { weekStartsOn: 1 });

  return weeks.map((weekStart, i) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    const weekRecords = records.filter(a => a.date >= format(weekStart, 'yyyy-MM-dd') && a.date <= format(weekEnd, 'yyyy-MM-dd'));
    return {
      week: `Week ${i + 1}`,
      present: weekRecords.filter(a => a.status === 'present').length,
      late:    weekRecords.filter(a => a.status === 'late').length,
      absent:  weekRecords.filter(a => a.status === 'absent').length,
    };
  });
};

// ── NEW: Search / filter helper ───────────────────────────────────────────────
/**
 * Filters an array of AttendanceRecords by a search term matching admin name,
 * email, role, or status. Case-insensitive.
 */
export const filterAttendanceRecords = (
  records: AttendanceRecord[],
  searchTerm: string
): AttendanceRecord[] => {
  if (!searchTerm.trim()) return records;
  const q = searchTerm.toLowerCase();
  return records.filter(r =>
    r.admin?.name?.toLowerCase().includes(q) ||
    r.admin?.email?.toLowerCase().includes(q) ||
    r.admin?.role?.toLowerCase().includes(q) ||
    r.status?.toLowerCase().includes(q)
  );
};

// ── CSV builder ───────────────────────────────────────────────────────────────
export const buildAndDownloadCSV = (
  data: any[],
  allAdmins: any[],
  adminId: string | undefined,
  selectedMonth: Date
) => {
  const headers = ['Date', 'Admin Name', 'Email', 'Role', 'Status', 'Check-in Time', 'Reason'];
  const rows = (data || []).map(record => [
    record.date,
    record.admin?.name || 'Unknown',
    record.admin?.email || '',
    record.admin?.role?.replace('_', ' ') || '',
    record.status,
    record.marked_at ? format(new Date(record.marked_at), 'HH:mm:ss') : '',
    record.reason || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href  = url;
  const adminName = adminId ? allAdmins.find(a => a.id === adminId)?.name || 'admin' : 'all-admins';
  link.download = `attendance-${adminName}-${format(selectedMonth, 'yyyy-MM')}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
