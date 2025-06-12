
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';

// Import all your page components
import Index from './pages/Index';
import Auth from './pages/Auth';
import Blog from './pages/Blog';
import BlogAdmin from './pages/BlogAdmin';
import BlogForm from './pages/BlogForm';
import Contact from './pages/Contact';
import Events from './pages/Events';
import EventsAdmin from './pages/EventsAdmin';
import Feedbacks from './pages/Feedbacks';
import Members from './pages/Members';
import NotFound from './pages/NotFound';
import AdminPanel from './pages/AdminPanel';

// Import any protected route component if you're using one
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/blog" element={<Blog />} />
            <Route 
              path="/blog/admin" 
              element={
                <ProtectedRoute>
                  <BlogAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/blog/form" 
              element={
                <ProtectedRoute>
                  <BlogForm />
                </ProtectedRoute>
              } 
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route 
              path="/events/admin" 
              element={
                <ProtectedRoute>
                  <EventsAdmin />
                </ProtectedRoute>
              } 
            />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/members" element={<Members />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
