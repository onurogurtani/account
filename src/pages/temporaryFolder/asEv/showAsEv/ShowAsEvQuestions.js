import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';

import { CustomPagination, CustomButton, paginationProps } from '../../../../components';
import SingleQuestion from '../addAsEv/SingleQuestion';
import QuestionSideBar from '../addAsEv/QuestionSideBar';
import '../../../../styles/temporaryFile/asEv.scss';

const dummyIds = [
  1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1400, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409,
  1410, 1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1400, 1402, 1403, 1404, 1405, 1406, 1407, 1408,
  1409, 1410,
];

const ShowAsEvQuestions = () => {
  const pagedProperty = {
    totalCount: 40,
    currentPage: 1,
    pageSize: 10,
  };

  const [tableProp, setTableProp] = useState(pagedProperty);
  const [filteredDummy, setFilteredDummy] = useState([]);

  const paginateQuestions = async (page, pageSize) => {
    let newDummy = dummyIds
      .filter((item, index) => index < page * pageSize)
      .filter((item, index) => index > (page - 1) * pageSize - 1);
    console.log('newDummy :>> ', newDummy);
    console.log('dummyIds :>> ', dummyIds);
    setFilteredDummy([...newDummy]);
  };

  useEffect(() => {
    paginateQuestions(pagedProperty.currentPage, pagedProperty.pageSize);
    // return (cleanUp = () => {});
  }, []);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className="go-button">Git</CustomButton>,
    },
    total: tableProp?.totalCount,
    current: tableProp?.currentPage,
    pageSize: tableProp.pageSize || 10,
    onChange: (page, pageSize) => {
      setTableProp({
        ...tableProp,
        currentPage: page,
        pageSize: pageSize,
      });
      console.log(page, pageSize);
      let newDummy = dummyIds
        .filter((item, index) => index < page * pageSize)
        .filter((item, index) => index > (page - 1) * pageSize - 1);
      console.log('newDummy :>> ', newDummy);
      console.log('dummyIds :>> ', dummyIds);
      setFilteredDummy([...newDummy]);
    },
  };

  const TableFooter = ({ paginationProps }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CustomPagination className="custom-pagination" {...paginationProps} />
      </div>
    );
  };

  return (
    <>
      <article className="scrollable-container">
        {filteredDummy?.map((data, index) => (
          <div className="show-question-container">
            <div className="image-container">
              {' '}
              <SingleQuestion id={data} index={index} key={index} />
            </div>
            <div className="question-data-container">
              <QuestionSideBar data={data} key={index} />
            </div>
          </div>
        ))}
      </article>

      <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
        <CustomPagination
          className="custom-pagination"
          style={{ backGroundColor: 'white !important' }}
          {...paginationProps}
        />
      </div>
    </>
  );
};

export default ShowAsEvQuestions;
