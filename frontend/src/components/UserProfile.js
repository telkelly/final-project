import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const UserProfile = (props) => {
  const [data, setData] = useState(null);
  const [history,setHistory] = useState(null);
    const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      axios.get(`/user/${userId}`).then((res) => {
        setData(res.data[0]);
      });
      axios.get(`/user/${userId}/history`).then((res) => {
        setHistory(res.data[0]);
        console.log("res", res, "data", data);
      });
    } else {
      navigate("/about");
    }
  }, []);


  return (
    <div className="user-profile">
      {data ? (
        <>
          <h3>
            Hello, {data.firstname} {data.lastname}
          </h3>
          <h3>Your email is {data.email}</h3>
          {history ? (
            <>
              <h2>Your last Symptoms:</h2>
              <ul>
                {history.historyofsymptoms.map((i) => (
                  <li>{i}</li>
                ))}
              </ul>
            </>
          ) : (
            <h1>No history found</h1>
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default UserProfile;
