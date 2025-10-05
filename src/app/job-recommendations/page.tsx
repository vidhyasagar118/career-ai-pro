import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapPin, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const jobListings = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    type: 'Full-time',
    tags: ['React', 'TypeScript', 'Web Performance'],
    logoId: 'google-logo',
  },
  {
    id: 2,
    title: 'Product Manager, AI',
    company: 'Microsoft',
    location: 'Redmond, WA',
    type: 'Full-time',
    tags: ['AI/ML', 'Product Strategy', 'Agile'],
    logoId: 'microsoft-logo',
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Amazon',
    location: 'Seattle, WA',
    type: 'Full-time',
    tags: ['Python', 'SQL', 'Machine Learning'],
    logoId: 'amazon-logo',
  },
  {
    id: 4,
    title: 'UX/UI Designer',
    company: 'Apple',
    location: 'Cupertino, CA',
    type: 'Contract',
    tags: ['Figma', 'User Research', 'Prototyping'],
    logoId: 'apple-logo',
  },
  {
    id: 5,
    title: 'Backend Engineer, Streaming',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    type: 'Full-time',
    tags: ['Java', 'Microservices', 'AWS'],
    logoId: 'netflix-logo',
  },
  {
    id: 6,
    title: 'Marketing Intern',
    company: 'Facebook',
    location: 'Menlo Park, CA',
    type: 'Internship',
    tags: ['Social Media', 'Analytics', 'Campaigns'],
    logoId: 'facebook-logo',
  },
];

export default function JobRecommendationsPage() {
  const getImage = (logoId: string) => {
    return PlaceHolderImages.find((img) => img.id === logoId);
  };

  return (
    <main className="flex-1 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Job & Internship Recommendations
          </h1>
          <p className="mt-2 text-muted-foreground">
            Personalized opportunities based on your profile and career goals.
          </p>
        </div>

        <div className="space-y-6">
          {jobListings.map((job) => {
            const logo = getImage(job.logoId);
            return (
              <Card key={job.id} className="transition-shadow hover:shadow-md">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        {logo && (
                           <Image
                             src={logo.imageUrl}
                             alt={`${job.company} logo`}
                             width={48}
                             height={48}
                             className="rounded-lg border bg-white"
                             data-ai-hint={logo.imageHint}
                           />
                        )}
                        <div className="flex-1">
                          <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
                          <CardDescription className="flex items-center gap-4 pt-1">
                            <span>{job.company}</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="size-4" /> {job.location}
                            </span>
                          </CardDescription>
                        </div>
                        <Badge variant={job.type === 'Internship' ? 'secondary' : 'outline'}>
                            {job.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                   <CardFooter className="flex-col items-end justify-center p-6 sm:border-l">
                        <Button>
                            Apply Now
                        </Button>
                        <Button variant="link" size="sm" className="mt-2">
                            View Details <ExternalLink className="ml-2 size-3.5" />
                        </Button>
                    </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
