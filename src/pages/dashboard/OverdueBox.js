import styled from 'styled-components';

const OverdueBox = styled.div`
  height: 140px;
  //padding: 25px 15px 25px 160px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #ee292d;
  display: grid;

  .title {
    margin: 0 0 15px;
    font-size: 22px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.3px;
    color: #fff;
  }

  .mount {
    height: 24px;
    margin: 15px 35px 13px 0;
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.92;
    letter-spacing: normal;
    color: #ffe4e4;
  }

  @media (max-width: 767.98px) {
    //padding: 11px 16px 18px 130px;
    .title {
      font-size: 18px;
    }

    .mount {
      font-size: 20px;
    }
  }

  @media (min-width: 992px) {
    height: 180px;
    // padding: 17px 27px 25px 260px;
  }
`;

export default OverdueBox;
