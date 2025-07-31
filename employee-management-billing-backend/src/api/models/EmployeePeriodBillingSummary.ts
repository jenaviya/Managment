export interface EmployeePeriodBillingSummary {
  userId: string;
  userName: string;
  totalHours?: number;
  totalAmount?: number;
  details?: BillingSummaryDetail[];
}

export interface BillingSummaryDetail {
  projectId: string;
  projectName: string;
  hours: number;
  rate: number;
  amount: number;
}