'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Download, GraduationCap } from 'lucide-react';
import { getInitials } from '@/lib/utils';

const MOCK_ALUMNI = [
  { id:'1', name:'Alex Johnson',    admNo:'STU-2022-001', batch:'2022', class:'12A', gpa:'3.9', status:'University', destination:'MIT — Computer Science' },
  { id:'2', name:'Priya Sharma',    admNo:'STU-2022-002', batch:'2022', class:'12B', gpa:'3.7', status:'University', destination:'Stanford — Engineering' },
  { id:'3', name:'Marcus Lee',      admNo:'STU-2022-003', batch:'2022', class:'12A', gpa:'3.5', status:'Employed',   destination:'Google — Software Engineer' },
  { id:'4', name:'Sarah Williams',  admNo:'STU-2023-001', batch:'2023', class:'12B', gpa:'4.0', status:'University', destination:'Harvard — Medicine' },
  { id:'5', name:'Daniel Park',     admNo:'STU-2023-002', batch:'2023', class:'12A', gpa:'3.8', status:'University', destination:'Yale — Law' },
  { id:'6', name:'Fatima Hassan',   admNo:'STU-2023-003', batch:'2023', class:'12B', gpa:'3.6', status:'Employed',   destination:'Amazon — Data Analyst' },
  { id:'7', name:'Kevin Torres',    admNo:'STU-2024-001', batch:'2024', class:'12A', gpa:'3.4', status:'Gap Year',   destination:'Travelling & Internship' },
  { id:'8', name:'Nina Patel',      admNo:'STU-2024-002', batch:'2024', class:'12B', gpa:'3.9', status:'University', destination:'Oxford — Physics' },
];

const STATUS_COLORS: Record<string,string> = {
  'University': 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  'Employed':   'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  'Gap Year':   'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
};

export default function AlumniPage() {
  const [search, setSearch] = useState('');
  const filtered = MOCK_ALUMNI.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.batch.includes(search) ||
    a.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alumni"
        description="Records of graduated students from Riverside High School."
        breadcrumbs={[{ label: 'Students', href: '/admin/students' }, { label: 'Alumni' }]}
        actions={<Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border-0 shadow-sm bg-white dark:bg-gray-900 p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950"><GraduationCap className="h-5 w-5 text-blue-600" /></div>
          <div><p className="text-2xl font-bold">{MOCK_ALUMNI.length}</p><p className="text-xs text-muted-foreground">Total Alumni</p></div>
        </div>
        <div className="rounded-xl border-0 shadow-sm bg-white dark:bg-gray-900 p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950"><GraduationCap className="h-5 w-5 text-green-600" /></div>
          <div><p className="text-2xl font-bold">{MOCK_ALUMNI.filter(a=>a.status==='University').length}</p><p className="text-xs text-muted-foreground">In University</p></div>
        </div>
        <div className="rounded-xl border-0 shadow-sm bg-white dark:bg-gray-900 p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950"><GraduationCap className="h-5 w-5 text-amber-600" /></div>
          <div><p className="text-2xl font-bold">{MOCK_ALUMNI.filter(a=>a.status==='Employed').length}</p><p className="text-xs text-muted-foreground">Employed</p></div>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Alumni Directory</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search alumni..." className="h-9 pl-8 w-52" value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Alumni','Adm. No.','Batch','GPA','Current Status','Destination'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map(a=>(
                  <tr key={a.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">{getInitials(a.name)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900 dark:text-white">{a.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{a.admNo}</span></td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs">Class of {a.batch}</Badge></td>
                    <td className="px-4 py-3 font-semibold text-green-600">{a.gpa}</td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${STATUS_COLORS[a.status]}`}>{a.status}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground text-xs max-w-[200px]">{a.destination}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length===0 && <div className="py-16 text-center text-muted-foreground text-sm">No alumni found</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
