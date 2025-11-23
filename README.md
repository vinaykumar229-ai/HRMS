# Human Resource Management System (HRMS)

A full-stack web application for managing employees, teams, and organizational activities with comprehensive logging and audit trails.

##  Features

### Core Functionality
- **Employee Management**: Create, read, update, and delete employees
- **Team Management**: Create, read, update, and delete teams
- **Team Assignment**: Assign employees to multiple teams (many-to-many relationship)
- **Organization Management**: Multi-tenant system with organization-based data isolation
- **User Authentication**: Secure JWT-based authentication with login/logout
- **Activity Logging**: Comprehensive audit trail of all backend operations

### Logged Operations
- User login/logout
- User signup
- Employee creation, updates, and deletion
- Team creation, updates, and deletion
- Employee-team assignment changes

All logs are stored in PostgreSQL and displayed in a user-friendly format with timestamps and user information.

##  Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database 
- **Sequelize** ORM for database operations
- **JWT** for authentication
- **bcryptjs** for password hashing

### Frontend
- **React.js** with React Router
- **Axios** for API communication
- **Modern CSS** with custom styling

##  Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (for production) or SQLite (for local development)
- npm or yarn

##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vinaykumar229-ai/HRMS.git
cd HRMS
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Start the backend server:

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will be running on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm start
```

The frontend will be running on `http://localhost:3000`

##  Project Structure

```
HRMS/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Database configuration
│   │   ├── controllers/
│   │   │   ├── authController.js  # Authentication logic
│   │   │   ├── employeeController.js
│   │   │   ├── teamController.js
│   │   │   └── logController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Organization.js
│   │   │   ├── Employee.js
│   │   │   ├── Team.js
│   │   │   ├── Log.js
│   │   │   └── index.js           # Model associations
│   │   └── routes/
│   │       ├── auth.js
│   │       ├── employee.js
│   │       ├── team.js
│   │       └── log.js
│   ├── server.js                  # Express server setup
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── EmployeeList.js
    │   │   ├── EmployeeForm.js
    │   │   ├── TeamList.js
    │   │   ├── TeamForm.js
    │   │   ├── AssignTeamModal.js
    │   │   ├── LogsList.js
    │   │   ├── Sidebar.js
    │   │   └── Topbar.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── SignupOrg.js
    │   │   └── Dashboard.js
    │   ├── api.js                  # API client configuration
    │   ├── auth.js                 # Authentication utilities
    │   └── App.js
    └── package.json
```


##  Deployment

### Backend Deployment (Render)

### Frontend Deployment (Vercel)





