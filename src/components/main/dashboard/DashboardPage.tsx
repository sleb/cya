import React, { useEffect, useState } from "react";
import { currentUser } from "../../../services/auth-service";
import { onGamesSnapshot } from "../../../services/game-service";

import { Game } from "../../../model/game";
import GameListItem from "./GameListItem";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Button from "../../Button";

interface Props {}

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

  const navigate = useNavigate();

  return (
    <div>
      <Header title="Dashboard" />
      <div className="flex flex-col">
        {games.map((game, i) => (
          <GameListItem key={i} game={game} />
        ))}
        <Button
          title="New Game"
          type="button"
          onClick={() => navigate("/game/new")}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
