// StatsGrid.tsx
// UI component — renders the row of 5 summary stat cards at the top of the SuperAdmin panel

import React from 'react';
import { Users, UserCheck, UserX, Clock, AlertCircle } from 'lucide-react';
import StatCard from './StatCard';
import { AdminStats } from './superAdminTypes';

interface StatsGridProps {
  stats: AdminStats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const cards = [
    {
      icon: <Users className="h-8 w-8 mx-auto text-blue-500 mb-2" />,
      value: stats.total,
      label: 'Total Admins',
      valueColor: 'text-white',
    },
    {
      icon: <UserCheck className="h-8 w-8 mx-auto text-blue-500 mb-2" />,
      value: stats.present,
      label: 'Present Today',
      valueColor: 'text-blue-500',
    },
    {
      icon: <Clock className="h-8 w-8 mx-auto text-gray-400 mb-2" />,
      value: stats.late,
      label: 'Late Today',
      valueColor: 'text-gray-400',
    },
    {
      icon: <UserX className="h-8 w-8 mx-auto text-gray-600 mb-2" />,
      value: stats.absent,
      label: 'Absent Today',
      valueColor: 'text-gray-500',
    },
    {
      icon: <AlertCircle className="h-8 w-8 mx-auto text-gray-500 mb-2" />,
      value: stats.notMarked,
      label: 'Not Marked',
      valueColor: 'text-gray-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
};

export default StatsGrid;
