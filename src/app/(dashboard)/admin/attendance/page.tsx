'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  ClipboardList, CheckCircle2, XCircle, Clock, AlertTriangle,
  Download, Filter, Calendar, Search,
} from 'lucide-react';
import { formatDate, getAttendanceColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

const MOCK_RECORDS = [
  { id: '1', name: 'Emma Rodriguez',    admNo: 'STU-2025-00001', class: '10A', date: '2026-04-20', status: 'PRESENT', timeIn: '08:02' },
  { id: '2', name: 'Marcus Johnson',    admNo: 'STU-2025-00002', class: '11B', date: '2026-04-20', status: 'ABSENT',  timeIn: null },
  { id: '3', name: 'Aisha Patel',       admNo: 'STU-2025-00003', class: '12A', date: '2026-04-20', status: 'LATE',    timeIn: '08:45' },
  { id: '4', name: 'Lucas Wright',      admNo: 'STU-2025-00004', class: '11A', date: '2026-04-20', status: 'PRESENT', timeIn: '07:58' },
  { id: '5', name: 'Sophie Chen',       admNo: 'STU-2025-00005', class: '10B', date: '2026-04-20', status: 'EXCUSED', timeIn: null },
  { id: '6', name: 'James Park',        admNo: 'STU-2025-00006', class: '12B', date: '2026-04-20', status: 'PRESENT', timeIn: '08:05' },
  { id: '7', name: 'Nina Torres',       admNo: 'STU-2025-00007', class: '10A', date: '2026-04-20', status: 'PRESENT', timeIn: '07:55' },
  { id: '8', name: 'David Kim',         admNo: 'STU-2025-00008', class: '11A', date: '2026-04-20', status: 'ABSENT',  timeIn: null },
];

const STATUS_CONFIG = {
  PRESENT: { label: 'Present', icon: CheckCircle2, badge: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' },
  ABSENT:  { label: 'Absent',  icon: XCircle,       badge: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400' },
  LATE:    { label: 'Late',    icon: Clock,          badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400' },
  EXCUSED: { label: 'Excused', icon: AlertTriangle,  badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400' },
};

export default function AttendancePage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [classFilter, setClassFilter] = useState('ALL');
  const [selectedDate, setSelectedDate] = useState('2026-04-20');

  const filtered = MOCK_RECORDS.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.admNo.includes(search);
    const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;
    const matchClass = classFilter === 'ALL' || r.class === classFilter;
    return matchSearch && matchStatus && matchClass;
  });

  const counts = {
    present: MOCK_RECORDS.filter((r) => r.status === 'PRESENT').length,
    absent:  MOCK_RECORDS.filter((r) => r.status === 'ABSENT').length,
    late:    MOCK_RECORDS.filter((r) => r.status === 'LATE').length,
    excused: MOCK_RECORDS.filter((r) => r.status === 'EXCUSED').length,
  };
  const attendance = Math.round((counts.present / MOCK_RECORDS.length) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Track and manage daily student attendance across all classes."
        breadcrumbs={[{ label: 'Attendance' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
            <Button size="sm" asChild><a href="/admin/attendance/mark"><ClipboardList className="mr-2 h-4 w-4" />Mark Attendance</a></Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Present Today"  value={counts.present}  change={`${attendance}% rate`}    trend="up"      icon={CheckCircle2} color="green" />
        <StatCard label="Absent Today"   value={counts.absent}   change="Parents notified"          trend="down"    icon={XCircle}      color="rose" />
        <StatCard label="Late Arrivals"  value={counts.late}     change="After 08:15 AM"            trend="neutral" icon={Clock}        color="amber" />
        <StatCard label="Excused"        value={counts.excused}  change="Medical / Leave"           trend="neutral" icon={AlertTriangle} color="blue" />
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">Daily Attendance Register</CardTitle>
              <CardDescription>Date: {formatDate(selectedDate)}</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="h-9 w-40" />
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search student..." className="h-9 pl-8 w-44" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="h-9 w-28"><SelectValue placeholder="Class" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Classes</SelectItem>
                  {['10A','10B','11A','11B','12A','12B'].map((c) => <SelectItem key={c} value={c}>Grade {c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-28"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  {Object.keys(STATUS_CONFIG).map((s) => <SelectItem key={s} value={s}>{STATUS_CONFIG[s as keyof typeof STATUS_CONFIG].label}</SelectItem>)}
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
                  {['Student','Adm. No.','Class','Time In','Status','Action'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((r) => {
                  const cfg = STATUS_CONFIG[r.status as keyof typeof STATUS_CONFIG];
                  const Icon = cfg.icon;
                  return (
                    <tr key={r.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{r.name}</td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{r.admNo}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">Grade {r.class}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{r.timeIn ?? '—'}</td>
                      <td className="px-4 py-3">
                        <Badge className={cn('gap-1 border-0 text-[11px]', cfg.badge)}>
                          <Icon className="h-3 w-3" />{cfg.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Select defaultValue={r.status}>
                          <SelectTrigger className="h-7 w-28 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Object.entries(STATUS_CONFIG).map(([k, v]) => <SelectItem key={k} value={k} className="text-xs">{v.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-muted-foreground text-sm">No records found</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
