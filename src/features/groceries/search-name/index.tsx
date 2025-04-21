import { Input } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(Input)`
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
