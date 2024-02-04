import { StyleSheet } from 'react-native';
import { color } from 'ansi-fragments';
import { colors } from '@/theme';

const styles = StyleSheet.create({
  buttonContainer: {
    height: 75,
    width: 75,
    alignItems: 'center',
    borderRadius: 75/2,
    marginBottom: 5,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  valueContainer: {
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
    marginTop: 60,
  },
  valueTxt: {
    width: '100%',
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.PRIMARY_TEXT,
  }
});

export default styles;
