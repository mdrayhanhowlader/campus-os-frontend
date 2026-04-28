'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download } from 'lucide-react';

const PAYMENTS = [
  { id: 'PAY-001', student: 'Priya Sharma',   class: '10-A', inv: 'INV-2026-001', amount: 10500, method: 'UPI',  ref: 'UPI-2025-06-0012', date: '2025-06-05', receipt: 'RCP-001' },
  { id: 'PAY-002', student: 'Rohan Gupta',    class: '11-B', inv: 'INV-2026-021', amount: 10500, method: 'Cash', ref: '',                  date: '2026-04-20', receipt: 'RCP-021' },
  { id: 'PAY-003', student: 'Sneha Nair',     class: '9-C',  inv: 'INV-2026-038', amount: 4200,  method: 'UPI',  ref: 'UPI-2026-04-0038', date: '2026-04-20', receipt: 'RCP-038' },
  { id: 'PAY-004', student: 'Arjun Menon',    class: '12-A', inv: 'INV-2026-052', amount: 12000, method: 'Bank', ref: 'TXN-2026-04-1234',  date: '2026-04-19', receipt: 'RCP-052' },
  { id: 'PAY-005', student: 'Ayaan Khan',     class: '10-A', inv: 'INV-2026-008', amount: 10500, method: 'UPI',  ref: 'UPI-2026-04-0089', date: '2026-04-18', receipt: 'RCP-089' },
  { id: 'PAY-006', student: 'Meera Reddy',    class: '8-B',  inv: 'INV-2026-074', amount: 10500, method: 'Cash', ref: '',                  date: '2026-04-17', receipt: 'RCP-074' },
];

const METHOD_CFG: Record<string, string> = {
  UPI:  'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  Cash: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  Bank: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  Cheque: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
};

export default function AccountantPaymentsPage() {
  const [search, setSearch] = useState('');
  const [method, setMethod] = useState('ALL');

  const filtered = PAYMENTS.filter((p) => {
    const matchSearch = p.student.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchMethod = method === 'ALL' || p.method === method;
    return matchSearch && matchMethod;
  });
  const total = filtered.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Payment History" description="All recorded fee payments." breadcrumbs={[{ label: 'Dashboard', href: '/accountant' }, { label: 'Payments' }]}
        actions={<Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Export CSV</Button>}
      />
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3 flex-1">
              <div className="relative flex-1 max-w-xs"><Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Methods</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Total: ₹{total.toLocaleString()}</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Receipt', 'Student', 'Class', 'Invoice', 'Amount', 'Method', 'Reference', 'Date', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.receipt}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{p.student}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.class}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.inv}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">₹{p.amount.toLocaleString()}</td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${METHOD_CFG[p.method]}`}>{p.method}</Badge></td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.ref || '—'}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                    <td className="px-4 py-3"><Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><Download className="h-3 w-3" />Receipt</Button></td>
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
