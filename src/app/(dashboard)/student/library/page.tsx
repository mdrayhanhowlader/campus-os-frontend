import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/StatCard';
import { BookOpen, BookMarked, AlertCircle, Clock } from 'lucide-react';

const STATS = [
  { label: 'Books Issued', value: '2', change: 'Currently with you',    trend: 'neutral' as const, icon: BookOpen,   color: 'blue'   as const },
  { label: 'Books Read',   value: '14', change: 'This academic year',   trend: 'up'      as const, icon: BookMarked, color: 'green'  as const },
  { label: 'Overdue',      value: '0', change: 'All books on time',     trend: 'up'      as const, icon: AlertCircle,color: 'amber'  as const },
  { label: 'Due Soon',     value: '1', change: 'Return in 3 days',      trend: 'neutral' as const, icon: Clock,      color: 'rose'   as const },
];

const CURRENT_BOOKS = [
  { id: '1', title: 'Wings of Fire',       author: 'A.P.J. Abdul Kalam', isbn: '978-81-7371-146-5', issued: '2026-04-10', due: '2026-04-24', daysLeft: 2 },
  { id: '2', title: 'The Alchemist',        author: 'Paulo Coelho',       isbn: '978-0-06-112241-5', issued: '2026-04-15', due: '2026-04-29', daysLeft: 7 },
];

const HISTORY = [
  { title: 'To Kill a Mockingbird',  author: 'Harper Lee',        returned: '2026-04-05', fine: 0 },
  { title: 'Physics NCERT Part 1',   author: 'NCERT',             returned: '2026-03-20', fine: 0 },
  { title: 'Sapiens',                author: 'Yuval Noah Harari', returned: '2026-03-01', fine: 50 },
  { title: 'Chemistry NCERT Part 2', author: 'NCERT',             returned: '2026-02-15', fine: 0 },
];

export default function StudentLibraryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Library"
        description="Track your issued books and borrowing history."
        breadcrumbs={[{ label: 'Dashboard', href: '/student' }, { label: 'Library' }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Currently issued */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Currently Issued Books</CardTitle>
        </CardHeader>
        <CardContent className="divide-y dark:divide-gray-800">
          {CURRENT_BOOKS.map((b) => (
            <div key={b.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{b.title}</p>
                <p className="text-sm text-muted-foreground">{b.author}</p>
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                  <span>Issued: {new Date(b.issued).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                  <span>Due: {new Date(b.due).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge className={`border-0 text-[11px] ${b.daysLeft <= 3 ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400' : 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'}`}>
                  {b.daysLeft} days left
                </Badge>
                <Button variant="outline" size="sm" className="h-8 text-xs">Renew</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* History */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Borrowing History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Book Title', 'Author', 'Returned On', 'Fine'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {HISTORY.map((b) => (
                  <tr key={b.title} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{b.title}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.author}</td>
                    <td className="px-5 py-3 text-muted-foreground">{new Date(b.returned).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                    <td className="px-5 py-3">
                      {b.fine > 0
                        ? <span className="text-red-600 font-medium">₹{b.fine}</span>
                        : <span className="text-green-600 text-xs">No fine</span>
                      }
                    </td>
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
