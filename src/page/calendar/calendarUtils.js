export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const generateCalendarDays = (month, year) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const totalCells = 42;

  return Array.from({ length: totalCells }, (_, index) => {
    let date;
    let monthType;

    if (index < firstWeekday) {
      const day = prevMonthDays - firstWeekday + index + 1;
      date = new Date(year, month - 1, day);
      monthType = "prev";
    } else if (index < firstWeekday + daysInMonth) {
      const day = index - firstWeekday + 1;
      date = new Date(year, month, day);
      monthType = "current";
    } else {
      const day = index - (firstWeekday + daysInMonth) + 1;
      date = new Date(year, month + 1, day);
      monthType = "next";
    }

    return {
      id: formatDateKey(date),
      date,
      dayNumber: date.getDate(),
      monthType,
    };
  });
};

export const getMonthLabel = (month, year) => `${monthNames[month]} ${year}`;
