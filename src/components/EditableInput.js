import { Space, Typography } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import CustomInput from './CustomInput';

const { Text } = Typography;
const EditableInput = ({ initialValue, isEdit, setIsEdit, height, onEnter }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isEdit) inputRef.current?.focus();
  }, [isEdit]);

  const keyDownHandler = useCallback(
    (event) => {
      event.stopPropagation();
      if (event.code === 'Enter') {
        setIsEdit(false);
        if (value && value.trim()) onEnter?.(value.trim());
        setValue(initialValue ? value : undefined);
      }
    },
    [value],
  );

  return isEdit ? (
    <Space style={{ marginBottom: '14px' }}>
      <CustomInput
        ref={inputRef}
        onKeyDown={keyDownHandler}
        onClick={(event) => {
          event.stopPropagation();
        }}
        style={{ width: '450px' }}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          setIsEdit(false);
          setValue(initialValue);
        }}
        value={value}
        height={height ? height : '28'}
      />
      <Text style={{ fontSize: '13px' }} type="secondary">
        Kaydetmek için Enter tuşuna basınız.
      </Text>
    </Space>
  ) : (
    <>{initialValue}</>
  );
};

export default EditableInput;
