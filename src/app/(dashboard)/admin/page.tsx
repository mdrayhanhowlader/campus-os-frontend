import { Suspense } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import type { StatCardProps } from '@/components/dashboard/StatCard';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { TopStudents } from '@/components/dashboard/TopStudents';
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  UserCheck,
  GraduationCap,
  DollarSign,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

// In production these would be Server Components fetching real data
const MOCK_STATS: StatCardProps[] = [
  { label: 'Total Students',     value: '1,284',  change: '+48 this month',          trend: 'up'      as const, icon: Users,        color: 'blue'   as const, href: '/admin/students' },
  { label: 'Active Staff',       value: '97',     change: '3 on leave today',        trend: 'neutral' as const, icon: UserCheck,    color: 'purple' as const, href: '/admin/staff' },
  { label: 'Avg. Attendance',    value: '92.4%',  change: '+1.2% vs last month',     trend: 'up'      as const, icon: CheckCircle2, color: 'green'  as const, href: '/admin/attendance' },
  { label: 'Revenue This Month', value: '₹84,320',change: '₹12,400 outstanding',     trend: 'up'      as const, icon: DollarSign,   color: 'amber'  as const, href: '/admin/fees' },
  { label: 'Active Classes',     value: '42',     change: 'Across 3 buildings',      trend: 'neutral' as const, icon: BookOpen,     color: 'indigo' as const, href: '/admin/classes' },
  { label: 'Upcoming Exams',     value: '8',      change: 'Next: Math — Apr 25',     trend: 'neutral' as const, icon: GraduationCap,color: 'rose'   as const, href: '/admin/exams' },
  { label: 'Pending Fees',       value: '127',    change: '23 overdue invoices',     trend: 'down'    as const, icon: AlertTriangle,color: 'orange' as const, href: '/admin/fees/invoices' },
  { label: 'Pass Rate',          value: '87.6%',  change: '+2.1% vs last term',      trend: 'up'      as const, icon: TrendingUp,   color: 'teal'   as const, href: '/admin/exams/report-cards' },
];

function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-xl" />
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={`Good ${getGreeting()}, here's what's happening at your school today.`}
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      {/* Stats Grid */}
      <Suspense fallback={<StatsSkeleton />}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </Suspense>

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<Skeleton className="h-80 rounded-xl" />}>
          <AttendanceChart />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-80 rounded-xl" />}>
          <RevenueChart />
        </Suspense>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-96 rounded-xl" />}>
            <RecentActivity />
          </Suspense>
        </div>
        <div className="space-y-6">
          <Suspense fallback={<Skeleton className="h-44 rounded-xl" />}>
            <UpcomingEvents />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-44 rounded-xl" />}>
            <TopStudents />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}
