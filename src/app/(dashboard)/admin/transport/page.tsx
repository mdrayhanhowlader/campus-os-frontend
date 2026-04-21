'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus, Bus, Users, MapPin } from 'lucide-react';

const ROUTES = [
  { id:'1', routeNo:'RT-01', area:'North Zone — Sector 12',  driver:'Ramesh Kumar',  contact:'+91-9876543210', students:28, capacity:40, status:'ACTIVE',   time:'07:30 AM' },
  { id:'2', routeNo:'RT-02', area:'South Zone — Main Road',  driver:'Suresh Patel',  contact:'+91-9876543211', students:35, capacity:40, status:'ACTIVE',   time:'07:15 AM' },
  { id:'3', routeNo:'RT-03', area:'East Zone — Riverside',   driver:'Mohan Das',     contact:'+91-9876543212', students:22, capacity:35, status:'ACTIVE',   time:'07:45 AM' },
  { id:'4', routeNo:'RT-04', area:'West Zone — Park Street', driver:'Ajay Singh',    contact:'+91-9876543213', students:30, capacity:40, status:'ACTIVE',   time:'07:20 AM' },
  { id:'5', routeNo:'RT-05', area:'Central — City Center',   driver:'Vijay Sharma',  contact:'+91-9876543214', students:15, capacity:30, status:'INACTIVE', time:'07:00 AM' },
];

export default function TransportPage() {
  const [search, setSearch] = useState('');
  const filtered = ROUTES.filter(r=>
    r.area.toLowerCase().includes(search.toLowerCase()) ||
    r.routeNo.toLowerCase().includes(search.toLowerCase()) ||
    r.driver.toLowerCase().includes(search.toLowerCase())
  );
  const totalStudents = ROUTES.filter(r=>r.status==='ACTIVE').reduce((s,r)=>s+r.students,0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transport"
        description="Manage school buses, routes, and driver assignments."
        breadcrumbs={[{ label:'Transport' }]}
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Route</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active Routes"    value={ROUTES.filter(r=>r.status==='ACTIVE').length} change="Running daily"   trend="neutral" icon={Bus}   color="blue" />
        <StatCard label="Students Using"   value={totalStudents}  change="Transport facility"    trend="up"      icon={Users}  color="green" />
        <StatCard label="Total Buses"      value={ROUTES.length}  change="Fleet size"            trend="neutral" icon={MapPin} color="amber" />
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base">Bus Routes</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search routes..." className="h-9 pl-8 w-48" value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Route No','Area','Driver','Contact','Departure','Students','Status','Actions'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map(r=>(
                  <tr key={r.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-12 items-center justify-center rounded bg-blue-100 dark:bg-blue-950">
                          <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300">{r.routeNo}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[160px]">{r.area}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.driver}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs font-mono">{r.contact}</td>
                    <td className="px-4 py-3 font-medium">{r.time}</td>
                    <td className="px-4 py-3 text-center">{r.students} / {r.capacity}</td>
                    <td className="px-4 py-3">
                      <Badge className={r.status==='ACTIVE'
                        ? 'bg-green-50 text-green-700 border-0 dark:bg-green-950 dark:text-green-400'
                        : 'bg-gray-100 text-gray-500 border-0 dark:bg-gray-800 dark:text-gray-400'
                      }>{r.status}</Badge>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
