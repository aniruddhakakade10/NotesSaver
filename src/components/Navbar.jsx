import { NavLink } from 'react-router-dom'
import {NavbarData} from "../data/NavBar";

const Navbar = () => {
  return (
    <div className='w-full h-[45px] flex justify-center items-center p-4 bg-gray-800 gap-x-5'>
      {
        NavbarData.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({isActive}) => 
              isActive
              ? "text-blue-500 font-semibold text-xl"
              : "text-white font-medium text-xl"
            }
          >
            {link.title}
          </NavLink>
        ))
      }
    </div>
  );
};

export default Navbar