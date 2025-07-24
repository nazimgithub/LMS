Employee Management and Leave Tracking App
This is a web application built using ReactJS (with component-level state, no Redux) to manage employee records and their leave requests.
It uses a local JSON Server as a mock backend to store and fetch data.

📋 Features
✅ Two types of users:

Human Resource (HR)

Employee

👥 User Roles & Functionality
Human Resource (HR)
Logs in using valid Email, Password, and Role = HR.

Redirected to HR Dashboard after successful login.

On the HR Dashboard:

Add New Employee
Create new employee accounts (both Employee and HR roles).

Employees List
View all employees in a tabular format, showing:

Name

Email

Date of Joining

Status (Active / In-Active)

Update Employee Status
Change an employee’s status between Active and In-Active.

Manage Employee Leaves

View all leave requests with their current status.

Click Manage Leave to open a modal showing leave details.

Approve or Not-Approve a leave request.

If Not-Approved, a textarea is displayed to enter the reason.

Employee
Logs in using valid Email, Password, and Role = Employee.

Redirected to Employee Dashboard after successful login.

On the Employee Dashboard:

Apply Leave
Submit a new leave request.

View Leave Requests
See all personal leave requests along with HR’s approval status.

View Profile
See personal profile details.

Sign Up Functionality:

Employee can sign up with:

Name

Email

Role = Employee

Password

After signing up, the employee account remains In-Active until HR updates the status to Active.

🛠️ Tech Stack
Frontend: ReactJS (with states, no Redux)

Backend (Mock API): JSON Server

State Management: Component-level state

Authentication: Simple email/password/role check (mock)

🚀 Setup & Run Locally
Prerequisites
Node.js & npm installed

json-server installed globally or as dev dependency
