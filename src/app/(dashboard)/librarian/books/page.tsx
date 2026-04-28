'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, BookOpen, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

const BOOKS = [
  { id: 'BK-001', title: 'Wings of Fire',                    author: 'A.P.J. Abdul Kalam',  genre: 'Biography',  isbn: '978-0071450942', copies: 6, available: 4 },
  { id: 'BK-002', title: 'The Alchemist',                    author: 'Paulo Coelho',         genre: 'Fiction',    isbn: '978-0062315007', copies: 4, available: 3 },
  { id: 'BK-003', title: 'A Brief History of Time',          author: 'Stephen Hawking',      genre: 'Science',    isbn: '978-0553380163', copies: 3, available: 2 },
  { id: 'BK-004', title: 'The God of Small Things',          author: 'Arundhati Roy',        genre: 'Fiction',    isbn: '978-0812979657', copies: 5, available: 4 },
  { id: 'BK-005', title: 'To Kill a Mockingbird',            author: 'Harper Lee',           genre: 'Fiction',    isbn: '978-0061935466', copies: 4, available: 2 },
  { id: 'BK-006', title: 'Harry Potter — Philosopher\'s Stone', author: 'J.K. Rowling',     genre: 'Fantasy',    isbn: '978-0439708180', copies: 8, available: 5 },
  { id: 'BK-007', title: 'Malgudi Days',                     author: 'R.K. Narayan',         genre: 'Fiction',    isbn: '978-0143031215', copies: 3, available: 3 },
  { id: 'BK-008', title: 'The Diary of a Young Girl',        author: 'Anne Frank',           genre: 'Memoir',     isbn: '978-0553296983', copies: 4, available: 3 },
  { id: 'BK-009', title: 'Discovery of India',               author: 'Jawaharlal Nehru',     genre: 'History',    isbn: '978-0143031031', copies: 2, available: 2 },
  { id: 'BK-010', title: 'Surely You\'re Joking, Mr. Feynman!', author: 'Richard Feynman',  genre: 'Science',    isbn: '978-0393316049', copies: 3, available: 1 },
];

const GENRES = ['Fiction', 'Science', 'Biography', 'Fantasy', 'History', 'Memoir'];

const GENRE_CFG: Record<string, string> = {
  Fiction:   'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  Science:   'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
  Biography: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  Fantasy:   'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  History:   'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400',
  Memoir:    'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
};

export default function LibrarianBooksPage() {
  const [search, setSearch]     = useState('');
  const [genre, setGenre]       = useState('ALL');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle]       = useState('');
  const [author, setAuthor]     = useState('');
  const [isbn, setIsbn]         = useState('');
  const [copies, setCopies]     = useState('1');
  const [formGenre, setFormGenre] = useState('Fiction');

  const filtered = BOOKS.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch = b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q);
    const matchGenre  = genre === 'ALL' || b.genre === genre;
    return matchSearch && matchGenre;
  });

  function addBook() {
    if (!title.trim() || !author.trim() || !isbn.trim()) { toast.error('Please fill all required fields'); return; }
    toast.success('Book added to catalogue!');
    setShowForm(false);
    setTitle(''); setAuthor(''); setIsbn(''); setCopies('1');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Book Catalogue"
        description="Manage the library book inventory."
        breadcrumbs={[{ label: 'Dashboard', href: '/librarian' }, { label: 'Books' }]}
        actions={<Button size="sm" className="gap-2" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4" />Add Book</Button>}
      />

      {showForm && (
        <Card className="border-0 shadow-sm max-w-2xl">
          <CardContent className="p-5 space-y-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">New Book Entry</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Title</Label>
                <Input placeholder="Book title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Author</Label>
                <Input placeholder="Author name" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>ISBN</Label>
                <Input placeholder="978-xxxxxxxxxx" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Genre</Label>
                <Select value={formGenre} onValueChange={setFormGenre}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{GENRES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>No. of Copies</Label>
                <Input type="number" min="1" value={copies} onChange={(e) => setCopies(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={addBook}>Add to Catalogue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search title, author, ISBN..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Genres</SelectItem>
                {GENRES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">{filtered.length} books</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                  {['Book ID', 'Title', 'Author', 'Genre', 'ISBN', 'Copies', 'Available', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{b.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="font-medium text-gray-900 dark:text-white max-w-[180px] truncate">{b.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{b.author}</td>
                    <td className="px-4 py-3"><Badge className={`border-0 text-[11px] ${GENRE_CFG[b.genre] ?? ''}`}>{b.genre}</Badge></td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{b.isbn}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium">{b.copies}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={`border-0 text-[11px] ${b.available > 0 ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400'}`}>
                        {b.available}/{b.copies}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => toast.info(`Edit ${b.title}`)}><Edit2 className="h-3 w-3" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
