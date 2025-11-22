# Human Resource Management System (HRMS)

A full-stack web application for managing employees, teams, and organizational activities with comprehensive logging and audit trails.

## 🚀 Features

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

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database (SQLite for local development)
- **Sequelize** ORM for database operations
- **JWT** for authentication
- **bcryptjs** for password hashing

### Frontend
- **React.js** with React Router
- **Axios** for API communication
- **Modern CSS** with custom styling

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (for production) or SQLite (for local development)
- npm or yarn

## 🔧 Installation & Setup

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

Create a `.env` file in the `backend` directory:

```env
# Database Configuration (for PostgreSQL)
DATABASE_URL=postgres://user:password@localhost:5432/hrms

# OR for local development with individual variables
DB_NAME=hrms
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432

# JWT Secret (generate a secure random string)
JWT_SECRET=your-secret-key-here

# Client URL (frontend URL for CORS)
CLIENT_URL=http://localhost:3000

# Environment
NODE_ENV=development

# Port (optional, defaults to 5000)
PORT=5000
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

## 📁 Project Structure

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

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create organization and admin user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout (requires auth)
- `GET /api/auth/me` - Get current user profile (requires auth)

### Employees
- `GET /api/employees` - Get all employees (requires auth)
- `POST /api/employees` - Create employee (requires auth)
- `PUT /api/employees/:id` - Update employee (requires auth)
- `DELETE /api/employees/:id` - Delete employee (requires auth)
- `POST /api/employees/:id/assign` - Assign teams to employee (requires auth)
- `GET /api/employees/:id/teams` - Get employee teams (requires auth)

### Teams
- `GET /api/teams` - Get all teams (requires auth)
- `POST /api/teams` - Create team (requires auth)
- `PUT /api/teams/:id` - Update team (requires auth)
- `DELETE /api/teams/:id` - Delete team (requires auth)

### Logs
- `GET /api/logs` - Get all activity logs (requires auth)

## 🚢 Deployment

### Backend Deployment (Render)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the following environment variables:
   - `DATABASE_URL` - PostgreSQL connection string (provided by Render if you create a database)
   - `JWT_SECRET` - A secure random string
   - `CLIENT_URL` - Your frontend URL (e.g., `https://your-app.vercel.app`)
   - `NODE_ENV` - `production`

4. Build Command: `npm install`
5. Start Command: `npm start`

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set the following environment variable:
   - `REACT_APP_API` - Your backend API URL (e.g., `https://your-backend.onrender.com/api`)

3. Deploy automatically on push to main branch

### Database Setup

For production, use PostgreSQL. The application automatically:
- Creates tables on first run using `sequelize.sync()`
- Handles SSL connections for managed PostgreSQL services
- Isolates data by organization

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Organization-based data isolation
- CORS configuration for secure cross-origin requests
- Input validation and error handling

## 📊 Database Schema

### Models
- **User**: Organization users (admins)
- **Organization**: Multi-tenant organizations
- **Employee**: Employees belonging to organizations
- **Team**: Teams belonging to organizations
- **Log**: Activity logs with user and organization references
- **EmployeeTeam**: Join table for many-to-many relationship

### Relationships
- Organization has many Users, Employees, Teams, and Logs
- User belongs to Organization
- Employee belongs to Organization
- Team belongs to Organization
- Employee belongs to many Teams (through EmployeeTeam)
- Team belongs to many Employees (through EmployeeTeam)
- Log belongs to User and Organization

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## 📝 Log Format Examples

The activity logs display in the following format:

```
[12/15/2024, 10:30:45 AM] John Doe logged in.
[12/15/2024, 10:31:20 AM] John Doe added a new employee with ID 5.
[12/15/2024, 10:32:10 AM] John Doe updated employee 5.
[12/15/2024, 10:33:00 AM] John Doe assigned employee 5 to teams 1, 2.
[12/15/2024, 10:34:00 AM] John Doe deleted employee 5.
[12/15/2024, 10:35:00 AM] John Doe logged out.
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Vinay Kumar**

- GitHub: [@vinaykumar229-ai](https://github.com/vinaykumar229-ai)

## 🙏 Acknowledgments

- Express.js community
- React.js community
- Sequelize ORM
- All contributors and open-source libraries used in this project

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Note**: This is a full-stack assignment project demonstrating modern web development practices with Node.js, React.js, and PostgreSQL.

