export default function ImagePopup(props) {

  return (
    <div className={`popup popup-image ${props.card.hasOwnProperty('name') ? 'popup_opened' : ''}`}>

      <div className="popup__container popup__container-image">
        <button className="popup__close-button"
                type="button"
                onClick={props.onClose}></button>
        <img className="popup__img"
             src={props.card.link}
             alt={props.card.name}/>
        <h2 className="popup__caption">{props.card.name}</h2>
      </div>

    </div>
  );
}