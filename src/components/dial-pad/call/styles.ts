import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#606060',
    height: '100%',
    paddingVertical: 50,
  },
  calleeContainer: {
    alignItems: 'center',
  },
  calleeText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  calleeAvatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 1
  },
  callTime: {
    color: '#ffffff',
  },
  buttonsContainer: {
    paddingHorizontal: 40,
    height: 80,
  },
  btnContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
});

export default styles;