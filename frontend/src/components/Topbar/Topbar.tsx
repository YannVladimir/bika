import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  NotificationsOutlined as NotificationsIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useThemeContext } from "../../theme/ThemeProvider";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.drawer + 1,
}));

const UserProfile = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

interface TopbarProps {
  onSidebarToggle: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onSidebarToggle }) => {
  const { mode, toggleTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    handleClose();
    // Add logout logic here
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onSidebarToggle}
          sx={{ mr: 2, display: { xs: "inline-flex", md: "inline-flex" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 2 }}>
          {mode === "dark" ? <LightIcon /> : <DarkIcon />}
        </IconButton>
        <IconButton color="inherit" sx={{ mr: 2 }}>
          <NotificationsIcon />
        </IconButton>
        <UserProfile onClick={handleProfileClick}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "primary.main",
            }}
          >
            JD
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              John Doe
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Administrator
            </Typography>
          </Box>
          <ArrowDownIcon sx={{ fontSize: 20 }} />
        </UserProfile>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Topbar;
