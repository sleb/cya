import React, { useEffect, useState } from "react";
import { currentUser, signOutUser } from "../../services/auth-service";
import { onGamesSnapshot } from "../../services/game-service";

import { Game } from "../../model/game";
import GameListItem from "../GameListItem";
import { Link } from "react-router-dom";

interface Props {}

const logOut = () => {
  signOutUser().catch(console.error);
};

const DashboardPage = (props: Props) => {
  const [games, setGames] = useState([] as Game[]);

  useEffect(() => {
    let unsubscribe = () => {};
    currentUser().then((user) => {
      if (user) {
        unsubscribe = onGamesSnapshot(
          user,
          (games) => {
            setGames(games);
          },
          console.error
        );
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col">
      {games.map((game, i) => (
        <GameListItem key={i} game={game} />
      ))}

      <button onClick={logOut}>Dashboard</button>
      <Link to="/game/new">New Game</Link>
    </div>
  );
};

export default DashboardPage;
