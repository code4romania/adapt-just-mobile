import { ScaledSheet } from 'react-native-size-matters/extend';

const style = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: '24@s',
  },
  content: {
    flex: 1,
    marginTop: '30@vs',
    marginBottom: '20@vs',
  },
  title: {
    marginTop: '30@vs',
  },
  subtitle: {
    color: '#333333',
    marginTop: '4@vs',
    fontSize: '14@msr',
    lineHeight: '21@msr',
    textTransform: 'uppercase',
  },
  actionsContainer: {
    marginTop: '5@vs',
    marginBottom: '30@vs',
    paddingHorizontal: '16@s',
  },
});

export default style;
