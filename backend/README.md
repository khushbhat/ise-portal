# ISE Department Website - Backend

## Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)

## Setup Instructions

### 1. Install MySQL
If you don't have MySQL installed, download and install it from: https://dev.mysql.com/downloads/mysql/

### 2. Create Database
Open MySQL command line or MySQL Workbench and run:
```sql
source schema.sql
```
Or manually execute the SQL commands in `schema.sql`

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and update with your MySQL credentials:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=ise_department
   ```

### 4. Install Dependencies
```bash
npm install
```

### 5. Start the Server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Default Admin Credentials
- Email: hod@rit.edu
- Password: admin123

**Important:** Change the password in the database after first login!

## API Endpoints

### Authentication
- POST `/api/auth/login` - Admin login

### Home Content
- GET `/api/home` - Get home page content
- PUT `/api/home` - Update home page content

### Announcements
- GET `/api/announcements` - Get all announcements
- POST `/api/announcements` - Create announcement
- DELETE `/api/announcements/:id` - Delete announcement

### About
- GET `/api/about` - Get about page content
- PUT `/api/about` - Update about page content

### Faculty
- GET `/api/faculty` - Get all faculty members
- POST `/api/faculty` - Add faculty member
- PUT `/api/faculty/:id` - Update faculty member
- DELETE `/api/faculty/:id` - Delete faculty member

### Research
- GET `/api/research` - Get all research publications
- POST `/api/research` - Add research publication
- PUT `/api/research/:id` - Update research publication
- DELETE `/api/research/:id` - Delete research publication

### Events
- GET `/api/events` - Get all events
- POST `/api/events` - Add event
- PUT `/api/events/:id` - Update event
- DELETE `/api/events/:id` - Delete event

### Achievements
- GET `/api/achievements` - Get all achievements
- POST `/api/achievements` - Add achievement
- PUT `/api/achievements/:id` - Update achievement
- DELETE `/api/achievements/:id` - Delete achievement

### Activities
- GET `/api/activities` - Get all activities
- POST `/api/activities` - Add activity
- PUT `/api/activities/:id` - Update activity
- DELETE `/api/activities/:id` - Delete activity

### BOS/BOE Members
- GET `/api/bos` - Get all BOS members
- POST `/api/bos` - Add BOS member
- PUT `/api/bos/:id` - Update BOS member
- DELETE `/api/bos/:id` - Delete BOS member
- GET `/api/boe` - Get all BOE members
- POST `/api/boe` - Add BOE member
- PUT `/api/boe/:id` - Update BOE member
- DELETE `/api/boe/:id` - Delete BOE member

### Resources
- GET `/api/resources` - Get all resources
- POST `/api/resources` - Add resource
- PUT `/api/resources/:id` - Update resource
- DELETE `/api/resources/:id` - Delete resource

## Troubleshooting

### Database Connection Issues
- Verify MySQL server is running
- Check credentials in `.env` file
- Ensure database `ise_department` exists

### Port Already in Use
Change the PORT in `.env` file to a different port (e.g., 5001)

## Security Notes
- Change default admin password immediately
- For production, implement proper password hashing (bcrypt)
- Add JWT authentication for better security
- Enable HTTPS
- Implement rate limiting
