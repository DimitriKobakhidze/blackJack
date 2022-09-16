import { nanoid } from "nanoid"

export default function EndText(props){
    const delayTime = props.dealerCards.length * 0.4
    const style = {
        color: props.result == "You Won"
                ? "#4BB543" 
                : props.result == "Draw" 
                        ? "#F7A76C" 
                        : props.result == "Make Bet" 
                                ? "#1C6758" 
                                :"#FC100D",
        animationDuration: `${delayTime}s`
    }

    return(
        <div key = {nanoid()} className="end-text-div" style={style}>
            <h1>{props.result}</h1>
        </div>
    )
}