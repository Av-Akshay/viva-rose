import { Outlet, useLocation } from "react-router-dom";

import { Navbar, Footer } from "./Components";

function App() {
  const location = useLocation();
  const showFooter = location.pathname !== "/admin/dashboard";
  return (
    <>
      <Navbar />
      <Outlet />
      {showFooter && <Footer />}
    </>
  );
}

export default App;
