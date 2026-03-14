// AttendanceTracker.tsx
// Root component — composes all sub-components and hooks for the Attendance Tracker module.
// Contributors: [Your Name], [Friend's Name]

import React, { useState } from 'react';
import ModuleLayout from '@/components/ModuleLayout';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

import { useAttendanceData } from './useAttendanceData';
import { useAttendanceActions } from './useAttendanceActions';
import { computeMonthlyStats, computeAttendanceStats, getTimeBasedMessage } from './utils';

import MarkAttendanceCard from './MarkAttendanceCard';
import MonthlyStatsCard from './MonthlyStatsCard';
import SuperAdminPanel from './SuperAdminPanel';

const AttendanceTracker: React.FC = () => {
  const { adminProfile } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [reason, setReason] = useState('');
  const [selectedAdminForExport, setSelectedAdminForExport] = useState<string>('');

  const today = new Date();
  const isSuperAdmin = adminProfile?.role === 'super_admin';

  // ── Data fetching ──────────────────────────────────────────────────────────
  const {
    attendanceData,
    allAdmins,
    todayAttendance,
    myAttendance,
    monthlyAttendance,
    fetchAttendanceData,
    fetchTodayAttendance,
    fetchMyAttendance,
    fetchMonthlyAttendance,
  } = useAttendanceData({ adminProfile, isSuperAdmin, selectedDate, selectedMonth });

  // ── Derived stats ──────────────────────────────────────────────────────────
  const myStats = computeMonthlyStats(monthlyAttendance, selectedMonth, adminProfile?.id);
  const stats = computeAttendanceStats(allAdmins, todayAttendance);
  const timeInfo = getTimeBasedMessage();

  // ── Actions ────────────────────────────────────────────────────────────────
  const {
    isLoading,
    showOverrideDialog, setShowOverrideDialog,
    selectedRecordForOverride, setSelectedRecordForOverride,
    overrideStatus, setOverrideStatus,
    overrideReason, setOverrideReason,
    markAttendance,
    overrideAttendanceStatus,
    exportAttendanceCSV,
  } = useAttendanceActions({
    adminProfile,
    isSuperAdmin,
    selectedMonth,
    allAdmins,
    fetchAttendanceData,
    fetchTodayAttendance,
    fetchMyAttendance,
    fetchMonthlyAttendance,
  });

  const handleMarkAttendance = () => {
    const isToday = format(selectedDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
    if (!isToday) return;
    markAttendance(reason, () => setReason(''));
  };

  return (
    <ModuleLayout
      title="Attendance Tracker"
      description="Mark daily attendance with time-based status and view your attendance reports"
    >
      <div className="space-y-6">
        {/* Personal attendance section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarkAttendanceCard
            today={today}
            timeInfo={timeInfo}
            myAttendance={myAttendance}
            isLoading={isLoading}
            reason={reason}
            setReason={setReason}
            onMarkAttendance={handleMarkAttendance}
          />
          <MonthlyStatsCard
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            myStats={myStats}
          />
        </div>

        {/* Super admin section */}
        {isSuperAdmin && (
          <SuperAdminPanel
            stats={stats}
            attendanceData={attendanceData}
            allAdmins={allAdmins}
            todayAttendance={todayAttendance}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedAdminForExport={selectedAdminForExport}
            setSelectedAdminForExport={setSelectedAdminForExport}
            onExportCSV={exportAttendanceCSV}
            showOverrideDialog={showOverrideDialog}
            setShowOverrideDialog={setShowOverrideDialog}
            selectedRecordForOverride={selectedRecordForOverride}
            setSelectedRecordForOverride={setSelectedRecordForOverride}
            overrideStatus={overrideStatus}
            setOverrideStatus={setOverrideStatus}
            overrideReason={overrideReason}
            setOverrideReason={setOverrideReason}
            onOverride={overrideAttendanceStatus}
            isLoading={isLoading}
          />
        )}
      </div>
    </ModuleLayout>
  );
};

export default AttendanceTracker;
