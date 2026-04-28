'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle2, XCircle, Clock, Save } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import { toast } from 'sonner';

const CLASSES = [
  { id: '1', name: 'Class 10-A — Mathematics' },
  { id: '2', name: 'Class 11-B — Mathematics' },
  { id: '3', name: 'Class 12-A — Advanced Maths' },
  { id: '4', name: 'Class 9-C — Mathematics' },
];

const STUDENTS = [
  { id: '1', name: 'Ayaan Khan',      roll: '01' },
  { id: '2', name: 'Priya Sharma',    roll: '02' },
  { id: '3', name: 'Ravi Patel',      roll: '03' },
  { id: '4', name: 'Sneha Nair',      roll: '04' },
  { id: '5', name: 'Arjun Menon',     roll: '05' },
  { id: '6', name: 'Fatima Sheikh',   roll: '06' },
  { id: '7', name: 'Rohan Gupta',     roll: '07' },
  { id: '8', name: 'Ananya Iyer',     roll: '08' },
  { id: '9', name: 'Kabir Singh',     roll: '09' },
  { id: '10', name: 'Meera Reddy',    roll: '10' },
];

type Status = 'PRESENT' | 'ABSENT' | 'LATE';

const STATUS_CFG: Record<Status, { label: string; color: string }> = {
  PRESENT: { label: 'Present', color: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' },
  ABSENT:  { label: 'Absent',  color: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400' },
  LATE:    { label: 'Late',    color: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400' },
};

export default function TeacherAttendancePage() {
  const [selectedClass, setSelectedClass] = useState('1');
  const [attendance, setAttendance] = useState<Record<string, Status>>(() =>
    Object.fromEntries(STUDENTS.map((s) => [s.id, 'PRESENT']))
  );

  const counts = {
    present: Object.values(attendance).filter((s) => s === 'PRESENT').length,
    absent:  Object.values(attendance).filter((s) => s === 'ABSENT').length,
    late:    Object.values(attendance).filter((s) => s === 'LATE').length,
  };

  function markAll(status: Status) {
    setAttendance(Object.fromEntries(STUDENTS.map((s) => [s.id, status])));
  }

  function saveAttendance() {
    toast.success(`Attendance saved — ${counts.present} present, ${counts.absent} absent, ${counts.late} late`);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mark Attendance"
        description="Record student attendance for your classes."
        breadcrumbs={[{ label: 'Dashboard', href: '/teacher' }, { label: 'Attendance' }]}
      />

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3 items-center">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {CLASSES.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => markAll('PRESENT')}>All Present</Button>
              <Button variant="outline" size="sm" onClick={() => markAll('ABSENT')}>All Absent</Button>
            </div>
          </div>

          {/* Summary pills */}
          <div className="flex gap-3 mt-3">
            {(['PRESENT', 'ABSENT', 'LATE'] as Status[]).map((s) => (
              <span key={s} className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_CFG[s].color}`}>
                {STATUS_CFG[s].label}: {s === 'PRESENT' ? counts.present : s === 'ABSENT' ? counts.absent : counts.late}
              </span>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y dark:divide-gray-800">
            {STUDENTS.map((student) => (
              <div key={student.id} className="flex items-center gap-4 px-6 py-3">
                <span className="w-8 text-xs font-mono text-muted-foreground">{student.roll}</span>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    {getInitials(student.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 text-sm font-medium text-gray-900 dark:text-white">{student.name}</span>
                <div className="flex gap-2">
                  {(['PRESENT', 'ABSENT', 'LATE'] as Status[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setAttendance((prev) => ({ ...prev, [student.id]: s }))}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all border ${
                        attendance[student.id] === s
                          ? s === 'PRESENT' ? 'bg-green-600 text-white border-green-600'
                            : s === 'ABSENT' ? 'bg-red-500 text-white border-red-500'
                            : 'bg-amber-500 text-white border-amber-500'
                          : 'border-gray-200 text-muted-foreground hover:border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      {s === 'PRESENT' ? <CheckCircle2 className="h-3 w-3" /> : s === 'ABSENT' ? <XCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {STATUS_CFG[s].label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t dark:border-gray-800 flex justify-end">
            <Button onClick={saveAttendance} className="gap-2">
              <Save className="h-4 w-4" /> Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
