import React, { useState, useEffect } from 'react';
import ModuleLayout from '@/components/ModuleLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity, Shield, Award, Briefcase, User, LogIn, MapPin, Globe, 
  Send, Bell, Wifi
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface AuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  admin_name: string;
  admin_email: string;
  details: string;
  timestamp: string;
  ip?: string;
  location?: string;
  isp?: string;
  rawDetails?: any;
}

interface Admin {
  id: string;
  name: string;
  email: string;
}

const AuditLogs: React.FC = () => {
  const { adminProfile } = useAuth();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState({
    todayActions: 0,
    totalLogs: 0,
    uniqueAdmins: 0,
    todayLogins: 0
  });
  const [showNotifyDialog, setShowNotifyDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const [notifyAll, setNotifyAll] = useState(true);

  const isSuperAdmin = adminProfile?.role === 'super_admin';

  useEffect(() => {
    fetchAuditLogs();
    if (isSuperAdmin) {
      fetchAdmins();
    }
    
    // Real-time subscriptions
    const auditChannel = supabase
      .channel('audit-logs-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'audit_logs' },
        () => setTimeout(fetchAuditLogs, 500)
      )
      .subscribe();

    const paymentChannel = supabase
      .channel('audit-payments')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'payment_verifications' },
        () => setTimeout(fetchAuditLogs, 500)
      )
      .subscribe();

    const certificateChannel = supabase
      .channel('audit-certificates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'certificates' },
        () => setTimeout(fetchAuditLogs, 500)
      )
      .subscribe();

    const attendanceChannel = supabase
      .channel('audit-attendance')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'attendance' },
        () => setTimeout(fetchAuditLogs, 500)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(auditChannel);
      supabase.removeChannel(paymentChannel);
      supabase.removeChannel(certificateChannel);
      supabase.removeChannel(attendanceChannel);
    };
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('id, name, email')
        .eq('is_active', true);

      if (error) throw error;
      setAdmins((data || []) as Admin[]);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };
