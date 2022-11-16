import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import { dateTimeFormat } from '../utils/keys';

const ModuleShowFooterList = styled.ul`
  font-family: UbuntuRegular, sans-serif;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  color: #3485fd;
  font-size: 14px;
  span {
    color: #6b7789;
  }
  padding-left: 0;
`;

const ModuleShowFooter = ({ insertTime, insertUserFullName, updateTime, updateUserFullName }) => {
  return (
    <ModuleShowFooterList>
      <li>
        Oluşturma Tarihi : <span>{dayjs(insertTime)?.format(dateTimeFormat)}</span>
      </li>
      <li>
        Oluşturan : <span>{insertUserFullName}</span>
      </li>
      <li>
        Güncelleme Tarihi : <span>{dayjs(updateTime)?.format(dateTimeFormat)}</span>
      </li>
      <li>
        Güncelleyen : <span>{updateUserFullName}</span>
      </li>
    </ModuleShowFooterList>
  );
};

export default ModuleShowFooter;
