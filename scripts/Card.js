// [X] Utiliza os dados do cartão, texto e link para a imagem
// [X] Um seletor de elementos de template como parâmetros para o construtor.
// [X] Possui métodos privados para trabalhar com marcação e adicionar ouvintes de eventos.
// [X] Possui métodos privados para cada manipulador de eventos.
// [X] Possui um método público que devolve o elemento do cartão totalmente funcional, preenchido com dados.

import { handleModalFig, setModalFig } from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._image = data.link;
    this._title = data.name;
    this._imageSelector = `${this._cardSelector}__image`;
    this._titleSelector = `${this._cardSelector}__title`;
    this._trashSelector = `${this._cardSelector}__trash`;
    this._likeSelector = `${this._cardSelector}__like`;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("template")
      .content.querySelector(this._cardSelector)
      .cloneNode(true);

    return cardElement;
  }
  _handleImageClickEvent() {
    setModalFig({
      image: this._image,
      title: this._title,
    });
    handleModalFig();
  }

  _handleLikeEvent(evt) {
    // .cardSelector__like => cardSelector__like
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
      this._handleImageClickEvent();
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
