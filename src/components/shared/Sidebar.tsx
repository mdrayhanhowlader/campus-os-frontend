'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  GraduationCap, LayoutDashboard, Users, UserCheck, BookOpen,
  ClipboardList, Calendar, FileText, DollarSign, Library, Bus,
  Home, MessageSquare, Bell, BarChart3, Settings, ChevronDown,
  ChevronRight, LogOut, Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { useSidebarStore } from '@/store/sidebar.store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getInitials } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  badge?: number;
  children?: NavItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  {
    label: 'Students', icon: Users,
    children: [
      { label: 'All Students',  href: '/admin/students',             icon: Users },
      { label: 'Enrollment',    href: '/admin/students/enroll',      icon: UserCheck },
      { label: 'Promotions',    href: '/admin/students/promotions',  icon: ChevronRight },
      { label: 'Alumni',        href: '/admin/students/alumni',      icon: GraduationCap },
    ],
  },
  {
    label: 'Staff & HR', icon: UserCheck,
    children: [
      { label: 'All Staff',      href: '/admin/staff',            icon: UserCheck },
      { label: 'Attendance',     href: '/admin/staff/attendance', icon: ClipboardList },
      { label: 'Leave Requests', href: '/admin/staff/leave',      icon: Calendar },
      { label: 'Payroll',        href: '/admin/staff/payroll',    icon: DollarSign },
    ],
  },
  {
    label: 'Academics', icon: BookOpen,
    children: [
      { label: 'Classes',       href: '/admin/classes',     icon: BookOpen },
      { label: 'Subjects',      href: '/admin/subjects',    icon: FileText },
      { label: 'Timetable',     href: '/admin/timetable',   icon: Calendar },
      { label: 'Lesson Plans',  href: '/admin/lessons',     icon: ClipboardList },
      { label: 'Assignments',   href: '/admin/assignments', icon: FileText },
    ],
  },
  { label: 'Attendance', href: '/admin/attendance', icon: ClipboardList },
  {
    label: 'Examinations', icon: FileText,
    children: [
      { label: 'Exam Schedule', href: '/admin/exams',               icon: Calendar },
      { label: 'Mark Entry',    href: '/admin/exams/marks',         icon: FileText },
      { label: 'Report Cards',  href: '/admin/exams/report-cards',  icon: FileText },
      { label: 'Hall Tickets',  href: '/admin/exams/hall-tickets',  icon: FileText },
    ],
  },
  {
    label: 'Finance', icon: DollarSign,
    children: [
      { label: 'Fee Structure', href: '/admin/fees/structure', icon: DollarSign },
      { label: 'Invoices',      href: '/admin/fees/invoices',  icon: FileText },
      { label: 'Payments',      href: '/admin/fees/payments',  icon: DollarSign },
      { label: 'Expenses',      href: '/admin/fees/expenses',  icon: BarChart3 },
      { label: 'Reports',       href: '/admin/fees/reports',   icon: BarChart3 },
    ],
  },
  { label: 'Library',   href: '/admin/library',   icon: Library },
  { label: 'Transport', href: '/admin/transport', icon: Bus },
  { label: 'Hostel',    href: '/admin/hostel',    icon: Home },
  {
    label: 'Communication', icon: MessageSquare,
    children: [
      { label: 'Messages',      href: '/admin/messages',      icon: MessageSquare },
      { label: 'Announcements', href: '/admin/announcements', icon: Bell },
      { label: 'Events',        href: '/admin/events',        icon: Calendar },
    ],
  },
  { label: 'Reports',  href: '/admin/reports',  icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

function NavItemComponent({
  item, depth = 0, onNavigate,
}: {
  item: NavItem; depth?: number; onNavigate: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() =>
    item.children?.some((c) => c.href && pathname.startsWith(c.href)) ?? false
  );

  const isActive = item.href
    ? pathname === item.href || (item.href !== '/admin' && pathname.startsWith(`${item.href}/`))
    : false;
  const Icon = item.icon;

  if (item.children?.length) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
            depth > 0 && 'pl-9'
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </button>
        {open && (
          <div className="mt-1 space-y-0.5">
            {item.children.map((child) => (
              <NavItemComponent key={child.label} item={child} depth={depth + 1} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      onClick={onNavigate}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        depth > 0 ? 'pl-9' : '',
        isActive
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
      )}
    >
      <Icon className={cn('h-4 w-4 shrink-0', isActive && 'text-blue-600 dark:text-blue-400')} />
      <span>{item.label}</span>
      {item.badge != null && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-medium text-white">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

function SidebarContent({
  collapsed, onToggleCollapse, onNavigate,
}: {
  collapsed: boolean; onToggleCollapse: () => void; onNavigate: () => void;
}) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    toast.success('Logged out successfully');
    router.push('/login');
  }

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b px-4 dark:border-gray-800 shrink-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">CampusOS</p>
            <p className="text-[10px] text-muted-foreground truncate">{user?.schoolName ?? 'School Portal'}</p>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="ml-auto hidden lg:flex rounded-md p-1 text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavItemComponent key={item.label} item={item} onNavigate={onNavigate} />
          ))}
        </nav>
      </ScrollArea>

      {/* User footer */}
      <div className="shrink-0 border-t dark:border-gray-800">
        {/* User info */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={user?.avatar ?? undefined} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs dark:bg-blue-900 dark:text-blue-300">
              {user ? getInitials(user.firstName, user.lastName) : 'U'}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="truncate text-xs text-muted-foreground capitalize">
                {user?.role?.replace('_', ' ').toLowerCase() ?? 'User'}
              </p>
            </div>
          )}
        </div>
        {/* Logout button */}
        <div className="px-3 pb-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { mobileOpen, closeMobile } = useSidebarStore();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r bg-white dark:bg-gray-900 dark:border-gray-800 transition-all duration-200 shrink-0',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          onNavigate={() => {}}
        />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobile} />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 shadow-2xl">
            {/* Close button */}
            <button
              onClick={closeMobile}
              className="absolute right-4 top-4 z-10 rounded-md p-1 text-muted-foreground hover:text-foreground text-xl leading-none"
            >
              ✕
            </button>
            <SidebarContent
              collapsed={false}
              onToggleCollapse={() => {}}
              onNavigate={closeMobile}
            />
          </aside>
        </div>
      )}
    </>
  );
}
