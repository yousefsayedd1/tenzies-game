import React from 'react'

export default function Die(props){

    const styling = props.isHeld ? 'die green' : 'die white'
    
    return(
        <h2 onClick={props.holdDice} className={styling}> {props.value} </h2>
    );
}