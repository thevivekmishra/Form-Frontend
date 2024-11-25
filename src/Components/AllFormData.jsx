import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../index.css'

const AllFormData = () => {
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch data from backend
    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await axios.get('https://form-backend-exjx.onrender.com/api/form/all');
                setFormData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchFormData();
    }, []);

    // Handle Delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://form-backend-exjx.onrender.com/api/form/delete/${id}`);
            setFormData((prevFormData) => prevFormData.filter((item) => item._id !== id));
            toast.success('Form data deleted successfully!');
        } catch (error) {
            toast.error('Error deleting form data');
        }
    };

    function printPage() {
        window.print()
    }
    return (
        <div className=" mt-14">
            <div className='flex justify-between items-center p-2 w-full'>
                <h2 className="text-2xl font-bold text-indigo-800">All Form Data</h2>
                <button
                    onClick={printPage}
                    className="Btn bg-blue-600 text-white font-medium py-2 px-6 rounded-md shadow-sm hover:bg-blue-700"
                >
                    Print
                </button>
            </div>


            <div className="overflow-x-auto shadow-lg  bg-white">
                <table className="min-w-full table-auto text-sm text-gray-800">
                    <thead className="bg-indigo-500 text-white static">
                        <tr>
                            {['S.No.','First Name', 'Last Name', 'Email', 'Department', 'Current Project', 'Date of Joining', 'Address', 'Feedback', 'Gender', 'Work Mode', 'Web', 'Android', 'Cloud', 'Actions'].map((header, index) => (
                                <th key={index} className="flex-col justify-center items-center text-center px-2 py-3 font-semibold">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((data, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{data.firstName}</td>
                                <td className="px-6 py-4">{data.lastName}</td>
                                <td className="px-6 py-4">{data.email}</td>
                                <td className="px-6 py-4">{data.department}</td>
                                <td className="px-6 py-4">{data.currentProject}</td>
                                <td className="px-6 py-4">{data.dateOfJoining}</td>
                                <td className="px-6 py-4">{data.address}</td>
                                <td className="px-6 py-4">{data.feedback ? `${data.feedback}` :' Not Provided'}</td>
                                <td className="px-6 py-4">{data.gender}</td>
                                <td className="px-6 py-4">{data.mode}</td>
                                <td className="px-6 py-4">{data.web ? 'Yes' : 'No'}</td>
                                <td className="px-6 py-4">{data.android ? 'Yes' : 'No'}</td>
                                <td className="px-6 py-4">{data.cloud ? 'Yes' : 'No'}</td>
                                {/* <td className="px-6 py-4">{new Date(data.createdAt).toLocaleString()}</td>
                                <td className="px-6 py-4">{new Date(data.updatedAt).toLocaleString()}</td> */}
                                
                                <td className="px-6 py-4  justify-center text-center items-center mt-14 ">
                                    <button
                                        className="bg-green-500 text-white ml-2 mb-2  text-xl p-3 rounded-lg hover:bg-green-600 transition"
                                        onClick={() => navigate(`/edit/${data._id}`)}
                                    >
                                        <FaRegEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(data._id)}
                                        className="bg-red-500 text-white p-3 text-xl rounded-md hover:bg-red-600 transition ml-2"
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllFormData;
