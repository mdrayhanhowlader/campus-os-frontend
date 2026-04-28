import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const PERIODS = ['08:00', '09:00', '10:00', '10:30', '11:30', '12:30', '13:00', '14:00'];
const PERIOD_LABELS: Record<string, string> = { '10:00': '10:00 (Break)', '12:30': '12:30 (Lunch)' };

const COLORS: Record<string, string> = {
  Mathematics: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
  Physics:     'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
  Chemistry:   'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
  English:     'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
  History:     'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  Biology:     'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800',
  PE:          'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800',
  Break:       'bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 italic',
};

type Cell = { subject: string; teacher?: string } | null;

const TIMETABLE: Record<string, Record<string, Cell>> = {
  Monday:    { '08:00': { subject: 'Mathematics', teacher: 'Mr. Verma' }, '09:00': { subject: 'Physics', teacher: 'Ms. Iyer' }, '10:00': { subject: 'Break' }, '10:30': { subject: 'Chemistry', teacher: 'Dr. Singh' }, '11:30': { subject: 'English', teacher: 'Mrs. Roy' }, '12:30': { subject: 'Break' }, '13:00': null, '14:00': { subject: 'History', teacher: 'Mr. Khan' } },
  Tuesday:   { '08:00': { subject: 'Biology', teacher: 'Ms. Nair' }, '09:00': { subject: 'Mathematics', teacher: 'Mr. Verma' }, '10:00': { subject: 'Break' }, '10:30': { subject: 'English', teacher: 'Mrs. Roy' }, '11:30': { subject: 'Physics', teacher: 'Ms. Iyer' }, '12:30': { subject: 'Break' }, '13:00': null, '14:00': { subject: 'PE', teacher: 'Mr. Raj' } },
  Wednesday: { '08:00': { subject: 'Chemistry', teacher: 'Dr. Singh' }, '09:00': { subject: 'History', teacher: 'Mr. Khan' }, '10:00': { subject: 'Break' }, '10:30': { subject: 'Mathematics', teacher: 'Mr. Verma' }, '11:30': { subject: 'Biology', teacher: 'Ms. Nair' }, '12:30': { subject: 'Break' }, '13:00': null, '14:00': { subject: 'English', teacher: 'Mrs. Roy' } },
  Thursday:  { '08:00': { subject: 'Physics', teacher: 'Ms. Iyer' }, '09:00': { subject: 'Chemistry', teacher: 'Dr. Singh' }, '10:00': { subject: 'Break' }, '10:30': { subject: 'History', teacher: 'Mr. Khan' }, '11:30': { subject: 'Mathematics', teacher: 'Mr. Verma' }, '12:30': { subject: 'Break' }, '13:00': null, '14:00': { subject: 'Biology', teacher: 'Ms. Nair' } },
  Friday:    { '08:00': { subject: 'English', teacher: 'Mrs. Roy' }, '09:00': { subject: 'Biology', teacher: 'Ms. Nair' }, '10:00': { subject: 'Break' }, '10:30': { subject: 'Physics', teacher: 'Ms. Iyer' }, '11:30': { subject: 'Chemistry', teacher: 'Dr. Singh' }, '12:30': { subject: 'Break' }, '13:00': null, '14:00': { subject: 'Mathematics', teacher: 'Mr. Verma' } },
};

export default function StudentTimetablePage() {
  const today = DAYS[new Date().getDay() - 1] ?? 'Monday';
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Timetable"
        description="Class 10-A — Weekly schedule."
        breadcrumbs={[{ label: 'Dashboard', href: '/student' }, { label: 'Timetable' }]}
      />
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b dark:border-gray-700">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase w-28">Time</th>
                {DAYS.map((d) => (
                  <th key={d} className={`px-4 py-3 text-center text-xs font-semibold uppercase ${d === today ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'}`}>{d}{d === today && ' ●'}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800">
              {PERIODS.map((p) => (
                <tr key={p} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20">
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground whitespace-nowrap">{PERIOD_LABELS[p] ?? p}</td>
                  {DAYS.map((d) => {
                    const cell = TIMETABLE[d]?.[p];
                    if (!cell) return <td key={d} className="px-3 py-2 text-center"><span className="text-muted-foreground text-xs">—</span></td>;
                    const c = COLORS[cell.subject] ?? COLORS.Break;
                    return (
                      <td key={d} className="px-3 py-2">
                        <div className={`rounded-md border px-2 py-1.5 text-center ${c}`}>
                          <p className="text-xs font-semibold">{cell.subject}</p>
                          {cell.teacher && <p className="text-[10px] opacity-75">{cell.teacher}</p>}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
