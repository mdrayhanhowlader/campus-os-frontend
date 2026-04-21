import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

const EVENTS = [
  { id: '1', title: 'Math Final Exam',       date: new Date('2026-04-22'), location: 'Hall A', category: 'exam',     color: 'bg-red-500' },
  { id: '2', title: 'Parent-Teacher Meeting', date: new Date('2026-04-24'), location: 'Main Hall', category: 'meeting', color: 'bg-blue-500' },
  { id: '3', title: 'Science Fair',           date: new Date('2026-04-28'), location: 'Gymnasium', category: 'event',  color: 'bg-green-500' },
  { id: '4', title: 'Term 2 Results Day',     date: new Date('2026-05-02'), location: 'Classrooms', category: 'academic', color: 'bg-purple-500' },
];

const CATEGORY_STYLE: Record<string, string> = {
  exam:    'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
  meeting: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  event:   'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  academic:'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
};

export function UpcomingEvents() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Upcoming Events</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {EVENTS.map((event) => (
          <div key={event.id} className="flex items-start gap-3">
            <div className={cn('mt-0.5 h-2 w-2 shrink-0 rounded-full', event.color)} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">{event.title}</p>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDate(event.date, 'MMM d')}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </span>
              </div>
            </div>
            <Badge className={cn('shrink-0 text-[10px] px-1.5 py-0 border-0 capitalize', CATEGORY_STYLE[event.category])}>
              {event.category}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
