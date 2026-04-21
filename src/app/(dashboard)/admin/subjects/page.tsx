'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';

const MOCK_SUBJECTS = [
  { id: '1', name: 'Mathematics',     code: 'MATH-01', teacher: 'Dr. Sarah Mitchell', grades: ['10','11','12'], type: 'Core',     periods: 5 },
  { id: '2', name: 'Physics',         code: 'PHY-01',  teacher: 'Mr. James Chen',     grades: ['11','12'],      type: 'Core',     periods: 4 },
  { id: '3', name: 'Chemistry',       code: 'CHEM-01', teacher: 'Mr. James Chen',     grades: ['11','12'],      type: 'Core',     periods: 4 },
  { id: '4', name: 'English',         code: 'ENG-01',  teacher: 'Mr. Robert Davis',   grades: ['10','11','12'], type: 'Core',     periods: 5 },
  { id: '5', name: 'History',         code: 'HIST-01', teacher: 'Ms. Priya Sharma',   grades: ['10','11'],      type: 'Core',     periods: 3 },
  { id: '6', name: 'Computer Science',code: 'CS-01',   teacher: 'Ms. Angela White',   grades: ['11','12'],      type: 'Elective', periods: 4 },
  { id: '7', name: 'Physical Education',code:'PE-01',  teacher: 'Mr. Thomas Green',   grades: ['10','11','12'], type: 'Elective', periods: 2 },
];

export default function SubjectsPage() {
  const [search, setSearch] = useState('');
  const filtered = MOCK_SUBJECTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subjects"
        description="Manage curriculum subjects and assign teachers."
        breadcrumbs={[{ label: 'Subjects' }]}
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Subject</Button>}
      />
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Subject List</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search subjects..." className="h-9 pl-8 w-48" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Subject', 'Code', 'Teacher', 'Grades', 'Type', 'Periods/Week', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{s.name}</td>
                    <td className="px-4 py-3"><span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{s.code}</span></td>
                    <td className="px-4 py-3 text-muted-foreground">{s.teacher}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {s.grades.map((g) => <Badge key={g} variant="outline" className="text-[10px] px-1.5 py-0">Grade {g}</Badge>)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`border-0 text-[11px] ${s.type === 'Core' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400' : 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400'}`}>{s.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{s.periods}</td>
                    <td className="px-4 py-3">
                      <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
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
