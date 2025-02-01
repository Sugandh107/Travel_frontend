import { useState, useEffect } from "react";
import axios from "axios";

const useUserData = (email) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (email) {
      const fetchUserData = async () => {
        setLoading(true);
        setError(null); // Reset any previous errors
        try {
          const response = await axios.get("http://localhost:5000/api/users/user-profile", {
            params: { email },
          });
          setUserData(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message || "Failed to fetch user data");
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [email]);

  return { userData, loading, error };
};

export default useUserData;
