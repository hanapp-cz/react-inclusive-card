import "./InclusiveCard.css";

import * as React from "react";

type TRequiredChildren = Required<React.PropsWithChildren<object>>;

type TCardProps<T extends React.ElementType = "article"> = {
  as?: T;
  className?: string;
  contentClassName?: string;
  imageClassName?: string;
  imageProps: TImageProps;
} & TRequiredChildren &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

type TLinkProps =
  | {
      customLinkComponent: React.ElementType;
      href?: never;
    }
  | {
      customLinkComponent?: never;
      href: string;
    };

type TCardTitleProps = TRequiredChildren &
  TLinkProps & {
    as?: React.ElementType;
    className?: string;
  };

type TImageProps =
  | {
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
      customImageComponent: React.ReactElement;
    };

type TCardImageProps = TImageProps & {
  className?: string;
};

type TCardControlsProps = {
  children: React.ReactNode & {
    props?: {
      className?: string;
    };
  };
  as?: React.ElementType;
  className?: string;
  asChild?: boolean;
};

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
        <CardImage {...imageProps} />
      </div>
    </Component>
  );
};

const CardTitle: React.FC<TCardTitleProps> = ({
  as = "h2",
  children,
  className = "",
  customLinkComponent,
  href,
}) => {
  const Component = as;

  const LinkComponent = customLinkComponent ? customLinkComponent : "a";
  const hrefProp = href ? { href } : {};

  return (
    <Component className={`inclusive-card__title ${className}`}>
      <LinkComponent {...hrefProp}>
        {children}
        <span className="inclusive-card__link-area" />
      </LinkComponent>
    </Component>
  );
};

const CardImage: React.FC<TCardImageProps> = ({
  customImageComponent,
  src,
  alt,
}) => {
  return (
    <>
      {customImageComponent}

      {!customImageComponent && (
        <img src={src} alt={alt} className="inclusive-card__image" />
      )}
    </>
  );
};

const CardControls: React.FC<TCardControlsProps> = ({
  as = "div",
  children,
  className = "",
  asChild = false,
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
    <Component className={`inclusive-card__controls ${className}`}>
      {children}
    </Component>
  );
};

type TCallToActionProps = {
  children: React.ReactNode;
  className?: string;
};

const CardCallToAction: React.FC<TCallToActionProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`inclusive-card__cta ${className}`} aria-hidden="true">
      {children}
    </span>
  );
};

export { Card };

Card.Title = CardTitle;
Card.Controls = CardControls;
Card.CallToAction = CardCallToAction;
