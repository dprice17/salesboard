import React, { useState, useEffect } from "react";
import userData from "./userData.js";
import SalesBoard from "./SalesBoard.jsx";

export default function SigninPage() {
  const [userDataState, setUserDataState] = useState(userData);
  const [usercredentialsEntered, setUserCredentialsEntered] = useState({
    userName: "",
    password: "",
  });

  const handleSignOut = () => {
    setUserDataState((prev) => ({
      ...prev,
      isSignedIn: false,
    }));
  };

  const handleUserCredentialsEntered = (event) => {
    let enteredUserName = "";
    let enteredPassword = "";

    if (event.target.id === "userName") {
      enteredUserName = event.target.value;
      setUserCredentialsEntered((prev) => ({
        ...prev,
        userName: enteredUserName,
      }));
    } else if (event.target.id === "password") {
      enteredPassword = event.target.value;
      setUserCredentialsEntered((prev) => ({
        ...prev,
        password: enteredPassword,
      }));
    }
  };

  const handleUserSignIn = () => {
    const storedUserName = userDataState.userName;
    const storedPassword = userDataState.password;
    const enteredUserName = usercredentialsEntered.userName;
    const enteredPassword = usercredentialsEntered.password;

    if (
      enteredUserName === storedUserName &&
      enteredPassword === storedPassword
    ) {
      setUserDataState((prev) => ({
        ...prev,
        isSignedIn: true,
      }));
    } else {
      setUserCredentialsEntered((prev) => ({
        ...prev,
        userName: "",
        password: "",
      }));
    }
  };

  return (
    <div className="sign-in-page">
      {userDataState.isSignedIn === false && (
        <div
          className="sign-in-container"
          style={
            userDataState.isSignedIn ? { display: "none" } : { display: "flex" }
          }
        >
          <h1>Salesboard 🔔</h1>
          <img
            className="signin-img"
            src={userDataState.userImgUrl}
            alt="User"
          />

          <div className="signin-fields">
            <input
              id="userName"
              type="text"
              placeholder="enter username"
              onChange={handleUserCredentialsEntered}
              value={usercredentialsEntered.userName}
            />

            <input
              id="password"
              type="password"
              placeholder="enter password"
              onChange={handleUserCredentialsEntered}
              value={usercredentialsEntered.password}
            />
          </div>

          <button onClick={handleUserSignIn}>Sign in</button>
        </div>
      )}

      {userDataState.isSignedIn && (
        <SalesBoard
          userDataState={userDataState}
          handleSignOut={handleSignOut}
        />
      )}
    </div>
  );
}
