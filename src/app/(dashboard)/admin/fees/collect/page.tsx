'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Search } from 'lucide-react';
import { toast } from 'sonner';

const STUDENTS = [
  { admNo:'STU-2025-00001', name:'Emma Rodriguez',  class:'10A', pending:0 },
  { admNo:'STU-2025-00002', name:'Marcus Johnson',  class:'11B', pending:6000 },
  { admNo:'STU-2025-00003', name:'Aisha Patel',     class:'12A', pending:15000 },
  { admNo:'STU-2025-00005', name:'Sophie Chen',     class:'10B', pending:12000 },
];

export default function CollectFeePage() {
  const [admNo, setAdmNo] = useState('');
  const [student, setStudent] = useState<typeof STUDENTS[0]|null>(null);
  const [feeType, setFeeType] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [collected, setCollected] = useState(false);

  function findStudent() {
    const found = STUDENTS.find(s=>s.admNo.toLowerCase()===admNo.toLowerCase());
    if (found) setStudent(found);
    else toast.error('Student not found');
  }

  function collect() {
    if (!feeType || !amount || !method) { toast.error('Please fill all fields'); return; }
    setCollected(true);
    toast.success(`₹${Number(amount).toLocaleString()} collected successfully! Receipt generated.`);
  }

  function reset() {
    setAdmNo(''); setStudent(null); setFeeType(''); setAmount(''); setMethod(''); setCollected(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Collect Fee"
        description="Record a new fee payment from a student."
        breadcrumbs={[{ label:'Fees', href:'/admin/fees' }, { label:'Collect Fee' }]}
      />

      {collected ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-16 flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Payment Collected!</h3>
              <p className="text-muted-foreground mt-1">Receipt has been generated for {student?.name}</p>
              <p className="text-2xl font-bold text-green-600 mt-2">₹{Number(amount).toLocaleString()}</p>
            </div>
            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={reset}>Collect Another</Button>
              <Button>Print Receipt</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Step 1: Find Student */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Step 1: Find Student</CardTitle>
              <CardDescription>Enter admission number to look up the student</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Admission Number</Label>
                <div className="flex gap-2">
                  <Input placeholder="STU-2025-00001" value={admNo} onChange={e=>setAdmNo(e.target.value)} onKeyDown={e=>e.key==='Enter'&&findStudent()} />
                  <Button onClick={findStudent}><Search className="h-4 w-4" /></Button>
                </div>
              </div>
              {student && (
                <div className="rounded-lg border dark:border-gray-700 p-4 space-y-2 bg-blue-50 dark:bg-blue-950/30">
                  <p className="font-semibold text-gray-900 dark:text-white">{student.name}</p>
                  <p className="text-sm text-muted-foreground">Grade {student.class} · {student.admNo}</p>
                  {student.pending > 0
                    ? <p className="text-sm font-medium text-red-600">Pending: ₹{student.pending.toLocaleString()}</p>
                    : <p className="text-sm font-medium text-green-600">No pending dues</p>
                  }
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 2: Payment Details */}
          <Card className={`border-0 shadow-sm ${!student?'opacity-50 pointer-events-none':''}`}>
            <CardHeader>
              <CardTitle className="text-base">Step 2: Payment Details</CardTitle>
              <CardDescription>Enter the fee type and amount</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Fee Type</Label>
                <Select value={feeType} onValueChange={setFeeType}>
                  <SelectTrigger><SelectValue placeholder="Select fee type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                    <SelectItem value="Transport Fee">Transport Fee</SelectItem>
                    <SelectItem value="Library Fee">Library Fee</SelectItem>
                    <SelectItem value="Lab Fee">Lab Fee</SelectItem>
                    <SelectItem value="Exam Fee">Exam Fee</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Amount (₹)</Label>
                <Input type="number" placeholder="0" value={amount} onChange={e=>setAmount(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Payment Method</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Online">Online Transfer</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="Card">Debit/Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={collect}>
                <CheckCircle2 className="mr-2 h-4 w-4" />Collect Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
