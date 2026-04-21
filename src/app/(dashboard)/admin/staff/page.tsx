'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, GraduationCap, UserCheck, UserX, Search, Plus, Mail, Phone } from 'lucide-react';
import { getInitials } from '@/lib/utils';

const MOCK_STAFF = [
  { id: '1', name: 'Dr. Sarah Mitchell', role: 'Teacher',   dept: 'Mathematics',    email: 'sarah.m@school.edu', phone: '+1-555-0101', status: 'ACTIVE',   subjects: ['Algebra','Calculus'] },
  { id: '2', name: 'Mr. James Chen',     role: 'Teacher',   dept: 'Science',        email: 'james.c@school.edu', phone: '+1-555-0102', status: 'ACTIVE',   subjects: ['Physics','Chemistry'] },
  { id: '3', name: 'Ms. Linda Park',     role: 'Librarian', dept: 'Library',        email: 'linda.p@school.edu', phone: '+1-555-0103', status: 'ACTIVE',   subjects: [] },
  { id: '4', name: 'Mr. Robert Davis',   role: 'Teacher',   dept: 'English',        email: 'robert.d@school.edu',phone: '+1-555-0104', status: 'ON_LEAVE', subjects: ['Literature','Grammar'] },
  { id: '5', name: 'Ms. Priya Sharma',   role: 'Teacher',   dept: 'History',        email: 'priya.s@school.edu', phone: '+1-555-0105', status: 'ACTIVE',   subjects: ['World History'] },
  { id: '6', name: 'Mr. Kevin Brooks',   role: 'Accountant',dept: 'Finance',        email: 'kevin.b@school.edu', phone: '+1-555-0106', status: 'ACTIVE',   subjects: [] },
  { id: '7', name: 'Ms. Angela White',   role: 'Teacher',   dept: 'Computer Sci.',  email: 'angela.w@school.edu',phone: '+1-555-0107', status: 'ACTIVE',   subjects: ['Programming','Data Structures'] },
  { id: '8', name: 'Mr. Thomas Green',   role: 'Teacher',   dept: 'Physical Ed.',   email: 'thomas.g@school.edu',phone: '+1-555-0108', status: 'INACTIVE', subjects: ['PE','Sports'] },
];

const ROLE_COLORS: Record<string, string> = {
  Teacher:   'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  Librarian: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  Accountant:'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
};

const STATUS_COLORS: Record<string, string> = {
  ACTIVE:   'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  ON_LEAVE: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  INACTIVE: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
};

export default function StaffPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = MOCK_STAFF.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.dept.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'ALL' || s.role === roleFilter;
    const matchStatus = statusFilter === 'ALL' || s.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const counts = {
    total:   MOCK_STAFF.length,
    active:  MOCK_STAFF.filter((s) => s.status === 'ACTIVE').length,
    onLeave: MOCK_STAFF.filter((s) => s.status === 'ON_LEAVE').length,
    teachers:MOCK_STAFF.filter((s) => s.role === 'Teacher').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Management"
        description="Manage teaching and non-teaching staff across all departments."
        breadcrumbs={[{ label: 'Staff' }]}
        actions={
          <Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Staff</Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Staff"    value={counts.total}   change="All departments" trend="neutral" icon={Users}       color="blue" />
        <StatCard label="Active"         value={counts.active}  change="Currently working" trend="up"   icon={UserCheck}   color="green" />
        <StatCard label="On Leave"       value={counts.onLeave} change="This week"        trend="neutral" icon={UserX}     color="amber" />
        <StatCard label="Teachers"       value={counts.teachers}change="Across all grades" trend="neutral" icon={GraduationCap} color="purple" />
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Staff Directory</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search staff..." className="h-9 pl-8 w-48" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="h-9 w-32"><SelectValue placeholder="Role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Roles</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Librarian">Librarian</SelectItem>
                  <SelectItem value="Accountant">Accountant</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Staff Member', 'Department', 'Role', 'Contact', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                            {getInitials(s.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900 dark:text-white">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{s.dept}</td>
                    <td className="px-4 py-3">
                      <Badge className={`border-0 text-[11px] ${ROLE_COLORS[s.role] ?? ''}`}>{s.role}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{s.email}</span>
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{s.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`border-0 text-[11px] ${STATUS_COLORS[s.status] ?? ''}`}>
                        {s.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">View</Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-muted-foreground text-sm">No staff found</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
