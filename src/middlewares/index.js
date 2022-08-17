/**
 * 1. Cada vez que se dispare una acción, pueda obtener la info de dicha accion y loggearla
 */
/**curry function example
function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
 */
export const logger = (store)  => (next) => (action) => {
    console.log(action)
    //Next manda el action al reducer
    next(action)
}
export const featuring = (store)  => (next) => (action) => {
    const featured = [{name: 'eddie'}, ...action.action.payload]
    const updatedAction = {
        ...action, 
        action : {...action.action, payload: featured}        
    }
    //Next manda el action al reducer
    next(updatedAction)
}

