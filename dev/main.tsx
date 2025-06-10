import "./devStyles.css";

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { Card } from "../src/Card.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Card
      as={"li"}
      className="card-container"
      imageClassName="card-image"
      contentClassName="card-content"
      imageProps={{
        src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/TomateSanMarzano.jpg",
        alt: "A proud tomato plant in a garden",
      }}
    >
      <Card.Title as={`h3`} href={"#"} className="card-title">
        The Tomato Whisperer
      </Card.Title>
      <p>
        Accidentally watered your shoes instead of the plants? Planted carrots
        upside down? Welcome to the club! Here, we believe every weed is just a
        misunderstood flower.
      </p>
      <Card.Controls asChild>
        <button
          className="btn btn-primary"
          onClick={() =>
            alert(
              "You planted a mystery seed. Is it a pumpkin or a triffid? Only time will tell."
            )
          }
        >
          Plant Mystery Seed
        </button>
      </Card.Controls>
      <Card.CallToAction
        className="btn btn-secondary"
        style={
          {
            "--inclusive-card-cta-focus-shadow":
              "0 0 0 2px hsl(0, 0%, 0%, 0.5)",
          } as React.CSSProperties
        }
      >
        read more
      </Card.CallToAction>
    </Card>
  </StrictMode>
);
