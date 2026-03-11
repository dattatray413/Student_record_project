// import React from 'react'
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
    <div className="">
        <div className="flex-1 text-[25px] text-blue-900 py-2 ">
            <Link to="/">Login/Signup</Link>
        </div>

      <h1 className="text-2xl font-bold mb-4">
        Students
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200 ">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Course</th>
            <th className="p-3">Documents</th>
          </tr>
        </thead>

        <tbody>

          <tr className="text-center border-t">
            <td className="p-3">Rahul</td>
            <td>rahul@gmail.com</td>
            <td>BCA</td>
            <td>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                View
              </button>
            </td>
          </tr>

        </tbody>

      </table>

    </div>
    </>
  )
}

export default Home