// StatCard.tsx
// UI component — renders a single stat card (e.g. "Present Today: 5")

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  valueColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, valueColor }) => (
  <Card className="bg-gray-900/50 border-gray-800">
    <CardContent className="p-6">
      <div className="text-center">
        {icon}
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
