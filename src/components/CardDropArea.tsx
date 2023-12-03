import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { ReactElement } from "react";

type Props = { id: string; children: ReactElement };

const CardDropArea = ({ id, children }: Props) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <Box
      ref={setNodeRef}
      style={isOver ? { border: "3px solid green" } : undefined}
    >
      {children}
    </Box>
  );
};

export default CardDropArea;
