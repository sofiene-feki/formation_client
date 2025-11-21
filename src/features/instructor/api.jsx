import axios from "@/lib/axios";

export const instructorApi = {
  getInstructorCourses: async () => {
    const token = localStorage.getItem("token"); // fetch here
    const { data } = await axios.get("/api/instructor/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  getInstructorCourseById: async (id) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`/api/instructor/course/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  getInstructorKPI: async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/api/instructor/kpi", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  getStudentsForCourse: async (courseId) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `/api/instructor/course/${courseId}/students`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },

  getCourseKPI: async (courseId) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`/api/instructor/course/${courseId}/kpi`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  getStudentProgress: async (courseId, userId) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `/api/instructor/course/${courseId}/student/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
};
