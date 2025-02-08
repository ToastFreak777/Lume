import Inbox from "../Inbox/Inbox";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={null}>Upcoming Assignments</h2>
        <div>
          <div className="videoLink">video</div>
          <div>
            <div>
              <h3 className="assignmentTitle">Assignment Title</h3>
              <p>Due Date / Time Left</p>
            </div>

            <div>
              <div>
                <p>Students online:</p>
                <p># of students in class</p>
              </div>
              <p>Presence: wtf is this???</p>
              <p># of students in class</p>
            </div>
          </div>
        </div>
      </div>

      <div></div>

      <div>
        <Inbox />
      </div>
    </div>
  );
};

export default Sidebar;
