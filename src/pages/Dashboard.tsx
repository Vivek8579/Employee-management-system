
      title: 'Real-Time Team Chat',
      description: 'WebSocket-powered team communication with file uploads and role-based messaging',
      iconSrc: '/icons/chat.png',
      route: '/dashboard/chat',
      module: '*',
      badge: 'Live',
      stats: [
        { label: 'Online', value: dashboardStats.activeAdmins },
        { label: 'Messages', value: dashboardStats.totalMessages }
      ]
    },
    {
      title: 'Analytics Dashboard',
      description: 'Revenue breakdown, earnings graphs, and domain-wise performance analytics of THRYLOS',
      iconSrc: '/icons/stat.png',
      route: '/dashboard/analytics',
      module: 'analytics',
      stats: [
        { label: 'Monthly Growth', value: `${dashboardStats.monthlyGrowth >= 0 ? '+' : ''}${dashboardStats.monthlyGrowth}%` },
        { label: 'Total Revenue', value: `₹${(dashboardStats.totalRevenue / 100000).toFixed(1)}L` }
      ]
    },
    {
      title: 'Payment Verification',
      description: 'Verify user payments, manage transaction IDs, and export payment reports',
      iconSrc: '/icons/card.png',
      route: '/dashboard/payments',
      module: '*',
      badge: 'All Users',
      stats: [
        { label: 'Pending', value: dashboardStats.pendingPayments },
        { label: 'Verified Today', value: dashboardStats.verifiedPaymentsToday }
      ]
    },
    {
      title: 'Certificate Manager',
      description: 'Issue certificates, manage IDs, and provide real-time verification system with Certificate ID',
      iconSrc: '/icons/certificate.png',
      route: '/dashboard/certificates',
      module: 'super_admin_only',
      badge: 'Super Admin',
      stats: [
        { label: 'Total Issued', value: dashboardStats.totalCertificates },
        { label: 'This Month', value: dashboardStats.certificatesThisMonth }
      ]
    },
    {
      title: 'Internship Tracker',
      description: 'Manage intern records, track attendance, assign tasks, and monitor progress',
      iconSrc: '/icons/internship.png',
      route: '/dashboard/internships',
      module: 'super_admin_only',
      badge: 'Super Admin',
      stats: [
        { label: 'Active Interns', value: dashboardStats.totalInternships },
        { label: 'Completed', value: dashboardStats.completedInternships }
      ]
    },
    {
      title: 'Admin Management',
      description: 'Manage admin accounts, assign roles, view activity logs, and reset passwords and see last seen',
      iconSrc: '/icons/admin.png',
      route: '/dashboard/admin-management',
      module: 'super_admin_only',
      badge: 'Super Admin',
      stats: [
        { label: 'Total Admins', value: dashboardStats.totalAdmins },
        { label: 'Active', value: dashboardStats.activeAdmins }
      ]
    },
    {
      title: 'Bulk Upload & Import',
      description: 'Upload CSV/Excel files for tournaments, stocks, and orders with smart validation',
      iconSrc: '/icons/files.png',
      route: '/dashboard/bulk-upload',
      module: '*',
      stats: [
        { label: 'Files Uploaded', value: dashboardStats.bulkUploads },
        { label: 'Success Rate', value: '100%' }
      ]
    },
    {
      title: 'Notification Center',
      description: 'Real-time alerts for orders, matches, stocks with role-based filtering',
      iconSrc: '/icons/active.png',
      route: '/dashboard/notifications',
      module: '*',
      badge: 'Live',
      stats: [
        { label: 'Unread', value: dashboardStats.todayNotifications },
        { label: 'Today', value: dashboardStats.todayNotifications }
      ]
    },
    {
      title: 'File & Media Manager',
      description: 'Upload tournament posters, certificates, receipts with cloud storage',
      iconSrc: '/icons/folder.png',
      route: '/dashboard/files',
      module: '*',
      stats: [
        { label: 'Total Files', value: dashboardStats.totalFiles },
        { label: 'Storage Used', value: '0GB' }
      ]
    },
    {
      title: 'Audit Logs',
      description: 'Track admin actions, login history, and system activity with detailed logs',
      iconSrc: '/icons/log.png',
      route: '/dashboard/audit-logs',
      module: 'super_admin_only',
      badge: 'Super Admin',
      stats: [
        { label: 'Today Actions', value: dashboardStats.todayAuditActions },
        { label: 'Total Logs', value: dashboardStats.totalAuditLogs }
      ]
    },
    {
      title: 'Employee Management',
      description: 'Manage employee records, documents, Aadhar, PAN, offer letters and details',
      iconSrc: '/icons/admin.png',
      route: '/dashboard/employees',
      module: 'super_admin_only',
      badge: 'Super Admin',
      stats: [
        { label: 'Employees', value: dashboardStats.totalEmployees },
        { label: 'Active', value: dashboardStats.activeEmployees }
      ]
    },
    {
      title: 'Career Applications',
      description: 'View and manage job applications, review candidates and track hiring status',
      iconSrc: '/icons/internship.png',
      route: '/dashboard/careers',
      module: 'super_admin_only',
      badge: 'Super Admin',
      stats: [
        { label: 'Applications', value: dashboardStats.totalCareerApplications },
        { label: 'Pending', value: dashboardStats.pendingCareerApplications }
      ]
    },
    {
      title: 'Leave Management',
      description: 'Apply for leave, track leave requests and view approval status',
      iconSrc: '/icons/attendance.png',
      route: '/dashboard/leave',
      module: '*',
      badge: 'All Users',
      stats: [
        { label: 'Requests', value: dashboardStats.leaveRequestsCount },
        { label: 'Pending', value: dashboardStats.pendingLeaveRequests }
      ]
    },
    {
      title: 'HR Dashboard',
      description: 'Access HR functions including employee management, interns, and certificates',
      iconSrc: '/icons/admin.png',
      route: '/dashboard/hr',
      module: 'hr_admin_only',
      badge: 'HR Admin',
      stats: [
        { label: 'Employees', value: dashboardStats.totalEmployees },
        { label: 'Interns', value: dashboardStats.totalInternships }
      ]
    },
    {
      title: 'Holiday Calendar',
      description: 'Manage company holidays (excluded from working days calculation)',
      iconSrc: '/icons/attendance.png',
      route: '/dashboard/holidays',
      module: 'super_admin_only',
      badge: 'Super Admin',
      stats: [
        { label: 'Holidays', value: '0' },
        { label: 'This Year', value: new Date().getFullYear() }
      ]
    },
    {
      title: 'Announcements',
      description: 'Company-wide announcements and important updates for all team members',
      iconSrc: '/icons/active.png',
      route: '/dashboard/announcements',
      module: '*',
      badge: 'Live',
      stats: [
        { label: 'Board', value: 'Live' },
        { label: 'All Roles', value: '✓' }
      ]
    },
    {
      title: 'Polls & Surveys',
      description: 'Create polls, gather team opinions, and make data-driven decisions',
      iconSrc: '/icons/stat.png',
      route: '/dashboard/polls',
      module: '*',
      stats: [
        { label: 'Voting', value: 'Live' },
        { label: 'Anonymous', value: '✓' }
      ]
    },
    {
      title: 'Task Board',
      description: 'Kanban-style task management with assignments, priorities, and due dates',
      iconSrc: '/icons/trade.png',
      route: '/dashboard/tasks',
      module: '*',
      badge: 'Live',
      stats: [
        { label: 'Kanban', value: '4 Cols' },
        { label: 'Realtime', value: '✓' }
      ]
    },
    {
      title: 'Daily Standups',
      description: 'Quick daily updates — yesterday, today, blockers with mood tracking',
      iconSrc: '/icons/chat.png',
      route: '/dashboard/standups',
      module: '*',
      stats: [
        { label: 'Daily', value: 'Updates' },
        { label: 'Mood', value: '✓' }
      ]
    },
    {
      title: 'Feedback',
      description: 'Share anonymous or named feedback, suggestions, and bug reports',
      iconSrc: '/icons/social-media.png',
      route: '/dashboard/feedback',
      module: '*',
      stats: [
        { label: 'System', value: 'Open' },
        { label: 'Anonymous', value: '✓' }
      ]
    },
    {
      title: 'Team Events',
      description: 'Calendar of meetings, trainings, celebrations, and deadlines',
      iconSrc: '/icons/attendance.png',
      route: '/dashboard/events',
      module: '*',
      stats: [
        { label: 'Calendar', value: 'Live' },
        { label: 'Types', value: '5' }
      ]
    },
    {
      title: 'Performance Scores',
      description: 'Auto-calculated performance rankings based on attendance and work logs',
      iconSrc: '/icons/analytics.png',
      route: '/dashboard/performance',
      module: '*',
      badge: 'Live',
      stats: [
        { label: 'Rankings', value: 'Live' },
        { label: 'Metrics', value: '3' }
      ]
    },
    {
      title: 'Admin Reports',
      description: 'Generate detailed per-admin reports with attendance, work logs, and leave data',
      iconSrc: '/icons/files.png',
      route: '/dashboard/reports',
      module: 'super_admin_only',
      badge: 'Super Admin',
      stats: [
        { label: 'Export', value: 'CSV' },
        { label: 'Detailed', value: '✓' }
      ]
    },
    {
      title: 'Birthday Reminders',
      description: 'Never miss a team member\'s birthday — upcoming and today\'s celebrations',
      iconSrc: '/icons/certificate.png',
      route: '/dashboard/birthdays',
      module: '*',
      stats: [
        { label: 'Reminders', value: 'Auto' },
        { label: 'Team', value: '✓' }
      ]
    },
  ];

  const availableModules = modules.filter(module => {
    if (module.module === '*') return true;
    if (module.module === 'super_admin_only') return adminProfile.role === 'super_admin';
    if (module.module === 'hr_admin_only') return (adminProfile.role as string) === 'hr_admin' || adminProfile.role === 'super_admin';
    if (module.module === 'social_admin') return adminProfile.role === 'social_admin' || adminProfile.role === 'super_admin';
    return hasPermission(module.module);
  });

  const availableDataEntryCards = dataEntryCards.filter(card => card.visible);

  const renderActiveSection = () => {
    if (!activeSection) return null;

    const handleCloseSection = () => {
      setActiveSection(null);
      setEditingItem(null);
    };

    return (
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {activeSection === 'esports' && 'Esports Players Management'}
            {activeSection === 'social' && 'Social Media Orders Management'}
            {activeSection === 'trading' && 'Trading Users Management'}
            {activeSection === 'betting' && 'Betting Events Management'}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleCloseSection}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activeSection === 'esports' && (
              <EsportsPlayerForm 
                onPlayerAdded={() => { fetchRoleSpecificData(); fetchRealDashboardStats(); }} 
                editingPlayer={editingItem?.type === 'esports' ? editingItem : undefined}
                onCancelEdit={() => setEditingItem(null)}
              />
            )}
            {activeSection === 'social' && (
              <SocialMediaOrderForm 
                onOrderAdded={() => { fetchRoleSpecificData(); fetchRealDashboardStats(); }}
                editingOrder={editingItem?.type === 'social' ? editingItem : undefined}
                onCancelEdit={() => setEditingItem(null)}
              />
            )}

            {/* Data Table */}
            {activeData.filter(item => item.type === activeSection).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Recent {activeSection} Data</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Details</TableHead>
                      <TableHead>Amount/Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeData
                      .filter(item => item.type === activeSection)
                      .slice(0, 10)
                      .map((item) => (
                        <TableRow key={`${item.type}-${item.id}`}>
                          <TableCell>
                            {item.type === 'esports' && `${item.player_name} - ${item.tournament_name}`}
                            {item.type === 'social' && `${item.service_type} ${item.order_type}`}
                            {item.type === 'trading' && `${item.user_name} (${item.email || 'No email'})`}
                            {item.type === 'betting' && `${item.user_name} - ${item.event_name}`}
                          </TableCell>
                          <TableCell>
                            {item.type === 'esports' && `₹${item.entry_fees}`}
                            {item.type === 'social' && `₹${item.payment_amount}`}
                            {item.type === 'trading' && `₹${item.wallet_balance}`}
                            {item.type === 'betting' && `₹${item.fees_paid}`}
                          </TableCell>
                          <TableCell>
                            {(item.payment_received !== undefined) && (
                              <Badge variant={item.payment_received ? "default" : "secondary"}>
                                {item.payment_received ? "Paid" : "Pending"}
                              </Badge>
                            )}
                            {item.type === 'trading' && <Badge variant="default">Active</Badge>}
                          </TableCell>
                          <TableCell>
                            {new Date(item.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingItem(item)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(item)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render mobile dashboard for mobile devices
  if (isMobile) {
    return (
      <>
        <Header />
        <MobileDashboard adminProfile={adminProfile} dashboardStats={dashboardStats} />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 typewriter-welcome">
              Welcome , {displayProfile.name} 🩵
            </h1>
            <p className="text-muted-foreground">
              Manage your {displayProfile.role.replace('_', ' ')} dashboard and access your authorized modules
            </p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Live updates</span>
          </div>
        </div>

        {/* Daily Tasks & Activity Summary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DailyTodos />
          <ActivitySummary />
        </div>
        {/* Super Admin Review Panel */}
        {adminProfile?.role === 'super_admin' && (
          <div className="mb-8">
            <SuperAdminReviewPanel />
          </div>
        )}

        {/* User Stats by Category */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">User Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-effect p-6 rounded-lg border border-white/10">
              <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
              <p className="text-2xl font-bold text-gradient">{dashboardStats.esportsUsers}</p>
            </div>
            <div className="glass-effect p-6 rounded-lg border border-white/10">
              <h3 className="text-sm font-medium text-muted-foreground">Esports Users</h3>
              <p className="text-2xl font-bold text-gradient">{dashboardStats.esportsUsers}</p>
            </div>
            <div className="glass-effect p-6 rounded-lg border border-white/10">
              <h3 className="text-sm font-medium text-muted-foreground">Avg. Followers</h3>
              <p className="text-2xl font-bold text-gradient">{dashboardStats.averageFollowers.toLocaleString()}</p>
            </div>
            <div className="glass-effect p-6 rounded-lg border border-white/10">
              <h3 className="text-sm font-medium text-muted-foreground">Employees</h3>
              <p className="text-2xl font-bold text-gradient">{dashboardStats.totalEmployees}</p>
            </div>
          </div>
        </div>

        {/* Active Section */}
        {renderActiveSection()}

        {/* Data Entry Cards */}
        {availableDataEntryCards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Data Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {availableDataEntryCards.map((card, index) => (
                <DashboardCard
                  key={index}
                  title={card.title}
                  description={card.description}
                  iconSrc={card.iconSrc}
                  onClick={() => navigate(card.route)}
                  stats={card.stats}
                />
              ))}
            </div>
          </div>
        )}

        {/* Dashboard Cards Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">System Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableModules.map((module, index) => (
              <DashboardCard
                key={index}
                title={module.title}
                description={module.description}
                iconSrc={module.iconSrc}
                onClick={() => navigate(module.route)}
                badge={module.badge}
                stats={module.stats}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
