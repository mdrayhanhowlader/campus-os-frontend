'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Save, School, Calendar, Bell, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [school, setSchool] = useState({ name:'Riverside High School', code:'RIVERSIDE-HS', address:'123 Riverside Ave, CA 90210', phone:'+1-555-0100', email:'info@riverside.edu', principal:'Dr. James Anderson' });
  const [academic, setAcademic] = useState({ year:'2025-2026', startDate:'2025-06-01', endDate:'2026-03-31', timezone:'Asia/Kolkata', currency:'INR' });

  function saveSchool() { toast.success('School profile updated!'); }
  function saveAcademic() { toast.success('Academic settings saved!'); }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure school profile, academic year, and system preferences."
        breadcrumbs={[{ label:'Settings' }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sidebar nav */}
        <div className="space-y-1">
          {[
            { icon:School,   label:'School Profile',     active:true },
            { icon:Calendar, label:'Academic Year',      active:false },
            { icon:Bell,     label:'Notifications',      active:false },
            { icon:Shield,   label:'Roles & Permissions',active:false },
          ].map(item=>{
            const Icon = item.icon;
            return (
              <button key={item.label} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${item.active?'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400':'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <Icon className="h-4 w-4" />{item.label}
              </button>
            );
          })}
        </div>

        {/* Settings panels */}
        <div className="lg:col-span-2 space-y-6">
          {/* School Profile */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><School className="h-4 w-4" />School Profile</CardTitle>
              <CardDescription>Basic information about your school</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label>School Name</Label><Input value={school.name} onChange={e=>setSchool(s=>({...s,name:e.target.value}))} /></div>
                <div className="space-y-1.5"><Label>School Code</Label><Input value={school.code} onChange={e=>setSchool(s=>({...s,code:e.target.value}))} /></div>
                <div className="space-y-1.5"><Label>Phone</Label><Input value={school.phone} onChange={e=>setSchool(s=>({...s,phone:e.target.value}))} /></div>
                <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={school.email} onChange={e=>setSchool(s=>({...s,email:e.target.value}))} /></div>
                <div className="space-y-1.5 sm:col-span-2"><Label>Address</Label><Input value={school.address} onChange={e=>setSchool(s=>({...s,address:e.target.value}))} /></div>
                <div className="space-y-1.5"><Label>Principal Name</Label><Input value={school.principal} onChange={e=>setSchool(s=>({...s,principal:e.target.value}))} /></div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={saveSchool}><Save className="mr-2 h-4 w-4" />Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* Academic Year */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Calendar className="h-4 w-4" />Academic Year</CardTitle>
              <CardDescription>Set the current academic year and dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label>Academic Year</Label><Input value={academic.year} onChange={e=>setAcademic(a=>({...a,year:e.target.value}))} /></div>
                <div className="space-y-1.5"><Label>Start Date</Label><Input type="date" value={academic.startDate} onChange={e=>setAcademic(a=>({...a,startDate:e.target.value}))} /></div>
                <div className="space-y-1.5"><Label>End Date</Label><Input type="date" value={academic.endDate} onChange={e=>setAcademic(a=>({...a,endDate:e.target.value}))} /></div>
                <div className="space-y-1.5">
                  <Label>Timezone</Label>
                  <Select value={academic.timezone} onValueChange={v=>setAcademic(a=>({...a,timezone:v}))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Currency</Label>
                  <Select value={academic.currency} onValueChange={v=>setAcademic(a=>({...a,currency:v}))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR — Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">USD — US Dollar ($)</SelectItem>
                      <SelectItem value="GBP">GBP — British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={saveAcademic}><Save className="mr-2 h-4 w-4" />Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
