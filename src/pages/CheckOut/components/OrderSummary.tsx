import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import ProductItem from "./ProductItem";
import { useTheme as useMuiTheme } from "@mui/material/styles";
// Product images
import PlayStation from "../../../assets/CheckOut/playstation.png";
import MasterCard from "../../../assets/CheckOut/masterCard.svg";
import ChinaLogo from "../../../assets/CheckOut/chinalogo.svg";
import Bkash from "../../../assets/CheckOut/Bkash.svg";

// Example product list
const products = [
  { name: "LCD Monitor", price: 650, image: PlayStation },
  { name: "HI Gamepad", price: 1100, image: PlayStation },
];
 
const OrderSummary = () => {
  const { theme } = useTheme();
    const muiTheme = useMuiTheme();
const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const subtotal = products.reduce((sum, p) => sum + p.price, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        alignItems: "flex-start",
      }}
    >
      {/* Product Summary Box */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: theme.primary1,
          width: "100%",
          maxWidth: 400,
          maxHeight: 300,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.Button2,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
          transition: "all 0.3s ease-in-out",
        }}
      >
        {products.map((product, index) => (
          <ProductItem
            key={index}
            name={product.name}
            price={`$${product.price}`}
            image={product.image}
          />
        ))}
      </Box>

      {/* Action Box: Totals + Payment */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: theme.primary1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        {/* Totals */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          {/* Subtotal */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: 16 }}>Subtotal</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              ${subtotal}
            </Typography>
          </Box>
          <Box
            sx={{
              borderTop: `1px solid ${theme.borderColor}`,
              width: "100%",
              mt: 1,
            }}
          />

          {/* Shipping */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: 16 }}>Shipping</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              {shipping === 0 ? "Free" : `$${shipping}`}
            </Typography>
          </Box>
          <Box
            sx={{
              borderTop: `1px solid ${theme.borderColor}`,
              width: "100%",
              mt: 1,
            }}
          />

          {/* Total */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: 16 }}>Total</Typography>
            <Typography sx={{ fontSize: 16 }}>${total}</Typography>
          </Box>
        </Box>

        {/* Payment options */}
        <RadioGroup sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControlLabel
            value="bank"
            control={
              <Radio
                sx={{
                  color: theme.Text1,
                  "&.Mui-checked": { color: theme.Text1 },
                }}
              />
            }
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 2,
                }}
              >
                <Typography sx={{ fontSize: 16, flex: 1 }}>Bank</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    component="img"
                    src={MasterCard}
                    alt="MasterCard"
                    sx={{ height: 28 }}
                  />
                  <Box
                    component="img"
                    src={ChinaLogo}
                    alt="China"
                    sx={{ height: 28 }}
                  />
                  <Box
                    component="img"
                    src={Bkash}
                    alt="Bkash"
                    sx={{ height: 28 }}
                  />
                </Box>
              </Box>
            }
          />
          <FormControlLabel
            value="cod"
            control={
              <Radio
                sx={{
                  color: theme.Text1,
                  "&.Mui-checked": { color: theme.Text1 },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: 16 }}>Cash on delivery</Typography>
            }
          />
        </RadioGroup>
      </Box>

      {/* Coupon Input + Apply Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // stack on mobile, row on desktop
          gap: 2,
          width: "100%",
          maxWidth:isMobile ?300:500,
          alignItems: { xs: "stretch", md: "center" },
        }}
      >
        <TextField
          placeholder="Coupon Code"
          variant="outlined"
          size={isMobile?"small":"medium"}
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              height: "56px",
              width:isMobile?"200px":"300px",
              fontSize: "16px",
              "& fieldset": { borderColor: "black" },
              "&:hover fieldset": { borderColor: theme.Button2 },
              "&.Mui-focused fieldset": {
                borderColor: theme.Button2,
                borderWidth: "1.5px",
              },
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            width:  isMobile ? "190px" : "160px",
            height: 56,
            bgcolor: theme.Button2,
            color: "#fff",
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "none",
            "&:hover": { bgcolor: theme.error },
          }}
        >
          Apply Coupon
        </Button>
      </Box>

      {/* Place Order Button */}
      <Button
        variant="contained"
        sx={{
          width: 190,
          height: 56,
          bgcolor: theme.Button2,
          color: "#fff",
          fontSize: "14px",
          fontWeight: 500,
          textTransform: "none",
          "&:hover": { bgcolor: theme.error },
          alignSelf: "flex-start",
        }}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default OrderSummary;
