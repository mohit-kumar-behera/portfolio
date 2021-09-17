export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  render(data) {}
}
