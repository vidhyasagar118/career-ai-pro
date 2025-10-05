'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  conductAiMockInterview,
  type ConductAiMockInterviewOutput,
} from '@/ai/flows/conduct-ai-mock-interview';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Mic, Smile, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const interviewSchema = z.object({
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters.'),
  resume: z.string().min(100, 'Resume content must be at least 100 characters.'),
  question: z.string().min(10, 'Interview question must be at least 10 characters.'),
  candidateAnswer: z.string().min(20, 'Your answer must be at least 20 characters.'),
  voiceModulation: z.string(),
  confidenceLevel: z.string(),
});

type InterviewFormValues = z.infer<typeof interviewSchema>;

export default function MockInterviewPage() {
  const [feedback, setFeedback] = useState<ConductAiMockInterviewOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      jobDescription: '',
      resume: '',
      question: 'Tell me about yourself.',
      candidateAnswer: '',
      voiceModulation: 'Medium',
      confidenceLevel: 'Medium',
    },
  });

  async function onSubmit(data: InterviewFormValues) {
    setIsLoading(true);
    setFeedback(null);
    try {
      const result = await conductAiMockInterview(data);
      setFeedback(result);
    } catch (error) {
      console.error('Error during mock interview:', error);
      toast({
        title: 'Feedback Generation Failed',
        description: 'There was an error getting your feedback. Please try again.',
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
          <h1 className="font-headline text-3xl font-bold tracking-tight">AI Mock Interview</h1>
          <p className="mt-2 text-muted-foreground">
            Practice for your next interview and get instant feedback from our AI coach.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField control={form.control} name="jobDescription" render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>Job Description</FormLabel>
                      <FormControl><Textarea placeholder="Paste the job description here..." className="h-32" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="resume" render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>Your Resume</FormLabel>
                      <FormControl><Textarea placeholder="Paste your resume content here..." className="h-32" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="question" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Question</FormLabel>
                    <FormControl><Input placeholder="e.g., What is your greatest weakness?" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="candidateAnswer" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Answer</FormLabel>
                    <FormControl><Textarea placeholder="Type your answer to the question above." className="min-h-[150px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField control={form.control} name="voiceModulation" render={({ field }) => (
                     <FormItem>
                       <FormLabel>Voice Modulation (Simulated)</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl><SelectTrigger><SelectValue placeholder="Select modulation" /></SelectTrigger></FormControl>
                         <SelectContent>
                           <SelectItem value="Low">Low / Monotone</SelectItem>
                           <SelectItem value="Medium">Medium / Conversational</SelectItem>
                           <SelectItem value="High">High / Dynamic</SelectItem>
                         </SelectContent>
                       </Select>
                       <FormMessage />
                     </FormItem>
                   )} />

                   <FormField control={form.control} name="confidenceLevel" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confidence Level (Simulated)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select confidence" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="Low">Low / Unsure</SelectItem>
                            <SelectItem value="Medium">Medium / Confident</SelectItem>
                            <SelectItem value="High">High / Very Confident</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                </div>
                
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Get Feedback
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <Loader2 className="size-10 animate-spin text-primary" />
            <p className="mt-4 font-semibold">Generating your feedback...</p>
            <p className="text-sm text-muted-foreground">Our AI coach is thinking.</p>
          </div>
        )}

        {feedback && (
          <div className="space-y-6">
            <h2 className="font-headline text-2xl font-bold">Your AI Feedback</h2>
            <Card>
              <CardHeader>
                <CardTitle>Overall Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feedback.feedback}</p>
              </CardContent>
            </Card>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger><div className="flex items-center gap-2"><Sparkles className="size-4 text-primary" />Answer Quality</div></AccordionTrigger>
                <AccordionContent><p className="text-muted-foreground">{feedback.answerQualityFeedback}</p></AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger><div className="flex items-center gap-2"><Mic className="size-4 text-primary" />Voice Modulation</div></AccordionTrigger>
                <AccordionContent><p className="text-muted-foreground">{feedback.voiceModulationFeedback}</p></AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger><div className="flex items-center gap-2"><Smile className="size-4 text-primary" />Confidence Level</div></AccordionTrigger>
                <AccordionContent><p className="text-muted-foreground">{feedback.confidenceLevelFeedback}</p></AccordionContent>
              </AccordionItem>
            </Accordion>
            <Card className="bg-accent/20 border-accent">
                <CardHeader>
                    <CardTitle>Actionable Advice</CardTitle>
                    <CardDescription>How to improve for your next interview.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-accent-foreground/80">{feedback.advice}</p>
                </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
