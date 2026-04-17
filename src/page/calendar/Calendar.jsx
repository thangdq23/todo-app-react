import React, { useMemo, useState } from "react";
import { useTasks } from "../../context/useTasks";
import CalendarHeader from "./CalendarHeader";
import CalendarWeekdays from "./CalendarWeekdays";
import CalendarGrid from "./CalendarGrid";
import CalendarModal from "./CalendarModal";
import DeadlineSidebar from "./DeadlineSidebar";
import { generateCalendarDays } from "./calendarUtils";

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { tasks, addTask } = useTasks();

  const calendarDays = useMemo(
    () => generateCalendarDays(currentMonth, currentYear),
    [currentMonth, currentYear],
  );

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((month) => month - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDate(day.date);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate(null);
  };

  const handleAddTask = async (task) => {
    await addTask(task);
  };

  return (
    <div className="bg-surface text-on-surface mt-16">
      <main className="ml-64 p-12 min-h-screen flex gap-8">
        <div className="flex-1">
          <CalendarHeader
            month={currentMonth}
            year={currentYear}
            onPrevMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
          />
          <CalendarWeekdays />
          <CalendarGrid
            days={calendarDays}
            tasks={tasks}
            onDayClick={handleDayClick}
          />
        </div>
        <DeadlineSidebar tasks={tasks} />
      </main>
      <CalendarModal
        isOpen={showModal}
        selectedDate={selectedDate}
        tasks={tasks}
        onClose={handleCloseModal}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Calendar;
