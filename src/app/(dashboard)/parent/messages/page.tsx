'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Search } from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';

const THREADS = [
  { id: '1', name: 'Class Teacher (Mrs. Pillai)', preview: 'Parent meeting tomorrow at 10 AM',     time: '9:00 AM', unread: 1 },
  { id: '2', name: 'Mr. Verma (Mathematics)',     preview: 'Priya\'s performance is improving',   time: 'Yesterday', unread: 0 },
  { id: '3', name: 'Admin Office',                preview: 'Fee reminder: due date May 10',        time: 'Apr 20',  unread: 1 },
];
const MESSAGES: Record<string, { from: string; text: string; mine: boolean; time: string }[]> = {
  '1': [
    { from: 'Mrs. Pillai', text: 'Dear Parent, this is a reminder that the Parent-Teacher Meeting is scheduled for tomorrow (April 23) at 10 AM. Please make it a priority to attend.', mine: false, time: '9:00 AM' },
    { from: 'You', text: 'Thank you for the reminder. I will be there at 10 AM.', mine: true, time: '9:15 AM' },
  ],
  '2': [
    { from: 'Mr. Verma', text: 'I wanted to inform you that Priya has been showing good improvement in her mathematics work. Her recent test score was 82/100.', mine: false, time: 'Yesterday' },
    { from: 'You', text: 'That is great to hear! We have been encouraging her to practice at home. Thank you for letting us know.', mine: true, time: 'Yesterday' },
  ],
  '3': [
    { from: 'Admin Office', text: 'This is a reminder that the 4th installment fee of ₹4,500 is due on May 10, 2026. Please ensure timely payment to avoid late fees.', mine: false, time: 'Apr 20' },
  ],
};

export default function ParentMessagesPage() {
  const [active, setActive] = useState('1');
  const [reply, setReply] = useState('');
  const thread = THREADS.find((t) => t.id === active)!;
  const msgs = MESSAGES[active] ?? [];
  return (
    <div className="space-y-6">
      <PageHeader title="Messages" description="Communication with teachers and school administration." breadcrumbs={[{ label: 'Dashboard', href: '/parent' }, { label: 'Messages' }]} />
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="flex h-[520px]">
          <div className="w-64 shrink-0 border-r dark:border-gray-800 flex flex-col">
            <div className="p-3 border-b dark:border-gray-800"><div className="relative"><Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search..." className="pl-8 h-8 text-sm" /></div></div>
            <div className="flex-1 overflow-y-auto divide-y dark:divide-gray-800">
              {THREADS.map((t) => (
                <button key={t.id} onClick={() => setActive(t.id)} className={cn('w-full flex items-start gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors', active === t.id && 'bg-blue-50 dark:bg-blue-950/30')}>
                  <Avatar className="h-8 w-8 shrink-0 mt-0.5"><AvatarFallback className="text-xs bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">{getInitials(t.name)}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between"><p className="text-xs font-medium truncate text-gray-900 dark:text-white">{t.name}</p><span className="text-[10px] text-muted-foreground ml-1">{t.time}</span></div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{t.preview}</p>
                  </div>
                  {t.unread > 0 && <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">{t.unread}</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-3 border-b px-4 py-3 dark:border-gray-800">
              <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">{getInitials(thread.name)}</AvatarFallback></Avatar>
              <p className="font-medium text-sm text-gray-900 dark:text-white">{thread.name}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.mine ? 'flex-row-reverse' : ''}`}>
                  {!m.mine && <Avatar className="h-7 w-7 shrink-0 mt-1"><AvatarFallback className="text-[10px] bg-gray-100 dark:bg-gray-800">{getInitials(m.from)}</AvatarFallback></Avatar>}
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.mine ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-sm'}`}>
                    <p>{m.text}</p><p className={`text-[10px] mt-1 ${m.mine ? 'text-blue-200' : 'text-muted-foreground'}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t dark:border-gray-800 p-3 flex gap-2">
              <Input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type a message..." className="flex-1" />
              <Button size="sm" className="px-4" onClick={() => setReply('')}><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
