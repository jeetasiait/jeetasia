import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  onSubmit?: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  isEdit?: boolean;
  footerContent?: React.ReactNode;
  className?: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  description,
  onSubmit,
  onCancel,
  isLoading = false,
  isEdit = false,
  footerContent,
  className,
}) => {
  return (
    <Card className={cn("w-full overflow-hidden border shadow-sm", className)}>
      <form onSubmit={onSubmit}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
              {description && (
                <CardDescription className="mt-1.5">{description}</CardDescription>
              )}
            </div>
            {onCancel && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={onCancel}
                className="text-muted-foreground flex items-center"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Back
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
        {(onSubmit || footerContent) && (
          <CardFooter className="flex justify-end gap-2 py-4 bg-muted/20 border-t px-6">
            {footerContent ? (
              footerContent
            ) : (
              <>
                {onCancel && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isEdit ? 'Updating...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isEdit ? 'Update' : 'Save'}
                    </>
                  )}
                </Button>
              </>
            )}
          </CardFooter>
        )}
      </form>
    </Card>
  );
};

export default FormLayout;
