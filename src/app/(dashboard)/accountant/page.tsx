import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const STATS = [
  { label: 'Collected Today',  value: '₹18,400', change: '12 payments',         trend: 'up'      as const, icon: DollarSign,   color: 'green'  as const },
  { label: 'This Month',       value: '₹1,84,200', change: '87% of target',      trend: 'up'      as const, icon: TrendingUp,   color: 'blue'   as const },
  { label: 'Outstanding',      value: '₹46,800',  change: '127 pending invoices',trend: 'down'    as const, icon: AlertCircle,  color: 'amber'  as const },
  { label: 'Overdue',          value: '23',        change: 'Invoices > 30 days', trend: 'down'    as const, icon: Clock,        color: 'rose'   as const },
];

const RECENT = [
  { student: 'Priya Sharma',   class: '10-A', amount: 10500, method: 'UPI',  time: '10:30 AM', inv: 'INV-2026-004' },
  { student: 'Rohan Gupta',    class: '11-B', amount: 10500, method: 'Cash', time: '10:15 AM', inv: 'INV-2026-021' },
  { student: 'Sneha Nair',     class: '9-C',  amount: 4200,  method: 'UPI',  time: '09:45 AM', inv: 'INV-2026-038' },
  { student: 'Arjun Menon',    class: '12-A', amount: 12000, method: 'Bank', time: '09:00 AM', inv: 'INV-2026-052' },
  { student: 'Fatima Sheikh',  class: '10-B', amount: 10500, method: 'UPI',  time: 'Yesterday',inv: 'INV-2026-063' },
];

const METHOD_CFG: Record<string, string> = {
  UPI:  'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  Cash: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  Bank: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
};

export default function AccountantDashboard() {
  const total = RECENT.reduce((s, r) => s + r.amount, 0);
  return (
    <div className="space-y-6">
      <PageHeader title="Finance Dashboard" description="Today's collection and outstanding fee overview." breadcrumbs={[{ label: 'Dashboard' }]} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Monthly target */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Monthly Collection Progress</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Collected</span>
            <span className="font-semibold text-gray-900 dark:text-white">₹1,84,200 / ₹2,10,000</span>
          </div>
          <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800">
            <div className="h-3 rounded-full bg-green-500 transition-all" style={{ width: '87.7%' }} />
          </div>
          <p className="text-xs text-muted-foreground">87.7% of April target achieved · ₹25,800 remaining</p>
        </CardContent>
      </Card>

      {/* Recent payments */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Recent Payments</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Student', 'Class', 'Invoice', 'Amount', 'Method', 'Time'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {RECENT.map((r) => (
                  <tr key={r.inv} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{r.student}</td>
                    <td className="px-5 py-3 text-muted-foreground">{r.class}</td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{r.inv}</td>
                    <td className="px-5 py-3 font-semibold text-green-600">₹{r.amount.toLocaleString()}</td>
                    <td className="px-5 py-3"><Badge className={`border-0 text-[11px] ${METHOD_CFG[r.method]}`}>{r.method}</Badge></td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{r.time}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t bg-gray-50 dark:bg-gray-800/50 font-semibold">
                  <td colSpan={3} className="px-5 py-3 text-sm text-muted-foreground">Today's Total (shown)</td>
                  <td className="px-5 py-3 text-sm text-green-600">₹{total.toLocaleString()}</td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
