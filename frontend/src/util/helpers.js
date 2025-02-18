export const calculateAcademicYear = (startDate, endDate, semester) => {
  startDate = new Date(startDate).getFullYear();
  endDate = new Date(endDate).getFullYear();

  let academicYear;
  if (semester === "Fall") {
    academicYear = `${startDate}-${endDate + 1}`;
  } else {
    academicYear = `${startDate - 1}-${endDate}`;
  }
  return academicYear;
};
