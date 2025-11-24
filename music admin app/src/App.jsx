import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import AddSong from "./pages/Addsong";
import AddAlbum from "./pages/AddAlbum";
import ListAlbum from "./pages/ListAlbum";
import ListSong from "./pages/ListSong";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

export const API_BASE_URL = "http://localhost:8080";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" />

        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Admin Protected Routes */}
          <Route
            path="/add-songs"
            element={
              <ProtectedRoute requiredAdmin={true}>
                <AddSong />
              </ProtectedRoute>
            }
          />

          <Route
            path="/list-songs"
            element={
              <ProtectedRoute requiredAdmin={true}>
                <ListSong />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-album"
            element={
              <ProtectedRoute requiredAdmin={true}>
                <AddAlbum />
              </ProtectedRoute>
            }
          />

          <Route
            path="/list-albums"
            element={
              <ProtectedRoute requiredAdmin={true}>
                <ListAlbum />
              </ProtectedRoute>
            }
          />

          {/* Default login */}
          <Route path="/" element={<Login />} />

          {/* Wildcard Handler */}
          <Route path="*" element={<Navigate to="/add-songs" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
