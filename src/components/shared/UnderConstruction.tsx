import { LucideIcon, Wrench, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface UnderConstructionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  backHref?: string;
  backLabel?: string;
}

export function UnderConstruction({
  title,
  description = 'This module is currently being built. Check back soon.',
  icon: Icon = Wrench,
  backHref = '/admin',
  backLabel = 'Back to Dashboard',
}: UnderConstructionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950 shadow-sm">
        <Icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-50 dark:bg-amber-950 px-3 py-1">
        <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs font-medium text-amber-700 dark:text-amber-400">In Development</span>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      <Link
        href={backHref}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
    </div>
  );
}
