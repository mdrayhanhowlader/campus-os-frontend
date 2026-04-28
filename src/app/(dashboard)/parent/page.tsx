import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardList, CreditCard, Award, Bell, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const STATS = [
  { label: 'Attendance',  value: '91.2%', change: 'This term',          trend: 'up'      as const, icon: ClipboardList, color: 'green'  as const, href: '/parent/attendance' },
  { label: 'Fee Due',     value: '₹4,500', change: 'Due May 10',        trend: 'down'    as const, icon: CreditCard,   color: 'amber'  as const, href: '/parent/fees' },
  { label: 'Latest Grade',value: 'B+',    change: 'Unit Test 3',        trend: 'up'      as const, icon: Award,        color: 'blue'   as const, href: '/parent/results' },
  { label: 'Alerts',      value: '2',     change: 'Require attention',  trend: 'neutral' as const, icon: AlertCircle,  color: 'rose'   as const },
];

const CHILD = { name: 'Priya Sharma', class: '10-A', roll: '02', admNo: 'RHS-2021-0142' };

const UPCOMING = [
  { event: 'Mid-Term Exam Begins', date: 'Apr 25, 2026', type: 'EXAM' },
  { event: 'Parent-Teacher Meeting', date: 'Apr 23, 2026', type: 'MEETING' },
  { event: 'Sports Day', date: 'May 3, 2026', type: 'EVENT' },
];

const ALERTS = [
  { text: 'Priya was marked absent on April 21, 2026. Please provide a leave note.', severity: 'WARN' },
  { text: 'Fee installment of ₹4,500 is due on May 10, 2026.', severity: 'INFO' },
];

const TYPE_COLOR: Record<string, string> = {
  EXAM: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  MEETING: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  EVENT: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
};

export default function ParentDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Parent Dashboard"
        description={`Monitoring ${CHILD.name} — Class ${CHILD.class}`}
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Child info */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40">
        <CardContent className="p-5 flex flex-wrap gap-6 items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white text-xl font-bold">P</div>
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
            <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-gray-900 dark:text-white">{CHILD.name}</span></div>
            <div><span className="text-muted-foreground">Class:</span> <span className="font-medium text-gray-900 dark:text-white">{CHILD.class}</span></div>
            <div><span className="text-muted-foreground">Roll No:</span> <span className="font-medium text-gray-900 dark:text-white">{CHILD.roll}</span></div>
            <div><span className="text-muted-foreground">Adm. No:</span> <span className="font-medium text-gray-900 dark:text-white">{CHILD.admNo}</span></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alerts */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" />Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {ALERTS.map((a, i) => (
              <div key={i} className={`flex gap-3 rounded-lg p-3 ${a.severity === 'WARN' ? 'bg-amber-50 dark:bg-amber-950/30' : 'bg-blue-50 dark:bg-blue-950/30'}`}>
                <AlertCircle className={`h-4 w-4 mt-0.5 shrink-0 ${a.severity === 'WARN' ? 'text-amber-600' : 'text-blue-600'}`} />
                <p className="text-sm text-gray-700 dark:text-gray-300">{a.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming events */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Calendar className="h-4 w-4" />Upcoming Events</CardTitle></CardHeader>
          <CardContent className="divide-y dark:divide-gray-800">
            {UPCOMING.map((u) => (
              <div key={u.event} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{u.event}</p>
                  <p className="text-xs text-muted-foreground">{u.date}</p>
                </div>
                <Badge className={`border-0 text-[11px] ${TYPE_COLOR[u.type]}`}>{u.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
