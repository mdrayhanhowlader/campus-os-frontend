import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ClipboardList, FileText, Users, Bell, Calendar } from 'lucide-react';

const STATS = [
  { label: 'My Classes',        value: '4',    change: '2 today',             trend: 'neutral' as const, icon: BookOpen,     color: 'blue'   as const },
  { label: 'Students',          value: '142',  change: 'Across all classes',  trend: 'neutral' as const, icon: Users,        color: 'purple' as const },
  { label: 'Attendance Today',  value: '91%',  change: '13 absent today',     trend: 'up'      as const, icon: ClipboardList,color: 'green'  as const },
  { label: 'Pending Marks',     value: '3',    change: 'Exams need grading',  trend: 'down'    as const, icon: FileText,     color: 'amber'  as const },
];

const TODAY_SCHEDULE = [
  { time: '08:00', subject: 'Mathematics',    class: '10-A', room: 'Room 201', status: 'done' },
  { time: '09:00', subject: 'Mathematics',    class: '11-B', room: 'Room 201', status: 'done' },
  { time: '10:30', subject: 'Break',          class: '',     room: '',         status: 'break' },
  { time: '11:00', subject: 'Advanced Maths', class: '12-A', room: 'Room 305', status: 'upcoming' },
  { time: '14:00', subject: 'Mathematics',    class: '9-C',  room: 'Room 104', status: 'upcoming' },
];

const ASSIGNMENTS = [
  { title: 'Quadratic Equations',  class: '10-A', due: 'Apr 25', submissions: 28, total: 35 },
  { title: 'Integration Practice', class: '12-A', due: 'Apr 27', submissions: 15, total: 38 },
  { title: 'Statistics Worksheet', class: '11-B', due: 'Apr 30', submissions: 32, total: 40 },
];

const ANNOUNCEMENTS = [
  { text: 'Staff meeting on Friday at 3 PM in Conference Room A', time: '2h ago' },
  { text: 'Mid-term exam schedule released — check the exams portal', time: '1d ago' },
  { text: 'Reminder: Lesson plans for May due by Apr 28', time: '2d ago' },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Teacher Dashboard"
        description="Welcome back! Here's your overview for today."
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's schedule */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2"><Calendar className="h-4 w-4" />Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {TODAY_SCHEDULE.map((s, i) => (
                <div key={i} className={`flex items-center gap-4 rounded-lg p-3 ${s.status === 'break' ? 'bg-gray-50 dark:bg-gray-800/30' : s.status === 'done' ? 'opacity-50' : 'bg-blue-50 dark:bg-blue-950/30'}`}>
                  <span className="w-14 text-xs font-mono font-semibold text-muted-foreground">{s.time}</span>
                  {s.status === 'break' ? (
                    <span className="text-sm text-muted-foreground italic">Break / Free period</span>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{s.subject}</p>
                        <p className="text-xs text-muted-foreground">Class {s.class} · {s.room}</p>
                      </div>
                      <Badge variant="outline" className={`text-[11px] ${s.status === 'done' ? 'border-green-300 text-green-700' : 'border-blue-300 text-blue-700'}`}>
                        {s.status === 'done' ? 'Done' : 'Upcoming'}
                      </Badge>
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Assignments */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4" />Assignments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ASSIGNMENTS.map((a) => (
                <div key={a.title} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{a.title}</p>
                    <span className="text-xs text-muted-foreground">Due {a.due}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Class {a.class} · {a.submissions}/{a.total} submitted</p>
                  <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${(a.submissions / a.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" />Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ANNOUNCEMENTS.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm leading-snug">{a.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
