import Die from "./Die"
import { useState } from "react"
import { nanoid } from 'nanoid'

export default function App() {
    const [dice, setDice] = useState(generateAllNewDice())

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => 
            ({
                value : Math.ceil(Math.random() * 6),
                isHold: false,
                id: nanoid()
            })
            )
    }

    function rollDice() {
        setDice(generateAllNewDice())
    }

    function hold(id) {
        console.log(id)
    }

    const newDice = dice.map(diceObj => 
        <Die 
        key={diceObj.id} 
        value={diceObj.value} 
        isHold={() => hold(diceObj.id)} 
        />
    )


    return (
        <main>
            <div className="dice-container">
                {newDice}
            </div>
                <div>
                <button className="roll-dice" onClick={rollDice}>Roll</button>
                </div>

        </main>
    )
}