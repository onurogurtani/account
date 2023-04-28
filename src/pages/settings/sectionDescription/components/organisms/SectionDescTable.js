import { CustomButton, CustomTable } from '../../../../../components';
import { noActionColums } from '../../assets/constants';
import styles from '../../assets/sectionDescription.module.scss';

const SectionDescTable = ({ onCopy, onUpdate, data }) => {
    const columns = [
        ...noActionColums,
        {
            title: '',
            dataIndex: '',
            key: 'id',
            width: 300,
            align: 'center',
            render: (_, record) => {
                return (
                    <div className={styles.actionsContainer}>
                        <CustomButton onClick={() => onUpdate(record)}>Düzenle</CustomButton>
                        <CustomButton disabled={record?.recordStatus === 0} onClick={() => onCopy(record)}>
                            Kopyala
                        </CustomButton>
                    </div>
                );
            },
        },
    ];
    return (
        <CustomTable
            scroll={{
                x: true,
            }}
            columns={columns}
            dataSource={data}
            pagination={false}
            className={styles.sectionDescTable}
        />
    );
};

export default SectionDescTable;
