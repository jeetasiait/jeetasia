
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Image, Briefcase, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import SeoDashboard from '@/components/admin/SeoDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}

const StatCard = ({ title, value, icon, description }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      <div className="h-8 w-8 rounded-full bg-jeet-blue/20 p-1 text-jeet-blue flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projects: 0,
    team: 0,
    gallery: 0,
    careers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [projectsData, teamData, galleryData, careersData] = await Promise.all([
          supabase.from('projects').select('count', { count: 'exact', head: true }),
          supabase.from('team').select('count', { count: 'exact', head: true }),
          supabase.from('gallery').select('count', { count: 'exact', head: true }),
          supabase.from('careers').select('count', { count: 'exact', head: true })
        ]);

        setStats({
          projects: projectsData.count || 0,
          team: teamData.count || 0,
          gallery: galleryData.count || 0,
          careers: careersData.count || 0
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <h2 className="text-lg font-medium">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Projects"
              value={stats.projects}
              icon={<FileText className="h-4 w-4" />}
              description="Active projects in the system"
            />
            <StatCard
              title="Team Members"
              value={stats.team}
              icon={<Users className="h-4 w-4" />}
              description="Staff profiles"
            />
            <StatCard
              title="Gallery Items"
              value={stats.gallery}
              icon={<Image className="h-4 w-4" />}
              description="Images and videos"
            />
            <StatCard
              title="Job Openings"
              value={stats.careers}
              icon={<Briefcase className="h-4 w-4" />}
              description="Active job listings"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/projects')}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FileText className="h-6 w-6 text-jeet-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium">Manage Projects</h3>
                      <p className="text-sm text-muted-foreground">Add or edit projects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Team Members</h3>
                      <p className="text-sm text-muted-foreground">Manage team profiles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/seo')}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Search className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">SEO Settings</h3>
                      <p className="text-sm text-muted-foreground">Optimize for search engines</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="seo">
          <SeoDashboard />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
