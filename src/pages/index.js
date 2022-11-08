import "./index.css";
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

// Constantes
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

const formObject = {
  inputSelector: ".modal__input-text",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input-text_error",
  errorClass: "modal__input-error_active",
};

// Renderiza imagens na página
const listSelector = ".elements";
function createCard(cardItem) {
  const card = new Card({
    data: cardItem,
    cardSelector: ".element",
    handleCardClick: () => {
      const imagePopup = new PopupWithImage(".modal__fig");
      imagePopup._setEventListeners();
      imagePopup.open(cardElement);
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardList.addItem(cardElement);
    },
  },
  listSelector
);
cardList.renderItems();

// Implementa o popup de Edição de Perfil

const editProfilePopup = new PopupWithForm({
  popupSelector: "#formEditProfile",
  formSelector: '[name="form__edit-profile"]',
  handleFormSubmit: (item) => {
    console.log(">>>", item);
    const userInfo = new UserInfo({
      titleSelector: ".profile__title",
      subtitleSelector: ".profile__subtitle",
    });
    userInfo.setUserInfo(item);
  },
});

// Implementa botao de Edição de Perfil
const editProfileButton = document.querySelector(".profile__edit");
editProfileButton.addEventListener("click", () => {
  editProfilePopup.open();
  const userInfo = new UserInfo({
    titleSelector: ".profile__title",
    subtitleSelector: ".profile__subtitle",
  });
  const userData = userInfo.getUserInfo();
  document.querySelector("#title").value = userData.title;
  document.querySelector("#subtitle").value = userData.subtitle;
});
// Implementa Event Listener de Popup de Edição Perfil
editProfilePopup.setEventListeners();

// Implementa o popup de Adicionar Card
const addCardPopup = new PopupWithForm({
  popupSelector: "#formAddLocal",
  formSelector: '[name="form__add-local"]',
  handleFormSubmit: (cardItem) => {
    const cardElement = createCard(cardItem);
    document.querySelector(containerSelector).prepend(cardElement);
  },
});
// Implementa Event Listener de Popup de Adicionar Card
addCardPopup.setEventListeners();

// Implementa botao de Adicionar Card
const addButton = document.querySelector(".profile__add");
addButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Validações

const addCardFormValidator = new FormValidator(
  formObject,
  document.forms.formAddLocal
);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(
  formObject,
  document.forms.formEditProfile
);
editProfileFormValidator.enableValidation();
