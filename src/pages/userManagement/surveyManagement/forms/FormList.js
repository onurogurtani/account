import { useEffect, useState } from 'react';
import {
    CustomCollapseCard,
    CustomImage,
    CustomButton,
    Text,
    CustomTable,
    CustomPagination,
} from '../../../../components';
import { useHistory } from 'react-router-dom';
import '../../../../styles/surveyManagement/surveyStyles.scss';
import { columns, sortList } from './static';
import { useDispatch, useSelector } from 'react-redux';
import iconSearchWhite from '../../../../assets/icons/icon-white-search.svg';
import {
    getFilteredPagedForms,
    getFormCategories,
    setShowFormObj,
    setCurrentForm,
} from '../../../../store/slice/formsSlice';
import FormFilter from './FormFilter';

const FormList = () => {
    const { tableProperty, formList} = useSelector((state) => state?.forms);
    const [filterFormVisible, setFilterFormVisible] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getFilteredPagedForms({}));
        dispatch(getFormCategories({ pageNumber: 0 }));
    }, []);

    const paginationProps = {
        showSizeChanger: true,
        showQuickJumper: {
            goButton: <CustomButton className="go-button">Git</CustomButton>,
        },
        total: tableProperty.totalCount,
        current: tableProperty.currentPage,
        pageSize: tableProperty.pageSize,
        onChange: (page, pageSize) => {
            const data = {
                PageNumber: page,
                PageSize: pageSize,
            };
            dispatch(getFilteredPagedForms(data));
        },
    };
    const TableFooter = ({ paginationProps }) => {
        return (
            <div className="pagination-container">
                <CustomPagination className="custom-pagination" {...paginationProps} />
            </div>
        );
    };

    const handleSort = (pagination, filters, sorter) => {
        const sortType = sortList.filter((field) => field.key === sorter.columnKey);
        const data = {
            OrderBy: sortType.length ? sortType[0][sorter.order] : '',
            PageNumber: '1',
        };
        dispatch(getFilteredPagedForms(data));
    };

    const AddNewForm = async () => {
        await dispatch(setCurrentForm({}));
        await dispatch(setShowFormObj({}));
        history.push('/user-management/survey-management/add');
    };
    const showSurvey = async (record) => {
        dispatch(setShowFormObj(record));
        history.push({
            pathname: '/user-management/survey-management/show',
            state: { data: record },
        });
    };

    return (
        <>
            <CustomCollapseCard className="draft-list-card" cardTitle={<Text t="Anketler" />}>
                <div className="operations-buttons">
                    <CustomButton className="add-btn" onClick={AddNewForm}>
                        YENİ ANKET OLUŞTUR
                    </CustomButton>

                    <CustomButton
                        data-testid="search"
                        className="search-btn"
                        onClick={() => {
                            setFilterFormVisible((prev) => !prev);
                        }}
                    >
                        <CustomImage src={iconSearchWhite} />
                    </CustomButton>
                </div>
                {filterFormVisible && <FormFilter />}
                <CustomTable
                    scroll={{
                        x: true,
                    }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                showSurvey(record);
                            },
                        };
                    }}
                    onChange={handleSort}
                    columns={columns}
                    dataSource={formList}
                    pagination={false}
                    footer={() => <TableFooter paginationProps={paginationProps} />}
                />
            </CustomCollapseCard>
        </>
    );
};

export default FormList;
