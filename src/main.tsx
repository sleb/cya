import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./components/App";
import AuthRequired from "./components/AuthRequired";
import BaseLayout from "./components/BaseLayout";
import GameDetails from "./components/GameDetails";
import GameList from "./components/GameList";
import Header from "./components/Header";
import Home from "./components/Home";
import NewGame from "./components/NewGame";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b5e20",
    },
    secondary: {
      main: "#fdd835",
    },
  },
});

const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <BaseLayout />,
        children: [
          {
            path: "/",
            element: <Header />,
            children: [
              { index: true, element: <Home /> },
              {
                element: <AuthRequired />,
                children: [
                  {
                    path: "games",
                    children: [
                      { index: true, element: <GameList /> },
                      {
                        path: "new",
                        element: <NewGame />,
                      },
                      {
                        path: ":id",
                        element: <GameDetails />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
