import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { buildQueryString } from '@/lib/utils';

export interface Student {
  id: string;
  admissionNumber: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  photo: string | null;
  admissionDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    avatar: string | null;
    isActive: boolean;
  };
  enrollments: Array<{
    id: string;
    rollNumber: string | null;
    class: { id: string; name: string; grade: number; section: string };
  }>;
  parents: Array<{
    relation: string;
    isPrimary: boolean;
    parent: { user: { firstName: string; lastName: string; email: string; phone: string | null } };
  }>;
}

export interface StudentsQuery {
  page?: number;
  limit?: number;
  search?: string;
  classId?: string;
  gender?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: unknown;
}

async function fetchStudents(query: StudentsQuery) {
  const qs = buildQueryString(query);
  const { data } = await api.get(`/students?${qs}`);
  return data;
}

async function createStudent(payload: object) {
  const { data } = await api.post('/students', payload);
  return data.data;
}

async function updateStudent(id: string, payload: object) {
  const { data } = await api.patch(`/students/${id}`, payload);
  return data.data;
}

async function deleteStudent(id: string) {
  await api.delete(`/students/${id}`);
}

export function useStudents(query: StudentsQuery) {
  return useQuery({
    queryKey: ['students', query],
    queryFn: () => fetchStudents(query),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}

export function useStudentStats() {
  return useQuery({
    queryKey: ['students', 'stats'],
    queryFn: async () => {
      const { data } = await api.get('/students/stats');
      return data.data;
    },
    staleTime: 60_000,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student enrolled successfully');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to enroll student');
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: object }) => updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student updated successfully');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update student');
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student removed successfully');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to remove student');
    },
  });
}
