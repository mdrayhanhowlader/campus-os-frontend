'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, FileText, Users, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const ASSIGNMENTS = [
  { id: '1', title: 'Quadratic Equations Practice',    class: '10-A', subject: 'Mathematics',    due: '2026-04-25', submissions: 28, total: 35, status: 'ACTIVE' },
  { id: '2', title: 'Integration by Parts',            class: '12-A', subject: 'Adv. Maths',    due: '2026-04-27', submissions: 15, total: 38, status: 'ACTIVE' },
  { id: '3', title: 'Statistics — Mean & Median',      class: '11-B', subject: 'Mathematics',    due: '2026-04-30', submissions: 32, total: 40, status: 'ACTIVE' },
  { id: '4', title: 'Trigonometry Worksheet',          class: '9-C',  subject: 'Mathematics',    due: '2026-04-20', submissions: 29, total: 29, status: 'CLOSED' },
  { id: '5', title: 'Polynomials Revision',            class: '10-A', subject: 'Mathematics',    due: '2026-04-18', submissions: 33, total: 35, status: 'CLOSED' },
];

export default function TeacherAssignmentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'CLOSED'>('ALL');

  const filtered = ASSIGNMENTS.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.class.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'ALL' || a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        description="Create and track assignments for your classes."
        breadcrumbs={[{ label: 'Dashboard', href: '/teacher' }, { label: 'Assignments' }]}
        actions={
          <Button size="sm" onClick={() => toast.info('Assignment creation form — coming soon')}>
            <Plus className="mr-2 h-4 w-4" /> New Assignment
          </Button>
        }
      />

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search assignments..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-1 rounded-lg border p-1 dark:border-gray-700">
              {(['ALL', 'ACTIVE', 'CLOSED'] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y dark:divide-gray-800">
            {filtered.map((a) => {
              const pct = Math.round((a.submissions / a.total) * 100);
              return (
                <div key={a.id} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white">{a.title}</p>
                      <Badge variant="outline" className="text-xs">{a.class}</Badge>
                      <Badge className={`border-0 text-[11px] ${a.status === 'ACTIVE' ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}>
                        {a.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{a.submissions}/{a.total} submitted</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Due {new Date(a.due).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                        <div className="h-1.5 rounded-full bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{pct}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="h-8 text-xs">View</Button>
                    {a.status === 'ACTIVE' && <Button variant="outline" size="sm" className="h-8 text-xs">Edit</Button>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
