import React from 'react';
import { FaRunning, FaGithub} from "react-icons/fa";
import { BsGlobe} from "react-icons/bs";

const Footer: React.FC = () => {
    return (
        <footer className="bg-transparent p-4 sm:fixed sm:left-0 sm:bottom-0 w-full ">
            <div className="flex justify-center items-center h-full">
                <div className="sm:flex-1 w-32 ml-7">
                    <a className="text-gray-600 hover:text-gray-800"><FaRunning className='inline'/> v1.0.0</a>
                </div>
                <div className="sm:flex-1 text-right mr-7">
                    <a className="text-gray-600 hover:text-gray-800 px-3"><FaGithub className='inline'/> &nbsp;Github </a>
                    <a className="text-gray-600 hover:text-gray-800 px-3"><BsGlobe className='inline'/> &nbsp;Send </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
