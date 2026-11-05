import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Landing from "./components/Landing.jsx";
import EventDetails from "./components/EventDetails.jsx";
import Login from "./components/Login.jsx";
import MyRegistrations from "./components/MyRegistrations.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/registrations"
              element={
                <RequireAuth>
                  <MyRegistrations />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;