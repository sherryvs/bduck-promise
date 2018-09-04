### 安装
```shell
npm install bduck-promise
```

### 使用
```js

const BPromise = require('bduck-promise')

const p = new BPromise((resolve) => {
  resolve(1)
})

setTimeout(() => {
  p.then(value => {
    console.log(value) // 1
    return new BPromise(resolve => {
      resolve(value + 8)
    })
  })
  .then((value => {
    console.log(value) // 9
  }))
}, 1000)


```