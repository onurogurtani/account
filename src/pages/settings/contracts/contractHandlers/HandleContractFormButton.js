import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { confirmDialog, CustomButton, CustomFormItem, errorDialog, successDialog, Text } from '../../../../components';
import {
    addNewContract,
    getByFilterPagedContractKinds,
    getFilteredContractTypes,
    updateContract,
} from '../../../../store/slice/contractsSlice';
import '../../../../styles/settings/contracts.scss';

const HandleContractFormButton = ({ form, initialValues, contractTypes, contractKinds }) => {
    const dispatch = useDispatch();

    const history = useHistory();

    const filterArray = async (originalArray, filterArray) => {
        let filteredArray = [];
        originalArray.forEach((element) => {
            if (filterArray.includes(element?.id)) {
                filteredArray.push(element);
            }
        });
        let idsArr = [];
        filteredArray.forEach((element) => {
            idsArr.push({ contractTypeId: element.id });
        });
        return idsArr;
    };

    const onFinish = useCallback(async (contractTypes) => {
        const values = await form.validateFields();
        const startOfContract = values?.validStartDate
            ? dayjs(values?.validStartDate)?.utc().format('YYYY-MM-DD-HH-mm')
            : undefined;

        const endOfContract = values?.validEndDate
            ? dayjs(values?.validEndDate)?.utc().format('YYYY-MM-DD-HH-mm')
            : undefined;

        if (startOfContract >= endOfContract) {
            errorDialog({
                title: <Text t="error" />,
                message: 'Başlangıç Tarihi Bitiş Tarihinden Önce Olmalıdır',
            });
            return;
        }
        try {
            const values = await form.validateFields();
            const startDate = values?.validStartDate
                ? dayjs(values?.validStartDate)?.utc().format('YYYY-MM-DD')
                : undefined;
            const startHour = values?.validStartDate
                ? dayjs(values?.validStartDate)?.utc().format('HH:mm:ss')
                : undefined;
            const endDate = values?.validEndDate ? dayjs(values?.validEndDate)?.utc().format('YYYY-MM-DD') : undefined;
            const endHour = values?.validEndDate ? dayjs(values?.validEndDate)?.utc().format('HH:mm:ss') : undefined;
            let typesFromForm = values?.contractTypes;

            let typeData = {
                pageNumber: 1,
                pageSize: 1000,
            };
            const res = await dispatch(getFilteredContractTypes(typeData));
            const originalArr = await res?.payload.data.items;
            const typeArr = await filterArray(originalArr, typesFromForm);
            const versionString = values?.version;
            const versionNumber = versionString ? Number(versionString?.replace(/\D/g, '')) : 1;
            let kindData = { contractKindDto: {} };
            const res2 = await dispatch(getByFilterPagedContractKinds(kindData));
            let kindId = [];
            kindId = res2?.payload?.data?.items.filter((i) => i.id === values.contractKinds);
            let data = {
                entity: {
                    clientRequiredApproval: values?.clientRequiredApproval,
                    validStartDate: startDate + 'T' + startHour + '.000Z',
                    validEndDate: endDate + 'T' + endHour + '.000Z',
                    requiredApproval: values?.requiredApproval,
                    content: values?.content,
                    contractKindId: initialValues ? kindId[0].id : values?.contractKinds,
                    contractTypes: typeArr,
                    version: versionNumber,
                    recordStatus: values?.recordStatus,
                },
            };
            if (initialValues) {
                data.entity.id = initialValues?.id;
                const action = await dispatch(updateContract(data));
                if (updateContract.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t="success" />,
                        message: 'Sözleşme Başarıyla Güncellendi',
                        onOk: () => {
                            history.push('/settings/contracts');
                        },
                    });
                }
            } else {
                const action = await dispatch(addNewContract(data));
                if (addNewContract.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t="success" />,
                        message:
                            initialValues?.handleType === 'copy'
                                ? 'Sözleşme Kopyalama İşlemi Tamamlandı'
                                : 'Yeni Sözleşme Başarıyla Eklendi',
                        onOk: () => {
                            history.push('/settings/contracts');
                        },
                    });
                }
            }
        } catch (error) {
            errorDialog({
                title: <Text t="error" />,
                message: error,
            });
        }
    }, []);

    const onCancel = () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'İptal etmek istediğinizden emin misiniz?',
            okText: <Text t="Evet" />,
            cancelText: 'Hayır',
            onOk: async () => {
                history.push('/settings/contracts');
            },
        });
    };
    return (
        <CustomFormItem className="footer-form-item handle-contract-footer ">
            <CustomButton className="cancel-btn" onClick={onCancel}>
                İptal
            </CustomButton>
            <CustomButton type="primary" className="save-and-finish-btn" onClick={() => onFinish()}>
                {' '}
                {initialValues
                    ? initialValues.handleType === 'edit'
                        ? 'Güncelle ve Bitir'
                        : 'Kopyala ve Bitir'
                    : 'Kaydet ve Bitir'}
            </CustomButton>
        </CustomFormItem>
    );
};
export default HandleContractFormButton;
