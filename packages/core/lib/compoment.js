export default class Component {
  _vNode = null;

  _id = 0;

  constructor(props, children) {
    this.updatePropsAndChildren(props, children);
    this.updateChildren(children);
  }

  updatePropsAndChildren(props, children) {}

  h(stringArr, ...values) {}

  render() {}

  dispose() {}
}
Component.plugins = new Set();
