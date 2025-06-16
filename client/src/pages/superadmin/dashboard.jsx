import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminNavBar from "../../components/superadmin/common/superadminnavbar";
import { EyeIcon, UserIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import debounce from 'lodash/debounce';

export default function DashBoard(){

    const navigate = useNavigate();
    const [allusers, setAllUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [paymentProofImgId, setPaymentProofImgId] = useState(null);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login");
        } else {
            fetchUserDetails(token);
            fetchUsers(token);
        }
    }, []);
    
        const handleSearchChange = (e) => {
            const value = e.target.value;
            setSearchText(value);
            debouncedFetch(value);
        }
    
        const debouncedFetch = debounce((value) => {
            const token = localStorage.getItem("access_token");
            fetchUsers(token, value);
        }, 300); // 300ms debounce
    

    const formatDate = (isoDateStr) => {
        const date = new Date(isoDateStr);
        const day = date.getDate();
        const suffix = ['th', 'st', 'nd', 'rd'][
            (day % 10 > 3 || ~~((day % 100) / 10) === 1) ? 0 : day % 10
        ];
        return `${day}${suffix} ${date.toLocaleString('en-US', { month: 'short', year: 'numeric' })}`;
    };

    async function fetchUserDetails(token) {
        try {
            const response = await fetch(`${import.meta.env.VITE_CRYPTO_PAYMENT_API_BASE_URL}/getamember`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to fetch user details");

            const userData = await response.json();
            localStorage.setItem("currentuser", JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }

    async function fetchUsers(token, searchText = "") {
        try {
            const url = new URL(`${import.meta.env.VITE_CRYPTO_PAYMENT_API_BASE_URL}/search-in-allmembers`);
            if (searchText) {
                url.searchParams.append('search', searchText);
            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to fetch users");

            const userData = await response.json();
            setAllUsers(userData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }


    const renderTable = (children, title) => (
        <div className="w-full px-2 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
            <div className="w-full">
                <table className="w-full text-sm text-left border border-gray-300 table-fixed">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-1 border-b break-words">#</th>
                            <th className="py-2 px-1 border-b break-words">Name</th>
                            <th className="py-2 px-1 border-b break-words">Amount Paid</th>
                            <th className="py-2 px-1 border-b break-words">Payment date</th>
                            <th className="py-2 px-1 border-b break-words">Screenshot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {children.map((c, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className={`py-2 px-1 border-b ${!c.is_active ? 'text-gray-400' : 'font-bold text-green-500'}`}>{i + 1}</td>
                                <td className={`py-2 px-1 border-b ${!c.is_active ? 'text-gray-400' : 'font-bold text-green-500'} break-words`}>{c.name}</td>
                                <td className={`py-2 px-1 border-b ${!c.is_active ? 'text-gray-400' : 'font-bold text-green-500'}`}>{c.paidamount}</td>
                                <td className={`py-2 px-1 border-b ${!c.is_active ? 'text-gray-400' : 'font-bold text-green-500'}`}>{formatDate(c.paymentdate)}</td>
                                <td className={`py-2 px-1 border-b ${!c.is_active ? 'text-gray-400' : 'font-bold text-green-500'}`}>
                                    <button 
                                    className="flex items-center text-blue-600 hover:underline cursor-pointer"
                                    onClick={() => {
                                    setSelectedUser(c);
                                    handleShowScreenshot();
                                    }}                                   
                                    >
                                        <EyeIcon className="w-5 h-5 mr-2" />
                                    </button>                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    



    const renderCards = (children, title) => (
        <div className="w-full px-2 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>

            <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search by name, username, email, phone"
                className="border p-2 rounded w-full"
                autoComplete="new-password"
            />
            <div className="w-full flex flex-wrap gap-4 justify-center">
                {children.map((c, i) => (
                    <div key={i} className="w-100 max-w-sm bg-white border border-gray-200 rounded-3xl shadow-md p-5 hover:shadow-xl transition">
                        <h3 className="text-2xl font-bold text-indigo-700 mb-4">{c.name}</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center text-blue-600 font-medium">
                                <UserIcon className="w-5 h-5 mr-2" />
                                <span className="font-semibold">{c.username}</span>
                            </div>

                            <div className="flex items-center text-green-600 font-medium">
                                <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                                <span className="font-semibold">{c.paidamount.toFixed(3)}</span>
                            </div>

                            <div className="flex items-center text-pink-600 font-medium">
                                <CalendarIcon className="w-5 h-5 mr-2" />
                                <span className="font-semibold">{c.paymentdate || "N/A"}</span>
                            </div>

                            <div className="flex items-center text-violet-600 font-medium">
                                {/* <UserGroupIcon className="w-5 h-5 mr-2" /> */}
                                {/* <span className="font-semibold border rounded-lg p-2 hover:bg-blue-100"> */}
                                    <button 
                                    className="flex items-center text-blue-600 hover:underline cursor-pointer
                                    font-semibold border rounded-lg p-2 hover:bg-blue-100"
                                    onClick={() => {
                                    setSelectedUser(c);
                                    handleShowScreenshot();
                                    }}                                   
                                    >
                                        <EyeIcon className="w-5 h-5 mr-2" /> View ScreenShot
                                    </button> 
                                    {/* </span> */}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );




  const handleShowScreenshot = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

    return (
        <>
            <SuperAdminNavBar />
            <div className="flex flex-col lg:flex-row lg:space-x-4 p-4">
                {/* {renderTable(allusers.filter(u => u.paid), "Payment details")} */}
                {renderCards(allusers.filter(u => u.paid), "Payment details")}
            </div>

            {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-4 max-w-lg w-full relative">
            <button
            type="button"
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white rounded text-red-500 hover:text-red-700"
            >
              ✖
            </button>
            Following screenshot shows {selectedUser.name} payment.
            <iframe
              src={`https://drive.google.com/file/d/${selectedUser.paymentproof}/preview`}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              allow="autoplay"
              title="Screenshot Preview"
            />
            
          </div>
        </div>
      )}
        </>
    );
}