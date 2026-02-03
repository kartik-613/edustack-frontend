// Check user role
export const isStudent = (user) => user?.role === "student";
export const isTeacher = (user) => user?.role === "teacher";
export const isAdmin = (user) => user?.role === "admin";
