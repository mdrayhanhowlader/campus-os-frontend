'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, ClipboardList } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const MOCK = [
  { id:'1', title:'Algebra Problem Set 5',    subject:'Mathematics', class:'10A', dueDate:'2026-04-25', submitted:28, total:32, status:'ACTIVE' },
  { id:'2', title:'Light & Optics Lab Report',subject:'Physics',     class:'11B', dueDate:'2026-04-23', submitted:30, total:30, status:'CLOSED' },
  { id:'3', title:'WWI Essay',                subject:'History',     class:'10B', dueDate:'2026-04-27', submitted:12, total:28, status:'ACTIVE' },
  { id:'4', title:'Titration Experiment',     subject:'Chemistry',   class:'12A', dueDate:'2026-04-28', submitted:5,  total:25, status:'ACTIVE' },
  { id:'5', title:'Python Calculator App',    subject:'Comp. Sci.',  class:'11A', dueDate:'2026-04-30', submitted:20, total:35, status:'ACTIVE' },
  { id:'6', title:'Book Review — To Kill...',  subject:'English',    class:'12B', dueDate:'2026-04-22', submitted:22, total:22, status:'CLOSED' },
];

const SUBJ_COLORS: Record<string,string> = {
  'Mathematics': 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  'Physics':     'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  'History':     'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  'Chemistry':   'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400',
  'Comp. Sci.':  'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400',
  'English':     'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
};

export default function AssignmentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const filtered = MOCK.filter(a=>
    a.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter==='ALL'||a.status===statusFilter)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        description="Manage homework and assignment submissions."
        breadcrumbs={[{ label:'Assignments' }]}
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />New Assignment</Button>}
      />
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base">All Assignments</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="h-9 pl-8 w-44" value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-28"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Assignment','Subject','Class','Due Date','Submissions','Status','Actions'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map(a=>{
                  const pct = Math.round((a.submitted/a.total)*100);
                  return (
                    <tr key={a.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <ClipboardList className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="font-medium text-gray-900 dark:text-white max-w-[180px] truncate">{a.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${SUBJ_COLORS[a.subject]??''}`}>{a.subject}</Badge></td>
                      <td className="px-4 py-3"><Badge variant="outline" className="text-xs">Grade {a.class}</Badge></td>
                      <td className="px-4 py-3 text-muted-foreground">{a.dueDate}</td>
                      <td className="px-4 py-3 min-w-[130px]">
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className="h-1.5 flex-1" />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{a.submitted}/{a.total}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={a.status==='ACTIVE'
                          ? 'bg-blue-50 text-blue-700 border-0 dark:bg-blue-950 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-500 border-0 dark:bg-gray-800 dark:text-gray-400'
                        }>{a.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs">View</Button>
                          <Button variant="outline" size="sm" className="h-7 text-xs">Grade</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
