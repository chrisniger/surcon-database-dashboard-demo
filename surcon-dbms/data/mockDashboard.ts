export const kpiStats = [
  { label: 'Registered Surveyors', value: 12568, change: '+5.2%', icon: 'users' },
  { label: 'Certifications Managed', value: 8742, change: '+6.1%', icon: 'award' },
  { label: 'Examination Records', value: 15389, change: '+7.3%', icon: 'clipboard' },
  { label: 'Uploaded Documents', value: 23156, change: '+8.4%', icon: 'file-text' },
  { label: 'CSV Imports', value: 1256, change: '+4.7%', icon: 'upload' },
  { label: 'Reports Generated', value: 3482, change: '+9.8%', icon: 'bar-chart' },
  { label: 'Pending Results', value: 130, change: '-2.4%', icon: 'clock' },
  { label: 'Active Users', value: 128, change: '+3.9%', icon: 'shield' },
];

export const platformFeatures = [
  'Role-based digital platform',
  'CSV upload',
  'Document attachment',
  'Analytics dashboard',
  'Result generation',
  'Certification management',
  'Surveyor records management',
  'Store survey data',
];

export const recentRecords = [
  {
    name: 'Adejumo, Olawale M.',
    regNo: 'SUR/REG/2025/01245',
    recordType: 'Registration',
    examStatus: 'Exam Completed',
    score: '78%',
    certStatus: 'Certified',
    date: '2025-05-21T10:15:00',
  },
  {
    name: 'Babatunde, Funmi A.',
    regNo: 'SUR/REG/2025/01246',
    recordType: 'Certification',
    examStatus: 'Pending Review',
    score: '65%',
    certStatus: 'Result Pending',
    date: '2025-05-21T09:42:00',
  },
  {
    name: 'Okafor, Chinedu P.',
    regNo: 'SUR/REG/2025/01247',
    recordType: 'Examination',
    examStatus: 'Exam Completed',
    score: '52%',
    certStatus: 'Not Certified',
    date: '2025-05-21T09:30:00',
  },
  {
    name: 'Ibrahim, Musa K.',
    regNo: 'SUR/REG/2025/01248',
    recordType: 'Survey Data',
    examStatus: 'Data Submitted',
    score: '--',
    certStatus: 'Not Applicable',
    date: '2025-05-21T09:10:00',
  },
  {
    name: 'Nwosu, Chioma E.',
    regNo: 'SUR/REG/2025/01249',
    recordType: 'Examination',
    examStatus: 'Result Pending',
    score: '--',
    certStatus: 'Pending Review',
    date: '2025-05-21T08:55:00',
  },
];

export const certTrend = [
  { month: 'Jan', issued: 610, certified: 610, pending: 84 },
  { month: 'Feb', issued: 1050, certified: 1050, pending: 112 },
  { month: 'Mar', issued: 1510, certified: 1510, pending: 68 },
  { month: 'Apr', issued: 1180, certified: 1180, pending: 92 },
  { month: 'May', issued: 1780, certified: 1780, pending: 54 },
];

export const examPerformance = [
  { month: 'Jan', passed: 310, failed: 90 },
  { month: 'Feb', passed: 365, failed: 84 },
  { month: 'Mar', passed: 428, failed: 76 },
  { month: 'Apr', passed: 392, failed: 102 },
  { month: 'May', passed: 475, failed: 88 },
  { month: 'Jun', passed: 510, failed: 70 },
];

export const registrationActivity = [
  { month: 'Jan', count: 145 },
  { month: 'Feb', count: 132 },
  { month: 'Mar', count: 178 },
  { month: 'Apr', count: 161 },
  { month: 'May', count: 210 },
  { month: 'Jun', count: 195 },
];

export const examDonut = [
  { name: 'Distinction (70%+)', value: 2846 },
  { name: 'Credit (60-69%)', value: 4235 },
  { name: 'Pass (50-59%)', value: 5678 },
  { name: 'Fail (<50%)', value: 2630 },
];

export const surveyDataSubmissions = [
  { month: 'Week 1', submissions: 440 },
  { month: 'Week 2', submissions: 690 },
  { month: 'Week 3', submissions: 790 },
  { month: 'Week 4', submissions: 785 },
  { month: 'Week 5', submissions: 665 },
];

export const reportsGeneratedByMonth = [
  { month: 'Jan', reports: 390 },
  { month: 'Feb', reports: 470 },
  { month: 'Mar', reports: 520 },
  { month: 'Apr', reports: 610 },
  { month: 'May', reports: 720 },
];

export const resultGenSummary = {
  totalExamRecords: 15389,
  resultsGenerated: 1120,
  resultsPending: 130,
  passedCandidates: 8759,
  failedCandidates: 2630,
  averageScore: 68,
};

export const resultGenDonut = [
  { name: 'Generated', value: 1120 },
  { name: 'Pending', value: 130 },
  { name: 'Failed', value: 70 },
];

export const roleDistribution = [
  { name: 'Super Admin', value: 6 },
  { name: 'Admin', value: 18 },
  { name: 'Registry Officer', value: 34 },
  { name: 'Examiner', value: 28 },
  { name: 'Certification Officer', value: 20 },
  { name: 'Data Officer', value: 22 },
];

export const roleDistributionColors = [
  '#16a34a',
  '#2563eb',
  '#f59e0b',
  '#8b5cf6',
  '#94a3b8',
  '#0f766e',
];
