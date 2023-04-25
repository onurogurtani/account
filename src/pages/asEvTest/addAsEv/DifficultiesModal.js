import React,{useState} from 'react';
import { CustomModal, CustomTable } from '../../../components';
import '../../../styles/asEvTest/asEv.scss';
import AsEvTestPreview from '../AsEvTestPreview';



const columns = [
    {
        title: 'Test Konu Sıralaması',
        dataIndex: 'lessonSubjectName',
        key: 'lessonSubjectName',
        width: 200,
        render: (text, record) => {
            return <div>{text}</div>;
        },
    },
    {
        title: 'Zorluk 1',
        dataIndex: 'difficulty1',
        key: 'difficulty1',
        align: 'center',
        render: (text, record) => {
            return <div>{text}</div>;
        },
    },
    {
        title: 'Zorluk 2',
        dataIndex: 'difficulty2',
        key: 'difficulty2',
        align: 'center',
        render: (text, record) => {
            return <div>{text}</div>;
        },
    },
    {
        title: 'Zorluk 3',
        dataIndex: 'difficulty3',
        key: 'difficulty3',
        align: 'center',
        render: (text, record) => {
            return <div>{text}</div>;
        },
    },
    {
        title: 'Zorluk 4',
        dataIndex: 'difficulty4',
        key: 'difficulty4',
        align: 'center',
        render: (text, record) => {
            return <div>{text}</div>;
        },
    },
    {
        title: 'Zorluk 5',
        dataIndex: 'difficulty5',
        key: 'difficulty5',
        align: 'center',
        render: (text, record) => {
            return <div>{text}</div>;
        },
    },
];

const DifficultiesModal = ({ isVisible, setIsVisible, setStep, difficultiesData }) => {

    const [isPreviewModalVisible, setPreviewModalVisible] = useState(false);

    const onOk = async () => {
        setIsVisible(false);
        setPreviewModalVisible(true)
    };
    const onCancel = async () => {
        setIsVisible(false);
        setPreviewModalVisible(false)
    };
    return (
        <>
        <CustomModal
            visible={isVisible}
            title={'Ölçme Değerlendirme Testi Konu Zorlukları'}
            okText={'Ön İzlemeye Geç'}
            cancelText={'Vazgeç'}
            onCancel={onCancel}
            onOk={onOk}
            className="difficulty-modal"
        >
            {difficultiesData.items &&
            <CustomTable
                columns={columns}
                pagination={false}
                scroll={false}
                style={{ width: '1000px' }}
                dataSource={difficultiesData.items[0].subjectDifficultys}
            />
        }
        </CustomModal>
        <CustomModal
            visible={isPreviewModalVisible}
            title={'Ölçme Değerlendirme Testi'}
            footer={null}
            onCancel={onCancel}
            className="difficulty-modal"
        >
         <AsEvTestPreview/>
        </CustomModal>
        </>
    );
};

export default DifficultiesModal;
