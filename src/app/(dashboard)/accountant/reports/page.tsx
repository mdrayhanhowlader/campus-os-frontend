'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, TrendingUp, TrendingDown, DollarSign, Receipt } from 'lucide-react';

const MONTHLY = [
  { month: 'Nov 2025', collected: 185000, expenses: 142000, target: 210000 },
  { month: 'Dec 2025', collected: 172000, expenses: 98000,  target: 210000 },
  { month: 'Jan 2026', collected: 196000, expenses: 151000, target: 210000 },
  { month: 'Feb 2026', collected: 201000, expenses: 138000, target: 210000 },
  { month: 'Mar 2026', collected: 189000, expenses: 162000, target: 210000 },
  { month: 'Apr 2026', collected: 184200, expenses: 212300, target: 210000 },
];

const CATEGORY_EXPENSES = [
  { category: 'Salaries',       amount: 85000, pct: 40 },
  { category: 'Infrastructure', amount: 42500, pct: 20 },
  { category: 'Utilities',      amount: 28300, pct: 13 },
  { category: 'Events',         amount: 24000, pct: 11 },
  { category: 'Maintenance',    amount: 19600, pct: 9  },
  { category: 'Supplies',       amount: 12900, pct: 6  },
];

const CAT_COLOR: Record<string, string> = {
  Salaries:       'bg-purple-500',
  Infrastructure: 'bg-rose-500',
  Utilities:      'bg-blue-500',
  Events:         'bg-orange-500',
  Maintenance:    'bg-amber-500',
  Supplies:       'bg-green-500',
};

const FEE_COLLECTION = [
  { category: 'Tuition Fee',   collected: 142000, pending: 28000 },
  { category: 'Lab Fee',       collected: 18400,  pending: 4200  },
  { category: 'Activity Fee',  collected: 14200,  pending: 6800  },
  { category: 'Transport Fee', collected: 9600,   pending: 2400  },
];

const maxBar = Math.max(...MONTHLY.map((m) => Math.max(m.collected, m.expenses, m.target)));

export default function AccountantReportsPage() {
  const [period, setPeriod] = useState('apr-2026');

  const latest    = MONTHLY[MONTHLY.length - 1];
  const prev      = MONTHLY[MONTHLY.length - 2];
  const netLatest = latest.collected - latest.expenses;
  const netPrev   = prev.collected - prev.expenses;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Reports"
        description="Monthly revenue, expense, and collection analytics."
        breadcrumbs={[{ label: 'Dashboard', href: '/accountant' }, { label: 'Reports' }]}
        actions={
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="apr-2026">April 2026</SelectItem>
                <SelectItem value="mar-2026">March 2026</SelectItem>
                <SelectItem value="feb-2026">February 2026</SelectItem>
                <SelectItem value="q4-2025">Q4 2025-26</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Export PDF</Button>
          </div>
        }
      />

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Collected', value: `₹${latest.collected.toLocaleString()}`, sub: `Target: ₹${latest.target.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950/30' },
          { label: 'Total Expenses',  value: `₹${latest.expenses.toLocaleString()}`,  sub: `${((latest.expenses / latest.collected) * 100).toFixed(1)}% of collection`, icon: Receipt, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/30' },
          { label: 'Net Surplus',     value: `₹${Math.abs(netLatest).toLocaleString()}`, sub: netLatest >= 0 ? 'Surplus this month' : 'Deficit this month', icon: netLatest >= 0 ? TrendingUp : TrendingDown, color: netLatest >= 0 ? 'text-blue-600' : 'text-amber-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
          { label: 'Collection Rate', value: `${((latest.collected / latest.target) * 100).toFixed(1)}%`, sub: 'of monthly target', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/30' },
        ].map((s) => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-5 flex items-start gap-4">
              <div className={`p-2.5 rounded-lg ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly trend */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base">6-Month Revenue vs Expenses</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MONTHLY.map((m) => (
                <div key={m.month}>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{m.month}</span>
                    <span>₹{m.collected.toLocaleString()} collected · ₹{m.expenses.toLocaleString()} expenses</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: `${(m.collected / maxBar) * 100}%` }} />
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div className="h-2 rounded-full bg-red-400" style={{ width: `${(m.expenses / maxBar) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-green-500 inline-block" />Collected</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-red-400 inline-block" />Expenses</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense breakdown */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base">Expense Breakdown — April 2026</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {CATEGORY_EXPENSES.map((c) => (
              <div key={c.category}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-900 dark:text-white font-medium">{c.category}</span>
                  <span className="text-muted-foreground">₹{c.amount.toLocaleString()} ({c.pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className={`h-2 rounded-full ${CAT_COLOR[c.category]}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Fee collection by category */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Fee Collection by Category</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Fee Category', 'Collected', 'Pending', 'Total', 'Collection %'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {FEE_COLLECTION.map((f) => {
                  const total  = f.collected + f.pending;
                  const pct    = Math.round((f.collected / total) * 100);
                  return (
                    <tr key={f.category} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{f.category}</td>
                      <td className="px-5 py-3 font-semibold text-green-600">₹{f.collected.toLocaleString()}</td>
                      <td className="px-5 py-3 text-red-500">₹{f.pending.toLocaleString()}</td>
                      <td className="px-5 py-3 text-muted-foreground">₹{total.toLocaleString()}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{pct}%</span>
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

      {/* Month comparison */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Month-on-Month Comparison</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Revenue',  curr: latest.collected, prev: prev.collected },
              { label: 'Expenses', curr: latest.expenses,  prev: prev.expenses  },
              { label: 'Net',      curr: netLatest,        prev: netPrev        },
            ].map((c) => {
              const delta = c.curr - c.prev;
              const pct   = prev.collected > 0 ? ((delta / Math.abs(c.prev)) * 100).toFixed(1) : '0';
              const up    = delta >= 0;
              return (
                <div key={c.label} className="rounded-lg border dark:border-gray-800 p-4">
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">₹{Math.abs(c.curr).toLocaleString()}</p>
                  <div className={`flex items-center gap-1 mt-1 text-xs ${up ? 'text-green-600' : 'text-red-500'}`}>
                    {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{up ? '+' : ''}{pct}% vs last month</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
