import TextField from "@mui/material/TextField";
import { Autocomplete as MuiAutocomplete } from "@mui/material";
import { TextFieldProps } from "../TextField";
import { useController } from "react-hook-form";

type AutoCompleteProps = {
  options: Readonly<string[]>;
  label: string;
} & TextFieldProps;
export function Autocomplete({
  options,
  label,
  ...TextFieldProps
}: Partial<AutoCompleteProps>) {
  const { name = "", control, helperText } = TextFieldProps;
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  const { onChange } = field;
  const handleChange = (_: any, value: any) => {
    onChange(value);
  };
  return (
    <>
      <MuiAutocomplete
        {...field}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...field}
            error={Boolean(helperText)}
            helperText={helperText}
            onChange={(e) => onChange(e.target.value)}
            {...params}
            label={label}
          />
        )}
        options={options || []}
      />
    </>
  );
}
