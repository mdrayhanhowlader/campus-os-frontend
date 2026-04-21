'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download } from 'lucide-react';

const MOCK_PAYMENTS = [
  { id:'TXN-001', student:'Emma Rodriguez',  admNo:'STU-2025-00001', amount:15000, method:'Online',    date:'2026-04-18', feeType:'Tuition',   receipt:'RCP-001' },
  { id:'TXN-002', student:'Marcus Johnson',  admNo:'STU-2025-00002', amount:4000,  method:'Cash',      date:'2026-04-17', feeType:'Transport', receipt:'RCP-002' },
  { id:'TXN-003', student:'Aisha Patel',     admNo:'STU-2025-00003', amount:8000,  method:'Cheque',    date:'2026-04-16', feeType:'Tuition',   receipt:'RCP-003' },
  { id:'TXN-004', student:'Lucas Wright',    admNo:'STU-2025-00004', amount:1500,  method:'Online',    date:'2026-04-15', feeType:'Library',   receipt:'RCP-004' },
  { id:'TXN-005', student:'Sophie Chen',     admNo:'STU-2025-00005', amount:15000, method:'Online',    date:'2026-04-14', feeType:'Tuition',   receipt:'RCP-005' },
  { id:'TXN-006', student:'James Park',      admNo:'STU-2025-00006', amount:2000,  method:'Cash',      date:'2026-04-13', feeType:'Lab Fee',   receipt:'RCP-006' },
];

const METHOD_COLORS: Record<string,string> = {
  'Online': 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  'Cash':   'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  'Cheque': 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
};

export default function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');

  const filtered = MOCK_PAYMENTS.filter(p=>
    (p.student.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search)) &&
    (methodFilter==='ALL' || p.method===methodFilter)
  );
  const total = filtered.reduce((s,p)=>s+p.amount,0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payment History"
        description="All fee payment transactions."
        breadcrumbs={[{ label:'Fees', href:'/admin/fees' }, { label:'Payments' }]}
        actions={<Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>}
      />

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base">
              Transactions
              <span className="ml-3 text-sm font-normal text-muted-foreground">Total: ₹{total.toLocaleString()}</span>
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="h-9 pl-8 w-44" value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="h-9 w-32"><SelectValue placeholder="Method" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Methods</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Txn ID','Student','Fee Type','Amount','Method','Date','Receipt','Action'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map(p=>(
                  <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3"><span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{p.id}</span></td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{p.student}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.feeType}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">₹{p.amount.toLocaleString()}</td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${METHOD_COLORS[p.method]}`}>{p.method}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{p.date}</td>
                    <td className="px-4 py-3"><span className="font-mono text-xs text-muted-foreground">{p.receipt}</span></td>
                    <td className="px-4 py-3"><Button variant="outline" size="sm" className="h-7 text-xs"><Download className="h-3 w-3 mr-1"/>Receipt</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
