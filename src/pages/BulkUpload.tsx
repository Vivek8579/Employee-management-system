
      let csvContent = '';
      
      // Fetch real data from database based on type
      switch (type) {
        case 'esports':
          const { data: esportsData } = await supabase
            .from('esports_players')
            .select('player_name, tournament_name, email, game_uid, entry_fees, payment_received')
            .order('created_at', { ascending: false });
          
          csvContent = 'player_name,tournament_name,email,game_uid,entry_fees,payment_received\n';
          if (esportsData && esportsData.length > 0) {
            esportsData.forEach((row: any) => {
              csvContent += `${row.player_name},${row.tournament_name},${row.email},${row.game_uid},${row.entry_fees},${row.payment_received}\n`;
            });
          } else {
            // Fallback sample data if no real data exists
            csvContent += 'John Doe,PUBG Championship,john@example.com,UID123456,500,true\n';
            csvContent += 'Jane Smith,Free Fire Tournament,jane@example.com,UID789012,300,false\n';
          }
          break;
          
        case 'social':
          const { data: socialData } = await supabase
            .from('social_media_orders')
            .select('service_type, order_type, post_account_link, quantity, payment_amount, payment_received')
            .order('created_at', { ascending: false });
          
          csvContent = 'service_type,order_type,post_account_link,quantity,payment_amount,payment_received\n';
          if (socialData && socialData.length > 0) {
            socialData.forEach((row: any) => {
              csvContent += `${row.service_type},${row.order_type},${row.post_account_link},${row.quantity},${row.payment_amount},${row.payment_received}\n`;
            });
          } else {
            csvContent += 'Instagram,Followers,https://instagram.com/example,1000,100,true\n';
            csvContent += 'YouTube,Views,https://youtube.com/watch?v=example,5000,250,false\n';
          }
          break;
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${type}_template.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Template Downloaded',
        description: `${type} template with all available data has been downloaded successfully.`
      });
    } catch (error) {
      console.error('Error downloading template:', error);
      toast({
        title: 'Download Failed',
        description: 'Failed to download template. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <ModuleLayout
      title="Bulk Upload & Import"
      description="Upload CSV/Excel files for tournaments and orders with smart validation"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="gradient-card border-white/10">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gradient">{uploadStats.filesUploaded}</p>
                <p className="text-sm text-muted-foreground">Files Uploaded</p>
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card border-white/10">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{uploadStats.successRate}%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card border-white/10">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{uploadStats.recordsProcessed}</p>
                <p className="text-sm text-muted-foreground">Records Processed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates */}
        <Card className="gradient-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['esports', 'social'].map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  onClick={() => downloadTemplate(type)}
                  className="capitalize"
                >
                  {type === 'esports' ? 'Esports Players' : 'Social Media Orders'} Template
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Download CSV files with ALL available data from the database. If no data exists, sample data will be provided.
            </p>
          </CardContent>
        </Card>

        {/* Upload Area */}
        <Card className="gradient-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              File Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/20 hover:border-purple-500/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploading ? (
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
              ) : (
                <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              )}
              <h3 className="text-lg font-semibold mb-2">
                {uploading ? 'Processing...' : 'Upload Files'}
              </h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop CSV/Excel files here or click to browse
              </p>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="bulk-file-upload"
                disabled={uploading}
              />
              <Button 
                onClick={() => document.getElementById('bulk-file-upload')?.click()}
                disabled={uploading} 
                className="gradient-primary"
              >
                Choose Files
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Supported formats: CSV, XLSX, XLS (Max 10MB) - Files are stored and data is processed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModuleLayout>
  );
};

export default BulkUpload;
