'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Paperclip } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ComposePage() {
  const router = useRouter();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  function send() {
    if (!to||!subject||!body) { toast.error('Please fill all fields'); return; }
    toast.success('Message sent successfully!');
    router.push('/admin/messages');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compose Message"
        description="Send a message to staff, students, or parents."
        breadcrumbs={[{ label:'Messages', href:'/admin/messages' }, { label:'Compose' }]}
      />
      <Card className="border-0 shadow-sm max-w-2xl">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label>To</Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="h-10"><SelectValue placeholder="Select recipient or group" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all-staff">All Staff</SelectItem>
                <SelectItem value="all-teachers">All Teachers</SelectItem>
                <SelectItem value="all-parents">All Parents</SelectItem>
                <SelectItem value="dr-mitchell">Dr. Sarah Mitchell</SelectItem>
                <SelectItem value="mr-chen">Mr. James Chen</SelectItem>
                <SelectItem value="principal">Principal Office</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Subject</Label>
            <Input placeholder="Enter subject..." className="h-10" value={subject} onChange={e=>setSubject(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Message</Label>
            <textarea
              className="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none dark:border-gray-700 dark:bg-gray-900"
              placeholder="Type your message here..."
              value={body}
              onChange={e=>setBody(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm">
              <Paperclip className="mr-2 h-4 w-4" />Attach File
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={()=>router.back()}>Cancel</Button>
              <Button onClick={send}><Send className="mr-2 h-4 w-4" />Send Message</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
