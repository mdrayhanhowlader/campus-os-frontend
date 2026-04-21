'use client';

import { useState } from 'react';
import {
  UserPlus, DollarSign, ClipboardList, FileText, AlertCircle,
  GraduationCap, BookOpen, CheckCircle2, Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { timeAgo, getInitials } from '@/lib/utils';
import { cn } from '@/lib/utils';

type ActivityType = 'enrollment' | 'payment' | 'attendance' | 'grade' | 'alert' | 'exam' | 'assignment';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  subtitle: string;
  actor: string;
  time: Date;
  status?: 'success' | 'warning' | 'error' | 'info';
}

const ACTIVITY_CONFIG: Record<ActivityType, { icon: React.ElementType; color: string; bg: string }> = {
  enrollment:  { icon: UserPlus,       color: 'text-blue-600',   bg: 'bg-blue-50 dark:bg-blue-950' },
  payment:     { icon: DollarSign,     color: 'text-green-600',  bg: 'bg-green-50 dark:bg-green-950' },
  attendance:  { icon: ClipboardList,  color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950' },
  grade:       { icon: GraduationCap,  color: 'text-amber-600',  bg: 'bg-amber-50 dark:bg-amber-950' },
  alert:       { icon: AlertCircle,    color: 'text-red-600',    bg: 'bg-red-50 dark:bg-red-950' },
  exam:        { icon: FileText,       color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950' },
  assignment:  { icon: BookOpen,       color: 'text-teal-600',   bg: 'bg-teal-50 dark:bg-teal-950' },
};

const MOCK_ACTIVITIES: Activity[] = [
  { id: '1', type: 'enrollment',  title: 'New student enrolled', subtitle: 'Emma Rodriguez — Grade 10A', actor: 'EV', time: new Date(Date.now() - 8 * 60000), status: 'success' },
  { id: '2', type: 'payment',     title: 'Fee payment received', subtitle: '$1,200 — Tuition Q2 · Invoice #INV-202403-0148', actor: 'JS', time: new Date(Date.now() - 22 * 60000), status: 'success' },
  { id: '3', type: 'attendance',  title: 'Attendance marked — Grade 11B', subtitle: '28 present · 2 absent · 1 late', actor: 'MK', time: new Date(Date.now() - 45 * 60000), status: 'info' },
  { id: '4', type: 'alert',       title: 'Low attendance alert', subtitle: 'Alex Chen — 68% (below 75% threshold)', actor: 'SYS', time: new Date(Date.now() - 1.2 * 3600000), status: 'warning' },
  { id: '5', type: 'grade',       title: 'Exam results published', subtitle: 'Mathematics Midterm · Grade 9 · 42 students', actor: 'RT', time: new Date(Date.now() - 2 * 3600000), status: 'success' },
  { id: '6', type: 'exam',        title: 'Exam scheduled', subtitle: 'Physics Final · Apr 22 · Hall A & B', actor: 'DL', time: new Date(Date.now() - 3.5 * 3600000), status: 'info' },
  { id: '7', type: 'assignment',  title: 'Assignment deadline passed', subtitle: 'History Essay · Grade 12 · 6 submissions pending', actor: 'SYS', time: new Date(Date.now() - 5 * 3600000), status: 'warning' },
  { id: '8', type: 'payment',     title: 'Overdue fee reminder sent', subtitle: '23 students · SMS + Email notifications dispatched', actor: 'SYS', time: new Date(Date.now() - 7 * 3600000), status: 'warning' },
];

const STATUS_BADGE: Record<string, string> = {
  success: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  error:   'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
  info:    'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
};

function ActivityItem({ activity }: { activity: Activity }) {
  const cfg = ACTIVITY_CONFIG[activity.type];
  const Icon = cfg.icon;

  return (
    <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', cfg.bg)}>
        <Icon className={cn('h-4 w-4', cfg.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">{activity.title}</p>
          {activity.status && (
            <Badge className={cn('shrink-0 text-[10px] px-1.5 py-0 font-medium border-0', STATUS_BADGE[activity.status])}>
              {activity.status}
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground truncate">{activity.subtitle}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <Avatar className="h-4 w-4">
            <AvatarFallback className="text-[8px] bg-gray-200">{activity.actor}</AvatarFallback>
          </Avatar>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-2.5 w-2.5" />
            {timeAgo(activity.time)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function RecentActivity() {
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <CardDescription>Live feed of school-wide events</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700">
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="all">
          <TabsList className="mb-3 h-8">
            {['all', 'finance', 'academic', 'alerts'].map((tab) => (
              <TabsTrigger key={tab} value={tab} className="text-xs capitalize px-3 h-7">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-0 space-y-1">
            {MOCK_ACTIVITIES.slice(0, visibleCount).map((a) => (
              <ActivityItem key={a.id} activity={a} />
            ))}
            {visibleCount < MOCK_ACTIVITIES.length && (
              <div className="pt-2 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground w-full"
                  onClick={() => setVisibleCount((c) => c + 5)}
                >
                  Load {Math.min(5, MOCK_ACTIVITIES.length - visibleCount)} more
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="finance" className="mt-0 space-y-1">
            {MOCK_ACTIVITIES.filter((a) => a.type === 'payment').map((a) => (
              <ActivityItem key={a.id} activity={a} />
            ))}
          </TabsContent>

          <TabsContent value="academic" className="mt-0 space-y-1">
            {MOCK_ACTIVITIES.filter((a) =>
              ['grade', 'exam', 'assignment', 'attendance'].includes(a.type)
            ).map((a) => (
              <ActivityItem key={a.id} activity={a} />
            ))}
          </TabsContent>

          <TabsContent value="alerts" className="mt-0 space-y-1">
            {MOCK_ACTIVITIES.filter((a) => a.status === 'warning' || a.status === 'error').map(
              (a) => <ActivityItem key={a.id} activity={a} />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
