// SaaS feature flag types — mirrors backend ModuleKey enum

export type ModuleKey =
  | 'TEACHER_PORTAL'
  | 'STUDENT_PORTAL'
  | 'PARENT_PORTAL'
  | 'ACCOUNTANT_PORTAL'
  | 'LIBRARIAN_PORTAL'
  | 'TRANSPORT_MODULE'
  | 'HOSTEL_MODULE'
  | 'EXAM_MODULE'
  | 'SYLLABUS_MODULE'
  | 'PAYROLL_MODULE'
  | 'ONLINE_FEE_PAYMENT'
  | 'MESSAGING'
  | 'ANNOUNCEMENTS'
  | 'REPORT_CARDS'
  | 'HALL_TICKETS';

export type PlanTier = 'TRIAL' | 'STARTER' | 'STANDARD' | 'PREMIUM' | 'ENTERPRISE';

export interface SchoolSubscription {
  plan: PlanTier;
  status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED' | 'CANCELLED';
  maxStudents: number;
  maxStaff: number;
  trialEndsAt?: string;
  renewsAt?: string;
  enabledModules: ModuleKey[];
}

// Default modules per plan — used server-side when no override is set
export const PLAN_DEFAULTS: Record<PlanTier, ModuleKey[]> = {
  TRIAL: [
    'STUDENT_PORTAL', 'TEACHER_PORTAL', 'EXAM_MODULE', 'ANNOUNCEMENTS',
  ],
  STARTER: [
    'STUDENT_PORTAL', 'TEACHER_PORTAL', 'PARENT_PORTAL',
    'EXAM_MODULE', 'ANNOUNCEMENTS', 'MESSAGING',
  ],
  STANDARD: [
    'STUDENT_PORTAL', 'TEACHER_PORTAL', 'PARENT_PORTAL',
    'ACCOUNTANT_PORTAL', 'LIBRARIAN_PORTAL',
    'EXAM_MODULE', 'SYLLABUS_MODULE', 'ANNOUNCEMENTS',
    'MESSAGING', 'REPORT_CARDS', 'HALL_TICKETS', 'PAYROLL_MODULE',
  ],
  PREMIUM: [
    'STUDENT_PORTAL', 'TEACHER_PORTAL', 'PARENT_PORTAL',
    'ACCOUNTANT_PORTAL', 'LIBRARIAN_PORTAL',
    'TRANSPORT_MODULE', 'HOSTEL_MODULE',
    'EXAM_MODULE', 'SYLLABUS_MODULE', 'PAYROLL_MODULE',
    'ONLINE_FEE_PAYMENT', 'MESSAGING', 'ANNOUNCEMENTS',
    'REPORT_CARDS', 'HALL_TICKETS',
  ],
  ENTERPRISE: [
    'STUDENT_PORTAL', 'TEACHER_PORTAL', 'PARENT_PORTAL',
    'ACCOUNTANT_PORTAL', 'LIBRARIAN_PORTAL',
    'TRANSPORT_MODULE', 'HOSTEL_MODULE',
    'EXAM_MODULE', 'SYLLABUS_MODULE', 'PAYROLL_MODULE',
    'ONLINE_FEE_PAYMENT', 'MESSAGING', 'ANNOUNCEMENTS',
    'REPORT_CARDS', 'HALL_TICKETS',
  ],
};

// Fallback for unauthenticated / loading state — nothing enabled
export const EMPTY_SUBSCRIPTION: SchoolSubscription = {
  plan: 'TRIAL',
  status: 'ACTIVE',
  maxStudents: 0,
  maxStaff: 0,
  enabledModules: [],
};

// Mock — replaced by real API call after auth is wired
export const MOCK_SUBSCRIPTION: SchoolSubscription = {
  plan: 'PREMIUM',
  status: 'ACTIVE',
  maxStudents: 1200,
  maxStaff: 80,
  renewsAt: '2027-04-01',
  enabledModules: PLAN_DEFAULTS['PREMIUM'],
};
