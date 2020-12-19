import React, { useCallback, useState } from "react";
import { noop } from "lodash";
import MaskedInput, { conformToMask } from "react-text-mask";
import {
  getMask,
  getNormalizePhone,
  isNeedReplaceFirstChar,
} from "../../utils";
import {
  BASE_PHONE_LENGTH,
  PHONE_MASK,
  PHONE_MASK_WITH_CODE,
} from "../../constants";

interface PhoneInputProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  ref?: any;
  style?: object;
}

export const PhoneInput = ({
  value = "",
  onChange = noop,
  placeholder = "",
  disabled = false,
  style = {},
  ref,
}: PhoneInputProps) => {
  const [mask, setMask] = useState(getMask(value));

  const handleChange = useCallback((event) => {
    const normalizeValue = getNormalizePhone(event.target.value);

    // до ввода 11 символа показываем маску без запятой для доп кода
    const withoutAdditionalCode = normalizeValue.length < BASE_PHONE_LENGTH - 1;
    setMask(withoutAdditionalCode ? PHONE_MASK : PHONE_MASK_WITH_CODE);

    onChange(event);
  }, []);

  const handleBlur = useCallback((event) => {
    const mask = getMask(event.target.value);
    setMask(mask);
  }, []);

  const handlePipe = useCallback(
    (conformedValue: string, config: any) => {
      const clearPhone = config.rawValue;

      // удаляем 8 при копипасте номера
      if (isNeedReplaceFirstChar(clearPhone)) {
        const phoneWithoutFirstChar = config.rawValue.substring(1);
        return conformToMask(phoneWithoutFirstChar, mask, config)
          .conformedValue;
      }

      return conformedValue;
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
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
    />
  );
};
