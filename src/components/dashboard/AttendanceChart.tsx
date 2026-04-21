'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const data = [
  { day: 'Mon', present: 1180, absent: 42, late: 62 },
  { day: 'Tue', present: 1203, absent: 31, late: 50 },
  { day: 'Wed', present: 1154, absent: 78, late: 52 },
  { day: 'Thu', present: 1220, absent: 24, late: 40 },
  { day: 'Fri', present: 1178, absent: 56, late: 50 },
  { day: 'Sat', present: 890, absent: 144, late: 250 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white p-3 shadow-lg dark:bg-gray-900 dark:border-gray-800">
      <p className="mb-2 text-sm font-semibold">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-muted-foreground capitalize">{entry.name}:</span>
          <span className="font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function AttendanceChart() {
  const avgAttendance = 92.4;

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Weekly Attendance</CardTitle>
            <CardDescription>Student presence across this week</CardDescription>
          </div>
          <Badge variant="secondary" className="text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-400">
            {avgAttendance}% avg
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="absentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} />
            <Area type="monotone" dataKey="present" stroke="#3b82f6" strokeWidth={2} fill="url(#presentGrad)" name="Present" />
            <Area type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} fill="url(#absentGrad)" name="Absent" />
            <Area type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} fill="none" name="Late" strokeDasharray="4 2" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
