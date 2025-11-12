import React from "react";
import { NumericFormat } from "react-number-format";
import { Input } from "../../ui/input";

interface CurrencyInputProps {
  value?: number;
  onChange?: (value: number | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
}


export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  disabled,
  readOnly,
  onChange,
  placeholder,
}) => {
  return (
    <NumericFormat
      className="disabled:opacity-100 disabled:cursor-default" 
      inputMode="decimal"
      value={value ?? 0}
      disabled={disabled}
      readOnly={readOnly}
      customInput={Input}
      prefix="R$ "
      decimalSeparator=","
      thousandSeparator="."
      decimalScale={2}
      fixedDecimalScale
      placeholder={placeholder}
      onValueChange={(values) => {
        onChange?.(values.floatValue ?? 0);
      }}
    />
  );
};