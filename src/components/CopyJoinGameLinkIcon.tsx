import { ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useContext } from "react";
import { MessageContext } from "../contexts/MessageContext";

type Props = { gameId: string };

const CopyJoinGameLinkIcon = ({ gameId }: Props) => {
  const { info } = useContext(MessageContext);

  const handleCopyClick = () => {
    const joinLink = `${window.location.origin}/games/${gameId}/join`;
    navigator.clipboard.writeText(joinLink);

    info("Copied join link to clipboard");
  };

  return (
    <Tooltip title="Click to copy the share link.">
      <IconButton onClick={handleCopyClick}>
        <ContentCopy fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default CopyJoinGameLinkIcon;
