import React, { useState, useEffect } from "react";
import { data } from "./data.js";
import SignInPage from "./SignInPage.jsx";

export default function SalesBoard(props) {
  const { userDataState, handleSignOut } = props;
  const { productA, productB } = data;
  const [userProfileData, setUserProfileData] = useState({
    liveSales: userDataState.liveSales,
    liveSalesCount: userDataState.liveSalesCount,
    liveAchievements: userDataState.liveAchievements,
    liveAchievementsCount: userDataState.liveAchievementsCount,
    totalRevenueAmount: userDataState.totalRevenueAmount,
    totalCommissionAmount: userDataState.totalCommissionAmount,
    revenueMoneyPrize1Rewarded: userDataState.revenueMoneyPrize1Rewarded,
  });

  const [lightDarkMode, setLightDarkMode] = useState(false);
  const [popupId, setPopupId] = useState("");
  const [saveBtnClickTracker, setSaveBtnClickTracker] = useState(false);

  const handleButtonHover = (event) => {
    const id = event.target.id;
    setPopupId(id);
  };

  const handleButtonLeave = () => {
    setSaveBtnClickTracker(false);
    setPopupId("");
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserProfileData(JSON.parse(storedData));
    }
  }, []);

  const handleSaveBtn = () => {
    setSaveBtnClickTracker(true);
    localStorage.setItem("userData", JSON.stringify(userProfileData));
  };

  const handleToggler = () => {
    setLightDarkMode((prevMode) => !prevMode);
  };

  const backgroundStyles = {
    backgroundColor: lightDarkMode ? "#9E4770" : "#201A23",
    filter: userDataState.isSignedIn ? "none" : "blur(30px)",
  };

  const toggleBackGroundStyles = {
    backgroundColor: lightDarkMode ? "#201A23" : "#9E4770",
  };

  const togglerStyles = {
    backgroundColor: lightDarkMode ? "#9E4770" : "#201A23",
    left: lightDarkMode ? "3px" : "37px",
  };

  const handleLiveSales = (event) => {
    const selectedProduct =
      event.target.id === "productA-btn" ? productA : productB;

    setUserProfileData((prev) => ({
      ...prev,
      liveSalesCount: prev.liveSalesCount + 1,
      totalRevenueAmount: prev.totalRevenueAmount + selectedProduct.revenue,
      totalCommissionAmount:
        prev.totalCommissionAmount + selectedProduct.commision,
      liveSales: [...prev.liveSales, selectedProduct.emoji],
    }));
  };

  const updateAchievements = (emoji) => {
    setUserProfileData((prev) => ({
      ...prev,
      liveAchievementsCount: prev.liveAchievementsCount + 1,
      liveAchievements: [...prev.liveAchievements, emoji],
    }));
  };

  const handleAchievements = () => {
    if (userProfileData.liveSalesCount === 1) {
      updateAchievements("🔔");
    } else if (userProfileData.liveSalesCount === 15) {
      updateAchievements("🏆");
    } else if (userProfileData.liveSalesCount > 15) {
      setUserProfileData((prev) => ({
        ...prev,
        liveSales: [],
        liveSalesCount: 0,
        liveAchievements: [],
        liveAchievementsCount: 0,
        totalRevenueAmount: 0,
        totalCommissionAmount: 0,
        revenueMoneyPrize1Rewarded: false,
      }));
    }

    if (
      userProfileData.totalRevenueAmount >= 2500 &&
      !userProfileData.revenueMoneyPrize1Rewarded
    ) {
      updateAchievements("💰");
      setUserProfileData((prev) => ({
        ...prev,
        revenueMoneyPrize1Rewarded: true,
      }));
    }
  };

  useEffect(() => {
    handleAchievements();
  }, [userProfileData.liveSalesCount]);

  return (
    <div className="container" style={backgroundStyles}>
      <div className="sign-in-toggler-container">
        <div className="sign-out-save-btn-container">
          <button
            className="sign-out-btn"
            onClick={handleSignOut}
            style={toggleBackGroundStyles}
          >
            Sign out
          </button>
          <button
            id="save-btn"
            className="save-btn"
            style={toggleBackGroundStyles}
            onClick={handleSaveBtn}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            S
          </button>
          {popupId === "save-btn" && (
            <p>{saveBtnClickTracker ? "Data saved" : "Save data"}</p>
          )}
        </div>

        <div className="toggle-area">
          {popupId === "toggle-container" && (
            <p>
              {lightDarkMode === false
                ? "switch to light mode"
                : "switch to dark mode"}
            </p>
          )}
          <div
            id="toggle-container"
            className="toggler-container"
            onClick={handleToggler}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            style={toggleBackGroundStyles}
          >
            <div className="toggler" style={togglerStyles}></div>
          </div>
        </div>
      </div>

      <h1>Salesboard 🔔</h1>

      <img
        className="employee-img"
        src={userDataState.userImgUrl}
        alt="Employee"
      />

      <div className="sales-btn-container">
        <button onClick={handleLiveSales} style={toggleBackGroundStyles}>
          {productA.emoji}
        </button>

        <button onClick={handleLiveSales} style={toggleBackGroundStyles}>
          {productB.emoji}
        </button>
      </div>

      <h3>Live Sales - {userProfileData.liveSalesCount}</h3>
      <div className="sales-achievements-container">
        <div className="sales-achievements">{userProfileData.liveSales}</div>
      </div>

      <h3>Live Achievements - {userProfileData.liveAchievementsCount}</h3>
      <div className="sales-achievements-container">
        <div className="sales-achievements">
          {userProfileData.liveAchievements}
        </div>
      </div>

      <div className="revenue-commisions-container">
        <div className="revenue">
          <p>Total Revenue</p>
          <div className="total-revenue total-revenue-commission">
            ${userProfileData.totalRevenueAmount}
          </div>
        </div>

        <div className="commision">
          <p>Total Commission</p>
          <div className="total-commision total-revenue-commission">
            ${userProfileData.totalCommissionAmount}
          </div>
        </div>
      </div>
    </div>
  );
}
