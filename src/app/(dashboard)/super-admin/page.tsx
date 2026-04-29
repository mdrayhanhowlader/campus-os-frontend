import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, TrendingUp, AlertCircle, DollarSign, Activity } from 'lucide-react';

const STATS = [
  { label: 'Total Schools',    value: '48',        change: '+3 this month',       trend: 'up'   as const, icon: Building2,  color: 'blue'  as const },
  { label: 'Active Users',     value: '24,812',    change: 'Students + Staff',    trend: 'up'   as const, icon: Users,      color: 'green' as const },
  { label: 'Monthly Revenue',  value: '₹3,84,000', change: '+12% vs last month',  trend: 'up'   as const, icon: DollarSign, color: 'amber' as const },
  { label: 'Suspended',        value: '2',         change: 'Payment overdue',     trend: 'down' as const, icon: AlertCircle,color: 'rose'  as const },
];

const RECENT_SCHOOLS = [
  { name: 'Riverside High School',   code: 'RHS', plan: 'PREMIUM',  students: 1240, status: 'ACTIVE',    joined: '2024-08-01' },
  { name: 'Greenwood Academy',       code: 'GWA', plan: 'STANDARD', students: 680,  status: 'ACTIVE',    joined: '2025-01-15' },
  { name: 'St. Xavier\'s Institute', code: 'SXI', plan: 'PREMIUM',  students: 1850, status: 'ACTIVE',    joined: '2024-06-10' },
  { name: 'Bright Future School',    code: 'BFS', plan: 'STARTER',  students: 320,  status: 'SUSPENDED', joined: '2025-03-20' },
  { name: 'Delhi Public School',     code: 'DPS', plan: 'ENTERPRISE',students: 3200,status: 'ACTIVE',    joined: '2024-02-28' },
];

const PLAN_REVENUE: Record<string, number> = { TRIAL: 0, STARTER: 2999, STANDARD: 7999, PREMIUM: 14999, ENTERPRISE: 39999 };

const PLAN_CFG: Record<string, string> = {
  TRIAL:      'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  STARTER:    'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  STANDARD:   'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  PREMIUM:    'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  ENTERPRISE: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400',
};

const STATUS_CFG: Record<string, string> = {
  ACTIVE:    'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  SUSPENDED: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
  EXPIRED:   'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const PLAN_DIST = [
  { plan: 'ENTERPRISE', count: 4,  color: 'bg-rose-500' },
  { plan: 'PREMIUM',    count: 18, color: 'bg-amber-500' },
  { plan: 'STANDARD',  count: 16, color: 'bg-purple-500' },
  { plan: 'STARTER',   count: 8,  color: 'bg-blue-500' },
  { plan: 'TRIAL',     count: 2,  color: 'bg-gray-400' },
];
const totalSchools = PLAN_DIST.reduce((s, p) => s + p.count, 0);

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Overview"
        description="CampusOS SaaS — all schools, revenue, and system health."
        breadcrumbs={[{ label: 'Platform Admin' }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* MRR by plan */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base">MRR by Plan</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {PLAN_DIST.map((p) => {
              const mrr = PLAN_REVENUE[p.plan] * p.count;
              const pct = Math.round((p.count / totalSchools) * 100);
              return (
                <div key={p.plan}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">{p.plan}</span>
                    <span className="text-muted-foreground">{p.count} schools · ₹{mrr.toLocaleString()}/mo</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className={`h-2 rounded-full ${p.color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            <div className="pt-2 border-t dark:border-gray-800 flex justify-between text-sm">
              <span className="text-muted-foreground">Total MRR</span>
              <span className="font-bold text-gray-900 dark:text-white">
                ₹{PLAN_DIST.reduce((s, p) => s + PLAN_REVENUE[p.plan] * p.count, 0).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* System health */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base">System Health</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'API Response (avg)', value: '142ms', ok: true },
              { label: 'DB Query (avg)',      value: '38ms',  ok: true },
              { label: 'Uptime (30d)',        value: '99.97%',ok: true },
              { label: 'Error Rate',          value: '0.02%', ok: true },
              { label: 'Active Sessions',     value: '1,842', ok: true },
              { label: 'Queue Backlog',       value: '0',     ok: true },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                <div className="flex items-center gap-1.5">
                  <Activity className={`h-3 w-3 ${row.ok ? 'text-green-500' : 'text-red-500'}`} />
                  <span className="font-medium text-gray-900 dark:text-white">{row.value}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent signups */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base">Recent Signups</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {RECENT_SCHOOLS.slice(0, 4).map((s) => (
              <div key={s.code} className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.code} · {s.students.toLocaleString()} students</p>
                </div>
                <Badge className={`border-0 text-[11px] ml-2 shrink-0 ${PLAN_CFG[s.plan]}`}>{s.plan}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* All schools table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">All Schools</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['School', 'Code', 'Plan', 'Students', 'Status', 'Joined'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {RECENT_SCHOOLS.map((s) => (
                  <tr key={s.code} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{s.name}</td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{s.code}</td>
                    <td className="px-5 py-3"><Badge className={`border-0 text-[11px] ${PLAN_CFG[s.plan]}`}>{s.plan}</Badge></td>
                    <td className="px-5 py-3 text-muted-foreground">{s.students.toLocaleString()}</td>
                    <td className="px-5 py-3"><Badge className={`border-0 text-[11px] ${STATUS_CFG[s.status]}`}>{s.status}</Badge></td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(s.joined).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
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
