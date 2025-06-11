
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

const BlogForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: 'announcement',
    featured_image_url: '',
    instagram_post_url: '',
    published: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Blog post has been created successfully.",
      });

      // Reset form
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        category: 'announcement',
        featured_image_url: '',
        instagram_post_url: '',
        published: false
      });

      navigate('/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Button>
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-primary">
              Create New Blog Post
            </h1>
          </div>

          <Card className="bg-card/50 cyber-border max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron text-primary">
                Blog Post Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-fira">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter blog post title"
                      required
                      className="font-fira"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author" className="font-fira">Author *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      placeholder="Author name"
                      required
                      className="font-fira"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="font-fira">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Brief description of the post"
                    className="font-fira"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="font-fira">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Write your blog post content here..."
                    required
                    className="font-fira min-h-[200px]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="font-fira">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="announcement">Announcement</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="tech">Tech News</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featured_image" className="font-fira">Featured Image URL</Label>
                    <Input
                      id="featured_image"
                      value={formData.featured_image_url}
                      onChange={(e) => handleInputChange('featured_image_url', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="font-fira"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram_url" className="font-fira">Instagram Post URL (Optional)</Label>
                  <Input
                    id="instagram_url"
                    value={formData.instagram_post_url}
                    onChange={(e) => handleInputChange('instagram_post_url', e.target.value)}
                    placeholder="https://instagram.com/p/..."
                    className="font-fira"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => handleInputChange('published', checked)}
                  />
                  <Label htmlFor="published" className="font-fira">Publish immediately</Label>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/80"
                  >
                    {formData.published ? <Send size={16} /> : <Save size={16} />}
                    {loading ? 'Saving...' : (formData.published ? 'Publish' : 'Save Draft')}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/blog')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

{/*       <Footer /> */}
    </div>
  );
};

export default BlogForm;
