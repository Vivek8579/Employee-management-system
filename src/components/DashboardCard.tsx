import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useButtonClickSound } from '@/hooks/useButtonClickSound';

interface DashboardCardProps {
  title: string;
  description: string;
  iconSrc: string;
  onClick: () => void;
  badge?: string;
  isDisabled?: boolean;
  stats?: {
    label: string;
    value: string | number;
  }[];
  gradient?: string;
  glowColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  iconSrc,
  onClick,
  badge,
  isDisabled = false,
  stats = [],
}) => {
  const { playClickSound } = useButtonClickSound();
  
  const handleClick = () => {
    if (!isDisabled) {
      playClickSound();
      onClick();
    }
  };
  
