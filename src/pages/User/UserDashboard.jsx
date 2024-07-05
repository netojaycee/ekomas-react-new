import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner } from "@material-tailwind/react";
import { apiUrl } from "../../config/env";
import AuthContext from "../../components/Context/AuthContext";

export default function UserDashboard() {
  const { auth } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [editedDetails, setEditedDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    try {
      if (auth?.user?.name) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser.token;

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${apiUrl}/auth/profile`, {
          headers,
        });

        setUserDetails(response.data.profile); // Populate userDetails from API
        setEditedDetails(response.data.profile); // Populate editedDetails for form editing
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [auth?.user?.name]);

  const handleSaveChanges = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser.token;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(
        `${apiUrl}/auth/update-profile`,
        editedDetails,
        {
          headers,
        }
      );
      setIsLoading(false);

      console.log("Updated profile:", response.data);
      // Optionally, update userDetails state with updated details from response
      setUserDetails(response.data.profile);

      // Refetch user details after saving changes
      fetchUser();
    } catch (error) {
      console.error("Error saving profile changes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({
      ...editedDetails,
      [name]: value,
    });
  };

  return (
    <>
      {userDetails?.name && (
        <div className="flex-col flex w-full h-[90%] p-4">
          <div>
            <h2>Account Overview</h2>
          </div>
          <hr className="w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
            <Card className="border rounded-none pb-20">
              <h5 className="px-4 py-2">Account Details</h5>
              <hr className=" border-blue-gray-50" />
              <div className="flex flex-col gap-2 lg:gap-5">
                <p className="font-bold px-4 pt-4">
                  {userDetails.name || "N/A"}
                </p>
                <small className="px-4">{userDetails.email || "N/A"}</small>
                <small className="px-4">{userDetails.phone || "N/A"}</small>
                <small className="px-4">{userDetails.address || "N/A"}</small>
              </div>
            </Card>

            <Card className="border rounded-none pb-1-">
              <h5 className="px-4 py-2 font-bold">Edit Details</h5>
              <hr className="border-blue-gray-50" />
              <div className="px-4 py-2">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    name="name"
                    value={editedDetails.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    name="email"
                    value={editedDetails.email}
                    disabled
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    name="address"
                    value={editedDetails.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    name="phone"
                    value={editedDetails.phone}
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md"
                  onClick={handleSaveChanges}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      Saving...{" "}
                      <Spinner
                        className="h-4 w-4 text-secondary"
                        color="white"
                      />
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
