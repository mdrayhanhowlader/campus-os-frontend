'use client';

import { Bell, Search, Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth.store';
import { useSidebarStore } from '@/store/sidebar.store';
import { formatDateTime } from '@/lib/utils';

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();
  const { toggleMobile } = useSidebarStore();

  const mockNotifications = [
    { id: '1', title: 'New student enrolled', time: new Date(), read: false },
    { id: '2', title: 'Fee payment received — $450', time: new Date(), read: false },
    { id: '3', title: 'Parent meeting scheduled', time: new Date(), read: true },
  ];
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="flex h-16 items-center gap-3 border-b bg-white px-4 dark:bg-gray-900 dark:border-gray-800 shrink-0">
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-muted-foreground"
        onClick={toggleMobile}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search */}
      <div className="relative hidden flex-1 max-w-md md:flex">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search students, staff, invoices..."
          className="pl-9 bg-gray-50 border-0 dark:bg-gray-800"
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-muted-foreground"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-500" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              {unreadCount > 0 && <Badge variant="secondary">{unreadCount} new</Badge>}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockNotifications.map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 py-3">
                <div className="flex w-full items-center gap-2">
                  {!n.read && <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                  <span className={`text-sm ${!n.read ? 'font-medium' : 'text-muted-foreground'}`}>
                    {n.title}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground pl-4">{formatDateTime(n.time)}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-blue-600 font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User info — hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-2 pl-1">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role?.replace('_', ' ').toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
