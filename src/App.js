import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { getClicks, saveClicks } from "./helpers/saveLocaldtorage";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [showConteoGif, setShowConteoGif] = useState(false);
  const [showCerebro, setShowCerebro] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [enterPressed, setEnterPressed] = useState(false);
  const videoRef = useRef(null);



  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = videoRef.current;
        videoElement.srcObject = stream;
        videoElement.play();
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    const handleKeyPress = (event) => {
      if (event.key === "Enter" && !enterPressed) {
        if (currentScreen === 1) {
          setCurrentScreen(2);
          setEnterPressed(true);
          const numero = parseInt(getClicks(), 10);
          saveClicks((numero + 1));
          
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [enterPressed, currentScreen]);

  useEffect(() => {
    if (currentScreen === 2) {
      const timer = setTimeout(() => {
        setShowConteoGif(true);
      }, 10000); //6400//

      const photoTimer = setTimeout(() => {
        takePhoto();
      }, 10000); //10000//

      return () => {
        clearTimeout(timer);
        clearTimeout(photoTimer);
      };
    }

    if (currentScreen === 4) {
      const screenTimer = setTimeout(() => {
        setCurrentScreen(5);
      }, 10000); //10000//

      return () => clearTimeout(screenTimer);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 5) {
      const resetTimer = setTimeout(() => {
        window.location.reload(); // Recargar la página para reiniciar la aplicación
      }, 11000);

      return () => clearTimeout(resetTimer);
    }
  }, [currentScreen]);

  const takePhoto = async () => {
    const videoElement = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    try {
      const dataUrl = canvas.toDataURL("image/png");
      setPhoto(dataUrl);
      setShowFlash(true);
      setTimeout(() => {
        setShowFlash(false);
      }, 200);

      setCurrentScreen(3);
      setTimeout(() => {
        setShowCerebro(true);
        setTimeout(() => {
          setShowCerebro(false);
        }, 5000); //DURA CEREBRO-SE VA CEREBRO 5000//
      }, 4800); //APARECE CEREBRO//

      setTimeout(() => {
        setCurrentScreen(4);
      }, 57000); //TIEMPO QUE DURA EL ---> VIDEO <--- EN MILISEGUNDOS//

      setTimeout(() => {
        setShowFinalScreen(true);
      }, 5000); //5000// 
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  return (
    <div className="app">
      {currentScreen === 1 && (
        <div className="screen start-screen">
          <img src={process.env.PUBLIC_URL + "/img/inicio2.gif"} alt="" />
        </div>
      )}

      {currentScreen === 2 && (
        <div className="screen photo-screen">
        <audio src="audio/audio.mp3" loop controls autoPlay style={{zIndex:0}}/>
          <div className="silueta">
            <img src={process.env.PUBLIC_URL + "/img/silueta.png"} alt="Silueta" />
          </div>
          {!showConteoGif && (
            <div className="area">
              <img src={process.env.PUBLIC_URL + "/img/area.png"} alt="Área" />
            </div>
          )}
          {showConteoGif && (
            <div className="conteo-gif">
              <img src={process.env.PUBLIC_URL + "/img/conteo.gif"} alt="Conteo" style={{ width: "570px" }} />
            </div>
          )}
          <video ref={videoRef} autoPla muted style={{ transform: 'scaleX(-1)'}}></video>      
        </div>
      )}

      {currentScreen === 3 && photo && (
        <div className="screen photo-preview">
        <audio src="audio/audio.mp3" loop controls autoPlay style={{zIndex:0}}/>
          <div className="photo-wrapper" style={{ backgroundImage: `url(${photo})` }}>
            <div className="video-overlay">
              <video className="video-overlay-content" autoPlay loop muted>
                <source src={process.env.PUBLIC_URL + "/img/animacion13.mp4"} type="video/mp4" />
              </video>
            </div>
            {showCerebro && (
              <div className="cerebro">
                <img src={process.env.PUBLIC_URL + "/img/cerebro.png"} alt="Cerebro" />
              </div>
            )}
            {showFlash && <div className="flash-animation"></div>}
          </div>
        </div>
      )}

      {currentScreen === 4 && photo && (
        <div className="screen photo-preview">
        <audio src="audio/audio.mp3" loop controls autoPlay style={{zIndex:0}}/>
          <div className="photo-wrapper" style={{ backgroundImage: `url(${photo})` }}>
          </div>
          <div className="gafas">
            <img src={process.env.PUBLIC_URL + "/img/gafas.png"} alt="Gafas"   />
          </div>
          <div className="gafas-luz">
            <img src={process.env.PUBLIC_URL + "/img/gafasluz.png"} alt="Gafasluz" />
          </div>
          <div className="vitamina">
            <img src={process.env.PUBLIC_URL + "/img/vitamina.png"} alt="vitamina" />
          </div>
          <div className="aviso-tarrito">
            <img src={process.env.PUBLIC_URL + "/img/solo.png"} alt="Gafasluz" />
          </div>
          <div className="aviso-legal">
            <img src={process.env.PUBLIC_URL + "/img/legal.png"} alt="Gafasluz" />
          </div>
          <div className="aviso-alimento">
            <img src={process.env.PUBLIC_URL + "/img/alimento.png"} alt="Gafasluz" />
          </div>
        </div>
      )}

      {currentScreen === 5 && showFinalScreen && (
        <div className="screen start-screen">
          <img src={process.env.PUBLIC_URL + "/img/Cierre3.gif"} alt="Final Screen" />
        </div>
      )}
    </div>
    
  );
};

export default App;
