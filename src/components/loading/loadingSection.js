import { Box, CircularProgress } from "@mui/material";

export default function LoadingSection(){
    return(
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
            <CircularProgress />
        </Box>
    )
}