import axios from "@/lib/axios";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
  create: async (course) => {
    const res = await axios.post("/api/courses", course, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.course;
  },

  // ✅ Update a course
  update: async (id, updates) => {
    const { data } = await axios.put(`/api/courses/${id}`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
