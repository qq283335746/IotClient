ubuntu environment:
/etc/environment

root权限：
sudo -s
rm -r ionic

官方：install nodejs:
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
源文件安装的node, 卸载方式：首先cd到解压后到目录：
sudo make uninstall

node：
sudo npm uninstall npm -g
sudo apt-get remove nodejs

https://nodejs.org/en/download/
解压缩.tar.xz:
xz -d node-v6.10.1-linux-x64.tar.xz
tar -xvf node-v6.10.1-linux-x64.tar
tar xvJf node-v10.14.2-linux-x64.tar.xz

ln -s /home/tygasoft/ProgramFiles/node-v10.14.2-linux-x64/bin/node /usr/local/bin/node
ln -s /home/tygasoft/ProgramFiles/node-v10.14.2-linux-x64/bin/npm /usr/local/bin/npm
ln -s /home/tygasoft/ProgramFiles/node-v10.14.2-linux-x64/bin/ionic /usr/local/bin/ionic

npm uninstall -g ionic
npm cache clean
npm i -g ionic@latest

npm install
npm install -g ionic cordova
ionic serve

ionic generate
ionic g page pages/xxx
ionic g component components/xxx --export
ionic g service services/xxx

ionic v4 docs:
https://beta.ionicframework.com/docs

https://www.joshmorony.com/topics/ionic-tutorials/

ionic capacitor build:
ionic build --prod
npm install --save @capacitor/core @capacitor/cli
npx cap init [appName][appid]
ionic capacitor add android
ionic capacitor copy android
ionic capacitor open android
ionic capacitor sync android

ionic cordova build:
https://ionicframework.com/docs/intro/deploying/

docs:
https://beta.ionicframework.com/docs/building/android

https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/ --android

https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/ --ios

storage:
https://beta.ionicframework.com/docs/building/storage/

angular v6 docs:
https://v6.angular.io/docs

https://angular.io/guide/router

samples:
https://devdactic.com/ionic-4-login-angular/

android studio:
https://developer.android.google.cn/studio/

setRoot page:
<ion-button href="/support" routerDirection="root">
NavController：this.navCtrl.navigateRoot('/support');
this.navCtrl.goRoot('/intro')
this.navCtrl.navigateForward('/route')
this.navCtrl.navigateBack('/route')
https://www.joshmorony.com/converting-ionic-3-push-pop-navigation-to-angular-routing-in-ionic-4/

Adding Background Geolocation to an Ionic 2 & 3 Application：
https://www.joshmorony.com/adding-background-geolocation-to-an-ionic-2-application/
