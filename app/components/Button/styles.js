import styled from 'styled-components';
import { Button } from 'antd';

export const ButtonCustom = styled(Button)`
  width: ${props => props.theme.buttonStyle.width};
  color: ${props => props.theme.buttonStyle.color};
  background: ${props => props.theme.buttonStyle.background};
  border: ${props => props.theme.buttonStyle.border};

  :hover {
    color: ${props => props.theme.buttonStyle.hoverColor};
    background: ${props => props.theme.buttonStyle.hoverBackground};
    border: ${props => props.theme.buttonStyle.hoverBorder};
  }

  :focus {
    color: ${props => props.theme.buttonStyle.focusColor};
    background: ${props => props.theme.buttonStyle.focusBackground};
    border: ${props => props.theme.buttonStyle.focusBorder};
  }
`;
export const ButtonExit = styled(Button)`
  height: ${props => props.theme.buttonStyle.height};
  color: ${props => props.theme.buttonStyle.color};
`;
export const ButtonSave = styled(Button)`
  background: ${props => props.theme.buttonStyle.background};
  color: ${props => props.theme.buttonStyle.color};
  height: ${props => props.theme.buttonStyle.height};
  width: ${props => props.theme.buttonStyle.width};
`;
