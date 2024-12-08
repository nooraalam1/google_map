import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // Demo credentials
    const [demoCredentials] = useState({
        username: "demo@gmail.com",
        password: "demoPass",
    });

    // State for form input
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    // State for error message
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate input credentials against demo credentials
        if (
            formData.username === demoCredentials.username &&
            formData.password === demoCredentials.password
        ) {
            alert("Login Success");
            navigate('/map'); // Navigate to dashboard on successful login
        } else {
            setError("Invalid username or password!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <form
                className="w-96 p-8 bg-white rounded-lg shadow-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>
                {error && (
                    <div className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="username">
                        Username
                    </label>
                    <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-5 w-5 text-gray-500 ml-3"
                        >
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                            />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                            />
                        </svg>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="w-full py-2 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="password">
                        Password
                    </label>
                    <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-5 w-5 text-gray-500 ml-3"
                        >
                            <path
                                d="M4.5 7A1.5 1.5 0 0 0 3 8.5v3A1.5 1.5 0 0 0 4.5 13h7A1.5 1.5 0 0 0 13 11.5v-3A1.5 1.5 0 0 0 11.5 7h-7Z"
                            />
                        </svg>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full py-2 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Login
                </button>
                <div className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <a href="/register" className="text-indigo-500 hover:text-indigo-600">Sign Up</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
