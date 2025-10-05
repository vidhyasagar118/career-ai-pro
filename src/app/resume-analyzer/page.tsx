'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  analyzeResumeContent,
  type AnalyzeResumeContentOutput,
} from '@/ai/flows/analyze-resume-content';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const resumeSchema = z.object({
  resumeContent: z.string().min(100, {
    message: 'Resume content must be at least 100 characters.',
  }),
});

type ResumeFormValues = z.infer<typeof resumeSchema>;

export default function ResumeAnalyzerPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResumeContentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      resumeContent: '',
    },
  });

  async function onSubmit(data: ResumeFormValues) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeResumeContent(data);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing your resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex-1 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">ATS Resume Analyzer</h1>
          <p className="mt-2 text-muted-foreground">
            Paste your resume content below to get an AI-powered analysis of its ATS compatibility.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="resumeContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Resume Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste the full content of your resume here..."
                          className="min-h-[300px] text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Analyze Resume
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <Loader2 className="size-10 animate-spin text-primary" />
            <p className="mt-4 font-semibold">Analyzing your resume...</p>
            <p className="text-sm text-muted-foreground">This may take a few moments.</p>
          </div>
        )}

        {analysisResult && (
          <div className="space-y-6">
            <h2 className="font-headline text-2xl font-bold">Analysis Results</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-accent/20 border-accent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="text-accent" />
                    ATS Compatibility Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-end gap-2">
                    <p className="font-headline text-6xl font-bold text-accent">{analysisResult.atsScore}</p>
                    <p className="text-2xl font-semibold text-accent">/ 100</p>
                  </div>
                  <Progress value={analysisResult.atsScore} className="h-3 [&>div]:bg-accent" />
                  <CardDescription>
                    This score estimates how well your resume will be parsed by Applicant Tracking Systems.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Improvement Recommendations</CardTitle>
                  <CardDescription>Follow these suggestions to boost your ATS score.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground dark:prose-invert">
                     <p>{analysisResult.recommendations}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
