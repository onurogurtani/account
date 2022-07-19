import styled from 'styled-components';

const OrderCardAddBox = styled.div`
  background-color: #003591;
  height: 140px;
  //padding: 25px 15px 25px 160px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  display: grid;

  .title {
    height: 54px;
    margin: 0 0 18px;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #fff;
  }

  @media (max-width: 767.98px) {
    //padding: 26px 21px 28px 130px;
    .title {
      font-size: 18px;
    }
  }

  @media (min-width: 992px) {
    height: 180px;
    // padding: 38px 53px 34px 260px;
  }
`;

export default OrderCardAddBox;
