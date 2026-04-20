
import { Navigate, Outlet } from 'react-router-dom';
import { useSupabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

const AuthGuard = () => {
  const { user, loading } = useSupabase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-jeet-blue" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AuthGuard;
