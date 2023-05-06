import "./App.css";
import Confetti from "react-confetti";
import FaceDetection from "./components/FaceDetection";
import { useState } from "react";

function App() {
  // ComponentState
  const [haveFun, setHaveFun] = useState(false);
  const [party, setParty] = useState(false);

  return (
    <div className="App">
      {!haveFun && (
        <div className="notFun">
          <img src="logo.png" alt="logo" />
          <div className="buttons">
            <button onClick={() => setHaveFun(!haveFun)} className="haveFun">
              {!haveFun ? "Comenzar la diversión" : "Vuelve a tu vida aburrida"}
            </button>
            <button onClick={() => setParty(!party)} className="fun-btn">
              {!party ? "Party" : "No party"}
            </button>
          </div>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={party ? true : false}
            numberOfPieces={party ? 500 : 0}
          />
        </div>
      )}
      {haveFun && <FaceDetection haveFun={haveFun} setHaveFun={setHaveFun} />}
    </div>
  );
}

export default App;
