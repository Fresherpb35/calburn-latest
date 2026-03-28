import React from "react";
import { Link } from "react-router-dom";

/**
 * Props
 *  variant : "primary" | "outline" | "ghost" | "white" | "dark"
 *  size    : "sm" | "md" | "lg" | "xl"
 *  to      : internal link  (uses <Link>)
 *  href    : external link  (uses <a>)
 *  onClick : button handler (uses <button>)
 */
export default function Button({
  children,
  variant = "primary",
  size    = "md",
  to,
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center font-body font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

  const variants = {
    primary : "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/30 hover:shadow-brand-600/40",
    outline : "border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white",
    ghost   : "text-brand-500 hover:bg-brand-500/10",
    white   : "bg-white text-dark-900 hover:bg-gray-100 shadow-lg",
    dark    : "bg-dark-800 text-white hover:bg-dark-700",
  };

  const sizes = {
    sm : "px-4 py-1.5 text-xs rounded",
    md : "px-5 py-2.5 text-sm rounded",
    lg : "px-7 py-3.5 text-sm rounded",
    xl : "px-9 py-4 text-base rounded",
  };

  const cls = [
    base,
    variants[variant] ?? variants.primary,
    sizes[size]       ?? sizes.md,
    disabled ? "opacity-50 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to)   return <Link    to={to}   className={cls} {...rest}>{children}</Link>;
  if (href) return <a       href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
  return          <button   type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>{children}</button>;
}
