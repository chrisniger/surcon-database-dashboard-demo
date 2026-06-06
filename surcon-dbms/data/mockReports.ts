export type Report = {
  id: string;
  title: string;
  type: string;
  generatedBy: string;
  dateGenerated: string;
  period: string;
  recordCount: number;
};

export const reportTypes = [
  'Registered Surveyors Report',
  'Certification Report',
  'Examination Result Report',
  'Survey Data Report',
  'Document Upload Report',
  'User Activity Report',
];

export const mockReports: Report[] = [
  { id: '1', title: 'Q1 2025 Registered Surveyors', type: 'Registered Surveyors Report', generatedBy: 'Admin', dateGenerated: '2025-04-02', period: 'Jan - Mar 2025', recordCount: 1240 },
  { id: '2', title: 'April 2025 Certifications', type: 'Certification Report', generatedBy: 'Certification Officer', dateGenerated: '2025-05-01', period: 'April 2025', recordCount: 318 },
  { id: '3', title: 'May/June 2025 Exam Results', type: 'Examination Result Report', generatedBy: 'Exam Officer', dateGenerated: '2025-05-10', period: 'May/June 2025', recordCount: 520 },
  { id: '4', title: 'Survey Data Q1 2025', type: 'Survey Data Report', generatedBy: 'Data Officer', dateGenerated: '2025-04-05', period: 'Jan - Mar 2025', recordCount: 890 },
  { id: '5', title: 'Document Upload Log April', type: 'Document Upload Report', generatedBy: 'Admin', dateGenerated: '2025-05-02', period: 'April 2025', recordCount: 1120 },
  { id: '6', title: 'User Activity Q1 2025', type: 'User Activity Report', generatedBy: 'Super Admin', dateGenerated: '2025-04-03', period: 'Jan - Mar 2025', recordCount: 4520 },
];

export const analyticsData = {
  stateDistribution: [
    { state: 'Lagos', count: 2840 },
    { state: 'Abuja', count: 1620 },
    { state: 'Kano', count: 1380 },
    { state: 'Rivers', count: 1120 },
    { state: 'Enugu', count: 980 },
    { state: 'Ogun', count: 870 },
    { state: 'Others', count: 3758 },
  ],
  passFailRate: [
    { name: 'Pass', value: 71 },
    { name: 'Fail', value: 29 },
  ],
  certStatusDist: [
    { name: 'Active', value: 6210 },
    { name: 'Pending', value: 1340 },
    { name: 'Expired', value: 1050 },
    { name: 'Revoked', value: 142 },
  ],
  monthlyActivity: [
    { month: 'Jan', surveys: 85, documents: 230, imports: 45 },
    { month: 'Feb', surveys: 92, documents: 198, imports: 38 },
    { month: 'Mar', surveys: 110, documents: 275, imports: 52 },
    { month: 'Apr', surveys: 98, documents: 310, imports: 61 },
    { month: 'May', surveys: 125, documents: 340, imports: 70 },
    { month: 'Jun', surveys: 118, documents: 290, imports: 58 },
  ],
};
