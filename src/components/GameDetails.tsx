import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onGameChange } from "../services/GameService";
import { Game } from "../model/Game";

type Params = { id: string };

const GameDetails = () => {
  const [game, setGame] = useState<Game | null>(null);
  const { id } = useParams<Params>();


  useEffect(() => {
    onGameChange(id, )
  })

  return <Box></Box>
};

export default GameDetails;
