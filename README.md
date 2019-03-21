# dva-dispatcher
A dva dispatch enhancement tool

## install

```bash
$ npm install --save dva-dispatcher
```
or
```bash
$ yarn add dva-dispatcher
```

## use in dva

在dva项目路口文件中注册dispatcher

```js
import dva from 'dva'
import { setStore } from 'dva-dispatcher'
const app = dva()
setStore(app._store)
```

假设我们有user model定义如下
```js
export default {
  namespace: 'user',
  state: {
    userInfo: {},
  },
  effects: {
    *getInfo() {}
  },
}
```

在user组件中触发action，我们无需通过connect链接dispatch
```js
import dispatcher from 'dva-dispatcher'

class User extends PureComponent {
  componentDidMount() {
    dispatcher.user.getInfo(payload, meta, error)
      .then()
      .catch()
  }

  render() {
    ...
  }
}
```

## use in umi

在umi项目中的全局入口文件src/app.js中加入
```js
import { setStore } from 'dva-dispatcher'

setStore(window.g_app._store)
```

其他方法同dva
