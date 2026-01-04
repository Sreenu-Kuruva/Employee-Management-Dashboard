# Employee Management Dashboard

A modern, beautiful, and fully functional Employee Management System built with React.js.

## Project Overview

This dashboard allows administrators to manage employees with features like:
- Secure login
- Add/Edit/Delete employees
- Profile image upload with preview
- Search & combined filters (name, gender, status)
- Active/Inactive toggle
- Print individual employee forms
- Print full employee list
- Responsive & premium UI with glassmorphism and animations

Data is persisted using localStorage.

## Tech Stack

- React.js (with Hooks & Context)
- React Router DOM v6
- react-to-print (for printing)
- uuid (for unique IDs)
- Bootstrap-inspired custom CSS (no external UI library for lightweight & custom design)
- LocalStorage for mock data persistence

## Steps to Run Locally

1. Clone the repository
  
   git clone https://github.com/Sreenu-Kuruva/Employee-Management-Dashboard
   
   cd Employee-Management-Dashboard

2. Install dependencies

   npm i

3. Start the development server

   npm start

4. Open http://localhost:3000 in your browser

5. Login with:

      Username: admin
      
      Password: 12345

Assumptions & Design Decisions

Mock authentication (no backend) — sufficient for assignment

LocalStorage for data persistence (survives page refresh)

Separate CSS file per major component for maintainability

Premium purple-gradient theme with animations for modern feel

Printing uses hidden rendered content with state (avoids react-to-print bugs in newer versions)

No external UI library (pure CSS) for full custom control and lightweight bundle
