var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");

var stuffOrderButton = document.querySelector(".stuff-week__order-button");
var popupAddToCartModal = document.querySelector(".modal-add-to-cart");
var backgroundModal = document.querySelector(".background-modal");


navMain.classList.remove("main-nav--nojs"); // Открытие-закрытие мобильного меню
navToggle.addEventListener("click", function () {
    if (navMain.classList.contains("main-nav--closed")) {
        navMain.classList.remove("main-nav--closed");
        navMain.classList.add("main-nav--opened");
    } else {
        navMain.classList.add("main-nav--closed");
        navMain.classList.remove("main-nav--opened");
    }
});

stuffOrderButton.addEventListener("click", function (evt) { //Открытие модального окна
    evt.preventDefault();
    backgroundModal.classList.add("modal-show");
    popupAddToCartModal.classList.add("modal-show");
});

backgroundModal.addEventListener("click", function (evt) { //Закрытие модального окна
    evt.preventDefault();
    backgroundModal.classList.remove("modal-show");
    popupAddToCartModal.classList.remove("modal-show");
});

