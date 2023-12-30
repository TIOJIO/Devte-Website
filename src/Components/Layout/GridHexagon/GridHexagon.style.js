import { Box, styled } from '@mui/material';
import { HexGrid, Hexagon, Text } from 'react-hexgrid';



const StyledHexagon=styled(Hexagon)(({theme})=>({
    fill:"#ffffff",
    stroke:theme.palette.primary.main,
    strokeWidth:0.6,
    transition:".3s 0s ease",
    "&:hover":{
        fill:theme.palette.primary.main,
        cursor:"pointer"
        
    },
    "&:hover text":{
        fill:theme.palette.light.main,
    },
    "& svg":{
        fill:"inital",
        stroke:"initial",
        strokeWidth:"initial",
        
    }
}))
const StyledText=styled(Text)(({theme, size})=>({
    fontSize:size>40?16:10,
    fill:theme.palette.dark.main,
    stroke:"none",
}))

const StyledBoxHexagon=styled(Box)(({theme})=>({
    position:"relative",

}))
const StyledHexGrid=styled(HexGrid)(({theme, size})=>({
    "& > g ":{
        transform:"translateX(50%)",
    },
    "&  svg":{
        transform:`translate(-${size/4}px, -${size/2}px) scale(${size/80})`,

    }
}))
export {StyledHexagon, StyledText, StyledBoxHexagon, StyledHexGrid}