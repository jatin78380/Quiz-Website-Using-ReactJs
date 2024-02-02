import { useState,useRef } from "react";
import { data } from "../../assets/data";
import "./Quiz.css";
const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const[score,setScore]=useState(0);
  const[result,setResult]=useState(false);
  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];
  const checkAnswer = (e, answer) => {
    if (lock == false) {
      if (question.answer == answer) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev+1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.answer-1].current.classList.add("correct");
      }
    }
  };
  const next=()=>{
    if(lock==true){
        if(index == data.length-1){
        setResult(true);
        return 0;
        }
    setIndex(++index);
    setQuestion(data[index]);
    setLock(false); 
    option_array.map((option)=>{
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
        return null;
    })
}
}
const tryagain=()=>{
    setIndex(0);
    setQuestion(data[index]);
    setScore(0);
    setLock(false);
    setResult(false);
}
return (
    <>
      <div className="container">
        <h1>Quiz Website </h1>
        <hr />
        {result?<></>: <> <h2>
          {index + 1}. {question.question}
        </h2>
        <ul >
          <li className="opt"
            ref={Option1}
            onClick={(e) => {
              checkAnswer(e, 1);
            }}
          >
            {question.option1}
          </li>
          <li className="opt"
            ref={Option2}
            onClick={(e) => {
              checkAnswer(e, 2);
            }}
          >
            {question.option2}
          </li>
          <li className="opt"
            ref={Option3}
            onClick={(e) => {
              checkAnswer(e, 3);
            }}
          >
            {question.option3}
          </li>
          <li className="opt"
            ref={Option4}
            onClick={(e) => {
              checkAnswer(e, 4);
            }}
          >
            {question.option4}
          </li>
        </ul> <button className="btn1" onClick={next}>Next </button>
        <div className="index">{index+1} of {data.length} questions</div></>}
        {result?<> <h2>You scored {score} out of {data.length} </h2>
        <button className="btn2" onClick={tryagain}> Try Again</button> </> : <></>}
       
      </div>
    </>
  );

}


  

export default Quiz;
