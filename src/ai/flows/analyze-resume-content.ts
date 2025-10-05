'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing resume content and providing an ATS score with improvement recommendations.
 *
 * - analyzeResumeContent - A function that takes resume content as input and returns an ATS score and recommendations.
 * - AnalyzeResumeContentInput - The input type for the analyzeResumeContent function.
 * - AnalyzeResumeContentOutput - The return type for the analyzeResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeContentInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The content of the resume to be analyzed.'),
});
export type AnalyzeResumeContentInput = z.infer<typeof AnalyzeResumeContentInputSchema>;

const AnalyzeResumeContentOutputSchema = z.object({
  atsScore: z
    .number()
    .describe('The ATS score of the resume (0-100).'),
  recommendations: z
    .string()
    .describe('Specific recommendations for improving the resume for ATS compatibility.'),
});
export type AnalyzeResumeContentOutput = z.infer<typeof AnalyzeResumeContentOutputSchema>;

export async function analyzeResumeContent(
  input: AnalyzeResumeContentInput
): Promise<AnalyzeResumeContentOutput> {
  return analyzeResumeContentFlow(input);
}

const analyzeResumeContentPrompt = ai.definePrompt({
  name: 'analyzeResumeContentPrompt',
  input: {schema: AnalyzeResumeContentInputSchema},
  output: {schema: AnalyzeResumeContentOutputSchema},
  prompt: `You are an expert resume analyzer specializing in Applicant Tracking Systems (ATS). Evaluate the following resume content and provide an ATS score (0-100) and specific recommendations for improvement.

Resume Content: {{{resumeContent}}}

Consider factors such as keyword optimization, formatting, section headers, and overall ATS compatibility.

Respond with an ATS score (0-100) and specific recommendations for improving the resume for ATS compatibility.  The response must be valid JSON.  The ATS score must be a number.  Recommendations should be specific and actionable.
`,
});

const analyzeResumeContentFlow = ai.defineFlow(
  {
    name: 'analyzeResumeContentFlow',
    inputSchema: AnalyzeResumeContentInputSchema,
    outputSchema: AnalyzeResumeContentOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumeContentPrompt(input);
    return output!;
  }
);
