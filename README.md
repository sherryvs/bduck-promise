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

### [实现教程](https://zheng-chuang.gitee.io/blog/js/%E8%87%AA%E5%B7%B1%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAPromise%E5%BA%93.html)
### [博客园地址(更稳定)](https://zheng-chuang.gitee.io/blog/js/%E8%87%AA%E5%B7%B1%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAPromise%E5%BA%93.html)
