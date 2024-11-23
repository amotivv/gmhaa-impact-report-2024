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

export interface DonationRecord {
  donation_date: string;
  donation_id: string;
  donation_status: boolean;
  payment_method: string;
  donation_amount: string;
  payout_amount: string;
  fees_covered: boolean;
}

if (!process.env.SESSIONS_DATA_URL || !process.env.DONATIONS_DATA_URL) {
  throw new Error('Missing required environment variables for data sources');
}

export async function fetchData(): Promise<SessionRecord[]> {
  const response = await fetch(process.env.SESSIONS_DATA_URL!);
  return response.json();
}

export async function fetchDonations(): Promise<DonationRecord[]> {
  const response = await fetch(process.env.DONATIONS_DATA_URL!);
  return response.json();
}

export function getDashboardData(records: SessionRecord[]) {
  // Filter for funded sessions in 2024 only
  const fundedSessions = records.filter(record => 
    record.funding_status === true && 
    record.session_date.startsWith('2024')
  );
  
  const totalSessions = fundedSessions.length;
  const totalDisbursed = fundedSessions.reduce((sum, record) => sum + record.funding_spend_limit, 0);
  const averagePerSession = Math.round(totalDisbursed / totalSessions);
  const firstTimeSessions = fundedSessions.filter(record => record.first_time).length;
  const truthSpringCount = fundedSessions.filter(record => 
    record.partner_ref === "Truth Spring"
  ).length;

  return {
    totalSessions,
    totalDisbursed,
    averagePerSession,
    firstTimeSessions,
    truthSpringCount
  };
}

export function getDonationData(donations: DonationRecord[], disbursements: SessionRecord[]) {
  // Filter for 2024 donations
  const donations2024 = donations.filter(donation => 
    donation.donation_date.startsWith('2024')
  );

  const totalDonations = donations2024.reduce((sum, donation) => 
    sum + parseFloat(donation.payout_amount), 0);
  
  // Only consider successful disbursements from 2024
  const validDisbursements = disbursements.filter(record => 
    record.funding_status === true && 
    record.session_date.startsWith('2024')
  );
  const totalDisbursed = validDisbursements.reduce((sum, record) => 
    sum + record.funding_spend_limit, 0);
  
  const deficit = totalDisbursed - totalDonations;

  return {
    totalDonations,
    deficit,
    donationCount: donations2024.length
  };
}

export function getMonthlyData(records: SessionRecord[]) {
  // Filter for funded sessions in 2024 only
  const fundedRecords = records.filter(record => 
    record.funding_status === true &&
    record.session_date.startsWith('2024')
  );
  
  const monthlyData = fundedRecords.reduce((acc, record) => {
    const date = new Date(record.session_date);
    const month = date.toLocaleString('default', { month: 'short' });
    if (!acc[month]) {
      acc[month] = { sessions: 0, dollars: 0 };
    }
    acc[month].sessions++;
    acc[month].dollars += record.funding_spend_limit;
    return acc;
  }, {} as Record<string, { sessions: number; dollars: number }>);

  return Object.entries(monthlyData).map(([month, data]) => ({
    month,
    sessions: data.sessions,
    dollars: Math.round(data.dollars)
  }));
}

export function getDemographicData(records: SessionRecord[]) {
  // Filter for funded sessions in 2024 only
  const fundedRecords = records.filter(record => 
    record.funding_status === true &&
    record.session_date.startsWith('2024')
  );
  
  const sessionTypes = countPercentage(fundedRecords, 'visit_type');
  const raceEthnicity = countPercentage(fundedRecords, 'race_ethnicity');
  const gender = countPercentage(fundedRecords, 'gender');
  const ageGroups = countPercentage(fundedRecords, 'age_group');
  const locations = countLocations(fundedRecords);

  return {
    sessionTypes,
    raceEthnicity,
    gender,
    ageGroups,
    locations
  };
}

function countLocations(records: SessionRecord[]) {
  const counts = records.reduce((acc, record) => {
    const location = record.location;
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // Optional: sort by count descending
}

function countPercentage(records: SessionRecord[], field: keyof SessionRecord) {
  // First get the raw counts
  const counts = records.reduce((acc, record) => {
    const value = record[field] as string;
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  
  // Calculate exact percentages and sort by highest first
  const items = Object.entries(counts)
    .map(([name, count]) => ({
      name,
      exactValue: (count / total) * 100,
      value: 0  // will be set in next step
    }))
    .sort((a, b) => b.exactValue - a.exactValue);

  // Distribute 100 percentage points
  let remainingPoints = 100;
  return items.map((item, index) => {
    if (index === items.length - 1) {
      // Last item gets remaining points
      return {
        name: item.name,
        value: remainingPoints
      };
    }
    
    const points = Math.round(item.exactValue);
    remainingPoints -= points;
    
    return {
      name: item.name,
      value: points
    };
  });
}

