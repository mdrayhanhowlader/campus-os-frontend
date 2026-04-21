'use client';

import Link from 'next/link';
import {
  UserPlus, ClipboardList, DollarSign, FileText,
  MessageSquare, BookOpen, Calendar, Download,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const ACTIONS = [
  { label: 'Enroll Student',   href: '/admin/students/enroll',    icon: UserPlus,       color: 'text-blue-600 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900' },
  { label: 'Mark Attendance',  href: '/admin/attendance/mark',    icon: ClipboardList,  color: 'text-purple-600 bg-purple-50 dark:bg-purple-950 hover:bg-purple-100 dark:hover:bg-purple-900' },
  { label: 'Collect Fee',      href: '/admin/fees/collect',       icon: DollarSign,     color: 'text-green-600 bg-green-50 dark:bg-green-950 hover:bg-green-100 dark:hover:bg-green-900' },
  { label: 'Enter Grades',     href: '/admin/exams/marks',        icon: FileText,       color: 'text-amber-600 bg-amber-50 dark:bg-amber-950 hover:bg-amber-100 dark:hover:bg-amber-900' },
  { label: 'Send Message',     href: '/admin/messages/compose',   icon: MessageSquare,  color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900' },
  { label: 'Issue Book',       href: '/admin/library/issue',      icon: BookOpen,       color: 'text-teal-600 bg-teal-50 dark:bg-teal-950 hover:bg-teal-100 dark:hover:bg-teal-900' },
  { label: 'Add Event',        href: '/admin/events/new',         icon: Calendar,       color: 'text-rose-600 bg-rose-50 dark:bg-rose-950 hover:bg-rose-100 dark:hover:bg-rose-900' },
  { label: 'Export Report',    href: '/admin/reports',            icon: Download,       color: 'text-gray-600 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700' },
];

export function QuickActions() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {ACTIONS.map(({ label, href, icon: Icon, color }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex flex-col items-center gap-2.5 rounded-xl p-3 text-center transition-all',
                color
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/70 dark:bg-black/20 shadow-sm">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-medium leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
