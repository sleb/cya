import { ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useMessages } from "../hooks/useMessages";

type Props = { gameId: string };

const CopyJoinGameLinkIcon = ({ gameId }: Props) => {
  const messages = useMessages();

  const handleCopyClick = () => {
    const joinLink = `${window.location.origin}/games/${gameId}/join`;
    navigator.clipboard.writeText(joinLink);

    messages.success("Copied join link to clipboard");
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
