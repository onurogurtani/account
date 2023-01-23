import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import '../../styles/components/customVideoPlayer.scss';
import { Col, Row, Button, Popover, List, Tooltip, Spin } from 'antd';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import {
  middleControlButton,
  rowStyle,
  labelStyle,
  speedButton,
  rowHeaderStyle,
} from '../../constants/videoPlayer/styles';
import { speeds } from '../../constants/videoPlayer/speeds';
import CustomSlider from './VideoSlider';

import volumeOn from '../../assets/icons/icon-volume-on.svg';
import volumeOff from '../../assets/icons/icon-volume-off.svg';
import start from '../../assets/icons/icon-start.svg';
import pause from '../../assets/icons/icon-pause.svg';
import expand from '../../assets/icons/icon-expand.svg';
import miniPlayer from '../../assets/icons/icon-mini-player.svg';
import stepForward from '../../assets/icons/icon-step-forward.svg';
import CustomImage from '../CustomImage';
import CustomButton from '../CustomButton';

let count = 0;
const CustomVideoPlayer = (props) => {
  const ref = React.createRef();
  const controlsRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [speed, setSpeed] = useState('1x');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [played, setPlayed] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [buffer, setBuffer] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [volume, setVolume] = useState(10);

  const [pip, setPip] = useState(false);
  const handle = useFullScreenHandle();

  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 32) {
        e.preventDefault();
        controlsRef.current.style.display = 'flex';
        setPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler, false);
    return () => window.removeEventListener('keydown', handler, false);
  }, []);

  const playVideo = () => {
    setPlaying(!playing);
  };

  const mutedVideo = () => {
    setMuted(!muted);
  };

  const changeSpeed = (text, value) => {
    setSpeed(text);
    setPlaybackRate(value);
  };

  const fullScreen = () => {
    handle.active ? handle.exit() : handle.enter();
  };

  const handleEnablePIP = () => {
    setPip(true);
  };

  const handleDisablePIP = () => {
    setPip(false);
  };

  const sliderChange = (value) => {
    ref.current.seekTo(value / videoTime);
    setPlayed(value);
  };

  const pauseIcon = <CustomImage src={pause} style={middleControlButton} className="controls-icon" />;

  const playIcon = <CustomImage src={start} style={middleControlButton} className="controls-icon" />;

  const content = (
    <List
      renderItem={(item) => (
        <List.Item>
          <Button onClick={() => changeSpeed(item.value, item.speed)} type="link">
            {item.value}
          </Button>
        </List.Item>
      )}
      dataSource={speeds}
      split={false}
    ></List>
  );
  const handleEnded = () => {
    setPlaying(false);
  };

  const handleMouseMove = () => {
    controlsRef.current.style.display = 'flex';
    count = 0;
  };
  const formatter = (value) => props?.marks?.[value]?.label;

  function format(seconds) {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
  }

  function pad(string) {
    return ('0' + string).slice(-2);
  }

  const onProgress = (progress) => {
    setPlayed(progress.playedSeconds);

    if (progress.loadedSeconds > 0) {
      !isReady && setIsReady(true);
    }

    if (count > 15) {
      controlsRef.current.style.display = 'none';
      count = 0;
    }

    if (controlsRef.current.style.display === 'flex') {
      count += 1;
    }
  };
  const bufferStartHandler = () => {
    setBuffer(false);
  };

  const bufferEndHandler = () => {
    setBuffer(true);
  };

  const onPlayerWrapperClick = () => {
    handleMouseMove();
    playVideo();
  };
  const volumeChange = (value) => {
    setVolume(value);
    // setMuted(Number(value) === 0 ? true : false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={onPlayerWrapperClick}
      style={{ position: 'relative' }}
      className="player-wrapper"
    >
      <FullScreen handle={handle}>
        <ReactPlayer
          className="react-player"
          width={'100%'}
          height={'100%'}
          ref={ref}
          progressInterval={100}
          volume={volume / 100}
          muted={muted}
          playing={playing}
          pip={pip}
          url={props.url}
          onDisablePIP={handleDisablePIP}
          playbackRate={playbackRate}
          onEnded={handleEnded}
          onBuffer={bufferStartHandler}
          onBufferEnd={bufferEndHandler}
          onDuration={(duration) => setVideoTime(duration)}
          onProgress={onProgress}
        />
        <div className="loading-wrapper">{(!buffer || !isReady) && <Spin />}</div>
        <div className="controls-wrapper" ref={controlsRef}>
          <Row style={rowHeaderStyle}>
            <Col>
              <label style={labelStyle}>{props.name}</label>
            </Col>
          </Row>
          <Row style={{ flex: 1 }}></Row>
          <Row
            style={rowStyle}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Col>
              <Tooltip placement="top" title={!playing ? 'Oynat' : 'Durdur'}>
                <CustomButton
                  onClick={playVideo}
                  icon={playing ? pauseIcon : playIcon}
                  height="15px"
                  type="link"
                ></CustomButton>
              </Tooltip>
            </Col>
            <Col>
              <CustomButton
                icon={<CustomImage className="controls-icon" src={stepForward} />}
                height="15px"
                type="link"
              ></CustomButton>
            </Col>
            <Col>
              <CustomButton
                icon={<CustomImage className="controls-icon" src={muted ? volumeOn : volumeOff} />}
                height="15px"
                type="link"
                onClick={mutedVideo}
              ></CustomButton>
            </Col>
            <Col>
              <CustomSlider onChange={volumeChange} value={volume} style={{ width: '50px' }} />
            </Col>
            <Col style={{ marginTop: '4px', color: 'white', paddingLeft: '6px' }}>
              {format(played)} / {format(videoTime)}
            </Col>
            <Col style={{ paddingLeft: '6px', flex: 1 }}>
              <CustomSlider
                onChange={sliderChange}
                value={played}
                step={parseFloat(videoTime / 100)}
                min={0}
                max={videoTime}
                marks={props.marks}
                tipFormatter={formatter}
                tooltipVisible={false}
              />
            </Col>
            <Col>
              <Tooltip placement="top" title="Tam Ekran">
                <CustomButton
                  icon={<CustomImage className="controls-icon" src={expand} />}
                  height="15px"
                  type="link"
                  onKeyDown={(e) => e.preventDefault()}
                  onClick={fullScreen}
                ></CustomButton>
              </Tooltip>
            </Col>
            <Col>
              <Tooltip placement="top" title="Mini Oynatıcı">
                <CustomButton
                  icon={<CustomImage className="controls-icon" src={miniPlayer} />}
                  height="15px"
                  type="link"
                  onClick={handleEnablePIP}
                ></CustomButton>
              </Tooltip>
            </Col>
            <Col>
              <Popover overlayClassName="speedOverlay" content={content}>
                <Button size="small" style={speedButton} type={'text'} shape="circle">
                  {speed}
                </Button>
              </Popover>
            </Col>
          </Row>
        </div>
      </FullScreen>
    </div>
  );
};

export default CustomVideoPlayer;
