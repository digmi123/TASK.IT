import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user info
    axios.get(`/api/users/get_user_info/${userId}`).then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user.email}</div>;
}

export default UserProfile;
