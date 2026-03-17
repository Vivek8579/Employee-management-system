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
const processCsvData = async (dataLines: string[], headers: string[]): Promise<UploadResult> => {
  const result: UploadResult = { success: 0, errors: [], total: dataLines.length };

  const isEsports = headers.includes('player_name') || headers.includes('tournament_name');
  const isSocial = headers.includes('service_type') || headers.includes('post_account_link');

  for (let i = 0; i < dataLines.length; i++) {
    try {
      const values = dataLines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const record: any = {};

      headers.forEach((header, index) => {
        record[header] = values[index] || '';
      });

      if (isEsports) {
        await supabase.from('esports_players').insert({
          player_name: record.player_name,
          tournament_name: record.tournament_name
        } as any);
      } else if (isSocial) {
        await supabase.from('social_media_orders').insert({
          service_type: record.service_type
        } as any);
      }

      result.success++;
    } catch (error) {
      result.errors.push(`Row ${i + 1} failed`);
    }
  }

  return result;
};
const downloadTemplate = async (type: string) => {
  let csvContent = '';

  if (type === 'esports') {
    csvContent = 'player_name,tournament_name,email\n';
  } else {
    csvContent = 'service_type,order_type,quantity\n';
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = `${type}_template.csv`;
  link.click();
};
