import React, { useState } from 'react';

const MatchesGame = (props) => {

    const [matchesLeftYours, setMatchesLeftYours] = useState(0)
    const [matchesLeftAI, setMatchesLeftAI] = useState(0)
    
    const matchesTotal = 25;
    const matchesLeft = matchesTotal - matchesLeftYours - matchesLeftAI; 

    let isGameEnded = false;

    const calculateWinner = (number, matchesPlayer) => {
      if (number === 0) {
        if (matchesPlayer % 2 === 0) {
          return 'You are winner';
        } else {
          return 'AI is winner';
        }
      } else {
        return 'Take matches';
      }
    }

    const winner = calculateWinner(matchesLeft, matchesLeftYours)
  
    if (winner === 'You are winner' || winner === 'AI is winner') {
      isGameEnded = true
    }
  
    const takeMatches = (number) => {
      setMatchesLeftYours(matchesLeftYours => matchesLeftYours + number)
      takeMatchesAI(matchesLeft - number)
    }
  
    const takeMatchesAI = (number) => {
      for (let i = 1; i <= 3; i += 2) {
        if ((number - i) % 4 === 0 || (number - i) % 4 === 1) {
          setMatchesLeftAI(matchesLeftAI => matchesLeftAI + i)
        }
      }
    }

    if (!props.status && matchesLeft === 25) {
      takeMatchesAI(matchesLeft)
    }

    return (
      <div className='App'>
          <div className='Title'>
            <p>Matches Game</p>
          </div>
          <div className='Subtitle'>
            <p>I found no match emoji so used pencil instead</p>
          </div>
          <div className='Matches'>{matchesLeft} ✏️</div>
          <div className='Winner'>{winner}</div>
          {isGameEnded ? <div className='ButtonPadding'><button className='ChooseButton' onClick={() => {
                                                                                                  setMatchesLeftYours(0)
                                                                                                  setMatchesLeftAI(0)
                                                                                                  }}>Play again</button></div> :
            <div className='ButtonsPanel'>
              {(matchesLeft >= 3) ? <div className='ButtonPadding'><button className='ChooseButton' onClick={() => {takeMatches(3)}}>✏️ ✏️ ✏️</button></div> : 
                <div className='ButtonPadding'><button className='ChooseButton' disabled onClick={() => {takeMatches(3)}}>Not enough matches</button></div>}
              {(matchesLeft >= 2) ? <div className='ButtonPadding'><button className='ChooseButton' onClick={() => {takeMatches(2)}}>✏️ ✏️</button></div> : 
                <div className='ButtonPadding'><button className='ChooseButton' disabled onClick={() => {takeMatches(2)}}>Not enough matches</button></div>}
              {(matchesLeft >= 1) ? <div className='ButtonPadding'><button className='ChooseButton' onClick={() => {takeMatches(1)}}>✏️</button></div> : 
                <div className='ButtonPadding'><button className='ChooseButton' disabled onClick={() => {takeMatches(1)}}>Not enough matches</button></div>}
            </div>}
          <div>Your matches {matchesLeftYours}</div>
          <div>AI's matches {matchesLeftAI}</div>
      </div>
    );
}

export default MatchesGame;
