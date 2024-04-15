import { Stack, TextField, Typography } from "@mui/material";

export default function PinggoInput({...props}){
    
    return(
        <Stack direction="column" spacing={0.8}>
            {props?.label && 
                <Typography variant="body2" fontWeight={500} fontSize={14}>
                    {props.label}
                </Typography>
            }

            <TextField 
                id={props?.id || "id"}
                name={props?.name || "name"}
                type={props?.type || "text"}
                variant="outlined"
                hiddenLabel
                placeholder={props?.placeholder || "place holder"}
                size={props?.size || "small"}
                fullWidth={props?.fullWidth}
                inputProps={{style: {fontSize: '14px'}}}
                value={props?.value}
                onChange={props?.onChange}
                onBlur={props?.onBlur}
                error={props?.error}
                helperText={props?.helperText}
                InputProps={{
                    startAdornment: props?.startAdornment,
                    endAdornment: props?.endAdornment
                }}
            />
        </Stack>
    )
}