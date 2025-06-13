# Inclusive Card

A simple, accessible, and flexible card component for React, inspired by the excellent book ["Inclusive Components"](https://inclusive-components.design/cards) by Heydon Pickering.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Install via npm](#1-install-via-npm)
  - [Copy the code](#2-copy-the-code)
- [Usage](#usage)
- [API](#api)
  - [\<Card>](#card)
  - [\<Card.Title>](#cardtitle)
  - [\<Card.Controls>](#cardcontrols)
  - [\<Card.CallToAction>](#cardcalltoaction)
- [Styling](#styling)
- [Credits](#credits)

---

## Features

- **Polymorphic**: Render as any HTML element using the `as` prop (e.g. `article`, `li`, `a`, etc.).
- **Accessible**: Follows best practices for headings, links, and focus management.
- **Customizable**: Easily adjust styles with CSS custom properties or class names to fit your design needs.
- **Composable**: Includes subcomponents for title, controls, image, and call-to-action.
- **CLI**: Copy the component into your project with a single command.

---

## Installation

You have two options to use this component:

### 1. Install via npm:

```bash
npm install react-inclusive-card
```

Import the component in your React project:

```tsx
import { Card } from "react-inclusive-card";
```

### 2. Copy the code:

You can copy the component to your project using CLI script

```bash
npx react-inclusive-card
```

You will be prompted for a destination path.
\
 Or pass the `--path` option to specify a custom path:

```bash
npx react-inclusive-card --path src/components
```

This will copy the `InclusiveCard.tsx` component and its styles to the specified directory.

---

## Usage

```tsx
import { Card } from "inclusive-card";

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
        "--inclusive-card-cta-focus-shadow": "0 0 0 2px hsl(0 0% 0% / 0.5)",
      } as React.CSSProperties
    }
  >
    read more
  </Card.CallToAction>
</Card>;
```

<div align="start">
   <img src="https://github.com/hanapp-cz/react-inclusive-card/blob/main/public/images/example.png" alt="Screenshot of Inclusive Card component" width="275px" />
</div>

---

## API

### `<Card>`

| Prop               | Type                                                                                      | Default     | Description                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| `as`               | `React.ElementType`                                                                       | `"article"` | The element type to render as (e.g. `"li"`, `"a"`, `"section"`).                  |
| `className`        | `string`                                                                                  | `""`        | Additional class names to apply to the card container.                            |
| `imageClassName`   | `string`                                                                                  | `""`        | Additional class names to apply to the image wrapper.                             |
| `contentClassName` | `string`                                                                                  | `""`        | Additional class names to apply to the content wrapper.                           |
| `imageProps`       | `{ src: string; alt: string; }`<br/>or<br/>{ customImageComponent: `React.ReactElement` } | —           | Image source and alt text, or a custom image component to render inside the card. |

---

### `<Card.Title>`

| Prop                  | Type                                                | Default | Description                                                       |
| --------------------- | --------------------------------------------------- | ------- | ----------------------------------------------------------------- |
| `as`                  | `"h1"`\| `"h2"`\| `"h3"`\| `"h4"`\| `"h5"`\| `"h6"` | `"h2"`  | The element type to render as (e.g. `"h1"`, `"h3"`, etc.).        |
| `href`                | `string`                                            | —       | If provided, renders an `<a>` element with this URL.              |
| `customLinkComponent` | `React.ReactElement`                                | —       | A custom link component to use instead of the default `<a>`.      |
| `linkProps`           | `React.AnchorHTMLAttributes<HTMLAnchorElement>`     | —       | Additional props to pass to the link element if `href` is used.   |
| `aria-describedby`    | `string`                                            | —       | ID of an element providing additional context for screen readers. |
| `className`           | `string`                                            | `""`    | Additional class names to apply to the title element.             |
| `children`            | `React.ReactNode`                                   | —       | The content of the title, typically text or a link.               |

- Use for the main heading of the card.
- Renders as a heading element (`h1`-`h6`) with an anchor link that makes the whole card clickable if `href` or `customLinkComponent` is provided.

---

### `<Card.Controls>`

| Prop        | Type                | Default | Description                                                           |
| ----------- | ------------------- | ------- | --------------------------------------------------------------------- |
| `as`        | `React.ElementType` | `"div"` | The element type to render as (e.g. `"button"`, `"div"`).             |
| `asChild`   | `boolean`           | `false` | If `true`, applies styles to the child element directly (no wrapper). |
| `className` | `string`            | `""`    | Additional class names to apply to the controls wrapper.              |
| `children`  | `React.ReactNode`   | —       | The content of the controls, typically buttons or links.              |

- Use for interactive elements like buttons or links.

---

### `<Card.CallToAction>`

| Prop        | Type                | Default | Description                                                    |
| ----------- | ------------------- | ------- | -------------------------------------------------------------- |
| `as`        | `React.ElementType` | `"div"` | The element type to render as (e.g. `"button"`, `"div"`).      |
| `className` | `string`            | `""`    | Additional class names to apply to the call-to-action wrapper. |
| `children`  | `React.ReactNode`   | —       | The content of the call-to-action, typically text or a link.   |

- Use for decorative call-to-action elements (e.g., "read more" links).
- Hidden from screen readers by default (`aria-hidden="true"`).
- Gets focus styles when the card title is focused.

---

## Styling

1. Use the `className` prop to add your own styles.
1. Customize with CSS custom properties in your own stylesheet:

- `--inclusive-card-default-shadow`
- `--inclusive-card-hover-shadow`
- `--inclusive-card-focus-shadow`
- `--inclusive-card-cta-focus-decoration`
- `--inclusive-card-cta-focus-shadow`

1. Or override classes like `.inclusive-card`, `.inclusive-card__title`, `.inclusive-card__controls`, etc.

---

## Credits

Inspired by ["Inclusive Components"](https://inclusive-components.design/cards) by Heydon Pickering.
