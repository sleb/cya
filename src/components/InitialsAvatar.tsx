import { Avatar } from "@mui/material";

type Props = { name: string };

const initials = (name: string): string => {
  return name
    .split(/\s+/)
    .filter((w) => w.length !== 0)
    .map((w) => w[0].toUpperCase())
    .join("");
};

const InitialsAvatar = ({ name }: Props) => {
  return <Avatar>{initials(name)}</Avatar>;
};

export default InitialsAvatar;
