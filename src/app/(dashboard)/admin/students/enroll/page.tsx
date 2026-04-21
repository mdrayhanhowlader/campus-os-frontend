'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

const STEPS = ['Personal Info', 'Academic Info', 'Parent/Guardian', 'Review'];

export default function EnrollStudentPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', gender: '', bloodGroup: '',
    class: '', section: '', admissionDate: '', rollNo: '',
    parentName: '', parentPhone: '', parentEmail: '', parentRelation: '',
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function handleNext() {
    if (step < STEPS.length - 1) setStep(step + 1);
  }
  function handleBack() {
    if (step > 0) setStep(step - 1);
  }
  function handleSubmit() {
    toast.success('Student enrolled successfully!');
    setStep(0);
    setForm({ firstName:'',lastName:'',dob:'',gender:'',bloodGroup:'',class:'',section:'',admissionDate:'',rollNo:'',parentName:'',parentPhone:'',parentEmail:'',parentRelation:'' });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enroll New Student"
        description="Complete the form below to admit a new student."
        breadcrumbs={[{ label: 'Students', href: '/admin/students' }, { label: 'Enroll' }]}
      />

      {/* Stepper */}
      <div className="flex items-center gap-0">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold border-2 transition-colors ${
                i < step ? 'bg-blue-600 border-blue-600 text-white' :
                i === step ? 'border-blue-600 text-blue-600' :
                'border-gray-300 text-gray-400'
              }`}>
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-blue-600' : i < step ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${i < step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
          </div>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">{STEPS[step]}</CardTitle>
          <CardDescription>Step {step + 1} of {STEPS.length}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>First Name</Label><Input placeholder="Emma" value={form.firstName} onChange={e=>set('firstName',e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Last Name</Label><Input placeholder="Rodriguez" value={form.lastName} onChange={e=>set('lastName',e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Date of Birth</Label><Input type="date" value={form.dob} onChange={e=>set('dob',e.target.value)} /></div>
              <div className="space-y-1.5">
                <Label>Gender</Label>
                <Select value={form.gender} onValueChange={v=>set('gender',v)}>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Blood Group</Label>
                <Select value={form.bloodGroup} onValueChange={v=>set('bloodGroup',v)}>
                  <SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger>
                  <SelectContent>
                    {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg=><SelectItem key={bg} value={bg}>{bg}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Class</Label>
                <Select value={form.class} onValueChange={v=>set('class',v)}>
                  <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                  <SelectContent>
                    {['10','11','12'].map(c=><SelectItem key={c} value={c}>Grade {c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Section</Label>
                <Select value={form.section} onValueChange={v=>set('section',v)}>
                  <SelectTrigger><SelectValue placeholder="Select section" /></SelectTrigger>
                  <SelectContent>
                    {['A','B','C'].map(s=><SelectItem key={s} value={s}>Section {s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Admission Date</Label><Input type="date" value={form.admissionDate} onChange={e=>set('admissionDate',e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Roll Number</Label><Input placeholder="e.g. 42" value={form.rollNo} onChange={e=>set('rollNo',e.target.value)} /></div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Parent / Guardian Name</Label><Input placeholder="Carlos Rodriguez" value={form.parentName} onChange={e=>set('parentName',e.target.value)} /></div>
              <div className="space-y-1.5">
                <Label>Relation</Label>
                <Select value={form.parentRelation} onValueChange={v=>set('parentRelation',v)}>
                  <SelectTrigger><SelectValue placeholder="Select relation" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Guardian">Guardian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Phone Number</Label><Input placeholder="+1-555-0100" value={form.parentPhone} onChange={e=>set('parentPhone',e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="parent@email.com" value={form.parentEmail} onChange={e=>set('parentEmail',e.target.value)} /></div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Please review the information before submitting.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Full Name', `${form.firstName} ${form.lastName}`],
                  ['Date of Birth', form.dob],
                  ['Gender', form.gender],
                  ['Blood Group', form.bloodGroup],
                  ['Class', form.class ? `Grade ${form.class} — Section ${form.section}` : ''],
                  ['Admission Date', form.admissionDate],
                  ['Roll Number', form.rollNo],
                  ['Parent Name', form.parentName],
                  ['Parent Phone', form.parentPhone],
                  ['Parent Email', form.parentEmail],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border dark:border-gray-800 p-3">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium mt-0.5">{value || '—'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t dark:border-gray-800">
            <Button variant="outline" onClick={handleBack} disabled={step === 0}>Back</Button>
            {step < STEPS.length - 1
              ? <Button onClick={handleNext}>Next Step</Button>
              : <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700"><UserPlus className="mr-2 h-4 w-4" />Enroll Student</Button>
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
