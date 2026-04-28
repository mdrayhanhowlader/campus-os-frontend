import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/StatCard';
import { CreditCard, CheckCircle2, Clock, AlertCircle, Download } from 'lucide-react';

const STATS = [
  { label: 'Total Fees',   value: '₹42,000', change: 'Annual 2025-26',   trend: 'neutral' as const, icon: CreditCard,   color: 'blue'   as const },
  { label: 'Paid',         value: '₹37,500', change: '3 installments',   trend: 'up'      as const, icon: CheckCircle2, color: 'green'  as const },
  { label: 'Outstanding',  value: '₹4,500',  change: 'Due: May 10',      trend: 'down'    as const, icon: AlertCircle,  color: 'amber'  as const },
  { label: 'Next Due',     value: '18 days', change: '4th installment',  trend: 'neutral' as const, icon: Clock,        color: 'purple' as const },
];

const INVOICES = [
  { id: 'INV-2026-001', desc: '1st Installment — June 2025',    amount: 10500, paid: 10500, status: 'PAID',    date: '2025-06-05' },
  { id: 'INV-2026-002', desc: '2nd Installment — Sept 2025',    amount: 10500, paid: 10500, status: 'PAID',    date: '2025-09-03' },
  { id: 'INV-2026-003', desc: '3rd Installment — Jan 2026',     amount: 10500, paid: 10500, status: 'PAID',    date: '2026-01-07' },
  { id: 'INV-2026-004', desc: '4th Installment — Apr 2026',     amount: 10500, paid: 0,     status: 'PENDING', date: '2026-05-10' },
];

const STATUS_CFG: Record<string, string> = {
  PAID:    'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  PENDING: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  OVERDUE: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
};

export default function StudentFeesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Fee Details"
        description="Your fee status and payment history."
        breadcrumbs={[{ label: 'Dashboard', href: '/student' }, { label: 'Fees' }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress bar */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payment Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paid</span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹37,500 / ₹42,000</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-3 rounded-full bg-green-500 transition-all" style={{ width: '89%' }} />
                </div>
                <p className="text-xs text-muted-foreground">89% of annual fee paid</p>
              </div>

              <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Outstanding Balance: ₹4,500</p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">Due by May 10, 2026. Late fee of ₹500/month applies after due date.</p>
                <Button size="sm" className="mt-3 bg-amber-600 hover:bg-amber-700 text-white">Pay Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fee breakdown */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Fee Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              { label: 'Tuition Fee',   amount: '₹32,000' },
              { label: 'Lab Fee',       amount: '₹4,000' },
              { label: 'Library Fee',   amount: '₹2,000' },
              { label: 'Sports Fee',    amount: '₹2,000' },
              { label: 'Activity Fee',  amount: '₹2,000' },
            ].map((f) => (
              <div key={f.label} className="flex justify-between py-1 border-b last:border-0 dark:border-gray-800">
                <span className="text-muted-foreground">{f.label}</span>
                <span className="font-medium text-gray-900 dark:text-white">{f.amount}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 font-semibold text-gray-900 dark:text-white">
              <span>Total</span><span>₹42,000</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Invoice History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Invoice', 'Description', 'Amount', 'Due Date', 'Status', ''].map((h) => (
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
                      {inv.status === 'PAID'
                        ? <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><Download className="h-3 w-3" />Receipt</Button>
                        : <Button size="sm" className="h-7 text-xs">Pay</Button>
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
