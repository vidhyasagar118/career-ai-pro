import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="size-16 animate-spin text-primary" />
    </div>
  );
}
