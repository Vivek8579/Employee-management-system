

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="space-y-4">
      <Card className="gradient-card border-white/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5 text-primary" />
              Activity Summary
              {isToday && (
                <Badge variant="outline" className="ml-2 text-xs animate-pulse">
                  Live
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-8 text-xs bg-black/30 border-white/10 justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-3 w-3" />
                    {format(selectedDate, "MMM dd, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
              
              {isSuperAdmin && (
                <>
                  <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
                    <SelectTrigger className="w-[140px] h-8 text-xs bg-black/30 border-white/10">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">My Activity</SelectItem>
                      <SelectItem value="all">All Admins</SelectItem>
                      {admins.map(admin => (
                        <SelectItem key={admin.id} value={admin.id}>
                          {admin.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowCharts(!showCharts)}
                    className="h-8"
                  >
                    <BarChart3 className="w-4 h-4 mr-1" />
                    {showCharts ? 'Hide' : 'Charts'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={exportToCSV}
                    className="h-8"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    CSV
                  </Button>
                </>
              )}
              <Button 
                size="sm" 
                variant="outline" 
                onClick={downloadSummary}
                className="h-8"
                disabled={activities.length === 0}
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {activities.length} activities on {format(selectedDate, "MMMM d, yyyy")}
          </p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {isLoading ? (
              <div className="text-center py-4 text-muted-foreground text-sm">Loading...</div>
            ) : activities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No activities recorded for this date</p>
                <p className="text-xs mt-1">Select a different date to view activities</p>
              </div>
            ) : (
              <div className="space-y-2">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="mt-0.5">{getActionIcon(activity.action)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-medium ${getActionColor(activity.action)}`}>
                          {activity.action}
                        </span>
                        {isSuperAdmin && selectedAdmin !== 'self' && activity.admin && (
                          <Badge variant="outline" className="text-xs">
                            {activity.admin.name}
                          </Badge>
                        )}
                      </div>
                      {activity.details && Object.keys(activity.details).length > 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {typeof activity.details === 'object' 
                            ? Object.entries(activity.details)
                                .filter(([key]) => !['timestamp', 'admin_id'].includes(key))
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(' • ')
                                .slice(0, 100)
                            : String(activity.details).slice(0, 100)
                          }
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(activity.created_at), 'h:mm:ss a')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Charts for Super Admin */}
      {isSuperAdmin && showCharts && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Daily Activity Chart */}
          <Card className="gradient-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Daily Activity (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Action Breakdown Chart */}
          <Card className="gradient-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Action Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={actionBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {actionBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {actionBreakdown.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ActivitySummary;
