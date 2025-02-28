import styles from "./Calendar.module.css";

import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {CiCalendar} from "react-icons/ci";

import {Day} from "../index";

import data from "../../util/assignments.json";
import {useEffect, useState} from "react";

const Calendar = ({assignments}) => {
    // console.log(assignments);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const tempDate = new Date(startDate);
        tempDate.setDate(new Date().getDate() + 21);
        return tempDate;
    });
    const [days, setDays] = useState([])

    useEffect(() => {
        const daysArray = [];
        for (let currentDay = startDate.getTime(); currentDay < endDate.getTime(); currentDay += 86400000) {
            const dayOfMonth = new Date(currentDay).getDate();
            daysArray.push(dayOfMonth);
        }
        setDays(daysArray);
    }, [startDate, endDate]);


    const formatDate = (date) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "2-digit",
        }
        return date.toLocaleDateString("en-US", options);
    }

    const changeCalendar = (increase) => {
        setStartDate(prevStartDate => {
            const newStartDate = new Date(prevStartDate);
            if (increase) newStartDate.setDate(newStartDate.getDate() + 21);
            else newStartDate.setDate(newStartDate.getDate() - 21);

            return newStartDate;
        });

        setEndDate(prevEndDate => {
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
                    <CiCalendar/>
                    <p>{formatDate(startDate)} - {formatDate(endDate)}</p>
                    <div className={styles.arrow}>
                        <IoIosArrowUp onClick={() => changeCalendar(true)}/>
                        <IoIosArrowDown onClick={() => changeCalendar(false)}/>
                    </div>
                </div>
            </div>
            <div className={styles.calendarBoard}>
                {days.map((day, i) => (
                    <div className={styles.box} key={i}>
                        <Day assignment={data.assignments[i]} day={day}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
