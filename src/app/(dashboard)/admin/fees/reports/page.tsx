'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Download, TrendingUp, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';

const MONTHLY_DATA = [
  { month:'Nov', collected:85000, expenses:32000 },
  { month:'Dec', collected:92000, expenses:28000 },
  { month:'Jan', collected:78000, expenses:35000 },
  { month:'Feb', collected:110000, expenses:30000 },
  { month:'Mar', collected:105000, expenses:29000 },
  { month:'Apr', collected:124000, expenses:68500 },
];

const CATEGORY_BREAKDOWN = [
  { category:'Tuition Fee',   collected:480000, target:600000 },
  { category:'Transport',     collected:96000,  target:120000 },
  { category:'Library Fee',   collected:18000,  target:24000 },
  { category:'Lab Fee',       collected:28000,  target:40000 },
  { category:'Exam Fee',      collected:16000,  target:20000 },
];

export default function FeeReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Reports"
        description="Fee collection analytics and financial summaries."
        breadcrumbs={[{ label:'Fees', href:'/admin/fees' }, { label:'Reports' }]}
        actions={<Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export PDF</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Collected"  value="₹5,94,000" change="+12% vs last year" trend="up"      icon={DollarSign}   color="green" />
        <StatCard label="Total Expenses"   value="₹2,22,500" change="April–2026"         trend="neutral" icon={TrendingUp}   color="rose" />
        <StatCard label="Net Balance"      value="₹3,71,500" change="Surplus"            trend="up"      icon={CheckCircle2} color="blue" />
        <StatCard label="Pending Dues"     value="₹96,000"   change="28 students"        trend="down"    icon={AlertCircle}  color="amber" />
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Monthly Collection vs Expenses</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={MONTHLY_DATA} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize:12 }} />
              <YAxis tick={{ fontSize:12 }} tickFormatter={v=>`₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v:number)=>`₹${v.toLocaleString()}`} />
              <Bar dataKey="collected" name="Collected" fill="#3b82f6" radius={[4,4,0,0]} />
              <Bar dataKey="expenses"  name="Expenses"  fill="#f87171" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Collection by Fee Category</CardTitle>
          <CardDescription>Academic year 2025–2026</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Category','Collected','Target','Collection Rate'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {CATEGORY_BREAKDOWN.map(c=>{
                  const rate = Math.round((c.collected/c.target)*100);
                  return (
                    <tr key={c.category} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{c.category}</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">₹{c.collected.toLocaleString()}</td>
                      <td className="px-4 py-3 text-muted-foreground">₹{c.target.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
                            <div className="h-1.5 rounded-full bg-blue-500" style={{width:`${rate}%`}} />
                          </div>
                          <span className="text-xs font-medium w-8">{rate}%</span>
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
