"use client"
import React, { useEffect, useState } from 'react';
import { Bell, Plus } from 'lucide-react';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Your client-side code here
    }, []);

    return (
        <div>
            {/* Below Commented code is responsive navbar with Navlinks -Digvijay Kadam */}
            {/* <div className='flex items-center justify-evenly md:justify-evenly gap-4  m-8'>
                <p className="font-inter text-lg text-[#5B0AE1] font-black">magicpitch</p>
                <div className="md:hidden relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="bg-transparent focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                    <ul className={`absolute top-12 right-0 bg-white w-40 md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-2 p-2 rounded-md shadow-lg`}>
                        <li className="py-1">Home</li>
                        <li className="py-1">Terms & Conditions</li>
                        <li className="py-1">Privacy Policy</li>
                    </ul>

                   
                </div>
                <ul className='hidden md:flex justify-center gap-5 text-dark font-medium'>
                    <li>Home</li>
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                </ul>
              
            </div> */}
            <div>
                <div className='flex items-center justify-center gap-4 m-6'>
                    <p className="font-inter text-lg text-[#5B0AE1] font-black">magicpitch</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
