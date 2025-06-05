import React from 'react';

const Footer = () => {
  return (
    <div style={{ marginTop: '30px' }}>
      <div
        className="bg-gray-100"
        style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
      >
        <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
          {/* Company Logo + Name */}
          <div className="p-5 flex items-center">
            <div className="flex items-center gap-3">
              <img
                src="https://i.postimg.cc/7YDf01WX/setu-logo-compresed-round.png"
                alt="SETU Logo"
                className="w-[50px] h-[50px]"
              />
              <h3 className="font-bold text-3xl text-[#006dc7]">SETU</h3>
            </div>
          </div>

          {/* Resources */}
          <div className="p-5">
            <div className="text-sm uppercase text-[#006dc7] font-bold">Resources</div>
            <a className="my-3 block" href="/#">Documentation</a>
            <a className="my-3 block" href="/#">Tutorials</a>
            <a className="my-3 block" href="/#">
              Support <span className="text-teal-600 text-xs p-1">New</span>
            </a>
          </div>

          {/* Support */}
          <div className="p-5">
            <div className="text-sm uppercase text-[#006dc7] font-bold">Support</div>
            <a className="my-3 block" href="/#">Help Center</a>
            <a className="my-3 block" href="/#">Privacy Policy</a>
            <a className="my-3 block" href="/#">Conditions</a>
          </div>

          {/* Contact */}

<div className="p-5">
  <div className="text-sm uppercase text-[#006dc7] font-bold">Contact us</div>
  <p className="my-3 block">SETU Tower, Dhanmondi, Dhaka, Bangladesh</p>
  <p className="my-3 block text-[#006dc7]">support@setubd.com</p>  {/* Email colored */}
  <p className="my-3 block">+880 1533 0827</p>
</div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="bg-gray-100 pt-2"
        style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
      >
        <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col max-w-screen-lg items-center">
          <p className="text-center mt-4">© {new Date().getFullYear()} SETU. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
