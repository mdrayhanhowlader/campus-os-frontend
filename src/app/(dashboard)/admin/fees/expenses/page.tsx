'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Receipt, TrendingDown, Search, Plus } from 'lucide-react';

const MOCK_EXPENSES = [
  { id:'1', title:'Electricity Bill',     category:'Utilities',     amount:28000, date:'2026-04-15', by:'Mr. Kevin Brooks',   status:'APPROVED' },
  { id:'2', title:'Cleaning Supplies',    category:'Maintenance',   amount:5500,  date:'2026-04-14', by:'Mr. Kevin Brooks',   status:'APPROVED' },
  { id:'3', title:'Printer Paper & Ink',  category:'Stationery',    amount:3200,  date:'2026-04-12', by:'Ms. Linda Park',     status:'APPROVED' },
  { id:'4', title:'Lab Equipment Repair', category:'Maintenance',   amount:12000, date:'2026-04-10', by:'Mr. James Chen',     status:'PENDING' },
  { id:'5', title:'Staff Training',       category:'Professional',  amount:18000, date:'2026-04-08', by:'Principal Office',   status:'APPROVED' },
  { id:'6', title:'Water Cooler Refill',  category:'Utilities',     amount:1800,  date:'2026-04-07', by:'Mr. Kevin Brooks',   status:'APPROVED' },
];

const CAT_COLORS: Record<string,string> = {
  'Utilities':    'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  'Maintenance':  'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  'Stationery':   'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  'Professional': 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
};

export default function ExpensesPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('ALL');
  const filtered = MOCK_EXPENSES.filter(e=>
    e.title.toLowerCase().includes(search.toLowerCase()) &&
    (catFilter==='ALL'||e.category===catFilter)
  );
  const total = MOCK_EXPENSES.reduce((s,e)=>s+e.amount,0);
  const thisMonth = MOCK_EXPENSES.filter(e=>e.date.startsWith('2026-04')).reduce((s,e)=>s+e.amount,0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Track all school operational expenses."
        breadcrumbs={[{ label:'Fees', href:'/admin/fees' }, { label:'Expenses' }]}
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Expense</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="This Month"   value={`₹${thisMonth.toLocaleString()}`} change="April 2026"    trend="neutral" icon={Receipt}      color="blue" />
        <StatCard label="Total (YTD)"  value={`₹${total.toLocaleString()}`}     change="Year to date"  trend="neutral" icon={TrendingDown} color="rose" />
        <StatCard label="Pending"      value={MOCK_EXPENSES.filter(e=>e.status==='PENDING').length} change="Awaiting approval" trend="neutral" icon={Receipt} color="amber" />
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base">Expense Records</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="h-9 pl-8 w-44" value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              <Select value={catFilter} onValueChange={setCatFilter}>
                <SelectTrigger className="h-9 w-36"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  {['Utilities','Maintenance','Stationery','Professional'].map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}
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
                  {['Title','Category','Amount','Date','Recorded By','Status'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map(e=>(
                  <tr key={e.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{e.title}</td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${CAT_COLORS[e.category]??''}`}>{e.category}</Badge></td>
                    <td className="px-4 py-3 font-semibold text-red-500">₹{e.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.by}</td>
                    <td className="px-4 py-3">
                      <Badge className={e.status==='APPROVED'
                        ? 'bg-green-50 text-green-700 border-0 dark:bg-green-950 dark:text-green-400'
                        : 'bg-amber-50 text-amber-700 border-0 dark:bg-amber-950 dark:text-amber-400'
                      }>{e.status}</Badge>
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
