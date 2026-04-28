import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, CreditCard, Award, BookOpen, Calendar, Bell } from 'lucide-react';

const STATS = [
  { label: 'Attendance',    value: '91.2%', change: '+1.4% this month',   trend: 'up'      as const, icon: ClipboardList, color: 'green'  as const },
  { label: 'Fees Due',      value: '₹4,500', change: 'Due: May 10',        trend: 'down'    as const, icon: CreditCard,   color: 'amber'  as const },
  { label: 'Avg. Grade',    value: 'B+',     change: 'Last term: B',        trend: 'up'      as const, icon: Award,        color: 'blue'   as const },
  { label: 'Assignments',   value: '3',      change: 'Due this week',       trend: 'neutral' as const, icon: BookOpen,     color: 'purple' as const },
];

const UPCOMING_EXAMS = [
  { subject: 'Mathematics',     date: 'Apr 25', time: '10:00 AM', room: 'Hall A' },
  { subject: 'Physics',         date: 'Apr 27', time: '10:00 AM', room: 'Hall B' },
  { subject: 'English',         date: 'Apr 30', time: '02:00 PM', room: 'Hall A' },
];

const RECENT_RESULTS = [
  { subject: 'Chemistry',   marks: 82, max: 100, grade: 'A' },
  { subject: 'Biology',     marks: 76, max: 100, grade: 'B+' },
  { subject: 'History',     marks: 68, max: 100, grade: 'B' },
];

const ANNOUNCEMENTS = [
  { text: 'Mid-term exams begin April 25. Hall tickets available in portal.', time: '1h ago', type: 'EXAM' },
  { text: 'School sports day on May 3 — register by April 28.', time: '3h ago', type: 'EVENT' },
  { text: 'Fee payment deadline: May 10. Late fees applicable after that.', time: '1d ago', type: 'FEE' },
];

const TYPE_COLOR: Record<string, string> = {
  EXAM:  'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  EVENT: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  FEE:   'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
};

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Dashboard"
        description="Welcome back! Here's your academic overview."
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming exams */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2"><Calendar className="h-4 w-4" />Upcoming Exams</CardTitle>
            </CardHeader>
            <CardContent className="divide-y dark:divide-gray-800">
              {UPCOMING_EXAMS.map((e) => (
                <div key={e.subject} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{e.subject}</p>
                    <p className="text-xs text-muted-foreground">{e.time} · {e.room}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{e.date}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent results */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2"><Award className="h-4 w-4" />Recent Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {RECENT_RESULTS.map((r) => (
                <div key={r.subject} className="flex items-center gap-4">
                  <p className="w-28 text-sm font-medium text-gray-900 dark:text-white">{r.subject}</p>
                  <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: `${(r.marks / r.max) * 100}%` }} />
                  </div>
                  <span className="w-12 text-right text-sm text-muted-foreground">{r.marks}/{r.max}</span>
                  <span className="w-8 text-right font-bold text-sm text-blue-600 dark:text-blue-400">{r.grade}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Announcements */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" />Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ANNOUNCEMENTS.map((a, i) => (
              <div key={i} className="space-y-1.5">
                <Badge className={`border-0 text-[11px] ${TYPE_COLOR[a.type]}`}>{a.type}</Badge>
                <p className="text-sm leading-snug text-gray-900 dark:text-white">{a.text}</p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
