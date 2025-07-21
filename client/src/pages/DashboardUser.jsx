import React from 'react';
import {useNavigate} from "react-router-dom";

function DashboardUser(props) {
    const navigate = useNavigate()

    const userName = localStorage.getItem('userName');
    const userGradeId = localStorage.getItem('userGradeId')

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userRoleId');
        localStorage.removeItem('userGradeId');
        navigate('/');
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/4 bg-gray-800 text-white p-5">
                <h2 className="text-2xl font-bold mb-4">Laporan Kas kelas {userGradeId} SDN Cileles</h2>
                <ul className="space-y-2">
                    <li>
                        <button className="w-full text-left bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
                            All Students Grade {userGradeId}
                        </button>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="w-full text-left bg-red-600 hover:bg-red-500 px-4 py-2 rounded">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

            <div className="flex-1 p-10 bg-gray-100">
                <h1 className="text-3xl font-semibold mb-4">Selamat datang, {userName} !</h1>
            </div>
        </div>
    );
}

export default DashboardUser;