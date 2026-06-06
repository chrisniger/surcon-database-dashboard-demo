export type Certification = {
  id: string;
  surveyorName: string;
  regNo: string;
  certType: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Pending' | 'Expired' | 'Revoked';
};

export const mockCertifications: Certification[] = [
  { id: '1', surveyorName: 'Adebayo Olanrewaju', regNo: 'SUR/REG/2025/00124', certType: 'Full Practicing Certificate', issueDate: '2025-01-20', expiryDate: '2027-01-19', status: 'Active' },
  { id: '2', surveyorName: 'Emeka Nwosu', regNo: 'SUR/REG/2025/00126', certType: 'Annual Practicing License', issueDate: '2025-02-10', expiryDate: '2026-02-09', status: 'Active' },
  { id: '3', surveyorName: 'Chidinma Eze', regNo: 'SUR/REG/2025/00125', certType: 'Provisional Certificate', issueDate: '2025-01-25', expiryDate: '2026-01-24', status: 'Pending' },
  { id: '4', surveyorName: 'Hauwa Bello', regNo: 'SUR/REG/2025/00129', certType: 'Full Practicing Certificate', issueDate: '2025-02-20', expiryDate: '2027-02-19', status: 'Active' },
  { id: '5', surveyorName: 'Gbenga Adeleke', regNo: 'SUR/REG/2025/00128', certType: 'Annual Practicing License', issueDate: '2023-11-10', expiryDate: '2024-11-09', status: 'Expired' },
  { id: '6', surveyorName: 'Kelechi Onyekwere', regNo: 'SUR/REG/2025/00132', certType: 'Full Practicing Certificate', issueDate: '2025-03-15', expiryDate: '2027-03-14', status: 'Active' },
  { id: '7', surveyorName: 'Mohammed Yusuf', regNo: 'SUR/REG/2025/00134', certType: 'Annual Practicing License', issueDate: '2025-03-25', expiryDate: '2026-03-24', status: 'Active' },
  { id: '8', surveyorName: 'Oluwaseun Adesanya', regNo: 'SUR/REG/2025/00136', certType: 'Specialist Certificate', issueDate: '2025-04-12', expiryDate: '2028-04-11', status: 'Active' },
  { id: '9', surveyorName: 'Patience Okeke', regNo: 'SUR/REG/2025/00137', certType: 'Full Practicing Certificate', issueDate: '2025-04-18', expiryDate: '2027-04-17', status: 'Active' },
  { id: '10', surveyorName: 'Laila Hassan', regNo: 'SUR/REG/2025/00133', certType: 'Provisional Certificate', issueDate: '2024-09-25', expiryDate: '2025-09-24', status: 'Revoked' },
  { id: '11', surveyorName: 'Fatima Aliyu', regNo: 'SUR/REG/2025/00127', certType: 'Provisional Certificate', issueDate: '2025-02-15', expiryDate: '2026-02-14', status: 'Pending' },
  { id: '12', surveyorName: 'Ibrahim Musa', regNo: 'SUR/REG/2025/00130', certType: 'Annual Practicing License', issueDate: '2025-03-05', expiryDate: '2026-03-04', status: 'Pending' },
];

export const certSummary = {
  total: 8742,
  active: 6210,
  pending: 1340,
  expired: 1050,
  revoked: 142,
};
