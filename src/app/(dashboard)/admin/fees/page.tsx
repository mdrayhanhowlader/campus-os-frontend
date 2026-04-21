'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle2, Plus, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

const RECENT_PAYMENTS = [
  { id: '1', student: 'Emma Rodriguez',  admNo: 'STU-2025-00001', amount: 1500, type: 'Tuition',    date: '2026-04-18', status: 'PAID' },
  { id: '2', student: 'Marcus Johnson',  admNo: 'STU-2025-00002', amount: 800,  type: 'Transport',  date: '2026-04-17', status: 'PAID' },
  { id: '3', student: 'Aisha Patel',     admNo: 'STU-2025-00003', amount: 1500, type: 'Tuition',    date: '2026-04-16', status: 'PARTIAL' },
  { id: '4', student: 'Lucas Wright',    admNo: 'STU-2025-00004', amount: 200,  type: 'Library',    date: '2026-04-15', status: 'PAID' },
  { id: '5', student: 'Sophie Chen',     admNo: 'STU-2025-00005', amount: 1500, type: 'Tuition',    date: '2026-04-14', status: 'PENDING' },
];

const STATUS_COLORS: Record<string, string> = {
  PAID:    'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  PARTIAL: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  PENDING: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
};

const QUICK_LINKS = [
  { href: '/admin/fees/collect',   label: 'Collect Payment',  desc: 'Record new payment',        color: 'bg-blue-50 dark:bg-blue-950',   icon: '💳' },
  { href: '/admin/fees/invoices',  label: 'Invoices',         desc: 'View all fee invoices',      color: 'bg-green-50 dark:bg-green-950', icon: '🧾' },
  { href: '/admin/fees/structure', label: 'Fee Structure',    desc: 'Manage fee categories',      color: 'bg-purple-50 dark:bg-purple-950',icon: '📋' },
  { href: '/admin/fees/reports',   label: 'Reports',          desc: 'Financial summaries',        color: 'bg-amber-50 dark:bg-amber-950', icon: '📊' },
  { href: '/admin/fees/expenses',  label: 'Expenses',         desc: 'Track school expenses',      color: 'bg-rose-50 dark:bg-rose-950',   icon: '💸' },
];

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance & Fees"
        description="Manage fee collection, invoices, and financial reports."
        breadcrumbs={[{ label: 'Fees' }]}
        actions={
          <Button size="sm" asChild>
            <Link href="/admin/fees/collect"><Plus className="mr-2 h-4 w-4" />Collect Fee</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Collected"   value="₹4,82,500" change="+12% this month"    trend="up"      icon={DollarSign}   color="green" />
        <StatCard label="Pending Amount"    value="₹96,000"   change="28 students due"    trend="down"    icon={AlertCircle}  color="rose" />
        <StatCard label="This Month"        value="₹1,24,000" change="vs ₹1,10,000 last"  trend="up"      icon={TrendingUp}   color="blue" />
        <StatCard label="Collection Rate"   value="83%"       change="Up from 78%"        trend="up"      icon={CheckCircle2} color="amber" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {QUICK_LINKS.map((ql) => (
          <Link key={ql.href} href={ql.href}>
            <Card className={`border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${ql.color}`}>
              <CardContent className="p-4">
                <div className="text-2xl mb-2">{ql.icon}</div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">{ql.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{ql.desc}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Payments</CardTitle>
              <CardDescription>Latest fee transactions</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/fees/payments">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Student', 'Adm. No.', 'Fee Type', 'Amount', 'Date', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {RECENT_PAYMENTS.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{p.student}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{p.admNo}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.type}</td>
                    <td className="px-4 py-3 font-semibold">{formatCurrency(p.amount)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.date}</td>
                    <td className="px-4 py-3">
                      <Badge className={`border-0 text-[11px] ${STATUS_COLORS[p.status]}`}>{p.status}</Badge>
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
