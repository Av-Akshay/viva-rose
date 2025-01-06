import { Outlet } from "react-router-dom";

import { Navbar, Footer } from "./Components";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
