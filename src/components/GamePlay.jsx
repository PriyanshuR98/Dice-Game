
import { styled } from 'styled-components';
import NumberSelector from './NumberSelector';
import TotalScore from './TotalScore'
import RollDice from './RollDice';
import { useState } from 'react';
import { Button, OutlineButton } from '../styled/Button';
import Rules from './Rules';


const GamePlay = () => {

  const [SelectedNumber,setSelectedNumber]= useState(1);
  const[currentDice,setCurrentDice]=useState(1);
  const[score,setScore]= useState(0);
  const[error,setError]=useState("")
  const[showRules,setShowRules]=useState(false);

  
  const generateRandomNumber= (min,max)=>{

    return Math.floor(Math.random()*(max-min)+min);
  };


  const roleDice=()=>{

    if(!SelectedNumber)
    {
      setError("You have not selected any number");
      return;
    }

    

    const randomNumber=generateRandomNumber(1,7);
    setCurrentDice((prev)=>randomNumber);

    if(SelectedNumber===randomNumber)
    {
      setScore(prev=> prev+randomNumber);
    }
    else
    {
      setScore(prev=> prev-2);
    }


    setSelectedNumber(undefined); 

  }

  const resetScore =()=>{
    setScore(0);
  }


  

  return (
    <MainContainer>
            <div className="top_section">
            <TotalScore score={score}  />
            <NumberSelector SelectedNumber={SelectedNumber}
             setSelectedNumber={setSelectedNumber} 
             error={error}
             setError={setError}
            />
            </div>
    <RollDice currentDice={currentDice} roleDice={roleDice} />
    <div className='btns'>
      <OutlineButton onClick={resetScore}>Reset</OutlineButton>
      <Button
      onClick={()=>setShowRules(prev=>!prev)}
      
      >{showRules ? "Hide ":"Show "} Rules</Button>
    </div>

    {showRules&& <Rules/>}
    </MainContainer>

  )
}

export default GamePlay;


const MainContainer = styled.main`
padding-top: 70px;
.top_section{

    display:flex;
    justify-content: space-around;
    align-items: center;

}
.btns{
  margin-top:40px;
  gap:10px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:10px;
}

`;