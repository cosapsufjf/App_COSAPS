// components/InputContainer.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, DimensionValue } from 'react-native';
import { format_str } from '@/app/utils/regex';
import style from './styles';
import { Colors as colors } from '../../../MainStyle';

interface Props {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  keyboardType?: any;
  formatRegex?: { regex: RegExp; replace: string };
  width?: number | string;
  height?: number | string;
  margin?: number | string;
  marginTop?: number | string;
  backgroundColor?: string;
}


const FixInputContainer: React.FC<Props> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  keyboardType = 'default',
  formatRegex,
  width = "auto",
  height = "auto",
  margin = 0,
  marginTop = 0,
  backgroundColor = "#fff",
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Sincroniza se o valor externo mudar (ex: reset ou load storage)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChangeText = (text: string) => {
    let formatted = text;
    if (formatRegex) {
      formatted = format_str(text, formatRegex.regex, formatRegex.replace);
    }
    setLocalValue(formatted);
    onChange(formatted);
  };

  const handleBlurInternal = () => {
    if (onBlur) onBlur();
  };

  const styles = style(width, height, margin, marginTop, backgroundColor, false, !!error);

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>{label}</Text>
      <TextInput
        style={[styles.TextInput, error && styles.error]}
        value={localValue}
        onChangeText={handleChangeText}
        onBlur={handleBlurInternal}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default FixInputContainer;