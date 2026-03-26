
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function StudentForm() {

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const [file, setFile] = useState({
    tenthMarksheet: null,
    twelfthMarksheet: null,
    transferCertificate: null,
    passportPhoto: null,
    idProof: null,

  });

  const [formData, setFormData] = useState({
    fullName: location.state?.name || "",
    email: location.state?.email || "",
    password: location.state?.password || "",
    role: location.state?.role || "",
    phone: "",
    gender: "",
    dob: "",
    course: "BCA",
    address: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    idType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    Object.keys(file).forEach((key) => {
      data.append(key, file[key]);
    });

    try {
      const result = await axios.post(
        "http://localhost:3000/auth/register",
        data,
        {
          headers: {
            "content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result)
      if (result.data.status === "success") {
        alert("form submitted successfully!");
        navigate('/');
      }
    } catch (err) {
      console.log(err)
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admission Form
        </h2>

        <select
          name="course"
          onChange={handleChange}
          className="w-50 mb-4 p-2 border rounded">
          <option value="">Select Course</option>
          <option value="BCA">BCA</option>
          <option value="BBA">BBA</option>
          <option value="BCOM">BCOM</option>
        </select>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          maxLength="10"
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <div className="mb-4">
          <label className="mr-4">Gender:</label>
          <label className="mr-2">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="text"
          name="tenthPercentage"
          placeholder="10th Percentage"
          value={formData.tenthPercentage}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="file"
          name="tenthmarksheet"
          onChange={(e) =>
            setFile({ ...file, tenthMarksheet: e.target.files[0] })}
          className="w-70 mb-4 p-3 border rounded"
          required
        />

        <input
          type="text"
          name="twelfthPercentage"
          placeholder="12th Percentage"
          value={formData.twelfthPercentage}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="file"
          name="twelfthMarksheet"
          onChange={(e) =>
            setFile({ ...file, twelfthMarksheet: e.target.files[0] })}
          className="w-70 mb-4 p-3 border rounded"
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <div className="mr-4">
          <label className="mr-4">TC:</label>
          <label className="mr2">
            <input
              type="file"
              name="transferCertificate"
              onChange={(e) =>
                setFile({ ...file, transferCertificate: e.target.files[0] })}
              className="w-50 mb-4 p-3 border rounded"
              required
            />
          </label>
        </div>

        <div className="mr-4">
          <label className="mr-4">Passport Photo:</label>
          <label className="mr2">
            <input
              type="file"
              name="passportPhoto"
              onChange={(e) =>
                setFile({ ...file, passportPhoto: e.target.files[0] })}
              className="w-50 mb-4 p-3 border rounded"
              required
            />
          </label>
        </div>

        <div className="mr-4">
          <label className="mr-4">ID Proof:</label>
          <select
            name="idType"
            onChange={handleChange}
            className="w-50 mb-4 p-2 border rounded">
            <option value="">Select ID</option>
            <option value="Aadhar">Aadhar card</option>
            <option value="PAN">PAN card</option>
            <option value="Voter">Voter ID</option>
          </select>
          <label className="mr2">
            <input
              type="file"
              name="idProof"
              onChange={(e) =>
                setFile({ ...file, idProof: e.target.files[0] })}
              className="w-50 mb-4 p-3 border rounded"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >Submit
        </button>
      </form>
    </div>
  );
}


export default StudentForm;