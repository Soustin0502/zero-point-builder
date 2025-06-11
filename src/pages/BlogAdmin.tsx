import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SkeletonLoader from "@/components/SkeletonLoader";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  excerpt?: string;
  featured_image_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const BlogAdmin = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    imageUrl: "",
    excerpt: "",
    published: false
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch posts. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("blog_posts")
        .insert([{
          title: formData.title,
          content: formData.content,
          author: formData.author,
          category: formData.category,
          featured_image_url: formData.imageUrl,
          excerpt: formData.excerpt,
          published: formData.published,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
      setFormData({
        title: "",
        content: "",
        author: "",
        category: "",
        imageUrl: "",
        excerpt: "",
        published: false
      });
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create post. Please try again.",
      });
    }
  };

  const handleEdit = (postId: string) => {
    navigate(`/admin/blog/edit/${postId}`);
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postId);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-background/90 z-10" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-1/2 w-[100rem] h-[100rem] bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom 0 -right-1/2 w-[100rem] h-[100rem] bg-secondary/20 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-20">
          <motion.div 
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative inline-block">
              <span className="text-cyber relative z-10">Admin Panel</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-[100px] scale-150" />
            </h1>
            
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-12">
              Manage and create engaging content for WarP Computer Club
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg cyber-box">
                <h3 className="text-2xl font-orbitron text-primary mb-2">{posts.length}</h3>
                <p className="text-sm text-foreground/60">Total Posts</p>
              </div>
              <div className="p-6 bg-card/30 backdrop-blur-sm border border-secondary/20 rounded-lg cyber-box">
                <h3 className="text-2xl font-orbitron text-secondary mb-2">
                  {posts.filter(post => post.published).length}
                </h3>
                <p className="text-sm text-foreground/60">Published Posts</p>
              </div>
              <div className="p-6 bg-card/30 backdrop-blur-sm border border-accent/20 rounded-lg cyber-box">
                <h3 className="text-2xl font-orbitron text-accent mb-2">
                  {posts.filter(post => !post.published).length}
                </h3>
                <p className="text-sm text-foreground/60">Draft Posts</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />
      </section>

      <div className="container mx-auto px-4">
        {/* Create New Post Section */}
        <section className="py-20">
          <div className="text-center relative mb-16">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative inline-block">
              <span className="text-cyber relative z-10">Create New Post</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-[100px] scale-150" />
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
          </div>

          <Card className="bg-card/50 cyber-box">
            <CardHeader>
              <CardTitle className="text-xl font-orbitron text-primary">Blog Post Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Brief summary of the post"
                    className="min-h-[100px] bg-background/50"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    required
                    className="min-h-[200px] bg-background/50"
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    required
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="ai">Artificial Intelligence</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="imageUrl">Featured Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                    className="bg-background/50"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, published: checked as boolean })
                    }
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>
                <Button type="submit" className="w-full">
                  Create Post
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Existing Posts Section */}
        <section className="py-20">
          <div className="text-center relative mb-16">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative inline-block">
              <span className="text-cyber relative z-10">Manage Existing Posts</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-[100px] scale-150" />
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
          </div>

          {loading ? (
            <SkeletonLoader count={3} />
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-card/50 cyber-box hover:bg-card/70 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl font-orbitron text-primary flex justify-between items-center">
                      <span>{post.title}</span>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        post.published 
                          ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80 mb-2">
                      <span className="font-semibold">Author:</span> {post.author}
                    </p>
                    <p className="text-sm text-foreground/80 mb-2">
                      <span className="font-semibold">Category:</span> {post.category}
                    </p>
                    <p className="text-sm text-foreground/80 mb-4">
                      {post.excerpt || post.content.substring(0, 200)}...
                    </p>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(post.id)}
                        className="hover:bg-primary/20 transition-colors duration-300"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
                        className="hover:bg-destructive/80 transition-colors duration-300"
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

{/*       <Footer /> */}
    </div>
  );
};

export default BlogAdmin;
