export type ShiftType = "morning" | "afternoon" | "evening";

export type TimesheetEmployee = {
  code: string;
  name: string;
  predictedSalaryPerShift: number;
  weeklyTemplate: ShiftType[][];
};

export type TimesheetEmployeeWeek = {
  code: string;
  name: string;
  predictedSalary: number;
  totalShifts: number;
  weekShifts: ShiftType[][];
};

const baseEmployees: TimesheetEmployee[] = [
  {
    code: "NV000001",
    name: "Phan Gia Huy",
    predictedSalaryPerShift: 380000,
    weeklyTemplate: [["evening"], ["afternoon"], ["morning"], [], ["morning"], [], ["evening"]],
  },
  {
    code: "NV000002",
    name: "Nguyen Minh Chau",
    predictedSalaryPerShift: 520000,
    weeklyTemplate: [["morning"], ["morning", "afternoon"], [], ["afternoon"], ["morning"], ["evening"], []],
  },
  {
    code: "NV000003",
    name: "Tran Bao Ngan",
    predictedSalaryPerShift: 340000,
    weeklyTemplate: [[], ["afternoon"], ["afternoon"], ["evening"], [], ["morning"], ["morning"]],
  },
  {
    code: "NV000004",
    name: "Le Thao Vy",
    predictedSalaryPerShift: 460000,
    weeklyTemplate: [["morning"], [], ["morning"], ["afternoon"], ["afternoon"], [], ["evening"]],
  },
  {
    code: "NV000005",
    name: "Doan Gia Han",
    predictedSalaryPerShift: 300000,
    weeklyTemplate: [[], ["morning"], [], ["afternoon"], [], ["evening"], ["evening"]],
  },
  {
    code: "NV000006",
    name: "Vo Duc Long",
    predictedSalaryPerShift: 320000,
    weeklyTemplate: [["morning"], ["morning"], ["afternoon"], [], ["evening"], [], []],
  },
];

export function getTimesheetEmployees(): TimesheetEmployee[] {
  return baseEmployees;
}

export function buildTimesheetWeek(sourceEmployees: TimesheetEmployee[], weekOffset: number): TimesheetEmployeeWeek[] {
  const weekSeed = Math.abs(weekOffset % 4);

  return sourceEmployees.map((employee, employeeIndex) => {
    const weekShifts: ShiftType[][] = employee.weeklyTemplate.map((dayShifts, dayIndex) => {
      const shouldAddExtraShift = (weekSeed + employeeIndex + dayIndex) % 5 === 0;

      if (!shouldAddExtraShift || dayShifts.length > 1) {
        return dayShifts;
      }

      if (dayShifts.length === 0) {
        return [];
      }

      if (dayShifts[0] === "morning") {
        return ["morning", "afternoon"];
      }

      if (dayShifts[0] === "afternoon") {
        return ["afternoon", "evening"];
      }

      return ["morning", "evening"];
    });

    const totalShifts = weekShifts.reduce((sum, shifts) => sum + shifts.length, 0);

    return {
      code: employee.code,
      name: employee.name,
      predictedSalary: totalShifts * employee.predictedSalaryPerShift,
      totalShifts,
      weekShifts,
    };
  });
}
