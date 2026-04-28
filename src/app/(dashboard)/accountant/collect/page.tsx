'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

type Step = 1 | 2 | 3;

const MOCK_STUDENT = {
  name: 'Priya Sharma', class: '10-A', admNo: 'RHS-2021-0142',
  invoices: [
    { id: 'INV-2026-004', desc: '4th Installment — Apr 2026', amount: 10500, balance: 10500 },
    { id: 'INV-2026-005', desc: 'Lab Fee — 2025-26',          amount: 2000,  balance: 2000 },
  ],
};

export default function AccountantCollectPage() {
  const [step, setStep] = useState<Step>(1);
  const [search, setSearch] = useState('');
  const [selectedInv, setSelectedInv] = useState('INV-2026-004');
  const [amount, setAmount] = useState('10500');
  const [method, setMethod] = useState('UPI');
  const [ref, setRef] = useState('');

  function findStudent() {
    if (!search.trim()) { toast.error('Enter admission number or name'); return; }
    setStep(2);
  }

  function processPayment() {
    if (!amount || !method) { toast.error('Please fill all fields'); return; }
    setStep(3);
    toast.success('Payment recorded successfully!');
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Collect Fee" description="Search student and record fee payment." breadcrumbs={[{ label: 'Dashboard', href: '/accountant' }, { label: 'Collect Fee' }]} />

      {/* Step indicator */}
      <div className="flex items-center gap-3">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-semibold ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'}`}>{s}</div>
            <span className={`text-sm ${step >= s ? 'text-gray-900 dark:text-white font-medium' : 'text-muted-foreground'}`}>{s === 1 ? 'Find Student' : s === 2 ? 'Enter Payment' : 'Done'}</span>
            {s < 3 && <div className={`h-px w-12 ${step > s ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 — Search */}
      {step === 1 && (
        <Card className="border-0 shadow-sm max-w-md">
          <CardHeader className="pb-3"><CardTitle className="text-base">Find Student</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Admission No. or Name</Label>
              <div className="flex gap-2">
                <Input placeholder="e.g. RHS-2021-0142 or Priya Sharma" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && findStudent()} />
                <Button onClick={findStudent} className="gap-2"><Search className="h-4 w-4" />Search</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2 — Payment */}
      {step === 2 && (
        <div className="space-y-4 max-w-lg">
          <Card className="border-0 shadow-sm bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-4">
              <p className="font-semibold text-gray-900 dark:text-white">{MOCK_STUDENT.name}</p>
              <p className="text-sm text-muted-foreground">Class {MOCK_STUDENT.class} · {MOCK_STUDENT.admNo}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3"><CardTitle className="text-base">Payment Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Select Invoice</Label>
                <Select value={selectedInv} onValueChange={setSelectedInv}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {MOCK_STUDENT.invoices.map((inv) => (
                      <SelectItem key={inv.id} value={inv.id}>{inv.id} — {inv.desc} (₹{inv.balance.toLocaleString()})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Amount (₹)</Label>
                  <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Payment Method</Label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="UPI">UPI</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Reference / Transaction ID <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <Input placeholder="UPI ref / cheque no." value={ref} onChange={(e) => setRef(e.target.value)} />
                </div>
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={processPayment}>Record Payment</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3 — Done */}
      {step === 3 && (
        <Card className="border-0 shadow-sm max-w-md">
          <CardContent className="p-8 flex flex-col items-center text-center gap-4">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Payment Recorded!</p>
              <p className="text-sm text-muted-foreground mt-1">₹{parseInt(amount).toLocaleString()} via {method} for {MOCK_STUDENT.name}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { setStep(1); setSearch(''); }}>New Payment</Button>
              <Button onClick={() => toast.info('Receipt printed')}>Print Receipt</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
