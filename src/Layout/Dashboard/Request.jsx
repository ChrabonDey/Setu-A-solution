import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import { authContext } from '../../provider/Authprovider';

const Request = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();
  const {user}=useContext(authContext);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosPublic.get(`/apply-jobs?posterEmail=${user?.email}`);
        setApplications(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

const handleAccept = async (email, jobId) => {
  try {
    const res = await axiosPublic.patch('/accept-application', {
      applicantEmail: email,
      jobId,
    });

    if (res.data.modifiedCount > 0) {
      setApplications(prev =>
        prev.map(app =>
          app.applicantEmail === email && String(app.jobId) === String(jobId)
            ? { ...app, status: 'accepted' }
            : app
        )
      );
    }
  } catch (error) {
    console.error('Failed to accept application', error);
  }
};



  const viewProfile = (email) => {
    navigate(`/view-profile/${email}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Applicant Email</th>
            <th className="py-2 px-4 text-left">Job Title</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{app.applicantEmail}</td>
              <td className="py-2 px-4">{app.jobTitle}</td>
              <td className="py-2 px-4 capitalize">{app.status}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => viewProfile(app.applicantEmail)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View Profile
                </button>
                <button
                  disabled={app.status === "accepted"}
                  onClick={() => handleAccept(app.applicantEmail, app.jobId)}
                  className={`${
                    app.status === "accepted" ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                  } text-white px-3 py-1 rounded`}
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Request;
