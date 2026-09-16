export interface FacultyInfo {
  slNo: number;
  subCode: string;
  subName: string;
  facultyName: string;
  mobileNo: string;
  email: string;
}

export interface DaySchedule {
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
  // Slots: Period 1 (08:45-09:40), Period 2 (09:40-10:35),
  // [TEA BREAK 10:35-10:50]
  // Period 3 (10:50-11:45), Period 4 (11:45-12:40),
  // [LUNCH BREAK 12:40-01:40]
  // Period 5 (01:40-02:35), Period 6 (02:35-03:30), Period 7 (03:30-04:25), Period 8 (04:25-05:20)
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  p6: string;
  p7: string;
  p8: string;
}

export interface SectionTimetable {
  section: string;
  cycle: 'physics' | 'chemistry';
  cycleName: string;
  branch: string;
  classTeacher: string;
  roomNo: string;
  academicYear: string;
  institution: string;
  documentRef: string;
  schedule: DaySchedule[];
  faculty: FacultyInfo[];
}

export const TIME_SLOTS = [
  { id: 'p1', label: '08:45 - 09:40', short: '08:45-09:40' },
  { id: 'p2', label: '09:40 - 10:35', short: '09:40-10:35' },
  { id: 'tea', label: '10:35 - 10:50', short: 'TEA BREAK', isBreak: true },
  { id: 'p3', label: '10:50 - 11:45', short: '10:50-11:45' },
  { id: 'p4', label: '11:45 - 12:40', short: '11:45-12:40' },
  { id: 'lunch', label: '12:40 PM - 01:40 PM', short: 'LUNCH BREAK', isBreak: true },
  { id: 'p5', label: '01:40 - 02:35', short: '01:40-02:35' },
  { id: 'p6', label: '02:35 - 03:30', short: '02:35-03:30' },
  { id: 'p7', label: '03:30 - 04:25', short: '03:30-04:25' },
  { id: 'p8', label: '04:25 - 05:20', short: '04:25-05:20' }
];

export const SUBJECT_MAP_LINKS: Record<string, string> = {
  'PHY': '/subject/first-year/1/1BPHYS102',
  'PHYSICS': '/subject/first-year/1/1BPHYS102',
  'PHY LAB': '/subject/first-year/1/1BPHYS102',
  'CHE': '/subject/first-year/2/1BCHES102',
  'CHEMISTRY': '/subject/first-year/2/1BCHES102',
  'CHE LAB': '/subject/first-year/2/1BCHES102',
  'MAT': '/subject/first-year/1/1BMATS101',
  'AI': '/subject/first-year/1/1BAIA103',
  'C PROG': '/subject/first-year/1/1BEIT105',
  'C PROG LAB': '/subject/first-year/1/1BPOPL107',
  'PYTHON': '/subject/first-year/2/1BPLC105B',
  'IEE': '/subject/first-year/2/1BESC104B',
  'IEC': '/subject/first-year/1/1BESC104C',
  'CAED TH': '/subject/first-year/1/1BCEDS103',
  'CAED LAB': '/subject/first-year/1/1BCEDS103',
  'IDT': '/subject/first-year/1/1BIDTL158',
  'C SKILL': '/subject/first-year/2/1BENG106',
  'IC': '/subject/first-year/2/1BICO107',
  'KAN': '/subject/first-year/1/1BKSK109%2F1BKBK109',
  'SOFT SKILL': '/subject/first-year/1/1BSKS106',
  'EAE': '/subject/first-year/1/1BEAE105',
  'EIT': '/subject/first-year/1/1BESC104E',
  'EME': '/subject/first-year/1/1BEME105',
  'IME': '/subject/first-year/2/1BESC104D'
};

export const SECTIONS_TIMETABLES: Record<string, SectionTimetable> = {
  // ==================== PHYSICS CYCLE ====================
  'A': {
    section: 'A',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'CSE',
    classTeacher: 'Dr. Joydeep Roy',
    roomNo: 'AI03 4F09',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'PHY', p2: 'MAT', p3: 'IDT', p4: 'IDT', p5: 'C PROG', p6: 'C PROG', p7: 'KAN', p8: '0' },
      { day: 'TUE', p1: 'PHY LAB', p2: 'PHY LAB', p3: 'IEC', p4: 'PHY', p5: 'MAT', p6: 'MAT', p7: '0', p8: '0' },
      { day: 'WED', p1: 'IEC', p2: 'MAT', p3: 'C PROG', p4: 'PHY', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'MAT', p2: 'PHY', p3: 'C PROG', p4: 'IEC', p5: 'CAED TH', p6: 'CAED TH', p7: 'SOFT SKILL', p8: 'SOFT SKILL' },
      { day: 'FRI', p1: 'C PROG', p2: 'MAT', p3: 'SOFT SKILL', p4: 'SOFT SKILL', p5: 'CAED LAB', p6: 'CAED LAB', p7: 'CAED LAB', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus and Linear Algebra', facultyName: 'Dr. Girisha A', mobileNo: '9739760112', email: 'girish2934@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYS102', subName: 'Quantum Physics and Applications', facultyName: 'Dr. Joydeep Roy', mobileNo: '—', email: 'joydeeproy@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDS103', subName: 'Computer-Aided Engineering Drawing for CSE stream', facultyName: 'Dr.Sanman Shivakumar', mobileNo: '9886220889', email: 'sanmanshivakumar@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104C', subName: 'Introduction to Electronics & Communication Engineering', facultyName: 'Prof. V Jothi Lakshmi', mobileNo: '—', email: 'jothi3061@acharya.ac.in' },
      { slNo: 5, subCode: '1BEIT105', subName: 'Programming in C', facultyName: 'Prof. Supreetha H.H', mobileNo: '—', email: 'supreetha2743@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BPOPL107', subName: 'C Programming Lab', facultyName: 'Prof. Supreetha H.H', mobileNo: '—', email: 'supreetha2743@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'B': {
    section: 'B',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'CSE',
    classTeacher: 'Dr. Ashok Kumar Satapathy',
    roomNo: 'AI03 5F01',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'CAED LAB', p2: 'CAED LAB', p3: 'CAED LAB', p4: '0', p5: 'MAT', p6: 'MAT', p7: 'PHY', p8: '0' },
      { day: 'TUE', p1: 'C PROG', p2: 'MAT', p3: 'IDT', p4: 'IDT', p5: 'PHY LAB', p6: 'PHY LAB', p7: 'IEC', p8: '0' },
      { day: 'WED', p1: 'MAT', p2: 'C PROG', p3: 'KAN', p4: 'PHY', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'IEC', p2: 'C PROG', p3: 'PHY', p4: 'MAT', p5: 'C PROG', p6: 'C PROG', p7: 'SOFT SKILL', p8: 'SOFT SKILL' },
      { day: 'FRI', p1: 'PHY', p2: 'IEC', p3: 'SOFT SKILL', p4: 'SOFT SKILL', p5: 'CAED TH', p6: 'CAED TH', p7: 'MAT', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus and Linear Algebra', facultyName: 'Dr. Girisha A', mobileNo: '9739760112', email: 'girish2934@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYS102', subName: 'Quantum Physics and Applications', facultyName: 'Dr. Ashok Kumar Satapathy', mobileNo: '9449712165', email: 'ashokkumars@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDS103', subName: 'Computer-Aided Engineering Drawing for CSE stream', facultyName: 'Mr.Lava Kumar K S', mobileNo: '—', email: 'lavakumar@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104C', subName: 'Introduction to Electronics & Communication Engineering', facultyName: 'Mrs. V Jothi Lakshmi', mobileNo: '—', email: 'jothi3061@acharya.ac.in' },
      { slNo: 5, subCode: '1BEIT105', subName: 'Programming in C', facultyName: 'Prof. Supreetha H.H', mobileNo: '8105351817', email: 'supreetha2743@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BPOPL107', subName: 'C Programming Lab', facultyName: 'Prof. Supreetha H.H', mobileNo: '8105351817', email: 'supreetha2743@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'C': {
    section: 'C',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'CSE',
    classTeacher: 'Dr. Gokul Krishna B',
    roomNo: 'AI03 5F02',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'PHY LAB', p2: 'PHY LAB', p3: 'PHY', p4: 'C PROG', p5: 'IEC', p6: 'MAT', p7: 'MAT', p8: '0' },
      { day: 'TUE', p1: 'C PROG', p2: 'MAT', p3: 'PHY', p4: 'IEC', p5: 'CAED TH', p6: 'CAED TH', p7: 'KAN', p8: '0' },
      { day: 'WED', p1: 'MAT', p2: 'C PROG', p3: 'IDT', p4: 'IDT', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'PHY', p2: 'MAT', p3: 'SOFT SKILL', p4: 'SOFT SKILL', p5: 'C PROG', p6: 'C PROG', p7: 'IEC', p8: '0' },
      { day: 'FRI', p1: 'CAED LAB', p2: 'CAED LAB', p3: 'CAED LAB', p4: 'PHY', p5: 'SOFT SKILL', p6: 'SOFT SKILL', p7: 'MAT', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus and Linear Algebra', facultyName: 'Dr. Deepasree S Kumar', mobileNo: '8892954997', email: 'deepasreesk@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYS102', subName: 'Quantum Physics and Applications', facultyName: 'Dr. Gokul Krishna B', mobileNo: '9700354911', email: 'gokulkrishna14@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDS103', subName: 'Computer-Aided Engineering Drawing for CSE stream', facultyName: 'Mrs.Divya N C', mobileNo: '8073004494', email: 'divyanc2338@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104C', subName: 'Introduction to Electronics & Communication Engineering', facultyName: 'Mr. Kiran Kumar T', mobileNo: '—', email: 'kiran3007@acharya.ac.in' },
      { slNo: 5, subCode: '1BEIT105', subName: 'Programming in C', facultyName: 'Mrs.Akshatha Ballal', mobileNo: '9164425817', email: 'akshatha@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BPOPL107', subName: 'C Programming Lab', facultyName: 'Mrs.Akshatha Ballal', mobileNo: '9164425817', email: 'akshatha@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'D': {
    section: 'D',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'CSE',
    classTeacher: 'Prof. Arpitha H.S',
    roomNo: 'AI03 5F03',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'IEC', p2: 'MAT', p3: 'PHY LAB', p4: 'PHY LAB', p5: 'C PROG', p6: 'C PROG', p7: 'PHY', p8: '0' },
      { day: 'TUE', p1: 'CAED TH', p2: 'CAED TH', p3: 'C PROG', p4: 'PHY', p5: 'MAT', p6: 'MAT', p7: 'IEC', p8: '0' },
      { day: 'WED', p1: 'C PROG', p2: 'MAT', p3: 'IDT', p4: 'IDT', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'MAT', p2: 'PHY', p3: 'SOFT SKILL', p4: 'SOFT SKILL', p5: 'CAED LAB', p6: 'CAED LAB', p7: 'CAED LAB', p8: '0' },
      { day: 'FRI', p1: 'PHY', p2: 'IEC', p3: 'C PROG', p4: 'MAT', p5: 'SOFT SKILL', p6: 'SOFT SKILL', p7: 'KAN', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus and Linear Algebra', facultyName: 'Dr. Deepasree S Kumar', mobileNo: '8892954997', email: 'deepasreesk@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYS102', subName: 'Quantum Physics and Applications', facultyName: 'Prof. Arpitha H.S', mobileNo: '8431164576', email: 'arpitha2753@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDS103', subName: 'Computer-Aided Engineering Drawing for CSE stream', facultyName: 'Mrs.Divya N C', mobileNo: '8073004494', email: 'divyanc2338@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104C', subName: 'Introduction to Electronics & Communication Engineering', facultyName: 'Mr. Kiran Kumar T', mobileNo: '—', email: 'kiran3007@acharya.ac.in' },
      { slNo: 5, subCode: '1BEIT105', subName: 'Programming in C', facultyName: 'Mrs.Akshatha Ballal', mobileNo: '9164425817', email: 'akshatha@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BPOPL107', subName: 'C Programming Lab', facultyName: 'Mrs.Akshatha Ballal', mobileNo: '9164425817', email: 'akshatha@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'E': {
    section: 'E',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'CSE',
    classTeacher: 'Prof. Roopesh',
    roomNo: 'AI03 5F04',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'PHY', p2: 'C PROG', p3: 'MAT', p4: 'MAT', p5: 'IDT', p6: 'IDT', p7: 'IEC', p8: '0' },
      { day: 'TUE', p1: 'IEC', p2: 'PHY', p3: 'CAED TH', p4: 'CAED TH', p5: 'MAT', p6: 'C PROG', p7: 'PHY LAB', p8: 'PHY LAB' },
      { day: 'WED', p1: 'CAED LAB', p2: 'CAED LAB', p3: 'CAED LAB', p4: 'MAT', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'KAN', p2: 'MAT', p3: 'IEC', p4: 'PHY', p5: 'C PROG', p6: 'C PROG', p7: 'SOFT SKILL', p8: 'SOFT SKILL' },
      { day: 'FRI', p1: 'C PROG', p2: 'MAT', p3: 'SOFT SKILL', p4: 'SOFT SKILL', p5: 'PHY', p6: '0', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus and Linear Algebra', facultyName: 'Prof. Roopesh', mobileNo: '9591142866', email: 'roopesh2001@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYS102', subName: 'Quantum Physics and Applications', facultyName: 'Prof. Lathamani K.G', mobileNo: '—', email: 'lathamani@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDS103', subName: 'Computer-Aided Engineering Drawing for CSE stream', facultyName: 'Mr.Lava Kumar K S', mobileNo: '—', email: 'lavakumar@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104C', subName: 'Introduction to Electronics & Communication Engineering', facultyName: 'Dr. Raghunath', mobileNo: '9448794360', email: 'raghunath@acharya.ac.in' },
      { slNo: 5, subCode: '1BEIT105', subName: 'Programming in C', facultyName: 'Prof. Prashanth S P', mobileNo: '9008929445', email: 'prashanthkumarsp@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BPOPL107', subName: 'C Programming Lab', facultyName: 'Prof. Prashanth S P', mobileNo: '9008929445', email: 'prashanthkumarsp@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'F': {
    section: 'F',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'CSE',
    classTeacher: 'Prof. Aparna Rajalakshmi',
    roomNo: 'AI03 5F05',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'IEC', p2: 'MAT', p3: 'C PROG', p4: 'C PROG', p5: 'CAED TH', p6: 'CAED TH', p7: 'PHY', p8: '0' },
      { day: 'TUE', p1: 'CAED LAB', p2: 'CAED LAB', p3: 'CAED LAB', p4: 'C PROG', p5: 'IDT', p6: 'IDT', p7: 'MAT', p8: '0' },
      { day: 'WED', p1: 'PHY LAB', p2: 'PHY LAB', p3: 'MAT', p4: 'PHY', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'C PROG', p2: 'IEC', p3: 'SOFT SKILL', p4: 'SOFT SKILL', p5: 'PHY', p6: 'MAT', p7: 'MAT', p8: '0' },
      { day: 'FRI', p1: 'MAT', p2: 'PHY', p3: 'SOFT SKILL', p4: 'SOFT SKILL', p5: 'C PROG', p6: 'KAN', p7: 'IEC', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus and Linear Algebra', facultyName: 'Prof. Roopesh', mobileNo: '—', email: 'roopesh2001@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYS102', subName: 'Quantum Physics and Applications', facultyName: 'Dr. Mahesh S S', mobileNo: '—', email: 'Maheshss@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDS103', subName: 'Computer-Aided Engineering Drawing for CSE stream', facultyName: 'Prof. Sibin Raj', mobileNo: '9655721006', email: 'sibinraj@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104C', subName: 'Introduction to Electronics & Communication Engineering', facultyName: 'Mrs. Radhika', mobileNo: '—', email: 'radhika_1144@acharya.ac.in' },
      { slNo: 5, subCode: '1BEIT105', subName: 'Programming in C', facultyName: 'Prof. Prashanth S P', mobileNo: '—', email: 'prashanthkumarsp@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BPOPL107', subName: 'C Programming Lab', facultyName: 'Prof. Prashanth S P', mobileNo: '—', email: 'prashanthkumarsp@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'G': {
    section: 'G',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'AIML',
    classTeacher: 'Dr. Tejaskumar R',
    roomNo: 'AI03 5F06',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'C PROG', p2: '0', p3: 'IDT', p4: 'IDT', p5: 'PHY LAB', p6: 'PHY LAB', p7: 'MAT', p8: '0' },
      { day: 'TUE', p1: 'CAED TH', p2: 'CAED TH', p3: 'MAT', p4: 'KAN', p5: 'PHY', p6: 'C PROG', p7: 'C PROG', p8: '0' },
      { day: 'WED', p1: 'MAT', p2: 'PHY', p3: 'IEC', p4: '0', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'CAED LAB', p2: 'CAED LAB', p3: 'CAED LAB', p4: 'PHY', p5: 'MAT', p6: 'IEC', p7: 'SOFT SKILL', p8: 'SOFT SKILL' },
      { day: 'FRI', p1: 'IEC', p2: 'PHY', p3: 'MAT', p4: 'MAT', p5: 'C PROG', p6: 'C PROG', p7: 'SOFT SKILL', p8: 'SOFT SKILL' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus and Linear Algebra', facultyName: 'Dr. Tejaskumar R', mobileNo: '7899876016', email: 'tejaskumar2990@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYS102', subName: 'Quantum Physics and Applications', facultyName: 'Dr. Kavyashree D', mobileNo: '9740466584', email: 'kavyashreed@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDS103', subName: 'Computer-Aided Engineering Drawing for CSE stream', facultyName: 'Mr.Ashwin A', mobileNo: '9686347633', email: 'ashwin3019@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104C', subName: 'Introduction to Electronics & Communication Engineering', facultyName: 'Mrs. V Jothi Lakshmi', mobileNo: '—', email: 'jothi3061@acharya.ac.in' },
      { slNo: 5, subCode: '1BEIT105', subName: 'Programming in C', facultyName: 'Prof. Sanjay P', mobileNo: '9551955525', email: 'sanjayp3032@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BPOPL107', subName: 'C Programming Lab', facultyName: 'Prof. Chalasani Jayanth', mobileNo: '6301264634', email: 'chalasanijayanth@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'H': {
    section: 'H',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'AIML',
    classTeacher: 'Dr. Sarveshachandra',
    roomNo: 'AI03 5F08',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'CAED TH', p2: 'CAED TH', p3: 'C PROG', p4: 'PHY', p5: 'MAT', p6: 'MAT', p7: 'IEC', p8: '0' },
      { day: 'TUE', p1: 'MAT', p2: 'PHY', p3: 'IDT', p4: 'IDT', p5: 'CAED LAB', p6: 'CAED LAB', p7: 'CAED LAB', p8: '0' },
      { day: 'WED', p1: 'C PROG', p2: 'MAT', p3: 'PHY LAB', p4: 'PHY LAB', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'IEC', p2: 'MAT', p3: 'PHY', p4: 'C PROG', p5: 'SOFT SKILL', p6: 'SOFT SKILL', p7: 'KAN', p8: '0' },
      { day: 'FRI', p1: '0', p2: 'MAT', p3: 'PHY', p4: 'IEC', p5: 'C PROG', p6: 'C PROG', p7: 'SOFT SKILL', p8: 'SOFT SKILL' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus and Linear Algebra', facultyName: 'Dr. Tejaskumar R', mobileNo: '7899876016', email: 'tejaskumar2990@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYS102', subName: 'Quantum Physics and Applications', facultyName: 'Dr.Sarveshachandra', mobileNo: '9945844294', email: 'sarveshchandra1997@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDS103', subName: 'Computer-Aided Engineering Drawing for CSE stream', facultyName: 'Mr.Ashwin A', mobileNo: '9686347633', email: 'ashwin3019@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104C', subName: 'Introduction to Electronics & Communication Engineering', facultyName: 'Mr. Kiran Kumar T', mobileNo: '—', email: 'kiran3007@acharya.ac.in' },
      { slNo: 5, subCode: '1BEIT105', subName: 'Programming in C', facultyName: 'Prof. Abhijith S', mobileNo: '9495906524', email: 'abhijith@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BPOPL107', subName: 'C Programming Lab', facultyName: 'Prof. Abhijith S', mobileNo: '9495906524', email: 'abhijith@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'I': {
    section: 'I',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'AE (Aeronautical)',
    classTeacher: 'Dr. Vasanthakumar M S',
    roomNo: 'AI03 3F19',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'CAED LAB', p2: 'CAED LAB', p3: 'CAED LAB', p4: 'EAE', p5: 'PHY', p6: 'MAT', p7: 'MAT', p8: 'EIT' },
      { day: 'TUE', p1: '0', p2: 'MAT', p3: 'IDT', p4: 'IDT', p5: 'PHY', p6: '0', p7: '0', p8: '0' },
      { day: 'WED', p1: 'EIT', p2: 'KAN', p3: 'MAT', p4: 'PHY', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'B1 PHY LAB/B2 EAE LAB', p2: 'B1 PHY LAB/B2 EAE LAB', p3: 'EAE', p4: 'MAT', p5: 'SOFT SKILL', p6: 'SOFT SKILL', p7: 'PHY', p8: 'EIT' },
      { day: 'FRI', p1: 'CAED TH', p2: 'CAED TH', p3: 'EAE', p4: 'MAT', p5: 'SOFT SKILL', p6: 'SOFT SKILL', p7: 'B2 PHY LAB/B1 EAE LAB', p8: 'B2 PHY LAB/B1 EAE LAB' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATM101', subName: 'Differential Calculus and Linear Algebra', facultyName: 'Dr. Rajanna K R', mobileNo: '9845475725', email: 'rajanna@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYM102', subName: 'Physics of Materials', facultyName: 'Dr. Vasanthakumar M S', mobileNo: '9945755235', email: 'msvasanth@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDM103', subName: 'Computer-Aided Engineering Drawing for ME stream', facultyName: 'Mr.Vinod Kumar C S', mobileNo: '9738413885', email: 'vinodkumarcs@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104E', subName: 'Essentials of Information Technology', facultyName: 'Prof. Anmol R J', mobileNo: '9901541729', email: 'anmolraju@acharya.ac.in' },
      { slNo: 5, subCode: '1BEAE105', subName: 'Elements of Aeronautical Engineering', facultyName: 'Prof. Anmol R J', mobileNo: '9901541729', email: 'anmolraju@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BEAEL107', subName: 'Elements of Aeronautica Engineering Lab', facultyName: 'Prof. Anmol R J', mobileNo: '9901541729', email: 'anmolraju@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'J': {
    section: 'J',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'AS (Aerospace)',
    classTeacher: 'Dr. Melvin Varghese',
    roomNo: 'AI03 5F09',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'KAN', p2: 'EAE', p3: 'PHY', p4: 'EIT', p5: 'MAT', p6: 'MAT', p7: '0', p8: '0' },
      { day: 'TUE', p1: 'CAED LAB', p2: 'CAED LAB', p3: 'CAED LAB', p4: '0', p5: 'MAT', p6: 'EAE', p7: 'PHY', p8: '0' },
      { day: 'WED', p1: 'PHY', p2: 'MAT', p3: 'IDT', p4: 'IDT', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'EIT', p2: 'MAT', p3: 'PHY', p4: 'EAE', p5: 'SOFT SKILL', p6: 'SOFT SKILL', p7: 'B1 PHY LAB/B2 EAE LAB', p8: 'B1 PHY LAB/B2 EAE LAB' },
      { day: 'FRI', p1: 'B2 PHY LAB/B1 EAE LAB', p2: 'B2 PHY LAB/B1 EAE LAB', p3: 'MAT', p4: 'EIT', p5: 'CAED TH', p6: 'CAED TH', p7: 'SOFT SKILL', p8: 'SOFT SKILL' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATM101', subName: 'Differential Calculus and Linear Algebra', facultyName: 'Dr. Melvin Varghese', mobileNo: '8089757501', email: 'melvin15@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYM102', subName: 'Physics of Materials', facultyName: 'Dr. Inchara', mobileNo: '9480323893', email: 'incharahegde9@gmail.com' },
      { slNo: 3, subCode: '1BCEDM103', subName: 'Computer-Aided Engineering Drawing for ME stream', facultyName: 'Prajwal Sandyal', mobileNo: '9900300822', email: 'prajwalsandyal@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104E', subName: 'Essentials of Information Technology', facultyName: 'Dr. Pramod S Chingari', mobileNo: '8748090979', email: 'pramod2001@acharya.ac.in' },
      { slNo: 5, subCode: '1BEAE105', subName: 'Elements of Aeronautical Engineering', facultyName: 'Dr. Pramod S Chingari', mobileNo: '8748090979', email: 'pramod2001@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BEAEL107', subName: 'Elements of Aeronautica Engineering Lab', facultyName: 'Dr. Pramod S Chingari', mobileNo: '—', email: 'pramod2001@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'K': {
    section: 'K',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'MT (Mechatronics)',
    classTeacher: 'Prof. Manoj S.P',
    roomNo: 'AI03 3F05',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'EME', p2: 'MAT', p3: 'IDT', p4: 'IDT', p5: 'PHY', p6: 'EIT', p7: '0', p8: '0' },
      { day: 'TUE', p1: 'EIT', p2: 'MAT', p3: 'CAED TH', p4: 'CAED TH', p5: 'PHY', p6: 'KAN', p7: 'EME', p8: '0' },
      { day: 'WED', p1: 'CAED LAB', p2: 'CAED LAB', p3: 'CAED LAB', p4: 'MAT', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'B1 PHY LAB/B2 EME LAB', p2: 'B1 PHY LAB/B2 EME LAB', p3: 'SOFT SKILL', p4: 'SOFT SKILL', p5: 'PHY', p6: 'MAT', p7: 'EIT', p8: '0' },
      { day: 'FRI', p1: 'MAT', p2: 'MAT', p3: 'PHY', p4: 'EME', p5: 'SOFT SKILL', p6: 'SOFT SKILL', p7: 'B2 PHY LAB/B1 EME LAB', p8: 'B2 PHY LAB/B1 EME LAB' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATM101', subName: 'Differential Calculus and Linear Algebra', facultyName: 'Dr. T Rami Reddy', mobileNo: '9620418864', email: 'ramireddyt@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYM102', subName: 'Physics of Materials', facultyName: 'Prof. Manoj S.P', mobileNo: '8951205505', email: 'manojsp3021@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDM103', subName: 'Computer-Aided Engineering Drawing for ME stream', facultyName: 'Dr.Nagaraja K C', mobileNo: '9741344378', email: 'nagarajakc@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104E', subName: 'Essentials of Information Technology', facultyName: 'Prof. Sandeep K', mobileNo: '—', email: 'sandeepk@acharya.ac.in' },
      { slNo: 5, subCode: '1BEME105', subName: 'Elements of Mechanical Engineering', facultyName: 'Prof. Sandeep K', mobileNo: '—', email: 'sandeepk@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BEMEL107', subName: 'Elements of Mechanical Engineering Lab', facultyName: 'Prof. Sandeep K', mobileNo: '—', email: 'sandeepk@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'L': {
    section: 'L',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'ME (Mechanical)',
    classTeacher: 'Dr. Archana M A',
    roomNo: 'AI03 3F02',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'EIT', p2: 'MAT', p3: 'PHY', p4: 'EME', p5: 'IDT', p6: 'IDT', p7: '0', p8: '0' },
      { day: 'TUE', p1: 'MAT', p2: 'EME', p3: 'EIT', p4: 'PHY', p5: 'CAED TH', p6: 'CAED TH', p7: '0', p8: '0' },
      { day: 'WED', p1: 'PHY', p2: 'MAT', p3: 'SOFT SKILL', p4: 'SOFT SKILL', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'CAED LAB', p2: 'CAED LAB', p3: 'CAED LAB', p4: 'KAN', p5: 'MAT', p6: 'MAT', p7: 'B1 PHY LAB/B2 EME LAB', p8: 'B1 PHY LAB/B2 EME LAB' },
      { day: 'FRI', p1: 'B2 PHY LAB/B1 EME LAB', p2: 'B2 PHY LAB/B1 EME LAB', p3: 'MAT', p4: 'EIT', p5: 'EME', p6: 'PHY', p7: 'SOFT SKILL', p8: 'SOFT SKILL' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATM101', subName: 'Differential Calculus and Linear Algebra', facultyName: 'Dr. Archana M A', mobileNo: '8762500458', email: 'archana@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYM102', subName: 'Physics of Materials', facultyName: 'Prof. Manoj S.P', mobileNo: '8951205505', email: 'manojsp3021@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDM103', subName: 'Computer-Aided Engineering Drawing for ME stream', facultyName: 'Mr. Raju M G', mobileNo: '9902098906', email: 'rajumg@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104E', subName: 'Essentials of Information Technology', facultyName: 'Prof. Akshaya Simha', mobileNo: '—', email: 'akshaya@acharya.ac.in' },
      { slNo: 5, subCode: '1BEME105', subName: 'Elements of Mechanical Engineering', facultyName: 'Prof. Athith D', mobileNo: '9449329093', email: 'athithd@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BEMEL107', subName: 'Elements of Mechanical Engineering Lab', facultyName: 'Prof. Sibin', mobileNo: '9655721006', email: 'sibinraj@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  'M': {
    section: 'M',
    cycle: 'physics',
    cycleName: 'PHYSICS CYCLE 2026-27',
    branch: 'ROAI (Robotics & AI)',
    classTeacher: 'Prof. Lakshmipathi C.M',
    roomNo: 'AI03 3F18',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'EIT', p2: 'PHY', p3: 'MAT', p4: 'EME', p5: 'CAED LAB', p6: 'CAED LAB', p7: 'CAED LAB', p8: '0' },
      { day: 'TUE', p1: 'EME', p2: 'EIT', p3: 'PHY', p4: 'MAT', p5: 'IDT', p6: 'IDT', p7: '0', p8: '0' },
      { day: 'WED', p1: 'MAT', p2: 'PHY', p3: 'SOFT SKILL', p4: 'SOFT SKILL', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'PHY', p2: 'MAT', p3: 'B1 PHY LAB/B2 EME LAB', p4: 'B1 PHY LAB/B2 EME LAB', p5: 'SOFT SKILL', p6: 'SOFT SKILL', p7: 'EME', p8: '0' },
      { day: 'FRI', p1: 'CAED TH', p2: 'CAED TH', p3: 'B2 PHY LAB/B1 EME LAB', p4: 'B2 PHY LAB/B1 EME LAB', p5: 'EIT', p6: 'MAT', p7: 'MAT', p8: 'KAN' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATM101', subName: 'Differential Calculus and Linear Algebra', facultyName: 'Dr. Archana M A', mobileNo: '8762500458', email: 'archana@acharya.ac.in' },
      { slNo: 2, subCode: '1BPHYM102', subName: 'Physics of Materials', facultyName: 'Dr. Vasanthakumar M S', mobileNo: '9945755235', email: 'msvasanth@acharya.ac.in' },
      { slNo: 3, subCode: '1BCEDM103', subName: 'Computer-Aided Engineering Drawing for ME stream', facultyName: 'Dr.Shashikala A', mobileNo: '8970343926', email: 'shashikalaa@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104E', subName: 'Essentials of Information Technology', facultyName: 'Dr. Kiran Kumar', mobileNo: '—', email: 'kirankumar1990@acharya.ac.in' },
      { slNo: 5, subCode: '1BEME105', subName: 'Elements of Mechanical Engineering', facultyName: 'Chethan Kumar N', mobileNo: '—', email: 'chethan14@acharya.ac.in' },
      { slNo: 6, subCode: '1BSKS106', subName: 'Soft Skill', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 7, subCode: '1BEMEL107', subName: 'Elements of Mechanical Engineering Lab', facultyName: 'Chethan Kumar N', mobileNo: '—', email: 'chethan14@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' },
      { slNo: 9, subCode: '1BKSK109 / 1BKBK109', subName: 'Samskrutika Kannada / Balake Kannada', facultyName: 'Prof. Lakshmipathi C.M', mobileNo: '—', email: 'lakshmipathi@acharya.ac.in' }
    ]
  },

  // ==================== CHEMISTRY CYCLE ====================
  'N': {
    section: 'N',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'ISE',
    classTeacher: 'Dr. Md. Samiul Haque',
    roomNo: 'AI03 3F08',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'AI', p2: 'CHE', p3: 'C SKILL', p4: 'C SKILL', p5: 'MAT', p6: 'MAT', p7: 'PYTHON', p8: '0' },
      { day: 'TUE', p1: 'MAT', p2: 'AI', p3: 'PYTHON', p4: 'IEE', p5: 'C SKILL', p6: 'C SKILL', p7: 'IC', p8: '0' },
      { day: 'WED', p1: 'IEE', p2: 'CHE', p3: 'PYTHON', p4: 'MAT', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'CHE', p2: 'AI', p3: 'MAT', p4: 'IEE', p5: 'PYTHON', p6: 'PYTHON', p7: '0', p8: '0' },
      { day: 'FRI', p1: 'CHE LAB', p2: 'CHE LAB', p3: 'IDT', p4: 'IDT', p5: 'CHE', p6: 'MAT', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus And Linear Algebra', facultyName: 'Dr. Md. Samiul Haque', mobileNo: '7676032002', email: 'samiullah@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHES102', subName: 'Applied Chemistry for Smart Systems', facultyName: 'Dr. Harish M N K', mobileNo: '9449951092', email: 'harishmnk@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Prof. Vinutha Raghu', mobileNo: '—', email: 'vinutha2776@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104B', subName: 'Introduction to Electrical Engineering', facultyName: 'Mr.Madhusudhan S', mobileNo: '—', email: 'madhusudhans@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105B', subName: 'Introduction to Python Programming', facultyName: 'Prof. Geethalakshmi N M', mobileNo: '—', email: 'geethalakshmi-@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  },

  'O': {
    section: 'O',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'ISE',
    classTeacher: 'Prof. Geethalakshmi N M',
    roomNo: 'AI03 3F09',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'MAT', p2: 'CHE', p3: 'C SKILL', p4: 'C SKILL', p5: 'CHE LAB', p6: 'CHE LAB', p7: 'AI', p8: '0' },
      { day: 'TUE', p1: 'CHE', p2: 'IEE', p3: 'IC', p4: 'MAT', p5: 'C SKILL', p6: 'C SKILL', p7: 'PYTHON', p8: '0' },
      { day: 'WED', p1: 'AI', p2: 'IEE', p3: 'MAT', p4: 'PYTHON', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'IEE', p2: 'PYTHON', p3: 'IDT', p4: 'IDT', p5: 'MAT', p6: 'MAT', p7: 'CHE', p8: '0' },
      { day: 'FRI', p1: 'PYTHON', p2: 'PYTHON', p3: 'MAT', p4: 'CHE', p5: 'AI', p6: '0', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus And Linear Algebra', facultyName: 'Dr. Md. Samiul Haque', mobileNo: '7676032002', email: 'samiullah@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHES102', subName: 'Applied Chemistry for Smart Systems', facultyName: 'Dr. Muthukumar C', mobileNo: '—', email: 'muthu@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Prof. Vinutha Raghu', mobileNo: '—', email: 'vinutha2776@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104B', subName: 'Introduction to Electrical Engineering', facultyName: 'Mr.Madhusudhan S', mobileNo: '—', email: 'madhusudhans@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105B', subName: 'Introduction to Python Programming', facultyName: 'Prof. Geethalakshmi N M', mobileNo: '—', email: 'geethalakshmi-@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  },

  'P': {
    section: 'P',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'ISE',
    classTeacher: 'Mrs. Anitha R somashekar',
    roomNo: 'AI03 3F20',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: '0', p2: 'IEE', p3: 'CHE LAB', p4: 'CHE LAB', p5: 'C SKILL', p6: 'C SKILL', p7: 'PYTHON', p8: 'AI' },
      { day: 'TUE', p1: 'IC', p2: 'CHE', p3: 'C SKILL', p4: 'C SKILL', p5: 'MAT', p6: 'MAT', p7: '0', p8: '0' },
      { day: 'WED', p1: 'CHE', p2: 'AI', p3: 'MAT', p4: 'PYTHON', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'MAT', p2: 'CHE', p3: 'PYTHON', p4: 'PYTHON', p5: 'IEE', p6: '0', p7: 'MAT', p8: '0' },
      { day: 'FRI', p1: 'PYTHON', p2: 'CHE', p3: 'IEE', p4: 'MAT', p5: 'IDT', p6: 'IDT', p7: 'AI', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus And Linear Algebra', facultyName: 'Prof. Anitha R Somshekar', mobileNo: '9164077561', email: 'anitharsomashekar@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHES102', subName: 'Applied Chemistry for Smart Systems', facultyName: 'Dr. Satish K', mobileNo: '9591976939', email: 'satishk@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Prof. Praveen Arokiaraj', mobileNo: '—', email: 'praveen_1087@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104B', subName: 'Introduction to Electrical Engineering', facultyName: 'Mr.Madhusudhan S', mobileNo: '—', email: 'madhusudhans@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105B', subName: 'Introduction to Python Programming', facultyName: 'Prof. Pusphalatha K S', mobileNo: '—', email: 'pushpalatha2391@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  },

  'Q': {
    section: 'Q',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'ISE',
    classTeacher: 'Mrs. Aswini H P',
    roomNo: 'AI03 4F01',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'PYTHON', p2: 'PYTHON', p3: 'AI', p4: 'MAT', p5: 'C SKILL', p6: 'C SKILL', p7: 'CHE', p8: 'IEE' },
      { day: 'TUE', p1: 'IC', p2: 'PYTHON', p3: 'C SKILL', p4: 'C SKILL', p5: 'MAT', p6: 'CHE LAB', p7: 'CHE LAB', p8: '0' },
      { day: 'WED', p1: 'IDT', p2: 'IDT', p3: 'CHE', p4: 'MAT', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'CHE', p2: 'IEE', p3: 'AI', p4: 'PYTHON', p5: 'MAT', p6: 'MAT', p7: '0', p8: '0' },
      { day: 'FRI', p1: 'MAT', p2: 'IEE', p3: 'PYTHON', p4: 'CHE', p5: 'AI', p6: '0', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus And Linear Algebra', facultyName: 'Mrs. Aswini H P', mobileNo: '9738766944', email: 'ashwinihp@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHES102', subName: 'Applied Chemistry for Smart Systems', facultyName: 'Prof. Viswanatha H M', mobileNo: '7483066717', email: 'viswanatha2727@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Prof. Praveen Arokiaraj', mobileNo: '—', email: 'praveen_1087@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104B', subName: 'Introduction to Electrical Engineering', facultyName: 'Mr.Murali Krishna', mobileNo: '—', email: 'murali2533@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105B', subName: 'Introduction to Python Programming', facultyName: 'Prof. Geethalakshmi N M', mobileNo: '—', email: 'geethalakshmi-@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  },

  'R': {
    section: 'R',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'DS',
    classTeacher: 'Dr. Najbul Hoque',
    roomNo: 'AI03 4F02',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'IEE', p2: 'AI', p3: 'C SKILL', p4: 'C SKILL', p5: 'MAT', p6: 'PYTHON', p7: 'CHE', p8: '0' },
      { day: 'TUE', p1: 'MAT', p2: 'AI', p3: 'CHE LAB', p4: 'CHE LAB', p5: 'CHE', p6: 'PYTHON', p7: 'C SKILL', p8: 'C SKILL' },
      { day: 'WED', p1: 'CHE', p2: 'PYTHON', p3: 'IC', p4: 'MAT', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'IEE', p2: 'MAT', p3: 'CHE', p4: '0', p5: 'AI', p6: 'PYTHON', p7: 'PYTHON', p8: '0' },
      { day: 'FRI', p1: 'MAT', p2: 'MAT', p3: 'IDT', p4: 'IDT', p5: 'IEE', p6: '0', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus And Linear Algebra', facultyName: 'Prof. Anitha R Somshekar', mobileNo: '9164077561', email: 'anitharsomashekar@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHES102', subName: 'Applied Chemistry for Smart Systems', facultyName: 'Dr. Najbul Hoque', mobileNo: '9864270743', email: 'najbulhoque@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Prof. Praveen Arokiaraj', mobileNo: '—', email: 'praveen_1087@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104B', subName: 'Introduction to Electrical Engineering', facultyName: 'Mr.Murali Krishna', mobileNo: '—', email: 'murali2533@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105B', subName: 'Introduction to Python Programming', facultyName: 'Mr. Abhijith', mobileNo: '—', email: 'abhijith@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  },

  'S': {
    section: 'S',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'BT (Biotech)',
    classTeacher: 'Dr. Riyaz Ur Rehman A',
    roomNo: 'AI03 4F03',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'C PROG', p2: 'CHE', p3: 'C SKILL', p4: 'C SKILL', p5: 'MAT', p6: 'MAT', p7: 'AI', p8: '0' },
      { day: 'TUE', p1: 'CHE LAB', p2: 'CHE LAB', p3: 'CHE', p4: 'MAT', p5: 'C PROG', p6: 'C PROG', p7: 'C SKILL', p8: 'C SKILL' },
      { day: 'WED', p1: 'MAT', p2: 'IC', p3: 'IME', p4: 'C PROG', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'CHE', p2: 'MAT', p3: 'IDT', p4: 'IDT', p5: 'IME', p6: 'AI', p7: '0', p8: '0' },
      { day: 'FRI', p1: '0', p2: 'MAT', p3: 'AI', p4: 'C PROG', p5: 'CHE', p6: 'IME', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATS101', subName: 'Calculus And Linear Algebra', facultyName: 'Dr. Riyaz Ur Rehman A', mobileNo: '8951130058', email: 'riyaz2995@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHES102', subName: 'Applied Chemistry for Smart Systems', facultyName: 'Dr. Bebeto Rai', mobileNo: '7975082713', email: 'bebeto2992@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Prof. Praveen Arokiaraj', mobileNo: '—', email: 'praveen_1087@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104D', subName: 'Introduction to Mechnical Engineering', facultyName: 'Prof. Sibin Raj', mobileNo: '—', email: 'sibinraj@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105E', subName: 'Introduction to C Programming', facultyName: 'Prof. VaraIakshmi B.D', mobileNo: '9035850089', email: 'varalakshmi@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  },

  'T': {
    section: 'T',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'ECE',
    classTeacher: 'Dr. Hellen Antony Pushparaj',
    roomNo: 'AI03 4F05',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'CHE', p2: 'AI', p3: 'C PROG', p4: 'IEE', p5: 'MAT', p6: 'MAT', p7: 'C SKILL', p8: 'C SKILL' },
      { day: 'TUE', p1: 'IEE', p2: 'C PROG', p3: 'C SKILL', p4: 'C SKILL', p5: 'CHE', p6: 'MAT', p7: '0', p8: '0' },
      { day: 'WED', p1: 'CHE LAB', p2: 'CHE LAB', p3: 'MAT', p4: 'IC', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'MAT', p2: 'IEE', p3: 'CHE', p4: 'AI', p5: 'C PROG', p6: 'C PROG', p7: '0', p8: '0' },
      { day: 'FRI', p1: 'C PROG', p2: 'MAT', p3: 'IDT', p4: 'IDT', p5: 'AI', p6: 'CHE', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATE101', subName: 'Differential Calculus and Linear Algebra', facultyName: 'Dr. Hellen Antonypushparaj', mobileNo: '9003833035', email: 'hellen3041@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHEE102', subName: 'Applied Chemistry for Emerging Electronics and Futuristic Devices', facultyName: 'Dr. Brungesh K V', mobileNo: '9902055145', email: 'brungeshkv@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Dr. K P Nagapushpa', mobileNo: '—', email: 'nagapushpa@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104B', subName: 'Introduction to Electrical Engineering', facultyName: 'Mr. Lakshmikanth Reddy', mobileNo: '—', email: 'lakshmikanthreddy@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105E', subName: 'Introduction to C Programming', facultyName: 'Prof. VaraIakshmi B.D', mobileNo: '9035850089', email: 'varalakshmi@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  },

  'U': {
    section: 'U',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'ECE',
    classTeacher: 'Dr. Brungesh K V',
    roomNo: 'AI03 4F18',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'IEE', p2: 'MAT', p3: 'AI', p4: 'CHE', p5: 'C PROG', p6: 'C PROG', p7: 'C SKILL', p8: 'C SKILL' },
      { day: 'TUE', p1: 'CHE', p2: 'AI', p3: 'C SKILL', p4: 'C SKILL', p5: 'IEE', p6: 'MAT', p7: 'MAT', p8: '0' },
      { day: 'WED', p1: 'C PROG', p2: 'MAT', p3: 'CHE LAB', p4: 'CHE LAB', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'AI', p2: 'C PROG', p3: 'IDT', p4: 'IDT', p5: 'IC', p6: 'CHE', p7: 'MAT', p8: '0' },
      { day: 'FRI', p1: 'MAT', p2: 'IEE', p3: '0', p4: 'CHE', p5: 'C PROG', p6: '0', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATE101', subName: 'Differential Calculus and Linear Algebra', facultyName: 'Dr. Harshavardhan Harsh', mobileNo: '—', email: 'harshvardhan1976@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHEE102', subName: 'Applied Chemistry for Emerging Electronics and Futuristic Devices', facultyName: 'Dr. Brungesh K V', mobileNo: '9902055145', email: 'brungeshkv@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Dr. K P Nagapushpa', mobileNo: '—', email: 'nagapushpa@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104B', subName: 'Introduction to Electrical Engineering', facultyName: 'Mr. Lakshmikanth Reddy', mobileNo: '—', email: 'lakshmikanthreddy@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105E', subName: 'Introduction to C Programming', facultyName: 'Prof. Anitta Antony', mobileNo: '9605014603', email: 'anitta2415@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  },

  'V': {
    section: 'V',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'ECE',
    classTeacher: 'Dr. Chandrakala K B',
    roomNo: 'AI03 4F19',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'C PROG', p2: 'CHE', p3: 'IEE', p4: 'MAT', p5: 'C SKILL', p6: 'C SKILL', p7: '0', p8: '0' },
      { day: 'TUE', p1: 'MAT', p2: 'MAT', p3: 'C PROG', p4: 'IEE', p5: 'AI', p6: 'CHE', p7: 'C SKILL', p8: 'C SKILL' },
      { day: 'WED', p1: 'IEE', p2: 'AI', p3: 'MAT', p4: 'C PROG', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'CHE LAB', p2: 'CHE LAB', p3: 'IC', p4: 'MAT', p5: 'IDT', p6: 'IDT', p7: 'CHE', p8: '0' },
      { day: 'FRI', p1: 'AI', p2: 'CHE', p3: 'C PROG', p4: 'C PROG', p5: 'MAT', p6: '0', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATE101', subName: 'Differential Calculus and Linear Algebra', facultyName: 'Dr. Harshavardhan Harsh', mobileNo: '—', email: 'harshvardhan1976@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHEE102', subName: 'Applied Chemistry for Emerging Electronics and Futuristic Devices', facultyName: 'Dr. Chandrakala K B', mobileNo: '—', email: 'chandrakala3081@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Dr. K P Nagapushpa', mobileNo: '—', email: 'nagapushpa@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104B', subName: 'Introduction to Electrical Engineering', facultyName: 'Mr.Bibash Thakura', mobileNo: '—', email: 'bibhash2001@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105E', subName: 'Introduction to C Programming', facultyName: 'Prof. Anitta Antony', mobileNo: '9605014603', email: 'anitta2415@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  },

  'W': {
    section: 'W',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'ECE',
    classTeacher: 'Dr. Ram Murthy',
    roomNo: 'AI03 4F20',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'MAT', p2: 'IEE', p3: 'CHE', p4: 'C PROG', p5: 'C SKILL', p6: 'C SKILL', p7: '0', p8: '0' },
      { day: 'TUE', p1: 'C PROG', p2: 'IEE', p3: 'AI', p4: 'CHE', p5: 'MAT', p6: 'MAT', p7: 'C SKILL', p8: 'C SKILL' },
      { day: 'WED', p1: 'IDT', p2: 'IDT', p3: 'MAT', p4: 'CHE', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'CHE', p2: 'MAT', p3: 'CHE LAB', p4: 'CHE LAB', p5: 'AI', p6: 'C PROG', p7: 'IC', p8: '0' },
      { day: 'FRI', p1: 'AI', p2: 'MAT', p3: 'C PROG', p4: 'C PROG', p5: 'IEE', p6: '0', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATE101', subName: 'Differential Calculus and Linear Algebra', facultyName: 'Prof. Niranjan L', mobileNo: '7829443701', email: 'niranjan15@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHEE102', subName: 'Applied Chemistry for Emerging Electronics and Futuristic Devices', facultyName: 'Dr. Ram Murthy', mobileNo: '9972475337', email: 'rammurthy09@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Mrs. Radhika', mobileNo: '—', email: 'radhika_1144@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104B', subName: 'Introduction to Electrical Engineering', facultyName: 'Mr.Gowtham G', mobileNo: '—', email: 'gowtham2754@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105E', subName: 'Introduction to C Programming', facultyName: 'Prof.Durga Rao', mobileNo: '—', email: 'durgarao1990@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  },

  'X': {
    section: 'X',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'EEE',
    classTeacher: 'Prof. Bhagyashree B J',
    roomNo: 'AI03 3F04',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'AI', p2: 'C PROG', p3: 'CHE', p4: 'IEC', p5: 'MAT', p6: 'MAT', p7: 'C SKILL', p8: 'C SKILL' },
      { day: 'TUE', p1: 'AI', p2: 'C PROG', p3: 'MAT', p4: 'CHE', p5: 'C SKILL', p6: 'C SKILL', p7: '0', p8: '0' },
      { day: 'WED', p1: 'IEC', p2: 'CHE', p3: 'AI', p4: 'MAT', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'IC', p2: 'CHE', p3: 'MAT', p4: 'C PROG', p5: 'CHE LAB', p6: 'CHE LAB', p7: '0', p8: '0' },
      { day: 'FRI', p1: 'C PROG', p2: 'C PROG', p3: 'MAT', p4: 'IEC', p5: 'IDT', p6: 'IDT', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATE101', subName: 'Differential Calculus and Linear Algebra', facultyName: 'Prof. Niranjan L', mobileNo: '7829443701', email: 'niranjan15@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHEE102', subName: 'Applied Chemistry for Emerging Electronics and Futuristic Devices', facultyName: 'Prof. Bhagyashree B Jahagirdhar', mobileNo: '7259247485', email: 'bhagyashree_2235@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Mr.Gowtham G', mobileNo: '—', email: 'gowtham2754@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104C', subName: 'Introduction to Electronics & Communication Engineering', facultyName: 'Mrs. Radhika', mobileNo: '—', email: 'radhika_1144@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105E', subName: 'Introduction to C Programming', facultyName: 'Prof.Durga Rao', mobileNo: '—', email: 'durgarao1990@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  },

  'Y': {
    section: 'Y',
    cycle: 'chemistry',
    cycleName: 'CHEMISTRY CYCLE 2026-27',
    branch: 'CV (Civil)',
    classTeacher: 'Prof. Gayathri V',
    roomNo: 'AI03 3F01',
    academicYear: '2026-27',
    institution: 'ACHARYA INSTITUTE OF TECHNOLOGY, Soldevanahalli, Bengaluru- 560 107',
    documentRef: 'AIT/IQAC/Aca/26-27/CTT',
    schedule: [
      { day: 'MON', p1: 'CHE', p2: 'AI', p3: 'C PROG', p4: 'C PROG', p5: 'MAT', p6: 'MAT', p7: 'C SKILL', p8: 'C SKILL' },
      { day: 'TUE', p1: 'MAT', p2: 'AI', p3: 'CHE', p4: 'IME', p5: 'C SKILL', p6: 'C SKILL', p7: 'C PROG', p8: '0' },
      { day: 'WED', p1: 'C PROG', p2: 'CHE', p3: 'MAT', p4: 'IME', p5: '0', p6: '0', p7: '0', p8: '0' },
      { day: 'THU', p1: 'IC', p2: '0', p3: 'AI', p4: 'MAT', p5: 'IDT', p6: 'IDT', p7: '0', p8: '0' },
      { day: 'FRI', p1: 'IME', p2: 'MAT', p3: 'CHE', p4: 'C PROG', p5: 'CHE LAB', p6: 'CHE LAB', p7: '0', p8: '0' }
    ],
    faculty: [
      { slNo: 1, subCode: '1BMATC101', subName: 'Differential Calculus and Linear Algebra', facultyName: 'Prof. Gayathri V', mobileNo: '9108665348', email: 'gayathri3026@acharya.ac.in' },
      { slNo: 2, subCode: '1BCHEC102', subName: 'Applied Chemistry for Sustainable Structure & Material Design (CV)', facultyName: 'Dr. Biprajit Paul', mobileNo: '8961269242', email: 'biprajit@acharya.ac.in' },
      { slNo: 3, subCode: '1BAIA103', subName: 'Introduction to AI and Applications', facultyName: 'Prof. Karthik B S', mobileNo: '8971253512', email: 'karthikbs@acharya.ac.in' },
      { slNo: 4, subCode: '1BESC104D', subName: 'Introduction to Mechnical Engineering', facultyName: 'Prof. Yashwant Ray', mobileNo: '—', email: 'yashwant2000@acharya.ac.in' },
      { slNo: 5, subCode: '1BPLC105E', subName: 'Introduction to C Programming', facultyName: 'Prof. Mary D Souza', mobileNo: '—', email: 'Mary2462@acharya.ac.in' },
      { slNo: 6, subCode: '1BENG106', subName: 'Communication Skills', facultyName: 'Prof. Aparna Rajalakshmi', mobileNo: '9446712619', email: 'aparna2860@acharya.ac.in' },
      { slNo: 7, subCode: '1BICO107', subName: 'Indian Constitution & Engineering Ethics', facultyName: 'Prof. Amshumali', mobileNo: '—', email: 'amshumali@acharya.ac.in' },
      { slNo: 8, subCode: '1BIDTL158', subName: 'Innovation and Design Thinking Lab', facultyName: 'Delegated', mobileNo: '—', email: '—' }
    ]
  }
};

export const PHYSICS_SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
export const CHEMISTRY_SECTIONS = ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'];
export const ALL_SECTIONS = [...PHYSICS_SECTIONS, ...CHEMISTRY_SECTIONS];
