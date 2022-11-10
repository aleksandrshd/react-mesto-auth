import React from "react";
import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import useInput from "../hooks/useInput";

export default function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const title = useInput('', {isEmpty: true, minLength: 2, maxLength: 30});
  const link = useInput('', {isEmpty: true, isUrl: true});
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(title.inputValid && link.inputValid);
  }, [title.inputValid, link.inputValid]);

  useEffect(() => {
   title.setInputValue('');
   title.setDirtyValue(false);
   link.setInputValue('');
   link.setDirtyValue(false);
  }, [isOpen]);

  function handleSubmit(event) {

    event.preventDefault();

    onAddPlace(title.value, link.value);

  }

  return (
    <PopupWithForm name="card" title="Новое место"
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   buttonText={isLoading ? 'Сохранение ...' : 'Создать'}
                   formValid={formValid}>

      <input className="popup__input popup__input_type_title"
             type="text"
             name="title"
             placeholder="Название"
             required minLength="2"
             value={title.value}
             onChange={title.onChange}
             onBlur={title.onBlur}/>
      <span className="popup__error">{(
        ((title.isDirty && title.isEmptyError) ? 'Название не может быть пустым' : '') ||
        ((title.isDirty && title.minLengthError) ? 'Название не может быть короче 2 символов' : '') ||
        ((title.isDirty && title.maxLengthError) ? 'Название не может быть длинее 30 символов' : '')
      )}</span>
      <input className="popup__input popup__input_type_link"
             type="url"
             name="link"
             placeholder="Ссылка на картинку"
             required
             value={link.value}
             onChange={link.onChange}
             onBlur={link.onBlur}/>
      <span className="popup__error">{
        ((link.isDirty && link.isUrlError) ? 'Url адрес введен некорректно' : '')
      }</span>

    </PopupWithForm>
  );

}