export function Bound(proto: any, key: string, desc: { value?: any, get?: any, writable?: boolean }) {
  const orig = desc.value;
  desc.get = function(this: any) {
    Object.defineProperty(this, key, { value: orig.bind(this), enumerable: false, configurable: true, writable: false });
    return this[key];
  };
  delete desc.value;
  delete desc.writable;
}
