import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import CustomModal from '../CustomModal';
import CustomVideoPlayer from './CustomVideoPlayer';

const VideoWatchModal = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CustomButton className={props.className} onClick={() => setOpen(!open)} height="15px">
        Önizle
      </CustomButton>

      <CustomModal
        title="Önizle"
        visible={open}
        footer={false}
        onCancel={() => {
          setOpen(false);
        }}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
        width={700}
      >
        <CustomVideoPlayer
          url={`https://trkcll-dijital-dersane-demo.ercdn.net/${props.kalturaVideoId}.smil/playlist.m3u8`}
          marks={props?.marks}
          name={props.name}
        />
      </CustomModal>
    </>
  );
};

export default VideoWatchModal;
