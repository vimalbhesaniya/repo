"use client";
import React from "react";
import { Button as MuiButton, ButtonProps, SxProps } from "@mui/material";
import { Theme } from "@emotion/react";
type MUIButtonProps = {
  children: any;
  size: "small" | "medium" | "large";
  varient: "text" | "outlined" | "contained";
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  endIcon: React.ReactNode;
  startIcon: React.ReactNode;
  type: "button" | "reset" | "submit";
  onclick: React.MouseEventHandler<HTMLAnchorElement>;
  sx: SxProps<Theme> | undefined;
  className: string;
};
export const Button = ({
  children,
  varient = "contained",
  type = "button",
  color = "primary",
  endIcon,
  onclick,
  className = "",
  startIcon,
  size = 'medium',
  sx,
}: Partial<MUIButtonProps>) => {
  return (
    <MuiButton
      type={type}
      endIcon={endIcon}
      startIcon={startIcon}
      className={className}
      size={size}
      color={color}
      sx={sx}
      onClick={() => onclick}
      variant={varient}
    >
      {children ? children : null}
    </MuiButton>
  );
};
