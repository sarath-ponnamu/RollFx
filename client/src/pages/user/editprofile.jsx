import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../../components/user/common/usernavbar";

export default function EditProfile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    membername: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentuser") || "null");
    if (!user) {
      navigate("/login");
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  // Populate editable form fields
  useEffect(() => {
    if (currentUser) {
      setFormData({
        membername: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_CRYPTO_PAYMENT_API_BASE_URL}/update-profile/${currentUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Update failed. Try again.");

      const updatedUser = await response.json();
      localStorage.setItem("currentuser", JSON.stringify(updatedUser));
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserNavBar />
      <div className="flex items-center justify-center pt-2 bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-blue-600">Edit Profile</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm text-center">
              Profile updated successfully!
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="membername"
                value={formData.membername}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Username (readonly) */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                value={currentUser?.username || ""}
                readOnly
                className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg"
              />
            </div>

            {/* Referral Code (readonly) */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-600">Referral Code</label>
              <input
                type="text"
                value={currentUser?.referral_code || ""}
                readOnly
                className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg"
              />
            </div> */}

            {/* Position (readonly) */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-600">Position</label>
              <input
                type="text"
                value={currentUser?.side || ""}
                readOnly
                className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg"
              />
            </div> */}

           {/* Nationality */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-600">Nationality</label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">Select Nationality</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
          </div> */}

            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
