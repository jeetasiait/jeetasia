import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Loader2 } from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  location: string | null;
  department: string | null;
  type: string | null;
  status: string | null;
  created_at: string;
}

export default function ConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState('Checking...');
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showJobDetails, setShowJobDetails] = useState<Record<string, boolean>>({});

  const testConnection = async () => {
    setConnectionStatus('Testing connection...');
    setError(null);
    setIsLoading(true);
    
    try {
      // Test careers table
      console.log('Testing careers table...');
      const { data: jobsData, error: jobsError } = await supabase
        .from('careers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (jobsError) throw jobsError;
      
      if (jobsData) {
        setJobs(jobsData);
        console.log('Fetched jobs:', jobsData);
      }
      
      setConnectionStatus('✅ Connected to Supabase!');
      
    } catch (err: any) {
      console.error('Connection test failed:', err);
      setError(err.message || 'Unknown error occurred');
      setConnectionStatus('❌ Connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Connection Status</h2>
        <div className="flex items-center space-x-2">
          <span>{connectionStatus}</span>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={testConnection}
            className="ml-2"
          >
            Test Again
          </Button>
        </div>
        
        {error && (
          <div className="mt-2 p-2 bg-red-50 text-red-700 rounded text-sm">
            <p className="font-medium">Error:</p>
            <pre className="whitespace-pre-wrap mt-1">{error}</pre>
          </div>
        )}
      </div>

      {jobs.length > 0 && (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Jobs in Database</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="secondary">{job.department}</Badge>
                      <Badge variant="outline">{job.type}</Badge>
                      <Badge variant={job.status === 'active' ? 'secondary' : 'destructive'}>
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Created: {new Date(job.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowJobDetails(prev => ({
                        ...prev,
                        [job.id]: !prev[job.id]
                      }));
                    }}
                  >
                    {showJobDetails[job.id] ? 'Hide' : 'Show'} Details
                  </Button>
                </div>
                {showJobDetails[job.id] && (
                  <div className="mt-4 text-sm text-gray-700">
                    <p><strong>Location:</strong> {job.location || 'Remote'}</p>
                    <p><strong>ID:</strong> {job.id}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-2xl text-white">
            <Loader2 className="animate-spin" />
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Make sure your Supabase URL and anon key are correct</li>
          <li>Check if your Supabase project is running and accessible</li>
          <li>Verify that Row Level Security (RLS) allows these queries</li>
          <li>Check browser's console for any CORS errors</li>
        </ul>
      </div>
    </div>
  );
}
