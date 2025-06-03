import React from 'react';
import {
    createBrowserRouter,

  } from "react-router-dom";
import MainLayout from '../Layout/MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/Signup/Signup';
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
        }
        ,{
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
          path:"/dashboard/edit",
          element:<Edit></Edit>
        },
        {
           index:true,
          element:<Profile></Profile>,
           
        },
         {
          path:"dashboard/request",
          element:<Request></Request>
        },
        {
          path:"/dashboard/accept",
          element:<AcceptedJobs></AcceptedJobs>
        },
        {
          path:"/dashboard/post",
          element:<Post_Jobs></Post_Jobs>
        },
     
      //        {
      //         path:'/dashboard',
      //         element:<MyProfile></MyProfile>
      //        },
      //        {
      //         path:'/dashboard/addProduct',
      //         element:<AddProductPage></AddProductPage>
      //        },
      //        {
      //         path:'/dashboard/myProducts',
      //         element:<MyProductsPage></MyProductsPage>
      //        },
      //        {
      //         path:'/dashboard/payment',
      //         element:<Payment></Payment>
      //        },
      //        {
      //         path:'update-product/:id',
      //         element:<UpdateProductPage></UpdateProductPage>
      //        },
      //        {
      //         path:'/dashboard/reviewQueue',
      //         element:<Product></Product>
      //        },
      //        {
      //         path:'/dashboard/reportedContents',
      //         element:<ReportedContent></ReportedContent>
      //        },
      //        {
      //         path:'/dashboard/manageCoupons',
      //         element:<AdminCouponsPage></AdminCouponsPage>
      //        },
      //        {
      //         path:'/dashboard/manageUsers',
      //         element:<ManageUsers></ManageUsers>
      //        }
      //        ,{
      //         path:'/dashboard/statistics',
      //         element:<AdminStatistics></AdminStatistics>
      //        }
       ]
  },
  ]);

