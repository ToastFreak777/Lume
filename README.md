# Lume: School Dashboard

A modern, real-time dashboard designed to track and analyze student performance, attendance, and other school-related
data. Built with modern technologies, Lume offers a seamless experience for educators, administrators, and students to
monitor progress and make informed decisions.

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## Overview

Lume is a real-time **School Dashboard** that provides data visualization and monitoring
capabilities for tracking student performance, attendance. It is built with the **MERN** stack (**MongoDB, Express,
React, and Node.js)** and integrates real-time updates using Socket.io, a custom-built UI with React and CSS, and
full-stack integration with Node.js and Mongoose for robust data storage and management.

## Features

### Core Features

- [ ] **Real-time Data Visualization** (mock)
    - Charts & Graphs to display **student performance**, **attendance rates**, and more powered by **Socket.io** for
      live updates.
- [x] **User Authentication**
    - Secure login/signup with z**role-based access**
    - Authentication & Authorization
    - Route Protection
- [ ] **Role-Based Access Control**
    - [x] Admin dashboard for managing teachers and students
    - Teachers can view their own class data and student performance
    - Students and parents can access individual progress and attendance records (mock)
- [X] **Advanced Data Fetching**
    - [] Filtering
    - [] Sort
- [ ] **Notifications & Alerts**
    - Alerts for **low attendance** or **failing grades**
    - **Upcoming assignments** or deadlines

# Note features labled as "mock" are currently placeholders for demonstration purposes and are not yet fully functional.

## Strengths

- **Real-time Updates**: Leveraging Socket.io, Lume ensures data is updated instantly across all users, providing a
  dynamic
  and responsive experience.
- **Custom-Built UI**: Designed with React and CSS, the interface is intuitive, visually appealing, and tailored to the
  needs of school users.
- **Full-Stack Integration**: Built with Node.js and Mongoose, Lume seamlessly connects the front-end to a MongoDB
  backend
  for efficient data handling.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/ToastFreak777/Lume.git
cd Lume
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Access the Dashboard**

Visit http://localhost:5174 in your web browser to access the dashboard.

## Usage

### User Roles and Permissions

- Admin: View and manage all data (students, teachers, grades, attendance).
- Teacher: View class performance, attendance, and student progress.
- Student/Parent: View individual student performance, grades, and attendance.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

- Fork the project
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some AmazingFeature')
- Push to the branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## Repo

Project Link: https://github.com/ToastFreak777/Lume
