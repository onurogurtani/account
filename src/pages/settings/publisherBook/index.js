import React, { useCallback, useEffect, useState } from 'react';
import {
  CustomButton,
  CustomCollapseCard,
  CustomModal,
  CustomPageHeader,
  CustomTable,
  CustomImage,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  successDialog,
  errorDialog,
  Text,
} from '../../../components';
import '../../../styles/settings/publisherBook.scss';
import modalClose from '../../../assets/icons/icon-close.svg';
import { Col, Row, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getPublisherList } from '../../../store/slice/publisherSlice';
import {
  getPublisherBookAdd,
  getPublisherBookList,
  getPublisherBookUpdate,
} from '../../../store/slice/publisherBookSlice';

const PublisherBook = () => {
  const [publisherSelectData, setPublisherSelectData] = useState([]);
  const { publisherList } = useSelector((state) => state.publisher);
  const { publisherBookList } = useSelector((state) => state.publisherBook);
  const nowYear = new Date();
  let yearArray = [];
  const year = nowYear.getFullYear();
  for (let i = year - 50; i < year + 1; i++) {
    yearArray.push({ value: i, label: i });
  }
  yearArray = yearArray.sort(function (a, b) {
    return b.value - a.value;
  });
  console.log(yearArray);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPublisherList({ params: { PageSize: 100 } }));
    dispatch(getPublisherBookList());
  }, [dispatch]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Yayın Adı',
      dataIndex: 'publisher',
      key: 'publisher',
      sorter: true,
      render: (text, record) => {
        return <div>{text.name}</div>;
      },
    },
    {
      title: 'Eser Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Baskı Yılı',
      dataIndex: 'pressYear',
      key: 'pressYear',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durum',
      dataIndex: 'recordStatus',
      key: 'recordStatus',
      sorter: true,
      render: (text, record) => {
        return <>{text === 1 ? 'Aktif' : 'Pasif'}</>;
      },
    },
    {
      title: 'İşlemler',
      dataIndex: 'update',
      key: 'update',
      align: 'center',
      render: (text, record) => {
        return (
          <div className="action-btns">
            <CustomButton
              type="primary"
              onClick={() => {
                setUpdateData(record);
                setShowAddModal(true);
                form.setFieldsValue(record);
              }}
            >
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];
  const [updateData, setUpdateData] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [inputCount, setInputCount] = useState(['1']);
  const handleClose = () => {
    form.resetFields();
    setShowAddModal(false);
    setUpdateData(null);
  };
  const [form] = Form.useForm();

  useEffect(() => {
    if (publisherList.items) {
      const newData = [];
      publisherList.items.forEach((item, index) => {
        newData.push({ value: item.id, label: item.name });
      });
      setPublisherSelectData(newData);
    }
  }, [publisherList]);
  const handleSumbit = useCallback(
    async (e) => {
      if (updateData) {
        const action = await dispatch(getPublisherBookUpdate({ entity: { id: updateData.id, ...e } }));
        if (getPublisherBookUpdate.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: action?.payload?.message,
            onOk: () => {
              form.resetFields();
              setShowAddModal(false);
              setUpdateData(null);
              dispatch(getPublisherBookList({ params: { 'BookDetailSearch.OrderBy': 'UpdateTimeDESC' } }));
            },
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: 'Bilgileri kontrol ediniz.',
          });
        }
      } else {
        const books = [];
        for (let i = 0; i < inputCount.length; i++) {
          books.push({
            recordStatus: e.recordStatus,
            name: e['books' + i],
            publisherId: e.publisherId,
            pressYear: e['pressYear' + i],
          });
        }
        const action = await dispatch(getPublisherBookAdd({ books: books }));
        if (getPublisherBookAdd.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: action?.payload?.message,
            onOk: () => {
              form.resetFields();
              setShowAddModal(false);
              setUpdateData(null);
              dispatch(getPublisherBookList({ params: { 'BookDetailSearch.OrderBy': 'UpdateTimeDESC' } }));
            },
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: 'Bilgileri kontrol ediniz.',
          });
        }
      }
    },
    [dispatch, form, inputCount.length, updateData],
  );
  return (
    <CustomPageHeader>
      <CustomCollapseCard cardTitle={'Eser Tanımlama'}>
        <div className=" table-head">
          <CustomButton
            onClick={() => setShowAddModal(true)}
            style={{ paddingRight: '40px', paddingLeft: '40px', marginBottom: '5px' }}
            type="primary"
          >
            Yeni Ekle
          </CustomButton>
        </div>
        <div>
          <CustomTable
            pagination={{
              total: publisherBookList?.pagedProperty?.totalCount,
              current: publisherBookList?.pagedProperty?.currentPage,
              pageSize: publisherBookList?.pagedProperty?.pageSize,
              position: 'bottomRight',
              showSizeChanger: true,
            }}
            onChange={(pagination, filters, sorter) => {
              let field = '';
              if (sorter.field) {
                field = sorter?.field[0]?.toUpperCase() + sorter?.field?.substring(1);
              }
              dispatch(
                getPublisherBookList({
                  params: {
                    'BookDetailSearch.PageSize': pagination.pageSize,
                    'BookDetailSearch.PageNumber': pagination.current,
                    'BookDetailSearch.OrderBy': field + (sorter.order === 'descend' ? 'DESC' : 'ASC'),
                  },
                }),
              );
            }}
            columns={columns}
            dataSource={publisherBookList?.items}
          />
        </div>
      </CustomCollapseCard>
      <CustomModal
        className="publisher-modal"
        visible={showAddModal}
        onOk={() => {
          form.submit();
        }}
        okText={updateData ? 'Güncelle' : 'Kaydet'}
        cancelText="İptal"
        title={'Eser Tanımlama'}
        onCancel={handleClose}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
        closeIcon={<CustomImage src={modalClose} />}
      >
        <CustomForm onFinish={handleSumbit} form={form}>
          <CustomFormItem
            rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
            label="Yayın Adı"
            name={'publisherId'}
            required={true}
          >
            <CustomSelect options={publisherSelectData}></CustomSelect>
          </CustomFormItem>
          {updateData ? (
            <>
              <Row gutter={20} className="form-row" justify="start">
                <Col span={11}>
                  <CustomFormItem
                    name={'name'}
                    rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                    label="Eser Adı"
                    required={true}
                  >
                    <CustomInput />
                  </CustomFormItem>
                </Col>
                <Col span={11}>
                  <CustomFormItem
                    name={'pressYear'}
                    rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                    label="Baskı Yılı"
                    required={true}
                  >
                    <CustomSelect options={yearArray} />
                  </CustomFormItem>
                </Col>
              </Row>
            </>
          ) : (
            <>
              {inputCount.map((item, index) => (
                <Row key={index} gutter={20} className="form-row" justify="start">
                  <Col span={11}>
                    <CustomFormItem
                      name={'books' + index}
                      rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                      label="Eser Adı"
                      required={true}
                    >
                      <CustomInput />
                    </CustomFormItem>
                  </Col>
                  <Col span={11}>
                    <CustomFormItem
                      name={'pressYear' + index}
                      rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                      label="Baskı Yılı"
                      required={true}
                    >
                      <CustomSelect options={yearArray} />
                    </CustomFormItem>
                  </Col>
                  {index !== 0 && (
                    <Col
                      onClick={() => {
                        let newData = [...inputCount];
                        newData.splice(index, 1);
                        setInputCount(newData);
                      }}
                      className="input-delete"
                      span={1}
                    >
                      X
                    </Col>
                  )}
                </Row>
              ))}

              <CustomButton
                onClick={() => {
                  setInputCount([...inputCount, '1']);
                }}
                style={{ marginBottom: '20px' }}
                type="primary"
              >
                Yeni Eser Ekle
              </CustomButton>
            </>
          )}

          <CustomFormItem label="Durumu" name={'recordStatus'} required={true}>
            <CustomSelect
              options={[
                { value: 1, label: 'Aktif' },
                { value: 0, label: 'Pasif' },
              ]}
            />
          </CustomFormItem>
        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default PublisherBook;
