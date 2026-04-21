'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Send, Circle } from 'lucide-react';
import { getInitials, timeAgo } from '@/lib/utils';
import Link from 'next/link';

const MOCK_MESSAGES = [
  { id:'1', from:'Dr. Sarah Mitchell', role:'Teacher',   subject:'Student Progress — Emma R.',  preview:'I wanted to discuss Emma\'s recent performance in mathematics...', time: new Date(Date.now()-1000*60*10), read:false },
  { id:'2', from:'Carlos Rodriguez',   role:'Parent',    subject:'Fee Payment Query',            preview:'Hello, I have a question about the latest fee invoice...', time: new Date(Date.now()-1000*60*60), read:false },
  { id:'3', from:'Principal Office',   role:'Principal', subject:'Staff Meeting — 23rd April',   preview:'This is to inform all staff that there will be a meeting...', time: new Date(Date.now()-1000*60*60*3), read:true },
  { id:'4', from:'Mr. James Chen',     role:'Teacher',   subject:'Lab Equipment Request',         preview:'We need to procure new lab equipment for the physics...', time: new Date(Date.now()-1000*60*60*5), read:true },
  { id:'5', from:'Priya Sharma',       role:'Teacher',   subject:'Leave Application',             preview:'I would like to request a 2-day leave for personal...', time: new Date(Date.now()-1000*60*60*24), read:true },
];

export default function MessagesPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(MOCK_MESSAGES[0]);
  const filtered = MOCK_MESSAGES.filter(m=>
    m.from.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase())
  );
  const unread = MOCK_MESSAGES.filter(m=>!m.read).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        description="Internal communication between staff, parents, and admin."
        breadcrumbs={[{ label:'Messages' }]}
        actions={
          <Button size="sm" asChild>
            <Link href="/admin/messages/compose"><Send className="mr-2 h-4 w-4" />Compose</Link>
          </Button>
        }
      />

      <div className="grid gap-0 lg:grid-cols-3 rounded-xl border dark:border-gray-800 overflow-hidden shadow-sm bg-white dark:bg-gray-900 h-[600px]">
        {/* Inbox list */}
        <div className="border-r dark:border-gray-800 flex flex-col">
          <div className="p-3 border-b dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Inbox</span>
              {unread>0&&<Badge className="bg-blue-600 text-white border-0 text-xs">{unread}</Badge>}
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search messages..." className="h-8 pl-8 text-xs" value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y dark:divide-gray-800">
            {filtered.map(m=>(
              <button key={m.id} onClick={()=>setSelected(m)}
                className={`w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selected.id===m.id?'bg-blue-50 dark:bg-blue-950/30':''}`}>
                <div className="flex items-start gap-2.5">
                  {!m.read&&<Circle className="h-2 w-2 fill-blue-500 text-blue-500 mt-1.5 shrink-0" />}
                  {m.read&&<div className="w-2 shrink-0" />}
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">{getInitials(m.from)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs truncate ${!m.read?'font-bold text-gray-900 dark:text-white':'font-medium text-gray-700 dark:text-gray-300'}`}>{m.from}</span>
                      <span className="text-[10px] text-muted-foreground ml-1 shrink-0">{timeAgo(m.time)}</span>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${!m.read?'font-medium text-gray-800 dark:text-gray-200':'text-muted-foreground'}`}>{m.subject}</p>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">{m.preview}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message view */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="p-4 border-b dark:border-gray-800">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{selected.subject}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">From: {selected.from} · <Badge variant="outline" className="text-[10px] ml-1">{selected.role}</Badge></p>
              </div>
              <span className="text-xs text-muted-foreground">{selected.time.toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{selected.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </div>
          <div className="p-3 border-t dark:border-gray-800">
            <div className="flex gap-2">
              <Input placeholder="Type a reply..." className="flex-1 h-9 text-sm" />
              <Button size="sm" className="h-9"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
