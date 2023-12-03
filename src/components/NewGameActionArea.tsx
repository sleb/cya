import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { MessageContext } from "../contexts/MessageContext";
import { startGame } from "../services/GameService";

type Props = { gameId: string };
const NewGameActionArea = ({ gameId }: Props) => {
  const [open, setOpen] = useState(false);
  const { error, info } = useContext(MessageContext);

  const handleStartGame = () => {
    startGame(gameId)
      .then(() => info("Game started!"))
      .catch(error);
  };

  return (
    <>
      <Button size="small" variant="contained" onClick={() => setOpen(true)}>
        Start Game
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box margin={2} padding={2} borderRadius={2} bgcolor="white">
          <Stack gap={2}>
            <Typography variant="h5">Start Game?</Typography>
            <Typography>
              No new players can join once the game has started.
            </Typography>
            <Box display="flex" justifyContent="right">
              <ButtonGroup size="small" variant="contained">
                <Button onClick={handleStartGame}>Yes!</Button>
                <Button onClick={() => setOpen(false)}>Nope</Button>
              </ButtonGroup>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default NewGameActionArea;
