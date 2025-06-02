import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import { authContext } from '../../provider/Authprovider';
import Swal from 'sweetalert2';

const VewJob = () => {
  const { id } = useParams();
  const axiosPublic = UseAxiosPublic();
  const [job, setJob] = useState(null);
  const { user } = useContext(authContext);

  const [hasApplied, setHasApplied] = useState(false);

  
  useEffect(() => {
    if (!user?.email) return;

    const checkApplication = async () => {
      try {
        // Assuming you have an API endpoint to get all applications by user
        const res = await axiosPublic.get(`/apply-jobs?applicantEmail=${user.email}`);
        
        const applied = res.data.some(app => app.jobId === id);
        setHasApplied(applied);
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };

    checkApplication();
  }, [id, user, axiosPublic]);

  const handleSubmit = async () => {
    if (hasApplied) {
      Swal.fire({
        icon: 'info',
        title: 'Already Applied',
        text: 'You have already applied for this job.',
      });
      return;
    }

    try {
      const applicationData = {
  jobId: job._id,
  jobTitle: job.title,
  company: job.company || 'Unknown Company',
  location: job.location,
  salary: job.salary,
  jobPosterEmail: job.Email || job.posterEmail || 'unknown@poster.com',  // Adjust based on your DB
  applicantEmail: user?.email || "user@example.com",
  status: "pending",
  appliedAt: new Date(),
};


      const response = await axiosPublic.post("/apply-jobs", applicationData);

      if (response.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Application submitted!',
          text: '✅ Your application has been submitted successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
        setHasApplied(true); 
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Failed to apply',
          text: '⚠️ Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: '❌ Error applying for the job.',
      });
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosPublic.get(`/jobs`);
        const foundJob = res.data.find(j => j._id === id);
        setJob(foundJob);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [id, axiosPublic]);

  if (!job) {
    return <div className="text-center mt-10 text-gray-500">Loading job details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl space-y-4">
      <h1 className="text-3xl font-bold text-indigo-700">{job.title}</h1>
      <p className="text-gray-700 text-lg">{job.description}</p>
      <div className="text-gray-600 space-y-1">
        <p>📍 <strong>Location:</strong> {job.location}</p>
        <p>💰 <strong>Salary:</strong> ${job.salary}</p>
        <p>📅 <strong>Posted On:</strong> {new Date(job.timestamp).toLocaleDateString()}</p>
        <button
          onClick={handleSubmit}
          disabled={hasApplied}
          className={`px-5 py-2 rounded-xl shadow transition duration-200 ${
            hasApplied
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {hasApplied ? "Already Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default VewJob;
