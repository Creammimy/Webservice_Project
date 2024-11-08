import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layouts/Layouts";
import { userLoginAction } from "../../Redux/Actions/User";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLoginReducer = useSelector((state) => state.userLoginReducer);

  const { loading, error, userInfo } = userLoginReducer; // Access userInfo from state
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
  };

  // useEffect to redirect after successful login
  useEffect(() => {
    if (userInfo) {
      navigate("/"); // Redirect to home page if login is successful
    }
  }, [userInfo, navigate]);

  return (
    <Layout>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <form className="max-w-sm mx-auto h-5/6" onSubmit={submitHandler}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Center the Submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="text-center mt-4">
            <Link
              to="/register"
              className="text-gray-400 hover:text-gray-500 underline"
            >
              Don't have an account? Register
            </Link>
          </div>

          {/* Show error message if login fails */}
          {error && (
            <div className="text-red-500 text-center mt-4">
              <p>{error}</p>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}
