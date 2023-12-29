import { Box } from "@mui/material";
import { styled } from "@mui/system";

// this syntax is good if we're re-using css as a component
// these are style components, can pass in css
// this component aligns and flexes things to proper locations
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

export default FlexBetween;