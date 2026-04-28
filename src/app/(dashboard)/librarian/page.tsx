import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, AlertCircle, TrendingUp } from 'lucide-react';

const STATS = [
  { label: 'Total Books',       value: '3,842',  change: '48 added this month',  trend: 'up'   as const, icon: BookOpen,    color: 'blue'  as const },
  { label: 'Books Issued',      value: '214',    change: 'Currently checked out', trend: 'up'   as const, icon: TrendingUp,  color: 'green' as const },
  { label: 'Overdue Returns',   value: '17',     change: 'Past due date',         trend: 'down' as const, icon: AlertCircle, color: 'rose'  as const },
  { label: 'Active Members',    value: '628',    change: 'Students + Staff',      trend: 'up'   as const, icon: Users,       color: 'amber' as const },
];

const RECENT_ISSUES = [
  { member: 'Priya Sharma',    class: '10-A', book: 'Wings of Fire',              isbn: '978-0071450942', issued: '2026-04-22', due: '2026-05-06', overdue: false },
  { member: 'Rohan Gupta',     class: '11-B', book: 'The Alchemist',              isbn: '978-0062315007', issued: '2026-04-21', due: '2026-05-05', overdue: false },
  { member: 'Sneha Nair',      class: '9-C',  book: 'A Brief History of Time',   isbn: '978-0553380163', issued: '2026-04-18', due: '2026-05-02', overdue: false },
  { member: 'Arjun Menon',     class: '12-A', book: 'The God of Small Things',   isbn: '978-0812979657', issued: '2026-04-05', due: '2026-04-19', overdue: true  },
  { member: 'Fatima Sheikh',   class: '10-B', book: 'To Kill a Mockingbird',     isbn: '978-0061935466', issued: '2026-04-01', due: '2026-04-15', overdue: true  },
];

const POPULAR = [
  { title: 'Wings of Fire',        author: 'A.P.J. Abdul Kalam', issues: 24 },
  { title: 'The Alchemist',        author: 'Paulo Coelho',       issues: 19 },
  { title: 'Harry Potter — Philosopher\'s Stone', author: 'J.K. Rowling', issues: 17 },
  { title: 'Malgudi Days',         author: 'R.K. Narayan',       issues: 14 },
  { title: 'The Diary of a Young Girl', author: 'Anne Frank',    issues: 12 },
];

export default function LibrarianDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="Library Dashboard" description="Book inventory, active issues, and overdue alerts." breadcrumbs={[{ label: 'Dashboard' }]} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent issues */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader className="pb-3"><CardTitle className="text-base">Recent Issues</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                    {['Member', 'Book', 'Issued', 'Due Date', 'Status'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  {RECENT_ISSUES.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 dark:text-white text-xs">{r.member}</p>
                        <p className="text-[11px] text-muted-foreground">{r.class}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900 dark:text-white max-w-[160px] truncate">{r.book}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(r.issued).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(r.due).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                      <td className="px-4 py-3">
                        <Badge className={`border-0 text-[11px] ${r.overdue ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400' : 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'}`}>
                          {r.overdue ? 'Overdue' : 'Issued'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Popular books */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base">Most Popular Books</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {POPULAR.map((b, i) => (
              <div key={b.title} className="flex items-start gap-3">
                <span className="text-xs font-bold text-muted-foreground w-5 shrink-0 mt-0.5">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.author}</p>
                </div>
                <Badge className="border-0 text-[11px] bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 shrink-0">{b.issues}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
