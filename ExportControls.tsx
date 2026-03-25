// ExportControls.tsx
// UI component — dropdown to pick an admin + button to export attendance as CSV

import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { ExportControlsProps } from './superAdminTypes';

const ExportControls: React.FC<ExportControlsProps> = ({
  selectedAdminForExport,
  setSelectedAdminForExport,
  allAdmins,
  onExportCSV,
}) => (
  <>
    <Select value={selectedAdminForExport} onValueChange={setSelectedAdminForExport}>
      <SelectTrigger className="w-[180px] bg-gray-900 border-gray-800 text-white">
        <SelectValue placeholder="Export for..." />
      </SelectTrigger>
      <SelectContent className="bg-gray-900 border-gray-800">
        <SelectItem value="all">All Admins</SelectItem>
        {allAdmins.map((admin) => (
          <SelectItem key={admin.id} value={admin.id}>
            {admin.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Button
      variant="outline"
      onClick={() =>
        onExportCSV(selectedAdminForExport === 'all' ? undefined : selectedAdminForExport)
      }
      className="border-gray-700 text-gray-300 hover:bg-gray-800"
    >
      <Download className="h-4 w-4 mr-2" />
      Export CSV
    </Button>
  </>
);

export default ExportControls;
