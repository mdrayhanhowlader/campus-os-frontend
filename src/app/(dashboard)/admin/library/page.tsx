'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, BookMarked, Users, AlertCircle, Search, Plus } from 'lucide-react';

const MOCK_BOOKS = [
  { id: '1', title: 'Advanced Mathematics', author: 'R. D. Sharma',    isbn: '978-81-7850-123-4', category: 'Textbook', copies: 10, available: 3,  status: 'LOW' },
  { id: '2', title: 'Physics for Class 11', author: 'H.C. Verma',      isbn: '978-81-7850-456-5', category: 'Textbook', copies: 8,  available: 8,  status: 'AVAILABLE' },
  { id: '3', title: 'Wings of Fire',        author: 'A.P.J. Kalam',    isbn: '978-81-7371-146-5', category: 'Biography',copies: 5,  available: 0,  status: 'ISSUED' },
  { id: '4', title: 'The Alchemist',        author: 'Paulo Coelho',    isbn: '978-0-06-112241-5', category: 'Fiction',  copies: 6,  available: 4,  status: 'AVAILABLE' },
  { id: '5', title: 'Class 10 History',     author: 'NCERT',            isbn: '978-81-7450-345-0', category: 'Textbook', copies: 15, available: 12, status: 'AVAILABLE' },
  { id: '6', title: 'Computer Science 12',  author: 'Sumita Arora',    isbn: '978-81-7650-222-1', category: 'Textbook', copies: 10, available: 1,  status: 'LOW' },
];

const STATUS_CFG: Record<string, string> = {
  AVAILABLE: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  ISSUED:    'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
  LOW:       'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
};

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('ALL');

  const filtered = MOCK_BOOKS.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'ALL' || b.category === catFilter;
    return matchSearch && matchCat;
  });

  const totalCopies     = MOCK_BOOKS.reduce((s, b) => s + b.copies, 0);
  const totalAvailable  = MOCK_BOOKS.reduce((s, b) => s + b.available, 0);
  const totalIssued     = totalCopies - totalAvailable;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Library"
        description="Manage books, issue records, and track inventory."
        breadcrumbs={[{ label: 'Library' }]}
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Book</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Books"   value={MOCK_BOOKS.length} change={`${totalCopies} copies total`} trend="neutral" icon={BookOpen}   color="blue" />
        <StatCard label="Available"     value={totalAvailable}     change="Ready to issue"               trend="up"      icon={BookMarked} color="green" />
        <StatCard label="Issued"        value={totalIssued}        change="Currently out"                trend="neutral" icon={Users}      color="amber" />
        <StatCard label="Overdue"       value={3}                  change="Return reminder sent"         trend="down"    icon={AlertCircle}color="rose" />
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Book Inventory</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search books..." className="h-9 pl-8 w-48" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={catFilter} onValueChange={setCatFilter}>
                <SelectTrigger className="h-9 w-32"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  <SelectItem value="Textbook">Textbook</SelectItem>
                  <SelectItem value="Fiction">Fiction</SelectItem>
                  <SelectItem value="Biography">Biography</SelectItem>
                  <SelectItem value="Reference">Reference</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Title', 'Author', 'ISBN', 'Category', 'Total', 'Available', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[200px]">{b.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{b.author}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{b.isbn}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs">{b.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{b.copies}</td>
                    <td className="px-4 py-3 text-center font-medium">{b.available}</td>
                    <td className="px-4 py-3">
                      <Badge className={`border-0 text-[11px] ${STATUS_CFG[b.status]}`}>{b.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">Issue</Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-muted-foreground text-sm">No books found</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
