export type Surveyor = {
  id: string;
  name: string;
  regNo: string;
  state: string;
  category: string;
  certStatus: 'Certified' | 'Pending' | 'Expired' | 'Suspended';
  dateRegistered: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  email: string;
  phone: string;
};

export const mockSurveyors: Surveyor[] = [
  { id: '1', name: 'Adebayo Olanrewaju', regNo: 'SUR/REG/2025/00124', state: 'Lagos', category: 'Licensed Surveyor', certStatus: 'Certified', dateRegistered: '2025-01-15', status: 'Active', email: 'a.olanrewaju@email.com', phone: '0801 234 5678' },
  { id: '2', name: 'Chidinma Eze', regNo: 'SUR/REG/2025/00125', state: 'Anambra', category: 'Graduate Surveyor', certStatus: 'Pending', dateRegistered: '2025-01-20', status: 'Active', email: 'c.eze@email.com', phone: '0802 345 6789' },
  { id: '3', name: 'Emeka Nwosu', regNo: 'SUR/REG/2025/00126', state: 'Enugu', category: 'Licensed Surveyor', certStatus: 'Certified', dateRegistered: '2025-02-03', status: 'Active', email: 'e.nwosu@email.com', phone: '0803 456 7890' },
  { id: '4', name: 'Fatima Aliyu', regNo: 'SUR/REG/2025/00127', state: 'Kano', category: 'Graduate Surveyor', certStatus: 'Pending', dateRegistered: '2025-02-10', status: 'Active', email: 'f.aliyu@email.com', phone: '0804 567 8901' },
  { id: '5', name: 'Gbenga Adeleke', regNo: 'SUR/REG/2025/00128', state: 'Ogun', category: 'Senior Surveyor', certStatus: 'Expired', dateRegistered: '2024-11-05', status: 'Inactive', email: 'g.adeleke@email.com', phone: '0805 678 9012' },
  { id: '6', name: 'Hauwa Bello', regNo: 'SUR/REG/2025/00129', state: 'Kaduna', category: 'Licensed Surveyor', certStatus: 'Certified', dateRegistered: '2025-02-18', status: 'Active', email: 'h.bello@email.com', phone: '0806 789 0123' },
  { id: '7', name: 'Ibrahim Musa', regNo: 'SUR/REG/2025/00130', state: 'Katsina', category: 'Graduate Surveyor', certStatus: 'Pending', dateRegistered: '2025-03-01', status: 'Active', email: 'i.musa@email.com', phone: '0807 890 1234' },
  { id: '8', name: 'Joy Okafor', regNo: 'SUR/REG/2025/00131', state: 'Rivers', category: 'Licensed Surveyor', certStatus: 'Certified', dateRegistered: '2025-03-08', status: 'Active', email: 'j.okafor@email.com', phone: '0808 901 2345' },
  { id: '9', name: 'Kelechi Onyekwere', regNo: 'SUR/REG/2025/00132', state: 'Imo', category: 'Senior Surveyor', certStatus: 'Certified', dateRegistered: '2025-03-12', status: 'Active', email: 'k.onyekwere@email.com', phone: '0809 012 3456' },
  { id: '10', name: 'Laila Hassan', regNo: 'SUR/REG/2025/00133', state: 'Borno', category: 'Graduate Surveyor', certStatus: 'Suspended', dateRegistered: '2024-09-20', status: 'Suspended', email: 'l.hassan@email.com', phone: '0810 123 4567' },
  { id: '11', name: 'Mohammed Yusuf', regNo: 'SUR/REG/2025/00134', state: 'Sokoto', category: 'Licensed Surveyor', certStatus: 'Certified', dateRegistered: '2025-03-22', status: 'Active', email: 'm.yusuf@email.com', phone: '0811 234 5678' },
  { id: '12', name: 'Ngozi Adu', regNo: 'SUR/REG/2025/00135', state: 'Delta', category: 'Graduate Surveyor', certStatus: 'Pending', dateRegistered: '2025-04-01', status: 'Active', email: 'n.adu@email.com', phone: '0812 345 6789' },
  { id: '13', name: 'Oluwaseun Adesanya', regNo: 'SUR/REG/2025/00136', state: 'Lagos', category: 'Senior Surveyor', certStatus: 'Certified', dateRegistered: '2025-04-10', status: 'Active', email: 'o.adesanya@email.com', phone: '0813 456 7890' },
  { id: '14', name: 'Patience Okeke', regNo: 'SUR/REG/2025/00137', state: 'Abia', category: 'Licensed Surveyor', certStatus: 'Certified', dateRegistered: '2025-04-15', status: 'Active', email: 'p.okeke@email.com', phone: '0814 567 8901' },
  { id: '15', name: 'Rilwan Abubakar', regNo: 'SUR/REG/2025/00138', state: 'Niger', category: 'Graduate Surveyor', certStatus: 'Pending', dateRegistered: '2025-04-20', status: 'Active', email: 'r.abubakar@email.com', phone: '0815 678 9012' },
];

export const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];
