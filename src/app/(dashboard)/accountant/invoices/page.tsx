'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Download } from 'lucide-react';
import { toast } from 'sonner';

const INVOICES = [
  { id: 'INV-2026-001', student: 'Priya Sharma',   class: '10-A', desc: '1st Installment',  amount: 10500, balance: 0,     status: 'PAID',    due: '2025-06-10' },
  { id: 'INV-2026-004', student: 'Priya Sharma',   class: '10-A', desc: '4th Installment',  amount: 10500, balance: 10500, status: 'PENDING', due: '2026-05-10' },
  { id: 'INV-2026-021', student: 'Rohan Gupta',    class: '11-B', desc: '4th Installment',  amount: 10500, balance: 0,     status: 'PAID',    due: '2026-04-20' },
  { id: 'INV-2026-038', student: 'Sneha Nair',     class: '9-C',  desc: 'Lab Fee',          amount: 4200,  balance: 0,     status: 'PAID',    due: '2026-04-15' },
  { id: 'INV-2026-052', student: 'Arjun Menon',    class: '12-A', desc: '4th Installment',  amount: 12000, balance: 0,     status: 'PAID',    due: '2026-04-10' },
  { id: 'INV-2026-063', student: 'Fatima Sheikh',  class: '10-B', desc: '3rd Installment',  amount: 10500, balance: 10500, status: 'OVERDUE', due: '2026-03-10' },
  { id: 'INV-2026-079', student: 'Kabir Singh',    class: '11-A', desc: '4th Installment',  amount: 10500, balance: 10500, status: 'PENDING', due: '2026-05-10' },
  { id: 'INV-2026-090', student: 'Meera Reddy',    class: '8-B',  desc: 'Activity Fee',     amount: 2000,  balance: 2000,  status: 'PENDING', due: '2026-05-15' },
];

const STATUS_CFG: Record<string, string> = {
  PAID:    'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  PENDING: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  OVERDUE: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
};

export default function AccountantInvoicesPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');

  const filtered = INVOICES.filter((inv) => {
    const matchSearch = inv.student.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === 'ALL' || inv.status === status;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="All fee invoices across the school."
        breadcrumbs={[{ label: 'Dashboard', href: '/accountant' }, { label: 'Invoices' }]}
        actions={<Button size="sm" onClick={() => toast.info('Create invoice form')}><Plus className="mr-2 h-4 w-4" />New Invoice</Button>}
      />
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by student or invoice no..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="OVERDUE">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Invoice', 'Student', 'Class', 'Description', 'Amount', 'Balance', 'Due Date', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{inv.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{inv.student}</td>
                    <td className="px-4 py-3 text-muted-foreground">{inv.class}</td>
                    <td className="px-4 py-3 text-muted-foreground">{inv.desc}</td>
                    <td className="px-4 py-3 font-medium">₹{inv.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 font-medium text-red-600">{inv.balance > 0 ? `₹${inv.balance.toLocaleString()}` : <span className="text-green-600">Paid</span>}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(inv.due).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${STATUS_CFG[inv.status]}`}>{inv.status}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {inv.status !== 'PAID' && <Button size="sm" className="h-7 text-xs">Collect</Button>}
                        <Button variant="ghost" size="sm" className="h-7 text-xs"><Download className="h-3 w-3" /></Button>
                      </div>
                    </td>
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
