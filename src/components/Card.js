export default class Card {
  constructor({ data, cardSelector, handleCardClick }) {
    this._cardSelector = cardSelector;
    this._image = data.link;
    this._title = data.name;
    this._imageSelector = `${this._cardSelector}__image`;
    this._titleSelector = `${this._cardSelector}__title`;
    this._trashSelector = `${this._cardSelector}__trash`;
    this._likeSelector = `${this._cardSelector}__like`;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("template")
      .content.querySelector(this._cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeEvent(evt) {
    const classLikeSelector = `${this._likeSelector}`.replace(".", "");
    evt.target.classList.toggle(classLikeSelector + "_clicked");
  }

  _handleTrashEvent(evt) {
    evt.target.parentElement.remove();
  }

  _setEventLikeButton() {
    const likeButton = this._element.querySelector(`${this._likeSelector}`);
    likeButton.addEventListener("click", (evt) => {
      this._handleLikeEvent(evt);
    });
  }

  _setEventImage() {
    const image = this._element.querySelector(`${this._imageSelector}`);
    image.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _setEventTrashButton() {
    const trashButton = this._element.querySelector(`${this._trashSelector}`);
    trashButton.addEventListener("click", (evt) => {
      this._handleTrashEvent(evt);
    });
  }

  _setEventListeners() {
    this._setEventImage();
    this._setEventLikeButton();
    this._setEventTrashButton();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(`${this._imageSelector}`).src = this._image;
    this._element.querySelector(`${this._imageSelector}`).alt = this._title;
    this._element.querySelector(`${this._titleSelector}`).textContent =
      this._title;

    return this._element;
  }
}
