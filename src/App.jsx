import { useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import  { useRef, useEffect } from "react"



export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    
    const btnRef = useRef(null)
    
    useEffect(() => {
        if(gameWon) {btnRef.current.focus()} 
    }, [btnRef])
    

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }
    
    function rollDice() {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice())
        }
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice} ref={btnRef}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}