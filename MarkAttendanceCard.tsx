// MarkAttendanceCard.tsx
// UI component — lets the current user mark their own attendance for today

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Clock, Check, X, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { getStatusBadgeClass, getCurrentTimeBasedStatus } from './utils';

interface MarkAttendanceCardProps {
  today: Date;
  timeInfo: { status: string; message: string; color: string };
  myAttendance: any;
  isLoading: boolean;
  reason: string;
  setReason: (value: string) => void;
  onMarkAttendance: () => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'present': return <Check className="h-4 w-4" />;
    case 'absent': return <X className="h-4 w-4" />;
    case 'late': return <Clock className="h-4 w-4" />;
    default: return <AlertCircle className="h-4 w-4" />;
  }
};

const MarkAttendanceCard: React.FC<MarkAttendanceCardProps> = ({
  today,
  timeInfo,
  myAttendance,
  isLoading,
  reason,
  setReason,
  onMarkAttendance,
}) => {
  const displayStatus = myAttendance?.status || getCurrentTimeBasedStatus();

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Clock className="h-5 w-5" />
          Mark Your Attendance - {format(today, 'PPP')}
        </CardTitle>
        <CardDescription className={timeInfo.color}>
          {timeInfo.message}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {myAttendance ? (
          <div className="text-center py-6">
            <Badge
              className={`text-lg px-4 py-2 flex items-center gap-2 w-fit mx-auto ${getStatusBadgeClass(displayStatus)}`}
            >
              {getStatusIcon(displayStatus)}
              {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
            </Badge>
            <p className="text-sm text-gray-500 mt-3">
              Marked at {format(new Date(myAttendance.marked_at), 'hh:mm a')}
            </p>
            {myAttendance.reason && (
              <p className="text-sm text-gray-500 mt-1">Reason: {myAttendance.reason}</p>
            )}
          </div>
        ) : (
          <>
            <div className="text-center py-4">
              <p className="text-lg font-medium text-white">
                Current Status:{' '}
                <span className={timeInfo.color}>
                  {myAttendance?.status
                    ? myAttendance.status.charAt(0).toUpperCase() + myAttendance.status.slice(1)
                    : timeInfo.status}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Based on current time ({format(new Date(), 'hh:mm a')})
              </p>
            </div>

            {(getCurrentTimeBasedStatus() === 'late' || getCurrentTimeBasedStatus() === 'absent') && (
              <div>
                <label className="text-sm font-medium text-gray-300">Reason (Optional)</label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide a reason for late/absent..."
                  rows={3}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            )}

            <Button
              onClick={onMarkAttendance}
              disabled={isLoading || new Date().getHours() < 6}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading
                ? 'Marking...'
                : `Mark Attendance (${myAttendance?.status ?? timeInfo.status})`}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MarkAttendanceCard;
