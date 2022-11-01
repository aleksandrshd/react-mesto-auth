import React from "react";
import {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const inputAvatarLinkRef = useRef('');

  function handleSubmit(event) {

    event.preventDefault();

    onUpdateAvatar(inputAvatarLinkRef.current.value);

  }

  useEffect(() => {
    inputAvatarLinkRef.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm name="avatar" title="Обновить аватар"
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   buttonText={isLoading ? 'Сохранение ...' : 'Сохранить'}
                   formValid={true}>

      <input className="popup__input popup__input_type_avatar"
             type="url"
             name="avatar"
             placeholder="Ссылка на аватар"
             required
             ref={inputAvatarLinkRef}/>
      <span className="popup__error"></span>

    </PopupWithForm>
  )

}