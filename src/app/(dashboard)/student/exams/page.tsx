import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Award, Download } from 'lucide-react';

const UPCOMING = [
  { subject: 'Mathematics', date: 'Apr 25, 2026', time: '10:00 AM', room: 'Hall A', seat: 'A-14', maxMarks: 100 },
  { subject: 'Physics',     date: 'Apr 27, 2026', time: '10:00 AM', room: 'Hall B', seat: 'B-14', maxMarks: 100 },
  { subject: 'Chemistry',   date: 'Apr 29, 2026', time: '10:00 AM', room: 'Hall A', seat: 'A-14', maxMarks: 100 },
  { subject: 'English',     date: 'Apr 30, 2026', time: '02:00 PM', room: 'Hall A', seat: 'A-14', maxMarks: 80 },
];

const RESULTS = [
  { term: 'Unit Test 3 — March 2026', results: [
    { subject: 'Mathematics', marks: 82,  max: 100, grade: 'A'  },
    { subject: 'Physics',     marks: 74,  max: 100, grade: 'B+' },
    { subject: 'Chemistry',   marks: 68,  max: 100, grade: 'B'  },
    { subject: 'English',     marks: 72,  max: 80,  grade: 'B+' },
    { subject: 'History',     marks: 65,  max: 100, grade: 'B'  },
    { subject: 'Biology',     marks: 78,  max: 100, grade: 'B+' },
  ]},
];

function getGradeColor(grade: string) {
  if (['A+', 'A'].includes(grade)) return 'text-green-600';
  if (['B+', 'B'].includes(grade)) return 'text-blue-600';
  if (['C+', 'C'].includes(grade)) return 'text-amber-600';
  return 'text-red-600';
}

export default function StudentExamsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Exams & Results"
        description="Upcoming exams schedule and previous term results."
        breadcrumbs={[{ label: 'Dashboard', href: '/student' }, { label: 'Exams' }]}
      />

      {/* Upcoming exams */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Calendar className="h-4 w-4" />Upcoming Exams — Mid-Term 2026</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Subject', 'Date', 'Time', 'Venue', 'Seat No.', 'Max Marks', ''].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {UPCOMING.map((e) => (
                  <tr key={e.subject} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{e.subject}</td>
                    <td className="px-5 py-3 text-muted-foreground">{e.date}</td>
                    <td className="px-5 py-3 text-muted-foreground">{e.time}</td>
                    <td className="px-5 py-3 text-muted-foreground">{e.room}</td>
                    <td className="px-5 py-3"><Badge variant="outline" className="font-mono text-xs">{e.seat}</Badge></td>
                    <td className="px-5 py-3 text-muted-foreground">{e.maxMarks}</td>
                    <td className="px-5 py-3"><Button variant="outline" size="sm" className="h-7 text-xs gap-1"><Download className="h-3 w-3" />Hall Ticket</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {RESULTS.map((term) => {
        const total = term.results.reduce((s, r) => s + r.marks, 0);
        const maxTotal = term.results.reduce((s, r) => s + r.max, 0);
        return (
          <Card key={term.term} className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2"><Award className="h-4 w-4" />{term.term}</CardTitle>
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5"><Download className="h-3.5 w-3.5" />Report Card</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {term.results.map((r) => (
                <div key={r.subject} className="flex items-center gap-4">
                  <p className="w-24 text-sm text-gray-900 dark:text-white">{r.subject}</p>
                  <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${(r.marks / r.max) * 100}%` }} />
                  </div>
                  <span className="w-16 text-right text-sm text-muted-foreground">{r.marks}/{r.max}</span>
                  <span className={`w-8 text-right text-sm font-bold ${getGradeColor(r.grade)}`}>{r.grade}</span>
                </div>
              ))}
              <div className="border-t pt-3 dark:border-gray-800 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Total</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{total} / {maxTotal} ({Math.round((total / maxTotal) * 100)}%)</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
