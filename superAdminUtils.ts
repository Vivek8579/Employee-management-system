// superAdminUtils.ts
// Shared helper functions used across the SuperAdmin panel components

import React from 'react';
import { Check, X, Clock, AlertCircle } from 'lucide-react';

/**
 * Returns the correct Lucide icon for a given attendance status.
 */
export const getStatusIcon = (status: string): React.ReactElement => {
  switch (status) {
    case 'present': return <Check className="h-4 w-4" />;
    case 'absent':  return <X className="h-4 w-4" />;
    case 'late':    return <Clock className="h-4 w-4" />;
    default:        return <AlertCircle className="h-4 w-4" />;
  }
};

/**
 * Capitalises the first letter of a status string.
 * e.g. "present" → "Present", "not_marked" → "Not Marked"
 */
export const formatStatusLabel = (status: string): string => {
  if (status === 'not_marked') return 'Not Marked';
  return status.charAt(0).toUpperCase() + status.slice(1);
};
