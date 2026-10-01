export type Cluster = {
  id: string;
  label: string;
  cloudLabel: string;
  count: number;
  studentCount: number;
  trend?: string;
  questionCount: number;
  rawQuestions: string[];
  summary: string;
  actions: string[];
  tone: 'teal' | 'blue' | 'mint' | 'peach' | 'lime' | 'lilac';
};

export const classSession = {
  university: '서울대학교',
  name: '자료구조의 기초',
  instructor: '교수자',
  accessCode: 'DS-2401',
  date: '2026.09.09',
  participants: 87,
  submissions: 132,
  reactions: 246,
};

export const classSessionEn = {
  university: 'Seoul National University',
  name: 'Data Structures Fundamentals',
  instructor: 'Instructor',
  accessCode: 'DS-2401',
  date: '2026.09.09',
  participants: 87,
  submissions: 132,
  reactions: 246,
};

export const clusters: Cluster[] = [
  {
    id: 'lagrangian',
    label: '라그랑지안 접근',
    cloudLabel: '라그랑지안',
    count: 31,
    studentCount: 18,
    trend: '급상승',
    questionCount: 6,
    rawQuestions: [
      '왜 갑자기 라그랑지안?',
      '뉴턴으로 풀면 안 됨?',
      'L=T-V가 왜 나오는지 모르겠음',
      '일반화좌표랑 라그랑지안 연결이 안 됨',
      '이걸 쓰면 뭐가 편해지는 건가요?',
      '계산은 알겠는데 왜 이걸 골라요?',
    ],
    summary:
      '학생들은 라그랑지안의 계산 절차보다, 왜 이 문제에서 뉴턴 방식 대신 라그랑지안 접근을 선택하는지와 일반화좌표와의 연결에서 어려움을 겪고 있습니다.',
    actions: ['뉴턴 방식과 라그랑지안 방식 비교', '일반화좌표 선택 기준 설명', 'L=T-V의 물리적 의미 짚기'],
    tone: 'teal',
  },
  {
    id: 'coordinate',
    label: '일반화좌표',
    cloudLabel: '일반화좌표',
    count: 24,
    studentCount: 15,
    questionCount: 4,
    rawQuestions: [
      '일반화좌표가 정확히 뭔가요?',
      '왜 x, y 대신 theta를 쓰나요?',
      '좌표를 마음대로 정해도 되나요?',
      '자유도랑 무슨 관계인가요?',
    ],
    summary: '좌표를 새로 잡는 이유와 자유도 개념이 연결되지 않아, 기호를 바꾸는 과정 자체가 임의적으로 느껴지고 있습니다.',
    actions: ['진자 예제로 x, y와 θ 비교', '자유도부터 다시 연결', '좌표 선택의 기준 한 줄 정리'],
    tone: 'blue',
  },
  {
    id: 'constraint',
    label: '구속조건',
    cloudLabel: '구속조건',
    count: 18,
    studentCount: 11,
    questionCount: 3,
    rawQuestions: [
      '구속조건은 식에 어떻게 넣나요?',
      '제약식이 있으면 좌표 수가 왜 줄어드나요?',
      '여기서 constraint force는 고려 안 하나요?',
    ],
    summary: '제약식이 자유도를 줄이는 과정과 구속력이 식에서 어떻게 다뤄지는지에 대한 연결이 약합니다.',
    actions: ['구속조건을 그림으로 먼저 표현', '좌표 수 변화 예제 제시', '구속력 생략의 의미 보충'],
    tone: 'mint',
  },
  {
    id: 'sign',
    label: '수식 전개 부호 변화',
    cloudLabel: '부호 변화',
    count: 12,
    studentCount: 8,
    questionCount: 3,
    rawQuestions: [
      '이 줄에서 부호가 왜 바뀌나요?',
      '미분했을 때 마이너스가 왜 생기나요?',
      '전개 한 줄만 더 보여주세요.',
    ],
    summary: '풀이의 중간 생략 단계에서 미분과 정리의 부호 변화가 불연속적으로 느껴집니다.',
    actions: ['중간 전개 한 줄 더 보여주기', '부호 체크 포인트 표시', '짧은 미분 복습'],
    tone: 'peach',
  },
  {
    id: 'energy',
    label: '에너지 보존',
    cloudLabel: '에너지보존',
    count: 10,
    studentCount: 7,
    questionCount: 2,
    rawQuestions: ['에너지 보존이면 왜 이 식이 나와요?', '마찰 있으면 바로 못 쓰는 거죠?'],
    summary: '에너지 보존이 성립하는 조건과 라그랑지안의 에너지 표현이 혼재되어 있습니다.',
    actions: ['보존 조건 짧게 확인', '마찰 유무 비교', '에너지 항을 색으로 구분'],
    tone: 'lime',
  },
  {
    id: 'newton',
    label: '뉴턴방정식',
    cloudLabel: '뉴턴방정식',
    count: 8,
    studentCount: 5,
    questionCount: 2,
    rawQuestions: ['뉴턴식이 더 익숙한데 왜 안 써요?', '힘을 다 쓰면 되는 거 아닌가요?'],
    summary: '두 접근법의 선택 기준이 아직 명확히 분리되지 않았습니다.',
    actions: ['접근법 비교표 제시', '복잡한 구속의 예시 사용', '선택 기준 다시 언급'],
    tone: 'lilac',
  },
  {
    id: 'freedom',
    label: '자유도',
    cloudLabel: '자유도',
    count: 9,
    studentCount: 6,
    questionCount: 2,
    rawQuestions: ['자유도가 하나라는 건 어떻게 알아요?', '좌표 개수랑 자유도는 항상 같나요?'],
    summary: '독립적으로 정할 수 있는 변수의 수와 좌표 선택이 아직 연결되지 않았습니다.',
    actions: ['진자의 자유도부터 다시 보기', '독립 변수와 좌표 수 비교'],
    tone: 'mint',
  },
  {
    id: 'ltv',
    label: 'L=T-V',
    cloudLabel: 'L=T-V',
    count: 16,
    studentCount: 10,
    questionCount: 3,
    rawQuestions: ['L=T-V를 그냥 외우면 되나요?', 'T랑 V는 어디까지 넣는 거예요?', '왜 더하기가 아니라 빼기인가요?'],
    summary: '라그랑지안을 구성하는 두 에너지 항의 의미와 부호가 함께 헷갈리고 있습니다.',
    actions: ['T와 V를 색으로 구분', '간단한 진자에 대입', '부호의 물리적 의미 설명'],
    tone: 'peach',
  },
];

export const clustersEn: Cluster[] = [
  {
    id: 'lagrangian',
    label: 'The Lagrangian approach',
    cloudLabel: 'Lagrangian',
    count: 31,
    studentCount: 18,
    trend: 'Rising fast',
    questionCount: 6,
    rawQuestions: [
      'Why introduce the Lagrangian all of a sudden?',
      'Couldn’t we solve this with Newton’s laws?',
      'I don’t understand where L = T − V comes from.',
      'I can’t connect generalized coordinates to the Lagrangian.',
      'What becomes easier when we use this?',
      'I understand the calculation, but why choose this method?',
    ],
    summary: 'Students are struggling less with the calculation itself and more with why the Lagrangian is chosen over Newton’s method and how it connects to generalized coordinates.',
    actions: ['Compare Newtonian and Lagrangian methods', 'Explain when to choose generalized coordinates', 'Clarify the physical meaning of L = T − V'],
    tone: 'teal',
  },
  {
    id: 'coordinate',
    label: 'Generalized coordinates',
    cloudLabel: 'Generalized coordinates',
    count: 24,
    studentCount: 15,
    questionCount: 4,
    rawQuestions: [
      'What exactly is a generalized coordinate?',
      'Why use θ instead of x and y?',
      'Can we choose coordinates arbitrarily?',
      'How is this related to degrees of freedom?',
    ],
    summary: 'The reason for introducing a new coordinate system and its connection to degrees of freedom still feels arbitrary to many students.',
    actions: ['Compare x, y, and θ with a pendulum example', 'Reconnect the idea to degrees of freedom', 'Summarize how to choose coordinates'],
    tone: 'blue',
  },
  {
    id: 'constraint',
    label: 'Constraints',
    cloudLabel: 'Constraints',
    count: 18,
    studentCount: 11,
    questionCount: 3,
    rawQuestions: [
      'How do we put a constraint into the equation?',
      'Why does a constraint reduce the number of coordinates?',
      'Do we not consider the constraint force here?',
    ],
    summary: 'Students need a clearer bridge between constraints, reduced degrees of freedom, and how constraint forces appear in the equations.',
    actions: ['Draw the constraint before writing equations', 'Show how the number of coordinates changes', 'Explain when constraint forces can be omitted'],
    tone: 'mint',
  },
  {
    id: 'sign',
    label: 'Signs in the derivation',
    cloudLabel: 'Sign changes',
    count: 12,
    studentCount: 8,
    questionCount: 3,
    rawQuestions: [
      'Why does the sign change on this line?',
      'Where does the minus sign come from after differentiating?',
      'Could you show one more line of the derivation?',
    ],
    summary: 'Skipped algebraic steps make the sign changes during differentiation and simplification feel disconnected.',
    actions: ['Show one more line of the derivation', 'Mark the sign-check points', 'Review the relevant differentiation step'],
    tone: 'peach',
  },
  {
    id: 'energy',
    label: 'Energy conservation',
    cloudLabel: 'Energy conservation',
    count: 10,
    studentCount: 7,
    questionCount: 2,
    rawQuestions: ['Why does this expression follow from energy conservation?', 'If there is friction, can we still use it directly?'],
    summary: 'The conditions for energy conservation and its representation in the Lagrangian are being mixed together.',
    actions: ['Review the conservation conditions', 'Compare systems with and without friction', 'Separate the energy terms by color'],
    tone: 'lime',
  },
  {
    id: 'newton',
    label: 'Newton’s equations',
    cloudLabel: 'Newton’s equations',
    count: 8,
    studentCount: 5,
    questionCount: 2,
    rawQuestions: ['Newton’s equations feel more familiar—why not use them?', 'Isn’t listing all the forces enough?'],
    summary: 'The criteria for choosing between the two approaches are not yet clearly separated.',
    actions: ['Show a side-by-side comparison', 'Use an example with complex constraints', 'Repeat the method-selection rule'],
    tone: 'lilac',
  },
  {
    id: 'freedom',
    label: 'Degrees of freedom',
    cloudLabel: 'Degrees of freedom',
    count: 9,
    studentCount: 6,
    questionCount: 2,
    rawQuestions: ['How do we know the system has one degree of freedom?', 'Are the number of coordinates and degrees of freedom always the same?'],
    summary: 'The number of independently specifiable variables is not yet connected to the choice of coordinates.',
    actions: ['Start with a pendulum example', 'Compare independent variables and coordinates'],
    tone: 'mint',
  },
  {
    id: 'ltv',
    label: 'L = T − V',
    cloudLabel: 'L = T − V',
    count: 16,
    studentCount: 10,
    questionCount: 3,
    rawQuestions: ['Should we just memorize L = T − V?', 'Which terms belong in T and V?', 'Why is it subtraction rather than addition?'],
    summary: 'The meaning of the two energy terms and the reason for the sign are being confused together.',
    actions: ['Separate T and V by color', 'Substitute them into a simple pendulum', 'Explain the physical meaning of the sign'],
    tone: 'peach',
  },
];

export const popularQuestions = [
  { id: 'q1', text: 'L=T-V가 왜 나오는지 모르겠음', count: 21, clusterId: 'lagrangian' },
  { id: 'q2', text: '왜 x, y 대신 theta를 쓰나요?', count: 17, clusterId: 'coordinate' },
  { id: 'q3', text: '전개 한 줄만 더 보여주세요.', count: 12, clusterId: 'sign' },
];

export const popularQuestionsEn = [
  { id: 'q1', text: 'I don’t understand where L = T − V comes from.', count: 21, clusterId: 'lagrangian' },
  { id: 'q2', text: 'Why use θ instead of x and y?', count: 17, clusterId: 'coordinate' },
  { id: 'q3', text: 'Could you show one more line of the derivation?', count: 12, clusterId: 'sign' },
];

export const reportRankings = [
  '라그랑지안 접근',
  '일반화좌표',
  '구속조건',
  '수식 전개 부호 변화',
  '에너지 보존',
];

export const reportRankingsEn = [
  'The Lagrangian approach',
  'Generalized coordinates',
  'Constraints',
  'Signs in the derivation',
  'Energy conservation',
];

export function clusterById(id: string) {
  return clusters.find((cluster) => cluster.id === id) ?? clusters[0];
}
