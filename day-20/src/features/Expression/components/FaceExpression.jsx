// import React, { useEffect, useRef, useState } from "react";


// import {
//   FaceLandmarker,
//   FilesetResolver,
//   DrawingUtils
// } from "@mediapipe/tasks-vision";

// export default function FaceExpression() {
//   const videoRef = useRef(null);
//    const canvasRef = useRef(null);
//   const landmarkerRef = useRef(null);
//   const animationRef = useRef(null);
//   const [expression, setExpression] = useState("Detecting...");

//   useEffect(() => {
//     let stream;

//     const init = async () => {
//       const filesetResolver = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
//       );

//       landmarkerRef.current = await FaceLandmarker.createFromOptions(
//         filesetResolver,
//         {
//           baseOptions: {
//             modelAssetPath:
//               "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
//           },
//           outputFaceBlendshapes: true,
//           outputFaceLandmarks: true,
//           runningMode: "VIDEO",
//           numFaces: 1
//         }
//       );

//       stream = await navigator.mediaDevices.getUserMedia({
//         video: { width: 640, height: 480 }
//       });

//       videoRef.current.srcObject = stream;
//       await videoRef.current.play();

//       detect();
//     };

//     const detect = () => {
//       if (!landmarkerRef.current || !videoRef.current) return;

//       const now = performance.now();
//       const results = landmarkerRef.current.detectForVideo(
//         videoRef.current,
//         now
//       );

//       drawLandmarks(results);
//       detectExpression(results);

//       animationRef.current = requestAnimationFrame(detect);
//     };

//     const drawLandmarks = (results) => {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       const video = videoRef.current;

//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       if (results.faceLandmarks.length > 0) {
//         const drawingUtils = new DrawingUtils(ctx);
//         for (const landmarks of results.faceLandmarks) {
//           drawingUtils.drawConnectors(
//             landmarks,
//             FaceLandmarker.FACE_LANDMARKS_TESSELATION,
//             { color: "#C0C0C0", lineWidth: 1 }
//           );
//         }
//       }
//     };

//     const detectExpression = (results) => {
//       if (!results.faceBlendshapes.length) return;

//       const blendshapes = results.faceBlendshapes[0].categories;

//       const getScore = (name) =>
//         blendshapes.find((b) => b.categoryName === name)?.score || 0;

//       const smile =
//         (getScore("mouthSmileLeft") +
//           getScore("mouthSmileRight")) /
//         2;

//       const mouthOpen = getScore("jawOpen");
//       const browUp = getScore("browInnerUp");
//       const browDown = getScore("browDownLeft");

//       console.log(getScore("jawOpen"),getScore("browInnerUp"))

//     //   let setExpression = "Neutral";

//       if (smile > 0.6) setExpression("Happy 😄");
//     //   else if (frown > 0.01 && browUp > 0.01) 
//     //      setExpression("Sad 😢");
//       else if (mouthOpen > 0.6 && browUp > 0.5)
//         setExpression("Surprised 😲");
//       else if (browDown > 0.3)
//         setExpression("Angry 😠");
//       else setExpression("Neutral 😐");
      
//     };

//     init();

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }

//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }

//       if (landmarkerRef.current) {
//         landmarkerRef.current.close();
//       }
//     };
//   }, []);

//   return (
//     <div style={{ position: "relative", width: "640px" }}>
//       <video
//         ref={videoRef}
//         style={{ position: "absolute", width: "100%" }}
//       />
//       <canvas
//         ref={canvasRef}
//         style={{ position: "absolute", width: "100%" }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           bottom: 10,
//           left: 10,
//           padding: "8px 12px",
//           background: "rgba(0,0,0,0.6)",
//           color: "white",
//           borderRadius: "8px"
//         }}
//       >
//         {expression}
//       </div>
      
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";
import {detect,init } from "../utils/utils";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  

  useEffect(() => {
    

    init({landmarkerRef, videoRef, streamRef });

    return () => {
      // if (animationRef.current) {
      //   cancelAnimationFrame(animationRef.current)
      // }
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center"}}>
      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "12px" }}
        playsInline
        muted
        />
        <h2>{expression}</h2>
        <button onClick={()=>{detect({landmarkerRef, videoRef, setExpression})}}> Detect expression </button>
    </div>
  );


}