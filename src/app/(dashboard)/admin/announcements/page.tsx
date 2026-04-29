'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Megaphone, Pin, Users, GraduationCap, UserCheck } from 'lucide-react';
import { timeAgo } from '@/lib/utils';

function buildAnnouncements() {
  const now = Date.now();
  return [
    { id:'1', title:'School Annual Sports Day — May 10, 2026',      body:'We are pleased to announce that the Annual Sports Day will be held on Saturday, May 10, 2026. All students must participate in at least one event. Registration forms will be distributed in class.', audience:'Everyone', priority:'HIGH',   pinned:true,  date: new Date(now-1000*60*60*2),  author:'Principal Office' },
    { id:'2', title:'Mid-Term Exam Schedule Released',              body:'The mid-term examination schedule for all grades has been released. Students can collect their hall tickets from the school office starting April 22. Exams begin April 25.', audience:'Students', priority:'HIGH',   pinned:true,  date: new Date(now-1000*60*60*5),  author:'Exam Committee' },
    { id:'3', title:'Staff Meeting — April 23 at 2:00 PM',         body:'All teaching staff are requested to attend the mandatory staff meeting on April 23, 2026 at 2:00 PM in the Conference Room. Attendance is compulsory.', audience:'Staff',    priority:'MEDIUM', pinned:false, date: new Date(now-1000*60*60*8),  author:'Admin Office' },
    { id:'4', title:'Fee Payment Deadline — April 30',             body:'This is a reminder that the last date for fee payment for the current term is April 30, 2026. A late fee of ₹500 will be charged after the due date.', audience:'Parents',  priority:'MEDIUM', pinned:false, date: new Date(now-1000*60*60*24), author:'Accounts Dept.' },
    { id:'5', title:'Library Closed April 21–22 for Maintenance',  body:'The school library will remain closed on April 21 and 22 for annual maintenance and cataloguing. It will reopen on April 23 with updated inventory.', audience:'Everyone', priority:'LOW',    pinned:false, date: new Date(now-1000*60*60*48), author:'Library Dept.' },
  ];
}

const AUDIENCE_ICONS: Record<string, React.ElementType> = { Everyone: Megaphone, Students: GraduationCap, Staff: UserCheck, Parents: Users };
const PRIORITY_COLORS: Record<string,string> = {
  HIGH:   'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
  MEDIUM: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  LOW:    'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
};

export default function AnnouncementsPage() {
  const [announcements] = useState(buildAnnouncements);
  const [audience, setAudience] = useState('ALL');
  const filtered = audience==='ALL' ? announcements : announcements.filter(a=>a.audience===audience);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcements"
        description="School-wide notices and important announcements."
        breadcrumbs={[{ label:'Announcements' }]}
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />New Announcement</Button>}
      />

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['ALL','Everyone','Students','Staff','Parents'].map(tab=>(
          <button key={tab} onClick={()=>setAudience(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${audience===tab?'bg-blue-600 text-white':'bg-white dark:bg-gray-900 border dark:border-gray-700 text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
            {tab==='ALL'?'All':tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(a=>{
          const AudienceIcon = AUDIENCE_ICONS[a.audience]??Megaphone;
          return (
            <Card key={a.id} className={`border-0 shadow-sm ${a.pinned?'border-l-4 border-l-blue-500':''}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950 mt-0.5">
                      <AudienceIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {a.pinned&&<Pin className="h-3.5 w-3.5 text-blue-500 shrink-0" />}
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{a.title}</h3>
                        <Badge className={`border-0 text-[10px] ${PRIORITY_COLORS[a.priority]}`}>{a.priority}</Badge>
                        <Badge variant="outline" className="text-[10px]">{a.audience}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{a.body}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{a.author}</span>
                        <span>·</span>
                        <span suppressHydrationWarning>{timeAgo(a.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs text-red-500 border-red-200">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
