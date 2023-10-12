"use client";

import React, { useState, useEffect } from "react";

const MovingBackground = () => {
  const [balls, setBalls] = useState([]);
  // const [centerBall, setCenterBall] = useState({
  //   x: window.innerWidth / 2,
  //   y: window.innerHeight / 2,
  //   size: 100,
  // });
  // const [centerBall, setCenterBall] = useState({});

  const colors = ["#EFAB9D", "#EFD19F", "#A1D6C1", "#ABB3DC"];
  const [closeToCenterPercent, setCloseToCenterPercent] = useState(10);

  useEffect(() => {
    // setCenterBall({
    //   x: window.innerWidth / 2,
    //   y: window.innerHeight / 2,
    //   size: 100,
    // });
    const createBalls = () => {
      const newBalls = [];
      for (let i = 0; i < 800; i++) {
        let radius = Math.random() * 200;
        if (radius < 140) {
          radius = 140;
        }

        const shouldCreateCloseToCenter =
          Math.random() < closeToCenterPercent / 100;

        if (shouldCreateCloseToCenter) {
          radius = Math.random() * 150;
          if (radius < 140) {
            radius = 140;
          }
        }
        newBalls.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: 0,
          vy: 0,
          angle: Math.random() * 360 + Math.random() * 360,
          // speed: Math.random() * 0.001
          speed: 0.0001,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 5,
          margintop: Math.random() * 30,
          marginbot: Math.random() * 30,
          radius: radius,
        });
      }
      setBalls(newBalls);
    };

    createBalls();
  }, []);

  const updateBalls = () => {
    setBalls((prevBalls) => {
      return prevBalls.map((ball) => {
        ball.angle += ball.speed;

        ball.x =
          window.innerWidth / 2 + Math.cos(ball.angle) * ball.radius - 20;
        ball.y =
          window.innerHeight / 2 + Math.sin(ball.angle) * ball.radius - 20;

        if (ball.x > window.innerWidth) {
          ball.x = 0;
        } else if (ball.x < 0) {
          ball.x = window.innerWidth;
        }

        if (ball.y > window.innerHeight) {
          ball.y = 0;
        } else if (ball.y < 0) {
          ball.y = window.innerHeight;
        }

        return ball;
      });
    });
  };

  useEffect(() => {
    setInterval(updateBalls, 10);
  }, [balls]);

  return (
    <div className="w-screen h-screen absolute flex overflow-y-hidden overflow-x-hidden">
      {balls.map((ball) => (
        <div
          key={ball.x + ball.y}
          className=""
          style={{
            position: "absolute",
            left: ball.x + "px",
            top: ball.y + "px",
            // right: ball.y + "px",
            // bottom: ball.y + "px",
            width: ball.size + "px",
            height: ball.size + "px",
            backgroundColor: ball.color,
            borderRadius: "50%",
            marginTop: ball.margintop + "px",
            marginLeft: ball.marginbot + "px",
          }}
        ></div>
      ))}
    </div>
  );
};

export default MovingBackground;
