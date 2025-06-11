import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../Layout/MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/Signup/SignUp';
import Dashboard from '../Layout/Dashboard/Dashboard';
import Edit from '../Layout/Dashboard/Edit';
import Profile from '../Layout/Dashboard/Profile';
import Post_Jobs from '../Layout/Dashboard/Post_Jobs';
import FindJobs from '../Pages/Find/FindJobs';
import VewJob from '../Pages/Find/VewJob';
import ViewProfile from '../Layout/Dashboard/ViewProfile';
import Request from '../Layout/Dashboard/Request';
import AcceptedJobs from '../Layout/Dashboard/AcceptedJobs';
import ChatApp from '../Layout/Dashboard/ChatApp';
import TestMentions from '../Layout/Dashboard/TestMentions';
import MyTask from '../Layout/Dashboard/MyTask';
import MyWork from '../Layout/Dashboard/MyWork';
import JobPostForm from '../Layout/Dashboard/JobPostForm';
import FreelancerDashboard from '../Layout/Dashboard/FreelancerDashboard';
import DashboardNex from '../Layout/Dashboard/dashboardnex';
import EditProfile from '../Layout/Dashboard/EditProfile';

// Dummy components for each DashboardNex menu/submenu route
const DashboardNexFindWork = () => <div>DashboardNex - Find Work</div>;
const DashboardNexFindWorkAll = () => <div>DashboardNex - Find Work (All)</div>;
const DashboardNexFindWorkApplied = () => <div>DashboardNex - Find Work (Applied)</div>;
const DashboardNexFindWorkAccepted = () => <div>DashboardNex - Find Work (Accepted)</div>;
const DashboardNexFindWorkCompleted = () => <div>DashboardNex - Find Work (Completed)</div>;
const DashboardNexPostJob = () => <div>DashboardNex - Post a Job</div>;
const DashboardNexPostJobAll = () => <div>DashboardNex - Post a Job (All)</div>;
const DashboardNexPostJobActive = () => <div>DashboardNex - Post a Job (Active)</div>;
const DashboardNexPostJobFinished = () => <div>DashboardNex - Post a Job (Finished)</div>;
const DashboardNexFreelancers = () => <div>DashboardNex - Freelancers</div>;
const DashboardNexMyProfile = () => <div>DashboardNex - My Profile</div>;
const DashboardNexMyProfileProfile = () => <Profile />;
const DashboardNexMyProfileReviews = () => <div>DashboardNex - My Profile (Reviews)</div>;
const DashboardNexMyProfileSettings = () => <div>DashboardNex - My Profile (Settings)</div>;
const DashboardNexMessages = () => <div>DashboardNex - Messages</div>;
const DashboardNexProjects = () => <div>DashboardNex - Projects</div>;
const DashboardNexProjectsActive = () => <div>DashboardNex - Projects (Active)</div>;
const DashboardNexProjectsCompleted = () => <div>DashboardNex - Projects (Completed)</div>;
const DashboardNexProjectsPending = () => <div>DashboardNex - Projects (Pending)</div>;
const DashboardNexPayments = () => <div>DashboardNex - Payments</div>;
const DashboardNexPaymentsTransactions = () => <div>DashboardNex - Payments (Transactions)</div>;
const DashboardNexPaymentsWithdrawals = () => <div>DashboardNex - Payments (Withdrawals)</div>;
const DashboardNexPaymentsBilling = () => <div>DashboardNex - Payments (Billing)</div>;
const DashboardNexSupport = () => <div>DashboardNex - Support</div>;
const DashboardNexAbout = () => <div>DashboardNex - About</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/find-jobs", element: <FindJobs /> },
      { path: "/jobs/:id", element: <VewJob /> },
      { path: "/view-profile/:email", element: <ViewProfile /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/mention", element: <TestMentions /> },
      { path: "/chat/:jobId", element: <ChatApp /> },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      { index: true, element: <FreelancerDashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "edit", element: <Edit /> },
      { path: "request", element: <Request /> },
      { path: "accept", element: <AcceptedJobs /> },
      { path: "post", element: <JobPostForm /> },
      { path: "task", element: <MyTask /> },
      { path: "my-work", element: <MyWork /> },
    ],
  },
  {
    path: "/dashboard-nex",
    element: <DashboardNex />,
    children: [
      // Default dashboard route handled in DashboardNex.jsx (BothDashboard)
      { path: "find-work", element: <DashboardNexFindWork /> },
      { path: "find-work/all", element: <DashboardNexFindWorkAll /> },
      { path: "find-work/applied", element: <DashboardNexFindWorkApplied /> },
      { path: "find-work/accepted", element: <DashboardNexFindWorkAccepted /> },
      { path: "find-work/completed", element: <DashboardNexFindWorkCompleted /> },

      { path: "post-job", element: <DashboardNexPostJob /> },
      { path: "post-job/all", element: <DashboardNexPostJobAll /> },
      { path: "post-job/active", element: <DashboardNexPostJobActive /> },
      { path: "post-job/finished", element: <DashboardNexPostJobFinished /> },

      { path: "freelancers", element: <DashboardNexFreelancers /> },

      { path: "my-profile", element: <DashboardNexMyProfile /> },
      { path: "my-profile/profile", element: <DashboardNexMyProfileProfile /> },
      { path: "my-profile/reviews", element: <DashboardNexMyProfileReviews /> },
      { path: "my-profile/settings", element: <DashboardNexMyProfileSettings /> },

      { path: "my-profile/edit", element: <EditProfile profile={null} /> }, // Not in menu, just as a route

      { path: "messages", element: <DashboardNexMessages /> },

      { path: "projects", element: <DashboardNexProjects /> },
      { path: "projects/active", element: <DashboardNexProjectsActive /> },
      { path: "projects/completed", element: <DashboardNexProjectsCompleted /> },
      { path: "projects/pending", element: <DashboardNexProjectsPending /> },

      { path: "payments", element: <DashboardNexPayments /> },
      { path: "payments/transactions", element: <DashboardNexPaymentsTransactions /> },
      { path: "payments/withdrawals", element: <DashboardNexPaymentsWithdrawals /> },
      { path: "payments/billing", element: <DashboardNexPaymentsBilling /> },

      { path: "support", element: <DashboardNexSupport /> },
      { path: "about", element: <DashboardNexAbout /> },
    ],
  },
]);