import React from "react";
import { nanoid } from "nanoid";



export default function Player(props){
    
    const playerValueArray = props.playerCards.map((item,id) => {
        if(id > 1 && item.value == 11){
            return 1
        }else{
            return item.value
        }
    })
    if(playerValueArray[0] == 11 && playerValueArray[1] == 11){
        playerValueArray[0] = 1
    }
    const playerSum = playerValueArray.reduce((prev,next) => prev + next)
   
    const elementsArray = props.playerCards.map((item,id) => {
        const idVariable = nanoid()
        if(id <2){
            return React.createElement(item.visual,{className:"card-pic",key:idVariable})
        }else{
            return React.createElement(item.visual,{className:"card-pic",key:idVariable})
        }
    }
    )

    return(
        <div className="player-div">
            <div className="cards-div">
                {elementsArray}
            </div>
            <div key={nanoid()} className="player-sum" style={playerSum > 21 ? {color:"#FC100D"} : {}}>
                Sum: {playerSum}
            </div>
        </div>
    )
    
}

