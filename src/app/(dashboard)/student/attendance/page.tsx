import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/dashboard/StatCard';
import { ClipboardList, CheckCircle2, XCircle, Clock } from 'lucide-react';

const STATS = [
  { label: 'Overall',         value: '91.2%', change: 'Apr 2026',           trend: 'up'      as const, icon: ClipboardList, color: 'green'  as const },
  { label: 'Present Days',    value: '52',    change: 'Out of 57 school days', trend: 'neutral' as const, icon: CheckCircle2, color: 'blue'   as const },
  { label: 'Absent Days',     value: '5',     change: '3 with medical note', trend: 'neutral' as const, icon: XCircle,      color: 'rose'   as const },
  { label: 'Late Arrivals',   value: '2',     change: 'This semester',       trend: 'neutral' as const, icon: Clock,        color: 'amber'  as const },
];

const MONTHS = ['January', 'February', 'March', 'April'];

type DayStatus = 'P' | 'A' | 'L' | 'H' | '';

const CALENDAR: Record<string, (DayStatus)[]> = {
  'January':  ['', 'P', 'P', 'P', 'H', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'A', 'P', 'P', 'P', 'P', 'H', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  'February': ['', 'P', 'H', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'L', 'P', 'P', 'P', 'H', 'P', 'P', 'P', 'P', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', '', '', ''],
  'March':    ['P', 'P', 'P', 'P', 'P', 'H', 'P', 'A', 'P', 'P', 'P', 'P', 'P', 'H', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'H', 'P', 'P', 'P', 'A', 'P', 'P', 'P', 'P', ''],
  'April':    ['P', 'P', 'P', 'H', 'P', 'P', 'P', 'P', 'P', 'P', 'H', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'A', 'P', 'P', 'P', 'L', 'P', 'P', 'P', 'P', 'H', ''],
};

const DAY_CFG: Record<DayStatus, { label: string; bg: string }> = {
  'P': { label: 'P', bg: 'bg-green-500 text-white' },
  'A': { label: 'A', bg: 'bg-red-500 text-white' },
  'L': { label: 'L', bg: 'bg-amber-500 text-white' },
  'H': { label: 'H', bg: 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400' },
  '':  { label: '',  bg: 'bg-transparent' },
};

export default function StudentAttendancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Attendance"
        description="Track your attendance records across all months."
        breadcrumbs={[{ label: 'Dashboard', href: '/student' }, { label: 'Attendance' }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {MONTHS.map((month) => {
          const days = CALENDAR[month];
          const present = days.filter((d) => d === 'P').length;
          const absent  = days.filter((d) => d === 'A').length;
          const late    = days.filter((d) => d === 'L').length;
          const school  = days.filter((d) => d === 'P' || d === 'A' || d === 'L').length;
          const pct = school > 0 ? Math.round((present / school) * 100) : 0;
          return (
            <Card key={month} className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{month} 2026</CardTitle>
                  <span className={`text-sm font-bold ${pct >= 90 ? 'text-green-600' : pct >= 75 ? 'text-amber-600' : 'text-red-600'}`}>{pct}%</span>
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500 inline-block" />P:{present}</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500 inline-block" />A:{absent}</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />L:{late}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="text-center text-[10px] font-semibold text-muted-foreground pb-1">{d}</div>
                  ))}
                  {days.map((status, i) => (
                    <div key={i} className={`aspect-square flex items-center justify-center rounded text-[10px] font-semibold ${DAY_CFG[status].bg}`}>
                      {status !== 'H' && status !== '' && (i + 1)}
                      {status === 'H' && '—'}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-green-500" />Present</span>
        <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-red-500" />Absent</span>
        <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-amber-500" />Late</span>
        <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-gray-300 dark:bg-gray-700" />Holiday</span>
      </div>
    </div>
  );
}
