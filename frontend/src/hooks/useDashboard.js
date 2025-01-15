import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const useDashboard = () => {
  const [activePath, setActivePath] = useState("dashboard");

  return {
    activePath,
    setActivePath,
  };
};

export default useDashboard;
