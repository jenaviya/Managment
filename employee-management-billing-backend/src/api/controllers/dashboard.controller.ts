import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalEmployees = await prisma.user.count({
      where: { role: 'EMPLOYEE' },
    });
    const totalProjects = await prisma.project.count();
    const pendingLeaveRequests = await prisma.leaveRequest.count({
      where: { status: 'PENDING' },
    });
    const activeProjects = await prisma.project.count({
        // Assuming you have a status field; if not, this can be adjusted
        // where: { status: 'ACTIVE' } 
    });

    res.json({
      totalEmployees,
      totalProjects,
      pendingLeaveRequests,
      activeProjects,
    });
  } catch (error) {
    console.error('Failed to get dashboard stats:', error);
    res.status(500).json({ error: 'Failed to retrieve dashboard statistics.' });
  }
};

export const dashboardController = {
  getDashboardStats,
};