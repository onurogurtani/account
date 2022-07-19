import styled from 'styled-components';

const PendingApprovalBox = styled.div`
  height: 140px;
  // padding: 25px 15px 25px 160px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #febd00;

  .title {
    height: 50px;
    //margin: 26px 0 15px 21px;
    font-size: 22px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.3px;
    color: #162056;
  }

  @media (max-width: 767.98px) {
    //padding: 30px 0 21px 130px;
    .title {
      font-size: 18px;
    }
  }

  @media (min-width: 992px) {
    height: 180px;
    //padding: 17px 27px 25px 260px;
  }
`;

export default PendingApprovalBox;
