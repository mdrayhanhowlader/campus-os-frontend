'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const LEAVE_HISTORY = [
  { id: '1', type: 'Sick Leave',     from: '2026-03-10', to: '2026-03-11', days: 2, reason: 'Fever and cold', status: 'APPROVED' },
  { id: '2', type: 'Casual Leave',   from: '2026-02-20', to: '2026-02-20', days: 1, reason: 'Personal work',  status: 'APPROVED' },
  { id: '3', type: 'Emergency Leave',from: '2026-01-15', to: '2026-01-17', days: 3, reason: 'Family emergency', status: 'REJECTED' },
];

const STATUS_CFG: Record<string, string> = {
  APPROVED: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  PENDING:  'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  REJECTED: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
};

export default function TeacherLeavePage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'Casual Leave', from: '', to: '', reason: '' });

  function submitLeave() {
    if (!form.from || !form.to || !form.reason) {
      toast.error('Please fill all fields');
      return;
    }
    toast.success('Leave application submitted successfully');
    setShowForm(false);
    setForm({ type: 'Casual Leave', from: '', to: '', reason: '' });
  }

  const balance = { casual: 12, sick: 10, earned: 20 };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Management"
        description="Apply for leave and track your leave history."
        breadcrumbs={[{ label: 'Dashboard', href: '/teacher' }, { label: 'Leave' }]}
        actions={
          <Button size="sm" onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" /> Apply Leave
          </Button>
        }
      />

      {/* Leave balance */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[{ label: 'Casual Leave', used: 2, total: balance.casual, color: 'blue' }, { label: 'Sick Leave', used: 2, total: balance.sick, color: 'green' }, { label: 'Earned Leave', used: 5, total: balance.earned, color: 'purple' }].map((b) => (
          <Card key={b.label} className="border-0 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-muted-foreground">{b.label}</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{b.total - b.used}</span>
                <span className="mb-1 text-sm text-muted-foreground">/ {b.total} remaining</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                <div className={`h-1.5 rounded-full bg-${b.color}-500`} style={{ width: `${((b.total - b.used) / b.total) * 100}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application form */}
      {showForm && (
        <Card className="border-0 shadow-sm border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">New Leave Application</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label>Leave Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                    <SelectItem value="Earned Leave">Earned Leave</SelectItem>
                    <SelectItem value="Emergency Leave">Emergency Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>From Date</Label>
                <Input type="date" value={form.from} onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>To Date</Label>
                <Input type="date" value={form.to} onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))} />
              </div>
              <div className="space-y-1.5 sm:col-span-3">
                <Label>Reason</Label>
                <Input placeholder="Brief reason for leave..." value={form.reason} onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))} />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={submitLeave}>Submit Application</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* History */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Calendar className="h-4 w-4" />Leave History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y dark:divide-gray-800">
            {LEAVE_HISTORY.map((l) => (
              <div key={l.id} className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 dark:text-white">{l.type}</p>
                    <Badge className={`border-0 text-[11px] ${STATUS_CFG[l.status]}`}>{l.status}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{l.from} → {l.to} · {l.days} day{l.days > 1 ? 's' : ''}</p>
                  <p className="text-xs text-muted-foreground italic">{l.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
