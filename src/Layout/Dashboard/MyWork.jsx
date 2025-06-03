import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../provider/Authprovider';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import { toast } from 'react-toastify';

const MyWork = () => {
  const { user } = useContext(authContext);
  const axiosPublic = UseAxiosPublic(); 
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/my-posted-tasks?email=${user.email}`)
        .then(res => {
          const filtered = res.data.filter(task => task.submissionStatus === 'completed');
          setCompletedTasks(filtered);
        })
        .catch(() => toast.error("Failed to load completed tasks"));
    }
  }, [user?.email]);

  const handlePay = async () => {
    if (!selectedTask) return;
    setIsPaying(true);
const payload = {
  jobId: selectedTask.jobId || selectedTask._id,
  applicantEmail: selectedTask.applicantEmail,
  jobPosterEmail: user?.email, // ✅ Add this line
  credits: 5,
};

    console.log("SENDING PAYMENT DATA:", payload);

    try {
      await axiosPublic.post('/reward-applicant', payload);

      toast.success('Payment successful! 5 credits rewarded.');
      setCompletedTasks(prev => prev.filter(task => (task.jobId || task._id) !== (selectedTask.jobId || selectedTask._id)));
      setShowModal(false);
      setSelectedTask(null);
    } catch (err) {
      console.error('Payment Error:', err?.response?.data || err.message);
      toast.error('Payment failed. Try again.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Completed Tasks by Applicants</h2>

      {completedTasks.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No completed tasks yet.</p>
      ) : (
        <ul className="space-y-6">
          {completedTasks.map(task => (
            <li key={task.jobId || task._id} className="bg-white shadow-md rounded-lg p-5 border">
              <h3 className="text-xl font-semibold text-indigo-700">{task.jobTitle}</h3>
              <p className="text-gray-600">Applicant: {task.applicantEmail}</p>
              <p className="text-gray-600">
                Submission: <a className="text-blue-600 underline" href={task.submissionLink} target="_blank" rel="noreferrer">{task.submissionLink}</a>
              </p>
              <button
                onClick={() => {
                  setSelectedTask(task);
                  setShowModal(true);
                }}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Pay 5 Credits
              </button>
            </li>
          ))}
        </ul>
      )}

      {showModal && selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Payment</h2>
            <p>You are about to send <strong>5 credits</strong> to <span className="text-indigo-600">{selectedTask.applicantEmail}</span> for completing the job: <strong>{selectedTask.jobTitle}</strong>.</p>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedTask(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePay}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={isPaying}
              >
                {isPaying ? 'Processing...' : 'Confirm & Pay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWork;
