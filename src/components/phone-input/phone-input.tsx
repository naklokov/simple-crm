import React, { useCallback } from "react";
import { noop, trimEnd } from "lodash";
import MaskedInput, { conformToMask } from "react-text-mask";
import { getNormalizePhone, isNeedReplaceFirstChar } from "../../utils";
import { PHONE_MASK, RU_PHONE_CODE } from "../../constants";

interface PhoneInputProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  ref?: any;
  style?: React.CSSProperties;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value = "",
  onChange = noop,
  onKeyDown = noop,
  placeholder = "",
  disabled = false,
  style = {},
  ref,
}) => {
  const handleChange = useCallback((event) => onChange(event), [onChange]);

  const handlePipe = useCallback((conformedValue: string, config: any) => {
    const normalizePhone = getNormalizePhone(config.rawValue).trim();

    return trimEnd(
      conformToMask(
        isNeedReplaceFirstChar(normalizePhone)
          ? RU_PHONE_CODE + normalizePhone.substring(1)
          : normalizePhone,
        PHONE_MASK,
        config
      ).conformedValue,
      ", "
    );
  }, []);

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
      onChange={handleChange}
      value={value}
    />
  );
};
