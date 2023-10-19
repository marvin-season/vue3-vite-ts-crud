# Vue 3 + TypeScript + Vite

# yarn & yarn run dev

# others 

**Using ref as much as possiable**
`reactive` is core api in vue， but It has a fatal shortcoming: 'Only suitable for the object'

The `Proxy` api proxy the attr of some obj, but some var like `let a = 1; let b = 'b'` has no attr

The `ref` support both of all， So the `ref` is a more compatible API

Actuall， ref add an attr: value, this attr has getter and setter