import { Tag, Tooltip } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from '../../../components';
import { DownloadOutlined } from '@ant-design/icons';
import { downloadFile } from '../../../store/slice/fileSlice';
import VideoWatchModal from '../../../components/videoPlayer/VideoWatchModal';

const ShowVideoGeneralInformation = () => {
  const dispatch = useDispatch();
  const { currentVideo } = useSelector((state) => state?.videos);

  const download = (file) => {
    dispatch(downloadFile(file));
  };
  const marks = {};

  currentVideo?.lessonSubSubjects.map((item) => {
    const bracket = item.bracketTime?.replace(':', '.') * 100;
    marks[bracket] = (
      <Tooltip title={item.lessonSubSubject?.name}>
        <span className="ant-slider-dot"></span>
      </Tooltip>
    );
  });

  return (
    <div>
      <ul className="list">
        <li>
          Video Adı: <span>{currentVideo?.kalturaVideoName}</span>
        </li>
        <li>
          Video Kategorisi: <span>{currentVideo?.categoryOfVideo?.name}</span>
        </li>
        <li>
          Sınıf Seviyesi: <span>{currentVideo?.classroom?.name}</span>
        </li>
        <li>
          Ders: <span>{currentVideo?.lesson?.name}</span>
        </li>
        <li>
          Ünite: <span>{currentVideo?.lessonUnit?.name}</span>
        </li>
        <li>
          Konu: <span>{currentVideo?.lessonSubject?.name}</span>
        </li>
        <li>
          Alt Başlık:{' '}
          <span>
            {currentVideo?.lessonSubSubjects?.map((item, id) => {
              return (
                <Tag className="m-1" color="gold" key={id}>
                  {item.lessonSubSubject.name}
                </Tag>
              );
            })}
          </span>
        </li>
        <li style={{ height: 'auto' }}>
          Video Metni: <div className="content-text" dangerouslySetInnerHTML={{ __html: currentVideo?.text }}></div>
        </li>
        <li>
          Video:{' '}
          <VideoWatchModal
            marks={marks}
            name={currentVideo?.kalturaVideoName}
            kalturaVideoId={currentVideo?.kalturaVideoId}
          />
        </li>
        <li>
          Intro Video:{' '}
          <VideoWatchModal
            name={currentVideo?.introVideo?.name}
            kalturaVideoId={currentVideo?.introVideo?.kalturaIntroVideoId}
          />
        </li>
        <li>
          Ayraçlar:{' '}
          <span>
            {currentVideo?.lessonSubSubjects?.map((item, id) => {
              return (
                <Tag className="m-1" color="magenta" key={id}>
                  {item?.bracketTime} {'=>'} {item?.lessonSubSubject?.name}
                </Tag>
              );
            })}
          </span>
        </li>
        <li>
          Anket:{' '}
          <span>
            {currentVideo?.afterEducationSurvey
              ? 'Eğitim Sonunda'
              : currentVideo?.beforeEducationSurvey
              ? 'Eğitim Başında'
              : 'Yok'}
          </span>
        </li>

        <li>
          Anket Kategorisi: <span>{currentVideo?.form?.categoryOfForm?.name || 'Anket Eklenmedi'}</span>
        </li>

        <li>
          Anket: <span>{currentVideo?.form?.name || 'Anket Eklenmedi'}</span>
        </li>

        <li>
          Anahtar Kelimeler:{' '}
          <span>
            {currentVideo?.keyWords?.split(',').map((item, id) => {
              return (
                <Tag className="m-1" color="cyan" key={id}>
                  {item}
                </Tag>
              );
            })}
          </span>
        </li>

        <li>
          Durum:{' '}
          <span>
            {currentVideo.isActive ? (
              <Tag color="green" key={1}>
                Aktif
              </Tag>
            ) : (
              <Tag color="red" key={2}>
                Pasif
              </Tag>
            )}
          </span>
        </li>
        <li>
          Bağlantı-Dosya:{' '}
          <span>
            {!!currentVideo?.videoAttachmentsResponse.length
              ? currentVideo?.videoAttachmentsResponse?.map((item, id) => {
                  return (
                    <Tag className="m-1" color="geekblue" key={id}>
                      {item?.url ? (
                        <>
                          {item?.time + ' => '}
                          <a href={item?.url} target="_blank" rel="noreferrer">
                            {item?.url}
                          </a>
                        </>
                      ) : (
                        <>
                          {item?.time + ' => ' + item?.file?.fileName}
                          <CustomButton
                            onClick={() => download(item?.file)}
                            icon={<DownloadOutlined style={{ fontSize: '13px', height: '13' }} />}
                            type="link"
                            height="15"
                          ></CustomButton>
                        </>
                      )}
                    </Tag>
                  );
                })
              : 'Yok'}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ShowVideoGeneralInformation;
