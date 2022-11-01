export default function PopupWithServerError(props) {

  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>

      <div className={`popup__container popup__container-${props.name}`}>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <div className="popup__form">
          <span className="popup__error popup__error_server">{props.serverError}</span>
          <button className="popup__save-button"
                  type="submit"
                  onClick={props.onClick}>{props.buttonText}</button>
        </div>
      </div>

    </div>
  );
}