OMNI SCHOOL MANAGEMENT SYSTEM
Streamline school management, class organization, and add students and faculty.
Seamlessly track attendance, assess performance, and provide feedback.
Access records, view marks, and communicate effortlessly.
About
The School Management System is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It aims to streamline school management, class organization, and facilitate communication between students, teachers, and administrators.

Features
User Roles: The system supports three user roles: Admin, Teacher, and Student. Each role has specific functionalities and access levels.

Admin Dashboard: Administrators can add new students and teachers, create classes and subjects, manage user accounts, and oversee system settings.

Attendance Tracking: Teachers can easily take attendance for their classes, mark students as present or absent, and generate attendance reports.

Performance Assessment: Teachers can assess students' performance by providing marks and feedback. Students can view their marks and track their progress over time.

Data Visualization: Students can visualize their performance data through interactive charts and tables, helping them understand their academic performance at a glance.

Communication: Users can communicate effortlessly through the system. Teachers can send messages to students and vice versa, promoting effective communication and collaboration.
**Technologies Used **
Frontend: React.js, VITE
Backend: Node.js, Express.js
Database: MongoDB
UI/UX Improvements
Color Scheme: Professional Silver (#C0C0C0), Charcoal Grey (#333333), Black (#1a1a1a), and White.
Interactivity:Fluid hover effects on all buttons and navigation links.
Responsiveness: Fully optimized for multiple screens, including legacy devices like iphone and legacy:
Optimized 1200px centered grid.
Adaptive padding and flexible navigation.
Custom overrides for iPhone 4 (320px) ensuring no horizontal scrolling and readable font sizes.
## 🔐 Authentication & API Endpoints

### Auth Routes (`/api/auth`)
- `POST /register`: Accepts `name`, `email`, `password`, `role`. Hashes password and saves user.
- `POST /login`: Authenticates user and returns a **JWT Token**.
## 🛡️ Middleware Logic
protect: Intercepts Bearer tokens and decodes the payload without extra DB hits (Stateless Auth).
authorize: High-order function that gates access to routes based on the `role` stored in the JWT.
Logging: Implemented terminal color-coding for rapid debugging of unauthorized access attempts.
### Student Routes (`/api/students`)
- `GET /`: Returns a list of all students (hides passwords).
- `PUT /:id`: Updates student information by MongoDB ID.
- `DELETE /:id`: Permanently removes a student from the system.
## 🏗️ Data Architecture
### User Schema
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Required, trimmed for whitespace |
| `email` | String | Unique, validated via Regex |
| `password` | String | Hashed, hidden from queries by default |
| `role` | String | Enum: `student`, `teacher`, or `admin` |
| `createdAt`| Date | Auto-generated timestamp |
## ⚙️ Requirements
Ensure your `.env` file has a `JWT_SECRET` variable:
`JWT_SECRET=your_super_secret_key_here`

## 🚧 Phase 2: Professional MERN Refactor
- [x] Migrate Inline Styles to Tailwind/Modular CSS.
- [x] Implement Mongoose Schema for Students & Faculty.
- [ ] Implement CSV Bulk Import for Student Records.
- [ ] Add Role-Based Access Control (RBAC) for Admin/Teacher.

### 🚀 How to Run
1. `cd omni-school-backend` -> `npm start`
2. `cd omni-school-frontend` -> `npm run dev`
