import axios from "@/lib/axios";

export const courseApi = {
  // ✅ Get all courses
  getAll: async () => {
    const { data } = await axios.get("/api/courses");
    return data;
  },

  // ✅ Get one course by ID
  getById: async (id) => {
    const { data } = await axios.get(`/api/courses/${id}`);
    return data;
  },

  // ✅ Create a new course
  create: async (courseData) => {
    const { data } = await axios.post("/api/courses", courseData);
    return data;
  },

  // ✅ Update a course
  update: async (id, updates) => {
    const { data } = await axios.put(`/api/courses/${id}`, updates);
    return data;
  },

  // ✅ Delete a course
  delete: async (id) => {
    const { data } = await axios.delete(`/api/courses/${id}`);
    return data;
  },
  getByInstructor: async (fullName) => {
    const res = await axios.get(`/api/courses/instructor?name=${fullName}`);
    return res.data;
  },
};
