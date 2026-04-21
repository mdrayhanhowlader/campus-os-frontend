'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function NewEventPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title:'', date:'', time:'', venue:'', category:'', audience:'', description:'' });
  const set = (k: string, v: string) => setForm(f=>({...f,[k]:v}));

  function save() {
    if (!form.title||!form.date||!form.venue) { toast.error('Please fill required fields'); return; }
    toast.success('Event created successfully!');
    router.push('/admin/events');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create New Event"
        description="Schedule a new school event or activity."
        breadcrumbs={[{ label:'Events', href:'/admin/events' }, { label:'New Event' }]}
      />
      <Card className="border-0 shadow-sm max-w-2xl">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label>Event Title <span className="text-red-500">*</span></Label>
            <Input placeholder="e.g. Annual Sports Day" value={form.title} onChange={e=>set('title',e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Date <span className="text-red-500">*</span></Label>
              <Input type="date" value={form.date} onChange={e=>set('date',e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Time</Label>
              <Input type="time" value={form.time} onChange={e=>set('time',e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Venue <span className="text-red-500">*</span></Label>
            <Input placeholder="e.g. School Auditorium" value={form.venue} onChange={e=>set('venue',e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={v=>set('category',v)}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Academic">Academic</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Audience</Label>
              <Select value={form.audience} onValueChange={v=>set('audience',v)}>
                <SelectTrigger><SelectValue placeholder="Who can see this?" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Everyone">Everyone</SelectItem>
                  <SelectItem value="Students">Students Only</SelectItem>
                  <SelectItem value="Staff">Staff Only</SelectItem>
                  <SelectItem value="Parents">Parents Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <textarea
              className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none dark:border-gray-700 dark:bg-gray-900"
              placeholder="Describe the event..."
              value={form.description}
              onChange={e=>set('description',e.target.value)}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={()=>router.back()}>Cancel</Button>
            <Button onClick={save}><Save className="mr-2 h-4 w-4" />Create Event</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
