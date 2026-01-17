# EduStack Frontend

EduStack Frontend is a modern, responsive React application that allows students and teachers to access university-wise syllabus, previous year question papers (PYQs), answers, and notes through a structured and user-friendly interface.

---

## Features

### Student
- Browse syllabus and PYQs for free
- Premium access to answers and notes
- University → Course → Branch → Semester → Subject flow
- Subscription-based content access

### Teacher
- Full premium access
- Download syllabus and notes
- (Optional) Upload content for approval

### Admin
- Dashboard access
- Content moderation
- User & subscription management

---

## User Flow

```text
Landing Page
 → Select University
 → Select Course
 → Select Branch
 → Select Semester
 → Select Subject
 → View:
    - Syllabus
    - PYQs
    - Answers (Premium)
    - Notes (Premium)

==============================================================

EduStack/
│
├── frontend/                 # React App
│   ├── public/
│   │   └── index.html
│   │
│   └── src/
│       ├── assets/           # Images, icons
│       ├── components/       # Reusable UI components
│       │   ├── common/       # Button, Modal, Loader
│       │   ├── layout/       # Navbar, Footer
│       │   └── cards/        # SubjectCard, PaperCard
│       │
│       ├── pages/            # Route-based pages
│       │   ├── Landing/
│       │   ├── Auth/
│       │   ├── University/
│       │   ├── Course/
│       │   ├── Branch/
│       │   ├── Semester/
│       │   ├── Subject/
│       │   ├── Content/      # Syllabus / PYQs / Answers
│       │   ├── Teacher/
│       │   └── Admin/
│       │
│       ├── routes/           # Protected routes
│       ├── context/          # Auth, User, Subscription
│       ├── hooks/            # Custom hooks
│       ├── services/         # API calls
│       ├── utils/            # Helpers
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx

=============================================================
