'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/StatCard';
import { CreditCard, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { toast } from 'sonner';

const STATS = [
  { label: 'Total Annual Fee', value: '₹42,000', change: 'Year 2025-26',  trend: 'neutral' as const, icon: CreditCard,   color: 'blue'   as const },
  { label: 'Amount Paid',      value: '₹37,500', change: '3 payments',    trend: 'up'      as const, icon: CheckCircle2, color: 'green'  as const },
  { label: 'Outstanding',      value: '₹4,500',  change: 'Due May 10',    trend: 'down'    as const, icon: AlertCircle,  color: 'amber'  as const },
];

const INVOICES = [
  { id: 'INV-2026-001', desc: '1st Installment — Tuition + Fees', amount: 10500, status: 'PAID',    date: '2025-06-05', receiptNo: 'RCP-001' },
  { id: 'INV-2026-002', desc: '2nd Installment — Tuition + Fees', amount: 10500, status: 'PAID',    date: '2025-09-03', receiptNo: 'RCP-002' },
  { id: 'INV-2026-003', desc: '3rd Installment — Tuition + Fees', amount: 10500, status: 'PAID',    date: '2026-01-07', receiptNo: 'RCP-003' },
  { id: 'INV-2026-004', desc: '4th Installment — Tuition + Fees', amount: 10500, status: 'PENDING', date: '2026-05-10', receiptNo: '' },
];

const STATUS_CFG: Record<string, string> = {
  PAID:    'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  PENDING: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
};

export default function ParentFeesPage() {
  const [paying, setPaying] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fee Payment"
        description="Priya Sharma — Class 10-A — Fee details and payment."
        breadcrumbs={[{ label: 'Dashboard', href: '/parent' }, { label: 'Fees' }]}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Outstanding fee CTA */}
      <Card className="border-0 shadow-sm border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
        <CardContent className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-200">Outstanding: ₹4,500 (4th Installment)</p>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-0.5">Due by May 10, 2026. Late fee of ₹500/month applies after due date.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-400" onClick={() => setPaying(true)}>
              Pay Online
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => toast.info('Redirecting to payment gateway...')}>
              Pay Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoice table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Fee History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Invoice No.', 'Description', 'Amount', 'Due Date', 'Status', 'Receipt'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {INVOICES.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{inv.id}</td>
                    <td className="px-5 py-3 text-gray-900 dark:text-white">{inv.desc}</td>
                    <td className="px-5 py-3 font-medium">₹{inv.amount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-muted-foreground">{new Date(inv.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                    <td className="px-5 py-3"><Badge className={`border-0 text-[11px] ${STATUS_CFG[inv.status]}`}>{inv.status}</Badge></td>
                    <td className="px-5 py-3">
                      {inv.receiptNo
                        ? <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><Download className="h-3 w-3" />{inv.receiptNo}</Button>
                        : <span className="text-xs text-muted-foreground">—</span>
                      }
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
