import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation (could be enhanced)
        if (!formData.email || !formData.username || !formData.password) {
            setError('All fields are required.');
            return;
        }

        // Simulate a successful registration (real-world would involve API calls)
        alert('Registration Successful!');
        setFormData({ email: '', username: '', password: '' }); // Reset form
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
            <form
                className="w-96 p-8 bg-white rounded-lg shadow-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Register Here</h2>

                {error && (
                    <div className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="email">
                        Email
                    </label>
                    <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-teal-500">
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
                            type="email"
                            name="email"
                            id="email"
                            className="w-full py-2 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="username">
                        Username
                    </label>
                    <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-teal-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-5 w-5 text-gray-500 ml-3"
                        >
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                            />
                        </svg>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="w-full py-2 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg"
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
                    <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-teal-500">
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
                            className="w-full py-2 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    Register
                </button>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-teal-500 hover:text-teal-600">
                        Login here
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Register;
