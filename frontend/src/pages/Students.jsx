import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

axios.defaults.withCredentials = true;

const STATUS_COLORS = {
    pending:  "bg-orange-100 text-orange-600",
    verified: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-600",
};

function Students() {
    const navigate = useNavigate();
    const [groupedStudents, setGroupedStudents] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeCourse, setActiveCourse] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchAllStudents = async () => {
            try {
                const res = await axios.get("http://localhost:3000/auth/all-students");
                if (res.data.status === "success") {
                    setGroupedStudents(res.data.data);
                    const firstCourse = Object.keys(res.data.data)[0];
                    setActiveCourse(firstCourse);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllStudents();
    }, []);

    const courses = Object.keys(groupedStudents);

    const filteredStudents = activeCourse
        ? groupedStudents[activeCourse].filter((s) =>
              s.fullName.toLowerCase().includes(search.toLowerCase()) ||
              s.email.toLowerCase().includes(search.toLowerCase())
          )
        : [];

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h1 className="text-4xl font-bold mb-6">All Students</h1>

                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : courses.length === 0 ? (
                        <p className="text-gray-500">No students found.</p>
                    ) : (
                        <>
                            {/* Course Tabs */}
                            <div className="flex gap-3 mb-4 flex-wrap">
                                {courses.map((course) => (
                                    <button
                                        key={course}
                                        onClick={() => {
                                            setActiveCourse(course);
                                            setSearch("");
                                        }}
                                        className={`px-4 py-2 rounded-full font-medium transition-all ${
                                            activeCourse === course
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                                        }`}
                                    >
                                        {course}
                                        <span className="ml-2 bg-white text-blue-500 rounded-full px-2 py-0.5 text-xs font-bold">
                                            {groupedStudents[course].length}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
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
                                                <th className="px-6 py-3 text-left">Status</th>
                                                <th className="px-6 py-3 text-left">Submitted</th>
                                                <th className="px-6 py-3 text-left">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredStudents.length === 0 ? (
                                                <tr>
                                                    <td colSpan={8} className="px-6 py-4 text-center text-gray-400">
                                                        No students found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredStudents.map((student) => (
                                                    <tr key={student._id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 font-medium">{student.fullName}</td>
                                                        <td className="px-6 py-4 text-gray-500">{student.email}</td>
                                                        <td className="px-6 py-4 text-gray-500">{student.phone ?? "—"}</td>
                                                        <td className="px-6 py-4 text-gray-500">{student.gender ?? "—"}</td>
                                                        <td className="px-6 py-4 text-gray-500">{student.dob ?? "—"}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[student.status] ?? "bg-gray-100 text-gray-600"}`}>
                                                                {student.status}
                                                            </span>
                                                        </td>
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
                                                ))
                                            )}
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

export default Students;