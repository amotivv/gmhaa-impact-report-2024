export interface SessionRecord {
  session_date: string;
  session_type: string[];
  funding_spend_limit: number;
  funding_status: boolean;
  visit_type: string;
  first_time: boolean;
  anon_encounter_id: string;
  user_updated: string;
  location: string;
  partner_ref: string;
  user_created: string;
  race_ethnicity: string;
  age_group: string;
  gender: string;
  client_no_show: boolean;
  refunded: boolean;
  funding_card_token: string;
  funding_need: number;
}

export async function fetchData(): Promise<SessionRecord[]> {
  const response = await fetch('https://static.amotivv.io/virtualcards_lcg_20241122-16916.json');
  return response.json();
}

export function getDashboardData(records: SessionRecord[]) {
  const totalSessions = records.length;
  const totalDisbursed = records.reduce((sum, record) => sum + record.funding_need, 0);
  const averagePerSession = Math.round(totalDisbursed / totalSessions);
  const firstTimeSessions = records.filter(record => record.first_time).length;

  return {
    totalSessions,
    totalDisbursed,
    averagePerSession,
    firstTimeSessions
  };
}

export function getMonthlyData(records: SessionRecord[]) {
  const monthlyData = records.reduce((acc, record) => {
    const date = new Date(record.session_date);
    const month = date.toLocaleString('default', { month: 'short' });
    if (!acc[month]) {
      acc[month] = { sessions: 0, dollars: 0 };
    }
    acc[month].sessions++;
    acc[month].dollars += record.funding_need;
    return acc;
  }, {} as Record<string, { sessions: number; dollars: number }>);

  return Object.entries(monthlyData).map(([month, data]) => ({
    month,
    sessions: data.sessions,
    dollars: Math.round(data.dollars)
  }));
}

export function getDemographicData(records: SessionRecord[]) {
  const sessionTypes = countPercentage(records, 'visit_type');
  const raceEthnicity = countPercentage(records, 'race_ethnicity');
  const gender = countPercentage(records, 'gender');
  const ageGroups = countPercentage(records, 'age_group');

  return {
    sessionTypes,
    raceEthnicity,
    gender,
    ageGroups
  };
}

function countPercentage(records: SessionRecord[], field: keyof SessionRecord) {
  const counts = records.reduce((acc, record) => {
    const value = record[field] as string;
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  
  return Object.entries(counts).map(([name, count]) => ({
    name,
    value: Math.round((count / total) * 100)
  }));
}

