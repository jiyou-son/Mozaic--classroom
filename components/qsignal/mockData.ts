export type Cluster = {
  id: string;
  label: string;
  cloudLabel: string;
  count: number;
  trend?: string;
  questionCount: number;
  rawQuestions: string[];
  summary: string;
  actions: string[];
  tone: 'teal' | 'blue' | 'mint' | 'peach' | 'lime' | 'lilac';
};

export const classSession = {
  name: '공학수학 2',
  topic: '라그랑지안과 일반화좌표',
  sessionCode: 'MATH2401',
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
    questionCount: 2,
    rawQuestions: ['뉴턴식이 더 익숙한데 왜 안 써요?', '힘을 다 쓰면 되는 거 아닌가요?'],
    summary: '두 접근법의 선택 기준이 아직 명확히 분리되지 않았습니다.',
    actions: ['접근법 비교표 제시', '복잡한 구속의 예시 사용', '선택 기준 다시 언급'],
    tone: 'lilac',
  },
];

export const popularQuestions = [
  { id: 'q1', text: 'L=T-V가 왜 나오는지 모르겠음', count: 21, clusterId: 'lagrangian' },
  { id: 'q2', text: '왜 x, y 대신 theta를 쓰나요?', count: 17, clusterId: 'coordinate' },
  { id: 'q3', text: '전개 한 줄만 더 보여주세요.', count: 12, clusterId: 'sign' },
];

export const reportRankings = [
  '라그랑지안 접근',
  '일반화좌표',
  '구속조건',
  '수식 전개 부호 변화',
  '에너지 보존',
];

export function clusterById(id: string) {
  return clusters.find((cluster) => cluster.id === id) ?? clusters[0];
}
