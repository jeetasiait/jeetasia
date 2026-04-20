
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Users, FileText, Image, Briefcase, LogOut, Home, Images, Database, Mail, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSupabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { supabase } = useSupabase();
  const [collapsed, setCollapsed] = useState(false);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of the admin panel",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-jeet-blue text-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-jeet-blue/80">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="py-6">
                  <div className="flex items-center justify-between px-6 pb-6 border-b">
                    <h2 className="text-lg font-bold">JEET Asia Admin</h2>
                  </div>
                  
                  <nav className="mt-6">
                    <div className="px-4 space-y-1">
                      <SidebarItem icon={<Home size={18} />} title="Dashboard" href="/admin" active={location.pathname === '/admin'} />
                      <SidebarItem icon={<Database size={18} />} title="Migrations" href="/admin/migrations" active={location.pathname.includes('/admin/migrations')} />
                      <SidebarItem icon={<FileText size={18} />} title="Projects" href="/admin/projects" active={location.pathname.includes('/admin/projects')} />
                      <SidebarItem icon={<Users size={18} />} title="Team" href="/admin/team" active={location.pathname.includes('/admin/team')} />
                      <SidebarItem icon={<Image size={18} />} title="Gallery" href="/admin/gallery" active={location.pathname.includes('/admin/gallery')} />
                      <SidebarItem icon={<Images size={18} />} title="Slider" href="/admin/slider" active={location.pathname.includes('/admin/slider')} />
                      <SidebarItem icon={<Briefcase size={18} />} title="Careers" href="/admin/careers" active={location.pathname.includes('/admin/careers')} />
                      <SidebarItem icon={<Mail size={18} />} title="Messages" href="/admin/messages" active={location.pathname.includes('/admin/messages')} />
                    </div>
                  </nav>
                  
                  <div className="mt-6 px-4 pt-6 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2" size={18} />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center">
              <h1 className="text-xl font-bold">JEET Asia Admin</h1>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-jeet-blue/80 flex items-center" 
            onClick={() => navigate('/')}
          >
            <Home className="mr-2" size={18} />
            <span>View Site</span>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile */}
        <aside className={cn(
          "hidden md:block bg-white border-r h-[calc(100vh-64px)] transition-all duration-300 sticky top-16 z-10",
          collapsed ? "w-20" : "w-72"
        )}>
          <div className="p-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="absolute -right-3 top-10 bg-white border rounded-full shadow-sm"
            >
              <ChevronRight className={cn("h-4 w-4 transition-transform", collapsed ? "" : "rotate-180")} />
            </Button>
            
            <div className="space-y-1 flex flex-col items-start">
              <SidebarItem 
                icon={<Home size={18} />} 
                title="Dashboard" 
                href="/admin" 
                active={location.pathname === '/admin'}
                collapsed={collapsed}
              />
              <SidebarItem 
                icon={<FileText size={18} />} 
                title="Projects" 
                href="/admin/projects" 
                active={location.pathname.includes('/admin/projects')}
                collapsed={collapsed}
              />
              <SidebarItem 
                icon={<Users size={18} />} 
                title="Team" 
                href="/admin/team" 
                active={location.pathname.includes('/admin/team')}
                collapsed={collapsed}
              />
              <SidebarItem 
                icon={<Image size={18} />} 
                title="Gallery" 
                href="/admin/gallery" 
                active={location.pathname.includes('/admin/gallery')}
                collapsed={collapsed}
              />
              <SidebarItem 
                icon={<Images size={18} />} 
                title="Slider" 
                href="/admin/slider" 
                active={location.pathname.includes('/admin/slider')}
                collapsed={collapsed}
              />
              <SidebarItem 
                icon={<Briefcase size={18} />} 
                title="Careers" 
                href="/admin/careers" 
                active={location.pathname.includes('/admin/careers')}
                collapsed={collapsed}
              />
              <SidebarItem 
                icon={<Mail size={18} />} 
                title="Messages" 
                href="/admin/messages" 
                active={location.pathname.includes('/admin/messages')}
                collapsed={collapsed}
              />
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100">
              <Button 
                variant="outline" 
                className={cn(
                  "w-full flex items-center justify-start transition-all",
                  collapsed ? "px-2" : "px-4"
                )}
                onClick={handleSignOut}
              >
                <LogOut className={collapsed ? "" : "mr-2"} size={18} />
                {!collapsed && <span>Sign Out</span>}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <div className="text-sm text-gray-500">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span className="font-medium">{title}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ 
  icon, 
  title, 
  href,
  active = false,
  collapsed = false
}: { 
  icon: React.ReactNode; 
  title: string; 
  href: string;
  active?: boolean;
  collapsed?: boolean;
}) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className={cn(
        "flex items-center space-x-2 py-2.5 px-3 rounded-md cursor-pointer w-full transition-colors",
        active ? "bg-jeet-blue/10 text-jeet-blue font-medium" : "hover:bg-gray-100",
        collapsed ? "justify-center" : ""
      )}
      onClick={() => navigate(href)}
    >
      <div className={cn(
        "flex-shrink-0", 
        active ? "text-jeet-blue" : "text-gray-500"
      )}>
        {icon}
      </div>
      {!collapsed && <span className={cn(
        "truncate",
        active ? "text-jeet-blue" : "text-gray-700"
      )}>{title}</span>}
    </div>
  );
};

export default AdminLayout;
