import { Dimensions} from 'react-native';

export const {height: SCREEN_HEIGHT} = Dimensions.get('window');
export const {height: FULL_SCREEN_HEIGHT} = Dimensions.get('screen');
export const {width: SCREEN_WIDTH} = Dimensions.get('window');


export const tvScreen = SCREEN_HEIGHT < SCREEN_WIDTH;