import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Download, TrendingUp } from 'lucide-react';

const TERMS = [
  {
    name: 'Unit Test 3 — March 2026', date: 'Mar 15–20, 2026',
    results: [
      { subject: 'Mathematics', marks: 82, max: 100, grade: 'A',  prev: 78 },
      { subject: 'Physics',     marks: 74, max: 100, grade: 'B+', prev: 70 },
      { subject: 'Chemistry',   marks: 68, max: 100, grade: 'B',  prev: 72 },
      { subject: 'English',     marks: 72, max: 80,  grade: 'B+', prev: 65 },
      { subject: 'History',     marks: 65, max: 100, grade: 'B',  prev: 60 },
      { subject: 'Biology',     marks: 78, max: 100, grade: 'B+', prev: 80 },
    ],
  },
  {
    name: 'Unit Test 2 — January 2026', date: 'Jan 18–23, 2026',
    results: [
      { subject: 'Mathematics', marks: 78, max: 100, grade: 'B+', prev: 74 },
      { subject: 'Physics',     marks: 70, max: 100, grade: 'B',  prev: 68 },
      { subject: 'Chemistry',   marks: 72, max: 100, grade: 'B+', prev: 65 },
      { subject: 'English',     marks: 65, max: 80,  grade: 'B',  prev: 60 },
      { subject: 'History',     marks: 60, max: 100, grade: 'C+', prev: 55 },
      { subject: 'Biology',     marks: 80, max: 100, grade: 'A',  prev: 75 },
    ],
  },
];

function gradeColor(grade: string) {
  if (['A+', 'A'].includes(grade)) return 'text-green-600';
  if (['B+', 'B'].includes(grade)) return 'text-blue-600';
  if (['C+', 'C'].includes(grade)) return 'text-amber-600';
  return 'text-red-600';
}

export default function ParentResultsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Exam Results"
        description="Priya Sharma — Class 10-A academic performance."
        breadcrumbs={[{ label: 'Dashboard', href: '/parent' }, { label: 'Results' }]}
      />

      {TERMS.map((term) => {
        const total = term.results.reduce((s, r) => s + r.marks, 0);
        const maxTotal = term.results.reduce((s, r) => s + r.max, 0);
        const pct = Math.round((total / maxTotal) * 100);
        return (
          <Card key={term.name} className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2"><Award className="h-4 w-4" />{term.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{term.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{pct}%</p>
                    <p className="text-xs text-muted-foreground">{total}/{maxTotal}</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5"><Download className="h-3.5 w-3.5" />PDF</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {term.results.map((r) => {
                const improved = r.marks > r.prev;
                return (
                  <div key={r.subject} className="flex items-center gap-4">
                    <p className="w-24 text-sm text-gray-900 dark:text-white shrink-0">{r.subject}</p>
                    <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${(r.marks / r.max) * 100}%` }} />
                    </div>
                    <span className="w-16 text-right text-sm text-muted-foreground shrink-0">{r.marks}/{r.max}</span>
                    <span className={`w-8 text-right text-sm font-bold shrink-0 ${gradeColor(r.grade)}`}>{r.grade}</span>
                    <span className={`flex items-center gap-0.5 text-[11px] shrink-0 ${improved ? 'text-green-600' : 'text-red-500'}`}>
                      <TrendingUp className={`h-3 w-3 ${!improved ? 'rotate-180' : ''}`} />
                      {Math.abs(r.marks - r.prev)}
                    </span>
                  </div>
                );
              })}
              <div className="border-t pt-3 dark:border-gray-800 flex justify-between items-center text-sm font-semibold text-gray-900 dark:text-white">
                <span>Total</span><span>{total} / {maxTotal} ({pct}%)</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
