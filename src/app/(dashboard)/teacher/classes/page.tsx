'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, ClipboardList, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const MY_CLASSES = [
  { id: '1', name: 'Class 10-A', subject: 'Mathematics', students: 35, room: 'Room 201', schedule: 'Mon, Wed, Fri — 08:00', attendance: 94, pendingMarks: 0 },
  { id: '2', name: 'Class 11-B', subject: 'Mathematics', students: 40, room: 'Room 201', schedule: 'Mon, Tue, Thu — 09:00', attendance: 89, pendingMarks: 1 },
  { id: '3', name: 'Class 12-A', subject: 'Advanced Maths', students: 38, room: 'Room 305', schedule: 'Tue, Wed, Fri — 11:00', attendance: 92, pendingMarks: 2 },
  { id: '4', name: 'Class 9-C',  subject: 'Mathematics', students: 29, room: 'Room 104', schedule: 'Mon, Thu, Fri — 14:00', attendance: 88, pendingMarks: 0 },
];

export default function TeacherClassesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Classes"
        description="All classes you are currently assigned to teach."
        breadcrumbs={[{ label: 'Dashboard', href: '/teacher' }, { label: 'My Classes' }]}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {MY_CLASSES.map((cls) => (
          <Card key={cls.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{cls.name}</p>
                  <p className="text-sm text-muted-foreground">{cls.subject}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{cls.students} students</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ClipboardList className="h-3.5 w-3.5" />
                  <span>{cls.attendance}% attendance</span>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 px-3 py-2 text-xs text-muted-foreground">
                {cls.schedule} · {cls.room}
              </div>

              <div className="flex items-center justify-between">
                {cls.pendingMarks > 0 ? (
                  <Badge className="bg-amber-50 text-amber-700 border-0 dark:bg-amber-950 dark:text-amber-400">
                    {cls.pendingMarks} pending mark{cls.pendingMarks > 1 ? 's' : ''}
                  </Badge>
                ) : (
                  <Badge className="bg-green-50 text-green-700 border-0 dark:bg-green-950 dark:text-green-400">Up to date</Badge>
                )}
                <Button variant="ghost" size="sm" className="text-xs gap-1" asChild>
                  <Link href={`/teacher/attendance?class=${cls.id}`}>
                    Mark Attendance <ChevronRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
