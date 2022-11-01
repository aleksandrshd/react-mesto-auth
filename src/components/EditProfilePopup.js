import React from "react";
import {useContext, useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {validators} from "../utils/validators";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

  const currentUser = useContext(CurrentUserContext);

  const [formValues, setFormValues] = useState({
    name: currentUser.name || '',
    description: currentUser.about || ''
  });

  const [formErrors, setFormErrors] = useState({
    name: {
      empty: true,
      minLength: true,
      maxLength: false
    },
    description: {
      empty: false,
      minLength: true,
      maxLength: false
    }
  });

  const [isInvalid, setIsInvalid] = useState(true);

  const [textNameError, setTextNameError] = useState('');
  const [textDescriptionError, setTextDescriptionError] = useState('');

  useEffect(() => {
    setFormValues({
      name: currentUser.name || '',
      description: currentUser.about || ''
    });

    setIsInvalid(false);

  }, [currentUser, isOpen]);

  function handleInputChange(event) {
    setFormValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));

  }

  function handleSubmit(event) {

    event.preventDefault();

    onUpdateUser(formValues.name, formValues.description);

  }

  useEffect(() => {
    const formKeys = Object.keys(formValues);

    const allErrors = formKeys.map(key => {
      const valueByKey = formValues[key];
      if (!validators[key]) {
        return {};
      }
      const errors = Object.entries(validators[key]).map(
        ([errorKey, validatorFn]) => {
          return {[errorKey]: validatorFn(valueByKey)};
        }
      ).reduce((acc, item) => ({...acc, ...item}), {});
      return {[key]: errors};

    }).reduce((acc, item) => ({...acc, ...item}), {});

    setFormErrors(allErrors);

  }, [formValues, setFormErrors]);

  useEffect(() => {
    for (const fieldKey in formErrors) {
      const keyErrors = formErrors[fieldKey];
      for (const errorKey in keyErrors) {
        if (keyErrors[errorKey] === true) {
          return setIsInvalid(true);
        }
      }
    }

    setIsInvalid(false);

  }, [formErrors, setIsInvalid]);

  useEffect(() => {

    if (formErrors.name.empty) {
      setTextNameError('Введите имя пользователя');
    } else if (formErrors.name.minLength) {
      setTextNameError('Минимальная длина имени пользователя 2 символа')
    } else if (formErrors.name.maxLength) {
      setTextNameError('Максимальная длина имени пользователя 40 символов')
    } else setTextNameError('');

    if (formErrors.description.empty) {
      setTextDescriptionError('Введите описание пользователя');
    } else if (formErrors.description.minLength) {
      setTextDescriptionError('Минимальная длина описания пользователя 2 символа')
    } else if (formErrors.description.maxLength) {
      setTextDescriptionError('Максимальная длина описания пользователя 200 символов')
    } else setTextDescriptionError('');

  }, [formErrors]);

  return (
    <PopupWithForm name="profile" title="Редактировать профиль"
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   buttonText={isLoading ? 'Сохранение ...' : 'Сохранить'}
                   formValid={!isInvalid}>

      <input className="popup__input popup__input_type_name"
             type="text"
             name="name"
             placeholder="Имя пользователя"
             value={formValues.name || ''}
             onChange={handleInputChange}/>
      <span className="popup__error">{textNameError}</span>
      <input className="popup__input popup__input_type_job"
             type="text"
             name="description"
             placeholder="Описание"
             value={formValues.description || ''}
             onChange={handleInputChange}/>
      <span className="popup__error">{textDescriptionError}</span>

    </PopupWithForm>
  );

}