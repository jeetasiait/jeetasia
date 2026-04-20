import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  Building2, 
  CreditCard, 
  Settings,
  Users,
  FileText,
  GalleryVertical,
  Briefcase,
  MessageSquareText,
  Search,
  Images
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const mainNav: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: 'Projects',
    href: '/admin/projects',
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    title: 'Team',
    href: '/admin/team',
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: 'Gallery',
    href: '/admin/gallery',
    icon: <GalleryVertical className="w-5 h-5" />,
  },
  {
    title: 'Slider',
    href: '/admin/slider',
    icon: <Images className="w-5 h-5" />,
  },
  {
    title: 'Careers',
    href: '/admin/careers',
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    title: 'Applications',
    href: '/admin/applications',
    icon: <MessageSquareText className="w-5 h-5" />,
  },
  {
    title: 'SEO',
    href: '/admin/seo',
    icon: <Search className="w-5 h-5" />,
  },
];

const AdminNavigation = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={cn(
      'h-screen border-r bg-slate-950 text-white transition-all duration-300',
      expanded ? 'w-64' : 'w-16'
    )}>
      <div className="p-4 flex justify-between items-center">
        <div className={cn("transition-opacity", 
          expanded ? "opacity-100" : "opacity-0"
        )}>
          <h1 className="text-lg font-bold">JEET Admin</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="text-white hover:bg-slate-800 hover:text-white"
        >
          {expanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>
          )}
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-4.5rem)]">
        <div className="py-2">
          <nav className="grid gap-1 px-2">
            {mainNav.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all',
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )
                }
                end={item.href === '/admin'}
              >
                {item.icon}
                <span
                  className={cn(
                    "transition-all",
                    expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.title}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdminNavigation;
