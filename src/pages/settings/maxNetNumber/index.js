import React, { useEffect, useState } from 'react';
import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomInput,
  CustomPageHeader,
  CustomSelect,
  CustomTable,
  Option,
  successDialog,
} from '../../../components';
import '../../../styles/settings/maxNetNumber.scss';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getEducationYearList } from '../../../store/slice/educationYearsSlice';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import { getLessonsQuesiton } from '../../../store/slice/lessonsSlice';

const MaxNetNumber = () => {
  const { educationYearList } = useSelector((state) => state.educationYears);
  const { allClassList } = useSelector((state) => state.classStages);
  const { lessons } = useSelector((state) => state.lessons);
  const [step, setStep] = useState(1);

  const [searchShow, setSearchShow] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [form, formAdd] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEducationYearList({ params: { pageSize: '99999' } }));
    dispatch(getAllClassStages());
  }, [dispatch]);
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durum',
      dataIndex: 'name',
      key: 'name',

      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Eğitim Öğretim Yılı',
      dataIndex: 'recordStatus',
      key: 'recordStatus',

      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Sınıf Seviyesi',
      dataIndex: 'konu',
      key: 'konu',

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
                setStep(2);
                setUpdateData({ id: 1 });
              }}
              className="edit-button"
            >
              Güncelleme
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const sumbitAddUpdate = () => {
    if (updateData.id) {
      setStep(1);
      successDialog({ title: 'Başırılı', message: 'Güncellendi' });
      setUpdateData({});
    } else {
      setStep(1);
      successDialog({ title: 'Başırılı', message: 'Eklendi' });
    }
  };
  const filterData = (e) => {
    console.log(e);
  };
  return (
    <CustomPageHeader>
      <CustomCollapseCard cardTitle={'Max Net Sayıları'}>
        <div className="max-net-main">
          {step === 1 && (
            <div>
              <div className="bottom">
                <CustomButton
                  onClick={() => {
                    setStep(2);
                    setUpdateData({});
                  }}
                  type="primary"
                >
                  Yeni
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    setSearchShow(!searchShow);
                  }}
                >
                  <SearchOutlined />
                </CustomButton>
              </div>
              <div style={{ display: searchShow === true ? 'block' : 'none' }}>
                <CustomForm onFinish={filterData} form={form}>
                  <div className=" search-form">
                    <CustomFormItem name="educationYearIds" label="Eğitim Öğretim Yılı">
                      <CustomSelect mode="multiple">
                        {educationYearList?.items?.map((item, index) => (
                          <Option key={index}>
                            {item.startYear}-{item.endYear}
                          </Option>
                        ))}
                      </CustomSelect>
                    </CustomFormItem>
                    <CustomFormItem name="classroomIds" label="Sınıf Seviyesi">
                      <CustomSelect mode="multiple">
                        {allClassList?.map((item, index) => (
                          <Option value={item.id} key={item.index}>
                            {item.name}
                          </Option>
                        ))}
                      </CustomSelect>
                    </CustomFormItem>
                    <CustomFormItem name="isActive" label="Durum">
                      <CustomSelect>
                        <Option value="true">Aktif</Option>
                        <Option value="false">Pasif</Option>
                      </CustomSelect>
                    </CustomFormItem>
                  </div>
                  <div className=" search-form-buttons">
                    <CustomButton
                      onClick={() => {
                        form.resetFields();
                      }}
                    >
                      Temizle
                    </CustomButton>
                    <CustomButton
                      onClick={() => {
                        form.submit();
                      }}
                    >
                      Ara
                    </CustomButton>
                  </div>
                </CustomForm>
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
          )}
          {step === 2 && (
            <div className=" max-net-add">
              <div className="title">
                <div
                  className="max-net-main-button"
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Max Net Sayısı
                </div>
                <ArrowRightOutlined /> <div>Max Net Sayısı {updateData.id ? 'Güncelleme' : 'Ekleme'} </div>
              </div>
              <CustomForm form={formAdd} className="form-add">
                <CustomFormItem required label="Eğitim Öğretim Yılı">
                  <CustomSelect>
                    {educationYearList?.items?.map((item, index) => (
                      <Option key={index}>
                        {item.startYear}-{item.endYear}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
                <CustomFormItem required label="Sınıf Seviyesi">
                  <CustomSelect
                    onChange={(e) => {
                      dispatch(getLessonsQuesiton([{ field: 'classroomId', value: e, compareType: 0 }]));
                    }}
                  >
                    {allClassList?.map((item, index) => (
                      <Option value={item.id} key={item.index}>
                        {item.name}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
                <div>
                  {lessons.map((item, index) => (
                    <div key={index} className=" add-lessons-item">
                      <div className=" lesson-name">{item.name}</div>
                      <CustomFormItem name={item.id} required label="Max Net Sayısı">
                        <CustomInput />
                      </CustomFormItem>
                    </div>
                  ))}
                </div>
              </CustomForm>
              <div className=" bottom-add">
                <CustomButton
                  onClick={() => {
                    setStep(1);
                    setUpdateData({});
                  }}
                >
                  İptal
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    if (updateData.id) {
                      confirmDialog({
                        title: 'Uyarı',
                        message:
                          'Bu işlem kullanıcıların hedef ekranlarındaki verileri etkileyebilir. Max. Net Sayısı Bilgisini Güncellemek İstediğinizden Emin Misiniz?',
                        onCancel: () => {
                          setStep(1);
                          setUpdateData({});
                        },
                        onOk: () => {
                          sumbitAddUpdate();
                        },
                      });
                    } else {
                      sumbitAddUpdate();
                    }
                  }}
                  type="primary"
                >
                  {updateData.id ? 'Güncelle' : 'Ekle'}
                </CustomButton>
              </div>
            </div>
          )}
        </div>
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default MaxNetNumber;
