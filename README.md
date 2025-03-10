# Blogi - Fullstack Blogging Platform

## Introduction

Blogi is a fullstack blogging platform built with **FastAPI** and **PostgreSQL** for the backend and **Next.js** for the frontend. Users can register, log in, create, edit, and delete blog posts. The platform ensures secure authentication using JWT tokens and follows best practices for API interaction and error handling.

---

## Features

### Authentication

- User registration with a unique username and password.
- Login functionality with username and password.
- JWT-based authentication for securing API requests.
- Logout feature that clears stored tokens.

### Blog Posts

- Users can create blog posts with a title and content.
- Users can view a list of all blog posts.
- Users can edit and delete their own blog posts.
- Blog post list is sorted by most recently created.

## Tech Stack

### Backend

- **FastAPI** - Lightweight and high-performance API framework.
- **PostgreSQL** - Relational database for storing users and blog posts.
- **SQLAlchemy** - ORM for database interactions.
- **PyJWT** - Handling JWT authentication.

### Frontend

- **Next.js** - For building the frontend interface.
- **Tailwind CSS/Shadcn UI** - For styling.
- **Axios/Fetch API** - For making API calls.
- **Context API** - For state management.

---

## Setup and Installation

### Prerequisites

- Python 3.9+
- PostgreSQL
- Node.js 16+

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/vasa-r/datachecks-assignment.git
   ```

### **2. Backend Setup (FastAPI + PostgreSQL)**

```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### **2.1 Configure Environment Variables**

Create a `.env` file inside `server/`:

```env
DATABASE_URL=postgresql://username:password@localhost/blogidb
SECRET_KEY=your_secret_key
```

#### **2.3 Start the Backend Server**

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

### **3. Frontend Setup (Next.js)**

```bash
cd ../client
npm install
```

#### **3.1 Configure Environment Variables**

Create a `.env.local` file inside `client/`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

#### **3.2 Start the Frontend**

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint  | Description                 |
| ------ | --------- | --------------------------- |
| POST   | `/signup` | Register a new user         |
| POST   | `/signin` | User login & JWT generation |

### Blog Posts

| Method | Endpoint          | Description            |
| ------ | ----------------- | ---------------------- |
| GET    | `/blog/all`       | Get all blog posts     |
| GET    | `/blog/user-blog` | Get all blog posts     |
| POST   | `/blog`           | Create a new blog post |
| GET    | `/blog/{blog-id}` | Get a single blog post |
| PATCH  | `/blog/{blog-id}` | Update a blog post     |
| DELETE | `/blog/{blog-id}` | Delete a blog post     |

---

## Error Handling

- Returns `404 Not Found` for non-existent resources.
- Returns `401 Unauthorized` for invalid authentication.
- Returns `400 Bad Request` for invalid input data.
