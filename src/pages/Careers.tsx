// ===================== LOGIC =====================
const Careers: React.FC = () => {
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    fullAddress: '',
    city: '',
    state: '',
    country: 'India',
    dateOfBirth: '',
    roleAppliedFor: '',
    yearsOfExperience: '',
    skills: '',
    whyJoinThrylos: '',
    additionalNotes: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error } = await supabase.storage
      .from('career-documents')
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return null;
    }

    const { data } = supabase.storage
      .from('career-documents')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.mobileNumber || !formData.email || !formData.roleAppliedFor) {
      toast({ title: "Error", description: "Fill required fields", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      let resumeUrl = null;
      let aadharUrl = null;
      const additionalDocUrls: string[] = [];

      if (resumeFile) resumeUrl = await uploadFile(resumeFile, 'resumes');
      if (aadharFile) aadharUrl = await uploadFile(aadharFile, 'aadhar');

      for (const file of additionalFiles) {
        const url = await uploadFile(file, 'additional');
        if (url) additionalDocUrls.push(url);
      }

      const { error } = await supabase.from('career_applications').insert({
        full_name: formData.fullName,
        mobile_number: formData.mobileNumber,
        email: formData.email,
        full_address: formData.fullAddress,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        date_of_birth: formData.dateOfBirth || null,
        role_applied_for: formData.roleAppliedFor,
        years_of_experience: formData.yearsOfExperience,
        skills: formData.skills,
        why_join_thrylos: formData.whyJoinThrylos,
        additional_notes: formData.additionalNotes,
        resume_url: resumeUrl,
        aadhar_url: aadharUrl,
        additional_documents: additionalDocUrls,
      });

      if (error) throw error;

      toast({ title: "Success", description: "Application submitted!" });

    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
