
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Clock } from 'lucide-react';
import type { JobPosting } from '@/types/careers';

interface JobApplicationFormProps {
  job: JobPosting;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const JobApplicationForm = ({ job, onClose, onSubmit }: JobApplicationFormProps) => {
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    
    try {
      await onSubmit(e);
    } catch (error) {
      console.error("Error handling form submission:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <CardTitle className="text-2xl">Apply for: {job.title}</CardTitle>
            <CardDescription className="mt-2">
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center text-jeet-gray-medium">
                  <MapPin className="h-4 w-4 mr-1" /> {job.location}
                </span>
                <span className="flex items-center text-jeet-gray-medium">
                  <Clock className="h-4 w-4 mr-1" /> {job.type}
                </span>
              </div>
            </CardDescription>
          </div>
          <Button variant="outline" onClick={onClose}>
            Back to Listings
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">Full Name *</label>
              <input 
                id="fullName" 
                name="fullName"
                required 
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
              <input 
                id="email" 
                name="email"
                type="email" 
                required 
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number *</label>
              <input 
                id="phone" 
                name="phone"
                type="tel" 
                required 
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="resumeLink" className="text-sm font-medium">CV/Resume Link (Google Drive) *</label>
              <input 
                id="resumeLink" 
                name="resumeLink"
                type="url" 
                required 
                placeholder="https://drive.google.com/file/d/..."
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
              <p className="text-xs text-gray-500">Please provide a Google Drive link to your resume/CV</p>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="coverLetter" className="text-sm font-medium">Cover Letter (Optional)</label>
            <Textarea 
              id="coverLetter" 
              name="coverLetter"
              rows={5} 
              placeholder="Tell us why you're interested in this position and why you'd be a good fit..."
              className="w-full"
            />
          </div>
          <div className="flex justify-end">
            <Button 
              type="submit"
              className="bg-jeet-blue hover:bg-jeet-blue/90 w-full md:w-auto"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobApplicationForm;
