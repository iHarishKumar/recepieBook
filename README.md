# recepieBook
Android app on Ionic framework (Ionic v3)

### Prerequisites

* Node with npm
* Ionic v3
* Cordova

### Installation
Navigate to the folder where *package.json* is present and run the following command:

`npm install`

### Android/Ios build
Before building it for specific platform, we need to add those platforms to the project. 
Following the command to add platform/s to the project:

`ionic cordova platform add android/ios`

To build for android/ios, run the following command:

`ionic cordova build android/ios`

If you have Android Studio/ XCode, then follow this page for loading this project into it:
https://cordova.apache.org/docs/en/latest/guide/platforms/android/#debugging (Android)
https://cordova.apache.org/docs/en/9.x/guide/platforms/ios/#debugging (IOS)

If you don't have Android Studio/Xcode, then follow the command to deploy on your mobile:

`ionic cordova run android/ios`

If you have emulators, then use following commands to emulate on specific platform:

`ionic cordova emulate android/ios`

**Note**:
I know the spelling is wrong, this was intentional!

