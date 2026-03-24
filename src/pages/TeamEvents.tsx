
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-white/5 border-white/10" />
        </div>

        {loading ? <p className="text-gray-400">Loading...</p> : (
          <div className="space-y-6">
            {upcoming.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-blue-400 mb-3">Upcoming Events</h3>
                <div className="space-y-2">
                  {upcoming.map(event => (
                    <Card key={event.id} className="border-white/10 bg-white/5">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-white">{event.title}</h3>
                              <Badge className={typeColors[event.event_type] || typeColors.other}>{event.event_type}</Badge>
                            </div>
                            {event.description && <p className="text-sm text-gray-300 mb-2">{event.description}</p>}
                            <div className="flex gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />{new Date(event.event_date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                              {event.event_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.event_time}</span>}
                              {event.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>}
                            </div>
                          </div>
                          {isSuperAdmin && <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)}><Trash2 className="w-4 h-4 text-red-400" /></Button>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {past.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">Past Events</h3>
                <div className="space-y-2 opacity-60">
                  {past.slice(0, 10).map(event => (
                    <Card key={event.id} className="border-white/10 bg-white/5">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm text-white">{event.title}</h4>
                          <Badge className={typeColors[event.event_type] || typeColors.other} >{event.event_type}</Badge>
                          <span className="text-xs text-gray-500 ml-auto">{new Date(event.event_date + 'T00:00:00').toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {upcoming.length === 0 && past.length === 0 && <p className="text-gray-400">No events yet.</p>}
          </div>
        )}
      </ModuleLayout>
    </div>
  );
};

export default TeamEvents;
