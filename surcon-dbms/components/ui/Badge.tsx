import { cn } from '@/lib/utils';

type Variant = 'green' | 'yellow' | 'red' | 'blue' | 'gray' | 'purple';

const variants: Record<Variant, string> = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
  gray: 'bg-gray-100 text-gray-700',
  purple: 'bg-purple-100 text-purple-800',
};

export function Badge({ label, variant = 'gray' }: { label: string; variant?: Variant }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant])}>
      {label}
    </span>
  );
}

export function statusBadge(status: string) {
  const map: Record<string, Variant> = {
    Active: 'green', Certified: 'green', Pass: 'green', Approved: 'green',
    Verified: 'green', Attached: 'green', 'Exam Completed': 'green',
    Pending: 'yellow', Missing: 'yellow', 'Pending Review': 'yellow', 'Result Pending': 'yellow',
    Inactive: 'gray', Viewer: 'gray', Absent: 'gray',
    Failed: 'red', Fail: 'red', Expired: 'red', Rejected: 'red', Revoked: 'red', Suspended: 'red',
    'Not Certified': 'red',
    'Data Submitted': 'blue', 'Not Applicable': 'gray',
    'Super Admin': 'purple', Administrator: 'blue', Admin: 'blue',
    'Registry Officer': 'blue', 'Examination Officer': 'blue',
    'Certification Officer': 'blue', 'Data Officer': 'blue',
  };
  return <Badge label={status} variant={map[status] ?? 'gray'} />;
}
