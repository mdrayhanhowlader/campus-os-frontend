'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, CheckCircle2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const MOCK_MEMBER = { name: 'Priya Sharma', class: '10-A', admNo: 'RHS-2021-0142', issued: 2, limit: 3 };
const MOCK_BOOK   = { id: 'BK-001', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', available: 4 };

const ACTIVE_ISSUES = [
  { id: 'ISS-041', member: 'Rohan Gupta',   class: '11-B', book: 'The Alchemist',           issued: '2026-04-21', due: '2026-05-05', overdue: false },
  { id: 'ISS-039', member: 'Sneha Nair',    class: '9-C',  book: 'A Brief History of Time', issued: '2026-04-18', due: '2026-05-02', overdue: false },
  { id: 'ISS-027', member: 'Arjun Menon',   class: '12-A', book: 'The God of Small Things', issued: '2026-04-05', due: '2026-04-19', overdue: true  },
  { id: 'ISS-021', member: 'Fatima Sheikh', class: '10-B', book: 'To Kill a Mockingbird',   issued: '2026-04-01', due: '2026-04-15', overdue: true  },
  { id: 'ISS-018', member: 'Kabir Singh',   class: '11-A', book: 'Harry Potter',             issued: '2026-03-28', due: '2026-04-11', overdue: true  },
];

type IssueStep = 1 | 2 | 3;

export default function LibrarianIssuePage() {
  const [tab, setTab]               = useState('issue');
  const [issueStep, setIssueStep]   = useState<IssueStep>(1);
  const [memberSearch, setMemberSearch] = useState('');
  const [bookSearch, setBookSearch]     = useState('');
  const [memberFound, setMemberFound]   = useState(false);
  const [bookFound, setBookFound]       = useState(false);
  const [returnId, setReturnId]     = useState('');

  function findMember() {
    if (!memberSearch.trim()) { toast.error('Enter admission number or name'); return; }
    setMemberFound(true); setIssueStep(2);
  }
  function findBook() {
    if (!bookSearch.trim()) { toast.error('Enter book title or ID'); return; }
    setBookFound(true); setIssueStep(3);
  }
  function confirmIssue() {
    toast.success(`"${MOCK_BOOK.title}" issued to ${MOCK_MEMBER.name}!`);
    setIssueStep(1); setMemberFound(false); setBookFound(false);
    setMemberSearch(''); setBookSearch('');
  }
  function processReturn() {
    if (!returnId.trim()) { toast.error('Enter issue ID or member name'); return; }
    toast.success('Book returned successfully!');
    setReturnId('');
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Issue & Return" description="Issue books to members and process returns." breadcrumbs={[{ label: 'Dashboard', href: '/librarian' }, { label: 'Issue & Return' }]} />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-80 grid-cols-2">
          <TabsTrigger value="issue">Issue Book</TabsTrigger>
          <TabsTrigger value="return">Return Book</TabsTrigger>
        </TabsList>

        {/* Issue tab */}
        <TabsContent value="issue" className="space-y-4 mt-4">
          {/* Step indicator */}
          <div className="flex items-center gap-3">
            {(['Find Member', 'Find Book', 'Confirm'] as const).map((label, i) => {
              const s = i + 1;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-semibold ${issueStep >= s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'}`}>{s}</div>
                  <span className={`text-sm ${issueStep >= s ? 'text-gray-900 dark:text-white font-medium' : 'text-muted-foreground'}`}>{label}</span>
                  {s < 3 && <div className={`h-px w-10 ${issueStep > s ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                </div>
              );
            })}
          </div>

          {/* Step 1 — Member */}
          {issueStep === 1 && (
            <Card className="border-0 shadow-sm max-w-md">
              <CardHeader className="pb-3"><CardTitle className="text-base">Find Member</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Admission No. or Name</Label>
                  <div className="flex gap-2">
                    <Input placeholder="e.g. RHS-2021-0142" value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && findMember()} />
                    <Button onClick={findMember} className="gap-2"><Search className="h-4 w-4" />Search</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2 — Book */}
          {issueStep === 2 && (
            <div className="space-y-4 max-w-lg">
              <Card className="border-0 shadow-sm bg-blue-50 dark:bg-blue-950/20">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{MOCK_MEMBER.name}</p>
                    <p className="text-sm text-muted-foreground">Class {MOCK_MEMBER.class} · {MOCK_MEMBER.admNo}</p>
                  </div>
                  <Badge className="border-0 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">{MOCK_MEMBER.issued}/{MOCK_MEMBER.limit} books</Badge>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3"><CardTitle className="text-base">Search Book</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Book Title or ID</Label>
                    <div className="flex gap-2">
                      <Input placeholder="e.g. Wings of Fire or BK-001" value={bookSearch} onChange={(e) => setBookSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && findBook()} />
                      <Button onClick={findBook} className="gap-2"><Search className="h-4 w-4" />Search</Button>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setIssueStep(1)}>Back</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3 — Confirm */}
          {issueStep === 3 && (
            <div className="space-y-4 max-w-lg">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Confirm Issue</p>
                  <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Member</span><span className="font-medium">{MOCK_MEMBER.name} ({MOCK_MEMBER.class})</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Book</span><span className="font-medium">{MOCK_BOOK.title}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Author</span><span>{MOCK_BOOK.author}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Due Date</span><span className="font-medium text-blue-600">14 days from today</span></div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setIssueStep(2)}>Back</Button>
                    <Button onClick={confirmIssue} className="gap-2"><CheckCircle2 className="h-4 w-4" />Confirm Issue</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Return tab */}
        <TabsContent value="return" className="space-y-4 mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3"><CardTitle className="text-base">Process Return</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Issue ID or Member Name</Label>
                  <div className="flex gap-2">
                    <Input placeholder="e.g. ISS-041 or Rohan Gupta" value={returnId} onChange={(e) => setReturnId(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && processReturn()} />
                    <Button onClick={processReturn} className="gap-2"><RotateCcw className="h-4 w-4" />Return</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3"><CardTitle className="text-base">Active Issues</CardTitle></CardHeader>
              <CardContent className="p-0">
                <div className="divide-y dark:divide-gray-800">
                  {ACTIVE_ISSUES.map((iss) => (
                    <div key={iss.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{iss.member} <span className="text-muted-foreground font-normal">({iss.class})</span></p>
                        <p className="text-xs text-muted-foreground truncate">{iss.book}</p>
                        <p className="text-[11px] text-muted-foreground">Due: {new Date(iss.due).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <Badge className={`border-0 text-[11px] ${iss.overdue ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400' : 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'}`}>
                          {iss.overdue ? 'Overdue' : 'Active'}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toast.success(`Returned: ${iss.book}`)}><RotateCcw className="h-3 w-3" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
