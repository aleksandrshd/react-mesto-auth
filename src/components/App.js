import React from "react";
import {useCallback, useEffect, useState} from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithServerError from "./PopupWithServerError";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../auth';
import InfoTooltip from "./InfoTooltip";
import PageNotFound from "./PageNotFound";

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isServerErrorPopupOpen, setIsServerErrorPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [serverError, setSeverError] = useState('');
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedToDeleteCard, setSelectedToDeleteCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userDataAuth, setUserDataAuth] = useState({});
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  const cbTokenCheck = useCallback(async () => {
    try {
      setAppLoading(true);
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('No token in storage');
      }
      const user = await auth.checkToken(jwt);

      if (!user) {
        throw new Error('Invalid user');
      }
      setLoggedIn(true);
      setUserDataAuth(user.data);
    } catch {
    } finally {
      setAppLoading(false);
    }
  }, []);

  const cbAuthentiticate = useCallback(async (password, email) => {
    try {
      const data = await auth.authenticate(password, email);
      /*if (!data) {
        throw new Error('Invalid email or password');
      }*/
      if (data.token) {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        cbTokenCheck(); // для получения email пользователя
      }
    } catch (error) {
      console.log(error);
      handleServerError('Введен неверный логин или пароль.');
    }
  }, []);

  const cbRegister = useCallback(async (password, email) => {
    try {
      const data = await auth.register(password, email);
      /*if (!data) {
        throw new Error('Регистрация не выполнена');
      }*/
      console.log(data);
      if (data) {
        setRegistrationSuccessful(true);
        setIsInfoTooltipOpen(true);
      }
    } catch (error) {
      setIsInfoTooltipOpen(true);
      console.log(error);
    }
  }, []);

  const cbLogout = useCallback(() => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserDataAuth({});
  }, []);

  useEffect(() => {
    cbTokenCheck();

    api.getUserInfo()

      .then(userInfo => setСurrentUser(userInfo))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      });

    api.getInitialCards()

      .then(cards => setCards(cards))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      });


  }, []);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(cardSel) {
    setSelectedCard(cardSel);
  }

  function handleServerError(err) {
    setSeverError(err);
    setIsServerErrorPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function closeServerErrorPopupPopup() {
    setIsServerErrorPopupOpen(false);
  }

  function handleUpdateUser(userName, userJob) {

    setIsLoading(true);

    api.setUserInfo(userName, userJob)

      .then(userInfo => setСurrentUser(userInfo))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
        console.log(isServerErrorPopupOpen);
      })

      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(avatarLink) {

    setIsLoading(true);

    api.setUserAvatar(avatarLink)

      .then(userInfo => setСurrentUser(userInfo))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      })

      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(cardName, cardLink) {
    setIsLoading(true);

    api.setNewCard(cardName, cardLink)

      .then((newCard) => setCards([newCard, ...cards]))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      })

      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)

      .then((newCard) => {

        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));

      })

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      });

  }

  function handleCardDelete(cardToDelete) {

    setIsLoading(true);

    api.deleteCard(cardToDelete._id)

      .then(() => setCards(cards.filter(cardInitial => cardInitial._id != cardToDelete._id)))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      })

      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });

  }

  function handleCardDeleteClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedToDeleteCard(card);
  }

  if (appLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', color: 'white'}}>Загрузка, подождите пожалуйста ...</div>
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className="App">

        <Switch>
          <ProtectedRoute path="/main"
                          loggedIn={loggedIn}
                          component={Main}
                          onEditAvatar={handleEditAvatarClick}
                          onEditProfile={handleEditProfileClick}
                          onAddPlaceClick={handleAddPlaceClick}
                          onCardClick={handleCardClick}
                          cards={cards}
                          onCardLike={handleCardLike}
                          onCardDeleteClick={handleCardDeleteClick}
                          userDataAuth={userDataAuth}
                          onLogout={cbLogout}/>
          <Route path="/sign-in">
            <Header userDataAuth={userDataAuth}
                    loggedIn={loggedIn}
                    onLogout={cbLogout}
                    enterBtn={false}
                    registerBtn={true}/>
            <Login loggedIn={loggedIn}
                   onLogin={cbAuthentiticate}/>
          </Route>
          <Route path="/sign-up">
            <Header userDataAuth={userDataAuth}
                    loggedIn={loggedIn}
                    onLogout={cbLogout}
                    enterBtn={true}
                    registerBtn={false}/>
            <Register registrationSuccessful={registrationSuccessful}
                      onRegister={cbRegister}/>
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/main"/> : <Redirect to="/sign-in"/>}
          </Route>
          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>

        <Footer/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
                          isLoading={isLoading}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
                       isLoading={isLoading}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
                         isLoading={isLoading}/>

        <ConfirmDeleteCardPopup isOpen={isDeleteCardPopupOpen}
                                onClose={closeAllPopups}
                                handleCardDelete={handleCardDelete}
                                selectedToDeleteCard={selectedToDeleteCard}
                                isLoading={isLoading}/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <PopupWithServerError name="server-error" title="Возникла ошибка"
                              isOpen={isServerErrorPopupOpen}
                              onClose={closeServerErrorPopupPopup}
                              serverError={serverError}
                              onClick={closeServerErrorPopupPopup}
                              buttonText='Закрыть'/>

        <InfoTooltip name="registration"
                     isOpen={isInfoTooltipOpen}
                     onClose={closeAllPopups}
                     registrationSuccessful={registrationSuccessful}/>

      </div>

    </CurrentUserContext.Provider>
  );
}
