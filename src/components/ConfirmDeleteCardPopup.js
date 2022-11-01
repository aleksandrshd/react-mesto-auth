import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeleteCardPopup({isOpen, onClose, selectedToDeleteCard, handleCardDelete, isLoading}) {

  function handleSubmit(event) {
    event.preventDefault();
    handleCardDelete(selectedToDeleteCard);
  }

  return (
    <PopupWithForm name="delete-card"
                   title="Вы уверены?"
                   buttonText={isLoading ? 'Сохранение ...' : 'Да'}
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   formValid={true}/>
  );

}