import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

type SearchFieldProps = Omit<TextFieldProps, 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
};

export function SearchField({
  value,
  onChange,
  ...textFieldProps
}: SearchFieldProps) {
  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
