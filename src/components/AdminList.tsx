
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Database } from '@/types/database';
import { castToAdminProfiles } from '@/utils/adminTypeCasting';

type AdminProfile = Database['public']['Tables']['admins']['Row'];

interface AdminListProps {
  admins: any[];
  onAdminsChange: (admins: AdminProfile[]) => void;
}

const AdminList: React.FC<AdminListProps> = ({ admins, onAdminsChange }) => {
  // Cast the admins to the proper type and update parent component
  React.useEffect(() => {
    const typedAdmins = castToAdminProfiles(admins);
    onAdminsChange(typedAdmins);
  }, [admins, onAdminsChange]);

 
