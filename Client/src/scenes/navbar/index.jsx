import { useState } from 'react';
import { 
    Box,
    IconButton,
    InputBase, 
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Icon
} from "@mui/material";
// different icons from web 
import { 
    Search, 
    Message, 
    DarkMode,
    LightMode,
    Notifications, 
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from 'state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';

const Navbar = () => {
    // hook for toggling menu 
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    // needed to dispatch actions inside of redux store, to modify state 
    // makes it easier to send actions to redux store directly from 
    // functional components 
    const dispatch = useDispatch();
    // used to navigate to different routes 
    const navigate = useNavigate();
    // useSelector allows to get info from redux store 
    const user = useSelector((state) => state.user);
    // often used with useTheme hook to apply responsive ui 
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const fullName = user ? `${user.firstName} ${user.lastName}` : "";

    // there is a flexbetween for the whole navbar which contains left and right
        // the left is flex between: typography and conditionally search components
        // if non-mobile screen, then also contains right side components
    return (    
    <FlexBetween padding="1.2rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
            {/* will always contain the logo */} 
            <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="primary"
                onClick={() => navigate("/home")}
                sx={{
                    "&:hover": {
                        color: primaryLight,
                        cursor: "pointer",
                    }
                }}
            >
                VargasBook
            </Typography>
            {/* isNonMobileScreens is a boolean
            the && is used to conditionally render */}
            {isNonMobileScreens && (
                <FlexBetween 
                    backgroundColor={neutralLight} 
                    borderRadius="9px" 
                    gap="3rem" 
                    padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..." />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            )}
        </FlexBetween>
        {/* DESKTOP NAV AKA NON-MOBILE SCREENS*/}
        {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }}/>
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                </IconButton>
                <Message sx={{ fontSize: "25px" }} />
                <Notifications sx={{ fontSize: "25px" }} />
                <Help sx={{ fontSize: "25px" }} />
                <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}> LogOut </MenuItem>
                        </Select>
                </FormControl>        
            </FlexBetween>
        ) : (
            <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
                <Menu />
            </IconButton>
        )}

        {/* MOBILE NAV, toggled menu will create a box with icons */}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
            >
               {/* CLOSE ICON */}
               <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close />
                    </IconButton> 
                </Box> 
                {/* MENU ITEMS */}
                <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                    <IconButton 
                        onClick={() => dispatch(setMode())}
                        sx={{ fontSize: "25px" }}
                    >
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }}/>
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}> LogOut </MenuItem>
                        </Select>
                    </FormControl>        
                </FlexBetween>
            </Box>
        )}
    </FlexBetween>
);};

export default Navbar;