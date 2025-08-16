# sports
# Sports Scheduler Website

## Overview
This is a **sports scheduler website** built using **Node.js, Express.js, Sequelize, and PostgreSQL**. The platform allows administrators to manage sports events and players to sign up, join sessions, and view schedules.

## Features
### **Authentication**
- User login and signup with **bcrypt** for password hashing.
- Sessions managed with **express-session**.

### **Admin Functionalities**
- Create and manage sports.
- Create, edit, and delete game sessions.
- View reports of session popularity.

### **Player Functionalities**
- Join game sessions.
- View available sessions and sports.
- Manage their own participation.

### **General Functionalities**
- Secure routing with authentication middleware.
- Dynamic rendering with **EJS**.
- Responsive static assets served from the `public/` folder.

## **Installation & Setup**

### **1. Clone the Repository**
```sh
git clone https://github.com/upendra042/sports-scheduler.git
cd sports-scheduler
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Set Up the Database**
- Ensure **PostgreSQL** is installed and running.
- Create a database and update the connection details in `db.js`.
- Run migrations (if using Sequelize) or manually create tables:
  ```sql
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT,
    role VARCHAR(50)
  );

  CREATE TABLE sports (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
  );

  CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    sport_id INTEGER REFERENCES sports(id),
    creator_id INTEGER REFERENCES users(id),
    team1 VARCHAR(100),
    team2 VARCHAR(100),
    date TIMESTAMP,
    venue VARCHAR(255)
  );
  ```

### **4. Start the Server**
```sh
npm start
```
Server runs on: `http://localhost:3000`

## **Usage**
1. Sign up as an **Admin** or **Player**.
2. **Admins** can create sports and manage sessions.
3. **Players** can view available sports, join sessions, and track schedules.
4. Generate reports from the **Reports** section.

## **API Endpoints**
| Method | Route                 | Description |
|--------|-----------------------|-------------|
| GET    | `/`                   | Redirects to index |
| GET    | `/login`              | Login page |
| POST   | `/login`              | Authenticate user |
| GET    | `/signup`             | Signup page |
| POST   | `/signup`             | Register new user |
| GET    | `/admin-dashboard`    | Admin dashboard |
| POST   | `/create-sport`       | Create a new sport |
| POST   | `/delete-sport/:id`   | Delete a sport |
| POST   | `/create-session`     | Create a new session |
| POST   | `/join-session`       | Join a session |
| GET    | `/reports`            | View reports |
| GET    | `/logout`             | Logout user |

## **Contributing**
- Fork the repository.
- Create a new branch (`feature-xyz`).
- Commit changes and push.
- Open a Pull Request.

## **License**
This project is licensed under the **MIT License**.

## **Author**
Developed by **[Upendra Chowdary]**.

