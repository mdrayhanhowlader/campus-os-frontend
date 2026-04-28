import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/StatCard';
import { ClipboardList, CheckCircle2, XCircle, Clock } from 'lucide-react';

const STATS = [
  { label: 'Overall',      value: '91.2%', change: 'Academic year',          trend: 'up'      as const, icon: ClipboardList, color: 'green'  as const },
  { label: 'Present Days', value: '52',    change: 'Out of 57 school days',   trend: 'neutral' as const, icon: CheckCircle2,  color: 'blue'   as const },
  { label: 'Absent Days',  value: '5',     change: '3 with medical certificate', trend: 'neutral' as const, icon: XCircle, color: 'rose' as const },
  { label: 'Late Arrivals',value: '2',     change: 'This semester',           trend: 'neutral' as const, icon: Clock,         color: 'amber'  as const },
];

type DayStatus = 'P' | 'A' | 'L' | 'H' | '';
const DAY_CFG: Record<DayStatus, { bg: string }> = {
  'P': { bg: 'bg-green-500 text-white' },
  'A': { bg: 'bg-red-500 text-white' },
  'L': { bg: 'bg-amber-500 text-white' },
  'H': { bg: 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500' },
  '':  { bg: 'bg-transparent' },
};

const APRIL: DayStatus[] = ['P','P','P','H','P','P','P','P','P','P','H','P','P','P','P','P','P','P','P','P','A','P','P','P','L','P','P','P','P','H',''];

const ABSENCE_LOG = [
  { date: 'Apr 21, 2026', day: 'Tuesday',  reason: 'Not provided',   note: '' },
  { date: 'Mar 26, 2026', day: 'Thursday', reason: 'Medical',        note: 'Fever — submitted certificate' },
  { date: 'Mar 08, 2026', day: 'Sunday',   reason: 'Medical',        note: 'Stomach ache' },
  { date: 'Feb 19, 2026', day: 'Thursday', reason: 'Family function', note: 'Pre-approved leave' },
  { date: 'Jan 19, 2026', day: 'Monday',   reason: 'Not provided',   note: '' },
];

export default function ParentAttendancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Priya's Attendance"
        description="Attendance records for Class 10-A — Academic Year 2025-26."
        breadcrumbs={[{ label: 'Dashboard', href: '/parent' }, { label: 'Attendance' }]}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* April calendar */}
      <Card className="border-0 shadow-sm max-w-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">April 2026</CardTitle>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-green-500 inline-block" />Present</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-red-500 inline-block" />Absent</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-amber-500 inline-block" />Late</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center">
            {['S','M','T','W','T','F','S'].map((d,i) => <div key={i} className="text-[10px] font-semibold text-muted-foreground pb-1">{d}</div>)}
            {APRIL.map((s, i) => (
              <div key={i} className={`aspect-square flex items-center justify-center rounded text-[10px] font-semibold ${DAY_CFG[s].bg}`}>
                {s !== '' ? (i + 1) : ''}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Absence log */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Absence & Late Log</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Date', 'Day', 'Reason', 'Note'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {ABSENCE_LOG.map((a) => (
                  <tr key={a.date} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{a.date}</td>
                    <td className="px-5 py-3 text-muted-foreground">{a.day}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium ${a.reason === 'Not provided' ? 'text-red-600' : 'text-muted-foreground'}`}>{a.reason}</span>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground italic">{a.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
