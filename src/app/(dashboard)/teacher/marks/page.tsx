'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const EXAMS = [
  { id: '1', name: 'Mid-Term 2026 — Mathematics',  class: '10-A', maxMarks: 100, status: 'PENDING' },
  { id: '2', name: 'Unit Test 3 — Adv. Maths',     class: '12-A', maxMarks: 50,  status: 'PENDING' },
  { id: '3', name: 'Monthly Test — Mathematics',    class: '11-B', maxMarks: 30,  status: 'SAVED' },
];

const STUDENTS = [
  { id: '1', roll: '01', name: 'Ayaan Khan' },
  { id: '2', roll: '02', name: 'Priya Sharma' },
  { id: '3', roll: '03', name: 'Ravi Patel' },
  { id: '4', roll: '04', name: 'Sneha Nair' },
  { id: '5', roll: '05', name: 'Arjun Menon' },
  { id: '6', roll: '06', name: 'Fatima Sheikh' },
  { id: '7', roll: '07', name: 'Rohan Gupta' },
  { id: '8', roll: '08', name: 'Ananya Iyer' },
];

function getGrade(marks: number, max: number) {
  const pct = (marks / max) * 100;
  if (pct >= 90) return { grade: 'A+', color: 'text-green-600' };
  if (pct >= 80) return { grade: 'A',  color: 'text-green-600' };
  if (pct >= 70) return { grade: 'B+', color: 'text-blue-600' };
  if (pct >= 60) return { grade: 'B',  color: 'text-blue-600' };
  if (pct >= 50) return { grade: 'C',  color: 'text-amber-600' };
  if (pct >= 33) return { grade: 'D',  color: 'text-orange-600' };
  return { grade: 'F', color: 'text-red-600' };
}

export default function TeacherMarksPage() {
  const [selectedExam, setSelectedExam] = useState('1');
  const exam = EXAMS.find((e) => e.id === selectedExam)!;
  const [marks, setMarks] = useState<Record<string, string>>(() =>
    Object.fromEntries(STUDENTS.map((s) => [s.id, '']))
  );

  function saveMarks() {
    const filled = Object.values(marks).filter((m) => m !== '').length;
    if (filled < STUDENTS.length) {
      toast.error(`Please enter marks for all ${STUDENTS.length} students`);
      return;
    }
    toast.success('Marks saved successfully!');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mark Entry"
        description="Enter examination marks for your students."
        breadcrumbs={[{ label: 'Dashboard', href: '/teacher' }, { label: 'Mark Entry' }]}
      />

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger className="w-72">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EXAMS.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Badge className={`border-0 text-[11px] ${exam.status === 'PENDING' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400' : 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'}`}>
                {exam.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Max Marks: <span className="font-semibold text-gray-900 dark:text-white">{exam.maxMarks}</span></p>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground w-16">Roll</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Student</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground w-40">Marks / {exam.maxMarks}</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground w-24">%</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground w-20">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {STUDENTS.map((s) => {
                  const m = parseFloat(marks[s.id]);
                  const valid = !isNaN(m) && m >= 0 && m <= exam.maxMarks;
                  const { grade, color } = valid ? getGrade(m, exam.maxMarks) : { grade: '—', color: 'text-muted-foreground' };
                  return (
                    <tr key={s.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{s.roll}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{s.name}</td>
                      <td className="px-4 py-3">
                        <Input
                          type="number" min={0} max={exam.maxMarks}
                          value={marks[s.id]}
                          onChange={(e) => setMarks((prev) => ({ ...prev, [s.id]: e.target.value }))}
                          placeholder="—"
                          className="h-8 w-28 mx-auto text-center"
                        />
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">
                        {valid ? `${((m / exam.maxMarks) * 100).toFixed(1)}%` : '—'}
                      </td>
                      <td className={`px-4 py-3 text-center font-bold ${color}`}>{grade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t dark:border-gray-800">
            <Button variant="outline" onClick={() => setMarks(Object.fromEntries(STUDENTS.map((s) => [s.id, ''])))}>Clear All</Button>
            <Button onClick={saveMarks} className="gap-2"><Save className="h-4 w-4" />Save Marks</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
