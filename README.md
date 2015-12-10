cu-patcher-ui
=============

> Camelot Unchained Patcher UI

---
*Notice: This library is currently under heavy development and is not guaranteed to be in a working state as this time.  This notice will be removed when the library is stable.*

Installation
------------
##### 1. clone this repository
```
git clone https://github.com/CUModSquad/cu-patcher-ui.git
```
##### 2. install npm packages
```
npm install
```


Build
-----

#### Gulp Tasks

##### default
*build & watch directory for changes*
```
gulp
```
##### build
*build the ui once*
```
gulp build
```

##### server
*load the `dist` folder into a local server to view in browser*
```
gulp server
```

##### --server
*run server command as part of default task*
```
gulp --server
```

A full list of commands and arguments can be found **[here](https://github.com/csegames/cu-build-tools#modulelibrary---builder)**

#### Changing Build & Publish Directories

You can override the configuration specified in `cu-build.config.js` by creating a file called `user-cu-build.config.js`

If you wanted to change the build directory from `dist` to `build` you could add the following to your user configuration:

```js
// add configuration here to override cu-build.config.js
module.exports = {
  bundle: {
    dest: 'build'
  }
};

```


Software Requirements
---------------------
- Git
- NodeJs 4
- NPM 3.3.x
