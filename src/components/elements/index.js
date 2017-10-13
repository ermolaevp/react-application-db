import { CardText } from 'material-ui/Card';
import styled from 'styled-components';

export const CenteredCardText = styled(CardText)`
  width: 400px;
  margin: 0 auto;
`;

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
`;
