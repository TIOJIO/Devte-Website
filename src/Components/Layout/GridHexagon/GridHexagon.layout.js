import { Box } from "@mui/material";
import React from "react";
import {  Layout } from 'react-hexgrid';
import { StyledHexGrid, StyledHexagon, StyledText} from "./GridHexagon.style";
import useMediaQuery from "@mui/material/useMediaQuery";



const GridHexagon=({items})=>{
    const matchesBreakpoint1=useMediaQuery("(max-width:1430px)")
    const matchesBreakpoint2=useMediaQuery("(max-width:1225px)")
    const matchesBreakpoint3=useMediaQuery("(max-width:1070px)")
    const matchesBreakpoint4=useMediaQuery("(max-width:850px)")
    const matchesBreakpoint5=useMediaQuery("(max-width:700px)")
    const matchesBreakpoint6=useMediaQuery("(max-width:500px)")
    const matchesBreakpoint7=useMediaQuery("(max-width:428px)")
    const matchesBreakpoint8=useMediaQuery("(max-width:360px)")
    const matchesBreakpoint9=useMediaQuery("(max-width:310px)")
    var maxItems=0
    var numberItemReducing=3
    var maxNumberInLine=9
    var xSize=90
    var ySize=90
    if (matchesBreakpoint9){
        xSize=30
        ySize=30
        maxNumberInLine=5
        numberItemReducing=1
        maxItems=16
    }
    else if (matchesBreakpoint8){
        xSize=35
        ySize=35
        maxNumberInLine=5
        numberItemReducing=1
       maxItems=16
    }
    else if (matchesBreakpoint7){
        xSize=40
        ySize=40
        maxNumberInLine=5
        numberItemReducing=1
        maxItems=16

    }
    else if(matchesBreakpoint6){
        xSize=40
        ySize=40
        maxNumberInLine=6
        numberItemReducing=1
    }
    else if (matchesBreakpoint5){
        xSize=40
        ySize=40
        maxNumberInLine=7
        numberItemReducing=1


    }
    else if (matchesBreakpoint4){
        xSize=40
        ySize=40
    }
    else if (matchesBreakpoint3){
        xSize=50
        ySize=50
    }
    else if (matchesBreakpoint2){
        xSize=65
        ySize=65
    }
    else if (matchesBreakpoint1){
        xSize=75
        ySize=75
    }
  
    if (maxItems){
        items=items.filter(item=>!item.optional).slice(0, maxItems-1)
    }
    const startWithEvenItems=maxNumberInLine%2===0
    var r=0, q=0, c=0, odd=0
    if ((items.length)<maxNumberInLine){
        maxNumberInLine=items.length
    }
    const Hexagons=items.map((item, i)=>{     
        
        if (c>1 && c%(maxNumberInLine)===0){
            maxNumberInLine-=numberItemReducing
            r+=1
            c=0
            if(r%2!==0)odd+=1
            if ((items.length-i)<maxNumberInLine){
                maxNumberInLine=items.length-i
            }
        }
        if(startWithEvenItems && r%2!==0 ){
            q=parseInt(-maxNumberInLine/2)+c-odd
        }
        else if(r===4){
            q=parseInt(-maxNumberInLine/2)+c-2
        }
        else if (r>1){
            q=parseInt(-maxNumberInLine/2)+c-1
        }
        else{
            q=parseInt(-maxNumberInLine/2)+c

        }
        c++
        return(
            <StyledHexagon q={q} r={r} s={0} >
                {item.svg}
                <StyledText size={xSize} y={(ySize/2)}>{item.name}</StyledText>
            </StyledHexagon>
        )
    }   
) 
    return (
        <Box>
          <StyledHexGrid size={xSize}  width="100%"  height={ySize*((r+1)*2.1)} viewBox={`0 0 100 ${ySize*((r+1)*2.1)}`}>
          <Layout style={{transform:"translateX(50%)"}} size={{ x:xSize , y:ySize }} flat={false} spacing={1.025} origin={{ x:startWithEvenItems?35:0, y: ySize+4}}>
            {Hexagons}
          </Layout>
        </StyledHexGrid>
        </Box>
          
    )
}

export default GridHexagon




