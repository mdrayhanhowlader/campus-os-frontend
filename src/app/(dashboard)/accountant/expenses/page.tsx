'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Download, Receipt } from 'lucide-react';
import { toast } from 'sonner';

const EXPENSES = [
  { id: 'EXP-001', date: '2026-04-20', category: 'Utilities',    desc: 'Electricity Bill — April 2026',         amount: 18500, vendor: 'BESCOM',           approved: true  },
  { id: 'EXP-002', date: '2026-04-18', category: 'Maintenance',  desc: 'CCTV Camera Repair — Admin Block',      amount: 6200,  vendor: 'TechServ Pvt Ltd', approved: true  },
  { id: 'EXP-003', date: '2026-04-15', category: 'Supplies',     desc: 'Stationery — Term 2 Stock',             amount: 12400, vendor: 'Office Depot',     approved: true  },
  { id: 'EXP-004', date: '2026-04-12', category: 'Salaries',     desc: 'Contractual Staff — April 2026',        amount: 85000, vendor: 'Internal',         approved: true  },
  { id: 'EXP-005', date: '2026-04-10', category: 'Infrastructure',desc: 'Classroom Whiteboard Installation',    amount: 32000, vendor: 'EduFurnish Co.',   approved: false },
  { id: 'EXP-006', date: '2026-04-08', category: 'Events',       desc: 'Annual Day Décor & Sound',             amount: 45000, vendor: 'EventCraft India',  approved: true  },
  { id: 'EXP-007', date: '2026-04-05', category: 'Utilities',    desc: 'Internet & Broadband — April 2026',    amount: 9800,  vendor: 'Airtel Business',  approved: true  },
  { id: 'EXP-008', date: '2026-04-02', category: 'Maintenance',  desc: 'Plumbing Repair — Science Block',       amount: 3400,  vendor: 'QuickFix Works',   approved: false },
];

const CATEGORIES = ['Utilities', 'Maintenance', 'Supplies', 'Salaries', 'Infrastructure', 'Events'];

const CAT_CFG: Record<string, string> = {
  Utilities:      'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  Maintenance:    'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  Supplies:       'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  Salaries:       'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  Infrastructure: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400',
  Events:         'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
};

export default function AccountantExpensesPage() {
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('ALL');
  const [showForm, setShowForm]   = useState(false);
  const [formCat, setFormCat]     = useState('Utilities');
  const [formDesc, setFormDesc]   = useState('');
  const [formAmt, setFormAmt]     = useState('');
  const [formVendor, setFormVendor] = useState('');

  const filtered = EXPENSES.filter((e) => {
    const matchSearch   = e.desc.toLowerCase().includes(search.toLowerCase()) || e.vendor.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'ALL' || e.category === category;
    return matchSearch && matchCategory;
  });
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  function submitExpense() {
    if (!formDesc.trim() || !formAmt || !formVendor.trim()) { toast.error('Please fill all required fields'); return; }
    toast.success('Expense logged successfully!');
    setShowForm(false);
    setFormDesc(''); setFormAmt(''); setFormVendor('');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Track and manage school operational expenses."
        breadcrumbs={[{ label: 'Dashboard', href: '/accountant' }, { label: 'Expenses' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Export</Button>
            <Button size="sm" className="gap-2" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4" />Log Expense</Button>
          </div>
        }
      />

      {showForm && (
        <Card className="border-0 shadow-sm max-w-2xl">
          <CardHeader className="pb-3"><CardTitle className="text-base">Log New Expense</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={formCat} onValueChange={setFormCat}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Amount (₹)</Label>
                <Input type="number" placeholder="0" value={formAmt} onChange={(e) => setFormAmt(e.target.value)} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Description</Label>
                <Input placeholder="Brief description of expense" value={formDesc} onChange={(e) => setFormDesc(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Vendor / Payee</Label>
                <Input placeholder="Vendor name" value={formVendor} onChange={(e) => setFormVendor(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={submitExpense}>Submit</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3 flex-1">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Total: ₹{total.toLocaleString()}</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['ID', 'Date', 'Category', 'Description', 'Vendor', 'Amount', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{e.id}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${CAT_CFG[e.category]}`}>{e.category}</Badge></td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white max-w-xs">{e.desc}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{e.vendor}</td>
                    <td className="px-4 py-3 font-semibold text-red-600">₹{e.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge className={`border-0 text-[11px] ${e.approved ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400'}`}>
                        {e.approved ? 'Approved' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><Receipt className="h-3 w-3" />Voucher</Button>
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
