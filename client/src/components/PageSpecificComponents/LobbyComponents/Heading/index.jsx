import React from "react";

const Heading = ({
    children,
    className = "",

    as,
    ...restProps
}) => {
    const Component = as || "h6";

    return (
        <Component className={'${clasName'}{...restProps}>
            {children}
        </Component>
    );
};

export { Heading };