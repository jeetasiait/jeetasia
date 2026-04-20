'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

export default function MigrationPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string | null>(null);
  const { toast } = useToast();

  const runMigrations = async () => {
    setIsRunning(true);
    setMigrationStatus('Starting migrations...');
    
    try {
      const response = await fetch('/api/admin/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Success',
          description: result.message || 'Migrations completed successfully',
        });
        setMigrationStatus('✅ Migrations completed successfully');
      } else {
        throw new Error(result.error || 'Failed to run migrations');
      }
    } catch (error) {
      console.error('Migration error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      
      setMigrationStatus(`❌ Error: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Database Migrations</h2>
        <p className="text-muted-foreground">
          Run database migrations to update your database schema.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Available Migrations</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>000_initial_functions - Creates migration utilities</li>
              <li>001_initial_schema - Creates initial database schema</li>
            </ul>
          </div>

          <div className="pt-4">
            <Button 
              onClick={runMigrations} 
              disabled={isRunning}
              className="w-full sm:w-auto"
            >
              {isRunning ? 'Running Migrations...' : 'Run Migrations'}
            </Button>
          </div>

          {migrationStatus && (
            <div className="mt-4 rounded-md bg-muted p-4">
              <pre className="font-mono text-sm">{migrationStatus}</pre>
            </div>
          )}

          <div className="rounded-md border bg-muted/50 p-4">
            <h4 className="mb-2 text-sm font-medium">Migration Status</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                <span>Migration utilities</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                <span>Database schema</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
