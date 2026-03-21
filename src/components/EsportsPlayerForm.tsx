
    <Card className="gradient-card border border-white/20">
      <CardHeader>
        <CardTitle>{editingPlayer ? 'Edit Player' : 'Add New Esports Player'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="player_name">Player Name</Label>
              <Input
                id="player_name"
                value={formData.player_name}
                onChange={(e) => setFormData(prev => ({ ...prev, player_name: e.target.value }))}
                required
                className="bg-black/30 border-white/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="game_uid">Game UID</Label>
              <Input
                id="game_uid"
                value={formData.game_uid}
                onChange={(e) => setFormData(prev => ({ ...prev, game_uid: e.target.value }))}
                required
                className="bg-black/30 border-white/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="bg-black/30 border-white/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tournament_name">Tournament Name</Label>
              <Input
                id="tournament_name"
                value={formData.tournament_name}
                onChange={(e) => setFormData(prev => ({ ...prev, tournament_name: e.target.value }))}
                required
                className="bg-black/30 border-white/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entry_fees">Entry Fees (₹)</Label>
              <Input
                id="entry_fees"
                type="number"
                step="0.01"
                value={formData.entry_fees}
                onChange={(e) => setFormData(prev => ({ ...prev, entry_fees: e.target.value }))}
                required
                className="bg-black/30 border-white/20"
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="payment_received"
                checked={formData.payment_received}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, payment_received: checked }))}
              />
              <Label htmlFor="payment_received">Payment Received</Label>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isLoading} className="gradient-primary">
              {isLoading ? "Saving..." : (editingPlayer ? "Update Player" : "Add Player")}
            </Button>
            {editingPlayer && (
              <Button type="button" variant="outline" onClick={onCancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EsportsPlayerForm;
