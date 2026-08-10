
import Laundrymachineapp from "./pages/Laundrymachineapp";
import { Routes, Route } from "react-router-dom";

function AppRoutes() {   // ✅ FIXED NAME
  return (
    <Routes>
      <Route path="/" element = {<Laundrymachineapp />} />
    </Routes>
  );
}

export default AppRoutes;