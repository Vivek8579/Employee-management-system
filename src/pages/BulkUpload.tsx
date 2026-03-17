const BulkUpload: React.FC = () => {
  const { user, adminProfile } = useAuth();

  const [uploadStats, setUploadStats] = useState({
    filesUploaded: 0,
    successRate: 0,
    recordsProcessed: 0
  });

  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  return (
    <ModuleLayout
      title="Bulk Upload & Import"
      description="Upload CSV/Excel files for tournaments and orders with smart validation"
    >
      {/* UI Cards + Upload Section */}
    </ModuleLayout>
  );
};

useEffect(() => {
  fetchUploadStats();
}, []);

const fetchUploadStats = async () => {
  try {
    const [
      { count: esportsCount },
      { count: socialCount },
      { count: filesCount }
    ] = await Promise.all([
      supabase.from('esports_players').select('*', { count: 'exact', head: true }),
      supabase.from('social_media_orders').select('*', { count: 'exact', head: true }),
      supabase.from('uploaded_files').select('*', { count: 'exact', head: true })
    ]);

    const totalRecords = (esportsCount || 0) + (socialCount || 0);

    setUploadStats({
      filesUploaded: filesCount || 0,
      successRate: totalRecords > 0 ? 95 : 0,
      recordsProcessed: totalRecords
    });
  } catch (error) {
    console.error('Error fetching upload stats:', error);
  }
};
