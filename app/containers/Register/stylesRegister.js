import styled from 'styled-components';
import { Button } from 'antd';

export const BannerImg = styled.img`
  width: 100%;
`;
export const BannerDiv = styled.div`
  position: relative;
  margin-bottom: 28px;
`;

export const BannerTitle = styled.div`
  position: absolute;
  top: 0;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const BannerText = styled.div`
  font-size: 30px;
  font-weight: 600;
`;
export const BannerDes = styled.div`
  font-size: 15px;
  max-width: 490px;
  text-align: center;
`;
export const MemberBenefit = styled.div`
  border-left: 1px solid #e5e5e5;
  padding: 0px 40px;
  max-width: 35%;
  max-height: 300px;
`;
export const MemberBenefitTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 21px;
`;
export const MemberBenefitDes = styled.div`
  margin-bottom: 10px;
`;
export const MemberBenefitList = styled.div``;
export const MemberBenefitItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
export const MemberBenefitItemImg = styled.img`
  width: 40px;
  margin-right: 10px;
`;
export const MemberBenefitItemText = styled.div`
  color: #757575;
`;
export const RegisterButton = styled(Button)`
  width: 100%;
  background: black;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
