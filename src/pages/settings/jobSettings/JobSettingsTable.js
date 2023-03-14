import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable } from '../../../components';
import { jobTime } from '../../../constants/settings/jobSettings';
import { getJobSettings } from '../../../store/slice/jobSettingsSlice';
import JobSettinsUpdateModal from './JobSettinsUpdateModal';

const JobSettingsTable = () => {
    const dispatch = useDispatch();
    const { jobs } = useSelector((state) => state.jobSettings);

    useEffect(() => {
        dispatch(getJobSettings());
    }, []);

    const columns = [
        {
            title: 'İsim',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Zamanlama',
            dataIndex: 'value',
            key: 'value',
            render: (text, record) => {
                return <div>{jobTime.find((u) => u.value === text).label}</div>;
            },
        },
        {
            title: 'İşlemler',
            dataIndex: 'draftDeleteAction',
            key: 'draftDeleteAction',
            width: 100,
            align: 'center',
            render: (_, record) => {
                return <JobSettinsUpdateModal record={record} />;
            },
        },
    ];

    return (
        <CustomTable
            dataSource={jobs}
            // className="jobs-list"
            columns={columns}
            pagination={false}
            rowKey={(record) => `jobs-list-${record?.id}`}
            scroll={{ x: false }}
        />
    );
};

export default JobSettingsTable;
