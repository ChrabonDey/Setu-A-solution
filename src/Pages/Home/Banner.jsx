import React from 'react';
import img2 from '../../assets/medium-shot-woman-working-with-hijab-indoors.jpg'

const Banner = () => {
    return (
        <div className='rounded-3xl'>
           <div
  className="hero min-h-screen rounded-3xl "
  style={{
    backgroundImage: `url(${img2}) `,
  }}>
  <div className="hero-overlay bg-opacity-60 rounded-3xl"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="w-3/4">
      <h1 className="mb-5 text-5xl font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div> 
        </div>
    );
};

export default Banner;