import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import RegisterPage from "./components/auth/RegisterPage";
import { onAuthChange } from "./services/auth-service";
import LoginPage from "./components/auth/LoginPage";
import DashboardPage from "./components/main/dashboard/DashboardPage";
import NavBar from "./components/main/NavBar";
import { User } from "./model/user";
import NewGamePage from "./components/main/new-game/NewGamePage";
import GameDetailPage from "./components/main/game-detail/GameDetailPage";
import JoinGamePage from "./components/main/join-game/JoinGamePage";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoaded(true);
    });
    return unsubscribe;
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-full">
        <NavBar user={user} />
        <main>
          <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/game/new" element={<NewGamePage />} />
                <Route path="/game/:id/edit" element={<GameDetailPage />} />
                <Route path="/game/:id/join" element={<JoinGamePage />} />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace={true} />}
                />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
