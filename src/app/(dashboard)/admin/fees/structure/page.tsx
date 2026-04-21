'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Edit } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const FEE_STRUCTURE = [
  { id:'1', category:'Tuition Fee',        grade10:15000, grade11:17000, grade12:18000, frequency:'Monthly',   status:'ACTIVE' },
  { id:'2', category:'Transport Fee',      grade10:4000,  grade11:4000,  grade12:4000,  frequency:'Monthly',   status:'ACTIVE' },
  { id:'3', category:'Library Fee',        grade10:1500,  grade11:1500,  grade12:1500,  frequency:'Annually',  status:'ACTIVE' },
  { id:'4', category:'Lab Fee',            grade10:2000,  grade11:3500,  grade12:4000,  frequency:'Annually',  status:'ACTIVE' },
  { id:'5', category:'Sports Fee',         grade10:1200,  grade11:1200,  grade12:1200,  frequency:'Annually',  status:'ACTIVE' },
  { id:'6', category:'Exam Fee',           grade10:800,   grade11:800,   grade12:1000,  frequency:'Per Exam',  status:'ACTIVE' },
  { id:'7', category:'Development Fund',   grade10:5000,  grade11:5000,  grade12:5000,  frequency:'Annually',  status:'ACTIVE' },
  { id:'8', category:'Computer Lab Fee',   grade10:1500,  grade11:2000,  grade12:2500,  frequency:'Annually',  status:'INACTIVE' },
];

export default function FeeStructurePage() {
  const [structure] = useState(FEE_STRUCTURE);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fee Structure"
        description="Define fee categories and amounts for each grade."
        breadcrumbs={[{ label:'Fees', href:'/admin/fees' }, { label:'Fee Structure' }]}
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Category</Button>}
      />

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Academic Year 2025–2026</CardTitle>
          <CardDescription>All amounts in Indian Rupees (₹)</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Fee Category','Grade 10','Grade 11','Grade 12','Frequency','Status','Action'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {structure.map(f=>(
                  <tr key={f.id} className={`hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors ${f.status==='INACTIVE'?'opacity-60':''}`}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{f.category}</td>
                    <td className="px-4 py-3 font-semibold">₹{f.grade10.toLocaleString()}</td>
                    <td className="px-4 py-3 font-semibold">₹{f.grade11.toLocaleString()}</td>
                    <td className="px-4 py-3 font-semibold">₹{f.grade12.toLocaleString()}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs">{f.frequency}</Badge></td>
                    <td className="px-4 py-3">
                      <Badge className={f.status==='ACTIVE'
                        ? 'bg-green-50 text-green-700 border-0 dark:bg-green-950 dark:text-green-400'
                        : 'bg-gray-100 text-gray-500 border-0 dark:bg-gray-800 dark:text-gray-400'
                      }>{f.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="outline" size="sm" className="h-7 text-xs"><Edit className="h-3 w-3 mr-1"/>Edit</Button>
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
