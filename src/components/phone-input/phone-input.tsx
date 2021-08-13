import React, { useCallback, useState } from "react";
import { noop } from "lodash";
import MaskedInput from "react-text-mask";
import { getConformedValue, getNormalizePhone } from "../../utils";
import { PHONE_MASK } from "../../constants";

interface PhoneInputProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  ref?: any;
  style?: React.CSSProperties;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value = "",
  onChange = noop,
  onKeyDown = noop,
  onBlur = noop,
  placeholder = "",
  disabled = false,
  style = {},
  ref,
}) => {
  const handlePipe = useCallback(
    (conformedValue: string, config: any) =>
      getConformedValue(getNormalizePhone(config.rawValue).trim(), config),
    []
  );

  return (
    <MaskedInput
      ref={ref}
      style={style}
      className="ant-input"
      guide={false}
      pipe={handlePipe}
      placeholder={placeholder}
      disabled={disabled}
      mask={PHONE_MASK}
      onKeyDown={onKeyDown}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  );
};
