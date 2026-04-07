import type { ShiftType, TimesheetEmployeeWeek } from "../data";

type WeekDay = {
  dateKey: string;
  weekdayLabel: string;
  dayNumber: number;
  isToday: boolean;
};

type TimesheetGridProps = {
  employees: TimesheetEmployeeWeek[];
  weekDays: WeekDay[];
};

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const shiftLabels: Record<ShiftType, string> = {
  morning: "Ca sáng",
  afternoon: "Ca chiều",
  evening: "Ca tối",
};

function ShiftBadge({ shift }: { shift: ShiftType }) {
  return <span className={`timesheet-shift-badge timesheet-shift-${shift}`}>{shiftLabels[shift]}</span>;
}

function EmployeeInfoCell({ name, code }: Pick<TimesheetEmployeeWeek, "name" | "code">) {
  return (
    <div className="timesheet-employee-cell">
      <div className="timesheet-employee-name">{name}</div>
      <div className="timesheet-employee-code">{code}</div>
    </div>
  );
}

export function TimesheetGrid({ employees, weekDays }: TimesheetGridProps) {
  const totalSalary = employees.reduce((sum, employee) => sum + employee.predictedSalary, 0);
  const totalShifts = employees.reduce((sum, employee) => sum + employee.totalShifts, 0);
  const dailyShiftTotals = weekDays.map((_, index) => employees.reduce((sum, employee) => sum + employee.weekShifts[index].length, 0));

  return (
    <section className="card timesheet-card">
      <div className="timesheet-table-shell">
        <table className="timesheet-table">
          <thead>
            <tr>
              <th className="timesheet-sticky-column">Nhân viên</th>
              {weekDays.map((day) => (
                <th key={day.dateKey}>
                  <div className="timesheet-day-head">
                    <span>{day.weekdayLabel}</span>
                    <span className={`timesheet-day-number ${day.isToday ? "is-today" : ""}`}>{day.dayNumber}</span>
                  </div>
                </th>
              ))}
              <th>Lương dự kiến</th>
            </tr>
            <tr className="timesheet-summary-row">
              <th className="timesheet-sticky-column">Tổng hợp</th>
              {dailyShiftTotals.map((shiftCount, index) => (
                <th key={weekDays[index].dateKey}>
                  <span className="timesheet-summary-pill">{shiftCount} ca</span>
                </th>
              ))}
              <th>
                <div className="timesheet-salary-cell">
                  <strong>{currencyFormatter.format(totalSalary)}</strong>
                  <span>{totalShifts} ca</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={weekDays.length + 2} className="timesheet-empty-cell">
                  Không tìm thấy nhân viên phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.code}>
                  <td className="timesheet-sticky-column">
                    <EmployeeInfoCell name={employee.name} code={employee.code} />
                  </td>
                  {employee.weekShifts.map((shifts, index) => (
                    <td key={`${employee.code}-${weekDays[index].dateKey}`}>
                      <div className="timesheet-shift-stack">
                        {shifts.map((shift) => (
                          <ShiftBadge key={`${employee.code}-${weekDays[index].dateKey}-${shift}`} shift={shift} />
                        ))}
                      </div>
                    </td>
                  ))}
                  <td>
                    <div className="timesheet-salary-cell">
                      <strong>{currencyFormatter.format(employee.predictedSalary)}</strong>
                      <span>{employee.totalShifts} ca</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
