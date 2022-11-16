import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import {
  AutoCompleteOption,
  CustomAutoComplete,
  CustomButton,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomSelect,
  Option,
} from '../../components';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import '../../styles/tableFilter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { turkishToLower } from '../../utils/utils';
import {
  getByFilterPagedEvents,
  getEventNames,
  getParticipantGroupsList,
  setIsFilter,
} from '../../store/slice/eventsSlice';
import { dateTimeFormat } from '../../utils/keys';

const VideoFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { filterObject, isFilter } = useSelector((state) => state?.events);

  const [participantGroupsList, setParticipantGroupsList] = useState([]);
  const [eventNameList, setEventNameList] = useState([]);

  useEffect(() => {
    loadparticipantGroups();
    loadEventNames();
  }, []);

  useEffect(() => {
    if (isFilter) {
      form.setFieldsValue(filterObject);
    }
  }, []);

  const loadparticipantGroups = useCallback(async () => {
    const action = await dispatch(getParticipantGroupsList());
    if (getParticipantGroupsList?.fulfilled?.match(action)) {
      setParticipantGroupsList(action?.payload?.data?.items);
    } else {
      setParticipantGroupsList([]);
      console.log(action?.payload?.message);
    }
  }, [dispatch]);

  const loadEventNames = useCallback(async () => {
    const action = await dispatch(getEventNames());
    if (getEventNames?.fulfilled?.match(action)) {
      setEventNameList(action?.payload?.data);
    } else {
      setEventNameList([]);
      console.log(action?.payload?.message);
    }
  }, [dispatch]);

  const handleFilter = () => {
    form.submit();
  };

  const onFinish = useCallback(
    async (values) => {
      console.log(values);
      try {
        const body = {
          ...filterObject,
          ...values,
          StartDate: values?.StartDate ? values?.StartDate : undefined,
          EndDate: values?.EndDate ? values?.EndDate : undefined,
          Status: values?.Status === 0 ? undefined : values?.Status,
          PublishedStatus: values?.PublishedStatus === 0 ? undefined : values?.PublishedStatus,
          PageNumber: 1,
        };
        await dispatch(getByFilterPagedEvents(body));
        await dispatch(setIsFilter(true));
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, filterObject],
  );

  const handleReset = async () => {
    form.resetFields();
    await dispatch(
      getByFilterPagedEvents({
        PageSize: filterObject?.PageSize,
        OrderBy: filterObject?.OrderBy,
      }),
    );
    await dispatch(setIsFilter(false));
  };

  return (
    <div className="table-filter">
      <CustomForm
        name="filterForm"
        className="filter-form"
        autoComplete="off"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <div className="form-item">
          <CustomFormItem label="Etkinlik Adı" name="Name">
            <CustomAutoComplete
              placeholder="Etkinlik Adı"
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
            >
              {eventNameList.map((item) => (
                <AutoCompleteOption key={item} value={item}>
                  {item}
                </AutoCompleteOption>
              ))}
            </CustomAutoComplete>
            {/* <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow={false}
              showSearch
              placeholder="Etkinlik Adı"
            >
              {eventNameList?.map((item) => {
                return (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                );
              })}
            </CustomSelect> */}
          </CustomFormItem>

          <CustomFormItem label="Katılımcı Grubu" name="ParticipantGroupId">
            <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              mode="multiple"
              placeholder="Katılımcı Grubu"
            >
              {participantGroupsList
                // ?.filter((item) => item.isActive)
                ?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label="Durum" name="Status">
            <CustomSelect placeholder="Durum">
              <Option key={0} value={0}>
                Hepsi
              </Option>
              <Option key={1} value={true}>
                Aktif
              </Option>
              <Option key={2} value={false}>
                Pasif
              </Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label="Yayınlanma Durumu" name="PublishedStatus">
            <CustomSelect placeholder="Yayınlanma Durumu">
              <Option key={0} value={0}>
                Hepsi
              </Option>
              <Option key={1} value={true}>
                Yayınlanmış
              </Option>
              <Option key={2} value={false}>
                Taslak
              </Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label="Başlangıç Tarihi ve Saati" name="StartDate">
            <CustomDatePicker showTime format={dateTimeFormat} />
          </CustomFormItem>

          <CustomFormItem label="Bitiş Tarihi ve Saati" name="EndDate">
            <CustomDatePicker showTime format={dateTimeFormat} />
          </CustomFormItem>
        </div>
        <div className="form-footer">
          <div className="action-buttons">
            <CustomButton className="clear-btn" onClick={handleReset}>
              Temizle
            </CustomButton>
            <CustomButton className="search-btn" onClick={handleFilter}>
              <CustomImage className="icon-search" src={iconSearchWhite} />
              Filtrele
            </CustomButton>
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default VideoFilter;
