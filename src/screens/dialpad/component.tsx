import { DialPadKeyboard } from '@components/dial-pad/keyboard';
import { View } from 'react-native';
import { Badge } from '@components/common/badge';
import { Wrapper } from '@components/common/wrapper';

export const DialPadScreen = () => {
  return (
    <Wrapper title={'Dialpad'}>
      <View>
        <Badge
          txtAlign={'left'}
          type={'info'}
          text={'NOTE: If you have multiple shops, please select it first on "Profile" tab, to receive proper data processing!'}
          size={'small'}
        />
      </View>
      <DialPadKeyboard />
    </Wrapper>
  );
}