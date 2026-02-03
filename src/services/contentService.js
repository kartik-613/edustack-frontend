import API from "./api";

// Fetch subjects by semester or course
export const fetchSubjects = async (universityId, courseId, branchId, semester) => {
  const response = await API.get(`/subjects?university=${universityId}&course=${courseId}&branch=${branchId}&semester=${semester}`);
  return response.data;
};

// Fetch papers
export const fetchPapers = async (subjectId) => {
  const response = await API.get(`/papers?subject=${subjectId}`);
  return response.data;
};

// Fetch answers/notes (premium)
export const fetchContent = async (subjectId, type) => {
  const response = await API.get(`/content?subject=${subjectId}&type=${type}`);
  return response.data;
};
