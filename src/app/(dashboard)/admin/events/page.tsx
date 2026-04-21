'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, Plus, Clock } from 'lucide-react';
import Link from 'next/link';

const EVENTS = [
  { id:'1', title:'Annual Sports Day',         date:'2026-05-10', time:'08:00 AM', venue:'School Grounds',    category:'Sports',   attendees:350, status:'UPCOMING', color:'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' },
  { id:'2', title:'Mid-Term Parent Meeting',   date:'2026-04-28', time:'03:00 PM', venue:'Auditorium',        category:'Academic', attendees:200, status:'UPCOMING', color:'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' },
  { id:'3', title:'Science Exhibition',        date:'2026-04-25', time:'10:00 AM', venue:'Main Hall',         category:'Academic', attendees:150, status:'UPCOMING', color:'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800' },
  { id:'4', title:'Staff Development Workshop',date:'2026-04-23', time:'02:00 PM', venue:'Conference Room',   category:'Staff',    attendees:45,  status:'UPCOMING', color:'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' },
  { id:'5', title:'Earth Day Celebration',     date:'2026-04-22', time:'09:00 AM', venue:'School Garden',     category:'Cultural', attendees:300, status:'TODAY',    color:'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800' },
  { id:'6', title:'Farewell Party — Grade 12', date:'2026-03-30', time:'05:00 PM', venue:'Auditorium',        category:'Cultural', attendees:180, status:'PAST',     color:'bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700' },
];

const STATUS_COLORS: Record<string,string> = {
  TODAY:    'bg-teal-500 text-white border-0',
  UPCOMING: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  PAST:     'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
};

const CAT_COLORS: Record<string,string> = {
  Sports:   'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
  Academic: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  Cultural: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  Staff:    'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
};

export default function EventsPage() {
  const upcoming = EVENTS.filter(e=>e.status!=='PAST');
  const past     = EVENTS.filter(e=>e.status==='PAST');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Events"
        description="Manage school events, activities, and academic calendar."
        breadcrumbs={[{ label:'Events' }]}
        actions={
          <Button size="sm" asChild>
            <Link href="/admin/events/new"><Plus className="mr-2 h-4 w-4" />Create Event</Link>
          </Button>
        }
      />

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Upcoming Events</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map(e=>(
            <Card key={e.id} className={`border shadow-sm ${e.color}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={`border-0 text-[10px] ${CAT_COLORS[e.category]}`}>{e.category}</Badge>
                  <Badge className={`text-[10px] ${STATUS_COLORS[e.status]}`}>{e.status}</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">{e.title}</h3>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{e.date}</div>
                  <div className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{e.time}</div>
                  <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{e.venue}</div>
                  <div className="flex items-center gap-1.5"><Users className="h-3 w-3" />{e.attendees} attendees</div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="h-7 text-xs flex-1">View</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs flex-1">Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {past.length>0&&(
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Past Events</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {past.map(e=>(
              <Card key={e.id} className={`border shadow-sm opacity-70 ${e.color}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`border-0 text-[10px] ${CAT_COLORS[e.category]}`}>{e.category}</Badge>
                    <Badge className={`text-[10px] ${STATUS_COLORS[e.status]}`}>{e.status}</Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{e.title}</h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{e.date}</div>
                    <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{e.venue}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
