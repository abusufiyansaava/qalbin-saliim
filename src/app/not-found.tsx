import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-gray-200">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          The page you're looking for might have been moved, deleted, or never existed. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/"><Button>Go Home</Button></Link>
          <Link href="/donate"><Button variant="outline">Make an Impact</Button></Link>
        </div>
      </div>
    </div>
  );
}