import styled from 'styled-components';

const NotificationBox = styled.div`
  height: 262px;
  margin: 0 1px 0 0;
  padding: 15px 16px 26px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(96, 97, 112, 0.16), 0 0 1px 0 rgba(40, 41, 61, 0.04);
  background-color: #fff;

  @media (min-width: 992px) {
    height: 259px;
    padding: 17px 23px 30px 24px;
  }
`;

export default NotificationBox;
