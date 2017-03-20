#!/usr/bin/env node

let fsExtra = require('fs-extra');
let path = require('path');

console.log('Adding icon to drawable');

fsExtra.ensureDirSync(path.join('../platforms/android/res/drawable'));

fsExtra.copySync(path.join('./scripts/icon.png'), path.join('./platforms/android/res/drawable/icon.png'));