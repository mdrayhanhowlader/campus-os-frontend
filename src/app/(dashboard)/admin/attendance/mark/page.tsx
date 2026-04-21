'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CheckCircle2, XCircle, Clock, AlertTriangle, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

const STUDENTS = [
  { id: '1', name: 'Emma Rodriguez',  admNo: 'STU-2025-00001' },
  { id: '2', name: 'Marcus Johnson',  admNo: 'STU-2025-00002' },
  { id: '3', name: 'Aisha Patel',     admNo: 'STU-2025-00003' },
  { id: '4', name: 'Lucas Wright',    admNo: 'STU-2025-00004' },
  { id: '5', name: 'Sophie Chen',     admNo: 'STU-2025-00005' },
  { id: '6', name: 'James Park',      admNo: 'STU-2025-00006' },
  { id: '7', name: 'Nina Torres',     admNo: 'STU-2025-00007' },
  { id: '8', name: 'David Kim',       admNo: 'STU-2025-00008' },
];

type Status = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
const STATUS_OPTS: { value: Status; label: string; icon: React.ElementType; active: string }[] = [
  { value: 'PRESENT', label: 'Present', icon: CheckCircle2, active: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-400 dark:border-green-800' },
  { value: 'ABSENT',  label: 'Absent',  icon: XCircle,      active: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-950 dark:text-red-400 dark:border-red-800' },
  { value: 'LATE',    label: 'Late',    icon: Clock,        active: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
  { value: 'EXCUSED', label: 'Excused', icon: AlertTriangle,active: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
];

export default function MarkAttendancePage() {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [date, setDate] = useState('2026-04-20');
  const [attendance, setAttendance] = useState<Record<string, Status>>(() =>
    Object.fromEntries(STUDENTS.map((s) => [s.id, 'PRESENT']))
  );

  const setAll = (status: Status) => setAttendance(Object.fromEntries(STUDENTS.map((s) => [s.id, status])));
  const counts = { present: 0, absent: 0, late: 0, excused: 0 };
  Object.values(attendance).forEach((s) => { counts[s.toLowerCase() as keyof typeof counts]++; });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mark Attendance"
        description="Record daily attendance for a class."
        breadcrumbs={[{ label: 'Attendance', href: '/admin/attendance' }, { label: 'Mark' }]}
        actions={<Button size="sm"><Save className="mr-2 h-4 w-4" />Save Attendance</Button>}
      />

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">Class Attendance</CardTitle>
              <CardDescription>
                {counts.present} present · {counts.absent} absent · {counts.late} late · {counts.excused} excused
              </CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-9 w-40" />
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="h-9 w-28"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['10A','10B','11A','11B','12A','12B'].map((c) => <SelectItem key={c} value={c}>Grade {c}</SelectItem>)}
                </SelectContent>
              </Select>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="h-9 text-xs" onClick={() => setAll('PRESENT')}>All Present</Button>
                <Button variant="outline" size="sm" className="h-9 text-xs" onClick={() => setAll('ABSENT')}>All Absent</Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y dark:divide-gray-800">
            {STUDENTS.map((student) => {
              const current = attendance[student.id];
              return (
                <div key={student.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{student.admNo}</div>
                  </div>
                  <div className="flex gap-1">
                    {STATUS_OPTS.map((opt) => {
                      const Icon = opt.icon;
                      const isActive = current === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setAttendance((prev) => ({ ...prev, [student.id]: opt.value }))}
                          className={cn(
                            'flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-all',
                            isActive ? opt.active : 'border-gray-200 dark:border-gray-700 text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                          )}
                        >
                          <Icon className="h-3 w-3" />
                          <span className="hidden sm:inline">{opt.label}</span>
                        </button>
                      );
                    })}
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
