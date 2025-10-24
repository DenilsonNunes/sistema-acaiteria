import React from "react";
import { PatternFormat } from "react-number-format";
import { Input } from "../../ui/input";

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;

}


export const InputPhone: React.FC<PhoneInputProps> = ({
  value,
  disabled,
  readOnly,
  onChange,
}) => {
  return (
    <PatternFormat
      value={value ?? ""}
      className="disabled:opacity-100 disabled:cursor-default"
      disabled={disabled}
      readOnly={readOnly}
      customInput={Input}
      format="(##) #####-####"  // máscara para celular brasileiro
      allowEmptyFormatting
      mask="_"                           // caractere de preenchimento da máscara
      placeholder="(99) 99999-9999"     // mostra a máscara como placeholder
      onValueChange={(values) => {
        onChange?.(values.value);  // retorna só os números e máscara
      }}
    />
  );
};