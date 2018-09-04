const BPromise = require('../lib/BDuckPromise')


const p = new BPromise((resolve) => {
  // setTimeout(() => {
    resolve(1)
  // }, 3000)
})
let p1 =
setTimeout(() => {
 p1= p.then(value => {
    console.log(value)
    // return value + 1
    return new BPromise(resolve => {
      // setTimeout(() => {
        resolve(9)
      // }, 3000)
    })
  })
}, 1000)


setTimeout(() => {
  p1.then(value => {
    console.log(value)
  })
}, 5000);