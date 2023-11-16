import React from "react"
import Die from './components/Die.jsx'
import Header from "./components/Header.jsx"
import Button from "./components/Button.jsx"
import {nanoid} from 'nanoid'
import Confetti from "react-confetti"


export default function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    // Create New Dice
    function allNewDice(){
        const newDice = [];
        for (let i = 0; i < 10;i++)
        {
            newDice.push(generateNewDie())
        }
        return newDice;
    }

    function randomNumber(){
        return (Math.floor(Math.random()*6)+1);
    }

    function holdDice(id){
       const newdice =  dice.map((obj) =>{
            if (obj.id === id) return {...obj, isHeld: !obj.isHeld};
            return obj;
        })

        setDice(newdice)  
    }
    // checking if all value are the same and held
    React.useEffect(()=>{
        const firstValue =dice[0].value;
        setTenzies(()=> dice.every((die)=> die.isHeld&&die.value===firstValue))
    },dice)

    function generateNewDie(){
        return {value: randomNumber(), isHeld: false, id:nanoid()}
    }

    function roll(){
        // change only the unheld numbers
        const newDice = dice.map((obj) => obj.isHeld === true ? obj : generateNewDie())
        setDice(newDice);
        
        // tenzies = true witch means he won so make a allNewDice
        {tenzies && setDice(allNewDice())}
    }
    
    const dieElements = dice.map((die) => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)} />)
    
    return (
            <div className="body">
            {tenzies && <Confetti />}
            <Header />
            <div className="dies-container">
                {dieElements}
            </div>
            <Button handleClick={roll} tenzies={tenzies} />
            </div>
    )
}