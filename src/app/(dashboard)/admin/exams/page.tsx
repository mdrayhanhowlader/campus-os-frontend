'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClipboardList, CheckCircle2, Clock, Calendar, Search, Plus } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const MOCK_EXAMS = [
  { id: '1', title: 'Mid-Term Mathematics',    subject: 'Mathematics', class: '10A', date: '2026-04-25', time: '09:00',  duration: 120, maxMarks: 100, status: 'UPCOMING', room: 'Hall A' },
  { id: '2', title: 'Mid-Term Physics',        subject: 'Physics',     class: '11B', date: '2026-04-26', time: '09:00',  duration: 180, maxMarks: 100, status: 'UPCOMING', room: 'Hall B' },
  { id: '3', title: 'Unit Test - History',     subject: 'History',     class: '10B', date: '2026-04-22', time: '11:00',  duration: 60,  maxMarks: 50,  status: 'UPCOMING', room: 'Room 102' },
  { id: '4', title: 'Quarterly Science',       subject: 'Science',     class: '12A', date: '2026-04-18', time: '09:00',  duration: 180, maxMarks: 100, status: 'COMPLETED', room: 'Hall A' },
  { id: '5', title: 'English Literature Test', subject: 'English',     class: '11A', date: '2026-04-15', time: '10:00',  duration: 90,  maxMarks: 75,  status: 'COMPLETED', room: 'Room 201' },
  { id: '6', title: 'Computer Science Practical',subject:'Comp. Sci.', class: '12B', date: '2026-05-02', time: '14:00',  duration: 120, maxMarks: 50,  status: 'SCHEDULED', room: 'Computer Lab' },
];

const STATUS_CFG = {
  UPCOMING:  { label: 'Upcoming',  badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400' },
  SCHEDULED: { label: 'Scheduled', badge: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400' },
  COMPLETED: { label: 'Completed', badge: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' },
  CANCELLED: { label: 'Cancelled', badge: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400' },
};

export default function ExamsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = MOCK_EXAMS.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const upcoming  = MOCK_EXAMS.filter((e) => e.status === 'UPCOMING').length;
  const completed = MOCK_EXAMS.filter((e) => e.status === 'COMPLETED').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Examinations"
        description="Schedule and manage exams, mark entry, and report cards."
        breadcrumbs={[{ label: 'Exams' }]}
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />Schedule Exam</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Exams"  value={MOCK_EXAMS.length} change="This semester"   trend="neutral" icon={ClipboardList} color="blue" />
        <StatCard label="Upcoming"     value={upcoming}           change="In next 2 weeks" trend="up"      icon={Clock}          color="amber" />
        <StatCard label="Completed"    value={completed}          change="Results pending"  trend="neutral" icon={CheckCircle2}   color="green" />
        <StatCard label="Next Exam"    value="Apr 22"             change="Unit Test History" trend="neutral" icon={Calendar}      color="purple" />
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Exam Schedule</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search exam..." className="h-9 pl-8 w-48" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  {Object.entries(STATUS_CFG).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
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
                  {['Exam', 'Subject', 'Class', 'Date & Time', 'Duration', 'Max Marks', 'Venue', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((e) => {
                  const cfg = STATUS_CFG[e.status as keyof typeof STATUS_CFG];
                  return (
                    <tr key={e.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[180px]">{e.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{e.subject}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">Grade {e.class}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        <div>{formatDate(e.date)}</div>
                        <div className="text-xs">{e.time}</div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{e.duration} min</td>
                      <td className="px-4 py-3 text-center font-medium">{e.maxMarks}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{e.room}</td>
                      <td className="px-4 py-3">
                        <Badge className={`border-0 text-[11px] ${cfg.badge}`}>{cfg.label}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            {e.status === 'COMPLETED' ? 'Marks' : 'Edit'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-muted-foreground text-sm">No exams found</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
