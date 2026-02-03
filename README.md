# EduStack Frontend

EduStack Frontend is a modern, responsive React application built with **Vite**, **React**, and **Tailwind CSS**. It provides a structured academic experience for students, teachers, and administrators.

---

## 🚀 Key Features

### 👤 Role Selection
- One-click entry for **Student**, **Teacher**, and **Admin** roles.
- Dedicated dashboards for each user type.

### 🎓 Student Experience
- **Personalized Dashboard**: Quick access to universities, subjects, and analytics.
- **Academic Flow**: University → Course → Branch → Semester → Subject.
- **Content Access**: Syllabus and PYQs (Free), Notes and Answers (Premium).

### 👨‍🏫 Teacher Portal
- **Management Tools**: Upload and organize academic content.
- **Usage Statistics**: Track student views and content engagement.
- **Privileged Access**: Automated premium status for all content.

### 🛡️ Admin Command Center
- **System Analytics**: Real-time tracking of users, revenue, and subscriptions.
- **Content Moderation**: Review and approve user-uploaded materials.
- **Platform Control**: Manage university databases and user roles.

---

## 🛤️ User Flow

```text
Role Selection (Home)
 ├── Student Dashboard
 │    └── University → Course → Branch → Semester → Subject → View Content
 ├── Teacher Dashboard
 │    └── Manage Syllabus/PYQs/Answers/Notes → View Stats
 └── Admin Dashboard
      └── Content Moderation → User Management → Subscription Control
```

---

## 📂 Project Structure

```text
client/
├── public/
└── src/
    ├── components/
    │   ├── layout/       # Navbar, Footer
    │   └── cards/        # UI components for lists
    ├── context/          # Auth, Subscription, User states
    ├── hooks/            # API and Data fetching hooks
    ├── pages/
    │   ├── RoleSelection/ # Entry Point
    │   ├── Student/      # Student Dashboard
    │   ├── Teacher/      # Teacher Portal
    │   ├── Admin/        # Admin Panel
    │   └── ...           # Academic pages (University, Course, etc.)
    ├── routes/           # App navigation & Protection
    └── App.jsx
```

---

## 🛠️ Getting Started

1. `npm install`
2. `npm run dev`

