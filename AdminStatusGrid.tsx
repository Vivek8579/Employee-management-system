// AdminStatusGrid.tsx
// UI component — grid showing today's attendance status for every admin

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { getStatusBadgeClass } from '../utils';
import { getStatusIcon, formatStatusLabel } from './superAdminUtils';

interface AdminStatusGridProps {
  allAdmins: any[];
  todayAttendance: any[];
}

const AdminStatusGrid: React.FC<AdminStatusGridProps> = ({ allAdmins, todayAttendance }) => (
  <Card className="bg-gray-900/50 border-gray-800">
    <CardHeader>
      <CardTitle className="text-white">Today's Status - All Admins</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allAdmins.map((admin) => {
          const attendance = todayAttendance.find((a) => a.admin_id === admin.id);
          const status = attendance?.status || 'not_marked';

          return (
            <div
              key={admin.id}
              className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">{admin.name}</p>
                  <p className="text-xs text-gray-500">{admin.role?.replace('_', ' ')}</p>
                </div>
                <Badge className={`${getStatusBadgeClass(status)} flex items-center gap-1`}>
                  {getStatusIcon(status)}
                  {formatStatusLabel(status)}
                </Badge>
              </div>
              {attendance?.marked_at && (
                <p className="text-xs text-gray-500 mt-2">
                  Checked in at {format(new Date(attendance.marked_at), 'hh:mm a')}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

export default AdminStatusGrid;
