import React from "react";
import { Paper, Box, Typography, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { Theme } from "../../../theme/themeTokens";
import type { CartItem as StoreCartItem } from "../../../store/cartStore";

interface Props {
  item: StoreCartItem;
  gridCols: string;
  onRemove: (id: number) => void;
  onQtyChange: (id: number, qty: number) => void;
  theme: Theme;
  isMobile: boolean;
}

const CartItem: React.FC<Props> = ({
  item,
  onRemove,
  onQtyChange,
  theme,
  isMobile,
}) => {
  const Counter = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: 1,
        overflow: "hidden",
        width: 60,
        height: 30,
        bgcolor: theme.primary1,
        color: theme.Text1,
      }}
    >
      <Box
        sx={{
          flex: 1,
          textAlign: "center",
          fontSize: 16,
          lineHeight: "30px",
          userSelect: "none",
        }}
      >
        {item.quantity}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid #ccc",
        }}
      >
        <IconButton
          size="small"
          onClick={() => onQtyChange(item.id, item.quantity + 1)}
          sx={{ padding: 0, height: "50%", color: theme.Text1 }}
        >
          <KeyboardArrowUpIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onQtyChange(item.id, Math.max(1, item.quantity - 1))}
          sx={{ padding: 0, height: "50%", color: theme.Text1 }}
        >
          <KeyboardArrowDownIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  const productImage = item.images[0] || "";

  return (
    <Paper
      sx={{
        mb: 2,
        width: "100%",
        p: { xs: 2, md: 1 },
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr 1fr 1.5fr",
        alignItems: "center",
        gap: 2,
        border: `1px solid ${theme.borderColor}`,
        borderRadius: 2,
        boxShadow: "0px 6px 24px rgba(0,0,0,0.08)",
        transition: "all 0.3s",
        position: "relative",
        "&:hover": {
          boxShadow: `0px 8px 30px ${theme.Button2}50`,
          transform: "translateY(-4px)",
        },
        "&:hover .cancel": { opacity: 1 },
        bgcolor: theme.primary1,
        color: theme.Text1,
      }}
    >
      {!isMobile ? (
        <>
          {/* Desktop Layout */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifySelf: "start",
            }}
          >
            <Box sx={{ width: 70, height: 70, position: "relative" }}>
              <Box
                component="img"
                src={productImage}
                alt={item.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 1,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                }}
              />
              <IconButton
                className="cancel"
                onClick={() => onRemove(item.id)}
                sx={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  bgcolor: "#fff",
                  color: "error.main",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                <CancelIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              {item.title}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: 16, justifySelf: "center" }}>
            ${item.price}
          </Typography>
          <Box sx={{ justifySelf: "center" }}>
            <Counter />
          </Box>
          <Typography sx={{ fontSize: 16, justifySelf: "center" }}>
            ${item.price * item.quantity}
          </Typography>
        </>
      ) : (
        <>
          {/* Mobile Layout */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              border: `1px solid ${theme.borderColor}`,
              borderRadius: 2,
              p: 2,
              transition: "all 0.3s",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component="img"
                src={productImage}
                alt={item.title}
                sx={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 1,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                }}
              />
              <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                {item.title}
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 14 }}>Price: ${item.price}</Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ fontSize: 14 }}>Quantity:</Typography>
              <Counter />
            </Box>

            <Typography sx={{ fontSize: 14 }}>
              Subtotal: ${item.price * item.quantity}
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default CartItem;
