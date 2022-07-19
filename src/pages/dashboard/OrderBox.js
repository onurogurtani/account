import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import SwiperCore, { Navigation } from 'swiper';
import { ResponseImage, Text } from '../../components';
import sliderDesktop from '../../assets/images/dashboard/slider/slider.desktop.webp';
import sliderTablet from '../../assets/images/dashboard/slider/slider.tablet.webp';
import sliderMobil from '../../assets/images/dashboard/slider/slider.mobil.webp';

const SwiperBox = styled(Swiper)(
  ({ boxheight }) => ` 
  height: ${boxheight}px;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #006a6d;
  
  .swiper-button-prev, .swiper-button-next{
    color: #ffffff;
  }

  .swiper-button-prev:after, .swiper-button-next:after{
    font-size: 22px;
  }
`,
);

const SliderItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 21px 20px 0 20px;

  div:nth-child(2) {
    display: grid;
    margin-left: 25px;
  }

  .title {
    font-size: 22px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.3px;
    font-stretch: normal;
    font-style: normal;
    color: #fff;
  }

  .mount {
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.92;
    letter-spacing: normal;
    color: #cefcff;
  }

  @media (max-width: 767.98px) {
    .title {
      font-size: 18px;
    }

    .mount {
      font-size: 20px;
    }
  }
`;

SwiperCore.use([Navigation]);

const OrderBox = ({ boxHeight }) => {
  return (
    <SwiperBox navigation={true} boxheight={boxHeight}>
      <SwiperSlide>
        <SliderItem>
          <div>
            <ResponseImage
              desktopImage={boxHeight === 165 ? sliderTablet : sliderDesktop}
              tabletImage={boxHeight === 165 ? sliderTablet : sliderMobil}
              mobilImage={sliderMobil}
            />
          </div>
          <div>
            <span className="title">
              <Text t="orderAmountThisMounth" />
            </span>
            <span className="mount">6.947,50₺</span>
          </div>
        </SliderItem>
      </SwiperSlide>
      <SwiperSlide>
        <SliderItem>
          <div>
            <ResponseImage
              desktopImage={boxHeight === 165 ? sliderTablet : sliderDesktop}
              tabletImage={boxHeight === 165 ? sliderTablet : sliderMobil}
              mobilImage={sliderMobil}
            />
          </div>
          <div>
            <span className="title">
              {' '}
              <Text t="orderAmountThisMounth" />
            </span>
            <span className="mount">6.947,50₺</span>
          </div>
        </SliderItem>
      </SwiperSlide>
    </SwiperBox>
  );
};

export default OrderBox;
