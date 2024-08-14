# Training Department Management System

The **Training Department Management System** is a comprehensive web application designed to manage trainees, trainers, and project assignments within a training department. The system is divided into three main modules: Trainee Manager, Trainers, and Trainees. It includes functionalities such as user registration, login, form validation, real-time notifications, trainer allocation, project assignment, and class schedule tracking.

## Features

- **User Registration & Login:**
  - Live form validation for name, email, and phone number.
  - Upload profile image and degree certificates.
  - Unique email validation with error handling.
  - Secure password requirements and email confirmation.
  
- **Trainee Manager:**
  - Full control over all modules.
  - View and manage trainer and trainee details.
  - Receive notifications for newly registered trainees.
  - Approve/reject trainees and trainers.
  - Allocate students to trainers based on availability and department.
  - Manage departments, trainers, and attendance.
  - Approve or reject leave requests from trainers and trainees.

- **Trainer:**
  - Receive notifications related to their departments.
  - View class schedules and allocate projects to trainees.
  - Download trainee-submitted projects.
  - Manage attendance and request leave.

- **Trainee:**
  - View notifications, upload projects, and track deadlines.
  - Access class schedules and attendance dashboard.
  - Request leave.

Project Structure
Frontend (Vite + React)
The frontend is developed using Vite and React. It includes various pages for login, registration, and separate dashboards for managers, trainers, and trainees.

Installation
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install the dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Project Files
src/pages/login.jsx: Login page component.
src/pages/register.jsx: Registration page component.
src/pages/manager.jsx: Manager dashboard page.
src/pages/trainee.jsx: Trainee dashboard page.
src/pages/trainer.jsx: Trainer dashboard page.
Backend (Django + Django REST Framework)
The backend is powered by Django and Django REST Framework. It handles user authentication, project management, and other core functionalities.

Installation
Navigate to the backend directory:

bash
Copy code
cd backend
Create a virtual environment:

bash
Copy code
python -m venv venv
Activate the virtual environment:

On Windows:

bash
Copy code
venv\Scripts\activate
On macOS/Linux:

bash
Copy code
source venv/bin/activate
Install the dependencies:

bash
Copy code
pip install -r requirements.txt
Set up the database:

bash
Copy code
python manage.py migrate
Create a superuser:

bash
Copy code
python manage.py createsuperuser
Start the development server:

bash
Copy code
python manage.py runserver
Project Files
myproject/settings.py: Django settings file with configurations for database, JWT authentication, and email backend.
myapp/models.py: Models for users, trainers, trainees, departments, etc.
myapp/serializers.py: Serializers for transforming models into JSON responses.
myapp/views.py: Views handling the API logic and responses.
urls.py: URL routing for the application.
Database
Database Engine: MySQL
Database Name: (to be filled)
User: (to be filled)
Password: (to be filled)
Host: localhost
Port: 3306
JWT Authentication
The project uses JWT (JSON Web Token) for authentication, with a token lifetime of 10 days for access tokens.

Email Backend
The system is configured to use Gmail's SMTP server for sending confirmation emails during user registration.

Email Host: smtp.gmail.com
Email Port: 587
Email User: (to be filled)
Email Password: (to be filled)
Media Files
Media files such as profile images and degree certificates are stored in the media/ directory.
Running the Application
Make sure both the frontend and backend servers are running.
Access the frontend via http://localhost:5173 (or the port configured in Vite).
The backend API can be accessed via http://localhost:8000.
