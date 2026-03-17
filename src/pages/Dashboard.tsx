
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
