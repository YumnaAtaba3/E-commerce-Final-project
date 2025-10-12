/* eslint-disable @typescript-eslint/no-explicit-any */
import{
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { Box, IconButton, Badge } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { appRoutes } from "../../../../routes";
import AccountDropdown from "../../../components/Account-dropdown";

// Ref now stores actual HTML element
export interface HeaderProtectedIconsHandle {
  cartIcon: HTMLAnchorElement | null;
}

interface HeaderProtectedIconsProps {
  theme: any;
  isLoggedIn: boolean;
  cart: any[];
  wishlist: any[];
  isMobile?: boolean;
  iconColor?: string;
  hoverBg?: string;
  badgeColor?: string;
}

const iconStylesConfig = {
  iconButton: (theme: any, hoverBg?: string) => ({
    bgcolor: "transparent",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    "&:hover": { bgcolor: hoverBg || theme.Button2, color: "white" },
  }),
  badge: (theme: any, badgeColor?: string) => ({
    "& .MuiBadge-badge": {
      bgcolor: badgeColor || theme.Button2,
      color: "white",
      fontWeight: 600,
    },
  }),
  icon: (theme: any, iconColor?: string) => ({
    fontSize: 20,
    color: iconColor || theme.Text1,
    transition: "color 0.3s ease",
    "&:hover": { color: "white" },
  }),
};

const HeaderProtectedIcons = forwardRef<
  HeaderProtectedIconsHandle,
  HeaderProtectedIconsProps
>(
  (
    {
      theme,
      isLoggedIn,
      cart,
      wishlist,
      isMobile,
      iconColor,
      hoverBg,
      badgeColor,
    },
    ref
  ) => {
    const [accountOpen, setAccountOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const cartIconRef = useRef<HTMLAnchorElement>(null);

    const location = useLocation();
    const hideAllIconsPages =
      location.pathname === appRoutes.auth.signUp ||
      location.pathname === appRoutes.auth.login;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        )
          setAccountOpen(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useImperativeHandle(ref, () => ({ cartIcon: cartIconRef.current }));

    const iconButtonSx = iconStylesConfig.iconButton(theme, hoverBg);
    const badgeSx = iconStylesConfig.badge(theme, badgeColor);
    const iconSx = iconStylesConfig.icon(theme, iconColor);

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {!hideAllIconsPages && (
          <IconButton
            component={RouterLink}
            to={appRoutes.wishlist}
            sx={{ ...iconButtonSx, ...badgeSx }}
          >
            <Badge badgeContent={wishlist.length} color="secondary">
              <FavoriteBorderIcon sx={iconSx} />
            </Badge>
          </IconButton>
        )}

        {!hideAllIconsPages && (
          <IconButton
            ref={cartIconRef}
            component={RouterLink}
            to={appRoutes.cart}
            sx={{ ...iconButtonSx, ...badgeSx }}
          >
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartOutlinedIcon sx={iconSx} />
            </Badge>
          </IconButton>
        )}

        {!hideAllIconsPages && isLoggedIn && (
          <Box sx={{ position: "relative" }} ref={dropdownRef}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setAccountOpen((prev) => !prev);
              }}
              sx={iconButtonSx}
            >
              <PersonOutlineIcon sx={iconSx} />
            </IconButton>
            <AccountDropdown
              open={accountOpen}
              theme={theme}
              isMobile={!!isMobile}
            />
          </Box>
        )}
      </Box>
    );
  }
);

export default HeaderProtectedIcons;
