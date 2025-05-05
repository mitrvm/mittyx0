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

export function SearchName() {
  const placeholder = 'Название';
  return <StyledInput placeholder={placeholder} type="search" />;
}
