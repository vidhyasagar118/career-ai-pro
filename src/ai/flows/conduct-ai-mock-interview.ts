'use server';

/**
 * @fileOverview An AI-driven mock interview flow that assesses performance
 * based on voice modulation, confidence level, and answer quality.
 *
 * - conductAiMockInterview - A function that handles the mock interview process.
 * - ConductAiMockInterviewInput - The input type for the conductAiMockInterview function.
 * - ConductAiMockInterviewOutput - The return type for the conductAiMockInterview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConductAiMockInterviewInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description for which the mock interview is being conducted.'),
  resume: z.string().describe('The resume of the candidate.'),
  question: z.string().describe('The interview question to ask the candidate.'),
  candidateAnswer: z.string().describe('The candidate answer to the question.'),
  voiceModulation: z
    .string()
    .describe('The candidate voice modulation during the answer.'),
  confidenceLevel: z
    .string()
    .describe('The candidate confidence level during the answer.'),
});
export type ConductAiMockInterviewInput = z.infer<
  typeof ConductAiMockInterviewInputSchema
>;

const ConductAiMockInterviewOutputSchema = z.object({
  feedback: z.string().describe('Feedback on the candidate answer.'),
  voiceModulationFeedback: z
    .string()
    .describe('Feedback on the candidate voice modulation.'),
  confidenceLevelFeedback: z
    .string()
    .describe('Feedback on the candidate confidence level.'),
  answerQualityFeedback: z
    .string()
    .describe('Feedback on the quality of the candidate answer.'),
  advice: z
    .string()
    .describe('Specific advice on how to improve the candidate responses.'),
});
export type ConductAiMockInterviewOutput = z.infer<
  typeof ConductAiMockInterviewOutputSchema
>;

export async function conductAiMockInterview(
  input: ConductAiMockInterviewInput
): Promise<ConductAiMockInterviewOutput> {
  return conductAiMockInterviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conductAiMockInterviewPrompt',
  input: {schema: ConductAiMockInterviewInputSchema},
  output: {schema: ConductAiMockInterviewOutputSchema},
  prompt: `You are an AI-powered interview coach. You will conduct a mock interview with a candidate, assess their performance, and provide feedback.

  Job Description: {{{jobDescription}}}
  Resume: {{{resume}}}
  Question: {{{question}}}
  Candidate Answer: {{{candidateAnswer}}}
  Voice Modulation: {{{voiceModulation}}}
  Confidence Level: {{{confidenceLevel}}}

  Provide feedback on the candidate answer, voice modulation, and confidence level. Also, give specific advice on how to improve the candidate responses to common interview questions.

  Format your answer as follows:

  Feedback: [overall feedback]
  Voice Modulation Feedback: [feedback on voice modulation]
  Confidence Level Feedback: [feedback on confidence level]
  Answer Quality Feedback: [feedback on answer quality]
  Advice: [specific advice on how to improve]`,
});

const conductAiMockInterviewFlow = ai.defineFlow(
  {
    name: 'conductAiMockInterviewFlow',
    inputSchema: ConductAiMockInterviewInputSchema,
    outputSchema: ConductAiMockInterviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
