export type ExamRecord = {
  id: string;
  candidateName: string;
  regNo: string;
  examYear: string;
  examSession: string;
  score: number;
  grade: string;
  resultStatus: 'Pass' | 'Fail' | 'Pending' | 'Absent';
  certStatus: 'Certified' | 'Not Certified' | 'Pending';
};

function grade(score: number) {
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

function result(score: number): ExamRecord['resultStatus'] {
  if (score >= 50) return 'Pass';
  return 'Fail';
}

const names = [
  'Adebayo Olanrewaju', 'Chidinma Eze', 'Emeka Nwosu', 'Fatima Aliyu',
  'Gbenga Adeleke', 'Hauwa Bello', 'Ibrahim Musa', 'Joy Okafor',
  'Kelechi Onyekwere', 'Laila Hassan', 'Mohammed Yusuf', 'Ngozi Adu',
  'Oluwaseun Adesanya', 'Patience Okeke', 'Rilwan Abubakar', 'Samuel Igwe',
  'Taiwo Ogundimu', 'Uche Obi', 'Vivian Nnaji', 'Wale Fashola',
];

export const mockExaminations: ExamRecord[] = names.map((name, i) => {
  const score = 40 + Math.floor(((i * 37 + 11) % 61));
  return {
    id: String(i + 1),
    candidateName: name,
    regNo: `SUR/EXAM/2025/${String(400 + i).padStart(5, '0')}`,
    examYear: i < 10 ? '2025' : '2024',
    examSession: i < 10 ? 'May/June 2025' : 'Nov/Dec 2024',
    score,
    grade: grade(score),
    resultStatus: result(score),
    certStatus: score >= 60 ? 'Certified' : score >= 50 ? 'Pending' : 'Not Certified',
  };
});

export const examBatches = [
  'May/June 2025',
  'Nov/Dec 2024',
  'May/June 2024',
  'Nov/Dec 2023',
];
