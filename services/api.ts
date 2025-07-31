// Send FCM broadcast (admin only)
export async function sendFcmBroadcast({ title, body, target }: { title: string; body: string; target: string }): Promise<any> {
  // Adjust endpoint as needed
  const res = await fetch('/api/fcm/broadcast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, target }),
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to send broadcast');
  }
  return res.json();
}
// --- Client Portal API Functions ---
export const apiFetchClientProjects = async (clientId: string) => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/client-portal/projects?clientId=${clientId}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch client projects');
  return res.json();
};

export const apiFetchClientBilling = async (clientId: string) => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/client-portal/billing?clientId=${clientId}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch client billing');
  return res.json();
};
// --- Journal API Functions ---
export const apiFetchJournalEntries = async (params = {}) => {
  const token = getAuthToken();
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE_URL}/journal${query ? `?${query}` : ''}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch journal entries');
  return res.json();
};

export const apiAddJournalEntry = async (entryData: any) => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/journal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(entryData)
  });
  if (!res.ok) throw new Error('Failed to add journal entry');
  return res.json();
};
// --- Training API Functions ---
// Assumes backend endpoints: /api/v1/training, /api/v1/training/:id, /api/v1/training/:id/enroll, etc.
export const apiFetchTrainings = async () => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/training`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch trainings');
  return res.json();
};

export const apiAddTraining = async (trainingData: any) => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/training`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(trainingData)
  });
  if (!res.ok) throw new Error('Failed to add training');
  return res.json();
};

export const apiUpdateTraining = async (trainingId: string, updates: any) => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/training/${trainingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update training');
  return res.json();
};

export const apiDeleteTraining = async (trainingId: string) => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/training/${trainingId}`, {
    method: 'DELETE',
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to delete training');
  return res.json();
};

export const apiEnrollInTraining = async (trainingId: string, userId: string) => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/training/${trainingId}/enroll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error('Failed to enroll in training');
  return res.json();
};

export const apiApproveTrainingEnrollment = async (trainingId: string, enrollmentId: string, approve: boolean) => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/training/${trainingId}/enrollment/${enrollmentId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify({ approve })
  });
  if (!res.ok) throw new Error('Failed to update enrollment status');
  return res.json();
};

export const apiFetchEmployeeTrainingDashboard = async (userId: string): Promise<any> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/training/dashboard/${userId}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch employee training dashboard');
  return res.json();
};

export const apiFetchAvailableTrainings = async (userId: string): Promise<any> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/training/available/${userId}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch available trainings');
  return res.json();
};

// --- Company API Functions ---
export interface CompanyDetails {
  id?: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  website?: string;
  logoUrl?: string;
  settings?: any;
  createdAt?: string;
  updatedAt?: string;
}

export const apiGetCompanyDetails = async (): Promise<CompanyDetails | null> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/company`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch company details');
  return res.json();
};

export const apiUpdateCompanyDetails = async (data: Partial<CompanyDetails>): Promise<CompanyDetails> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/company`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update company details');
  return res.json();
};

// TypeScript module declarations for missing modules
declare module 'cloudinary';
declare module 'emailjs-com';
declare module 'firebase/app';
declare module 'firebase/messaging';
import { User, UserRole, AdminDashboardData, EmployeeDashboardData, BillingRecord, BillingStatus, Project, DailyWorkReport, NewDailyWorkReportData, LeaveRequest, LeaveStatus, NewLeaveRequestData, EmployeeProfileUpdateData, AttendanceRecord, UserAttendanceStatus, AdminUserUpdateData, InternalMessage, WorkReportFilters, ChangePasswordData, EnhancedAdminDashboardData } from '../types';

const API_BASE_URL = 'http://localhost:3001/api/v1'; // Backend server URL

// --- User Management Interfaces (kept for consistency with AuthContext) ---
export interface ParsedLoginCredentials {
    username: string;
    password?: string;
}

export interface ParsedRegisterData {
    username: string;
    email: string;
    password?: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    profilePictureUrl?: string | null;
}

// --- Helper to get the auth token ---
const getAuthToken = (): string | null => localStorage.getItem('authToken');


// --- User API Functions ---
export const apiLogin = async (credentials: ParsedLoginCredentials): Promise<{ user: User, token:string }> => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Login failed');
  }
  return res.json();
};

export const apiRegister = async (userData: ParsedRegisterData): Promise<User> => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Registration failed');
  }
  return res.json();
};

export const apiLogout = async (): Promise<void> => {
  // No backend call needed, just clear local token
  localStorage.removeItem('authToken');
  return Promise.resolve();
};

export const apiFetchAllUsers = async (): Promise<User[]> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/users`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const apiFetchUserById = async (userId: string): Promise<User | undefined> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};

export const apiUpdateUserProfile = async (userId: string, updates: EmployeeProfileUpdateData): Promise<User> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update user profile');
  return res.json();
};

export const apiAdminUpdateUser = async (userId: string, updates: AdminUserUpdateData): Promise<User> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
};

export const apiDeleteUser = async (userIdToDelete: string): Promise<void> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/users/${userIdToDelete}`, {
    method: 'DELETE',
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to delete user');
  return Promise.resolve();
};

export const apiChangePassword = async (userId: string, data: ChangePasswordData): Promise<void> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/users/${userId}/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to change password');
  return Promise.resolve();
};

export const apiAdminResetPassword = async (userId: string, newPassword: string): Promise<void> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/users/${userId}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify({ newPassword })
  });
  if (!res.ok) throw new Error('Failed to reset password');
  return Promise.resolve();
};


// --- Dashboard API Functions ---
export const fetchAdminDashboardData = async (): Promise<AdminDashboardData> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/dashboard/admin`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch admin dashboard data');
  return res.json();
};

export const fetchEnhancedAdminDashboardData = async (): Promise<EnhancedAdminDashboardData> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/dashboard/admin-enhanced`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch enhanced admin dashboard data');
  return res.json();
};

export const fetchEmployeeDashboardData = async (userId: string): Promise<EmployeeDashboardData> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/dashboard/employee/${userId}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch employee dashboard data');
  return res.json();
};

// --- Project API Functions (Remains mostly static for now) ---
export const apiFetchProjects = async (): Promise<Project[]> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/projects`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

export const apiFetchProjectById = async (projectId: string): Promise<Project | undefined> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch project');
  return res.json();
};

export const apiAddProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(projectData)
  });
  if (!res.ok) throw new Error('Failed to add project');
  return res.json();
};

export const apiUpdateProject = async (projectId: string, updates: Partial<Omit<Project, 'id'>>): Promise<Project> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
};

export const apiDeleteProject = async (projectId: string): Promise<void> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: 'DELETE',
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to delete project');
  return Promise.resolve();
};

// --- Billing API Functions ---
interface BillingFilters {
  userId?: string;
  status?: BillingStatus;
  projectId?: string;
  actingUserRole?: UserRole;
}

export const apiFetchBillingRecords = async (filters?: BillingFilters): Promise<BillingRecord[]> => {
  const token = getAuthToken();
  const params = new URLSearchParams();
  if (filters?.userId) params.append('userId', filters.userId);
  if (filters?.status) params.append('status', filters.status);
  if (filters?.projectId) params.append('projectId', filters.projectId);
  const res = await fetch(`${API_BASE_URL}/billing?${params.toString()}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch billing records');
  return res.json();
};

export const apiAddBillingRecord = async (recordData: Partial<BillingRecord>): Promise<BillingRecord> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/billing`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(recordData)
  });
  if (!res.ok) throw new Error('Failed to add billing record');
  return res.json();
};

export const apiUpdateBillingRecord = async (recordId: string, updates: Partial<BillingRecord>): Promise<BillingRecord> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/billing/${recordId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update billing record');
  return res.json();
};

export const apiDeleteBillingRecord = async (recordId: string): Promise<void> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/billing/${recordId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
  if (!res.ok) throw new Error('Failed to delete billing record');
  return Promise.resolve();
};

// --- Daily Work Report API Functions ---
export const apiSubmitDailyWorkReport = async (reportData: NewDailyWorkReportData): Promise<DailyWorkReport> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/work-reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(reportData)
  });
  if (!res.ok) throw new Error('Failed to submit work report');
  return res.json();
};


export const apiFetchUserDailyWorkReports = async (userId: string, filters?: {startDate?: string, endDate?: string}): Promise<DailyWorkReport[]> => {
  const token = getAuthToken();
  const params = new URLSearchParams();
  if (filters?.startDate) params.append('startDate', filters.startDate);
  if (filters?.endDate) params.append('endDate', filters.endDate);
  const res = await fetch(`${API_BASE_URL}/work-reports/user/${userId}?${params.toString()}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch user work reports');
  return res.json();
};

export const apiFetchAllDailyWorkReports = async (filters?: WorkReportFilters): Promise<DailyWorkReport[]> => {
  const token = getAuthToken();
  const params = new URLSearchParams();
  if (filters?.userId) params.append('userId', filters.userId);
  if (filters?.projectId) params.append('projectId', filters.projectId);
  if (filters?.startDate) params.append('startDate', filters.startDate);
  if (filters?.endDate) params.append('endDate', filters.endDate);
  const res = await fetch(`${API_BASE_URL}/work-reports?${params.toString()}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch all work reports');
  return res.json();
};

export const apiGetDailyWorkReport = async (userId: string, date: string): Promise<DailyWorkReport | undefined> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/work-reports/user/${userId}/${date}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch daily work report');
  return res.json();
};

// --- Leave Management API Functions ---
export const apiApplyForLeave = async (requestData: NewLeaveRequestData): Promise<LeaveRequest> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/leave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(requestData)
  });
  if (!res.ok) throw new Error('Failed to apply for leave');
  return res.json();
};

export const apiFetchUserLeaveRequests = async (userId: string): Promise<LeaveRequest[]> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/leave?userId=${userId}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch user leave requests');
  return res.json();
};

export const apiFetchAllLeaveRequests = async (filters?: { status?: LeaveStatus, userId?: string, startDate?: string, endDate?: string }): Promise<LeaveRequest[]> => {
  const token = getAuthToken();
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.userId) params.append('userId', filters.userId);
  if (filters?.startDate) params.append('startDate', filters.startDate);
  if (filters?.endDate) params.append('endDate', filters.endDate);
  const res = await fetch(`${API_BASE_URL}/leave?${params.toString()}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch leave requests');
  return res.json();
};

export const apiUpdateLeaveRequestStatus = async (requestId: string, status: LeaveStatus.APPROVED | LeaveStatus.REJECTED, adminNotes?: string): Promise<LeaveRequest> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/leave/${requestId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify({ status, adminNotes })
  });
  if (!res.ok) throw new Error('Failed to update leave request status');
  return res.json();
};

export const apiCancelLeaveRequest = async (requestId: string, userId: string): Promise<LeaveRequest> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/leave/${requestId}/cancel`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error('Failed to cancel leave request');
  return res.json();
};

// --- Attendance API Functions ---
export const apiClockIn = async (userId: string): Promise<AttendanceRecord> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/attendance/clock-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error('Failed to clock in');
  return res.json();
};

export const apiClockOut = async (userId: string): Promise<AttendanceRecord> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/attendance/clock-out`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error('Failed to clock out');
  return res.json();
};


export const apiGetUserTodayAttendanceStatus = async (userId: string): Promise<UserAttendanceStatus> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/attendance/status/${userId}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch attendance status');
  return res.json();
};

export const apiFetchAllAttendanceRecords = async (filters?: { userId?: string, date?: string, startDate?: string, endDate?: string }): Promise<AttendanceRecord[]> => {
  const token = getAuthToken();
  const params = new URLSearchParams();
  if (filters?.userId) params.append('userId', filters.userId);
  if (filters?.date) params.append('date', filters.date);
  if (filters?.startDate) params.append('startDate', filters.startDate);
  if (filters?.endDate) params.append('endDate', filters.endDate);
  const res = await fetch(`${API_BASE_URL}/attendance?${params.toString()}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch attendance records');
  return res.json();
};

// --- Internal Messaging API Functions ---
export const apiSendInternalMessage = async (messageData: Omit<InternalMessage, 'id' | 'timestamp' | 'isRead' | 'senderName' | 'senderProfilePictureUrl'>): Promise<InternalMessage> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(messageData)
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
};

export const apiFetchUserMessages = async (userId: string): Promise<InternalMessage[]> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/messages/user/${userId}`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch user messages');
  return res.json();
};

export const apiMarkMessageAsRead = async (messageId: string, userId: string): Promise<void> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/messages/${messageId}/read`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error('Failed to mark message as read');
  return Promise.resolve();
};

export const apiMarkAllMessagesAsReadForUser = async (userId: string): Promise<void> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/messages/user/${userId}/mark-all-read`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
  if (!res.ok) throw new Error('Failed to mark all messages as read');
  return Promise.resolve();
};

export const apiGetUnreadMessageCount = async (userId: string): Promise<number> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/messages/user/${userId}/unread-count`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  if (!res.ok) throw new Error('Failed to fetch unread message count');
  return res.json();
};
