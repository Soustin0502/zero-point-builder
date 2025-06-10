
-- Create table for blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL,
  category TEXT DEFAULT 'announcement',
  featured_image_url TEXT,
  instagram_post_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for events with history
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'intra', 'inter', 'workshop', 'competition'
  event_date TIMESTAMP WITH TIME ZONE,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  venue TEXT,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  status TEXT DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'completed', 'cancelled'
  featured_image_url TEXT,
  registration_link TEXT,
  results_url TEXT,
  winners JSONB, -- Store winner details as JSON
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for testimonials/feedback
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  feedback TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  position TEXT, -- student role, year, etc.
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since these are public-facing features)
CREATE POLICY "Public can view published blog posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (published = true);

CREATE POLICY "Public can view events" 
  ON public.events 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public can view approved testimonials" 
  ON public.testimonials 
  FOR SELECT 
  USING (approved = true);

-- Allow anyone to insert testimonials (feedback form)
CREATE POLICY "Anyone can submit testimonials" 
  ON public.testimonials 
  FOR INSERT 
  WITH CHECK (true);

-- Insert some sample data
INSERT INTO public.blog_posts (title, content, excerpt, author, category, published) VALUES
  ('WarP Intra 2025 Announcement', 'We are excited to announce our flagship intra-school competition WarP Intra 2025! This year brings exciting new challenges in programming, web development, and AI/ML. Registration opens soon!', 'Announcing WarP Intra 2025 - our biggest intra-school tech competition yet!', 'WarP Admin', 'announcement', true),
  ('New Instagram Content', 'Check out our latest posts on Instagram featuring our recent workshop highlights and member spotlights. Follow @warp_computerclub for daily tech content!', 'Follow our Instagram for the latest updates and tech content.', 'WarP Social Media', 'social', true);

INSERT INTO public.events (title, description, event_type, event_date, venue, status) VALUES
  ('WarP Intra 2025', 'Our flagship intra-school competition featuring competitive programming, web development, and AI/ML challenges', 'intra', '2025-08-02 09:00:00+00', 'School Auditorium', 'upcoming'),
  ('Python Workshop Series', 'Comprehensive Python programming workshop for beginners', 'workshop', '2024-12-15 14:00:00+00', 'Computer Lab', 'completed'),
  ('Hackathon 2024', 'Annual 24-hour hackathon with exciting prizes', 'competition', '2024-11-20 09:00:00+00', 'School Campus', 'completed');

INSERT INTO public.testimonials (name, feedback, rating, position, approved) VALUES
  ('Arjun Sharma', 'WarP has been an incredible journey! The programming competitions and workshops have really enhanced my coding skills. The community is very supportive.', 5, 'Class 12 Student', true),
  ('Priya Patel', 'Being part of WarP Computer Club has opened so many opportunities for me. The events are well-organized and the learning experience is outstanding.', 5, 'Class 11 Student', true),
  ('Rohit Kumar', 'The hackathons organized by WarP are amazing! Great platform to showcase creativity and learn from peers. Highly recommend joining.', 4, 'Class 12 Student', true);
