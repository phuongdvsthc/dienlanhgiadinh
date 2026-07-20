import React, { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Phone, MessageCircle, Mail, Clock, MapPin, CheckCircle, Loader2, UploadCloud, ChevronDown, HelpCircle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../data/site';
import { contactFaqs, productCategories } from '../data/contact';

export function ContactPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    model: '',
    message: '',
    consent: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập nội dung chi tiết';
    if (!formData.consent) newErrors.consent = 'Bạn cần đồng ý với chính sách bảo mật';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      product: '',
      model: '',
      message: '',
      consent: false
    });
    setIsSuccess(false);
  };

  return (
    <div className="flex-grow">
      {/* Breadcrumb */}
      <Container className="py-6">
        <nav className="flex text-sm font-semibold text-text-accent">
          <ol className="flex items-center space-x-2">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">
                Trang chủ
              </button>
            </li>
            <li><ChevronRight size={16} /></li>
            <li className="text-primary">Liên hệ</li>
          </ol>
        </nav>
      </Container>

      {/* Header */}
      <section className="py-8 md:py-12 text-center md:text-left">
        <Container>
          <Heading level={1} variant="display" className="text-primary mb-4 text-3xl md:text-5xl">
            Liên hệ {siteConfig.name}
          </Heading>
          <Text variant="large" className="text-text-secondary max-w-2xl">
            Gửi thông tin sản phẩm, mã thiết bị hoặc hình ảnh linh kiện để chúng tôi hỗ trợ và kiểm tra nhanh chóng nhất.
          </Text>
        </Container>
      </section>

      <Container className="pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Info & Form */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-background p-6 rounded-xl shadow-sm border border-border/50 hover:shadow-card transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <Heading level={3} variant="h4" className="text-primary mb-1 mt-0">Hotline Hỗ Trợ</Heading>
                    <Text variant="small" className="text-text-secondary mb-2">Trực 24/7 cho sự cố khẩn cấp.</Text>
                    <a href={siteConfig.contact.callUrl} className="font-bold text-accent hover:underline text-sm">
                      {siteConfig.contact.hotline}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-sm border border-border/50 hover:shadow-card transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-[#24ad45]">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <Heading level={3} variant="h4" className="text-primary mb-1 mt-0">Zalo Kỹ Thuật</Heading>
                    <Text variant="small" className="text-text-secondary mb-2">Gửi ảnh linh kiện để báo giá.</Text>
                    <a href={siteConfig.contact.zaloUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-accent hover:underline text-sm">
                      {siteConfig.contact.zalo}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-sm border border-border/50 hover:shadow-card transition-shadow sm:col-span-2 md:col-span-1">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <Heading level={3} variant="h4" className="text-primary mb-1 mt-0">Email Liên Hệ</Heading>
                    <Text variant="small" className="text-text-secondary mb-2">Dành cho đối tác và mua sỉ.</Text>
                    <a href={`mailto:${siteConfig.contact.email}`} className="font-bold text-accent hover:underline text-sm break-all">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-sm border border-border/50 hover:shadow-card transition-shadow sm:col-span-2 md:col-span-1">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <Heading level={3} variant="h4" className="text-primary mb-1 mt-0">Giờ Làm Việc</Heading>
                    <Text variant="small" className="text-text-secondary mb-0">
                      {siteConfig.contact.workingHours?.split('\n').map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      )) || 'Thứ 2 - Thứ 7: 8:00 - 18:00'}
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background p-6 md:p-8 rounded-xl shadow-sm border border-border/50 relative overflow-hidden">
              
              {/* Overlay: Submitting */}
              {isSubmitting && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                  <Loader2 size={40} className="animate-spin text-primary mb-4" />
                  <Heading level={3} variant="h3" className="text-primary">Đang gửi yêu cầu...</Heading>
                </div>
              )}

              {/* Overlay: Success */}
              {isSuccess && (
                <div className="absolute inset-0 bg-background flex flex-col items-center justify-center z-10 p-8 text-center">
                  <div className="bg-[#24ad45]/10 p-4 rounded-full text-[#24ad45] mb-4">
                    <CheckCircle size={48} />
                  </div>
                  <Heading level={3} variant="h2" className="text-primary mb-2">Gửi thành công!</Heading>
                  <Text className="text-text-secondary mb-6">
                    Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi lại trong thời gian sớm nhất.
                  </Text>
                  <Button onClick={resetForm} className="font-bold shadow-sm">
                    Gửi yêu cầu khác
                  </Button>
                </div>
              )}

              <Heading level={2} variant="h2" className="text-primary mb-6 border-b border-border/50 pb-4">
                Gửi Yêu Cầu Hỗ Trợ
              </Heading>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-text-primary mb-2">Họ và tên *</label>
                    <input 
                      id="name"
                      name="name"
                      type="text" 
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full h-12 px-4 bg-surface border ${errors.name ? 'border-[#ba1a1a] focus:ring-[#ba1a1a]' : 'border-border/80 focus:border-primary focus:ring-primary'} rounded font-medium text-text-primary focus:ring-1 outline-none transition-colors`}
                    />
                    {errors.name && <p className="text-sm text-[#ba1a1a] mt-1">{errors.name}</p>}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-text-primary mb-2">Số điện thoại *</label>
                    <input 
                      id="phone"
                      name="phone"
                      type="tel" 
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full h-12 px-4 bg-surface border ${errors.phone ? 'border-[#ba1a1a] focus:ring-[#ba1a1a]' : 'border-border/80 focus:border-primary focus:ring-primary'} rounded font-medium text-text-primary focus:ring-1 outline-none transition-colors`}
                    />
                    {errors.phone && <p className="text-sm text-[#ba1a1a] mt-1">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-bold text-text-primary mb-2">Email (Tùy chọn)</label>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full h-12 px-4 bg-surface border ${errors.email ? 'border-[#ba1a1a] focus:ring-[#ba1a1a]' : 'border-border/80 focus:border-primary focus:ring-primary'} rounded font-medium text-text-primary focus:ring-1 outline-none transition-colors`}
                    />
                    {errors.email && <p className="text-sm text-[#ba1a1a] mt-1">{errors.email}</p>}
                  </div>

                  {/* Product Category */}
                  <div>
                    <label htmlFor="product" className="block text-sm font-bold text-text-primary mb-2">Sản phẩm quan tâm</label>
                    <div className="relative">
                      <select 
                        id="product"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        className="w-full h-12 px-4 bg-surface border border-border/80 rounded font-medium text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none"
                      >
                        <option value="">Chọn loại sản phẩm...</option>
                        {productCategories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-accent pointer-events-none" />
                    </div>
                  </div>

                  {/* Model */}
                  <div>
                    <label htmlFor="model" className="block text-sm font-bold text-text-primary mb-2">Mã thiết bị (Model)</label>
                    <input 
                      id="model"
                      name="model"
                      type="text" 
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="VD: R-20A, NN-ST34"
                      className="w-full h-12 px-4 bg-surface border border-border/80 rounded font-medium text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-text-primary mb-2">Nội dung chi tiết *</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mô tả chi tiết tình trạng hoặc linh kiện bạn cần tìm..."
                    className={`w-full p-4 bg-surface border ${errors.message ? 'border-[#ba1a1a] focus:ring-[#ba1a1a]' : 'border-border/80 focus:border-primary focus:ring-primary'} rounded font-medium text-text-primary focus:ring-1 outline-none transition-colors resize-y`}
                  ></textarea>
                  {errors.message && <p className="text-sm text-[#ba1a1a] mt-1">{errors.message}</p>}
                </div>

                {/* File upload (mock) */}
                <div>
                  <label className="block text-sm font-bold text-text-primary mb-2">Hình ảnh sản phẩm/tem mác (Tùy chọn)</label>
                  <p className="text-sm text-text-accent mb-2 italic">Gửi ảnh cũ hoặc tem model để chúng tôi tra cứu chính xác hơn.</p>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border/80 border-dashed rounded-lg bg-surface hover:bg-surface-muted transition-colors cursor-pointer group">
                    <div className="space-y-1 text-center">
                      <UploadCloud size={36} className="mx-auto text-text-accent group-hover:text-primary transition-colors" />
                      <div className="flex text-sm text-text-primary justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-bold text-primary hover:text-accent focus-within:outline-none">
                          <span>Tải lên một file</span>
                          <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" />
                        </label>
                        <p className="pl-1 text-text-accent">hoặc kéo thả vào đây</p>
                      </div>
                      <p className="text-xs text-text-accent">PNG, JPG, GIF tối đa 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5 mt-0.5">
                      <input 
                        id="consent"
                        name="consent"
                        type="checkbox" 
                        checked={formData.consent}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary bg-surface border-border/80 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="consent" className="font-medium text-text-secondary">
                        Tôi đồng ý cung cấp thông tin để {siteConfig.name} liên hệ hỗ trợ theo quy định. *
                      </label>
                    </div>
                  </div>
                  {errors.consent && <p className="text-sm text-[#ba1a1a] mt-1">{errors.consent}</p>}
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full md:w-auto font-bold shadow-sm" disabled={isSubmitting}>
                    Gửi Yêu Cầu
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Quick Actions, Map, FAQ */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Quick Actions */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border/50 flex flex-col gap-4">
              <Heading level={3} variant="h3" className="text-primary mt-0 mb-2">Hỗ Trợ Nhanh</Heading>
              <Button 
                fullWidth 
                variant="outline"
                className="font-bold border-2 border-primary text-primary hover:bg-surface-muted"
                iconLeft={<Phone size={20} />}
                href={siteConfig.contact.callUrl}
              >
                Call Now ({siteConfig.contact.hotline})
              </Button>
              <Button 
                fullWidth 
                className="font-bold bg-[#0068FF] hover:bg-blue-700 text-white shadow-sm border-[#0068FF]"
                iconLeft={<MessageCircle size={20} />}
                href={siteConfig.contact.zaloUrl}
                target="_blank"
              >
                Chat Zalo Ngay
              </Button>
            </div>

            {/* Maps Placeholder */}
            <div className="bg-background p-1 rounded-xl shadow-sm border border-border/50 flex flex-col h-80 overflow-hidden">
              <div className="w-full h-48 bg-surface-muted rounded-t-lg relative flex items-center justify-center border-b border-border/50">
                <div className="text-center text-text-accent p-4">
                  <MapPin size={32} className="mx-auto text-primary mb-2 opacity-50" />
                  <span className="text-sm font-medium">Bản đồ đang được tải...</span>
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between bg-background rounded-b-lg">
                <div>
                  <h4 className="text-sm font-bold text-primary mb-1">Địa chỉ Cửa Hàng</h4>
                  <p className="text-sm font-medium text-text-secondary">{siteConfig.contact.address}</p>
                </div>
                <Button 
                  fullWidth 
                  variant="outline"
                  className="font-bold border-2 border-primary text-primary hover:bg-surface-muted mt-2 text-sm h-10"
                  iconLeft={<MapPin size={16} />}
                  href={siteConfig.contact.mapUrl}
                  target="_blank"
                >
                  Xem Đường Đi
                </Button>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border/50">
              <Heading level={3} variant="h3" className="text-primary mt-0 mb-4 flex items-center gap-2">
                <HelpCircle size={24} className="text-accent" />
                Câu hỏi thường gặp
              </Heading>
              <div className="space-y-3">
                {contactFaqs.map((faq, index) => (
                  <div key={index} className="bg-surface rounded-lg border border-border/30 overflow-hidden">
                    <button 
                      className="w-full flex justify-between items-center p-4 text-left font-bold text-sm text-text-primary hover:text-primary transition-colors focus:outline-none"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown 
                        size={18} 
                        className={`text-text-accent shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-4 pb-4 text-sm text-text-secondary font-medium">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Final CTA */}
      <section className="bg-surface py-16 text-center border-t border-border/50">
        <Container>
          <div className="max-w-2xl mx-auto">
            <Heading level={2} variant="h2" className="text-primary mb-4">Cần Hỗ Trợ Gấp?</Heading>
            <Text variant="large" className="text-text-secondary mb-8">
              Đừng ngần ngại liên hệ trực tiếp với đội ngũ kỹ thuật của chúng tôi để giải quyết sự cố ngay lập tức.
            </Text>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="outline"
                className="font-bold border-2 border-primary text-primary hover:bg-background"
                iconLeft={<Phone size={20} />}
                href={siteConfig.contact.callUrl}
              >
                Call Hotline
              </Button>
              <Button 
                className="font-bold bg-[#0068FF] hover:bg-blue-700 text-white shadow-sm border-[#0068FF]"
                iconLeft={<MessageCircle size={20} />}
                href={siteConfig.contact.zaloUrl}
                target="_blank"
              >
                Chat Zalo
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
