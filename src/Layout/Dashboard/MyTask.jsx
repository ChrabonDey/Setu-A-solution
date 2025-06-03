import React, { useEffect, useState, useContext } from 'react';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import { authContext } from '../../provider/Authprovider';
import { toast } from 'react-toastify';

const MyTask = () => {
  const { user } = useContext(authContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissionData, setSubmissionData] = useState({});
  const axiosPublic = UseAxiosPublic();

  useEffect(() => {
    if (user?.email) {
     axiosPublic
  .get(`/my-accepted-tasks?email=${user.email}`)
  .then(res => {
    // Filter out tasks that have been submitted
    const filtered = res.data.filter(task => !task.submissionStatus);
    setTasks(filtered);
    setLoading(false);
  })

        .catch(err => {
          console.error('Failed to fetch tasks:', err);
          toast.error('Failed to fetch tasks.');
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleChange = (jobId, field, value) => {
    setSubmissionData(prev => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        [field]: value,
      }
    }));
  };

  const handleSubmit = async (jobId, applicantEmail) => {
    const data = submissionData[jobId];
    if (!data?.submissionStatus || !data?.submissionLink) {
      toast.warn('Please select status and add a submission link.');
      return;
    }

    try {
      await axiosPublic.patch('/submit-task', {
        applicantEmail,
        jobId,
        submissionStatus: data.submissionStatus,
        submissionLink: data.submissionLink,
      });

      toast.success('Task submitted successfully!');

      setSubmissionData(prev => {
        const updated = { ...prev };
        delete updated[jobId];
        return updated;
      });

      setTasks(prev => prev.filter(task => task.jobId !== jobId));

    } catch (err) {
      console.error('Failed to submit task:', err);
      toast.error('Submission failed. Try again.');
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500 font-semibold">Loading your tasks...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col h-[80vh]">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b border-gray-300 pb-3 flex-shrink-0">
        My Accepted Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-20 flex-grow">
          You currently have no assigned tasks.
        </p>
      ) : (
        // Scroll container with max height and vertical scroll
        <ul className="space-y-8 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100 flex-grow">
          {tasks.map(task => (
            <li
              key={task._id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-indigo-700">{task.jobTitle}</h3>
                <span className="text-sm text-gray-500 font-medium">Job ID: {task.jobId}</span>
              </div>

              <p className="text-gray-700 mb-6"><strong>Current Status:</strong> <span className="capitalize">{task.status}</span></p>

              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSubmit(task.jobId, task.applicantEmail);
                }}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor={`status-${task.jobId}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Task Status
                  </label>
                  <select
                    id={`status-${task.jobId}`}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={submissionData[task.jobId]?.submissionStatus || ''}
                    onChange={(e) =>
                      handleChange(task.jobId, 'submissionStatus', e.target.value)
                    }
                    required
                  >
                    <option value="" disabled>Select status</option>
                    <option value="completed">Completed</option>
                    <option value="not completed">Not Completed</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`link-${task.jobId}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Submission File/Link
                  </label>
                  <input
                    id={`link-${task.jobId}`}
                    type="url"
                    placeholder="Paste Google Drive link or file URL"
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={submissionData[task.jobId]?.submissionLink || ''}
                    onChange={(e) =>
                      handleChange(task.jobId, 'submissionLink', e.target.value)
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md shadow hover:bg-indigo-700 transition-colors duration-300"
                >
                  Send Submission
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTask;
