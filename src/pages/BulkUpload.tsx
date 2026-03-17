const handleFiles = async (files: FileList) => {
  const file = files[0];
  if (!file || !user || !adminProfile) return;

  if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
    toast({
      title: 'Invalid File Type',
      description: 'Please upload CSV or Excel files only.',
      variant: 'destructive'
    });
    return;
  }

  setUploading(true);

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${adminProfile.id}/bulk_upload_${Date.now()}.${fileExt}`;

    await supabase.storage.from('uploads').upload(fileName, file);

    await supabase.from('uploaded_files').insert({
      name: file.name,
      file_path: fileName,
      file_size: file.size,
      mime_type: file.type,
      uploaded_by: adminProfile.id
    } as any);

  } catch (error) {
    toast({
      title: 'Upload Failed',
      description: 'Failed to upload file',
      variant: 'destructive'
    });
  } finally {
    setUploading(false);
  }
};
