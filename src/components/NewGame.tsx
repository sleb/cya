import { Box, Button, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useMessages } from "../hooks/useMessages";
import { newGame } from "../services/GameService";
import { playerState } from "../state/PlayerState";

type FormData = {
  name: string;
};

const NewGame = () => {
  const player = useRecoilValue(playerState)!;
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<FormData>({ mode: "onSubmit" });
  const messages = useMessages();

  const onSubmit = (data: FormData) => {
    newGame(data.name, player)
      .then((id) => navigate(`/games/${id}`))
      .catch(messages.error);
  };

  return (
    <Box margin={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          {...register("name", { required: true })}
          placeholder="Game Name"
        />
        <Button type="submit" variant="contained">
          Create
        </Button>
      </form>
    </Box>
  );
};

export default NewGame;
