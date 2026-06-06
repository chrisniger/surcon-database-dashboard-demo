export type Document = {
  id: string;
  name: string;
  category: string;
  uploadedBy: string;
  linkedRecord: string;
  dateUploaded: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  fileType: 'PDF' | 'JPG' | 'PNG' | 'DOCX' | 'XLSX';
  sizeKB: number;
};

export const documentCategories = [
  'Survey Documents',
  'Examination Documents',
  'Certification Documents',
  'Identification Documents',
  'Legal/Professional Documents',
];

export const mockDocuments: Document[] = [
  { id: '1', name: 'Survey_Certificate_2025_001.pdf', category: 'Certification Documents', uploadedBy: 'Adebayo Olanrewaju', linkedRecord: 'SUR/REG/2025/00124', dateUploaded: '2025-05-10', status: 'Verified', fileType: 'PDF', sizeKB: 420 },
  { id: '2', name: 'NIN_Slip_Eze_Chidinma.jpg', category: 'Identification Documents', uploadedBy: 'Chidinma Eze', linkedRecord: 'SUR/REG/2025/00125', dateUploaded: '2025-05-09', status: 'Verified', fileType: 'JPG', sizeKB: 180 },
  { id: '3', name: 'Exam_Result_May2025_Nwosu.pdf', category: 'Examination Documents', uploadedBy: 'Admin', linkedRecord: 'SUR/EXAM/2025/00402', dateUploaded: '2025-05-08', status: 'Verified', fileType: 'PDF', sizeKB: 310 },
  { id: '4', name: 'Survey_Plan_Aliyu_F.pdf', category: 'Survey Documents', uploadedBy: 'Fatima Aliyu', linkedRecord: 'SUR/REG/2025/00127', dateUploaded: '2025-05-07', status: 'Pending', fileType: 'PDF', sizeKB: 1240 },
  { id: '5', name: 'Professional_Indemnity_Adeleke.pdf', category: 'Legal/Professional Documents', uploadedBy: 'Gbenga Adeleke', linkedRecord: 'SUR/REG/2025/00128', dateUploaded: '2025-05-06', status: 'Rejected', fileType: 'PDF', sizeKB: 560 },
  { id: '6', name: 'Practicing_License_Bello.pdf', category: 'Certification Documents', uploadedBy: 'Hauwa Bello', linkedRecord: 'SUR/REG/2025/00129', dateUploaded: '2025-05-05', status: 'Verified', fileType: 'PDF', sizeKB: 390 },
  { id: '7', name: 'Degree_Certificate_Musa.jpg', category: 'Identification Documents', uploadedBy: 'Ibrahim Musa', linkedRecord: 'SUR/REG/2025/00130', dateUploaded: '2025-05-04', status: 'Pending', fileType: 'JPG', sizeKB: 220 },
  { id: '8', name: 'Field_Survey_Report_Rivers.pdf', category: 'Survey Documents', uploadedBy: 'Joy Okafor', linkedRecord: 'SUR/REG/2025/00131', dateUploaded: '2025-05-03', status: 'Verified', fileType: 'PDF', sizeKB: 2100 },
  { id: '9', name: 'Exam_Score_Sheet_Nov2024.xlsx', category: 'Examination Documents', uploadedBy: 'Exam Officer', linkedRecord: 'SUR/EXAM/2024/BATCH', dateUploaded: '2025-04-28', status: 'Verified', fileType: 'XLSX', sizeKB: 88 },
  { id: '10', name: 'Land_Boundary_Agreement.pdf', category: 'Legal/Professional Documents', uploadedBy: 'Kelechi Onyekwere', linkedRecord: 'SUR/REG/2025/00132', dateUploaded: '2025-04-25', status: 'Pending', fileType: 'PDF', sizeKB: 750 },
];
