'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DollarSign, Users, BookOpen, Bus, Home, CreditCard, MessageSquare, Bell, FileText, Award, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const PLANS = [
  {
    key: 'TRIAL',
    label: 'Trial',
    price: 0,
    duration: '14 days',
    maxStudents: 100,
    maxStaff: 10,
    color: 'border-gray-300 dark:border-gray-700',
    badge: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    modules: ['STUDENT_PORTAL', 'TEACHER_PORTAL', 'EXAM_MODULE', 'ANNOUNCEMENTS'],
  },
  {
    key: 'STARTER',
    label: 'Starter',
    price: 2999,
    duration: '/month',
    maxStudents: 300,
    maxStaff: 25,
    color: 'border-blue-300 dark:border-blue-700',
    badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
    modules: ['STUDENT_PORTAL', 'TEACHER_PORTAL', 'PARENT_PORTAL', 'EXAM_MODULE', 'ANNOUNCEMENTS', 'MESSAGING'],
  },
  {
    key: 'STANDARD',
    label: 'Standard',
    price: 7999,
    duration: '/month',
    maxStudents: 800,
    maxStaff: 60,
    color: 'border-purple-300 dark:border-purple-700',
    badge: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
    modules: ['STUDENT_PORTAL', 'TEACHER_PORTAL', 'PARENT_PORTAL', 'ACCOUNTANT_PORTAL', 'LIBRARIAN_PORTAL', 'EXAM_MODULE', 'SYLLABUS_MODULE', 'ANNOUNCEMENTS', 'MESSAGING', 'REPORT_CARDS', 'HALL_TICKETS', 'PAYROLL_MODULE'],
  },
  {
    key: 'PREMIUM',
    label: 'Premium',
    price: 14999,
    duration: '/month',
    maxStudents: 2000,
    maxStaff: 150,
    color: 'border-amber-300 dark:border-amber-700',
    badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
    modules: ['STUDENT_PORTAL', 'TEACHER_PORTAL', 'PARENT_PORTAL', 'ACCOUNTANT_PORTAL', 'LIBRARIAN_PORTAL', 'TRANSPORT_MODULE', 'HOSTEL_MODULE', 'EXAM_MODULE', 'SYLLABUS_MODULE', 'PAYROLL_MODULE', 'ONLINE_FEE_PAYMENT', 'MESSAGING', 'ANNOUNCEMENTS', 'REPORT_CARDS', 'HALL_TICKETS'],
  },
  {
    key: 'ENTERPRISE',
    label: 'Enterprise',
    price: 39999,
    duration: '/month',
    maxStudents: 99999,
    maxStaff: 99999,
    color: 'border-rose-300 dark:border-rose-700',
    badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400',
    modules: ['ALL MODULES'],
  },
];

const MODULE_ICONS: Record<string, React.ElementType> = {
  STUDENT_PORTAL: Users, TEACHER_PORTAL: BookOpen, PARENT_PORTAL: Users,
  ACCOUNTANT_PORTAL: DollarSign, LIBRARIAN_PORTAL: BookOpen,
  TRANSPORT_MODULE: Bus, HOSTEL_MODULE: Home,
  EXAM_MODULE: FileText, SYLLABUS_MODULE: BookOpen,
  PAYROLL_MODULE: CreditCard, ONLINE_FEE_PAYMENT: CreditCard,
  MESSAGING: MessageSquare, ANNOUNCEMENTS: Bell,
  REPORT_CARDS: Award, HALL_TICKETS: FileText,
};

const SUBSCRIPTIONS = [
  { school: 'Riverside High School', code: 'RHS', plan: 'PREMIUM',    status: 'ACTIVE',    amount: 14999, dueDate: '2026-05-01', autoRenew: true  },
  { school: 'Greenwood Academy',     code: 'GWA', plan: 'STANDARD',   status: 'ACTIVE',    amount: 7999,  dueDate: '2026-05-15', autoRenew: true  },
  { school: "St. Xavier's",          code: 'SXI', plan: 'PREMIUM',    status: 'ACTIVE',    amount: 14999, dueDate: '2026-06-10', autoRenew: false },
  { school: 'Bright Future School',  code: 'BFS', plan: 'STARTER',    status: 'SUSPENDED', amount: 2999,  dueDate: '2026-03-20', autoRenew: false },
  { school: 'Delhi Public School',   code: 'DPS', plan: 'ENTERPRISE', status: 'ACTIVE',    amount: 39999, dueDate: '2026-08-28', autoRenew: true  },
];

const PLAN_CFG: Record<string, string> = {
  TRIAL: 'bg-gray-100 text-gray-600', STARTER: 'bg-blue-50 text-blue-700',
  STANDARD: 'bg-purple-50 text-purple-700', PREMIUM: 'bg-amber-50 text-amber-700',
  ENTERPRISE: 'bg-rose-50 text-rose-700',
};

export default function SuperAdminSubscriptionsPage() {
  const [autoRenew, setAutoRenew] = useState<Record<string, boolean>>(
    Object.fromEntries(SUBSCRIPTIONS.map((s) => [s.code, s.autoRenew]))
  );

  const mrr = SUBSCRIPTIONS.filter((s) => s.status === 'ACTIVE').reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscription Plans"
        description="Manage pricing plans and per-school billing."
        breadcrumbs={[{ label: 'Platform Admin', href: '/super-admin' }, { label: 'Subscriptions' }]}
      />

      {/* MRR banner */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-100">Monthly Recurring Revenue</p>
          <p className="text-3xl font-bold mt-1">₹{mrr.toLocaleString()}</p>
          <p className="text-sm text-blue-200 mt-0.5 flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" />+12% vs last month</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-100">Active Schools</p>
          <p className="text-3xl font-bold">{SUBSCRIPTIONS.filter((s) => s.status === 'ACTIVE').length}</p>
          <p className="text-sm text-blue-200">of {SUBSCRIPTIONS.length} total</p>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {PLANS.map((plan) => (
          <Card key={plan.key} className={`border-2 shadow-sm ${plan.color}`}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={`border-0 text-xs ${plan.badge}`}>{plan.label}</Badge>
                {plan.price === 0 ? <span className="text-xs text-muted-foreground">Free</span> : null}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.price === 0 ? 'Free' : `₹${plan.price.toLocaleString()}`}
                </p>
                <p className="text-xs text-muted-foreground">{plan.duration}</p>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>👥 Up to {plan.maxStudents === 99999 ? 'Unlimited' : plan.maxStudents.toLocaleString()} students</p>
                <p>🏫 Up to {plan.maxStaff === 99999 ? 'Unlimited' : plan.maxStaff} staff</p>
                <p>🧩 {plan.modules.length} modules</p>
              </div>
              <Button size="sm" variant="outline" className="w-full text-xs h-7" onClick={() => toast.info(`Edit ${plan.label} plan`)}>
                Edit Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active subscriptions table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Active Subscriptions</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['School', 'Plan', 'Amount/mo', 'Next Due', 'Auto-Renew', 'Status', ''].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {SUBSCRIPTIONS.map((s) => (
                  <tr key={s.code} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-900 dark:text-white">{s.school}</p>
                      <p className="text-xs text-muted-foreground font-mono">{s.code}</p>
                    </td>
                    <td className="px-5 py-3"><Badge className={`border-0 text-[11px] ${PLAN_CFG[s.plan]}`}>{s.plan}</Badge></td>
                    <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white">₹{s.amount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(s.dueDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                    <td className="px-5 py-3">
                      <Switch
                        checked={autoRenew[s.code]}
                        onCheckedChange={(v) => { setAutoRenew((p) => ({ ...p, [s.code]: v })); toast.success(`Auto-renew ${v ? 'enabled' : 'disabled'} for ${s.school}`); }}
                      />
                    </td>
                    <td className="px-5 py-3">
                      <Badge className={`border-0 text-[11px] ${s.status === 'ACTIVE' ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400'}`}>{s.status}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        {s.status === 'SUSPENDED' && <Button size="sm" className="h-7 text-xs" onClick={() => toast.success(`${s.school} reactivated`)}>Reactivate</Button>}
                        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toast.info(`Change plan for ${s.school}`)}>Change Plan</Button>
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
