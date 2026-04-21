'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const STUDENTS = [
  { id:'1', name:'Emma Rodriguez',  admNo:'STU-2025-00001' },
  { id:'2', name:'Marcus Johnson',  admNo:'STU-2025-00002' },
  { id:'3', name:'Aisha Patel',     admNo:'STU-2025-00003' },
  { id:'4', name:'Lucas Wright',    admNo:'STU-2025-00004' },
  { id:'5', name:'Sophie Chen',     admNo:'STU-2025-00005' },
  { id:'6', name:'James Park',      admNo:'STU-2025-00006' },
];

function getGrade(marks: number, max: number) {
  const pct = (marks / max) * 100;
  if (pct >= 90) return { grade:'A+', color:'text-green-600' };
  if (pct >= 80) return { grade:'A',  color:'text-green-500' };
  if (pct >= 70) return { grade:'B+', color:'text-blue-600' };
  if (pct >= 60) return { grade:'B',  color:'text-blue-500' };
  if (pct >= 50) return { grade:'C',  color:'text-amber-600' };
  return { grade:'F', color:'text-red-600' };
}

export default function MarksEntryPage() {
  const [exam, setExam] = useState('Mid-Term Mathematics');
  const [maxMarks, setMaxMarks] = useState(100);
  const [marks, setMarks] = useState<Record<string,string>>(
    Object.fromEntries(STUDENTS.map(s=>[s.id,'']))
  );

  function save() {
    toast.success('Marks saved successfully!');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mark Entry"
        description="Enter exam marks for each student."
        breadcrumbs={[{ label:'Exams', href:'/admin/exams' }, { label:'Mark Entry' }]}
        actions={<Button size="sm" onClick={save}><Save className="mr-2 h-4 w-4" />Save Marks</Button>}
      />

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="space-y-1.5 flex-1 min-w-[180px]">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Exam</label>
              <Select value={exam} onValueChange={setExam}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mid-Term Mathematics">Mid-Term Mathematics</SelectItem>
                  <SelectItem value="Mid-Term Physics">Mid-Term Physics</SelectItem>
                  <SelectItem value="Unit Test History">Unit Test History</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Max Marks</label>
              <Input type="number" value={maxMarks} onChange={e=>setMaxMarks(Number(e.target.value))} className="h-9 w-24" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Student Marks</CardTitle>
          <CardDescription>{exam} · Max: {maxMarks}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['#','Student','Adm. No.','Marks Obtained','Out of','Grade','%'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {STUDENTS.map((s,i)=>{
                  const raw = marks[s.id];
                  const val = raw === '' ? null : Math.min(Number(raw), maxMarks);
                  const grade = val !== null ? getGrade(val, maxMarks) : null;
                  const pct   = val !== null ? ((val/maxMarks)*100).toFixed(1) : '—';
                  return (
                    <tr key={s.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground">{i+1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{s.name}</td>
                      <td className="px-4 py-3"><span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{s.admNo}</span></td>
                      <td className="px-4 py-3">
                        <Input
                          type="number"
                          min={0}
                          max={maxMarks}
                          placeholder="—"
                          value={marks[s.id]}
                          onChange={e=>setMarks(m=>({...m,[s.id]:e.target.value}))}
                          className="h-8 w-20 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{maxMarks}</td>
                      <td className="px-4 py-3">
                        {grade ? <Badge className={`border-0 text-xs font-bold bg-transparent ${grade.color}`}>{grade.grade}</Badge> : '—'}
                      </td>
                      <td className="px-4 py-3 font-medium">{pct}{val!==null?'%':''}</td>
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
