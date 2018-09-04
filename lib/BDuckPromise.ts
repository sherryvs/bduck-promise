enum STATE {
  PENDING = 0,
  FULFILLED = 1,
  REJECTED = 2
}

function BDuckPromise(fn: (resolve:(value: any) => void, reject: (reason: any) => void) => any) {
  let store:any = null,
    state = STATE.PENDING,
    callbacks:any = []


  function resolve(value: any): void {
    setTimeout(() => {
      state = STATE.FULFILLED;
      // value 是一个Promise对象
      if(value && 'object' === typeof value && value.then && 'function' === typeof value.then) {
        // do then
        value.then(resolve, reject)
        return
      }
      // value 不是Promise对象
      store = value;
      callbacks.forEach(callback => {
        if(callback.onfulfilled && 'function' === typeof callback.onfulfilled) {
          const ret = callback.onfulfilled(store)
          callback._resolve(ret)
        }
      })
      callbacks = []
    })
  }
  
  function reject(reason: any): void {
    setTimeout(() => {
      state = STATE.REJECTED;
      // value 是一个Promise对象
      if(reason && 'object' === typeof reason && reason.then && 'function' === typeof reason.then) {
        reason.then(resolve, reject)
        return
      }
      // value 不是Promise对象
      store = reason;
      callbacks.forEach(callback => {
        if(callback.onrejected && 'function' === typeof callback.onrejected) {
          const ret = callback.onrejected(store)
          callback._reject(ret)
        }
      })
      callbacks = []
    }, 0)
  }

  this.then = (onfulfilled, onrejected) => {
    return new BDuckPromise((_resolve, _reject) => {
      if(state === STATE.PENDING) {
        callbacks.push({
          onfulfilled,
          onrejected,
          _resolve,
          _reject
        })
        return
      }
  
      if(state === STATE.FULFILLED) {
        const ret = onfulfilled(store)
        _resolve(ret)
        return
      }
  
      if(state === STATE.REJECTED) {
        const ret = onrejected(store)
        _reject(ret)
        return
      }
    });
  }

  fn(resolve, reject)
}




export default BDuckPromise;
module.exports = BDuckPromise



// let p = new Promise((resolve, reject) => {
//   resolve(1)
// })


// onfulfilled
// onrejected
// p.then(value => {

// }, reason => {
  
// })