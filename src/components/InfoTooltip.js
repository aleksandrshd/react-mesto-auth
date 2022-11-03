import imageOk from '../images/registration-ok.svg';
import imageFail from '../images/registration-fail.svg';

export default function InfoTooltip(props) {

  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>

      <div className={`popup__container popup__container-${props.name}`}>
          <div className="popup__registration-logo"
               style={{backgroundImage: `${props.registrationSuccessful ? `url(${imageOk})` : `url(${imageFail})`}`}}></div>
          <h2
            className="popup__title popup__title_type_registration">{props.registrationSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>

      </div>

    </div>
  );
}