import { Route, Routes } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/authContext";
import Login from "./Pages/Login/Login";
import DataTable from "./Pages/DataTable/DataTable";
import Error from "./Pages/Error/Error";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/table" element={<DataTable />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
