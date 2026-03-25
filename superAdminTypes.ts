// superAdminTypes.ts
// All TypeScript interfaces used across the SuperAdmin panel components

import { AttendanceRecord } from '../types';

export interface AdminStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  notMarked: number;
  percentage: number;
}

export interface OverrideDialogState {
  showOverrideDialog: boolean;
  setShowOverrideDialog: (open: boolean) => void;
  selectedRecordForOverride: AttendanceRecord | null;
  setSelectedRecordForOverride: (record: AttendanceRecord | null) => void;
  overrideStatus: string;
  setOverrideStatus: (status: string) => void;
  overrideReason: string;
  setOverrideReason: (reason: string) => void;
  onOverride: () => void;
  isLoading: boolean;
}

export interface ExportControlsProps {
  selectedMonth?: Date;
  selectedAdminForExport: string;
  setSelectedAdminForExport: (id: string) => void;
  allAdmins: any[];
  onExportCSV: (adminId?: string) => void;
}

export interface SuperAdminPanelProps extends OverrideDialogState, ExportControlsProps {
  stats: AdminStats;
  attendanceData: AttendanceRecord[];
  allAdmins: any[];
  todayAttendance: any[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}
