import customersServices from '../../services/customers.services';

describe('Customers services tests', () => {
  it('userCustomersGetList call', () => {
    customersServices.userCustomersGetList();
  });

  it('customerLogosGetList call', () => {
    customersServices.customerLogosGetList();
  });
});
