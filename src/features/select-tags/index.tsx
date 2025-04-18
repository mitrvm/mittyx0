import { Select } from 'antd';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  width: 12vw;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export function SelectTags() {
  const placeholder = 'Теги';
  return (
    <StyledSelect
      placeholder={placeholder}
      mode="multiple"
      options={[
        {
          label: <span>{placeholder}</span>,
          title: placeholder,
          options: [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
          ],
        },
      ]}
      allowClear
    />
  );
}
