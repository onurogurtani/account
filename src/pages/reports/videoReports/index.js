import { Pagination } from 'antd';
import React, { useState } from 'react';
import { CustomButton, CustomCollapseCard, CustomModal, CustomPageHeader, CustomTable } from '../../../components';
import CustomVideoPlayer from '../../../components/videoPlayer/CustomVideoPlayer';
import '../../../styles/reports/videoReports.scss';

const VideoReports = () => {
    const [openVideo, setOpenVideo] = useState(false);
    const columns = [
        {
            title: 'Sınıf Seviyesi',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Ders Adı',
            dataIndex: 'name',
            key: 'name',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Ünite Adı',
            dataIndex: 'recordStatus',
            key: 'recordStatus',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Konu Adı',
            dataIndex: 'konu',
            key: 'konu',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Video Adı',
            dataIndex: 'video',
            key: 'video',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Video Kategori',
            dataIndex: 'video',
            key: 'video',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Video Kazanımları',
            dataIndex: 'video',
            key: 'video',

            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'İŞLEMLER',
            dataIndex: 'show',
            key: 'show',
            width: 200,
            align: 'center',
            render: (_, record) => {
                return (
                    <div className="action-btns">
                        <CustomButton
                            onClick={() => {
                                setOpenVideo(true);
                            }}
                            className="edit-button"
                        >
                            Önizle
                        </CustomButton>
                    </div>
                );
            },
        },
    ];
    return (
        <CustomPageHeader>
            <CustomCollapseCard cardTitle={'Çalışma Planına Bağlanmamış Videolar Raporu'}>
                <div className="video-reports-main">
                    <div className=" exports-button">
                        <CustomButton type="primary">PDF'E Aktar</CustomButton>
                        <CustomButton className="excel-button">Excele Aktar</CustomButton>
                    </div>
                    <CustomTable
                        pagination={{
                            showQuickJumper: true,
                            position: 'bottomRight',
                            showSizeChanger: true,
                            total: 200,
                            pageSize: 10,
                        }}
                        dataSource={[{ name: 'A' }]}
                        columns={columns}
                    ></CustomTable>
                    <div>Toplam Sonuç :200</div>
                </div>
            </CustomCollapseCard>
            <CustomModal
                footer={false}
                onCancel={() => {
                    setOpenVideo(false);
                }}
                width={'1000px'}
                visible={openVideo}
            >
                <CustomVideoPlayer
                    url={'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'}
                />
            </CustomModal>
        </CustomPageHeader>
    );
};

export default VideoReports;
