export default function PopupWithForm({isOpen, onClose, name, title, buttonText, children, onSubmit, formValid}) {

  return (
    <div className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>

      <div className={`popup__container popup__container-${name}`}>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`input_type_${name}`} onSubmit={onSubmit}>
          {children}
          <button className={`popup__save-button ${!formValid ? 'popup__save-button_type_disabled' : ''}`}
                  type="submit"
                  disabled={!formValid}>{buttonText}</button>
        </form>
      </div>

    </div>
  );
}