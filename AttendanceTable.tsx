// AttendanceTable.tsx
// UI component — table listing all attendance records for the selected date,
// with an Override button on each row.

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';
import { format } from 'date-fns';
import { AttendanceRecord } from '../types';
import { getStatusBadgeClass } from '../utils';
import { getStatusIcon, formatStatusLabel } from './superAdminUtils';
import { OverrideDialogState } from './superAdminTypes';
import OverrideDialog from './OverrideDialog';
import DatePickerButton from './DatePickerButton';
import ExportControls from './ExportControls';

interface AttendanceTableProps extends OverrideDialogState {
  attendanceData: AttendanceRecord[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedAdminForExport: string;
  setSelectedAdminForExport: (id: string) => void;
  allAdmins: any[];
  onExportCSV: (adminId?: string) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendanceData,
  selectedDate,
  setSelectedDate,
  selectedAdminForExport,
  setSelectedAdminForExport,
  allAdmins,
  onExportCSV,
  ...overrideProps
}) => (
  <Card className="bg-gray-900/50 border-gray-800">
    <CardHeader>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <CardTitle className="text-white">Attendance Records</CardTitle>
        <div className="flex gap-2 flex-wrap">
          <DatePickerButton selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <ExportControls
            selectedAdminForExport={selectedAdminForExport}
            setSelectedAdminForExport={setSelectedAdminForExport}
            allAdmins={allAdmins}
            onExportCSV={onExportCSV}
          />
        </div>
      </div>
    </CardHeader>

    <CardContent>
      {attendanceData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No attendance records for {format(selectedDate, 'PPP')}</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Admin</TableHead>
              <TableHead className="text-gray-400">Role</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Check-in Time</TableHead>
              <TableHead className="text-gray-400">Reason</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((record) => (
              <TableRow key={record.id} className="border-gray-800">
                <TableCell className="text-white font-medium">
                  {record.admin?.name || 'Unknown'}
                </TableCell>
                <TableCell className="text-gray-400">
                  {record.admin?.role?.replace('_', ' ')}
                </TableCell>
                <TableCell>
                  <Badge className={`flex items-center gap-1 w-fit ${getStatusBadgeClass(record.status)}`}>
                    {getStatusIcon(record.status)}
                    {formatStatusLabel(record.status)}
                  </Badge>
                  {record.override_status && (
                    <p className="text-xs text-gray-500 mt-1">
                      Overridden: {record.override_reason}
                    </p>
                  )}
                </TableCell>
                <TableCell className="text-gray-400">
                  {record.marked_at ? format(new Date(record.marked_at), 'hh:mm a') : '-'}
                </TableCell>
                <TableCell className="text-gray-400">{record.reason || '-'}</TableCell>
                <TableCell>
                  <OverrideDialog record={record} {...overrideProps} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CardContent>
  </Card>
);

export default AttendanceTable;
