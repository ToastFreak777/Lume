import styles from "./Calendar.module.css";

import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {CiCalendar} from "react-icons/ci";

import {Day} from "../index";

import data from "../../util/assignments.json";
import {useState} from "react";

const Calendar = ({assignments}) => {
    // console.log(assignments);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const tempDate = new Date(startDate);
        tempDate.setDate(new Date().getDate() + 21);
        return tempDate;
    });

    const _ = (daysToAdd) => {
        const today = new Date("Janurary 1 2025");
        const begin = today.toLocaleDateString("en-US", options);
        today.setDate(today.getDate() + daysToAdd);
        const end = today.toLocaleDateString("en-US", options);


        return `${begin} - ${end}`;
    }

    const formatDate = (date) => {
        console.log(date);
        const options = {
            year: "numeric",
            month: "short",
            day: "2-digit",
        }
        return date.toLocaleDateString("en-US", options);
    }

    const changeCalendar = (increase) => {
        setStartDate(prevStartDate => {
            const newStartDate = new Date(prevStartDate); // Copy of the current start date
            if (increase) {
                newStartDate.setDate(newStartDate.getDate() + 21); // Move start date forward by 21 days
            } else {
                newStartDate.setDate(newStartDate.getDate() - 21); // Move start date backward by 21 days
            }
            // Update the startDate first
            return newStartDate;
        });

        setEndDate(prevEndDate => {
            const newEndDate = new Date(prevEndDate); // Copy of the current end date
            if (increase) {
                newEndDate.setDate(newEndDate.getDate() + 21); // Set end date 20 days ahead
            } else {
                newEndDate.setDate(newEndDate.getDate() - 21); // Set end date 20 days behind
            }
            // Update the endDate separately
            return newEndDate;
        });
    };


    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <h2>Schedule</h2>
                <div className={styles.date}>
                    <CiCalendar/>
                    <p>{formatDate(startDate)} - {formatDate(endDate)}</p>
                    <div className={styles.arrow}>
                        <IoIosArrowUp onClick={() => changeCalendar(true)}/>
                        <IoIosArrowDown onClick={() => changeCalendar(false)}/>
                    </div>
                </div>
            </div>
            <div className={styles.calendarBoard}>
                {data.assignments.map((assignment, i) => (
                    <div className={styles.box} key={i}>
                        <Day assignment={assignment}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
