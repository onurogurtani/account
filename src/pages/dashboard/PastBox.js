import styled from 'styled-components';

const PastBox = styled.div`
  height: 140px;
  // padding: 25px 15px 25px 160px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #c4d600;
  display: grid;

  .title {
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #162056;
  }

  .delayed-time-title {
    font-size: 14px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    color: #162056;
  }

  .delayed-time-value {
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #162056;
  }

  .saving-this-month-title {
    font-size: 14px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    color: #162056;
  }

  .saving-this-month-value {
    height: 32px;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #162056;

    .turkish-money-symbol {
      // font-family: Helvetica;
    }
  }

  @media (min-width: 992px) {
    height: 180px;
    // padding: 15px 28px 15px 261px;
  }

  @media (max-width: 767.98px) {
    // padding: 11px 6px 11px 100px;
    .title {
      font-size: 14px;
    }

    .delayed-time-title,
    .saving-this-month-title {
      font-size: 12px;
    }

    .delayed-time-value,
    .saving-this-month-value {
      font-size: 16px;
    }
  }
`;

export default PastBox;
