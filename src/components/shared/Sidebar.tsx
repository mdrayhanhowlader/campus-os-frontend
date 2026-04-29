'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  GraduationCap, LayoutDashboard, Users, UserCheck, BookOpen,
  ClipboardList, Calendar, FileText, DollarSign, Library, Bus,
  Home, MessageSquare, Bell, BarChart3, Settings,
  LogOut, BookMarked, Award, CreditCard, Building2, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { useSidebarStore } from '@/store/sidebar.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getInitials } from '@/lib/utils';
import { toast } from 'sonner';
import { useFeatures } from '@/contexts/FeaturesContext';
import type { ModuleKey } from '@/lib/features';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  badge?: number;
  module?: ModuleKey;
  children?: NavItem[];
}

// ─── Nav configs (unchanged data) ──────────────────────────────────────────────

const ADMIN_NAV: NavItem[] = [
  { label: 'Dashboard',  href: '/admin', icon: LayoutDashboard },
  { label: 'Students',   icon: Users, children: [
    { label: 'All Students',  href: '/admin/students',            icon: Users },
    { label: 'Enrollment',    href: '/admin/students/enroll',     icon: UserCheck },
    { label: 'Promotions',    href: '/admin/students/promotions', icon: Award },
    { label: 'Alumni',        href: '/admin/students/alumni',     icon: GraduationCap },
  ]},
  { label: 'Staff & HR', icon: UserCheck, children: [
    { label: 'All Staff',      href: '/admin/staff',            icon: UserCheck },
    { label: 'Attendance',     href: '/admin/staff/attendance', icon: ClipboardList },
    { label: 'Leave Requests', href: '/admin/staff/leave',      icon: Calendar },
    { label: 'Payroll',        href: '/admin/staff/payroll',    icon: DollarSign },
  ]},
  { label: 'Academics',  icon: BookOpen, children: [
    { label: 'Classes',      href: '/admin/classes',     icon: BookOpen },
    { label: 'Subjects',     href: '/admin/subjects',    icon: FileText },
    { label: 'Timetable',    href: '/admin/timetable',   icon: Calendar },
    { label: 'Lesson Plans', href: '/admin/lessons',     icon: ClipboardList },
    { label: 'Assignments',  href: '/admin/assignments', icon: FileText },
  ]},
  { label: 'Attendance',    href: '/admin/attendance', icon: ClipboardList },
  { label: 'Examinations',  icon: FileText, children: [
    { label: 'Exam Schedule', href: '/admin/exams',              icon: Calendar },
    { label: 'Mark Entry',    href: '/admin/exams/marks',        icon: FileText },
    { label: 'Report Cards',  href: '/admin/exams/report-cards', icon: Award },
    { label: 'Hall Tickets',  href: '/admin/exams/hall-tickets', icon: FileText },
  ]},
  { label: 'Finance', icon: DollarSign, children: [
    { label: 'Fee Structure', href: '/admin/fees/structure', icon: DollarSign },
    { label: 'Invoices',      href: '/admin/fees/invoices',  icon: FileText },
    { label: 'Payments',      href: '/admin/fees/payments',  icon: CreditCard },
    { label: 'Expenses',      href: '/admin/fees/expenses',  icon: BarChart3 },
    { label: 'Reports',       href: '/admin/fees/reports',   icon: BarChart3 },
  ]},
  { label: 'Library',       href: '/admin/library',    icon: Library },
  { label: 'Transport',     href: '/admin/transport',  icon: Bus },
  { label: 'Hostel',        href: '/admin/hostel',     icon: Home },
  { label: 'Communication', icon: MessageSquare, children: [
    { label: 'Messages',      href: '/admin/messages',      icon: MessageSquare },
    { label: 'Announcements', href: '/admin/announcements', icon: Bell },
    { label: 'Events',        href: '/admin/events',        icon: Calendar },
  ]},
  { label: 'Reports',  href: '/admin/reports',  icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const TEACHER_NAV: NavItem[] = [
  { label: 'Dashboard',   href: '/teacher',             icon: LayoutDashboard },
  { label: 'My Classes',  href: '/teacher/classes',     icon: BookOpen },
  { label: 'Attendance',  href: '/teacher/attendance',  icon: ClipboardList },
  { label: 'Assignments', href: '/teacher/assignments', icon: FileText },
  { label: 'Mark Entry',  href: '/teacher/marks',       icon: Award },
  { label: 'Timetable',   href: '/teacher/timetable',   icon: Calendar },
  { label: 'Leave',       href: '/teacher/leave',       icon: Calendar },
  { label: 'Messages',    href: '/teacher/messages',    icon: MessageSquare },
];

const STUDENT_NAV: NavItem[] = [
  { label: 'Dashboard',   href: '/student',             icon: LayoutDashboard },
  { label: 'Attendance',  href: '/student/attendance',  icon: ClipboardList },
  { label: 'Timetable',   href: '/student/timetable',   icon: Calendar },
  { label: 'Assignments', href: '/student/assignments', icon: FileText },
  { label: 'Exams',       href: '/student/exams',       icon: Award },
  { label: 'Fees',        href: '/student/fees',        icon: CreditCard },
  { label: 'Library',     href: '/student/library',     icon: Library },
  { label: 'Messages',    href: '/student/messages',    icon: MessageSquare },
];

const PARENT_NAV: NavItem[] = [
  { label: 'Dashboard',  href: '/parent',            icon: LayoutDashboard },
  { label: 'Attendance', href: '/parent/attendance', icon: ClipboardList },
  { label: 'Fees',       href: '/parent/fees',       icon: CreditCard },
  { label: 'Results',    href: '/parent/results',    icon: Award },
  { label: 'Timetable',  href: '/parent/timetable',  icon: Calendar },
  { label: 'Messages',   href: '/parent/messages',   icon: MessageSquare },
];

const ACCOUNTANT_NAV: NavItem[] = [
  { label: 'Dashboard',   href: '/accountant',          icon: LayoutDashboard },
  { label: 'Collect Fee', href: '/accountant/collect',  icon: CreditCard },
  { label: 'Invoices',    href: '/accountant/invoices', icon: FileText },
  { label: 'Payments',    href: '/accountant/payments', icon: DollarSign },
  { label: 'Expenses',    href: '/accountant/expenses', icon: BarChart3 },
  { label: 'Reports',     href: '/accountant/reports',  icon: BarChart3 },
];

const LIBRARIAN_NAV: NavItem[] = [
  { label: 'Dashboard',     href: '/librarian',         icon: LayoutDashboard },
  { label: 'Books',         href: '/librarian/books',   icon: BookMarked },
  { label: 'Issue / Return',href: '/librarian/issue',   icon: BookOpen },
  { label: 'Members',       href: '/librarian/members', icon: Users },
  { label: 'Reports',       href: '/librarian/reports', icon: BarChart3 },
];

const SUPER_ADMIN_NAV: NavItem[] = [
  { label: 'Overview',       href: '/super-admin',               icon: LayoutDashboard },
  { label: 'Schools',        href: '/super-admin/schools',       icon: Building2 },
  { label: 'Subscriptions',  href: '/super-admin/subscriptions', icon: CreditCard },
];

function getNavForRole(role: string | undefined): NavItem[] {
  if (role === 'SUPER_ADMIN') return SUPER_ADMIN_NAV;
  if (['SCHOOL_ADMIN','PRINCIPAL','TRANSPORT_MANAGER','HOSTEL_WARDEN','STAFF'].includes(role ?? '')) return ADMIN_NAV;
  if (role === 'TEACHER')    return TEACHER_NAV;
  if (role === 'STUDENT')    return STUDENT_NAV;
  if (role === 'PARENT')     return PARENT_NAV;
  if (role === 'ACCOUNTANT') return ACCOUNTANT_NAV;
  if (role === 'LIBRARIAN')  return LIBRARIAN_NAV;
  return ADMIN_NAV;
}

function filterByFeatures(items: NavItem[], isEnabled: (m: ModuleKey) => boolean): NavItem[] {
  return items
    .filter((item) => !item.module || isEnabled(item.module))
    .map((item) => ({ ...item, children: item.children ? filterByFeatures(item.children, isEnabled) : undefined }));
}

function isItemActive(item: NavItem, pathname: string, rootHref: string): boolean {
  if (item.href) return pathname === item.href || (item.href !== rootHref && pathname.startsWith(item.href + '/'));
  return item.children?.some((c) => c.href && (pathname === c.href || pathname.startsWith(c.href + '/'))) ?? false;
}

// ─── Tooltip wrapper ────────────────────────────────────────────────────────────

function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group relative flex">
      {children}
      <div className={cn(
        'pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50',
        'whitespace-nowrap rounded-md bg-gray-900 dark:bg-gray-700 px-2.5 py-1.5',
        'text-xs font-medium text-white shadow-lg',
        'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100',
        'transition-all duration-150 origin-left',
      )}>
        {label}
        {/* arrow */}
        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700" />
      </div>
    </div>
  );
}

// ─── Rail button ────────────────────────────────────────────────────────────────

function RailButton({ item, active, open, rootHref, onClick }: {
  item: NavItem; active: boolean; open: boolean; rootHref: string; onClick: () => void;
}) {
  const Icon = item.icon;
  const highlight = active || open;

  const cls = cn(
    'relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-150',
    highlight
      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
  );

  if (item.href && !item.children?.length) {
    return (
      <Tip label={item.label}>
        <Link href={item.href} className={cls} onClick={onClick}>
          <Icon className="h-[18px] w-[18px]" />
          {item.badge != null && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
              {item.badge}
            </span>
          )}
        </Link>
      </Tip>
    );
  }

  return (
    <Tip label={item.label}>
      <button className={cls} onClick={onClick}>
        <Icon className="h-[18px] w-[18px]" />
        {item.badge != null && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
            {item.badge}
          </span>
        )}
      </button>
    </Tip>
  );
}

// ─── Flyout panel ───────────────────────────────────────────────────────────────

function FlyoutPanel({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const pathname = usePathname();
  const children = item.children ?? [];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex h-14 items-center justify-between px-4 border-b dark:border-gray-800/80 shrink-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Links */}
      <ScrollArea className="flex-1">
        <nav className="px-2 py-3 space-y-0.5">
          {children.map((child) => {
            const Icon = child.icon;
            const active = child.href
              ? pathname === child.href || pathname.startsWith(child.href + '/')
              : false;
            return (
              <Link
                key={child.label}
                href={child.href!}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  active
                    ? 'bg-blue-50 text-blue-700 font-medium dark:bg-blue-950/60 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/70 dark:hover:text-gray-100',
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', active && 'text-blue-600 dark:text-blue-400')} />
                <span>{child.label}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}

// ─── Desktop Icon Rail ──────────────────────────────────────────────────────────

function DesktopRail() {
  const { user, logout } = useAuthStore();
  const { isEnabled } = useFeatures();
  const pathname = usePathname();
  const router = useRouter();
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const railRef   = useRef<HTMLElement>(null);

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const rawNav   = getNavForRole(user?.role);
  const navItems = isSuperAdmin ? rawNav : filterByFeatures(rawNav, isEnabled);
  const rootHref = `/${isSuperAdmin ? 'super-admin' : (user?.role?.toLowerCase() ?? 'admin')}`;

  // Close flyout when clicking outside both the rail and flyout
  useEffect(() => {
    if (!openLabel) return;
    function onDown(e: MouseEvent) {
      const target = e.target as Node;
      if (
        !flyoutRef.current?.contains(target) &&
        !railRef.current?.contains(target)
      ) {
        setOpenLabel(null);
      }
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [openLabel]);

  // Close flyout on route change
  useEffect(() => { setOpenLabel(null); }, [pathname]);

  async function handleLogout() {
    await logout();
    toast.success('Logged out');
    router.push('/login');
  }

  const openItem = navItems.find((n) => n.label === openLabel);

  return (
    <>
      {/* Icon Rail */}
      <aside
        ref={railRef}
        className="hidden lg:flex flex-col w-[60px] shrink-0 border-r bg-white dark:bg-[#111] dark:border-gray-800/80 z-40"
      >
        {/* Logo */}
        <div className="flex h-14 items-center justify-center border-b dark:border-gray-800/80 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-500/40">
            <GraduationCap className="h-[18px] w-[18px] text-white" />
          </div>
        </div>

        {/* Nav icons */}
        <ScrollArea className="flex-1">
          <div className="flex flex-col items-center py-3 gap-1 px-[10px]">
            {navItems.map((item) => {
              const active = isItemActive(item, pathname, rootHref);
              const open   = openLabel === item.label;
              return (
                <RailButton
                  key={item.label}
                  item={item}
                  active={active}
                  open={open}
                  rootHref={rootHref}
                  onClick={() => {
                    if (item.children?.length) {
                      setOpenLabel(open ? null : item.label);
                    } else {
                      setOpenLabel(null);
                    }
                  }}
                />
              );
            })}
          </div>
        </ScrollArea>

        {/* User + Logout */}
        <div className="shrink-0 flex flex-col items-center gap-2 border-t dark:border-gray-800/80 py-3 px-[10px]">
          <Tip label={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'Profile'}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <Avatar className="h-7 w-7">
                <AvatarImage src={user?.avatar ?? undefined} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-[11px] dark:bg-blue-900 dark:text-blue-300">
                  {user ? getInitials(user.firstName, user.lastName) : 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </Tip>
          <Tip label="Logout">
            <button
              onClick={handleLogout}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="h-[17px] w-[17px]" />
            </button>
          </Tip>
        </div>
      </aside>

      {/* Flyout panel */}
      {openItem && openItem.children?.length && (
        <>
          {/* Invisible backdrop — closes flyout on outside click */}
          <div
            className="fixed inset-0 z-30 hidden lg:block"
            style={{ left: 60 }}
            onClick={() => setOpenLabel(null)}
          />
          <div
            ref={flyoutRef}
            className={cn(
              'fixed left-[60px] top-0 bottom-0 z-30 hidden lg:flex flex-col w-56',
              'bg-white dark:bg-[#161616] border-r dark:border-gray-800/80',
              'shadow-xl shadow-black/10 dark:shadow-black/40',
              'animate-in slide-in-from-left-2 duration-150',
            )}
          >
            <FlyoutPanel item={openItem} onClose={() => setOpenLabel(null)} />
          </div>
        </>
      )}
    </>
  );
}

// ─── Mobile drawer (bottom sheet approach) ─────────────────────────────────────

function MobileDrawer() {
  const { user, logout } = useAuthStore();
  const { isEnabled } = useFeatures();
  const { mobileOpen, closeMobile } = useSidebarStore();
  const pathname = usePathname();
  const router = useRouter();

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const rawNav   = getNavForRole(user?.role);
  const navItems = isSuperAdmin ? rawNav : filterByFeatures(rawNav, isEnabled);
  const rootHref = `/${isSuperAdmin ? 'super-admin' : (user?.role?.toLowerCase() ?? 'admin')}`;
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => { closeMobile(); setOpenGroup(null); }, [pathname]);

  async function handleLogout() {
    await logout();
    closeMobile();
    toast.success('Logged out');
    router.push('/login');
  }

  if (!mobileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobile} />
      <aside className="fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-white dark:bg-[#111] shadow-2xl">
        {/* Header */}
        <div className="flex h-14 items-center gap-3 px-4 border-b dark:border-gray-800/80 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600">
            <GraduationCap className="h-[18px] w-[18px] text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 dark:text-white">CampusOS</p>
            <p className="text-[10px] text-muted-foreground truncate">
              {isSuperAdmin ? 'Platform Admin' : (user?.schoolName ?? 'School Portal')}
            </p>
          </div>
          <button onClick={closeMobile} className="rounded-md p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 px-2 py-3">
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item, pathname, rootHref);
              const isOpen = openGroup === item.label;

              if (item.children?.length) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setOpenGroup(isOpen ? null : item.label)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        active
                          ? 'text-blue-700 dark:text-blue-400'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800',
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <span className={cn('text-[10px] text-gray-400 transition-transform duration-150', isOpen && 'rotate-90')}>▶</span>
                    </button>
                    {isOpen && (
                      <div className="ml-3 mt-0.5 mb-1 pl-4 border-l-2 border-gray-100 dark:border-gray-800 space-y-0.5">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;
                          const childActive = child.href
                            ? pathname === child.href || pathname.startsWith(child.href + '/')
                            : false;
                          return (
                            <Link
                              key={child.label}
                              href={child.href!}
                              onClick={closeMobile}
                              className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                                childActive
                                  ? 'bg-blue-50 text-blue-700 font-medium dark:bg-blue-950/60 dark:text-blue-400'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800',
                              )}
                            >
                              <ChildIcon className="h-3.5 w-3.5 shrink-0" />
                              <span>{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={closeMobile}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800',
                  )}
                >
                  <Icon className={cn('h-4 w-4 shrink-0', active && 'text-blue-600 dark:text-blue-400')} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User footer */}
        <div className="shrink-0 border-t dark:border-gray-800/80 px-3 py-3 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={user?.avatar ?? undefined} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs dark:bg-blue-900 dark:text-blue-300">
                {user ? getInitials(user.firstName, user.lastName) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</p>
              <p className="truncate text-xs text-muted-foreground capitalize">{user?.role?.replace(/_/g, ' ').toLowerCase()}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

// ─── Export ─────────────────────────────────────────────────────────────────────

export function Sidebar() {
  return (
    <>
      <DesktopRail />
      <MobileDrawer />
    </>
  );
}
