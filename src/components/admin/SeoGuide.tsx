
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Info } from 'lucide-react';

const SeoGuide = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Best Practices</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertTitle>SEO Tips</AlertTitle>
          <AlertDescription>
            Follow these guidelines to improve your website's search engine ranking.
          </AlertDescription>
        </Alert>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="titles">
            <AccordionTrigger>Page Titles</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Keep titles between 50-60 characters</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Include your primary keyword near the beginning</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Make each title unique across your website</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="descriptions">
            <AccordionTrigger>Meta Descriptions</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Keep descriptions between 150-160 characters</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Include a call-to-action when appropriate</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Use your main keywords naturally</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="keywords">
            <AccordionTrigger>Keywords</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Research relevant keywords for your industry</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Focus on long-tail keywords for specific content</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Use keywords naturally in your content (5-7 times per 1000 words)</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="images">
            <AccordionTrigger>Image Optimization</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Use descriptive filenames (e.g., jeet-asia-road-project.jpg)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Always add relevant alt text to images</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Compress images for faster loading times</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default SeoGuide;
