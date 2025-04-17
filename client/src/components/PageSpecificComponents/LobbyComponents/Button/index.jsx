import React from "react";
import PropTypes from "prop-types"

const shapes = {
    square: "rounded-[0px]",
    round: "rounded-lg",
};

const variants = {
    fill: {
        yellow_800: "bg-yellow-800 text-white-a700",
        red_900: "bg-red-900 text-yellow-700", gray_800_04: "bg-gray-800_04 text-white-a700",
    },
};

const sizes = {
    xl: "h- [124px] px- [34px] text- [30px]",
    sm: "h-[54px] px- [34px] text- [18px]",
    md: "h- [64px] px- [34px] text- [16px]",
    Xs: "h-[44px]",
    lg: "h- [82px] px- [34px] text- [25px]",
};

const Button = ({
    children,
    className = "",
    leftIcon,
    rightIcon,
    shape,
    variant = "fill",
    size = "lg",
    color = "gray_800_04",
    ...restProps
}) => {
    return (
        <button
            className={'${className} flex flex-row items-center justify-center self-stretch text-center cursor-pointer whitespace-nowrap text-white-a700 border-white-a700 border-2 border-solid rounded-lg ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}'}
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
    color: PropTypes. oneOf(["yellow_800", "red_900", "gray_800_04"]),
};

export { Button };