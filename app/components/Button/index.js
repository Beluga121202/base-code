import React from 'react';
import { ButtonCustom, ButtonExit, ButtonSave } from './styles';

const Button = props => <ButtonCustom {...props} />;
const ButtonCloseModal = props => <ButtonExit {...props} />;
const ButtonSaveModal = props => <ButtonSave {...props} />;
export { Button, ButtonCloseModal, ButtonSaveModal };
