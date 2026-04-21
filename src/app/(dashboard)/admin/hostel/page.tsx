'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus, Building2, Users, BedDouble } from 'lucide-react';

const ROOMS = [
  { id:'1', roomNo:'101', block:'A', type:'Double',  capacity:2, occupied:2, students:['Emma R.','Aisha P.'],       status:'FULL' },
  { id:'2', roomNo:'102', block:'A', type:'Double',  capacity:2, occupied:1, students:['Sophie C.'],               status:'AVAILABLE' },
  { id:'3', roomNo:'103', block:'A', type:'Triple',  capacity:3, occupied:3, students:['Nina T.','Maya S.','Riya K.'], status:'FULL' },
  { id:'4', roomNo:'201', block:'B', type:'Single',  capacity:1, occupied:1, students:['Lisa M.'],                 status:'FULL' },
  { id:'5', roomNo:'202', block:'B', type:'Double',  capacity:2, occupied:0, students:[],                          status:'VACANT' },
  { id:'6', roomNo:'203', block:'B', type:'Triple',  capacity:3, occupied:2, students:['Priya S.','Divya R.'],     status:'AVAILABLE' },
  { id:'7', roomNo:'301', block:'C', type:'Double',  capacity:2, occupied:2, students:['Jasmine K.','Tara L.'],    status:'FULL' },
  { id:'8', roomNo:'302', block:'C', type:'Single',  capacity:1, occupied:0, students:[],                          status:'VACANT' },
];

const STATUS_COLORS: Record<string,string> = {
  FULL:      'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
  AVAILABLE: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  VACANT:    'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
};

export default function HostelPage() {
  const [search, setSearch] = useState('');
  const [blockFilter, setBlockFilter] = useState('ALL');
  const filtered = ROOMS.filter(r=>
    (r.roomNo.includes(search)||r.block.toLowerCase().includes(search.toLowerCase())) &&
    (blockFilter==='ALL'||r.block===blockFilter)
  );
  const totalBeds = ROOMS.reduce((s,r)=>s+r.capacity,0);
  const occupied  = ROOMS.reduce((s,r)=>s+r.occupied,0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hostel"
        description="Manage dormitory rooms and student accommodation."
        breadcrumbs={[{ label:'Hostel' }]}
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Room</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Rooms"  value={ROOMS.length}   change="3 blocks"              trend="neutral" icon={Building2} color="blue" />
        <StatCard label="Occupied"     value={occupied}        change={`of ${totalBeds} beds`} trend="neutral" icon={BedDouble} color="amber" />
        <StatCard label="Vacant Beds"  value={totalBeds-occupied} change="Available now"      trend="up"      icon={Users}    color="green" />
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base">Room Allocation</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Room number..." className="h-9 pl-8 w-36" value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              <div className="flex rounded-md border dark:border-gray-700 overflow-hidden">
                {['ALL','A','B','C'].map(b=>(
                  <button key={b} onClick={()=>setBlockFilter(b)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${blockFilter===b?'bg-blue-600 text-white':'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                    {b==='ALL'?'All':` Block ${b}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Room No','Block','Type','Capacity','Occupied','Students','Status','Actions'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map(r=>(
                  <tr key={r.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{r.roomNo}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs">Block {r.block}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{r.type}</td>
                    <td className="px-4 py-3 text-center">{r.capacity}</td>
                    <td className="px-4 py-3 text-center font-medium">{r.occupied}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{r.students.join(', ')||'—'}</td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${STATUS_COLORS[r.status]}`}>{r.status}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">View</Button>
                        {r.status!=='FULL'&&<Button size="sm" className="h-7 text-xs">Assign</Button>}
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
