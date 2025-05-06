import { Input } from 'antd';
import styled from 'styled-components';

const { Search } = Input;
const StyledInput = styled(Search)`
  width: 12vw;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export function SearchName({
  onSearch,
  value,
}: {
  onSearch: (value: string) => void;
  value: string;
}) {
  const placeholder = 'Название';

  return (
    <StyledInput
      placeholder={placeholder}
      type="search"
      onChange={(e) => onSearch(e.target.value)}
      onSearch={onSearch}
      allowClear
      value={value}
    />
  );
}
