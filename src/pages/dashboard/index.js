import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Text } from '../../components';
import { useEffect } from 'react';
import '../../styles/dashboard.scss';
import { useSelector } from 'react-redux';

const NameContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-family: UbuntuRegular, sans-serif;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: right;
    color: #1d2228;
  }

  span.current-user {
    font-size: 16px;
    font-family: UbuntuMedium, sans-serif;
    text-align: left;
  }

  span:nth-child(2) {
    color: #3f4957;
    margin-right: 20px;
  }

  @media (max-width: 767.98px) {
    display: block;

    margin-bottom: 13px;
    span {
      font-size: 8px;
    }

    span:first-child {
      font-size: 12px;
      text-align: start;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-bottom: 13px;
    span {
      font-size: 10px;
    }

    span:first-child {
      font-size: 14px;
    }
  }

  @media (min-width: 992px) {
    margin-bottom: 18px;
  }
`;

const Line = styled.div`
  @media (max-width: 991.98px) {
    height: 2px;
    border: solid 1px #d5d8de;
    margin-bottom: 23.5px;
  }
`;

const Dashboard = () => {
  const isMobil = useMediaQuery({ query: '(max-width: 767.98px)' });
  const { currentUser } = useSelector((state) => state?.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NameContent>
        {!isMobil && (
          <span className={'current-user'}>
            {/* <Text t="hello" /> {`${currentUser?.name} ${currentUser?.surName}, `} */}
            <Text t="hello" /> {`${currentUser?.nameSurname}, `}
          </span>
        )}
      </NameContent>

      <Line />
    </>
  );
};

export default Dashboard;
