import { useDispatch, useSelector } from "react-redux";
import { UserDropdown } from "../components/Dropdown";
import { Link } from "react-router-dom";
import { userLogoutAction } from "../Redux/Actions/User";

import Checkout from "../pages/Checkout";
import { useState } from "react";

const Navbar = () => {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;
  const dispatch = useDispatch();

  const qty = useSelector((state) =>
    state.cartReducer.cartItems.reduce((total, item) => total + item.qty, 0)
  );

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center w-full justify-center">
            <Link to="/" className="flex items-center">
              <img
                src="https://www.svgrepo.com/show/520948/shopping-bag-4.svg"
                className="h-8 mr-3"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                FASION SHOP
              </span>
            </Link>
          </div>

          <div className="flex items-center md:order-2 space-x-4">
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-gray-800 bg-transparent rounded md:bg-transparent md:text-gray-800 md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-4 text-gray-800 bg-transparent rounded md:bg-transparent md:text-gray-800 md:p-0"
                  aria-current="page"
                >
                  About
                </Link>
              </li>
            </ul>

            {!userInfo ? (
              <Link
                to="/login"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-700 ml-auto"
              >
                Get start
              </Link>
            ) : (
              <>
                <UserDropdown 
                  username={userInfo.name} 
                  logoutHandler={logoutHandler} 
                  buttonClass="text-white bg-gray-800 hover:bg-gray-900 rounded-lg px-4 py-2"
                />
                <button
                  data-collapse-toggle="navbar-cta"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-800"
                  aria-controls="navbar-cta"
                  aria-expanded="false"
                  onClick={() => setOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <span>{qty}</span>
                </button>
                <Checkout open={open} setOpen={setOpen}></Checkout>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
