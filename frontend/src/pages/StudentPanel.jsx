import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

const STATUS_COLORS = {
    pending:  "bg-orange-100 text-orange-600",
    verified: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-600",
};

const Field = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-400 uppercase mb-1">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value ?? "—"}</p>
    </div>
);

function StudentPanel() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get("http://localhost:3000/auth/student-dashboard");
                if (res.data.status === "success") {
                    setStudent(res.data.student);
                } else {
                    navigate("/");
                }
            } catch (err) {
                console.log(err);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, []);

    const handleLogout = async () => {
        await axios.get("http://localhost:3000/auth/logout");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <div className="bg-white shadow p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Student Document System</h2>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm"
                >
                    Logout
                </button>
            </div>

            <div className="p-6 max-w-4xl mx-auto">
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : !student ? (
                    <p className="text-gray-500">Student not found.</p>
                ) : (
                    <>
                        {/* Header */}
                        <div className="bg-white rounded-xl shadow p-6 mb-6 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">{student.fullName}</h1>
                                <p className="text-gray-500 text-sm mt-1">{student.email}</p>
                                <p className="text-gray-500 text-sm">{student.course ?? "—"}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[student.status] ?? "bg-gray-100 text-gray-600"}`}>
                                {student.status}
                            </span>
                        </div>

                        {/* Status Message */}
                        {student.status === "pending" && (
                            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 text-sm text-orange-700">
                                ⏳ Your documents are under review. Please wait for verification.
                            </div>
                        )}
                        {student.status === "verified" && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-sm text-green-700">
                                ✓ Your documents have been verified successfully.
                            </div>
                        )}
                        {student.status === "rejected" && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">
                                ✗ Your documents were rejected. Please contact the admin.
                            </div>
                        )}

                        {/* Personal Info */}
                        <div className="bg-white rounded-xl shadow p-6 mb-6">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <Field label="Full Name" value={student.fullName} />
                                <Field label="Email" value={student.email} />
                                <Field label="Phone" value={student.phone} />
                                <Field label="Gender" value={student.gender} />
                                <Field label="Date of Birth" value={student.dob} />
                                <Field label="Address" value={student.address} />
                            </div>
                        </div>

                        {/* Academic Info */}
                        <div className="bg-white rounded-xl shadow p-6 mb-6">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">Academic Information</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <Field label="Course" value={student.course} />
                                <Field label="10th Percentage" value={student.tenthPercentage} />
                                <Field label="12th Percentage" value={student.twelfthPercentage} />
                                <Field label="ID Type" value={student.idType} />
                                <Field label="Registered On" value={new Date(student.createdAt).toLocaleDateString()} />
                            </div>
                        </div>

                        {/* Documents */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">Uploaded Documents</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { label: "10th Marksheet", file: student.tenthMarksheet },
                                    { label: "12th Marksheet", file: student.twelfthMarksheet },
                                    { label: "Transfer Certificate", file: student.transferCertificate },
                                    { label: "Passport Photo", file: student.passportPhoto },
                                    { label: "ID Proof", file: student.idProof },
                                ].map(({ label, file }) => (
                                    <div key={label} className="border rounded-lg p-3">
                                        <p className="text-xs text-gray-400 uppercase mb-2">{label}</p>
                                        {file ? (
                                            <a
                                                href={`http://localhost:3000/uploads/${encodeURIComponent(file)}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-500 text-sm hover:underline"
                                            >
                                                View File
                                            </a>
                                        ) : (
                                            <p className="text-gray-400 text-sm">Not uploaded</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default StudentPanel;