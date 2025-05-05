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

export function SelectTags() {
  const { tags, fetchTags } = useTags();

  useEffect(() => {
    fetchTags();
  }, []);

  const placeholder = 'Теги';
  return (
    <StyledSelect
      placeholder={placeholder}
      mode="multiple"
      options={tags.map((tag: any) => ({
        label: tag.name,
        value: tag.id,
      }))}
      allowClear
    />
  );
}
