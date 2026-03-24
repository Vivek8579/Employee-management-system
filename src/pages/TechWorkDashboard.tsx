
          <Card className="mb-6 gradient-card border-white/10">
            <CardHeader>
              <CardTitle>{editingLog ? 'Edit Work Log' : 'Add New Work Log'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Work Type</Label>
                    <Select value={formData.work_type} onValueChange={(v) => setFormData({ ...formData, work_type: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work type" />
                      </SelectTrigger>
                      <SelectContent>
                        {workTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Homepage redesign"
                      required
                    />
                  </div>
                  <div>
                    <Label>URL (optional)</Label>
                    <Input
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label>Hours Spent</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.5"
                      value={formData.hours_spent}
                      onChange={(e) => setFormData({ ...formData, hours_spent: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending_review">Pending Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Description (optional)</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the work done..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="gradient-primary" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {editingLog ? 'Update' : 'Add'} Work Log
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingLog(null); setFormData({ work_type: '', title: '', description: '', url: '', hours_spent: 0, status: 'completed' }); }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Work Logs Table */}
        <Card className="gradient-card border-white/10">
          <CardHeader>
            <CardTitle>Work Logs</CardTitle>
          </CardHeader>
          <CardContent>
            {workLogs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No work logs yet. Add your first one!</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getWorkTypeIcon(log.work_type)}
                          <span>{getWorkTypeLabel(log.work_type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{log.title}</p>
                          {log.url && (
                            <a href={log.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">
                              {log.url}
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{log.hours_spent}h</TableCell>
                      <TableCell>
                        <Badge variant={log.status === 'completed' ? 'default' : log.status === 'in_progress' ? 'secondary' : 'outline'}>
                          {log.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(log.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingLog(log)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(log.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TechWorkDashboard;
