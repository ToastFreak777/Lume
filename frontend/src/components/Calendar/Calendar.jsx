import styles from "./Calendar.module.css";

import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {CiCalendar} from "react-icons/ci";

import {Day} from "../index";

import data from "../../util/assignments.json";

const Calendar = ({assignments}) => {
    console.log(assignments);


    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <h2>Schedule</h2>
                <div className={styles.date}>
                    <CiCalendar/>
                    <p>May 01- May 21, 2023</p>
                    <div className={styles.arrow}>
                        <IoIosArrowUp/>
                        <IoIosArrowDown/>
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
