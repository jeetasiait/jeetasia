import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './App.css';
import { ScrollRestoration } from './components/ScrollRestoration';
import Home from './pages/Index';
import About from './pages/About';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AddProject from './pages/admin/AddProject';
import EditProject from './pages/admin/EditProject';
import AdminTeam from './pages/admin/AdminTeam';
import AdminGallery from './pages/admin/AdminGallery';
import AdminCareers from './pages/admin/AdminCareers';
import AdminSeo from './pages/admin/AdminSeo';
import AdminMessages from './pages/admin/AdminMessages';
import TeamForm from './pages/admin/TeamForm';
import GalleryForm from './pages/admin/GalleryForm';
import CareerForm from './pages/admin/CareerForm';
import JobApplications from './pages/admin/JobApplications';
import { Button } from './components/ui/button';
import { useNavigate, Navigate } from 'react-router-dom';
import { SupabaseProvider, useSupabase } from './lib/supabase';
import AdminLayout from './components/layouts/AdminLayout';
import AdminSlider from './pages/admin/AdminSlider';
import SliderForm from './pages/admin/SliderForm';
import MigrationsPage from './pages/admin/Migrations';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';
import { toast } from '@/hooks/use-toast';
import ConnectionTest from './components/admin/ConnectionTest';

// AuthGuard component to protect admin routes
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useSupabase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jeet-blue"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by the useEffect
  }

  return <>{children}</>;
}

// Login component with Supabase authentication
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabase } = useSupabase();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: 'Access Granted',
        description: 'Initializing admin command center.',
      });
      
      navigate('/admin');
    } catch (error: any) {
      toast({
        title: 'Authentication Failed',
        description: error.error_description || error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg p-1"
      >
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 md:p-16 shadow-2xl">
          <div className="text-center mb-12">
             <img 
               src="/jeetasia-uploads/7e6f9b24-6c98-48a1-8e02-ff9bc51058f9.png" 
               alt="JEET Asia" 
               className="h-16 mx-auto mb-10 brightness-0 invert"
             />
             <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Command Center</h1>
             <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Secure Admin Access Only</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-white font-black uppercase tracking-widest text-xs ml-4" htmlFor="email">Security ID (Email)</label>
              <input
                id="email"
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:ring-2 ring-blue-500 outline-none transition-all font-medium"
                placeholder="Enter authorized email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-white font-black uppercase tracking-widest text-xs ml-4" htmlFor="password">Access Key (Password)</label>
              <input
                id="password"
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:ring-2 ring-blue-500 outline-none transition-all font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black tracking-widest uppercase transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  AUTHORIZING...
                </>
              ) : 'AUTHENTICATE'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollRestoration />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "careers",
        element: <Careers />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
  },
  // Admin Routes
  {
    path: "admin",
    element: (
      <>
        <ScrollRestoration />
        <AuthGuard>
          <Outlet />
        </AuthGuard>
      </>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "projects",
        element: <AdminProjects />,
      },
      {
        path: "projects/add",
        element: <AddProject />,
      },
      {
        path: "projects/edit/:id",
        element: <EditProject />,
      },
      {
        path: "team",
        element: <AdminTeam />,
      },
      {
        path: "team/add",
        element: <TeamForm />,
      },
      {
        path: "team/edit/:id",
        element: <TeamForm />,
      },
      {
        path: "gallery",
        element: <AdminGallery />,
      },
      {
        path: "gallery/add",
        element: <GalleryForm />,
      },
      {
        path: "gallery/edit/:id",
        element: <GalleryForm />,
      },
      {
        path: "careers",
        element: <AdminCareers />,
      },
      {
        path: "careers/add",
        element: <CareerForm />,
      },
      {
        path: "careers/edit/:id",
        element: <CareerForm />,
      },
      {
        path: "careers/applications",
        element: <JobApplications />,
      },
      {
        path: "seo",
        children: [
          {
            index: true,
            element: <AdminSeo />,
          },
          {
            path: "add",
            element: <AdminSeo />,
          },
          {
            path: "edit/:id",
            element: <AdminSeo />,
          }
        ]
      },
      {
        path: "slider",
        element: <AdminSlider />,
      },
      {
        path: "slider/add",
        element: <SliderForm />,
      },
      {
        path: "slider/edit/:id",
        element: <SliderForm />,
      },
      {
        path: "migrations",
        element: <MigrationsPage />,
      },
      {
        path: "test",
        element: <ConnectionTest />,
      },
      {
        path: "messages",
        element: <AdminMessages />,
      },
    ]
  },
]);

function App() {
  return (
    <HelmetProvider>
      <SupabaseProvider>
        <RouterProvider router={router} />
      </SupabaseProvider>
    </HelmetProvider>
  );
}

export default App;
