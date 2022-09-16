import { nanoid } from "nanoid";
import React from "react";




export default function Dealer(props){

    const randomId = React.useMemo(() => nanoid(), []);

    const dealerValueArray = props.dealerCards.map((item,id) =>{
        if(id > 1 && item.value == 11){
            return 1
        }else{
            return item.value
        }
    })
    if(dealerValueArray[0] == 11 && dealerValueArray[1] == 11){
        dealerValueArray[0] = 1
    }
    const dealerSum = dealerValueArray.reduce((prev,next) => prev + next)

    const elementsArray = props.dealerCards.map((item,id) => {
        const delayTime = 0.5 * (id-2)
        const idVariable = nanoid()

        if(id <2){
            return React.createElement(item.visual,{className:"card-pic",key:idVariable})
        }else if(id ==2){
            return React.createElement(item.visual,{className:"card-pic-later",key:idVariable})
        }else{
            return React.createElement(item.visual,{className:"card-pic-later",style:{animationDelay:`${delayTime}s`},key:idVariable})
        }
    }
    )
    if(props.dealerCards.length == 1){
        elementsArray.push(React.createElement(props.blankCard,{className:"card-pic",key:randomId}) )
    }

    const delayTime = props.dealerCards.length > 1 ? props.dealerCards.length * 0.3 : 0
    const style = {
        animationDuration: `${delayTime}s` ,
        color : dealerSum > 21 && "#FC100D"
    }
    return(
        <div className="dealer-div">
            <div key={nanoid()} className="player-sum dealer-sum" style={style}>
                Dealer Sum: {dealerSum}
            </div>
            <div className="cards-div">
                {elementsArray}
            </div>
        </div>
    )
}


