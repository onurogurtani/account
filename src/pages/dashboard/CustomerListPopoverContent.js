import styled from 'styled-components';

const UL = styled.ul`
  border-radius: 10px;
`;

const LI = styled.li`
  display: flex;
  justify-content: flex-end;

  :first-child {
    border-radius: 10px 10px 0 0;
  }
`;

const CustomerListPopoverContent = ({
  customerList,
  selectCustomerChange,
  className,
  selectedCustomer,
}) => {
  return (
    <div className={className}>
      <UL>
        {customerList.map((item, index) => {
          const activeClass = item?.customerId === selectedCustomer?.customerId ? 'active' : '';
          return (
            <LI
              key={`${item?.customerId}-${index}`}
              onClick={() => selectCustomerChange(item)}
              className={activeClass}
            >
              <span>{item?.customerName || ''}</span>
              <span>{item?.customerId}</span>
            </LI>
          );
        })}
      </UL>
    </div>
  );
};

export default CustomerListPopoverContent;
