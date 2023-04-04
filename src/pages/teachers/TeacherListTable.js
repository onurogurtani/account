import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "../../components";
import usePaginationProps from "../../hooks/usePaginationProps";
import { capitalizeFirstLetter } from "../../utils/utils";
import { getByFilterPagedTeachers } from "../../store/slice/teachersSlice";
import useTeacherListTableColumns from "./hooks/useTeacherListTableColumns";

const TeacherListTable = () => {
    const dispatch = useDispatch();
    const { teacherList, tableProperty, teachersDetailSearch } = useSelector((state) => state?.teachers);


    const columns = useTeacherListTableColumns();
    const paginationProps = usePaginationProps(tableProperty);

    useEffect(() => {
        dispatch(getByFilterPagedTeachers());
    }, []);

    const onChangeTable = async (pagination, filters, sorter, extra) => {
        const actiontype = extra?.action;
        dispatch(
            getByFilterPagedTeachers({
                ...teachersDetailSearch,
                pagination: {
                    pageSize: pagination?.pageSize,
                    pageNumber: actiontype === 'paginate' ? pagination?.current : 1,
                },
                orderBy: sorter?.order
                    ? capitalizeFirstLetter(sorter?.field) + (sorter?.order === 'ascend' ? 'ASC' : 'DESC')
                    : 'UpdateTimeDESC',
            }),
        );
    };

    return (
        <CustomTable
            dataSource={teacherList}
            columns={columns}
            pagination={paginationProps}
            rowKey={(record) => `teachers-${record?.id || record?.name}`}
            scroll={{ x: false }}
            onChange={onChangeTable}
        />
    );
}

export default TeacherListTable;