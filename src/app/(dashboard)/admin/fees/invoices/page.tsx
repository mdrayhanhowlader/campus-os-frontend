'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Plus } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

const MOCK_INVOICES = [
  { id: 'INV-2026-001', student: 'Emma Rodriguez',  admNo: 'STU-2025-00001', amount: 15000, paid: 15000, due: '2026-04-30', status: 'PAID' },
  { id: 'INV-2026-002', student: 'Marcus Johnson',  admNo: 'STU-2025-00002', amount: 12000, paid: 6000,  due: '2026-04-30', status: 'PARTIAL' },
  { id: 'INV-2026-003', student: 'Aisha Patel',     admNo: 'STU-2025-00003', amount: 15000, paid: 0,     due: '2026-04-20', status: 'OVERDUE' },
  { id: 'INV-2026-004', student: 'Lucas Wright',    admNo: 'STU-2025-00004', amount: 15000, paid: 15000, due: '2026-04-30', status: 'PAID' },
  { id: 'INV-2026-005', student: 'Sophie Chen',     admNo: 'STU-2025-00005', amount: 12000, paid: 0,     due: '2026-05-15', status: 'PENDING' },
];

const STATUS_COLORS: Record<string, string> = {
  PAID:    'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  PARTIAL: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  PENDING: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  OVERDUE: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
};

export default function InvoicesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const filtered = MOCK_INVOICES.filter((i) => {
    const matchSearch = i.student.toLowerCase().includes(search.toLowerCase()) || i.id.includes(search);
    const matchStatus = statusFilter === 'ALL' || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fee Invoices"
        description="View and manage all student fee invoices."
        breadcrumbs={[{ label: 'Fees', href: '/admin/fees' }, { label: 'Invoices' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
            <Button size="sm"><Plus className="mr-2 h-4 w-4" />New Invoice</Button>
          </div>
        }
      />
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="text-base">All Invoices</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search invoice..." className="h-9 pl-8 w-48" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="PARTIAL">Partial</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="OVERDUE">Overdue</SelectItem>
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
                  {['Invoice #', 'Student', 'Total Amount', 'Paid', 'Balance', 'Due Date', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3"><span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{inv.id}</span></td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{inv.student}</td>
                    <td className="px-4 py-3 font-semibold">{formatCurrency(inv.amount)}</td>
                    <td className="px-4 py-3 text-green-600">{formatCurrency(inv.paid)}</td>
                    <td className="px-4 py-3 text-red-600">{formatCurrency(inv.amount - inv.paid)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(inv.due)}</td>
                    <td className="px-4 py-3">
                      <Badge className={`border-0 text-[11px] ${STATUS_COLORS[inv.status]}`}>{inv.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">View</Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs"><Download className="h-3 w-3" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="py-16 text-center text-muted-foreground text-sm">No invoices found</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
