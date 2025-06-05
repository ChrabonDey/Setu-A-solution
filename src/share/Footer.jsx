import React from 'react';

const Footer = () => {
  return (
    <div style={{ marginTop: '30px' }}>
      <div className="bg-gray-100" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
        <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
          <div className="p-5">
            <h3 className="font-bold text-xl text-[#006dc7]">Company Name</h3>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-[#006dc7] font-bold">Resources</div>
            <a className="my-3 block" href="/#">Documentation</a>
            <a className="my-3 block" href="/#">Tutorials</a>
            <a className="my-3 block" href="/#">Support <span className="text-teal-600 text-xs p-1">New</span></a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-[#006dc7] font-bold">Support</div>
            <a className="my-3 block" href="/#">Help Center</a>
            <a className="my-3 block" href="/#">Privacy Policy</a>
            <a className="my-3 block" href="/#">Conditions</a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-[#006dc7] font-bold">Contact us</div>
            <a className="my-3 block" href="/#">XXX XXXX, Floor 4 San Francisco, CA</a>
            <a className="my-3 block" href="/#">contact@company.com</a>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 pt-2" style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
        <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col max-w-screen-lg items-center">
          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            {/* Social icons here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;