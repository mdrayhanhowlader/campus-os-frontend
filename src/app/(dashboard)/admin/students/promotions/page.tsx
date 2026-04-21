'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const MOCK_CLASSES = [
  { from: 'Grade 10A', to: 'Grade 11A', students: 32, eligible: 30, failed: 2 },
  { from: 'Grade 10B', to: 'Grade 11B', students: 28, eligible: 27, failed: 1 },
  { from: 'Grade 11A', to: 'Grade 12A', students: 35, eligible: 33, failed: 2 },
  { from: 'Grade 11B', to: 'Grade 12B', students: 30, eligible: 28, failed: 2 },
];

export default function PromotionsPage() {
  const [year, setYear] = useState('2025-2026');
  const [promoted, setPromoted] = useState<string[]>([]);

  function promote(cls: string) {
    setPromoted((p) => [...p, cls]);
    toast.success(`${cls} promoted successfully!`);
  }

  const totalEligible = MOCK_CLASSES.reduce((s, c) => s + c.eligible, 0);
  const totalFailed   = MOCK_CLASSES.reduce((s, c) => s + c.failed, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Promotions"
        description="Promote eligible students to the next grade for the new academic year."
        breadcrumbs={[{ label: 'Students', href: '/admin/students' }, { label: 'Promotions' }]}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Students"   value={MOCK_CLASSES.reduce((s,c)=>s+c.students,0)} change="Across all classes" trend="neutral" icon={Users}        color="blue" />
        <StatCard label="Eligible"         value={totalEligible} change="Ready to promote"    trend="up"      icon={CheckCircle2} color="green" />
        <StatCard label="Not Eligible"     value={totalFailed}   change="Need review"         trend="down"    icon={AlertCircle}  color="rose" />
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle className="text-base">Promotion by Class</CardTitle>
              <CardDescription>Academic year {year}</CardDescription>
            </div>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="h-9 w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-2026">2025–2026</SelectItem>
                <SelectItem value="2026-2027">2026–2027</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Current Class','Promoted To','Total','Eligible','Not Eligible','Status'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {MOCK_CLASSES.map((c) => {
                  const done = promoted.includes(c.from);
                  return (
                    <tr key={c.from} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{c.from}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.to}</td>
                      <td className="px-4 py-3 text-center">{c.students}</td>
                      <td className="px-4 py-3 text-center text-green-600 font-medium">{c.eligible}</td>
                      <td className="px-4 py-3 text-center text-red-500">{c.failed}</td>
                      <td className="px-4 py-3">
                        {done
                          ? <Badge className="bg-green-50 text-green-700 border-0 dark:bg-green-950 dark:text-green-400"><CheckCircle2 className="h-3 w-3 mr-1" />Promoted</Badge>
                          : <Button size="sm" className="h-7 text-xs" onClick={()=>promote(c.from)}><TrendingUp className="h-3 w-3 mr-1" />Promote</Button>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
