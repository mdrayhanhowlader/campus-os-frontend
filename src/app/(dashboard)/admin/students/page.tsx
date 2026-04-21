'use client';

import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import {
  UserPlus, Download, Filter, MoreHorizontal,
  Eye, Pencil, Trash2, Users, UserCheck, GraduationCap,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { ModalForm } from '@/components/shared/ModalForm';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useStudents, useCreateStudent, useDeleteStudent, type Student } from '@/hooks/useStudents';
import { formatDate, getInitials } from '@/lib/utils';
import { cn } from '@/lib/utils';

// ─── Create Student Schema ─────────────────────────────────────
const createStudentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  classId: z.string().min(1, 'Class is required'),
  emergencyContact: z.string().min(1, 'Emergency contact is required'),
  emergencyPhone: z.string().min(1, 'Emergency phone is required'),
  phone: z.string().optional(),
  bloodGroup: z.string().default('UNKNOWN'),
});

type CreateStudentForm = z.infer<typeof createStudentSchema>;

// ─── Table Columns ─────────────────────────────────────────────
function useColumns(
  onEdit: (s: Student) => void,
  onDelete: (s: Student) => void
): ColumnDef<Student>[] {
  return [
    {
      id: 'student',
      header: 'Student',
      cell: ({ row }) => {
        const s = row.original;
        const name = `${s.user.firstName} ${s.user.lastName}`;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={s.user.avatar ?? undefined} />
              <AvatarFallback className="bg-blue-50 text-blue-700 text-xs">
                {getInitials(s.user.firstName, s.user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{name}</p>
              <p className="text-xs text-muted-foreground">{s.user.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'admissionNumber',
      header: 'Admission No.',
      cell: ({ getValue }) => (
        <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
          {getValue() as string}
        </span>
      ),
    },
    {
      id: 'class',
      header: 'Class',
      cell: ({ row }) => {
        const enrollment = row.original.enrollments?.[0];
        return enrollment ? (
          <Badge variant="outline" className="text-xs">
            Grade {enrollment.class.grade} — {enrollment.class.section}
          </Badge>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        );
      },
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      cell: ({ getValue }) => {
        const gender = getValue() as string;
        return (
          <span className={cn('text-xs font-medium',
            gender === 'MALE' ? 'text-blue-600' : gender === 'FEMALE' ? 'text-pink-600' : 'text-gray-600'
          )}>
            {gender.charAt(0) + gender.slice(1).toLowerCase()}
          </span>
        );
      },
    },
    {
      accessorKey: 'dateOfBirth',
      header: 'Date of Birth',
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">{formatDate(getValue() as string)}</span>
      ),
    },
    {
      id: 'parent',
      header: 'Parent / Guardian',
      cell: ({ row }) => {
        const primary = row.original.parents?.find((p) => p.isPrimary);
        return primary ? (
          <div>
            <p className="text-sm">{primary.parent.user.firstName} {primary.parent.user.lastName}</p>
            <p className="text-xs text-muted-foreground">{primary.parent.user.phone || primary.parent.user.email}</p>
          </div>
        ) : <span className="text-xs text-muted-foreground">—</span>;
      },
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge className={cn(
          'text-[11px] border-0',
          row.original.user.isActive
            ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
            : 'bg-gray-100 text-gray-600'
        )}>
          {row.original.user.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem asChild>
              <a href={`/admin/students/${row.original.id}`} className="flex items-center gap-2 cursor-pointer">
                <Eye className="h-3.5 w-3.5" /> View Profile
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => onEdit(row.original)}>
              <Pencil className="h-3.5 w-3.5" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50"
              onClick={() => onDelete(row.original)}
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}

// ─── Create Student Form Fields ─────────────────────────────────
function StudentFormFields({ form }: { form: any }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
        <Input id="firstName" {...form.register('firstName')} placeholder="Emma" />
        {form.formState.errors.firstName && (
          <p className="text-xs text-red-500">{form.formState.errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
        <Input id="lastName" {...form.register('lastName')} placeholder="Rodriguez" />
        {form.formState.errors.lastName && (
          <p className="text-xs text-red-500">{form.formState.errors.lastName.message}</p>
        )}
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
        <Input id="email" type="email" {...form.register('email')} placeholder="emma@school.edu" />
        {form.formState.errors.email && (
          <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
        <Select onValueChange={(v) => form.setValue('gender', v)} defaultValue={form.getValues('gender')}>
          <SelectTrigger id="gender">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="dateOfBirth">Date of Birth <span className="text-red-500">*</span></Label>
        <Input id="dateOfBirth" type="date" {...form.register('dateOfBirth')} />
        {form.formState.errors.dateOfBirth && (
          <p className="text-xs text-red-500">{form.formState.errors.dateOfBirth.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" {...form.register('phone')} placeholder="+1 234 567 8900" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bloodGroup">Blood Group</Label>
        <Select onValueChange={(v) => form.setValue('bloodGroup', v)} defaultValue="UNKNOWN">
          <SelectTrigger id="bloodGroup">
            <SelectValue placeholder="Select blood group" />
          </SelectTrigger>
          <SelectContent>
            {['UNKNOWN', 'A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE'].map((bg) => (
              <SelectItem key={bg} value={bg}>{bg.replace(/_/g, ' ')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="classId">Assign to Class <span className="text-red-500">*</span></Label>
        <Input id="classId" {...form.register('classId')} placeholder="Class ID (e.g. clx12345...)" />
        {form.formState.errors.classId && (
          <p className="text-xs text-red-500">{form.formState.errors.classId.message}</p>
        )}
      </div>

      <div className="space-y-1.5 border-t pt-4 sm:col-span-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Emergency Contact</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="emergencyContact">Contact Name <span className="text-red-500">*</span></Label>
        <Input id="emergencyContact" {...form.register('emergencyContact')} placeholder="John Rodriguez" />
        {form.formState.errors.emergencyContact && (
          <p className="text-xs text-red-500">{form.formState.errors.emergencyContact.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="emergencyPhone">Contact Phone <span className="text-red-500">*</span></Label>
        <Input id="emergencyPhone" {...form.register('emergencyPhone')} placeholder="+1 234 567 8901" />
        {form.formState.errors.emergencyPhone && (
          <p className="text-xs text-red-500">{form.formState.errors.emergencyPhone.message}</p>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function StudentsPage() {
  const [query, setQuery] = useState({ page: 1, limit: 20, search: '', sortBy: 'createdAt', sortOrder: 'desc' as const });
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  const { data, isLoading } = useStudents(query);
  const createMutation = useCreateStudent();
  const deleteMutation = useDeleteStudent();

  const form = useForm<CreateStudentForm>({
    resolver: zodResolver(createStudentSchema),
  });

  const columns = useColumns(
    (_s) => { /* TODO: open edit modal */ },
    setDeleteTarget
  );

  async function handleCreate(formData: CreateStudentForm) {
    await createMutation.mutateAsync({
      ...formData,
      dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
    });
    setCreateOpen(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  }

  const students: Student[] = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description="Manage student enrollment, profiles, and records."
        breadcrumbs={[{ label: 'Students' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button size="sm" onClick={() => setCreateOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" /> Enroll Student
            </Button>
          </div>
        }
      />

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Students"    value={meta?.total ?? '—'} change="All enrolled" trend="neutral" icon={Users}        color="blue" />
        <StatCard label="Active Students"   value="1,241"              change="97% of total" trend="up"      icon={UserCheck}     color="green" />
        <StatCard label="New This Month"    value="48"                 change="+12 vs last"  trend="up"      icon={GraduationCap} color="purple" />
      </div>

      {/* Filters + Table */}
      <DataTable
        data={students}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="Search by name, email, admission no..."
        emptyMessage="No students found"
        emptyDescription="Try adjusting your search or filters, or enroll a new student."
        serverSide
        page={query.page}
        pageSize={query.limit}
        pageCount={meta?.totalPages}
        onPageChange={(p) => setQuery((q) => ({ ...q, page: p }))}
        onPageSizeChange={(l) => setQuery((q) => ({ ...q, limit: l, page: 1 }))}
        onSearchChange={(s) => setQuery((q) => ({ ...q, search: s, page: 1 }))}
        toolbarActions={
          <Select
            defaultValue="ALL"
            onValueChange={(v) => setQuery((q) => ({ ...q, gender: v === 'ALL' ? undefined : v } as any))}
          >
            <SelectTrigger className="h-9 w-36">
              <Filter className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All genders</SelectItem>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      {/* Create Student Modal */}
      <ModalForm
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Enroll New Student"
        description="Fill in the student's details to complete enrollment."
        form={form}
        onSubmit={handleCreate}
        submitLabel="Enroll Student"
        isSubmitting={createMutation.isPending}
        size="lg"
      >
        <StudentFormFields form={form} />
      </ModalForm>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove student?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{' '}
              <strong>{deleteTarget?.user.firstName} {deleteTarget?.user.lastName}</strong>{' '}
              and all their associated records. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Removing...' : 'Remove Student'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
