'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle2, XCircle, Clock, Save } from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';

const STAFF = [
  { id:'1', name:'Dr. Sarah Mitchell', role:'Teacher',    dept:'Mathematics' },
  { id:'2', name:'Mr. James Chen',     role:'Teacher',    dept:'Science' },
  { id:'3', name:'Ms. Linda Park',     role:'Librarian',  dept:'Library' },
  { id:'4', name:'Mr. Robert Davis',   role:'Teacher',    dept:'English' },
  { id:'5', name:'Ms. Priya Sharma',   role:'Teacher',    dept:'History' },
  { id:'6', name:'Mr. Kevin Brooks',   role:'Accountant', dept:'Finance' },
];

type Status = 'PRESENT'|'ABSENT'|'LATE';
const OPTS: {value:Status; label:string; icon:React.ElementType; active:string}[] = [
  { value:'PRESENT', label:'Present', icon:CheckCircle2, active:'bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-400 dark:border-green-800' },
  { value:'ABSENT',  label:'Absent',  icon:XCircle,      active:'bg-red-100 text-red-700 border-red-300 dark:bg-red-950 dark:text-red-400 dark:border-red-800' },
  { value:'LATE',    label:'Late',    icon:Clock,        active:'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
];

export default function StaffAttendancePage() {
  const [date, setDate] = useState('2026-04-20');
  const [attendance, setAttendance] = useState<Record<string,Status>>(
    Object.fromEntries(STAFF.map(s=>[s.id,'PRESENT']))
  );
  const counts = { present:0, absent:0, late:0 };
  Object.values(attendance).forEach(s=>{ counts[s.toLowerCase() as keyof typeof counts]++; });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Attendance"
        description="Mark daily attendance for all teaching and non-teaching staff."
        breadcrumbs={[{ label:'Staff', href:'/admin/staff' }, { label:'Attendance' }]}
        actions={<Button size="sm"><Save className="mr-2 h-4 w-4" />Save Attendance</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Present" value={counts.present} change="Today" trend="up"      icon={CheckCircle2} color="green" />
        <StatCard label="Absent"  value={counts.absent}  change="Today" trend="down"    icon={XCircle}      color="rose" />
        <StatCard label="Late"    value={counts.late}    change="Today" trend="neutral" icon={Clock}        color="amber" />
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle className="text-base">Staff Attendance Register</CardTitle>
              <CardDescription>{counts.present} present · {counts.absent} absent · {counts.late} late</CardDescription>
            </div>
            <Input type="date" value={date} onChange={e=>setDate(e.target.value)} className="h-9 w-40" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y dark:divide-gray-800">
            {STAFF.map(staff=>{
              const current = attendance[staff.id];
              return (
                <div key={staff.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">{getInitials(staff.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">{staff.name}</div>
                      <div className="text-xs text-muted-foreground">{staff.role} · {staff.dept}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {OPTS.map(opt=>{
                      const Icon = opt.icon;
                      const isActive = current === opt.value;
                      return (
                        <button key={opt.value} onClick={()=>setAttendance(p=>({...p,[staff.id]:opt.value}))}
                          className={cn('flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-all',
                            isActive ? opt.active : 'border-gray-200 dark:border-gray-700 text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                          )}>
                          <Icon className="h-3 w-3" /><span className="hidden sm:inline">{opt.label}</span>
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
