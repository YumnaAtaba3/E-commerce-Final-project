import React from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTheme } from "../../../theme/ThemeProvider";

interface Props {
  favorite: boolean;
  onClick: () => void;
}

const FavoriteButton: React.FC<Props> = ({ favorite, onClick }) => {
  const { theme } = useTheme();

  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: 40,
        height: 40,
        border: "1px solid #ddd",
        color: favorite ? theme.Button2 : theme.borderColor,
        borderRadius: 1,
      }}
    >
      {favorite ? (
        <FavoriteIcon fontSize="large" />
      ) : (
        <FavoriteBorderIcon fontSize="large" />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
