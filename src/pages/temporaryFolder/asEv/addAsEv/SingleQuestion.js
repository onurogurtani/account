import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBase64 } from '../../../../store/slice/fileSlice';
import '../../../../styles/temporaryFile/asEvSwiper.scss';

const SingleQuestion = ({ id, index }) => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const getImage = async () => {
    let response = await dispatch(getBase64({ id: id }));
    let data = response.payload.data;
    const imageUrl = `data:${data?.contentType};base64,${data?.file}`;
    setUrl(imageUrl);
  };
  useEffect(() => {
    getImage();
  }, [dispatch]);

  return (
    <div
      style={{
        width: '100%',
        height: '750px',
        display: 'flex',
        border: '2px solid black',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: '5px',
        padding: '5px',
        margin: '0',
      }}
      className="single-image-container"
    >
      <img src={url} alt="Soru Resmi" width={'100%'} height={'100%'} key={id} />
    </div>
  );
};

export default SingleQuestion;
