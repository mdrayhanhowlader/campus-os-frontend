'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Printer } from 'lucide-react';

const MOCK_TICKETS = [
  { id:'1', name:'Emma Rodriguez',  admNo:'STU-2025-00001', class:'10A', rollNo:'01', exam:'Mid-Term', center:'Hall A', date:'2026-04-25', status:'ISSUED' },
  { id:'2', name:'Marcus Johnson',  admNo:'STU-2025-00002', class:'11B', rollNo:'02', exam:'Mid-Term', center:'Hall B', date:'2026-04-25', status:'ISSUED' },
  { id:'3', name:'Aisha Patel',     admNo:'STU-2025-00003', class:'12A', rollNo:'03', exam:'Mid-Term', center:'Hall A', date:'2026-04-26', status:'PENDING' },
  { id:'4', name:'Lucas Wright',    admNo:'STU-2025-00004', class:'11A', rollNo:'04', exam:'Mid-Term', center:'Hall B', date:'2026-04-25', status:'ISSUED' },
  { id:'5', name:'Sophie Chen',     admNo:'STU-2025-00005', class:'10B', rollNo:'05', exam:'Mid-Term', center:'Hall A', date:'2026-04-26', status:'PENDING' },
];

export default function HallTicketsPage() {
  const [search, setSearch] = useState('');
  const [examFilter, setExamFilter] = useState('ALL');

  const filtered = MOCK_TICKETS.filter(t=>
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.admNo.includes(search)) &&
    (examFilter==='ALL' || t.exam===examFilter)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hall Tickets"
        description="Generate and issue exam admit cards to students."
        breadcrumbs={[{ label:'Exams', href:'/admin/exams' }, { label:'Hall Tickets' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Download All</Button>
            <Button size="sm"><Printer className="mr-2 h-4 w-4" />Print All</Button>
          </div>
        }
      />

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base">Hall Ticket List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search student..." className="h-9 pl-8 w-44" value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              <Select value={examFilter} onValueChange={setExamFilter}>
                <SelectTrigger className="h-9 w-32"><SelectValue placeholder="Exam" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Exams</SelectItem>
                  <SelectItem value="Mid-Term">Mid-Term</SelectItem>
                  <SelectItem value="Final">Final</SelectItem>
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
                  {['Student','Adm. No.','Class','Roll No.','Exam','Center','Date','Status','Actions'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map(t=>(
                  <tr key={t.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{t.name}</td>
                    <td className="px-4 py-3"><span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{t.admNo}</span></td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs">Grade {t.class}</Badge></td>
                    <td className="px-4 py-3 text-center font-mono font-bold">{t.rollNo}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.exam}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.center}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
                    <td className="px-4 py-3">
                      <Badge className={t.status==='ISSUED'
                        ? 'bg-green-50 text-green-700 border-0 dark:bg-green-950 dark:text-green-400'
                        : 'bg-amber-50 text-amber-700 border-0 dark:bg-amber-950 dark:text-amber-400'
                      }>{t.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="h-7 text-xs"><Download className="h-3 w-3 mr-1"/>PDF</Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs"><Printer className="h-3 w-3" /></Button>
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
