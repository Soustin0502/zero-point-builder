
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import ProtectedRoute from '@/components/ProtectedRoute';

// Pages
import Index from '@/pages/Index';
import Members from '@/pages/Members';
import Events from '@/pages/Events';
import Blog from '@/pages/Blog';
import Feedbacks from '@/pages/Feedbacks';
import Contact from '@/pages/Contact';
import BlogAdmin from '@/pages/BlogAdmin';
import BlogForm from '@/pages/BlogForm';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground">
            <LoadingScreen onLoadComplete={() => {}} />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/members" element={<Members />} />
                <Route path="/events" element={<Events />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/feedbacks" element={<Feedbacks />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route 
                  path="/admin/blog" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <BlogAdmin />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/blog/new" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <BlogForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/blog/edit/:id" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <BlogForm />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer/>
            <Toaster />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
