import { Select } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useTags } from '~entities/groupers';

const StyledSelect = styled(Select)`
  width: 12vw;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export function SelectTags({
  onChange,
}: {
  onChange: (values: number[]) => void;
}) {
  const { tags, fetchTags } = useTags();

  useEffect(() => {
    fetchTags();
  }, []);

  const placeholder = 'Теги';
  return (
    <StyledSelect
      placeholder={placeholder}
      mode="multiple"
      filterOption={(input, option) =>
        option!.label!.toString().toLowerCase().includes(input.toLowerCase())
      }
      options={tags.map((tag) => ({ label: tag.name, value: tag.id }))}
      onChange={(values) => onChange(values as number[])}
      allowClear
      maxTagCount={1}
    />
  );
}
