import { ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

type Props = { gameId: string };

const CopyJoinGameLinkIcon = ({ gameId }: Props) => {
  const joinLink = `${window.location.origin}/games/${gameId}/join`;

  return (
    <Tooltip title="Click to copy the share link.">
      <IconButton onClick={() => navigator.clipboard.writeText(joinLink)}>
        <ContentCopy fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default CopyJoinGameLinkIcon;
