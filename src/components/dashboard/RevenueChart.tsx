'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const data = [
  { month: 'Oct', collected: 72000, outstanding: 8400 },
  { month: 'Nov', collected: 68500, outstanding: 11200 },
  { month: 'Dec', collected: 61000, outstanding: 9800 },
  { month: 'Jan', collected: 78200, outstanding: 7600 },
  { month: 'Feb', collected: 80100, outstanding: 5900 },
  { month: 'Mar', collected: 84320, outstanding: 12400 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white p-3 shadow-lg dark:bg-gray-900 dark:border-gray-800">
      <p className="mb-2 text-sm font-semibold">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.fill }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

export function RevenueChart() {
  const totalCollected = data.reduce((s, d) => s + d.collected, 0);
  const totalOutstanding = data[data.length - 1].outstanding;

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Fee Collection</CardTitle>
            <CardDescription>6-month revenue overview</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(totalCollected)}</p>
            <p className="text-xs text-red-500">{formatCurrency(totalOutstanding)} due</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="collected" name="Collected" radius={[4, 4, 0, 0]} fill="#3b82f6" />
            <Bar dataKey="outstanding" name="Outstanding" radius={[4, 4, 0, 0]} fill="#fca5a5" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
