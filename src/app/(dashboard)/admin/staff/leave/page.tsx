'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, CheckCircle2, XCircle, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const MOCK_LEAVES = [
  { id:'1', staff:'Dr. Sarah Mitchell', type:'Medical',   from:'2026-04-22', to:'2026-04-24', days:3, reason:'Surgery recovery',      status:'PENDING' },
  { id:'2', staff:'Mr. James Chen',     type:'Casual',    from:'2026-04-25', to:'2026-04-25', days:1, reason:'Personal work',          status:'APPROVED' },
  { id:'3', staff:'Ms. Linda Park',     type:'Earned',    from:'2026-05-01', to:'2026-05-05', days:5, reason:'Family vacation',        status:'PENDING' },
  { id:'4', staff:'Mr. Robert Davis',   type:'Medical',   from:'2026-04-10', to:'2026-04-14', days:5, reason:'Fever and hospitalization', status:'APPROVED' },
  { id:'5', staff:'Ms. Priya Sharma',   type:'Casual',    from:'2026-04-20', to:'2026-04-20', days:1, reason:'Personal emergency',     status:'REJECTED' },
];

const STATUS_CFG: Record<string,{color:string}> = {
  PENDING:  { color:'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400' },
  APPROVED: { color:'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' },
  REJECTED: { color:'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400' },
};

export default function StaffLeavePage() {
  const [leaves, setLeaves] = useState(MOCK_LEAVES);
  const [filter, setFilter] = useState('ALL');

  function updateStatus(id:string, status:string) {
    setLeaves(l=>l.map(x=>x.id===id?{...x,status}:x));
    toast.success(`Leave ${status.toLowerCase()} successfully`);
  }

  const filtered = filter==='ALL' ? leaves : leaves.filter(l=>l.status===filter);
  const pending  = leaves.filter(l=>l.status==='PENDING').length;
  const approved = leaves.filter(l=>l.status==='APPROVED').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Management"
        description="Review and approve staff leave applications."
        breadcrumbs={[{ label:'Staff', href:'/admin/staff' }, { label:'Leave' }]}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending"  value={pending}  change="Awaiting approval" trend="neutral" icon={Clock}        color="amber" />
        <StatCard label="Approved" value={approved} change="This month"        trend="up"      icon={CheckCircle2} color="green" />
        <StatCard label="Total"    value={leaves.length} change="All requests" trend="neutral" icon={Calendar}     color="blue" />
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base">Leave Applications</CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Staff','Type','From','To','Days','Reason','Status','Actions'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map(l=>(
                  <tr key={l.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{l.staff}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs">{l.type}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{l.from}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.to}</td>
                    <td className="px-4 py-3 text-center font-medium">{l.days}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs max-w-[150px] truncate">{l.reason}</td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${STATUS_CFG[l.status].color}`}>{l.status}</Badge></td>
                    <td className="px-4 py-3">
                      {l.status==='PENDING' ? (
                        <div className="flex gap-1">
                          <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700" onClick={()=>updateStatus(l.id,'APPROVED')}><CheckCircle2 className="h-3 w-3 mr-1"/>Approve</Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs text-red-500 border-red-200 hover:bg-red-50" onClick={()=>updateStatus(l.id,'REJECTED')}><XCircle className="h-3 w-3 mr-1"/>Reject</Button>
                        </div>
                      ) : <span className="text-xs text-muted-foreground">No action</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length===0 && <div className="py-16 text-center text-muted-foreground text-sm">No records found</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
