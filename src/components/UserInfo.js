export default class UserInfo {
  constructor({ titleSelector, subtitleSelector }) {
    this._title = document.querySelector(titleSelector);
    this._subtitle = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    this._formValues = {
      title: this._title.textContent,
      subtitle: this._subtitle.textContent,
    };
    return this._formValues;
  }

  setUserInfo(data) {
    this._title.textContent = data.title;
    this._subtitle.textContent = data.subtitle;
  }
}
