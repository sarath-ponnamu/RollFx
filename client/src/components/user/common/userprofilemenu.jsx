import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function UserProfileMenu() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("currentuser") || "null");
    if (!currentUser) return null;

    const username = `${currentUser.name} (${currentUser.username})`;

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("currentuser");
        navigate("/");
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="text-3xl text-gray-600 hover:text-blue-600"
                aria-expanded={open}
            >
                <FaUserCircle />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                    <div className="px-4 py-2 text-gray-800 border-b">{username}</div>
                    <Link
                        to="/auth/editprofile"
                        className="block px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                        onClick={() => setOpen(false)}
                    >
                        View Profile
                    </Link>
                    <Link
                        to="/auth/change-password"
                        className="block px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                        onClick={() => setOpen(false)}
                    >
                        Change Password
                    </Link>
                    <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
