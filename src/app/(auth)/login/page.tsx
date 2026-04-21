'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  GraduationCap, Eye, EyeOff, Loader2,
  Users, BookOpen, BarChart3, Shield,
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const loginSchema = z.object({
  schoolCode: z.string().min(1, 'School code is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
type LoginForm = z.infer<typeof loginSchema>;

const FEATURES = [
  { icon: Users,     label: 'Student Management',   desc: 'Enroll, track, and manage all students' },
  { icon: BookOpen,  label: 'Academic Planning',     desc: 'Timetables, exams, and report cards' },
  { icon: BarChart3, label: 'Finance & Fees',        desc: 'Invoices, payments, and expense tracking' },
  { icon: Shield,    label: 'Secure & Role-Based',   desc: 'Fine-grained access for every staff role' },
];

const DEMO_ACCOUNTS = [
  { role: 'Admin',      email: 'admin@riverside.edu',      password: 'password' },
  { role: 'Teacher',    email: 'teacher@riverside.edu',    password: 'password' },
  { role: 'Accountant', email: 'accountant@riverside.edu', password: 'password' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { schoolCode: 'RIVERSIDE-HS' },
  });

  async function onSubmit(data: LoginForm) {
    try {
      await login(data.email, data.password, data.schoolCode);
      toast.success('Welcome back!');
      router.push('/admin');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed. Please try again.');
    }
  }

  function fillDemo(email: string, password: string) {
    setValue('email', email);
    setValue('password', password);
    setValue('schoolCode', 'RIVERSIDE-HS');
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left Panel ────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-12 text-white relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-16 h-[500px] w-[500px] rounded-full bg-white/5" />
        <div className="absolute top-1/3 right-8 h-48 w-48 rounded-full bg-white/5" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">CampusOS</p>
            <p className="text-xs text-blue-200">School Management System</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative space-y-6">
          <div>
            <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight">
              Everything your<br />school needs,<br />
              <span className="text-blue-200">in one place.</span>
            </h2>
            <p className="mt-4 text-base text-blue-100 max-w-sm leading-relaxed">
              Manage students, staff, exams, fees, library, transport and more — all from a single powerful dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3 rounded-xl bg-white/10 backdrop-blur-sm p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-blue-200 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-blue-300">
          © {new Date().getFullYear()} CampusOS · Riverside High School
        </p>
      </div>

      {/* ── Right Panel ───────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 py-12 sm:px-12">
        {/* Mobile logo */}
        <div className="mb-8 flex flex-col items-center lg:hidden">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg mb-3">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">CampusOS</h1>
          <p className="text-sm text-muted-foreground">School Management System</p>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in</h2>
            <p className="mt-1 text-sm text-muted-foreground">Enter your credentials to access the portal</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* School Code */}
            <div className="space-y-1.5">
              <Label htmlFor="schoolCode" className="text-sm font-medium">School Code</Label>
              <Input
                id="schoolCode"
                placeholder="e.g. RIVERSIDE-HS"
                {...register('schoolCode')}
                className={`h-11 bg-white dark:bg-gray-900 ${errors.schoolCode ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.schoolCode && <p className="text-xs text-red-500">{errors.schoolCode.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@school.edu"
                {...register('email')}
                className={`h-11 bg-white dark:bg-gray-900 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className={`h-11 pr-10 bg-white dark:bg-gray-900 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</>
              ) : (
                'Sign in to CampusOS'
              )}
            </Button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t dark:border-gray-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-gray-50 dark:bg-gray-950 px-3 text-muted-foreground">Demo accounts</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  key={a.role}
                  type="button"
                  onClick={() => fillDemo(a.email, a.password)}
                  className="w-full flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{a.role}</p>
                    <p className="text-xs text-muted-foreground">{a.email}</p>
                  </div>
                  <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Use →
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              All demo accounts use password: <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">password</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
