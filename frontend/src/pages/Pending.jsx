import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

axios.defaults.withCredentials = true;

function Pending(){

  const navigate = useNavigate();
  const [groupedStudents, setGroupedStudents] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState(null);

  useEffect(() => {
    const fetchPendingStudents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/pending-students");
        console.log(res.data);
        if (res.data.status === "success") {
          setGroupedStudents(res.data.data);
          // set first course as active by default
          const firstCourse = Object.keys(res.data.data)[0];
          setActiveCourse(firstCourse);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingStudents();
  }, []);

  const courses = Object.keys(groupedStudents);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-6">Pending Verification</h1>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-gray-500">No pending students.</p>
          ) : (
            <>
              {/* Course Tabs */}
              <div className="flex gap-3 mb-6 flex-wrap">
                {courses.map((course) => (
                  <button
                    key={course}
                    onClick={() => setActiveCourse(course)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      activeCourse === course
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-orange-100"
                    }`}
                  >
                    {course}
                    <span className="ml-2 bg-white text-orange-500 rounded-full px-2 py-0.5 text-xs font-bold">
                      {groupedStudents[course].length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Students Table */}
              {activeCourse && (
                <div className="bg-white rounded-xl shadow overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                      <tr>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Phone</th>
                        <th className="px-6 py-3 text-left">Gender</th>
                        <th className="px-6 py-3 text-left">DOB</th>
                        <th className="px-6 py-3 text-left">Submitted</th>
                        <th className="px-6 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {groupedStudents[activeCourse].map((student) => (
                        <tr key={student._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{student.fullName}</td>
                          <td className="px-6 py-4 text-gray-500">{student.email}</td>
                          <td className="px-6 py-4 text-gray-500">{student.phone ?? "—"}</td>
                          <td className="px-6 py-4 text-gray-500">{student.gender ?? "—"}</td>
                          <td className="px-6 py-4 text-gray-500">{student.dob ?? "—"}</td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(student.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                            onClick={() => navigate(`/student/${student._id}`)}>
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pending;