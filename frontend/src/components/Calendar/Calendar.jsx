import styles from "./Calendar.module.css";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";

import { Day } from "../index";

import { useEffect, useState } from "react";

/**
 * @typedef {import("../../types/types.js").Assignment} Assignment
 */

/**
 * @typedef {Object.<string, Assignment>} AssignmentsByDate
 */

/**
 *
 * @param {{assignments?: Assignment[]}} props
 */

const Calendar = ({ assignments }) => {
  const [startDate, setStartDate] = useState(new Date(2026, 1, 1));
  const [endDate, setEndDate] = useState(new Date(2026, 1, 22));
  const [calendarDays, setCalendarDays] = useState(/** @type {Date[]} */ ([]));
  const [assignmentsByDate, setAssignmentsByDate] = useState(
    /** @type {AssignmentsByDate} */ ({}),
  );

  useEffect(() => {
    /** @type {Date[]} */
    const calendarDaysArray = [];

    for (
      let currentDay = startDate.getTime();
      currentDay < endDate.getTime();
      currentDay += 86400000
    ) {
      const dayOfMonth = new Date(currentDay);
      calendarDaysArray.push(dayOfMonth);
    }
    setCalendarDays(calendarDaysArray);
  }, [startDate, endDate]);

  useEffect(() => {
    if (!assignments || !assignments.length) return;

    /** @type {AssignmentsByDate} */
    const mappedAssignments = {};

    assignments.forEach((assignment) => {
      const dueDate = new Date(assignment.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      const dateKey = dueDate.toISOString().split("T")[0];
      mappedAssignments[dateKey] = assignment;
    });

    setAssignmentsByDate(mappedAssignments);
  }, [assignments]);

  /**
   * @param {Date} date
   */
  const formatDate = (date) => {
    /** @type {Intl.DateTimeFormatOptions} */
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  /**
   * @param {boolean} increase
   */
  const changeCalendar = (increase) => {
    setStartDate((prevStartDate) => {
      const newStartDate = new Date(prevStartDate);
      if (increase) newStartDate.setDate(newStartDate.getDate() + 21);
      else newStartDate.setDate(newStartDate.getDate() - 21);

      return newStartDate;
    });

    setEndDate((prevEndDate) => {
      const newEndDate = new Date(prevEndDate);
      if (increase) newEndDate.setDate(newEndDate.getDate() + 21);
      else newEndDate.setDate(newEndDate.getDate() - 21);

      return newEndDate;
    });
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <h2>Schedule</h2>
        <div className={styles.date}>
          <CiCalendar />
          <p>
            {formatDate(startDate)} - {formatDate(endDate)}
          </p>
          <div className={styles.arrow}>
            <IoIosArrowUp />
            <IoIosArrowDown />
            {/* <IoIosArrowUp onClick={() => changeCalendar(true)} />
            <IoIosArrowDown onClick={() => changeCalendar(false)} /> */}
          </div>
        </div>
      </div>
      <div className={styles.calendarBoard}>
        {calendarDays.map((day) => {
          const dateKey = day.toISOString().split("T")[0];
          const assignment = assignmentsByDate[dateKey];
          return (
            <div className={styles.box} key={dateKey}>
              <Day assignment={assignment} day={day.getDate()} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
