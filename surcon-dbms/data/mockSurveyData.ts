export type SurveyRecord = {
  id: string;
  title: string;
  surveyType: string;
  location: string;
  state: string;
  submittedBy: string;
  dateSubmitted: string;
  docStatus: 'Attached' | 'Missing';
  approvalStatus: 'Approved' | 'Pending' | 'Rejected';
};

export const surveyTypes = [
  'Topographic Survey',
  'Cadastral Survey',
  'Hydrographic Survey',
  'Engineering Survey',
  'Mining Survey',
  'Geodetic Survey',
];

export const mockSurveyData: SurveyRecord[] = [
  { id: '1', title: 'Victoria Island Land Demarcation', surveyType: 'Cadastral Survey', location: 'Victoria Island, Lagos', state: 'Lagos', submittedBy: 'Adebayo Olanrewaju', dateSubmitted: '2025-05-10', docStatus: 'Attached', approvalStatus: 'Approved' },
  { id: '2', title: 'Enugu Urban Topographic Mapping', surveyType: 'Topographic Survey', location: 'GRA, Enugu', state: 'Enugu', submittedBy: 'Emeka Nwosu', dateSubmitted: '2025-05-08', docStatus: 'Attached', approvalStatus: 'Approved' },
  { id: '3', title: 'Niger Delta Waterway Survey', surveyType: 'Hydrographic Survey', location: 'Bonny Island, Rivers', state: 'Rivers', submittedBy: 'Joy Okafor', dateSubmitted: '2025-05-06', docStatus: 'Missing', approvalStatus: 'Pending' },
  { id: '4', title: 'Kano Highway Corridor Survey', surveyType: 'Engineering Survey', location: 'Kano-Kaduna Road', state: 'Kano', submittedBy: 'Fatima Aliyu', dateSubmitted: '2025-05-04', docStatus: 'Attached', approvalStatus: 'Pending' },
  { id: '5', title: 'Jos Plateau Mining Area', surveyType: 'Mining Survey', location: 'Barkin Ladi, Plateau', state: 'Plateau', submittedBy: 'Ibrahim Musa', dateSubmitted: '2025-05-01', docStatus: 'Attached', approvalStatus: 'Approved' },
  { id: '6', title: 'Abuja Federal Capital Geodetic', surveyType: 'Geodetic Survey', location: 'Garki, FCT', state: 'FCT', submittedBy: 'Oluwaseun Adesanya', dateSubmitted: '2025-04-28', docStatus: 'Attached', approvalStatus: 'Approved' },
  { id: '7', title: 'Warri Coastal Land Boundary', surveyType: 'Cadastral Survey', location: 'Warri, Delta', state: 'Delta', submittedBy: 'Ngozi Adu', dateSubmitted: '2025-04-25', docStatus: 'Missing', approvalStatus: 'Rejected' },
  { id: '8', title: 'Ibadan Urban Expansion Mapping', surveyType: 'Topographic Survey', location: 'Ring Road, Oyo', state: 'Oyo', submittedBy: 'Patience Okeke', dateSubmitted: '2025-04-20', docStatus: 'Attached', approvalStatus: 'Pending' },
];
