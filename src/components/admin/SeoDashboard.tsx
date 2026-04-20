import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/lib/supabase';
import { ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';
import SeoGuide from './SeoGuide';

interface PageSeoStatus {
  page: string;
  hasTitle: boolean;
  hasDescription: boolean;
  descriptionLength: number;
  titleLength: number;
  score: number;
}

const SeoDashboard = () => {
  const navigate = useNavigate();
  const [seoStats, setSeoStats] = useState({
    totalPages: 0,
    pagesWithSeo: 0,
    averageScore: 0,
  });
  const [pageStatuses, setPageStatuses] = useState<PageSeoStatus[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchSeoData();
  }, []);
  
  const fetchSeoData = async () => {
    setLoading(true);
    try {
      // Simulated data for demo
      const pages = ['/careers', '/projects', '/team', '/contact', '/gallery', '/about'];
      
      // Access the page_seo table directly, no typing it first
      const { data: seoData, error } = await supabase
        .from('page_seo')
        .select('page_path, title, description, keywords');
      
      if (error) {
        console.error('Error fetching SEO data:', error);
        throw error;
      }
      
      const seoEntries = seoData || [];
      
      // Calculate SEO status for known pages
      const statuses = pages.map(page => {
        const seoEntry = seoEntries.find((entry: any) => entry.page_path === page);
        
        const hasTitle = !!seoEntry?.title;
        const hasDescription = !!seoEntry?.description;
        const titleLength = seoEntry?.title?.length || 0;
        const descriptionLength = seoEntry?.description?.length || 0;
        
        // Simple scoring algorithm
        let score = 0;
        if (hasTitle) score += 30;
        if (hasDescription) score += 30;
        if (titleLength >= 40 && titleLength <= 60) score += 20;
        else if (titleLength > 0) score += 10;
        if (descriptionLength >= 120 && descriptionLength <= 160) score += 20;
        else if (descriptionLength > 0) score += 10;
        
        return {
          page,
          hasTitle,
          hasDescription,
          titleLength,
          descriptionLength,
          score
        };
      });
      
      setPageStatuses(statuses);
      
      const totalWithSeo = statuses.filter(s => s.score > 30).length;
      const avgScore = statuses.reduce((sum, s) => sum + s.score, 0) / statuses.length;
      
      setSeoStats({
        totalPages: pages.length,
        pagesWithSeo: totalWithSeo,
        averageScore: Math.round(avgScore)
      });
    } catch (error) {
      console.error('Error fetching SEO data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">SEO Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((seoStats.pagesWithSeo / seoStats.totalPages) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {seoStats.pagesWithSeo} of {seoStats.totalPages} pages have SEO metadata
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average SEO Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(seoStats.averageScore)}`}>
              {seoStats.averageScore}/100
            </div>
            <p className="text-xs text-muted-foreground">Based on title, description & keywords</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={() => navigate('/admin/seo')} 
              className="w-full"
            >
              Manage SEO Settings
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={fetchSeoData}
            >
              Refresh Data
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Page SEO Status</CardTitle>
            <CardDescription>SEO completeness by page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pageStatuses} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="page" width={80} />
                  <Tooltip 
                    formatter={(value, name) => [`${value}/100`, 'SEO Score']}
                    labelFormatter={(value) => `Page: ${value}`}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="#3b82f6" 
                    radius={[0, 4, 4, 0]} 
                    label={{ position: 'right', formatter: (value) => `${value}` }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <SeoGuide />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Page SEO Checklist</CardTitle>
          <CardDescription>Status of individual page SEO elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md divide-y">
            {pageStatuses.map((status, index) => (
              <div key={index} className="flex items-center justify-between p-3">
                <div>
                  <span className="font-medium">{status.page}</span>
                  <div className="flex space-x-3 mt-1">
                    <div className="flex items-center text-xs">
                      {status.hasTitle ? (
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span>Title</span>
                    </div>
                    
                    <div className="flex items-center text-xs">
                      {status.hasDescription ? (
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span>Description</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`text-sm font-semibold ${getScoreColor(status.score)}`}>
                    {status.score}/100
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="p-1 h-8 w-8"
                    onClick={() => {
                      const entry = pageStatuses.find(s => s.page === status.page);
                      if (entry) {
                        navigate(`/admin/seo/add?path=${entry.page}`);
                      }
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoDashboard;
