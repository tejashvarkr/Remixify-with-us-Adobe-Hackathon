
import { useState } from 'react';
import { Upload, Sparkles, Palette, Layout, ArrowRight, Download, MessageSquare, Send, Wand2, Zap, Stars } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [redesigns, setRedesigns] = useState<string[]>([]);
  const [editMessage, setEditMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        const imageUrl = URL.createObjectURL(file);
        setUploadedImageUrl(imageUrl);
        toast.success('Design uploaded successfully!');
      } else {
        toast.error('Please upload an image file');
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl);
      toast.success('Design uploaded successfully!');
    }
  };

  const generateRedesigns = () => {
    if (!uploadedFile) {
      toast.error('Please upload a design first');
      return;
    }
    
    setIsGenerating(true);
    toast.success('Generating modern redesigns...');
    
    // Simulate API call with placeholder images
    setTimeout(() => {
      const placeholderImages = [
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
      ];
      setRedesigns(placeholderImages);
      setIsGenerating(false);
      toast.success('Redesigns generated successfully!');
    }, 2000);
  };

  const downloadRedesign = async (imageUrl: string, index: number) => {
    try {
      // Create a canvas to convert the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.crossOrigin = 'anonymous'; // Handle CORS
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `ai-redesign-${index + 1}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success(`Redesign ${index + 1} downloaded as PNG!`);
          }
        }, 'image/png');
      };
      
      img.onerror = () => {
        // Fallback: try direct download
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `ai-redesign-${index + 1}.jpg`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`Redesign ${index + 1} download initiated!`);
      };
      
      img.src = imageUrl;
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed. Please try again.');
    }
  };

  const sendEditMessage = () => {
    if (!editMessage.trim()) {
      toast.error('Please enter an edit message');
      return;
    }
    
    toast.success('Edit request sent! AI will process your feedback.');
    setEditMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white p-8 rounded-b-3xl shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
              <Sparkles className="h-8 w-8 text-yellow-300" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
              AI Remix My Design
            </h1>
            <div className="flex gap-1">
              <Stars className="h-6 w-6 text-yellow-300 animate-pulse" />
              <Zap className="h-6 w-6 text-yellow-300 animate-pulse delay-100" />
            </div>
          </div>
          <p className="text-xl text-purple-100 font-medium">
            Transform old designs into stunning modern masterpieces ✨
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8 space-y-8">
        {/* Features Section */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-purple-600" />
              Magic Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-1.5 animate-pulse"></div>
              <p className="text-gray-700 font-medium">📤 Upload your outdated design instantly</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-1.5 animate-pulse delay-75"></div>
              <p className="text-gray-700 font-medium">
                🎨 AI creates 3-5 stunning modern redesigns (fonts, colors, layout)
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-1.5 animate-pulse delay-150"></div>
              <p className="text-gray-700 font-medium">
                ⚡ Keep original structure or upgrade with latest style trends
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upload Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-xl flex items-center justify-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Your Design
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div
                className={`
                  relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 transform
                  ${dragActive 
                    ? 'border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 scale-105 shadow-lg' 
                    : 'border-gray-300 hover:border-purple-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-purple-50 hover:scale-102'
                  }
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-fit mx-auto mb-4">
                  <Upload className="h-12 w-12 text-purple-600" />
                </div>
                <p className="text-gray-700 mb-2 font-semibold">
                  {uploadedFile ? `✅ ${uploadedFile.name}` : '🎯 Drag & drop your design here'}
                </p>
                <p className="text-sm text-gray-500">
                  or click to select a file
                </p>
              </div>
              
              {uploadedImageUrl && (
                <div className="mt-6 animate-fade-in">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Palette className="h-4 w-4 text-purple-600" />
                    Original Design:
                  </h3>
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={uploadedImageUrl} 
                      alt="Uploaded design" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              )}

              {uploadedFile && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
                  <p className="text-green-800 text-sm font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    ✨ {uploadedFile.name} uploaded successfully
                  </p>
                </div>
              )}

              <Button 
                onClick={generateRedesigns}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 shadow-lg transform hover:scale-105 transition-all duration-200"
                size="lg"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating Magic...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate Redesigns
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Modern Redesigns Preview */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-pink-50/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-r from-pink-600 to-orange-500 text-white">
              <CardTitle className="text-xl flex items-center justify-center gap-2">
                <Stars className="h-5 w-5" />
                Your Modern Redesigns
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {redesigns.length > 0 ? (
                  redesigns.map((imageUrl, i) => (
                    <div key={i} className="relative group overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={imageUrl}
                        alt={`Redesign ${i + 1}`}
                        className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <Button
                          onClick={() => downloadRedesign(imageUrl, i)}
                          size="sm"
                          className="bg-white/90 text-gray-800 hover:bg-white shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PNG
                        </Button>
                      </div>
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        #{i + 1}
                      </div>
                    </div>
                  ))
                ) : (
                  [1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-gray-100 via-purple-50 to-pink-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 transition-all duration-300 hover:border-purple-400 hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-fit mx-auto mb-2">
                          <Layout className="h-8 w-8 text-purple-600" />
                        </div>
                        <p className="text-xs text-gray-500 font-semibold">Redesign {i}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <Palette className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
                    AI-Powered Magic Redesigns
                  </p>
                </div>
                <p className="text-xs text-purple-700 font-medium">
                  ✨ Upload your design to see stunning modern variations with updated fonts, colors, and layouts
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Message Section */}
        {redesigns.length > 0 && (
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Request Design Edits
              </CardTitle>
              <CardDescription className="text-green-100">
                Tell our AI how you'd like to modify the redesigns ✍️
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Textarea
                  placeholder="e.g., Make the colors more vibrant 🌈, change the font to something more modern ✨, adjust the layout to be more minimalist 🎯..."
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="flex-1 border-2 border-gray-200 focus:border-purple-400 rounded-xl resize-none"
                  rows={3}
                />
                <Button
                  onClick={sendEditMessage}
                  className="self-end bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Magic
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Info */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
                  Transform Your Designs with AI Magic
                </h3>
                <div className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-gray-700 max-w-2xl mx-auto text-lg font-medium">
                Our cutting-edge AI analyzes your uploaded design and generates multiple stunning modern variations, 
                keeping the essence while applying the latest contemporary design trends. ✨🎨
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
