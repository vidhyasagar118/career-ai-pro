import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FileText, MessagesSquare, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'dashboard-hero');

  const featureCards = [
    {
      href: '/resume-analyzer',
      title: 'ATS Resume Analyzer',
      description: 'Get an instant analysis of your resume and improve your ATS score.',
      icon: <FileText className="size-8 text-primary" />,
    },
    {
      href: '/mock-interview',
      title: 'AI Mock Interview',
      description: 'Practice your interview skills with an AI coach and get real-time feedback.',
      icon: <MessagesSquare className="size-8 text-primary" />,
    },
    {
      href: '/job-recommendations',
      title: 'Job Recommendations',
      description: 'Discover personalized job and internship opportunities.',
      icon: <Briefcase className="size-8 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-80">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h1 className="font-headline text-3xl font-bold text-white md:text-5xl">
                Welcome to Career AI Pro
              </h1>
              <p className="mt-2 max-w-2xl text-lg text-gray-200">
                Your personal AI-powered career assistant. Let&apos;s get you hired.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((card) => (
              <Card
                key={card.title}
                className="flex flex-col transition-transform hover:scale-105 hover:shadow-lg"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">{card.icon}</div>
                  <div>
                    <CardTitle className="font-headline text-xl">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between">
                  <CardDescription>{card.description}</CardDescription>
                  <Button asChild variant="ghost" className="mt-4 justify-self-end self-start p-0 h-auto text-primary hover:text-primary/80">
                    <Link href={card.href}>
                      Get Started <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
