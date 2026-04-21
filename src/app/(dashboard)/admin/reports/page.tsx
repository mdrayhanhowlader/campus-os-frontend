'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { Download, Users, DollarSign, ClipboardList, GraduationCap } from 'lucide-react';

const ATTENDANCE_DATA = [
  { month:'Nov', rate:88 }, { month:'Dec', rate:82 }, { month:'Jan', rate:91 },
  { month:'Feb', rate:93 }, { month:'Mar', rate:89 }, { month:'Apr', rate:87 },
];
const FEE_DATA = [
  { month:'Nov', collected:85000 }, { month:'Dec', collected:92000 }, { month:'Jan', collected:78000 },
  { month:'Feb', collected:110000 }, { month:'Mar', collected:105000 }, { month:'Apr', collected:124000 },
];
const GRADE_DIST = [
  { grade:'A+', students:18 }, { grade:'A', students:32 }, { grade:'B+', students:45 },
  { grade:'B', students:38 }, { grade:'C', students:20 }, { grade:'F', students:5 },
];

const REPORT_CARDS = [
  { icon:Users,         title:'Student Enrollment Report',    desc:'Total students, class-wise distribution, gender ratio',      color:'bg-blue-50 dark:bg-blue-950/30' },
  { icon:ClipboardList, title:'Attendance Summary Report',    desc:'Monthly attendance rates, defaulter list',                   color:'bg-green-50 dark:bg-green-950/30' },
  { icon:DollarSign,    title:'Fee Collection Report',        desc:'Collected, pending, defaulters by grade',                   color:'bg-amber-50 dark:bg-amber-950/30' },
  { icon:GraduationCap, title:'Academic Performance Report',  desc:'Grade distribution, top performers, subject-wise analysis', color:'bg-purple-50 dark:bg-purple-950/30' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Comprehensive insights across all school modules."
        breadcrumbs={[{ label:'Reports' }]}
        actions={<Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export All</Button>}
      />

      {/* Quick report downloads */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REPORT_CARDS.map(r=>{
          const Icon = r.icon;
          return (
            <Card key={r.title} className={`border-0 shadow-sm ${r.color} cursor-pointer hover:shadow-md transition-shadow`}>
              <CardContent className="p-4">
                <Icon className="h-5 w-5 text-muted-foreground mb-3" />
                <p className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
                <Button variant="outline" size="sm" className="mt-3 h-7 text-xs w-full"><Download className="h-3 w-3 mr-1"/>Download</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Attendance Rate Trend</CardTitle>
            <CardDescription>Monthly attendance % — last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={ATTENDANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize:12 }} />
                <YAxis domain={[75,100]} tick={{ fontSize:12 }} tickFormatter={v=>`${v}%`} />
                <Tooltip formatter={(v:number)=>`${v}%`} />
                <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} dot={{ r:4 }} name="Attendance" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Fee Collection</CardTitle>
            <CardDescription>Monthly collection — last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={FEE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize:12 }} />
                <YAxis tick={{ fontSize:12 }} tickFormatter={v=>`₹${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v:number)=>`₹${v.toLocaleString()}`} />
                <Bar dataKey="collected" name="Collected" fill="#10b981" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Grade Distribution — Mid Term 2026</CardTitle>
            <CardDescription>Number of students per grade across all classes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={GRADE_DIST}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="grade" tick={{ fontSize:12 }} />
                <YAxis tick={{ fontSize:12 }} />
                <Tooltip />
                <Bar dataKey="students" name="Students" fill="#8b5cf6" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
