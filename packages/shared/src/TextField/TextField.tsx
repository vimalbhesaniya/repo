"use client";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
  Stack,
} from "@mui/material";
import { Control, FieldValues, useController } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
export type TextFieldProps = {
  control: Control<FieldValues> | undefined | any;
  name: string;
  isPassword: boolean;
  isNumber: boolean;
  type: string;
  helperText: string | undefined;
  isLowerCase: boolean;
  isUpperCase: boolean;
  multiline: boolean;
  maxRows: number | string;
  minRow: number | string;
};

export const TextField = ({
  helperText,
  control,
  isPassword = false,
  isNumber = false,
  name = "",
  type = "text",
  isLowerCase = false,
  isUpperCase = false,
  multiline = false,
  maxRows,
  minRow,
}: Partial<TextFieldProps>) => {
  const [inputType, setInputType] = useState(type || "password");
  const [error, setError] = useState("");
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  const { onChange } = field;
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    let refinedValue = value.trim();
    if (isLowerCase && !isUpperCase) {
      refinedValue = value.toLocaleLowerCase();
    }

    if (isUpperCase && !isLowerCase) {
      refinedValue = value.toLocaleUpperCase();
    }

    if (isNumber) {
      if (!Number.isNaN(Number(value.trim()))) {
        setError("");
        onChange(refinedValue.trim());
      } else {
        setError("Only numaric value allowed");
      }
    } else {
      onChange(refinedValue);
    }
  };

  const handlePasswordClick = () => {
    if (inputType == "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  if (isPassword && type !== "password") {
    throw Error("Type must be password");
  }

  return (
    <Stack>
      <MuiTextField
        {...field}
        helperText={error || helperText}
        error={Boolean(error || helperText)}
        multiline={multiline}
        maxRows={maxRows}
        minRows={minRow}
        slotProps={
          isPassword
            ? {
                input: {
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <IconButton onClick={handlePasswordClick}>
                          {inputType == "text" ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    </>
                  ),
                },
              }
            : {}
        }
        type={inputType}
        onChange={(event) => handleChange(event)}
      />
    </Stack>
  );
};
