import { PrismaClient, Prisma } from '@prisma/client';
import { EmployeePeriodBillingSummary, BillingSummaryDetail } from '../models/EmployeePeriodBillingSummary';
import type { DailyWorkReport, LeaveRequest, AttendanceRecord } from '../models';

const prisma = new PrismaClient();

export const calculateBillingPeriod = async (startDate: Date, endDate: Date) => {
  const users = await prisma.user.findMany();
  const countBasedProjects = await prisma.project.findMany({
    where: { billingType: 'count_based' },
  });

  const summaries: EmployeePeriodBillingSummary[] = [];

  for (const user of users) {
    const dailyWorkReports = await prisma.dailyWorkReport.findMany({
      where: {
        userId: user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
        // Include related ProjectLogItems if needed
      },
      include: {
        projectLogItems: true,
      },
    });

    const approvedLeaveRequests = await prisma.leaveRequest.findMany({
      where: {
        userId: user.id,
        status: 'APPROVED',
        startDate: {
          lte: endDate,
        },
        endDate: {
          gte: startDate,
        },
      },
    });

    const attendanceRecords = await prisma.attendanceRecord.findMany({
      where: {
        userId: user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Perform calculations based on the fetched data
    const summary: EmployeePeriodBillingSummary = {
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      totalHours: 0,
      totalAmount: 0,
      details: []
    };

    summaries.push(summary);
  }

  return summaries;
};

export const finalizeBilling = async (summaryData: EmployeePeriodBillingSummary[]) => {
  const operations = [];
  
  for (const summary of summaryData) {
    const billingRecordOperation = prisma.billingRecord.create({
      data: {
        userId: summary.userId,
        projectId: 'default-project-id', // This should be determined based on business logic
        clientName: 'Default Client',
        calculatedAmount: summary.totalAmount || 0,
        date: new Date(),
        status: 'PENDING',
        isCountBased: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    });
    operations.push(billingRecordOperation);
  }
  
  await prisma.$transaction(operations);
};