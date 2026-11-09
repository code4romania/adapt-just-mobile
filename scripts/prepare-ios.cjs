const fs = require('node:fs');
const path = require('node:path');

// Clang in Xcode 26 rejects the old whitespace spelling under Yoga's -Werror.
const yogaHeader = path.join(__dirname, '../node_modules/react-native/ReactCommon/yoga/yoga/YGValue.h');
const yoga = fs.readFileSync(yogaHeader, 'utf8');
const modernYoga = yoga.replace(/operator"" (_pt|_percent)/g, 'operator""$1');
if (modernYoga !== yoga) {
  fs.writeFileSync(yogaHeader, modernYoga);
  console.log('Updated Yoga literal-operator spelling for current Clang.');
}

// The app uses RNFS for attachment downloads. It never calls getFSInfo,
// which would otherwise link disk-capacity APIs into the iOS binary.
const fsManager = path.join(__dirname, '../node_modules/react-native-fs/RNFSManager.m');
const nativeSource = fs.readFileSync(fsManager, 'utf8');
if (nativeSource.includes('RCT_EXPORT_METHOD(getFSInfo:')) {
  const unusedMethod = /^RCT_EXPORT_METHOD\(getFSInfo:[^\n]*\)\n\{\n[\s\S]*?^\}\n\n/m;
  const trimmedSource = nativeSource.replace(unusedMethod, '');
  if (trimmedSource === nativeSource || /NSFileSystem(?:Free)?Size/.test(trimmedSource)) {
    throw new Error('Unexpected RNFS disk-space implementation. Review the iOS patch before building.');
  }
  fs.writeFileSync(fsManager, trimmedSource);
  console.log('Removed the unused RNFS disk-capacity method from iOS.');
}
