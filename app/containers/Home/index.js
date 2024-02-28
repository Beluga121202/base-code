import { Flex } from 'antd';
import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { useInjectReducer } from '../../utils/injectReducer';
// import { useInjectSaga } from '../../utils/injectSaga';
// import { REDUX_KEY } from '../../utils/constants';
import {
  BannerButton,
  BannerDes,
  BannerDiv,
  BannerImg,
  BannerSingUp,
  BannerText,
  BannerTitle,
  SearchButton,
  SubBanner,
  SubBannerDiv,
} from './stylesHome';
import HomeBanner from '../../images/home_banner.jpg';
import ShopMen from '../../images/shop_men.jpg';
import ShopWomen from '../../images/shop_women.jpg';
import ShopKid from '../../images/shop_kid.jpg';
import SignUp from '../../images/sign_up.jpg';
// const key = REDUX_KEY.register;
const Home = () => {
  // useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });
  // const { t } = useTranslation();
  // const dispatch = useDispatch();
  // const history = useHistory();
  const handleShop = () => {
    console.log('hehe');
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
      <Flex justify="space-around">
        <SubBannerDiv>
          <SubBanner src={ShopMen} />
        </SubBannerDiv>
        <SubBannerDiv>
          <SubBanner src={ShopWomen} />
        </SubBannerDiv>
        <SubBannerDiv>
          <SubBanner src={ShopKid} />
        </SubBannerDiv>
      </Flex>
      <BannerSingUp>
        <BannerImg src={SignUp} />
      </BannerSingUp>
    </>
  );
};
export default Home;
