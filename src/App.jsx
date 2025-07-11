import { useState } from 'react'
import Dice from "./Dice"
import{ nanoid } from "nanoid"
import {useEffect, useRef} from "react"
import Confetti from "react-confetti"


export default function App() {

const [dice, setDice] = useState(() => generateAllRandomNumber())


  function generateAllRandomNumber() {
    console.log("function generate has been called")
    return new Array(10)
    .fill(0)
    .map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    })
  )
  }

  const gameWon = dice.every(prevDiceObj => prevDiceObj.isHeld) &&
  dice.every(prevDiceObj => prevDiceObj.value === dice[0].value)
  console.log(gameWon)

  const btnRef = useRef(null)

  useEffect(() => {
    if(gameWon) {btnRef.current.focus()}
  },[btnRef])


function handleRoll() {
  if(!gameWon){
    setDice(prevDice => prevDice.map(prevDiceObj => (
      prevDiceObj.isHeld ? 
      prevDiceObj :
      {
      ...prevDiceObj,
      value : Math.ceil(Math.random() * 6)
    } 
  )
  ))
  } else {
    setDice(generateAllRandomNumber())
  }
}

function handleDiceBtn(id) {
  console.log("nilai telah di ubah")
  setDice(prevDice => prevDice.map( prevDiceObj => 
    prevDiceObj.id  === id ? 
    {
      ...prevDiceObj,
      isHeld : !prevDiceObj.isHeld
    } : prevDiceObj
  ))
  
}

const diceText = dice.map(diceObj => 
  <Dice 
  key={diceObj.id} 
  value={diceObj.value} 
  id={diceObj.id} 
  isheld={diceObj.isHeld} 
  handledicebtn={() => handleDiceBtn(diceObj.id)}
  />
)

  return (
    <main>
      {gameWon && <Confetti />}
      <div className='main-container'>
        <h2>Tenzies</h2>
        <p>pilih 1 angka yang sama dan cari sampai 10 angka</p>
      </div>
    <div className='wrapper'>
      {diceText}
    </div>
    <div className='centered-roll'>
    <button className='roll-btn' ref={btnRef} onClick={handleRoll}>{gameWon ? "NewGame" : "Roll"}</button>
    </div>
    </main>
  )
}

