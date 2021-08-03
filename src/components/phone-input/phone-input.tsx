import React, { useCallback, useState } from "react";
import { noop } from "lodash";
import MaskedInput from "react-text-mask";
import {
  getMask,
  getNormalizePhone,
  phoneReplaceCountryCode,
} from "../../utils";
import {
  NORMALIZE_PHONE_LENGTH,
  PHONE_MASK,
  PHONE_MASK_WITH_CODE,
} from "../../constants";

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
  const [mask, setMask] = useState(getMask(value));

  const handleChange = useCallback(
    (event) => {
      const normalizeValue = getNormalizePhone(event.target.value);

      // до ввода 12 символа показываем маску без запятой для доп кода
      const withoutAdditionalCode =
        normalizeValue.length < NORMALIZE_PHONE_LENGTH;
      setMask(withoutAdditionalCode ? PHONE_MASK : PHONE_MASK_WITH_CODE);

      onChange(event);
    },
    [onChange]
  );

  const handleBlur = useCallback((event) => {
    const currentMask = getMask(event.target.value);
    setMask(currentMask);
  }, []);

  const handlePipe = useCallback(
    (conformedValue: string, config: any) => {
      const normalizePhone = getNormalizePhone(config.rawValue).trim();

      // заменяем не кошерные первые символы кода ("7", "8") на кошерную "+7"
      return phoneReplaceCountryCode(normalizePhone, mask, config);
    },
    [mask]
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
      mask={mask}
      onKeyDown={onKeyDown}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
    />
  );
};
