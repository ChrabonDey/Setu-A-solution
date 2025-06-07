import React from 'react';
import {
    createBrowserRouter,
} from "react-router-dom";
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
import FreelancerDashboard from '../Layout/Dashboard/FreelancerDashboard'; // <-- import

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/find-jobs",
            element:<FindJobs></FindJobs>
        },
        {
          path:"/jobs/:id",
          element:<VewJob></VewJob>
        },
        {
          path:"/view-profile/:email",
          element:<ViewProfile></ViewProfile>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/signup",
          element:<SignUp></SignUp>
        },
        {
          path:"/mention",
          element:<TestMentions></TestMentions>
        },
        {
          path:"/chat/:jobId",
          element:<ChatApp></ChatApp>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children:[
        {
          index: true,
          element: <FreelancerDashboard />  // <-- show this on /dashboard
        },
        {
          path:"profile",                  // <-- move profile to /dashboard/profile
          element:<Profile></Profile>,
        },
        {
          path:"edit",
          element:<Edit></Edit>
        },
        {
          path:"request",
          element:<Request></Request>
        },
        {
          path:"accept",
          element:<AcceptedJobs></AcceptedJobs>
        },
        {
          path:"post",
          element:<JobPostForm></JobPostForm>
        },
        {
          path:"task",
          element:<MyTask></MyTask>
        },
        {
          path:"my-work",
          element:<MyWork></MyWork>
        },
        // Add other dashboard routes here as needed
      ]
    },
]);