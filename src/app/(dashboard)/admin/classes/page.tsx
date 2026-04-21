'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, Search, Plus, GraduationCap } from 'lucide-react';

const MOCK_CLASSES = [
  { id: '1', name: '10A', grade: '10', section: 'A', teacher: 'Dr. Sarah Mitchell', students: 32, capacity: 40, subjects: 8, room: 'Room 101' },
  { id: '2', name: '10B', grade: '10', section: 'B', teacher: 'Mr. James Chen',     students: 28, capacity: 40, subjects: 8, room: 'Room 102' },
  { id: '3', name: '11A', grade: '11', section: 'A', teacher: 'Ms. Priya Sharma',   students: 35, capacity: 40, subjects: 9, room: 'Room 201' },
  { id: '4', name: '11B', grade: '11', section: 'B', teacher: 'Ms. Angela White',   students: 30, capacity: 40, subjects: 9, room: 'Room 202' },
  { id: '5', name: '12A', grade: '12', section: 'A', teacher: 'Mr. Robert Davis',   students: 25, capacity: 35, subjects: 7, room: 'Room 301' },
  { id: '6', name: '12B', grade: '12', section: 'B', teacher: 'Mr. Thomas Green',   students: 22, capacity: 35, subjects: 7, room: 'Room 302' },
];

export default function ClassesPage() {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');

  const filtered = MOCK_CLASSES.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.teacher.toLowerCase().includes(search.toLowerCase());
    const matchGrade = gradeFilter === 'ALL' || c.grade === gradeFilter;
    return matchSearch && matchGrade;
  });

  const totalStudents = MOCK_CLASSES.reduce((sum, c) => sum + c.students, 0);
  const totalCapacity = MOCK_CLASSES.reduce((sum, c) => sum + c.capacity, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Classes"
        description="Manage class sections, assign teachers, and track enrollment."
        breadcrumbs={[{ label: 'Classes' }]}
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />New Class</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Classes"   value={MOCK_CLASSES.length} change="3 grade levels"  trend="neutral" icon={BookOpen}     color="blue" />
        <StatCard label="Total Students"  value={totalStudents}        change={`of ${totalCapacity} capacity`} trend="up" icon={Users} color="green" />
        <StatCard label="Avg Class Size"  value={Math.round(totalStudents / MOCK_CLASSES.length)} change="students per class" trend="neutral" icon={Users} color="amber" />
        <StatCard label="Subjects Offered" value={9}                  change="Across all grades" trend="neutral" icon={GraduationCap} color="purple" />
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">All Classes</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search class..." className="h-9 pl-8 w-44" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="h-9 w-32"><SelectValue placeholder="Grade" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Grades</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
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
                  {['Class', 'Class Teacher', 'Room', 'Subjects', 'Enrollment', 'Capacity', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((c) => {
                  const pct = Math.round((c.students / c.capacity) * 100);
                  return (
                    <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                            <span className="text-xs font-bold text-blue-700 dark:text-blue-300">{c.name}</span>
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">Grade {c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{c.teacher}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">{c.room}</Badge>
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{c.subjects}</td>
                      <td className="px-4 py-3 font-medium">{c.students}</td>
                      <td className="px-4 py-3 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className="h-1.5 flex-1" />
                          <span className="text-xs text-muted-foreground w-8">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs">View</Button>
                          <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
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
