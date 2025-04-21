import { Form, Input, ColorPicker } from 'antd';
import { useState, useEffect } from 'react';
import { EditableCellProps } from '../model/types';

export function EditableCell({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}: EditableCellProps) {
  const [showColorText, setShowColorText] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setShowColorText(!e.matches);
    };
    handleResize(mediaQuery);
    mediaQuery.addListener(handleResize);
    return () => mediaQuery.removeListener(handleResize);
  }, []);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {dataIndex === 'color' ? (
            <ColorPicker format="hex" showText={showColorText} />
          ) : (
            <Input />
          )}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}
