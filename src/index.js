import "proxy-polyfill";

let _store = null;

const actions = {};

function createDispatch(namespace, type) {
  if (_store === null)
    throw new Error("you need be call setDispatch() before call dispatcher");

  if (typeof _store.dispatch !== "function")
    throw new Error("setStore param must be an redux store");

  return function fn(payload, meta, error) {
    return _store.dispatch({
      type: `${namespace}/${type}`,
      payload,
      meta,
      error
    });
  };
}

function createAction(namespace) {
  if (actions[namespace]) return actions[namespace];

  const action = new Proxy(
    {},
    {
      get(target, type) {
        return createDispatch(namespace, type);
      },
      set() {
        throw new Error("Cannot set the actions");
      }
    }
  );

  actions[namespace] = action;

  return action;
}

function isReduxStore(store) {
  return (
    store.hasOwnProperty("dispatch") &&
    store.hasOwnProperty("subscribe") &&
    store.hasOwnProperty("getState")
  );
}

export default new Proxy(
  {},
  {
    get(target, namespace) {
      return createAction(namespace);
    },
    set() {
      throw new Error("Cannot set the dispatcher");
    }
  }
);

export function setStore(store) {
  if (!isReduxStore(store))
    throw new Error("setStore param must be an redux store");
  _store = store;
}
