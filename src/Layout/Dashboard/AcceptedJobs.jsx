import React, { useEffect, useState } from 'react';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import Swal from 'sweetalert2';
import { MentionsInput, Mention } from 'react-mentions';

const AcceptedJobs = () => {
  const axiosPublic = UseAxiosPublic();
  const [pendingJobs, setPendingJobs] = useState([]);


  const fetchPendingJobs = async () => {
    try {
      const res = await axiosPublic.get('/jobs?status=pending');
      setPendingJobs(res.data);
    } catch (error) {
      console.error('Error fetching pending jobs:', error);
    }
  };

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  const handleAllow = async (id) => {
    const result = await Swal.fire({
      title: 'Allow this job post?',
      text: 'Once accepted, it will be visible on the FindJobs page.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, allow it!',
    });

    if (result.isConfirmed) {
      try {
        await axiosPublic.patch(`/jobs/${id}`, { status: 'accept' });
        Swal.fire('Accepted!', 'The job is now visible.', 'success');
        fetchPendingJobs();
      } catch (error) {
        console.error('Error updating job status:', error);
        Swal.fire('Error', 'Something went wrong while accepting the job.', 'error');
      }
    }
  };

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This job will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axiosPublic.delete(`/jobs/${id}`);
        Swal.fire('Deleted!', 'The job has been removed.', 'success');
        fetchPendingJobs();
      } catch (error) {
        console.error('Error removing job:', error);
        Swal.fire('Error', 'Something went wrong while deleting the job.', 'error');
      }
    }
  };



  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <div >
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">📝 Pending Job Posts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="py-3 px-6 border-b font-semibold">Job Title</th>
                <th className="py-3 px-6 border-b font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingJobs.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center py-6 text-gray-500">
                    No pending jobs.
                  </td>
                </tr>
              ) : (
                pendingJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-6 border-b">
                      {job.title || job.job?.title || 'Untitled'}
                    </td>
                    <td className="py-3 px-6 border-b flex gap-3">
                      <button
                        onClick={() => handleAllow(job._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                      >
                        Allow
                      </button>
                      <button
                        onClick={() => handleRemove(job._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcceptedJobs;
