import React, { useState } from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  Rating,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";

import ProductImages from "./components/ProductImages";
import ProductColors from "./components/ProductColors";
import ProductSizes from "./components/ProductSizes";
import QuantityBuyFavorite from "./components/QuantityBuyFavorite";
import DeliveryReturnCard from "./components/DeliveryReturnCard";
import RelatedItems from "./components/RelatedItems";

import { useTheme } from "../../theme/ThemeProvider";

import Img1 from "../../assets/Product-details/image 63.png";
import Img2 from "../../assets/Product-details/image 61.png";
import Img3 from "../../assets/Product-details/image 63.png";
import MainImage from "../../assets/Product-details/image 63.png";
import DeliveryIcon from "../../assets/Product-details/icon-delivery (2).svg";
import ReturnIcon from "../../assets/Product-details/Icon-return.svg";

const ProductDetailsPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("#fff");
  const [favorite, setFavorite] = useState(false);

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity(quantity + 1);
    else if (quantity > 1) setQuantity(quantity - 1);
  };

  const thumbnails = [Img1, Img2, Img3, Img3];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["#896", "#000"];

  const relatedItems = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      price: "$120",
      oldPrice: "$160",
      discount: "-40%",
      rating: 4,
      img: "/red-gamepad.png",
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: "$960",
      oldPrice: "$1160",
      discount: "-35%",
      rating: 4.5,
      img: "/keyboard.png",
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      price: "$370",
      oldPrice: "$400",
      discount: "-30%",
      rating: 4.5,
      img: "/monitor.png",
    },
    {
      id: 4,
      name: "RGB Liquid CPU Cooler",
      price: "$160",
      oldPrice: "$170",
      discount: "-10%",
      rating: 4,
      img: "/cooler.png",
    },
  ];

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 6,
        bgcolor: "#fff",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 4, fontSize: 14 }} separator="›">
          <Link underline="hover" color="text.secondary" href="/">
            Account
          </Link>
          <Link underline="hover" color="text.secondary" href="/">
            Gaming
          </Link>
          <Typography color="text.primary" fontSize={14}>
            Havic HV G-92 Gamepad
          </Typography>
        </Breadcrumbs>

        {/* Product Section */}
        <Grid
          container
          spacing={6}
          alignItems="flex-start"
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          {/* Images */}
          <Grid >
            <ProductImages thumbnails={thumbnails} mainImage={MainImage} />
          </Grid>

          {/* Product Details */}
          <Grid
           
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "center" : "flex-start",
            }}
          >
            <Typography
              fontSize={24}
              fontWeight={550}
              mb={1}
              textAlign={isMobile ? "center" : "left"}
            >
              Havic HV G-92 Gamepad
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              gap={1}
              mb={2}
              flexWrap="wrap"
              justifyContent={isMobile ? "center" : "flex-start"}
            >
              <Rating value={4} readOnly size="large" />
              <Typography fontSize={14} color="text.secondary">
                (150 Reviews)
              </Typography>
              <Box sx={{ width: "1px", height: 16, bgcolor: "#ddd", mx: 1 }} />
              <Typography
                fontSize={14}
                sx={{ color: theme.Button1, fontWeight: 500 }}
              >
                In Stock
              </Typography>
            </Box>

            <Typography
              fontSize={28}
              sx={{
                fontWeight: 500,
                mb: 2,
                textAlign: isMobile ? "center" : "left",
              }}
            >
              $192.00
            </Typography>

            <Typography
              fontSize={14}
              color={theme.Text1}
              mb={2}
              maxWidth={isMobile ? "100%" : 340}
              textAlign={isMobile ? "center" : "left"}
            >
              PlayStation 5 Controller Skin. High quality vinyl with air channel
              adhesive for easy bubble free install & mess free removal.
              Pressure sensitive.
            </Typography>

            <Box
              sx={{ width: "100%", borderBottom: "1px solid #000", mb: 3 }}
            />

            {/* Product Options */}
            <ProductColors
              colors={colors}
              selected={color}
              onSelect={setColor}
            />
            <ProductSizes sizes={sizes} selected={size} onSelect={setSize} />
            <QuantityBuyFavorite
              quantity={quantity}
              onQuantityChange={handleQuantity}
              favorite={favorite}
              onFavoriteToggle={() => setFavorite(!favorite)}
            />
            <DeliveryReturnCard
              deliveryIcon={DeliveryIcon}
              returnIcon={ReturnIcon}
            />
          </Grid>
        </Grid>

        {/* Related Items Section */}
        <Box mt={8}>
          <RelatedItems items={relatedItems} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
