import "./InclusiveCard.css";

import * as React from "react";

type TRequiredChildren = Required<React.PropsWithChildren<object>>;

type TImageProps =
  | {
      /**
       * The source URL of the image
       */
      src: string;
      /**
       * If your image is decorative, pass and empty string
       */
      alt: string;

      customImageComponent?: never;
    }
  | {
      src?: never;
      alt?: never;
      /**
       * A custom image component to render instead of a regular image
       */
      customImageComponent: React.ReactElement;
    };

type TOtherProps<TElement extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<TElement>,
  "as" | "children" | "className"
>;

type TCardProps<TElement extends React.ElementType = "article"> =
  TRequiredChildren &
    TOtherProps<TElement> & {
      /**
       * The element type of the card,
       * @default "article"
       */
      as?: TElement;
      className?: string;
      /**
       * extend the `className` of the card content area
       * @default "inclusive-card__content"
       */
      contentClassName?: string;
      /**
       * extend the `className` of the card image area
       * @default "inclusive-card__image"
       */
      imageClassName?: string;
      /**
       * Pass either `src` and `alt` or a custom image component.
       * - If you want to use a custom image component, pass it as `customImageComponent` prop.
       * - If you want to use a regular image, pass `src` and `alt` props.
       */
      imageProps: TImageProps;
    };

/**
 * The Card component is a flexible and accessible card layout component
 *
 * It consists of an image and content area.
 * you can specify the element type for the card using the `as` prop.
 */
const Card = <TElement extends React.ElementType>({
  as,
  className = "",
  imageClassName = "",
  contentClassName = "",
  children,
  imageProps,
  ...rest
}: TCardProps<TElement>) => {
  const Component = as ?? "article";

  return (
    <Component className={`inclusive-card ${className}`} {...rest}>
      <div className={`inclusive-card__content ${contentClassName}`}>
        {children}
      </div>
      <div className={`inclusive-card__image ${imageClassName}`}>
        {imageProps.customImageComponent}
        {!imageProps.customImageComponent && (
          <img src={imageProps.src} alt={imageProps.alt} />
        )}
      </div>
    </Component>
  );
};

// * CARD TITLE ----------------------------------------------
type TLinkProps =
  | {
      customLinkComponent: React.ElementType;
      href?: never;
      linkProps?: never;
    }
  | {
      customLinkComponent?: never;
      href: string;
      linkProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
    };

type TCardTitleProps<
  TElement extends Extract<
    React.ElementType,
    "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  >
> = TRequiredChildren &
  TOtherProps<TElement> &
  TLinkProps & {
    as?: TElement;
    className?: string;
  };

/**
 * @see {@link Card.Title} for more details
 */
const CardTitle = <
  TElement extends Extract<
    React.ElementType,
    "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  >
>({
  as,
  href,
  children,
  className = "",
  customLinkComponent,
  "aria-describedby": ariaDescribedBy,
  linkProps = {},
  ...rest
}: TCardTitleProps<TElement>) => {
  const Component = as ?? "h2";

  const LinkComponent = customLinkComponent ? customLinkComponent : "a";
  const hrefProp = href ? { href } : {};

  return (
    <Component className={`inclusive-card__title ${className}`} {...rest}>
      <LinkComponent
        aria-describedby={ariaDescribedBy}
        {...hrefProp}
        {...linkProps}
      >
        {children}
        <span className="inclusive-card__link-area" />
      </LinkComponent>
    </Component>
  );
};

// * CARD CONTROLS -----------------------------------------
type TChildrenWithProps = React.ReactNode & {
  props?: {
    className?: string;
  };
};

type TCardControlsProps = TOtherProps<"div"> & {
  children: TChildrenWithProps;
  as?: React.ElementType;
  className?: string;
  asChild?: boolean;
};

/**
 * @see {@link Card.Controls} for more details
 */
const CardControls: React.FC<TCardControlsProps> = ({
  as = "div",
  children,
  className = "",
  asChild = false,
  ...rest
}) => {
  if (asChild) {
    try {
      // Only works with a single React element child
      const childrenCount = React.Children.count(children);

      if (childrenCount !== 1) {
        throw new Error(
          "CardControls with asChild must have a single valid React element child."
        );
      }

      const child = React.Children.only(children);

      if (!React.isValidElement(child)) {
        throw new Error(
          "CardControls with asChild have invalid child element."
        );
      }

      const childClassName =
        typeof child.props === "object" && child.props?.className
          ? child.props.className
          : "";

      // Clone the child and add the className
      return React.cloneElement(child, {
        className: ["inclusive-card__controls", childClassName, className]
          .filter(Boolean)
          .join(" "),
      });
    } catch (error) {
      console.error(
        "Error in CardControls with asChild prop:",
        error instanceof Error ? error.message : error
      );
      return null;
    }
  }

  const Component = as;

  return (
    <Component className={`inclusive-card__controls ${className}`} {...rest}>
      {children}
    </Component>
  );
};

// * CALL TO ACTION -----------------------------------------

type TSpanProps = React.HTMLAttributes<HTMLSpanElement>;
type TCallToActionProps = TSpanProps & {
  children: React.ReactNode;
  className?: string;
};

/**
 * @see {@link Card.CallToAction} for more details
 */
const CardCallToAction: React.FC<TCallToActionProps> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <span
      className={`inclusive-card__cta ${className}`}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </span>
  );
};

// * EXPORTS -------------------------------------------------

export { Card };

/**
 * The `<Card.Title>` component is used to render the title of the card,
 * it contains a link and it makes the whole card clickable.
 *
 * You can pass a custom link component using the `customLinkComponent` prop,
 * or just pass a `href` prop to use the default `<a>` element.
 */
Card.Title = CardTitle;

/**
 * Wrap your interactive elements (like buttons and links) with `<Card.Controls>`
 * to raise them above the card clickable area.
 *
 * It renders a `<div>` by default,
 * - you can either change it to any other element using the `as` prop
 * - or you can use the `asChild` prop to render the child element instead of the `<div>`
 *
 * ! Only one child element is allowed for the `<Card.Controls>` component when `asChild` is set to `true`
 */
Card.Controls = CardControls;

/**
 * Wrap your "call to action" element with `<Card.CallToAction>` to hide it from screen readers.
 * With clickable card, the call-to-action element should be rather decorative, providing additional context to the card link.
 *
 * The Card.CallToAction component gets focus styles when the `<Card.Title>` link is focused.
 * You can customize a `box-shadow` & `text-decoration` using CSS custom properties:
 * - `--inclusive-card-cta-focus-decoration`
 * - `--inclusive-card-cta-focus-shadow`
 *
 * Or you can override default styles in your CSS file using selector:
 * ```css
 * .inclusive-card__title:focus-within ~ .inclusive-card__cta {
 *  Your custom styles here
 * }
 * ```
 *
 * You can add an `aria-describedby` attribute to the Card.Title to attach a call-to-action text to the card link.
 *
 * @example with default `<Card.Title>` link:
 * ```jsx
 * <Card as="article">
 *    <Card.Title href="/some-link" aria-describedby="desc-example-title">Example Title</Card.Title>
 *    <Card.CallToAction id="desc-example-title">Click here to learn more</Card.CallToAction>
 * </Card>
 * ```
 *
 * @example with custom `<Card.Title>` link:
 * ```jsx
 * const MyCustomLink = ({ children, ...props }) => (
 *   <Link aria-describedby="desc-example-title" {...props}>
 *     {children}
 *   </Link>
 * );
 *
 * <Card as="article">
 *    <Card.Title customLinkComponent={MyCustomLink}>
 *      Example Title
 *    </Card.Title>
 *    <Card.CallToAction id="desc-example-title">Click here to learn more</Card.CallToAction>
 * </Card>
 */
Card.CallToAction = CardCallToAction;
