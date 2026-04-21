'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Download, CheckCircle2, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

const MOCK_PAYROLL = [
  { id:'1', name:'Dr. Sarah Mitchell', role:'Teacher',    basic:65000, allowances:8000, deductions:5000, net:68000, status:'PAID' },
  { id:'2', name:'Mr. James Chen',     role:'Teacher',    basic:60000, allowances:7500, deductions:4800, net:62700, status:'PAID' },
  { id:'3', name:'Ms. Linda Park',     role:'Librarian',  basic:45000, allowances:5000, deductions:3500, net:46500, status:'PENDING' },
  { id:'4', name:'Mr. Robert Davis',   role:'Teacher',    basic:62000, allowances:7500, deductions:4900, net:64600, status:'PAID' },
  { id:'5', name:'Ms. Priya Sharma',   role:'Teacher',    basic:58000, allowances:7000, deductions:4600, net:60400, status:'PENDING' },
  { id:'6', name:'Mr. Kevin Brooks',   role:'Accountant', basic:50000, allowances:6000, deductions:4000, net:52000, status:'PENDING' },
];

export default function PayrollPage() {
  const [month, setMonth] = useState('April 2026');
  const [payroll, setPayroll] = useState(MOCK_PAYROLL);

  const totalNet = payroll.reduce((s,p)=>s+p.net,0);
  const paid = payroll.filter(p=>p.status==='PAID').length;

  function processAll() {
    setPayroll(p=>p.map(x=>({...x,status:'PAID'})));
    toast.success('All salaries processed successfully!');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll"
        description="Process and manage staff salary payments."
        breadcrumbs={[{ label:'Staff', href:'/admin/staff' }, { label:'Payroll' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
            <Button size="sm" onClick={processAll}>Process All</Button>
          </div>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Payroll" value={formatCurrency(totalNet)} change={month}    trend="neutral" icon={DollarSign}  color="blue" />
        <StatCard label="Paid"          value={paid}                    change="Processed" trend="up"      icon={CheckCircle2} color="green" />
        <StatCard label="Pending"       value={payroll.length-paid}     change="To process" trend="neutral" icon={Clock}       color="amber" />
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle className="text-base">Salary Sheet</CardTitle>
              <CardDescription>{month}</CardDescription>
            </div>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="h-9 w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['April 2026','March 2026','February 2026'].map(m=><SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Staff','Role','Basic','Allowances','Deductions','Net Salary','Status','Action'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {payroll.map(p=>(
                  <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{p.name}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs">{p.role}</Badge></td>
                    <td className="px-4 py-3">{formatCurrency(p.basic)}</td>
                    <td className="px-4 py-3 text-green-600">+{formatCurrency(p.allowances)}</td>
                    <td className="px-4 py-3 text-red-500">-{formatCurrency(p.deductions)}</td>
                    <td className="px-4 py-3 font-bold">{formatCurrency(p.net)}</td>
                    <td className="px-4 py-3">
                      <Badge className={p.status==='PAID'
                        ? 'bg-green-50 text-green-700 border-0 dark:bg-green-950 dark:text-green-400'
                        : 'bg-amber-50 text-amber-700 border-0 dark:bg-amber-950 dark:text-amber-400'
                      }>{p.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {p.status==='PENDING'
                        ? <Button size="sm" className="h-7 text-xs" onClick={()=>{ setPayroll(pr=>pr.map(x=>x.id===p.id?{...x,status:'PAID'}:x)); toast.success('Salary processed!'); }}>Pay Now</Button>
                        : <Button size="sm" variant="outline" className="h-7 text-xs"><Download className="h-3 w-3 mr-1"/>Slip</Button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t bg-gray-50 dark:bg-gray-800/50">
                  <td colSpan={5} className="px-4 py-3 text-sm font-bold text-right text-gray-900 dark:text-white">Total</td>
                  <td className="px-4 py-3 font-bold text-blue-600">{formatCurrency(totalNet)}</td>
                  <td colSpan={2}/>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
