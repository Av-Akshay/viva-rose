import { Outlet, useLocation } from "react-router-dom";

import { Navbar, Footer } from "./Components";

function App() {
  const location = useLocation();
  const showFooter = !location.pathname.startsWith("/admin/dashboard");
  return (
    <>
      {showFooter && <Navbar />}
      <Outlet />
      {showFooter && <Footer />}
    </>
  );
}

export default App;
