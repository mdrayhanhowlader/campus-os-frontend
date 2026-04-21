'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, BookOpen, Eye } from 'lucide-react';

const MOCK_LESSONS = [
  { id:'1', title:'Quadratic Equations',         subject:'Mathematics', class:'10A', teacher:'Dr. Mitchell', date:'2026-04-21', duration:45, status:'PUBLISHED' },
  { id:'2', title:"Newton's Laws of Motion",     subject:'Physics',     class:'11B', teacher:'Mr. Chen',     date:'2026-04-22', duration:45, status:'PUBLISHED' },
  { id:'3', title:'The French Revolution',       subject:'History',     class:'10B', teacher:'Ms. Sharma',   date:'2026-04-22', duration:45, status:'DRAFT' },
  { id:'4', title:'Organic Chemistry Basics',   subject:'Chemistry',   class:'12A', teacher:'Mr. Chen',     date:'2026-04-23', duration:60, status:'PUBLISHED' },
  { id:'5', title:'Python Programming Intro',   subject:'Comp. Sci.',  class:'11A', teacher:'Ms. White',    date:'2026-04-23', duration:45, status:'PUBLISHED' },
  { id:'6', title:'Shakespeare — Hamlet',       subject:'English',     class:'12B', teacher:'Mr. Davis',    date:'2026-04-24', duration:45, status:'DRAFT' },
];

const SUBJ_COLORS: Record<string,string> = {
  'Mathematics': 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  'Physics':     'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  'History':     'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  'Chemistry':   'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400',
  'Comp. Sci.':  'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400',
  'English':     'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
};

export default function LessonsPage() {
  const [search, setSearch] = useState('');
  const [subj, setSubj] = useState('ALL');
  const filtered = MOCK_LESSONS.filter(l=>
    l.title.toLowerCase().includes(search.toLowerCase()) &&
    (subj==='ALL'||l.subject===subj)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lesson Plans"
        description="Manage and track lesson plans across all subjects."
        breadcrumbs={[{ label:'Lesson Plans' }]}
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />New Lesson Plan</Button>}
      />
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base">All Lesson Plans</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search lessons..." className="h-9 pl-8 w-44" value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              <Select value={subj} onValueChange={setSubj}>
                <SelectTrigger className="h-9 w-36"><SelectValue placeholder="Subject" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Subjects</SelectItem>
                  {Object.keys(SUBJ_COLORS).map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}
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
                  {['Lesson Title','Subject','Class','Teacher','Date','Duration','Status','Actions'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map(l=>(
                  <tr key={l.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="font-medium text-gray-900 dark:text-white">{l.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${SUBJ_COLORS[l.subject]??''}`}>{l.subject}</Badge></td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs">Grade {l.class}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{l.teacher}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.duration} min</td>
                    <td className="px-4 py-3">
                      <Badge className={l.status==='PUBLISHED'
                        ? 'bg-green-50 text-green-700 border-0 dark:bg-green-950 dark:text-green-400'
                        : 'bg-amber-50 text-amber-700 border-0 dark:bg-amber-950 dark:text-amber-400'
                      }>{l.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs"><Eye className="h-3 w-3 mr-1"/>View</Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
                      </div>
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
