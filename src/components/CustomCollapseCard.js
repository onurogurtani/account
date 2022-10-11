import '../styles/components/collapseCard.scss';
import { Collapse } from 'antd';
import { CustomImage } from '../components';
import { useMediaQuery } from 'react-responsive';
import iconDown from '../assets/icons/icon-down.svg';
import iconUp from '../assets/icons/icon-up.svg';

const { Panel } = Collapse;

const CustomCollapseCard = ({
  children,
  cardTitle,
  cardTitleAlign,
  bodyCenter,
  className,
  defaultActiveKey,
}) => {
  const isMobil = useMediaQuery({ query: '(max-width: 1179.98px)' });

  return (
    <Collapse
      defaultActiveKey={defaultActiveKey || ['1']}
      className={`${className || ''} custom-collapse-card`}
      ghost
      expandIconPosition="right"
      expandIcon={({ isActive }) =>
        isActive ? (
          <CustomImage className="open-close" src={iconDown} />
        ) : (
          <CustomImage className="open-close" src={iconUp} />
        )
      }
    >
      <Panel
        header={
          <div style={{ textAlign: isMobil ? 'left' : cardTitleAlign || 'left' }}>{cardTitle}</div>
        }
        key="1"
      >
        <div className={bodyCenter ? 'd-flex justify-content-center' : ''}>{children}</div>
      </Panel>
    </Collapse>
  );
};

export default CustomCollapseCard;
