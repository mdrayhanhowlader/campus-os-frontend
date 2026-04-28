import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const PERIODS = ['08:00–09:00', '09:00–10:00', '10:00–10:30', '10:30–11:30', '11:30–12:30', '12:30–13:00', '13:00–14:00', '14:00–15:00'];

const SUBJECT_COLORS: Record<string, string> = {
  'Mathematics':    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
  'Adv. Maths':    'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
  'Break':          'bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 italic',
  'Free':           'bg-gray-50 text-gray-400 border-dashed border-gray-200 dark:bg-gray-900 dark:border-gray-800',
};

type Cell = { subject: string; class?: string; room?: string } | null;

const TIMETABLE: Record<string, Record<string, Cell>> = {
  'Monday':    { '08:00–09:00': { subject: 'Mathematics', class: '10-A', room: '201' }, '09:00–10:00': { subject: 'Mathematics', class: '11-B', room: '201' }, '10:00–10:30': { subject: 'Break' }, '10:30–11:30': null, '11:30–12:30': null, '12:30–13:00': { subject: 'Break' }, '13:00–14:00': null, '14:00–15:00': { subject: 'Mathematics', class: '9-C', room: '104' } },
  'Tuesday':   { '08:00–09:00': null, '09:00–10:00': { subject: 'Mathematics', class: '11-B', room: '201' }, '10:00–10:30': { subject: 'Break' }, '10:30–11:30': { subject: 'Adv. Maths', class: '12-A', room: '305' }, '11:30–12:30': null, '12:30–13:00': { subject: 'Break' }, '13:00–14:00': null, '14:00–15:00': null },
  'Wednesday': { '08:00–09:00': { subject: 'Mathematics', class: '10-A', room: '201' }, '09:00–10:00': null, '10:00–10:30': { subject: 'Break' }, '10:30–11:30': { subject: 'Adv. Maths', class: '12-A', room: '305' }, '11:30–12:30': null, '12:30–13:00': { subject: 'Break' }, '13:00–14:00': null, '14:00–15:00': null },
  'Thursday':  { '08:00–09:00': null, '09:00–10:00': { subject: 'Mathematics', class: '11-B', room: '201' }, '10:00–10:30': { subject: 'Break' }, '10:30–11:30': null, '11:30–12:30': null, '12:30–13:00': { subject: 'Break' }, '13:00–14:00': null, '14:00–15:00': { subject: 'Mathematics', class: '9-C', room: '104' } },
  'Friday':    { '08:00–09:00': { subject: 'Mathematics', class: '10-A', room: '201' }, '09:00–10:00': null, '10:00–10:30': { subject: 'Break' }, '10:30–11:30': { subject: 'Adv. Maths', class: '12-A', room: '305' }, '11:30–12:30': null, '12:30–13:00': { subject: 'Break' }, '13:00–14:00': null, '14:00–15:00': { subject: 'Mathematics', class: '9-C', room: '104' } },
};

export default function TeacherTimetablePage() {
  const today = DAYS[new Date().getDay() - 1] ?? 'Monday';

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Timetable"
        description="Your weekly class schedule."
        breadcrumbs={[{ label: 'Dashboard', href: '/teacher' }, { label: 'Timetable' }]}
      />

      <Card className="border-0 shadow-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b dark:border-gray-700">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase w-32">Period</th>
                {DAYS.map((d) => (
                  <th key={d} className={`px-4 py-3 text-center text-xs font-semibold uppercase ${d === today ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'}`}>
                    {d}{d === today && ' ●'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800">
              {PERIODS.map((period) => (
                <tr key={period} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{period}</td>
                  {DAYS.map((day) => {
                    const cell = TIMETABLE[day]?.[period];
                    if (!cell) return <td key={day} className="px-3 py-2 text-center"><span className="text-muted-foreground text-xs">—</span></td>;
                    const colorClass = SUBJECT_COLORS[cell.subject] ?? SUBJECT_COLORS['Free'];
                    return (
                      <td key={day} className="px-3 py-2">
                        <div className={`rounded-md border px-2 py-1.5 text-center ${colorClass}`}>
                          <p className="text-xs font-semibold">{cell.subject}</p>
                          {cell.class && <p className="text-[10px] opacity-75">{cell.class} · R{cell.room}</p>}
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
