// MemoryGame.js
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Alert, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MemoryGame.css";

const cardsData = [
  { id: 1, value: "A" },
  { id: 2, value: "B" },
  { id: 3, value: "C" },
  { id: 4, value: "D" },
  { id: 5, value: "A" },
  { id: 6, value: "B" },
  { id: 7, value: "C" },
  { id: 8, value: "D" },
];

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1.value === card2.value) {
        setMatchedCards([...matchedCards, card1.id, card2.id]);
        setFlippedCards([]);
        setScore(score + 1);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setErrors(errors + 1);
        }, 1000);
      }
    }
  }, [flippedCards, matchedCards, score, errors]);

  useEffect(() => {
    const shuffledCards = shuffleArray(cardsData);
    setCards(shuffledCards);
  }, []);

  const flipCard = (card) => {
    if (flippedCards.length === 2 || matchedCards.includes(card.id)) {
      return;
    }
    if (flippedCards.length === 1 && flippedCards[0].id === card.id) {
      return;
    }
    setFlippedCards([...flippedCards, card]);
  };

  const resetGame = () => {
    const shuffledCards = shuffleArray(cardsData);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setErrors(0);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div className="container text-center">
      <h1 className="mb-4">Memory Game</h1>
      <Row className="mb-3">
        {cards.map((card) => (
          <Col key={card.id} sm={3} className="mb-3">
            <Card
              className={`memory-card ${
                flippedCards.includes(card) || matchedCards.includes(card.id)
                  ? "flipped"
                  : ""
              }`}
              onClick={() => flipCard(card)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <Card.Body>
                    <Card.Title>
                      {flippedCards.includes(card) ||
                      matchedCards.includes(card.id)
                        ? card.value
                        : "?"}
                    </Card.Title>
                  </Card.Body>
                </div>
                <div className="card-back"></div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Alert variant="success" className="mb-3">
        Score: {score}
      </Alert>
      <Alert variant="danger" className="mb-3">
        Errors: {errors}
      </Alert>
      <Button onClick={resetGame} variant="primary">
        Reset
      </Button>
    </div>
  );
}

export default MemoryGame;

// // MemoryGame.js
// import React, { useState, useEffect, useRef } from "react";
// import { Card, Row, Col, Alert, Button, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./MemoryGame.css"; // Custom CSS for additional styling
// import { CSSTransition } from "react-transition-group";

// const cardsData = [
//   { id: 1, value: "A", image: "../public/logo512.png" },
//   { id: 2, value: "B", image: "../public/logo192.png" },
//   { id: 3, value: "C", image: "card3.jpg" },
//   { id: 4, value: "D", image: "card4.jpg" },
//   { id: 5, value: "A", image: "card1.jpg" },
//   { id: 6, value: "B", image: "card2.jpg" },
//   { id: 7, value: "C", image: "card3.jpg" },
//   { id: 8, value: "D", image: "card4.jpg" },
// ];

// function MemoryGame() {
//   const [playerName, setPlayerName] = useState("");
//   const [cards, setCards] = useState([]);
//   const [flippedCards, setFlippedCards] = useState([]);
//   const [matchedCards, setMatchedCards] = useState([]);
//   const [score, setScore] = useState(0);
//   const [errors, setErrors] = useState(0);
//   const cardFrontRef = useRef(null);

//   useEffect(() => {
//     const shuffledCards = shuffleArray(cardsData);
//     setCards(shuffledCards);
//   }, []);

//   useEffect(() => {
//     if (flippedCards.length === 2) {
//       const [card1, card2] = flippedCards;
//       if (card1.value === card2.value) {
//         setMatchedCards([...matchedCards, card1.id, card2.id]);
//         setFlippedCards([]);
//         setScore(score + 1);
//       } else {
//         setTimeout(() => {
//           setFlippedCards([]);
//           setErrors(errors + 1);
//         }, 1000);
//       }
//     }
//     // if (matchedCards.length === cards.length) {
//     //   alert("Congratulations! You won the game!");
//     // }
//   }, [flippedCards, matchedCards, score, errors]);

//   // const flipCard = (card) => {
//   //   if (flippedCards.length === 2 || matchedCards.includes(card.id)) {
//   //     return;
//   //   }
//   //   if (flippedCards.length === 1 && flippedCards[0].id === card.id) {
//   //     return;
//   //   }
//   //   setFlippedCards([...flippedCards, card]);
//   // };
//   const flipCard = (card) => {
//     if (flippedCards.length === 2 || matchedCards.includes(card.id)) {
//       return;
//     }
//     if (flippedCards.length === 1 && flippedCards[0].id === card.id) {
//       return;
//     }

//     const updatedFlippedCards = [...flippedCards, card];

//     setFlippedCards(updatedFlippedCards);

//     if (updatedFlippedCards.length === 2) {
//       const [card1, card2] = updatedFlippedCards;
//       if (card1.value === card2.value) {
//         setMatchedCards([...matchedCards, card1.id, card2.id]);
//         setScore(score + 1);
//       } else {
//         setTimeout(() => {
//           setErrors(errors + 1);
//         }, 1000);
//       }
//     }
//   };

//   const resetGame = () => {
//     const shuffledCards = shuffleArray(cardsData);
//     setCards(shuffledCards);
//     setFlippedCards([]);
//     setMatchedCards([]);
//     setScore(0);
//     setErrors(0);
//   };

//   const shuffleArray = (array) => {
//     const shuffledArray = [...array];
//     for (let i = shuffledArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffledArray[i], shuffledArray[j]] = [
//         shuffledArray[j],
//         shuffledArray[i],
//       ];
//     }
//     return shuffledArray;
//   };

//   return (
//     <div className="container text-center">
//       <h1 className="mb-4">Memory Game</h1>
//       <Form.Group controlId="playerName">
//         <Form.Label>Player Name:</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter your name"
//           value={playerName}
//           onChange={(e) => setPlayerName(e.target.value)}
//         />
//       </Form.Group>
//       <Row xs={2} md={4} className="g-4 mb-3">
//         {/* {cards.map((card) => (
//           <Col key={card.id}>
//             <Card
//               className={`memory-card ${
//                 flippedCards.includes(card) || matchedCards.includes(card.id)
//                   ? "flipped"
//                   : ""
//               }`}
//               onClick={() => flipCard(card)}
//             >
//               <div className="card-inner">
//                 <div className="card-front">
//                   <Card.Img
//                     variant="top"
//                     src={`images/${card.image}`}
//                     alt={card.value}
//                   />
//                 </div>
//                 <div className="card-back">
//                   <Card.Body>
//                     <Card.Title className="m-0">?</Card.Title>
//                   </Card.Body>
//                 </div>
//               </div>
//             </Card>
//           </Col>
//         ))} */}
//         {cards.map((card) => (
//           <Col key={card.id}>
//             <Card
//               className={`memory-card ${
//                 flippedCards.includes(card) || matchedCards.includes(card.id)
//                   ? "flipped"
//                   : ""
//               }`}
//               onClick={() => flipCard(card)}
//             >
//               <div className="card-inner">
//                 <CSSTransition
//                   in={
//                     flippedCards.includes(card) ||
//                     matchedCards.includes(card.id)
//                   }
//                   timeout={300}
//                   classNames="fade"
//                   unmountOnExit
//                   nodeRef={cardFrontRef}
//                 >
//                   <div className="card-front" ref={cardFrontRef}>
//                     <Card.Img
//                       variant="top"
//                       src={`images/${card.image}`}
//                       alt={card.value}
//                     />
//                   </div>
//                 </CSSTransition>
//                 <div className="card-back">
//                   {/* <div className="card-body">
//                     <img src="./assets/meow-amazon.jpg" alt="Card Back" />
//                   </div> */}
//                   <Card.Body>
//                     <Card.Title className="m-0">?</Card.Title>
//                   </Card.Body>
//                 </div>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//       <Alert variant="success" className="mb-3">
//         Player: {playerName}
//       </Alert>
//       <Alert variant="info" className="mb-3">
//         Score: {score}
//       </Alert>
//       <Alert variant="danger" className="mb-3">
//         Errors: {errors}
//       </Alert>
//       <Button onClick={resetGame} variant="primary">
//         Reset
//       </Button>
//     </div>
//   );
// }

// export default MemoryGame;
