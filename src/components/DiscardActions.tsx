import { ArrowDropDown } from "@mui/icons-material";
import { Button, ButtonGroup, Menu, MenuItem } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { MessageContext } from "../contexts/MessageContext";
import { Card } from "../model/Card";
import { Hand } from "../model/Hand";
import { discard } from "../services/GameService";
import { playerState } from "../state/PlayerState";

type Props = { gameId: string; hand: Hand };

const DiscardActions = ({ gameId, hand }: Props) => {
  const { uid } = useRecoilValue(playerState)!;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const { error } = useContext(MessageContext);
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  const cards = [...new Set(hand.cards)];

  const handleDiscard = (c: Card) => {
    discard(gameId, uid, c).catch(error);
  };

  const buttons = cards.map((c, i) => (
    <Button
      key={i}
      onClick={() => handleDiscard(c)}
      variant="contained"
    >{`Discard ${c}`}</Button>
  ));

  const handleSelection = (index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="contained" ref={buttonGroupRef}>
        {buttons[selectedIndex]}
        <Button onClick={() => setOpen(!open)}>
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Menu
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={buttonGroupRef.current}
      >
        {cards.map((c, i) => (
          <MenuItem onClick={() => handleSelection(i)} key={i}>
            {c}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DiscardActions;
