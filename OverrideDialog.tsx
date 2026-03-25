// OverrideDialog.tsx
// UI component — dialog for super admin to override an admin's attendance status

import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';
import { AttendanceRecord } from '../types';
import { OverrideDialogState } from './superAdminTypes';

interface OverrideDialogProps extends OverrideDialogState {
  record: AttendanceRecord;
}

const OverrideDialog: React.FC<OverrideDialogProps> = ({
  record,
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
  <Dialog
    open={showOverrideDialog && selectedRecordForOverride?.id === record.id}
    onOpenChange={(open) => {
      setShowOverrideDialog(open);
      if (!open) {
        setSelectedRecordForOverride(null);
        setOverrideStatus('present');
        setOverrideReason('');
      }
    }}
  >
    <DialogTrigger asChild>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setSelectedRecordForOverride(record);
          setOverrideStatus(record.status);
        }}
        className="border-gray-700 text-gray-300 hover:bg-gray-800"
      >
        <Edit className="h-4 w-4 mr-1" />
        Override
      </Button>
    </DialogTrigger>

    <DialogContent className="bg-gray-900 border-gray-800">
      <DialogHeader>
        <DialogTitle className="text-white">Override Attendance Status</DialogTitle>
      </DialogHeader>

      <div className="space-y-4 mt-4">
        {/* Current record summary */}
        <div className="p-4 rounded-lg bg-gray-800/50">
          <p className="font-medium text-white">{record.admin?.name}</p>
          <p className="text-sm text-gray-400">Current: {record.status}</p>
          <p className="text-sm text-gray-400">Date: {record.date}</p>
        </div>

        {/* New status selector */}
        <div>
          <Label className="text-gray-300">New Status</Label>
          <Select value={overrideStatus} onValueChange={setOverrideStatus}>
            <SelectTrigger className="mt-1 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800">
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="late">Late</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reason textarea */}
        <div>
          <Label className="text-gray-300">Reason for Override *</Label>
          <Textarea
            value={overrideReason}
            onChange={(e) => setOverrideReason(e.target.value)}
            placeholder="Please provide a reason..."
            rows={2}
            className="mt-1 bg-gray-800 border-gray-700 text-white"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setShowOverrideDialog(false)}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={onOverride}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isLoading ? 'Updating...' : 'Update Status'}
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default OverrideDialog;
