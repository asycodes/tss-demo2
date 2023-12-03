"use client"
const LoadingPage = () => {
    return (
      <div className="loading-container">
        <div className="ball blue"></div>
        <div className="ball red"></div>
        <div className="ball yellow"></div>
        <div className="ball green"></div>
  
        <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
  
          .ball {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin: 0 10px;
            animation: jumpAndFall 1.5s infinite;
          }
  
          .blue {
            background-color: blue;
            animation-delay: 0.1s;
          }
  
          .red {
            background-color: red;
            animation-delay: 0.2s;
          }
  
          .yellow {
            background-color: yellow;
            animation-delay: 0.3s;
          }
  
          .green {
            background-color: green;
            animation-delay: 0.4s;
          }
  
          @keyframes jumpAndFall {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>
      </div>
    );
  };
  
  export default LoadingPage;