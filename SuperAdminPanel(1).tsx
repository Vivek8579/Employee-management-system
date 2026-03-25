// SuperAdminPanel.tsx
// Root super admin component — composes StatsGrid, AttendanceTable, and AdminStatusGrid.
// This is the only file that needs to be imported in AttendanceTracker.tsx.

import React from 'react';
import StatsGrid from './StatsGrid';
import AttendanceTable from './AttendanceTable';
import AdminStatusGrid from './AdminStatusGrid';
import { SuperAdminPanelProps } from './superAdminTypes';

const SuperAdminPanel: React.FC<SuperAdminPanelProps> = ({
  stats,
  attendanceData,
  allAdmins,
  todayAttendance,
  selectedDate,
  setSelectedDate,
  selectedAdminForExport,
  setSelectedAdminForExport,
  onExportCSV,
  showOverrideDialog,
  setShowOverrideDialog,
  selectedRecordForOverride,
  setSelectedRecordForOverride,
  overrideStatus,
  setOverrideStatus,
  overrideReason,
  setOverrideReason,
  onOverride,
  isLoading,
}) => (
  <>
    {/* Row of 5 summary stat cards */}
    <StatsGrid stats={stats} />

    {/* Date-filtered records table with export + override */}
    <AttendanceTable
      attendanceData={attendanceData}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      selectedAdminForExport={selectedAdminForExport}
      setSelectedAdminForExport={setSelectedAdminForExport}
      allAdmins={allAdmins}
      onExportCSV={onExportCSV}
      showOverrideDialog={showOverrideDialog}
      setShowOverrideDialog={setShowOverrideDialog}
      selectedRecordForOverride={selectedRecordForOverride}
      setSelectedRecordForOverride={setSelectedRecordForOverride}
      overrideStatus={overrideStatus}
      setOverrideStatus={setOverrideStatus}
      overrideReason={overrideReason}
      setOverrideReason={setOverrideReason}
      onOverride={onOverride}
      isLoading={isLoading}
    />

    {/* Grid showing today's status for every admin */}
    <AdminStatusGrid allAdmins={allAdmins} todayAttendance={todayAttendance} />
  </>
);

export default SuperAdminPanel;
