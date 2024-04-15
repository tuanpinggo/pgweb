import { Box, Button, Dialog, DialogContent, Stack, Typography } from "@mui/material"
import { useState } from "react"

function createMarkup(content) {
    return {__html: content};
}

export default function DetailCampaign({data}){

    const [open,setOpen] = useState(false)

    return(
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"flex-start"}>
            <Box width={"80%"}>
                <Typography variant="body2">{data.attributes.title}</Typography>
            </Box>
            <Button onClick={() => setOpen(true)}>Chi tiết</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <Typography fontSize={20} fontWeight={700} mb={3}>{data.attributes.title}</Typography>
                    <div 
                        dangerouslySetInnerHTML={createMarkup(data.attributes.content)}
                        className="infoContent"
                    />
                </DialogContent>
            </Dialog>
        </Stack>
    )
}