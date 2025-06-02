import React, { useContext } from 'react';
import { authContext } from '../provider/Authprovider';
import { useQuery } from '@tanstack/react-query';
import { axiosPublic } from './UseAxiosPublic';

const UseAdmin = () => {
    const {user,loading}=useContext(authContext);
    const {data:isAdmin,isloading:isAdminLoading}=useQuery({
        queryKey:[user?.email, "isAdmin"],
        enabled: !loading,
        queryFn: async ()=>{
            const res =await axiosPublic.get(`/users/admin/${user.email}`);
          return res.data?.admin; 
        }
    });
     return [isAdmin, isAdminLoading];
};

export default UseAdmin;