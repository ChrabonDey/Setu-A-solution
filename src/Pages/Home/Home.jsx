import React from 'react';
import Banner from './Banner';
import About from './About';
import SetuLandingPage from '../SetuLandingPage';
import BluishTalentLanding from '../BluishTalentLanding';
import BrowsePortfolioCategories from '../BrowsePortfolioCategories';

const Home = () => {
    return (
        <div className=''>
          <div className='my-10'>
          <Banner></Banner>
          </div>
          <div className='my-10'>
          <SetuLandingPage></SetuLandingPage>
          </div>
          <div className='my-10'>
        <BluishTalentLanding></BluishTalentLanding>
          </div>
          <div className='my-10'>
         <BrowsePortfolioCategories></BrowsePortfolioCategories>
          </div>
          <div >
            <About></About>
          </div>
        </div>
    );
};

export default Home;