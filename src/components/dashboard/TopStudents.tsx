import { Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { getInitials } from '@/lib/utils';
import { cn } from '@/lib/utils';

const TOP_STUDENTS = [
  { name: 'Sophia Chen',     grade: '12A', gpa: 4.0,  avatar: null, change: 0 },
  { name: 'Marcus Johnson',  grade: '11B', gpa: 3.94, avatar: null, change: 1 },
  { name: 'Aisha Patel',     grade: '12B', gpa: 3.91, avatar: null, change: -1 },
  { name: 'Lucas Wright',    grade: '11A', gpa: 3.87, avatar: null, change: 0 },
  { name: 'Emma Rodriguez',  grade: '10A', gpa: 3.85, avatar: null, change: 2 },
];

const MEDAL_COLORS = [
  'bg-yellow-400',
  'bg-gray-300',
  'bg-amber-600',
];

export function TopStudents() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Top Students</CardTitle>
          <Trophy className="h-4 w-4 text-amber-500" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {TOP_STUDENTS.map((student, i) => {
          const [first, ...rest] = student.name.split(' ');
          const last = rest.join(' ');
          const progressValue = (student.gpa / 4.0) * 100;

          return (
            <div key={student.name} className="flex items-center gap-3">
              {/* Rank badge */}
              <div
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white',
                  i < 3 ? MEDAL_COLORS[i] : 'bg-gray-200 text-gray-600 dark:bg-gray-700'
                )}
              >
                {i + 1}
              </div>

              <Avatar className="h-7 w-7 shrink-0">
                <AvatarImage src={student.avatar ?? undefined} />
                <AvatarFallback className="text-[10px] bg-blue-100 text-blue-700">
                  {getInitials(first, last)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{student.name}</p>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-2 shrink-0">
                    {student.gpa.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={progressValue} className="h-1.5 flex-1" />
                  <span className="text-[10px] text-muted-foreground shrink-0">{student.grade}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
