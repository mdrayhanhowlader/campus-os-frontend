'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
const PERIODS = ['08:00–08:45','08:45–09:30','09:30–10:15','10:15–10:30 (Break)','10:30–11:15','11:15–12:00','12:00–12:45','12:45–13:30 (Lunch)','13:30–14:15','14:15–15:00'];

const TIMETABLE: Record<string, Record<string, {subject:string; teacher:string; color:string}|null>> = {
  'Monday':    { '08:00–08:45':{subject:'Mathematics',color:'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',teacher:'Dr. Mitchell'}, '08:45–09:30':{subject:'Physics',color:'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',teacher:'Mr. Chen'}, '09:30–10:15':{subject:'English',color:'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',teacher:'Mr. Davis'}, '10:15–10:30 (Break)':null, '10:30–11:15':{subject:'History',color:'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',teacher:'Ms. Sharma'}, '11:15–12:00':{subject:'Computer Sci',color:'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',teacher:'Ms. White'}, '12:00–12:45':{subject:'Chemistry',color:'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',teacher:'Mr. Chen'}, '12:45–13:30 (Lunch)':null, '13:30–14:15':{subject:'Physical Ed',color:'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300',teacher:'Mr. Green'}, '14:15–15:00':{subject:'Mathematics',color:'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',teacher:'Dr. Mitchell'} },
  'Tuesday':   { '08:00–08:45':{subject:'English',color:'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',teacher:'Mr. Davis'}, '08:45–09:30':{subject:'Mathematics',color:'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',teacher:'Dr. Mitchell'}, '09:30–10:15':{subject:'Computer Sci',color:'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',teacher:'Ms. White'}, '10:15–10:30 (Break)':null, '10:30–11:15':{subject:'Physics',color:'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',teacher:'Mr. Chen'}, '11:15–12:00':{subject:'Chemistry',color:'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',teacher:'Mr. Chen'}, '12:00–12:45':{subject:'History',color:'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',teacher:'Ms. Sharma'}, '12:45–13:30 (Lunch)':null, '13:30–14:15':{subject:'Mathematics',color:'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',teacher:'Dr. Mitchell'}, '14:15–15:00':{subject:'English',color:'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',teacher:'Mr. Davis'} },
  'Wednesday': { '08:00–08:45':{subject:'Physics',color:'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',teacher:'Mr. Chen'}, '08:45–09:30':{subject:'History',color:'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',teacher:'Ms. Sharma'}, '09:30–10:15':{subject:'Mathematics',color:'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',teacher:'Dr. Mitchell'}, '10:15–10:30 (Break)':null, '10:30–11:15':{subject:'English',color:'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',teacher:'Mr. Davis'}, '11:15–12:00':{subject:'Physical Ed',color:'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300',teacher:'Mr. Green'}, '12:00–12:45':{subject:'Computer Sci',color:'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',teacher:'Ms. White'}, '12:45–13:30 (Lunch)':null, '13:30–14:15':{subject:'Chemistry',color:'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',teacher:'Mr. Chen'}, '14:15–15:00':{subject:'History',color:'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',teacher:'Ms. Sharma'} },
  'Thursday':  { '08:00–08:45':{subject:'Computer Sci',color:'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',teacher:'Ms. White'}, '08:45–09:30':{subject:'Chemistry',color:'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',teacher:'Mr. Chen'}, '09:30–10:15':{subject:'History',color:'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',teacher:'Ms. Sharma'}, '10:15–10:30 (Break)':null, '10:30–11:15':{subject:'Mathematics',color:'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',teacher:'Dr. Mitchell'}, '11:15–12:00':{subject:'English',color:'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',teacher:'Mr. Davis'}, '12:00–12:45':{subject:'Physics',color:'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',teacher:'Mr. Chen'}, '12:45–13:30 (Lunch)':null, '13:30–14:15':{subject:'Physical Ed',color:'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300',teacher:'Mr. Green'}, '14:15–15:00':{subject:'Computer Sci',color:'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',teacher:'Ms. White'} },
  'Friday':    { '08:00–08:45':{subject:'History',color:'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',teacher:'Ms. Sharma'}, '08:45–09:30':{subject:'English',color:'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',teacher:'Mr. Davis'}, '09:30–10:15':{subject:'Chemistry',color:'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',teacher:'Mr. Chen'}, '10:15–10:30 (Break)':null, '10:30–11:15':{subject:'Computer Sci',color:'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',teacher:'Ms. White'}, '11:15–12:00':{subject:'Mathematics',color:'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',teacher:'Dr. Mitchell'}, '12:00–12:45':{subject:'Physical Ed',color:'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300',teacher:'Mr. Green'}, '12:45–13:30 (Lunch)':null, '13:30–14:15':{subject:'History',color:'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',teacher:'Ms. Sharma'}, '14:15–15:00':{subject:'English',color:'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',teacher:'Mr. Davis'} },
};

export default function TimetablePage() {
  const [classFilter, setClassFilter] = useState('10A');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Timetable"
        description="Weekly class schedule and period allocation."
        breadcrumbs={[{ label:'Timetable' }]}
        actions={
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="h-9 w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              {['10A','10B','11A','11B','12A','12B'].map(c=><SelectItem key={c} value={c}>Grade {c}</SelectItem>)}
            </SelectContent>
          </Select>
        }
      />
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Grade {classFilter} — Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground w-36">Time</th>
                  {DAYS.map(d=>(
                    <th key={d} className="px-3 py-3 text-left font-semibold text-muted-foreground">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {PERIODS.map(period=>{
                  const isBreak = period.includes('Break')||period.includes('Lunch');
                  return (
                    <tr key={period} className={isBreak?'bg-gray-50/50 dark:bg-gray-800/20':'hover:bg-gray-50/30 dark:hover:bg-gray-800/10'}>
                      <td className="px-3 py-2 font-medium text-muted-foreground text-[11px] whitespace-nowrap">{period}</td>
                      {DAYS.map(day=>{
                        const slot = TIMETABLE[day]?.[period];
                        if (isBreak) return <td key={day} className="px-3 py-2 text-center text-[11px] text-muted-foreground italic">{period.includes('Break')?'Break':'Lunch'}</td>;
                        if (!slot) return <td key={day} className="px-3 py-2" />;
                        return (
                          <td key={day} className="px-3 py-2">
                            <div className={`rounded-md px-2 py-1.5 ${slot.color}`}>
                              <div className="font-semibold text-[11px]">{slot.subject}</div>
                              <div className="text-[10px] opacity-75">{slot.teacher}</div>
                            </div>
                          </td>
                        );
                      })}
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
