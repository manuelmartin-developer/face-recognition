import React, { useEffect, useRef } from "react";
import { getExpressionImage } from "../lib/expressions";
import * as faceapi from "face-api.js";

const FaceDetection: React.FC<{
  haveFun: boolean;
  setHaveFun: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ haveFun, setHaveFun }) => {
  // Constants
  let faceDetectionInterval: NodeJS.Timeout;
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Component states
  const [currentExpression, setCurrentExpression] = React.useState("neutral");

  // Methods
  const startVideo = () => {
    if (!videoRef.current) return;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const faceDetection = async () => {
    faceDetectionInterval = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(
          videoRef.current!,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions();
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const dims = faceapi.matchDimensions(canvas, videoRef.current!, true);
        const resizedDetections = faceapi.resizeResults(detections, dims);
        canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }
      // Set the current expression
      if (detections[0]) {
        const expression = detections[0].expressions.asSortedArray()[0];
        setCurrentExpression(expression.expression);
      }
    }, 1000);
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")
    ])
      .then(() => {
        faceDetection();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!haveFun) {
      setCurrentExpression("neutral");
      clearInterval(faceDetectionInterval);
      //   Stop the video stream and return
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream;
        if (!stream) return;
        const tracks = stream.getTracks();
        if (!tracks) return;
        tracks.forEach(function (track) {
          track.stop();
        });
        videoRef.current.srcObject = null;
      }
      return;
    }
    if (haveFun) {
      startVideo();
      loadModels();
    }
  }, [haveFun]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App_container">
      <div className="app__video">
        <canvas ref={canvasRef} className="app__canvas"></canvas>
        <video crossOrigin="anonymous" ref={videoRef} autoPlay muted></video>
      </div>
      <div className="app__expression">
        <div className="first_gif">
          {
            <img
              src={getExpressionImage(currentExpression)}
              alt="expression"
              width={"100%"}
              height={"100%"}
              style={{ display: "block", height: "100%", objectFit: "cover" }}
            />
          }
        </div>
        <div className="second_gif">
          {
            <img
              src={getExpressionImage(currentExpression)}
              alt="expression"
              width={"100%"}
              height={"100%"}
              style={{ objectFit: "cover" }}
            />
          }
        </div>
        <div className="third_gif">
          {
            <img
              src={getExpressionImage(currentExpression)}
              alt="expression"
              width={"100%"}
              height={"100%"}
              style={{ objectFit: "cover" }}
            />
          }
        </div>
        <div className="fourth_gif">
          {
            <img
              src={getExpressionImage(currentExpression)}
              alt="expression"
              width={"100%"}
              height={"100%"}
              style={{ objectFit: "cover" }}
            />
          }
        </div>
      </div>
      <button
        onClick={() => setHaveFun(!haveFun)}
        className=" haveFun floating"
      >
        {!haveFun ? "Comenzar la diversión" : "😁 😐 🙁 😲 🥺 😡 🤢"}
      </button>
    </div>
  );
};

export default FaceDetection;
