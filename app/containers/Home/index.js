import { Flex } from 'antd';
import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { useInjectReducer } from '../../utils/injectReducer';
// import { useInjectSaga } from '../../utils/injectSaga';
// import { REDUX_KEY } from '../../utils/constants';
import {
  BannerButton,
  BannerDes,
  BannerDiv,
  BannerImg,
  BannerSingUp,
  BannerSub,
  BannerText,
  BannerTitle,
  SearchButton,
  SubBanner,
  SubBannerDiv,
  TrendingText,
} from './stylesHome';
import HomeBanner from '../../images/home_banner.jpg';
import ShopMen from '../../images/shop_men.jpg';
import ShopWomen from '../../images/shop_women.jpg';
import ShopKid from '../../images/shop_kid.jpg';
import SignUp from '../../images/sign_up.jpg';
import Chuck70Sub from '../../images/Chuck70_sub.jpg';
import ClassicChuckSub from '../../images/classicChuck_sub.jpg';
import ElevationSub from '../../images/elevation_sub.jpg';
import KidSub from '../../images/kids_sub.jpg';
import Chuck70Banner from '../../images/Chuck_70_Seasonal_Banner.jpg';
// const key = REDUX_KEY.register;
const Home = () => {
  // useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });
  // const { t } = useTranslation();
  // const dispatch = useDispatch();
  const history = useHistory();
  const handleShop = () => {
    localStorage.setItem('tab', 1);
    history.push('/shoes/?gender=Men');
  };
  const handleShopFor = data => {
    if (data === 1) {
      localStorage.setItem('tab', data);
      history.push('/shoes/?gender=Men');
    } else if (data === 2) {
      localStorage.setItem('tab', data);
      history.push('/shoes/?gender=Women');
    } else if (data === 3) {
      localStorage.setItem('tab', data);
      history.push('/shoes/?gender=Kid');
    }
  };
  const handleShopTitle = data => {
    if (data === 1) {
      history.push('/shoes/?title=Chuck 70');
    } else if (data === 2) {
      history.push('/shoes/?title=Classic Chuck');
    } else if (data === 3) {
      history.push('/shoes/?title=Elevation');
    } else if (data === 4) {
      history.push('/shoes/?gender=Kid');
    }
  };
  return (
    <>
      <BannerDiv>
        <BannerImg src={HomeBanner} />
        <BannerTitle>
          <BannerText>SEE THE WORLD LIKE WE DO</BannerText>
          <BannerDes>
            For these skateboarders, every pool, curb, and rail is a place to
            play, fall, and succeed. And they do it all in Converse.
          </BannerDes>
          <BannerButton>
            <SearchButton onClick={handleShop} type="primary">
              Shop Now
            </SearchButton>
          </BannerButton>
        </BannerTitle>
      </BannerDiv>
      <TrendingText>Trending Styles</TrendingText>
      <Flex justify="space-around">
        <SubBannerDiv>
          <SubBanner src={Chuck70Sub} onClick={() => handleShopTitle(1)} />
        </SubBannerDiv>
        <SubBannerDiv>
          <SubBanner src={ClassicChuckSub} onClick={() => handleShopTitle(2)} />
        </SubBannerDiv>
        <SubBannerDiv>
          <SubBanner src={ElevationSub} onClick={() => handleShopTitle(3)} />
        </SubBannerDiv>
        <SubBannerDiv>
          <SubBanner src={KidSub} onClick={() => handleShopTitle(4)} />
        </SubBannerDiv>
      </Flex>
      <BannerSub>
        <BannerImg src={Chuck70Banner} />
      </BannerSub>
      <Flex justify="space-around">
        <SubBannerDiv>
          <SubBanner src={ShopMen} onClick={() => handleShopFor(1)} />
        </SubBannerDiv>
        <SubBannerDiv>
          <SubBanner src={ShopWomen} onClick={() => handleShopFor(2)} />
        </SubBannerDiv>
        <SubBannerDiv>
          <SubBanner src={ShopKid} onClick={() => handleShopFor(3)} />
        </SubBannerDiv>
      </Flex>
      <BannerSingUp>
        <BannerImg src={SignUp} onClick={() => history.push('/register')} />
      </BannerSingUp>
    </>
  );
};
export default Home;
