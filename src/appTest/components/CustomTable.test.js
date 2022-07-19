import { render, within } from '@testing-library/react';
import { CustomTable } from '../../components';
import React from 'react';

describe('table component', () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'Sercan',
      age: 30,
      address: 'Ankara',
    },
  ];

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  it('mock table', () => {
    const { getByText } = render(<CustomTable dataSource={dataSource} columns={columns} />);

    expect(getByText(/Sercan/i)).toBeInTheDocument();
  });

  it('mock table length', () => {
    const { getByText } = render(<CustomTable dataSource={dataSource} columns={columns} />);
    dataSource.forEach((item) => {
      const row = getByText(item.name).closest('tr');
      const utils = within(row);
      expect(utils.getByText(item.key)).toBeInTheDocument();
      expect(utils.getByText(item.name)).toBeInTheDocument();
    });
  });
});
