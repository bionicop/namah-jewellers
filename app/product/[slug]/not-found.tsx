import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-gray-900">Product Not Found</h1>
          <p className="text-gray-600">
            We couldn't find the product you're looking for.
          </p>
        </div>
        <Button asChild>
          <Link href="/buy" className="inline-flex items-center gap-2">
            Return to Shop
          </Link>
        </Button>
      </div>
    </div>
  );
}
