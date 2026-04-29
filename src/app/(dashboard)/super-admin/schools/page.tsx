'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Search, Plus, Settings2, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import type { ModuleKey } from '@/lib/features';

const ALL_MODULES: { key: ModuleKey; label: string; desc: string }[] = [
  { key: 'STUDENT_PORTAL',    label: 'Student Portal',     desc: 'Student dashboard, attendance, results' },
  { key: 'TEACHER_PORTAL',    label: 'Teacher Portal',     desc: 'Classes, marks, timetable, leave' },
  { key: 'PARENT_PORTAL',     label: 'Parent Portal',      desc: 'Child progress, fee, messaging' },
  { key: 'ACCOUNTANT_PORTAL', label: 'Accountant Portal',  desc: 'Fee collection, invoices, reports' },
  { key: 'LIBRARIAN_PORTAL',  label: 'Librarian Portal',   desc: 'Book management, issue/return' },
  { key: 'TRANSPORT_MODULE',  label: 'Transport Module',   desc: 'Routes, bus tracking, drivers' },
  { key: 'HOSTEL_MODULE',     label: 'Hostel Module',      desc: 'Rooms, boarders, warden dashboard' },
  { key: 'EXAM_MODULE',       label: 'Exam Module',        desc: 'Schedule, hall tickets, mark entry' },
  { key: 'SYLLABUS_MODULE',   label: 'Syllabus Module',    desc: 'Lesson plans, curriculum tracker' },
  { key: 'PAYROLL_MODULE',    label: 'Payroll Module',     desc: 'Staff salary processing' },
  { key: 'ONLINE_FEE_PAYMENT',label: 'Online Fee Payment', desc: 'Razorpay / SSLCommerz gateway' },
  { key: 'MESSAGING',         label: 'Messaging',          desc: 'Internal chat between roles' },
  { key: 'ANNOUNCEMENTS',     label: 'Announcements',      desc: 'School-wide broadcast notices' },
  { key: 'REPORT_CARDS',      label: 'Report Cards',       desc: 'Auto-generated term report PDFs' },
  { key: 'HALL_TICKETS',      label: 'Hall Tickets',       desc: 'Exam admit card generation' },
];

const SCHOOLS = [
  { id: '1', name: 'Riverside High School',    code: 'RHS', plan: 'PREMIUM' as const,    status: 'ACTIVE',    students: 1240, city: 'Bengaluru', enabledModules: ['STUDENT_PORTAL','TEACHER_PORTAL','PARENT_PORTAL','ACCOUNTANT_PORTAL','LIBRARIAN_PORTAL','EXAM_MODULE','MESSAGING','ANNOUNCEMENTS','REPORT_CARDS','HALL_TICKETS','PAYROLL_MODULE'] as ModuleKey[] },
  { id: '2', name: 'Greenwood Academy',        code: 'GWA', plan: 'STANDARD' as const,   status: 'ACTIVE',    students: 680,  city: 'Pune',      enabledModules: ['STUDENT_PORTAL','TEACHER_PORTAL','PARENT_PORTAL','ACCOUNTANT_PORTAL','LIBRARIAN_PORTAL','EXAM_MODULE','MESSAGING','ANNOUNCEMENTS'] as ModuleKey[] },
  { id: '3', name: "St. Xavier's Institute",   code: 'SXI', plan: 'PREMIUM' as const,    status: 'ACTIVE',    students: 1850, city: 'Mumbai',    enabledModules: ['STUDENT_PORTAL','TEACHER_PORTAL','PARENT_PORTAL','ACCOUNTANT_PORTAL','LIBRARIAN_PORTAL','TRANSPORT_MODULE','EXAM_MODULE','MESSAGING','ANNOUNCEMENTS','REPORT_CARDS','PAYROLL_MODULE'] as ModuleKey[] },
  { id: '4', name: 'Bright Future School',     code: 'BFS', plan: 'STARTER' as const,    status: 'SUSPENDED', students: 320,  city: 'Jaipur',    enabledModules: ['STUDENT_PORTAL','TEACHER_PORTAL','EXAM_MODULE','ANNOUNCEMENTS'] as ModuleKey[] },
  { id: '5', name: 'Delhi Public School',      code: 'DPS', plan: 'ENTERPRISE' as const, status: 'ACTIVE',    students: 3200, city: 'New Delhi', enabledModules: ALL_MODULES.map(m => m.key) },
];

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
};

type School = typeof SCHOOLS[number];

export default function SuperAdminSchoolsPage() {
  const [search, setSearch]           = useState('');
  const [planFilter, setPlanFilter]   = useState('ALL');
  const [selected, setSelected]       = useState<School | null>(null);
  const [modules, setModules]         = useState<ModuleKey[]>([]);

  const filtered = SCHOOLS.filter((s) => {
    const q = search.toLowerCase();
    return (
      (s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)) &&
      (planFilter === 'ALL' || s.plan === planFilter)
    );
  });

  function openSettings(school: School) {
    setSelected(school);
    setModules([...school.enabledModules]);
  }

  function toggleModule(key: ModuleKey) {
    setModules((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function saveModules() {
    toast.success(`Modules updated for ${selected?.name}`);
    setSelected(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schools"
        description="Manage all tenant schools — plans, modules, and status."
        breadcrumbs={[{ label: 'Platform Admin', href: '/super-admin' }, { label: 'Schools' }]}
        actions={<Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Add School</Button>}
      />

      {/* Module editor panel */}
      {selected && (
        <Card className="border-0 shadow-sm border-l-4 border-l-blue-600">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{selected.name}</p>
                  <p className="text-xs text-muted-foreground">{selected.code} · {selected.plan} plan · Toggle modules to control access</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelected(null)}>Cancel</Button>
                <Button size="sm" onClick={saveModules}>Save Changes</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_MODULES.map((m) => {
                const on = modules.includes(m.key);
                return (
                  <div key={m.key} className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${on ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30' : 'dark:border-gray-800'}`}>
                    <Switch checked={on} onCheckedChange={() => toggleModule(m.key)} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search school name or code..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Plans</SelectItem>
                {['TRIAL','STARTER','STANDARD','PREMIUM','ENTERPRISE'].map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">{filtered.length} schools</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['School', 'Code', 'City', 'Plan', 'Students', 'Modules', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{s.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.code}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{s.city}</td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${PLAN_CFG[s.plan]}`}>{s.plan}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{s.students.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground">{s.enabledModules.length}/{ALL_MODULES.length} active</span>
                    </td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${STATUS_CFG[s.status]}`}>{s.status}</Badge></td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => openSettings(s)}>
                        <Settings2 className="h-3 w-3" />Modules
                      </Button>
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
