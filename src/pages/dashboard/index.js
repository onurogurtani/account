import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import OrderBox from './OrderBox';
import PaymentBox from './PaymentBox';
import OrderCardAddBox from './OrderCardAddBox';
import PastBox from './PastBox';
import HelpBox from './HelpBox';
import FooterSlider from './FooterSlider';
import NotificationBox from './NotificationBox';
import OverdueBox from './OverdueBox';
import PendingApprovalBox from './PendingApprovalBox';
import { CustomImage, CustomPopover, Text } from '../../components';
import bottom from '../../assets/icons/icon-bottom.svg';
import { useCallback, useEffect, useState } from 'react';
import '../../styles/dashboard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCustomer } from '../../store/slice/customerSlice';
import CustomerListPopoverContent from './CustomerListPopoverContent';

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

const RightNameContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CustomerContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 0 20px;
  padding: 4px 4px 3px 7px;
  border-radius: 3px;
  white-space: nowrap;

  span:first-child {
    font-family: UbuntuRegular, sans-serif;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    color: #3f4957;
    white-space: nowrap;
  }

  @media (max-width: 767.98px) {
    display: block;
    margin: 0;
  }
`;

const CustomerListContent = styled(CustomerContent)`
  border: solid 1px rgba(107, 119, 137, 0.6);
  cursor: pointer;
`;

const Line = styled.div`
  @media (max-width: 991.98px) {
    height: 2px;
    border: solid 1px #d5d8de;
    margin-bottom: 23.5px;
  }
`;

const Content = styled.div`
  @media (max-width: 767.98px) {
    padding-bottom: 16px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    padding-bottom: 24px;
  }

  @media (min-width: 992px) {
    padding-bottom: 32px;
  }
`;

const ResponsiveContent = styled.div(
  (props) => `
   @media (max-width: 767.98px) {
       margin-bottom: ${props?.isMargin && props.isMobilBottom === false ? '0' : '16px'};
   }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: ${props?.isMargin ? '24px' : '0'};
  }

  @media (min-width: 992px) {
    margin-left: ${props?.isMargin ? '12px' : '0'};
    margin-right: ${props?.isMarginRight ? '12px' : '0'};
  }
`,
);

const Dashboard = () => {
  const isMobil = useMediaQuery({ query: '(max-width: 767.98px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const { currentUser } = useSelector((state) => state?.user);
  const { customerList, selectedCustomer } = useSelector((state) => state?.customer);
  const dispatch = useDispatch();
  const [customerSelectVisible, setCustomerSelectVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectedCustomer = useCallback(
    (selected) => {
      dispatch(setSelectedCustomer(selected));
      setCustomerSelectVisible(false);
    },
    [dispatch],
  );

  return (
    <>
      <NameContent>
        {!isMobil && (
          <span className={'current-user'}>
            <Text t="hello" /> {`${currentUser?.name} ${currentUser?.surName}, `}
          </span>
        )}
      </NameContent>

      <Line />
    </>
  );
};

export default Dashboard;
