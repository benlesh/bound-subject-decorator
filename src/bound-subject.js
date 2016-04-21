export function boundSubject(target, name, descriptor) {
  const { initializer } = descriptor;
  const monkeyedInitializer = () => {
    let value = initializer();
    bindMethod(value, 'next');
    bindMethod(value, 'error');
    bindMethod(value, 'complete');
    return value;
  };

  return {
    configurable: true,
    enumerable: false,
    writable: false,
    initializer: monkeyedInitializer
  };
}

function bindMethod(instance, methodName) {
  if (typeof instance[methodName] === 'function') {
    instance[methodName] = instance[methodName].bind(instance);
  }
}
