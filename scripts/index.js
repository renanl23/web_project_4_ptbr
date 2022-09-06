// import {
//   enableValidation,
//   hideInputError,
//   hasInvalidInput,
//   toggleButtonState,
// } from "./validate.js";

import { FormValidator } from "./FormValidator.js";

import { Card } from "./Card.js";

const formObject = {
  formSelector: ".modal__content",
  inputSelector: ".modal__input-text",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input-text_error",
  errorClass: "modal__input-error_active",
};

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// Formulário
const formElement = document.querySelector(".modal__content");
// Modal Fig
const modalFig = document.querySelector(".modal__fig");

// Entradas
const titleInput = formElement.querySelector("#title");
const subtitleInput = formElement.querySelector("#subtitle");

// Template Elements
const elementsList = document.querySelector(".elements");

function appendElement(cardElement) {
  elementsList.append(cardElement);
}

function prependElement(cardElement) {
  elementsList.prepend(cardElement);
}

function renderElement(card, prepend = false) {
  const element = new Card(card, ".element");
  const cardElement = element.generateCard();
  prepend ? prependElement(cardElement) : appendElement(cardElement);
}

function updateElements(cards) {
  elementsList.innerHTML = "";
  cards.forEach((card) => renderElement(card));
  //setEventLikeButtons();
  //setEventTrashButtons();
  //setEventFigButtons();
}

// Botões de ação
const profileEditButton = document.querySelector(".profile__edit");
const profileAddLocation = document.querySelector(".profile__add");
const closeButton = document.querySelector(".modal__close");
const closeFigButton = document.querySelector(".modal__figclose");
const saveButton = document.querySelector(".modal__button");

// Valores
const titleValue = document.querySelector(".profile__title");
const subtitleValue = document.querySelector(".profile__subtitle");

const modal = document.querySelector(".modal");

function handleOverlayModalClick(evt) {
  const modalFigClicked = evt.target.classList.contains("modal__fig");
  const childremElementClicked = evt.currentTarget !== evt.target;
  if (childremElementClicked && !modalFigClicked) {
    return;
  }
  handleCloseEvent();
}

function handleCloseEvent() {
  const modalFigOpened = document.querySelector(".modal__fig_opened");
  modalFigOpened ? handleModalFig() : handleModalContent();
}

// [x]
function handleModal() {
  modal.classList.toggle("modal_opened");
}

// [x]
function handleModalFig() {
  handleModal();
  modalFig.classList.toggle("modal__fig_opened");
}

function handleModalContent() {
  handleModal();
  formElement.classList.toggle("modal__content_opened");
  const addFormValidator = new FormValidator(formObject, formElement);
  addFormValidator.enableValidation();
}

// [X]
const resetFormInputsError = (formObject) => {
  const { formSelector } = formObject;
  const formElement = document.querySelector(formSelector);
  const inputElements = document.querySelectorAll(".modal__input-text");
  toggleButtonState(inputElements, formObject);
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, formObject);
  });
};

// Elementos do Modal
const modalTitle = formElement.querySelector(".modal__title");

// Função para configurar os atributos de Modal Add Local
function setModalAddLocation() {
  modalTitle.textContent = "Novo Local";
  titleInput.value = "";
  subtitleInput.value = "";
  titleInput.placeholder = "Titulo";
  subtitleInput.placeholder = "Link de Imagem";
  saveButton.textContent = "Criar";
  formElement.setAttribute("name", "form__add-local");
  titleInput.maxLength = 40;
  subtitleInput.removeAttribute("minlength");
  subtitleInput.removeAttribute("maxlength");
  subtitleInput.type = "url";
}

// Função para renderizar Modal Add Local
function renderModalAddLocation() {
  setModalAddLocation();
  handleModalContent();
}
// Função para configurar os atributos de Modal Profile Edit
function setModalProfileEdit() {
  modalTitle.textContent = "Editar Perfil";
  titleInput.value = titleValue.textContent;
  subtitleInput.value = subtitleValue.textContent;
  titleInput.placeholder = "Nome";
  subtitleInput.placeholder = "Sobre mim";
  saveButton.textContent = "Salvar";
  formElement.setAttribute("name", "form__edit-profile");
  titleInput.maxLength = 30;
  subtitleInput.minLength = 2;
  subtitleInput.maxLength = 200;
  subtitleInput.type = "text";
}

// Funcão para renderizar Modal Profile Edit
function renderModalProfileEdit() {
  setModalProfileEdit();
  handleModalContent();
}

function handleFigButtonEvent(evt) {
  const figureSource = evt.target;
  const figure = document.querySelector(".modal__image");
  const figureCaption = document.querySelector(".modal__figcaption");
  figure.src = figureSource.src;
  figure.alt = figureSource.alt;
  figureCaption.textContent = figureSource.alt;
  handleModalFig();
}
// [X]
function setEventFigButtons() {
  const openFigButtons = document.querySelectorAll(".element__image");
  openFigButtons.forEach((figButton) => {
    figButton.addEventListener("click", handleFigButtonEvent);
  });
}
// [X]
function handleLikeButtonsEvent(evt) {
  evt.target.classList.toggle("element__like_clicked");
}
// [X]
// Função para escutar o evento de click no botão de element__like
function setEventLikeButtons() {
  const likeButtons = document.querySelectorAll(".element__like");
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", handleLikeButtonsEvent);
  });
}
// [X]
// Função para escutar o evento de click no botão de element__trash
function setEventTrashButtons() {
  const trashButtons = document.querySelectorAll(".element__trash");
  trashButtons.forEach((trashButton) => {
    trashButton.addEventListener("click", removeCard);
  });
}

function setEventKeydown() {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      if (modal.classList.contains("modal_opened")) {
        handleCloseEvent();
      }
    }
  });
}
// [X]
function getIndexOfElementEvent(evt) {
  const elementOf = evt.target.parentElement;
  const arrayElements = Array.from(elementOf.parentElement.children);
  return arrayElements.indexOf(elementOf);
}

// [x]
function removeCard(evt) {
  const index = getIndexOfElementEvent(evt);
  initialCards.splice(index, 1);
  updateElements(initialCards);
}

//[X]
const checkFormValidity = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".modal__input-text")
  );
  return !hasInvalidInput(inputList);
};

profileEditButton.addEventListener("click", renderModalProfileEdit);
profileAddLocation.addEventListener("click", renderModalAddLocation);
closeButton.addEventListener("click", handleModalContent);
closeFigButton.addEventListener("click", handleModalFig);
modal.addEventListener("click", handleOverlayModalClick);

function handleFormSubmit(evt) {
  evt.preventDefault(); // Evita o comportamento padrão do formulário

  // if (!checkFormValidity(evt.currentTarget)) {
  //   return;
  // }
  const profileEditForm = evt.target.name.includes("form__edit-profile");
  if (profileEditForm) {
    titleValue.textContent = titleInput.value;
    subtitleValue.textContent = subtitleInput.value;
  } else {
    const newCard = {
      name: titleInput.value,
      link: subtitleInput.value,
    };
    renderElement(newCard, true);
  }
  handleModalContent();
}

// Adicionar o evento de submit ao formulário do Modal
formElement.addEventListener("submit", handleFormSubmit);

// Obter os cartão iniciar no carregamento da página
updateElements(initialCards);
setEventKeydown();
//enableValidation(formObject);
