import axios from "@/lib/axios";

export const studentCourseApi = {
  // --------------------------------------------------
  // 1. Assign a course to a user
  // --------------------------------------------------
  assignCourse: async ({ userId, courseId }) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      "/api/user-course/assign",
      { userId, courseId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },

  // --------------------------------------------------
  // 2. Get progress for a user/course
  // --------------------------------------------------
  getProgress: async (userId, courseId) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `/api/user-course/${userId}/${courseId}/progress`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },

  // --------------------------------------------------
  // 3. Update progress for a content item (chapter/video/quiz)
  // --------------------------------------------------
  updateItemProgress: async (userId, courseId, progressData) => {
    // progressData = { itemIndex, type, completed?, watchedSeconds?, totalSeconds?, score?, passed?, attempts? }
    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      `/api/user-course/${userId}/${courseId}/update-progress`,
      progressData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },

  // --------------------------------------------------
  // 4. Get all courses for a user (My Courses)
  // --------------------------------------------------
  getAllForUser: async (userId) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`/api/user-course/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  // --------------------------------------------------
  // 5. Get all students enrolled in a course (Instructor view)
  // --------------------------------------------------
  getStudentsForCourse: async (courseId) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `/api/user-course/course/${courseId}/students`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },

  // --------------------------------------------------
  // 6. Delete a user enrollment (Admin)
  // --------------------------------------------------
  deleteUserCourse: async (enrollmentId) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(`/api/user-course/${enrollmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
};
