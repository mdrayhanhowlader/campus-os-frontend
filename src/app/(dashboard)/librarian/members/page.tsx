'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, BookOpen } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import { toast } from 'sonner';

const MEMBERS = [
  { id: 'MEM-001', name: 'Priya Sharma',   type: 'Student', class: '10-A', issued: 2, limit: 3, overdue: 0, active: true  },
  { id: 'MEM-002', name: 'Rohan Gupta',    type: 'Student', class: '11-B', issued: 1, limit: 3, overdue: 0, active: true  },
  { id: 'MEM-003', name: 'Sneha Nair',     type: 'Student', class: '9-C',  issued: 1, limit: 3, overdue: 0, active: true  },
  { id: 'MEM-004', name: 'Arjun Menon',    type: 'Student', class: '12-A', issued: 1, limit: 3, overdue: 1, active: true  },
  { id: 'MEM-005', name: 'Fatima Sheikh',  type: 'Student', class: '10-B', issued: 1, limit: 3, overdue: 1, active: true  },
  { id: 'MEM-006', name: 'Kabir Singh',    type: 'Student', class: '11-A', issued: 1, limit: 3, overdue: 1, active: true  },
  { id: 'MEM-007', name: 'Mrs. Pillai',    type: 'Staff',   class: '—',    issued: 2, limit: 5, overdue: 0, active: true  },
  { id: 'MEM-008', name: 'Mr. Verma',      type: 'Staff',   class: '—',    issued: 1, limit: 5, overdue: 0, active: true  },
  { id: 'MEM-009', name: 'Meera Reddy',    type: 'Student', class: '8-B',  issued: 0, limit: 3, overdue: 0, active: false },
  { id: 'MEM-010', name: 'Ayaan Khan',     type: 'Student', class: '10-A', issued: 3, limit: 3, overdue: 0, active: true  },
];

export default function LibrarianMembersPage() {
  const [search, setSearch]   = useState('');
  const [type, setType]       = useState('ALL');
  const [status, setStatus]   = useState('ALL');

  const filtered = MEMBERS.filter((m) => {
    const q           = search.toLowerCase();
    const matchSearch = m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q);
    const matchType   = type === 'ALL'   || m.type === type;
    const matchStatus = status === 'ALL' || (status === 'ACTIVE' ? m.active : !m.active);
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Library Members"
        description="Students and staff registered in the library system."
        breadcrumbs={[{ label: 'Dashboard', href: '/librarian' }, { label: 'Members' }]}
      />

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search name or ID..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                <SelectItem value="Student">Students</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground shrink-0">{filtered.length} members</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Member', 'ID', 'Type', 'Class', 'Books Issued', 'Overdue', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 shrink-0">
                          <AvatarFallback className="text-[10px] bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">{getInitials(m.name)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900 dark:text-white">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{m.id}</td>
                    <td className="px-4 py-3">
                      <Badge className={`border-0 text-[11px] ${m.type === 'Staff' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400' : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400'}`}>{m.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{m.class}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-3 w-3 text-muted-foreground" />
                        <span className={`text-sm font-medium ${m.issued === m.limit ? 'text-amber-600' : 'text-gray-900 dark:text-white'}`}>{m.issued}/{m.limit}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {m.overdue > 0
                        ? <span className="text-red-600 font-semibold text-sm">{m.overdue}</span>
                        : <span className="text-muted-foreground text-sm">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`border-0 text-[11px] ${m.active ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                        {m.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toast.info(`View ${m.name}'s history`)}>History</Button>
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
