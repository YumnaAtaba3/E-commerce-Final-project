import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface InvoicePopupProps {
  open: boolean;
  onClose: () => void;
  invoice: any;
}

const InvoicePopup = ({ open, onClose, invoice }: InvoicePopupProps) => {
  const { theme } = useTheme();

  if (!invoice) return null;

  const {
    billingData,
    cartItems,
    subtotal,
    shipping,
    total,
    paymentMethod,
    date,
  } = invoice;

  const handlePrint = () => window.print();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Header */}
      <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
        <Typography variant="h6" sx={{ mb: 0.5, fontSize: 14 }}>
          Company Name
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontSize: 12 }}
        >
          Invoice
        </Typography>
      </DialogTitle>

      <DialogContent>
        {/* Billing & Payment Info */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ minWidth: 250 }}>
            <Typography sx={{ fontWeight: 600, mb: 0.5, fontSize: 14 }}>
              Billing Information
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              <strong>Name:</strong> {billingData.firstName}{" "}
              {billingData.lastName}
            </Typography>
            {billingData.companyName && (
              <Typography sx={{ fontSize: 12 }}>
                <strong>Company:</strong> {billingData.companyName}
              </Typography>
            )}
            <Typography sx={{ fontSize: 12 }}>
              <strong>Address:</strong> {billingData.streetAddress},{" "}
              {billingData.apartment}
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              <strong>City:</strong> {billingData.townCity}
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              <strong>Email:</strong> {billingData.email}
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              <strong>Phone:</strong> {billingData.phone}
            </Typography>
          </Box>

          <Box sx={{ minWidth: 200 }}>
            <Typography sx={{ fontWeight: 600, mb: 0.5, fontSize: 14 }}>
              Payment Information
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              <strong>Method:</strong> {paymentMethod}
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              <strong>Date:</strong> {new Date(date).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Items Table */}
        <Box sx={{ overflowX: "auto" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "4fr 1fr",
              fontWeight: 600,
              borderBottom: `2px solid ${theme.borderColor}`,
              py: 0.5,
              fontSize: 14,
            }}
          >
            <Typography>Product</Typography>
            <Typography align="right">Price</Typography>
          </Box>
          {cartItems.map((item: any, idx: number) => (
            <Box
              key={idx}
              sx={{
                display: "grid",
                gridTemplateColumns: "4fr 1fr",
                py: 0.5,
                borderBottom:
                  idx === cartItems.length - 1
                    ? "2px solid #000"
                    : `1px solid ${theme.borderColor}`,
                fontSize: 12,
              }}
            >
              <Typography>{item.title}</Typography>
              <Typography align="right">${item.price.toFixed(2)}</Typography>
            </Box>
          ))}
        </Box>

        {/* Totals */}
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
            }}
          >
            <Typography>Subtotal</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
            }}
          >
            <Typography>Shipping</Typography>
            <Typography>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 700,
              fontSize: 14,
              backgroundColor: theme.Button2 + "20",
              px: 1,
              py: 0.5,
              borderRadius: 1,
            }}
          >
            <Typography>Total</Typography>
            <Typography>${total.toFixed(2)}</Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1.5,
            mt: 3,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: theme.Button2,
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: theme.Button2 },
              px: 4,
              py: 1,
              fontSize: 12,
            }}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: theme.Text1,
              borderColor: theme.Text1,
              fontWeight: 600,
              textTransform: "none",
              px: 4,
              py: 1,
              fontSize: 12,
              "&:hover": { borderColor: theme.Text1, bgcolor: "#f5f5f5" },
            }}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InvoicePopup;
