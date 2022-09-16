import React, { createElement } from "react";
import {GiCard2Spades,GiCard3Spades,GiCard4Spades,GiCard5Spades,GiCard6Spades,GiCard7Spades,
  GiCard8Spades,GiCard9Spades,GiCard10Spades,GiCardJackSpades,GiCardQueenSpades,GiCardKingSpades,GiCardAceSpades,GiCardRandom} from "react-icons/gi"
import Dealer from "./Component/Dealer";
import Player from "./Component/Player";
import EndText from "./Component/EndText";
import {FaRedoAlt} from "react-icons/fa"
import { nanoid } from 'nanoid'
import chip10 from "./Images/poker-chip10.png"
import chip25 from "./Images/poker-chip25.png"
import chip50 from "./Images/poker-chip50.png"
import chip100 from "./Images/poker-chip100.png"

function App() {
  const cardsObjectList = [
      {value:2,visual: GiCard2Spades},
      {value:3,visual: GiCard3Spades},
      {value:4,visual: GiCard4Spades},
      {value:5,visual: GiCard5Spades},
      {value:6,visual: GiCard6Spades},
      {value:7,visual: GiCard7Spades},
      {value:8,visual: GiCard8Spades},
      {value:9,visual: GiCard9Spades},
      {value:10,visual: GiCard10Spades},
      {value:10,visual: GiCardJackSpades}, 
      {value:10,visual: GiCardQueenSpades}, 
      {value:10,visual: GiCardKingSpades}, 
      {value:11,visual: GiCardAceSpades}
  ]

  // const x = [GiCard8Spades,GiCard9Spades]
  // const y = x.map(item => React.createElement(item,{className:"card-pic"}))
  // console.log(y)

  const [playAgain,setPlayAgain] = React.useState(false)
  const [dataState,setDataState] = React.useState()
  const [playerMoney,setPlayerMoney] = React.useState(() => JSON.parse(localStorage.getItem("playerMoney")) || 500)
  const [playerBet,setPlayerBet] = React.useState(
    {
      active:true,
      amount:""
    }
  )

  React.useEffect(() =>{
    setDataState({
      dealerCards:[getRandomCard()],
      playerCards:[getRandomCard(),getRandomCard()],
      alive:true,
      result:""
    })

  },[playAgain])

  React.useEffect(() =>{
    localStorage.setItem("playerMoney",JSON.stringify(playerMoney))
  },[playerMoney])


  

  function betPlayer(amount){
    if(playerMoney - amount >= 0){
      setPlayerBet(
        {
          active:false,
          amount:amount
        }
      )
    }else{
      window.alert("Not Enough Ballance")
    }
  }



  // console.count(dataState)

  // function randomCardId(){
  //   return Math.floor(Math.random() * 13)
  // }

  function getRandomCard(){
    return (cardsObjectList[Math.floor(Math.random() * 13)])
  }

  function playerHit(){
    let newCard = getRandomCard()
    if(newCard.value == 11){
      newCard.value = 1
    }
    const valueArray = dataState.playerCards.map(item => item.value)
    const valueSum = valueArray.reduce((prev,next) => prev + next)
    const sumAfterHit = valueSum + newCard.value
    if(sumAfterHit > 21){
      setDataState(prev => (
        {
          ...prev,
          playerCards: [...dataState.playerCards,newCard],
          alive: false,
          result: "Busted"
        }
        ))
        setPlayerMoney(prev => prev - playerBet.amount)
    }else{
      setDataState(prev => (
        {
          ...prev,
          playerCards: [...dataState.playerCards,newCard]
        }
      ))
    }
  }

  function playerStand(){
    setDataState(prev => (
      {
        ...prev,
        alive: false
      }
    ))
    dealerGame()
  }

  function dealerGame(){
    const playerValueArray = dataState.playerCards.map(item => item.value)
    const playerValueSum = playerValueArray.reduce((prev,next) => prev + next)
    const dealerValueArray = dataState.dealerCards.map(item => item.value)
    let dealerValueSum = dealerValueArray.reduce((prev,next) => prev + next)
    const newCardsArray = []
    if(playerValueSum > dealerValueSum){
      while(playerValueSum >= dealerValueSum){
        let newCard = getRandomCard()
        if(newCard.value == 11){
          newCard.value = 1
        }
        newCardsArray.push(newCard)
        dealerValueSum = dealerValueSum + newCard.value
        if(dealerValueSum > 21){
     
          setDataState(prev => (
            {
              ...prev,
              result:"You Won"
            }
          ))
          setPlayerMoney(prev => prev + playerBet.amount)
        }else if(dealerValueSum > playerValueSum){
          setDataState(prev => (
            {
              ...prev,
              result:"You Lost"
            }
          ))
          setPlayerMoney(prev => prev - playerBet.amount)
        }else if(dealerValueSum == playerValueSum && dealerValueSum >=17){
          setDataState(prev => (
            {
              ...prev,
              result:"Draw"
            }
          ))
          setPlayerMoney(prev => prev + playerBet.amount)

          break
        }

      }
      setDataState(prev => (
        {
          ...prev,
          dealerCards : [...dataState.dealerCards,...newCardsArray]
        }
      ))
    }else{
      console.log("you lost")
      return 0
    }


    
  }

  function restartGame(){
    setPlayAgain(prev => !prev)
    setPlayerBet(
      {
        active:true,
        amount:""
      }
    )
  }
 



  
  

 


  if(dataState && playerMoney > 10){
    return (
        <div className="App">
          <div className="blackjack-div" style={playerBet.active ? {justifyContent:"center"} : {}}>
            {!playerBet.active && <Dealer dealerCards={dataState.dealerCards}  blankCard={GiCardRandom}  />}
            {!playerBet.active ? <EndText result={dataState.result} dealerCards={dataState.dealerCards} /> : <EndText result="Make Bet" dealerCards={dataState.dealerCards} />}
            {!playerBet.active && <Player playerCards={dataState.playerCards}   />}
          </div>
          <div className="buttons-div">
            <div style={dataState.alive && !playerBet.active ? {} : {pointerEvents: "none"}} className="stand-button" onClick={playerStand}>Stand</div>
            <div style={dataState.alive && !playerBet.active ? {} : {pointerEvents: "none"}} className="hit-button" onClick={playerHit}>Hit</div>
            {
              dataState.result && <div className="hit-button replay-button" onClick={restartGame}><FaRedoAlt /></div>
            }
          </div>
          <div className="ballance-div">Ballance: <span>{playerMoney}$</span></div>
          <div className="bet-div">
            <img src={chip10} style={playerBet.active ? {} : {pointerEvents:"none"} } onClick={()=>betPlayer(10)}></img>
            <img src={chip25} style={playerBet.active ? {} : {pointerEvents:"none"} } onClick={()=>betPlayer(25)}></img>
            <img src={chip50} style={playerBet.active ? {} : {pointerEvents:"none"} } onClick={()=>betPlayer(50)}></img>
            <img src={chip100} style={playerBet.active ? {} : {pointerEvents: "none"}} onClick={()=>betPlayer(100)}></img>
          </div>
        </div>
    )
  }else if(playerMoney<10){
    return(
        <div className="App">
        <div className="blackjack-div" style={{justifyContent:"center",alignItems:"center"}}>
          <div className="reset-money-div" onClick={() => {setPlayerMoney(500); restartGame()}}>RESET MONEY</div>
        </div>
      </div>
    )
  }

}

export default App;
