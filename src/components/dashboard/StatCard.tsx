import Link from 'next/link';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const colorMap = {
  blue:   { bg: 'bg-blue-50 dark:bg-blue-950',   icon: 'bg-blue-600',   text: 'text-blue-700 dark:text-blue-400' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950', icon: 'bg-purple-600', text: 'text-purple-700 dark:text-purple-400' },
  green:  { bg: 'bg-green-50 dark:bg-green-950',  icon: 'bg-green-600',  text: 'text-green-700 dark:text-green-400' },
  amber:  { bg: 'bg-amber-50 dark:bg-amber-950',  icon: 'bg-amber-600',  text: 'text-amber-700 dark:text-amber-400' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-950', icon: 'bg-indigo-600', text: 'text-indigo-700 dark:text-indigo-400' },
  rose:   { bg: 'bg-rose-50 dark:bg-rose-950',    icon: 'bg-rose-600',   text: 'text-rose-700 dark:text-rose-400' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950', icon: 'bg-orange-600', text: 'text-orange-700 dark:text-orange-400' },
  teal:   { bg: 'bg-teal-50 dark:bg-teal-950',    icon: 'bg-teal-600',   text: 'text-teal-700 dark:text-teal-400' },
};

export interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: keyof typeof colorMap;
  href?: string;
}

export function StatCard({ label, value, change, trend, icon: Icon, color, href }: StatCardProps) {
  const colors = colorMap[color];
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor =
    trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground';

  const cardContent = (
    <Card className={cn('border-0 shadow-sm transition-all hover:shadow-md', colors.bg)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
              <TrendIcon className="h-3 w-3" />
              <span>{change}</span>
            </div>
          </div>
          <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', colors.icon)}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return href ? (
    <Link href={href} className="block">{cardContent}</Link>
  ) : cardContent;
}
