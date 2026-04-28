'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, BookOpen, TrendingUp, AlertCircle, Users } from 'lucide-react';

const MONTHLY_ACTIVITY = [
  { month: 'Nov 2025', issued: 198, returned: 190, overdue: 8  },
  { month: 'Dec 2025', issued: 142, returned: 155, overdue: 5  },
  { month: 'Jan 2026', issued: 212, returned: 208, overdue: 12 },
  { month: 'Feb 2026', issued: 228, returned: 215, overdue: 9  },
  { month: 'Mar 2026', issued: 235, returned: 229, overdue: 11 },
  { month: 'Apr 2026', issued: 214, returned: 201, overdue: 17 },
];

const POPULAR = [
  { title: 'Wings of Fire',             author: 'A.P.J. Abdul Kalam', genre: 'Biography', issues: 24 },
  { title: 'The Alchemist',             author: 'Paulo Coelho',       genre: 'Fiction',   issues: 19 },
  { title: 'Harry Potter — Stone',      author: 'J.K. Rowling',       genre: 'Fantasy',   issues: 17 },
  { title: 'Malgudi Days',              author: 'R.K. Narayan',       genre: 'Fiction',   issues: 14 },
  { title: 'The Diary of a Young Girl', author: 'Anne Frank',         genre: 'Memoir',    issues: 12 },
];

const OVERDUE_MEMBERS = [
  { name: 'Arjun Menon',   class: '12-A', book: 'The God of Small Things', days: 10 },
  { name: 'Fatima Sheikh', class: '10-B', book: 'To Kill a Mockingbird',   days: 14 },
  { name: 'Kabir Singh',   class: '11-A', book: 'Harry Potter',            days: 18 },
];

const maxIssued = Math.max(...MONTHLY_ACTIVITY.map((m) => m.issued));

const GENRE_CFG: Record<string, string> = {
  Fiction:   'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  Biography: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  Fantasy:   'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  Memoir:    'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
};

export default function LibrarianReportsPage() {
  const latest = MONTHLY_ACTIVITY[MONTHLY_ACTIVITY.length - 1];
  const prev   = MONTHLY_ACTIVITY[MONTHLY_ACTIVITY.length - 2];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Library Reports"
        description="Book circulation, overdue tracking, and usage analytics."
        breadcrumbs={[{ label: 'Dashboard', href: '/librarian' }, { label: 'Reports' }]}
        actions={<Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Export PDF</Button>}
      />

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Books Issued (April)',  value: latest.issued.toString(),  sub: `${latest.issued > prev.issued ? '+' : ''}${latest.issued - prev.issued} vs last month`, icon: BookOpen,    color: 'text-blue-600',   bg: 'bg-blue-50 dark:bg-blue-950/30'   },
          { label: 'Books Returned',        value: latest.returned.toString(), sub: `${latest.returned} of ${latest.issued} issued`, icon: TrendingUp,   color: 'text-green-600',  bg: 'bg-green-50 dark:bg-green-950/30' },
          { label: 'Overdue Books',         value: latest.overdue.toString(),  sub: 'Require follow-up',            icon: AlertCircle,  color: 'text-red-600',    bg: 'bg-red-50 dark:bg-red-950/30'     },
          { label: 'Active Members',        value: '628',                      sub: 'Students + Staff',             icon: Users,        color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/30'},
        ].map((s) => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-5 flex items-start gap-4">
              <div className={`p-2.5 rounded-lg ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly circulation */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base">6-Month Circulation Trend</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {MONTHLY_ACTIVITY.map((m) => (
              <div key={m.month}>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{m.month}</span>
                  <span>{m.issued} issued · {m.returned} returned · <span className="text-red-500">{m.overdue} overdue</span></span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: `${(m.issued / maxIssued) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Popular books */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base">Most Issued Books — April 2026</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {POPULAR.map((b, i) => (
              <div key={b.title} className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground w-5 shrink-0">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.author}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge className={`border-0 text-[11px] ${GENRE_CFG[b.genre] ?? ''}`}>{b.genre}</Badge>
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">{b.issues}×</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Overdue tracker */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Overdue Books — Action Required</CardTitle>
            <Button variant="outline" size="sm" onClick={() => {}}>Send Reminders</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Member', 'Class', 'Book', 'Days Overdue', 'Fine (Est.)', 'Action'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {OVERDUE_MEMBERS.map((o) => (
                  <tr key={o.name} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{o.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{o.class}</td>
                    <td className="px-5 py-3 text-muted-foreground">{o.book}</td>
                    <td className="px-5 py-3"><Badge className="border-0 text-[11px] bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400">{o.days} days</Badge></td>
                    <td className="px-5 py-3 text-red-600 font-medium">₹{o.days * 2}</td>
                    <td className="px-5 py-3">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">Notify</Button>
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
