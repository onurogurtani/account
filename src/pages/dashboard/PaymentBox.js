import styled from 'styled-components';

const PaymentBox = styled.div`
  height: 140px;
  background-color: #9edbcb;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);

  .title {
    height: 50px;
    margin: 0 0 15px;
    font-size: 22px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.3px;
    color: #162056;
  }

  @media (max-width: 767.98px) {
    //padding: 25px 16px 25px 130px;
    .title {
      font-size: 18px;
    }
  }

  @media (min-width: 992px) {
    height: 180px;
    //padding: 36px 79px 43px 260px;
  }
`;

export default PaymentBox;
