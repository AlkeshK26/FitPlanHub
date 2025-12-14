FitPlanHub 
FitPlanHub is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to bridge the gap between Fitness Trainers and Health Enthusiasts. It features a robust ecosystem where trainers can create and monetize workout plans, while users can discover, subscribe to, and track premium fitness content.

 Project Overview
The application is built with a modern, aesthetic UI using Tailwind CSS and Glassmorphism design principles. It features role-based authentication, dynamic content locking (subscription-based access), and a comprehensive dashboard for trainers to track their earnings and subscribers.

Key Features
 Frontend (User Experience)
Aesthetic Landing Page: High-quality visuals, glassmorphism effects, and a responsive grid layout showcasing features.

Role-Based Authentication: Secure Login/Signup separation for Users and Trainers.

Explore Feed: Users can browse various workout plans created by different trainers.

Content Locking System 🔒: Detailed workout schedules and diet charts are hidden until the user subscribes to the specific plan.

Nutrition Guide 🥗: An interactive visual database of 25+ gym foods (Proteins, Carbs, Fats) with a popup modal showing detailed macro-nutrients.

User Dashboard:

Track active subscriptions.

View "Following" list (Trainers).

Update Profile details.

Trainer Dashboard:

Analytics: View total earnings and subscriber count.

Plan Management: Create and delete workout plans.

Subscriber List: View a table of users who purchased plans.

⚙️ Backend (Server Logic)
Secure API: Built with Express.js and protected via JWT (JSON Web Tokens).

Database: MongoDB with Mongoose for structured data modeling (Users, Plans, Subscriptions).

Password Encryption: Uses bcryptjs for hashing passwords.

Subscription Logic: Validates user purchases and manages access control for locked content.

Smart Analytics: Aggregates data to calculate trainer revenue and follower counts dynamically.


Component,Technology
Frontend,"React.js, Vite, Tailwind CSS, React Router DOM, Axios"
Backend,"Node.js, Express.js"
Database,MongoDB (Mongoose ODM)
Auth,"JWT (JSON Web Tokens), Bcrypt.js"
Tools,"Postman, VS Code, Git"



FitPlanHub/
│
├── backend/                # Server Side Code
│   ├── config/             # DB Connection
│   ├── models/             # Mongoose Schemas (User, Plan, Subscription)
│   ├── routes/             # API Routes (Auth, Feed, Plans, Analytics)
│   └── server.js           # Entry point
│
└── frontend/               # Client Side Code
    ├── src/
    │   ├── api/            # Axios instance
    │   ├── components/     # Reusable UI (Navbar, PlanCard)
    │   ├── pages/          # Full Pages (Login, Dashboard, Feed, Nutrition)
    │   └── App.jsx         # Routing Logic


 Method,  Endpoint,                    Description
POST,    /api/auth/signup,             Register a new user/trainer
POST,    /api/auth/login,              Login and receive JWT
GET,     /api/plans,                    Fetch all plans for the feed
POST,    /api/plans,                    Create a new plan (Trainer only)
POST,    /api/subscriptions,            Subscribe to a plan
GET,     /api/analytics/trainer/stats,  Get trainer earnings & subscribers




🎨 Frontend Documentation (Client Side)
The frontend is built using React + Vite and styled with Tailwind CSS, featuring a modern "Glassmorphism" aesthetic and responsive design.

1. Landing Page (Landing.jsx)
The entry point of the application.

Hero Section: Features a high-quality background with a dark gradient overlay and call-to-action buttons for "Start Free Trial" and "Login".

Features Grid: Highlights key offerings like Custom Plans, Progress Tracking, and the Nutrition Guide.

Navigation: Directs users to the Nutrition Guide or Authentication pages.

2. Authentication Pages (Login.jsx & Signup.jsx)
Split-Screen Design: A modern UI with high-quality fitness visuals on one side and a form on the other.

Role Selection: During signup, users can choose to register as a "User" (to buy plans)qr a "Trainer" (to sell plans).

Smart Redirection: Upon login, the app detects the role and redirects Trainers to the Dashboard and Users to the Explore Feed.

3. Explore Feed (Feed.jsx)
Plan Browsing: Displays a grid of all available fitness plans created by trainers.

Plan Cards: Each card shows the plan title, price, duration, and trainer name. Clicking a card takes the user to the Plan Details page.

4. Plan Details Page (PlanDetails.jsx)
Content Locking System: This is a core feature. If a user is not subscribed, the detailed workout schedule is "Locked" 🔒.

Subscription Logic: Includes a "Subscribe Now" button. Once clicked (and backend verification passes), the content unlocks, revealing the full workout routine.

Trainer Attribution: Displays the name of the trainer who created the plan.

5. User Profile (UserProfile.jsx)
Personal Dashboard: Displays the user's name, email, and stats.

Edit Profile: Users can update their display name directly from this page.

My Subscriptions: A list of all plans the user has currently subscribed to.

Following List: Shows a list of Trainers the user is currently following.

6. Trainer Dashboard (TrainerDashboard.jsx)
Analytics: Trainers can see their total earnings and subscriber counts.

Create Plan: A form to upload new workout plans (Title, Price, Duration, Description).

Subscriber List: A table view showing which users have purchased their plans.

7. Nutrition Guide (NutritionGuide.jsx)
Food Database: A visually rich grid displaying 25+ high-quality gym foods (Protein, Carbs, Healthy Fats).

Interactive Modals: Clicking on a food item opens a popup displaying detailed macros (Protein, Carbs, Fats, Calories per 100g).

⚙️ Backend Documentation (Server Side)
The backend is built with Node.js & Express, using MongoDB for the database. It uses JWT (JSON Web Tokens) for secure authentication.

Controllers logic 

authController.js (Login/Signup)

planController.js (Plans Logic)

feedController.js (Explore Feed)

followController.js (Follow/Unfollow)

analyticsController.js (Trainer Stats)

subscriptionController.js (Subscribe Logic)

1. Authentication Routes (/api/auth)
POST /signup: Registers a new user or trainer. Hashes passwords using bcryptjs for security.

POST /login: Verifies credentials and issues a JWT Token. Returns the user's role (User/Trainer).

GET /me: Fetches the current logged-in user's profile data.

PUT /update-profile: Allows users to update their profile information (e.g., Name).

2. Plan Routes (/api/plans)
GET /: Fetches all available plans for the Feed.

POST /: (Protected) Allows Trainers to create and save new workout plans to the database.

GET /:id: Fetches the specific details of a single plan.

3. Subscription Routes (/api/subscriptions)
POST /: Handles the transaction when a user clicks "Subscribe". It links a User ID to a Plan ID in the database.

GET /check/:planId: Checks if a specific user is already subscribed to a specific plan (used for the Content Lock logic).

4. Feed & Analytics Routes
/api/feed: Optimized routes for fetching the main explore feed data.

/api/analytics (planCheckRoutes):

Trainer Stats: Calculates total revenue generated by a trainer.

Subscriber Count: Aggregates how many unique users have subscribed to a trainer's plans.

5. Follow Routes (/api/follow)
POST /toggle/:id: Allows a user to Follow or Unfollow a trainer.

GET /following: Fetches the list of trainers a user is following.

🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS, Axios, React Router DOM.

Backend: Node.js, Express.js.

Database: MongoDB (Mongoose ODM).

Authentication: JWT (JSON Web Tokens), Bcrypt.js



How to Run Locally
Clone the repository.

Backend Setup:
cd backend
npm install
npm run dev


Frontend Setup:
cd frontend
npm install
npm run dev