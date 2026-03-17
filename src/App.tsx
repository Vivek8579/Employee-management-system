import React from 'react'; 

import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import { Toaster } from '@/components/ui/toaster'; 

import { AuthProvider } from '@/contexts/AuthContext'; 

import Index from '@/pages/Index'; 

import Login from '@/pages/Login'; 

import Dashboard from '@/pages/Dashboard'; 

import NotFound from '@/pages/NotFound'; 

import TeamChat from '@/pages/TeamChat'; 

import Analytics from '@/pages/Analytics'; 

import CertificateManager from '@/pages/CertificateManager'; 

import InternshipTracker from '@/pages/InternshipTracker'; 

import AdminManagement from '@/pages/AdminManagement'; 

import AttendanceTracker from '@/pages/AttendanceTracker'; 

import PaymentVerification from '@/pages/PaymentVerification'; 

import ProtectedRoute from '@/components/ProtectedRoute'; 

import BulkUpload from '@/pages/BulkUpload'; 

import NotificationCenter from '@/pages/NotificationCenter'; 

import FileManager from '@/pages/FileManager'; 

import AuditLogs from '@/pages/AuditLogs'; 

import Overview from '@/pages/Overview'; 

import SocialMediaAnalytics from '@/pages/SocialMediaAnalytics'; 

import EmployeeManagement from '@/pages/EmployeeManagement'; 
