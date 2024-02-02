import React, { AnchorHTMLAttributes } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link: React.FC<LinkProps> = (props) => {
    return <a {...props}>{props.children}</a>;
};

export default Link;
