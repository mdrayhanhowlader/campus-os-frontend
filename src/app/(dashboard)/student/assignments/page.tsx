import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Clock } from 'lucide-react';

const ASSIGNMENTS = [
  { id: '1', title: 'Quadratic Equations Practice',  subject: 'Mathematics', teacher: 'Mr. Verma',    due: '2026-04-25', status: 'PENDING',   submitted: false },
  { id: '2', title: 'Newton\'s Laws Problems',       subject: 'Physics',     teacher: 'Ms. Iyer',     due: '2026-04-26', status: 'PENDING',   submitted: false },
  { id: '3', title: 'Essay: Industrial Revolution',  subject: 'History',     teacher: 'Mr. Khan',     due: '2026-04-28', status: 'PENDING',   submitted: false },
  { id: '4', title: 'Organic Chemistry Lab Report',  subject: 'Chemistry',   teacher: 'Dr. Singh',    due: '2026-04-20', status: 'SUBMITTED', submitted: true },
  { id: '5', title: 'Comprehension Exercise 5',      subject: 'English',     teacher: 'Mrs. Roy',     due: '2026-04-18', status: 'GRADED',    submitted: true, marks: 18, max: 20 },
  { id: '6', title: 'Cell Division Diagrams',        subject: 'Biology',     teacher: 'Ms. Nair',     due: '2026-04-15', status: 'GRADED',    submitted: true, marks: 14, max: 15 },
];

const STATUS_CFG: Record<string, { label: string; color: string }> = {
  PENDING:   { label: 'Pending',   color: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400' },
  SUBMITTED: { label: 'Submitted', color: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400' },
  GRADED:    { label: 'Graded',    color: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' },
};

const SUBJECT_COLORS: Record<string, string> = {
  Mathematics: 'bg-blue-600', Physics: 'bg-purple-600', Chemistry: 'bg-green-600',
  English: 'bg-rose-600', History: 'bg-amber-600', Biology: 'bg-teal-600',
};

export default function StudentAssignmentsPage() {
  const pending = ASSIGNMENTS.filter((a) => a.status === 'PENDING');
  const completed = ASSIGNMENTS.filter((a) => a.status !== 'PENDING');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        description="View and submit your assignments."
        breadcrumbs={[{ label: 'Dashboard', href: '/student' }, { label: 'Assignments' }]}
      />

      {/* Pending */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Pending ({pending.length})</h3>
        {pending.map((a) => {
          const dueDate = new Date(a.due);
          const daysLeft = Math.ceil((dueDate.getTime() - Date.now()) / 86400000);
          return (
            <Card key={a.id} className="border-0 shadow-sm">
              <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${SUBJECT_COLORS[a.subject] ?? 'bg-gray-600'}`}>
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{a.title}</p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{a.subject} · {a.teacher}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Due {new Date(a.due).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                    <span suppressHydrationWarning className={`flex items-center gap-1 font-medium ${daysLeft <= 2 ? 'text-red-600' : daysLeft <= 4 ? 'text-amber-600' : 'text-green-600'}`}>
                      <Clock className="h-3 w-3" />{daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                    </span>
                  </div>
                </div>
                <Button size="sm" className="shrink-0">Submit</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Completed */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Completed ({completed.length})</h3>
        {completed.map((a) => (
          <Card key={a.id} className="border-0 shadow-sm opacity-80">
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${SUBJECT_COLORS[a.subject] ?? 'bg-gray-600'}`}>
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-gray-900 dark:text-white">{a.title}</p>
                  <Badge className={`border-0 text-[11px] ${STATUS_CFG[a.status].color}`}>{STATUS_CFG[a.status].label}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{a.subject} · {a.teacher} · Due {new Date(a.due).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
              </div>
              {a.marks != null && (
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{a.marks}/{a.max}</p>
                  <p className="text-xs text-muted-foreground">{Math.round((a.marks / a.max!) * 100)}%</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
