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

export interface MonthData {
  month: string;
  monthKey: string;  // Add this for proper sorting
  sessions: number;
  dollars: number;
  runningTotalSessions?: number;
  runningTotalDollars?: number;
}

if (!process.env.SESSIONS_DATA_URL || !process.env.DONATIONS_DATA_URL) {
  throw new Error('Missing required environment variables for data sources');
}

export async function fetchData(): Promise<SessionRecord[]> {
  const response = await fetch(process.env.SESSIONS_DATA_URL!);
  if (!response.ok) {
    throw new Error(`Failed to fetch sessions data: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchDonations(): Promise<DonationRecord[]> {
  const response = await fetch(process.env.DONATIONS_DATA_URL!);
  if (!response.ok) {
    throw new Error(`Failed to fetch donations data: ${response.statusText}`);
  }
  return response.json();
}

export function getDashboardData(records: SessionRecord[]) {
  const currentYear = new Date().getFullYear().toString();

  // Filter for funded sessions in current year only
  const fundedSessions = records.filter(record =>
    record.funding_status === true &&
    record.session_date.startsWith(currentYear)
  );

  const totalSessions = fundedSessions.length;
  const totalDisbursed = fundedSessions.reduce((sum, record) => sum + record.funding_spend_limit, 0);
  const averagePerSession = totalSessions > 0 ? Math.round(totalDisbursed / totalSessions) : 0;
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
  const currentYear = new Date().getFullYear().toString();

  // Filter for current year donations
  const currentYearDonations = donations.filter(donation =>
    donation.donation_date.startsWith(currentYear) &&
    donation.donation_status === true  // Only count successful donations
  );

  const totalDonations = currentYearDonations.reduce((sum, donation) =>
    sum + parseFloat(donation.payout_amount), 0);

  // Only consider successful disbursements from current year
  const validDisbursements = disbursements.filter(record =>
    record.funding_status === true &&
    record.session_date.startsWith(currentYear)
  );
  const totalDisbursed = validDisbursements.reduce((sum, record) =>
    sum + record.funding_spend_limit, 0);

  const deficit = totalDisbursed - totalDonations;

  return {
    totalDonations,
    deficit,
    donationCount: currentYearDonations.length
  };
}

export function getMonthlyData(records: SessionRecord[]): MonthData[] {
  const currentYear = new Date().getFullYear().toString();

  // Filter for funded sessions in current year only
  const fundedRecords = records.filter(record =>
    record.funding_status === true &&
    record.session_date.startsWith(currentYear)
  );

  const monthlyData = fundedRecords.reduce((acc, record) => {
    // Ensure we're parsing the date correctly
    const [year, month] = record.session_date.split('-');
    const monthKey = `${year}-${month.padStart(2, '0')}`; // Ensure consistent YYYY-MM format
    const date = new Date(parseInt(year), parseInt(month) - 1); // Month is 0-based in JS Date

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: date.toLocaleString('default', { month: 'short' }),
        monthKey,
        sessions: 0,
        dollars: 0
      };
    }
    acc[monthKey].sessions++;
    acc[monthKey].dollars += record.funding_spend_limit;
    return acc;
  }, {} as Record<string, MonthData>);

  // Sort chronologically and calculate running totals
  let runningTotalSessions = 0;
  let runningTotalDollars = 0;

  return Object.entries(monthlyData)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map((entry) => {
      const data = entry[1];
      runningTotalSessions += data.sessions;
      runningTotalDollars += data.dollars;
      return {
        ...data,
        dollars: Math.round(data.dollars),
        runningTotalSessions,
        runningTotalDollars: Math.round(runningTotalDollars)
      };
    });
}

export function getDemographicData(records: SessionRecord[]) {
  const currentYear = new Date().getFullYear().toString();

  // Filter for funded sessions in current year only
  const fundedRecords = records.filter(record =>
    record.funding_status === true &&
    record.session_date.startsWith(currentYear)
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
    .sort((a, b) => b.value - a.value);
}

function countPercentage(records: SessionRecord[], field: keyof SessionRecord) {
  const counts = records.reduce((acc, record) => {
    const value = record[field] as string;
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      value: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.value - a.value);
}