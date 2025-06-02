import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../share/Navbar';
import Footer from '../../share/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar ></Navbar>
           <Outlet></Outlet> 
           <Footer></Footer>
        </div>
    );
};

export default MainLayout;