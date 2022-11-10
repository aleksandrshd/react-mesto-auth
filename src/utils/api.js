import {options} from "./constants";

class Api {
  constructor(options) {
    this._adress = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return this._request(`${this._adress}/cards`,
      {headers: this._headers});
  }

  getUserInfo() {
    return this._request(`${this._adress}/users/me`,
      {headers: this._headers});
  }

  setUserInfo(userName, userJob) {
    return this._request(`${this._adress}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userJob
      })
    });
  }

  setNewCard(cardName, cardLink) {
    return this._request(`${this._adress}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._adress}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });

  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this._request(`${this._adress}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      });
    } else {
      return this._request(`${this._adress}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      });
    }
  }

  setUserAvatar(avatarLink) {
    return this._request(`${this._adress}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
  }

  _checkServerAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkServerAnswer);
  }

}

const api = new Api(options);

export default api;