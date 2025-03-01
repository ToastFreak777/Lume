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

export const normalizeDateTime = (date) => {
    if (!date) return null;

    const localDate = new Date(date);
    if (isNaN(localDate.getTime())) return null;

    return new Date(Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
    ))
}

export const formatDateToYYYYMMDD = (date) => {
    date = new Date(date);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};
export const formatDateToMMDDYYY = (date) => {
    date = new Date(date);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
};
