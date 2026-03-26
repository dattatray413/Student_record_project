import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/sidebar";

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

function StudentInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/auth/student/${id}`);
                if (res.data.status === "success") {
                    setStudent(res.data.data);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    const handleStatus = async (status) => {
        try {
            setUpdating(true);
            const res = await axios.patch(
                `http://localhost:3000/auth/student/${id}/status`,
                { status }
            );
            if (res.data.status === "success") {
                setStudent(res.data.data); // update UI with new status
            }
        } catch (err) {
            console.log(err);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
    
                <div className="p-6">

                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 text-sm text-blue-500 hover:underline flex items-center gap-1"
                    >
                        ← Back
                    </button>

                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : !student ? (
                        <p className="text-gray-500">Student not found.</p>
                    ) : (
                        <div className="max-w-4xl">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold">{student.fullName}</h1>
                                    <p className="text-gray-500 text-sm mt-1">{student.email}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[student.status] ?? "bg-gray-100 text-gray-600"}`}>
                                    {student.status}
                                </span>
                            </div>

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
                            <div className="bg-white rounded-xl shadow p-6 mb-6">
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

                            {/* Approve / Reject */}
                            {student.status === "pending" && (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleStatus("verified")}
                                        disabled={updating}
                                        className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium"
                                    >
                                        {updating ? "Updating..." : "✓ Approve"}
                                    </button>
                                    <button
                                        onClick={() => handleStatus("rejected")}
                                        disabled={updating}
                                        className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium"
                                    >
                                        {updating ? "Updating..." : "✗ Reject"}
                                    </button>
                                </div>
                            )}

                            {/* Already actioned */}
                            {student.status !== "pending" && (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleStatus("verified")}
                                        disabled={updating || student.status === "verified"}
                                        className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium"
                                    >
                                        ✓ Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatus("rejected")}
                                        disabled={updating || student.status === "rejected"}
                                        className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium"
                                    >
                                        ✗ Reject
                                    </button>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentInfo;