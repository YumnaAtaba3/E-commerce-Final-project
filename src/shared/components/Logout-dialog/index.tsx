/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

interface LogoutDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  theme: any;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  theme,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: {
          bgcolor: "rgba(0, 0, 0, 0.3)", 
          backdropFilter: "blur(9px)",
          WebkitBackdropFilter: "blur(9px)",
          borderRadius: 4,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.05), inset 0 0 34px 17px rgba(255,255,255,0.1)",
          textAlign: "center",
          p: 3,
          minWidth: 360,
          maxWidth: 400,
          overflow: "hidden",
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <LogoutOutlinedIcon
          sx={{
            fontSize: 50,
            color: theme.Button2,
            bgcolor: theme.Button2 + "22", 
            borderRadius: "50%",
            p: 1.5,
          }}
        />
      </Box>

      {/* Title */}
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: 20,
          color: "white",
        }}
      >
        Confirm Logout
      </DialogTitle>

      {/* Description */}
      <DialogContent sx={{ mt: 1 }}>
        <Typography sx={{ color: "gray", fontSize: 15 }}>
          Are you sure you want to logout? <br />
          Your current session will be ended.
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          onClick={onCancel}
          sx={{
            px: 7,
            py: 1.2,
            borderRadius: 3,
            fontWeight: 600,
            color: theme.Button2,
            border: `1px solid ${theme.Button2}`,

            transition: "all 0.3s ease",
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          sx={{
            px: 7,
            py: 1.2,
            borderRadius: 3,
            fontWeight: 600,
            bgcolor: theme.Button2,
            color: "#fff",
            "&:hover": {
              bgcolor: theme.Button2 + "cc",
            },
            transition: "all 0.3s ease",
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
