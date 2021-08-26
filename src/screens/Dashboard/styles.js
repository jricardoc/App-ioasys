import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';



export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(18)}px;

    background-color: #247BA0;

    justify-content: center;
    align-items: flex-start;
    flex-direction: row;

    padding-top: ${Platform.OS === 'ios' ? 0 : 26}px;
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    margin-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + RFValue(28) : RFValue(28)}px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;

    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;
`;

export const UserGreeting = styled.Text`
    font-size: ${RFValue(14)}px;
    color:#FEFDFF;
`;

export const UserName = styled.Text`
    font-size: ${RFValue(18)}px;
    color:#FEFDFF;
    font-weight: bold;

`;

export const LogoutButton = styled.View`

`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(24)}px;
    color:#FEFDFF;
`;
