import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    // <div className='flex flex-col justify-between'>
    //   <div className='flex flex-row'>
    //     <div>
    //     <Image src="/logo.png" alt="Logo" height="50" width="50"></Image>
    //     </div>
    //   </div>
    // </div>
    <footer className="bg-white shadow-lg text-black pt-40 pb-24 mt-12">

      <div className='flex flex-col ml-12'>
        {/* Left Section */}
        <div className="w-full sm:w-1/2 md:w-1/4 mb-8 md:mb-0">
          <Image src="/logo.png" alt="Logo" height="50" width="50" className='mb-2'></Image>
          <p className="text-gray-400">A brief description of your company.</p>
        </div>
        <div className="container mx-auto flex  mt-10 flex-wrap justify-between items-start">

          {/* Middle Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="list-none">
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">Your address, phone, and email</p>
          </div>

          {/* Bottom Section */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400 transition duration-300">
                Facebook
              </a>
              <a href="#" className="hover:text-gray-400 transition duration-300">
                Twitter
              </a>
              <a href="#" className="hover:text-gray-400 transition duration-300">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <h4 className='absolute bottom-1'>© 2023 Nutritrack. All rights reserved - A template by chrstnl.</h4>
      </div>
    </footer>
  )
}

export default Footer