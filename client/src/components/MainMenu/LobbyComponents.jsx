import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "btn-square",
  round: "btn-round",
};

const variants = {
  fill: {
    yellow_800: "btn-yellow",
    red_900: "btn-red",
    gray_800_04: "btn-gray",
  },
};

const sizes = {
  xl: ".btn-xl",
  sm: "btn-sm",
  md: "btn-md",
  xs: "btn-xs",
  lg: "btn-lg",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "round",
  variant = "fill",
  size = "lg",
  color = "gray_800_04",
  ...restProps
}) => {
  return (
    <button
      className={`btn ${shapes[shape]} ${sizes[size]} ${variants[variant][color]} ${className}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["xl", "sm", "md", "xs", "lg"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["yellow_800", "red_900", "gray_800_04"]),
};

export { Button };
