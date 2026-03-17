

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
