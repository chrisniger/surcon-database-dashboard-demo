export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
  dateCreated: string;
};

export const roles = [
  'Super Admin',
  'Administrator',
  'Registry Officer',
  'Examination Officer',
  'Certification Officer',
  'Data Officer',
  'Viewer',
];

export type Permission = {
  action: string;
  'Super Admin': boolean;
  Administrator: boolean;
  'Registry Officer': boolean;
  'Examination Officer': boolean;
  'Certification Officer': boolean;
  'Data Officer': boolean;
  Viewer: boolean;
};

export const permissions: Permission[] = [
  { action: 'View Records', 'Super Admin': true, Administrator: true, 'Registry Officer': true, 'Examination Officer': true, 'Certification Officer': true, 'Data Officer': true, Viewer: true },
  { action: 'Create Records', 'Super Admin': true, Administrator: true, 'Registry Officer': true, 'Examination Officer': true, 'Certification Officer': true, 'Data Officer': true, Viewer: false },
  { action: 'Edit Records', 'Super Admin': true, Administrator: true, 'Registry Officer': true, 'Examination Officer': true, 'Certification Officer': true, 'Data Officer': false, Viewer: false },
  { action: 'Delete Records', 'Super Admin': true, Administrator: true, 'Registry Officer': false, 'Examination Officer': false, 'Certification Officer': false, 'Data Officer': false, Viewer: false },
  { action: 'Upload Documents', 'Super Admin': true, Administrator: true, 'Registry Officer': true, 'Examination Officer': true, 'Certification Officer': true, 'Data Officer': true, Viewer: false },
  { action: 'Import CSV', 'Super Admin': true, Administrator: true, 'Registry Officer': true, 'Examination Officer': false, 'Certification Officer': false, 'Data Officer': true, Viewer: false },
  { action: 'Generate Reports', 'Super Admin': true, Administrator: true, 'Registry Officer': false, 'Examination Officer': true, 'Certification Officer': true, 'Data Officer': true, Viewer: false },
  { action: 'Manage Users', 'Super Admin': true, Administrator: false, 'Registry Officer': false, 'Examination Officer': false, 'Certification Officer': false, 'Data Officer': false, Viewer: false },
];

export const mockUsers: AppUser[] = [
  { id: '1', name: 'Chukwuemeka Dike', email: 'admin@surcon.demo', role: 'Super Admin', department: 'IT Administration', status: 'Active', lastLogin: '2025-06-06 08:32', dateCreated: '2024-01-10' },
  { id: '2', name: 'Amaka Okonkwo', email: 'registry@surcon.demo', role: 'Registry Officer', department: 'Surveyors Registry', status: 'Active', lastLogin: '2025-06-06 07:45', dateCreated: '2024-02-15' },
  { id: '3', name: 'Bashir Sadiq', email: 'exam@surcon.demo', role: 'Examination Officer', department: 'Examinations', status: 'Active', lastLogin: '2025-06-05 16:20', dateCreated: '2024-03-01' },
  { id: '4', name: 'Felicia Obiora', email: 'felicia.obiora@surcon.gov', role: 'Certification Officer', department: 'Certifications', status: 'Active', lastLogin: '2025-06-05 14:10', dateCreated: '2024-03-15' },
  { id: '5', name: 'Garba Sule', email: 'garba.sule@surcon.gov', role: 'Data Officer', department: 'Data Management', status: 'Active', lastLogin: '2025-06-04 11:05', dateCreated: '2024-04-01' },
  { id: '6', name: 'Helen Osei', email: 'helen.osei@surcon.gov', role: 'Administrator', department: 'Administration', status: 'Active', lastLogin: '2025-06-06 09:15', dateCreated: '2024-01-20' },
  { id: '7', name: 'James Okoro', email: 'james.okoro@surcon.gov', role: 'Viewer', department: 'Audit', status: 'Inactive', lastLogin: '2025-05-20 10:30', dateCreated: '2024-05-10' },
  { id: '8', name: 'Kemi Adeyemi', email: 'kemi.adeyemi@surcon.gov', role: 'Registry Officer', department: 'Surveyors Registry', status: 'Active', lastLogin: '2025-06-05 15:40', dateCreated: '2024-06-01' },
];
