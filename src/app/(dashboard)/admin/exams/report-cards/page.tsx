'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Download, FileText } from 'lucide-react';
import { getInitials } from '@/lib/utils';

const MOCK_CARDS = [
  { id:'1', name:'Emma Rodriguez',  admNo:'STU-2025-00001', class:'10A', gpa:3.9, rank:1,  total:580, status:'PUBLISHED' },
  { id:'2', name:'Marcus Johnson',  admNo:'STU-2025-00002', class:'11B', gpa:3.4, rank:12, total:520, status:'PUBLISHED' },
  { id:'3', name:'Aisha Patel',     admNo:'STU-2025-00003', class:'12A', gpa:3.7, rank:4,  total:555, status:'DRAFT' },
  { id:'4', name:'Lucas Wright',    admNo:'STU-2025-00004', class:'11A', gpa:3.6, rank:7,  total:545, status:'PUBLISHED' },
  { id:'5', name:'Sophie Chen',     admNo:'STU-2025-00005', class:'10B', gpa:4.0, rank:1,  total:595, status:'PUBLISHED' },
  { id:'6', name:'James Park',      admNo:'STU-2025-00006', class:'12B', gpa:3.2, rank:15, total:498, status:'DRAFT' },
];

export default function ReportCardsPage() {
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('ALL');

  const filtered = MOCK_CARDS.filter(c=>
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.admNo.includes(search)) &&
    (classFilter==='ALL' || c.class===classFilter)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Report Cards"
        description="Generate and distribute student academic report cards."
        breadcrumbs={[{ label:'Exams', href:'/admin/exams' }, { label:'Report Cards' }]}
        actions={<Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Download All</Button>}
      />

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base">Mid-Term Report Cards — 2026</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search student..." className="h-9 pl-8 w-44" value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="h-9 w-28"><SelectValue placeholder="Class" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Classes</SelectItem>
                  {['10A','10B','11A','11B','12A','12B'].map(c=><SelectItem key={c} value={c}>Grade {c}</SelectItem>)}
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
                  {['Student','Class','Total Marks','GPA','Rank','Status','Actions'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map(c=>(
                  <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">{getInitials(c.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{c.name}</div>
                          <div className="text-xs text-muted-foreground font-mono">{c.admNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs">Grade {c.class}</Badge></td>
                    <td className="px-4 py-3 font-medium">{c.total} / 600</td>
                    <td className="px-4 py-3 font-bold text-blue-600">{c.gpa}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${c.rank<=3?'text-amber-500':''}`}>#{c.rank}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={c.status==='PUBLISHED'
                        ? 'bg-green-50 text-green-700 border-0 dark:bg-green-950 dark:text-green-400'
                        : 'bg-amber-50 text-amber-700 border-0 dark:bg-amber-950 dark:text-amber-400'
                      }>{c.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs"><FileText className="h-3 w-3 mr-1"/>View</Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs"><Download className="h-3 w-3" /></Button>
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
