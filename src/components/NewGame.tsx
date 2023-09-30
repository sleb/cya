import { Box, Button, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { newGame } from "../services/GameService";
import { userIdState } from "../state/UserIdState";

type FormData = {
  name: string;
};

const NewGame = () => {
  const uid = useRecoilValue(userIdState)!;
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<FormData>({ mode: "onSubmit" });

  const onSubmit = (data: FormData) => {
    newGame(data.name, uid)
      .then((id) => navigate(`/games/${id}`))
      .catch(console.error);
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
