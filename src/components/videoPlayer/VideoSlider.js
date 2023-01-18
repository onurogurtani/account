import { Slider } from 'antd';
import styled from 'styled-components';

const SliderComponent = styled(Slider)(
  () => `
  margin-bottom: 0;
  .ant-slider {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum', "tnum";
    position: relative;
    height: 12px;
    margin: 10px 6px 10px;
    padding: 4px 0;
    cursor: pointer;
    touch-action: none;
}

.ant-slider-handle {
    position: absolute;
    width: 14px;
    height: 14px;
    margin-top: -5px;
    background-color: #B533F2;
    border: #fff;
    border-radius: 50%;
    box-shadow: 0;
    cursor: pointer;
    transition: border-color 0.3s, box-shadow 0.6s, transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.ant-slider-step {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
    pointer-events: none;
}

.ant-slider-track {
    position: absolute;
    height: 4px;
    background-color:#B533F2;
    border-radius: 2px;
    transition: background-color 0.3s;
}
.ant-slider-rail {
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: #f5f5f5;
    border-radius: 2px;
    transition: background-color 0.3s;
}
.ant-slider-mark {
    top: 4px;
    left: -4px;
}

`,
);

const VideoSlider = ({ ...props }) => {
  return <SliderComponent min={props.min} max={props.max} marks={props.marks} {...props} />;
};

export default VideoSlider;
