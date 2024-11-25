import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const EditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        feedback: '',
        currentProject: '',
        mode: '',
        web: false,
        android: false,
        cloud: false,
        gender: '',
        department: '',
        dateOfJoining: '',
    });

    // Fetch the existing data for the given ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/form/getuser/${id}`);
                setFormData(response.data.data); 
            } catch (error) {
                toast.error('Error fetching form data!');
            }
        };
        fetchData();
    }, [id]);
    

    const changeHandler = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/form/edit/${id}`, formData);
            toast.success('Form updated successfully!');
            navigate('/all'); 
        } catch (error) {
            toast.error('Error updating form!');
        }
    };
    

    return (
        <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex items-center justify-center mt-14">
            <form onSubmit={submitHandler} className="bg-white shadow-lg rounded-lg px-4 py-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
                    Edit Employee Details
                </h2>

                
                <div className="mb-6">
                    <label htmlFor="firstName" className="block mb-1 font-medium">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-blue-500"
                    />
                    <label htmlFor="lastName" className="block mb-1 font-medium">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block mb-1 font-medium">
                        Email ID
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-blue-500"
                    />
                    <label htmlFor="address" className="block mb-1 font-medium">
                        Address
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        name="address"
                        value={formData.address}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="currentProject" className="block mb-1 font-medium">
                        Current Project
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your current project"
                        name="currentProject"
                        value={formData.currentProject}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Work Mode
                    </h3>
                    <div className="flex items-center">
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name="mode"
                                value="Onsite"
                                checked={formData.mode === "Onsite"}
                                onChange={changeHandler}
                                className="mr-2"
                            />
                            Onsite
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="mode"
                                value="Work From Home"
                                checked={formData.mode === "Work From Home"}
                                onChange={changeHandler}
                                className="mr-2"
                            />
                            Work From Home
                        </label>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Skills
                    </h3>
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            name="web"
                            id="web"
                            checked={formData.web}
                            onChange={changeHandler}
                            className="mr-2"
                        />
                        <label htmlFor="web">Web Development</label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            name="android"
                            id="android"
                            checked={formData.android}
                            onChange={changeHandler}
                            className="mr-2"
                        />
                        <label htmlFor="android">Android Development</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="cloud"
                            id="cloud"
                            checked={formData.cloud}
                            onChange={changeHandler}
                            className="mr-2"
                        />
                        <label htmlFor="cloud">Cloud Computing</label>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Gender</h3>
                    <div className="flex items-center">
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={changeHandler}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={changeHandler}
                                className="mr-2"
                            />
                            Female
                        </label>
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="department" className="block mb-1 font-medium">
                        Department
                    </label>
                    <select
                        name="department"
                        id="department"
                        value={formData.department}
                        onChange={changeHandler}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-blue-500"
                    >
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Finance">Finance</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="dateOfJoining" className="block mb-1 font-medium">
                        Date of Joining
                    </label>
                    <input
                        type="date"
                        name="dateOfJoining"
                        id="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="Feedback" className="block mb-1 font-medium">
                        Feedback
                    </label>
                    <textarea
                        name="feedback"
                        id="feedback"
                        placeholder="Write your feedback"
                        onChange={changeHandler}
                        value={formData.feedback}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditForm;
