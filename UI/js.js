/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line max-classes-per-file

class Tweet {
  constructor(id, text, author, comments = [], createAt = new Date()) {
    this._id = id;
    this.text = text;
    this._createAt = new Date(createAt);
    this._author = author;
    this.comments = comments;
  }

  static dateLabel(item) {
    let day;
    let month;
    if (item.createAt) {
      day = new Date(item.createAt).getDate();
      month = new Date(item.createAt).getMonth();
    } else if (item.createdAt) {
      day = new Date(item.createdAt).getDate();
      month = new Date(item.createdAt).getMonth();
    }
    let fMonth;
    switch (month) {
      case 0: fMonth = 'января'; break;
      case 1: fMonth = 'февраля'; break;
      case 2: fMonth = 'марта'; break;
      case 3: fMonth = 'апреля'; break;
      case 4: fMonth = 'мая'; break;
      case 5: fMonth = 'июня'; break;
      case 6: fMonth = 'июля'; break;
      case 7: fMonth = 'августа'; break;
      case 8: fMonth = 'сентября'; break;
      case 9: fMonth = 'октября'; break;
      case 10: fMonth = 'ноября'; break;
      case 11: fMonth = 'декабря'; break;
      default: break;
    }
    return (`${day} ${fMonth}`);
  }

  static #maxTextLength = 280;

  static #template = {
    id: (id) => id?.length && typeof id === 'string',
    text: (text) => typeof text === 'string' && text.length < Tweet.#maxTextLength,
    createAt: (date) => date instanceof Date,
    author: (author) => author?.length && typeof author === 'string',
    comments: (array) => Array.isArray(array),
  };

  static validate(tweet) {
    const keysTemplate = Object.keys(Tweet.#template);
    return keysTemplate.every((key) => Tweet.#template[key](tweet[key]));
  }

  get id() {
    return this._id;
  }

  get createAt() {
    return this._createAt;
  }

  get author() {
    return this._author;
  }
}

class Comment {
  constructor(id, text, author) {
    this._id = id;
    this.text = text;
    this._createAt = new Date();
    this._author = author;
  }

  static #maxTextLength = 280;

  static #template = {
    id: (id) => id?.length && typeof id === 'string',
    text: (text) => typeof text === 'string' && text.length < Comment.#maxTextLength,
    createAt: (date) => date instanceof Date,
    author: (author) => author?.length && typeof author === 'string',
  };

  static validateComment(com) {
    const templateKeys = Object.keys(Comment.#template);
    return templateKeys.every((key) => Comment.#template[key](com[key]));
  }

  get id() {
    return this._id;
  }

  get createAt() {
    return this._createAt;
  }

  get author() {
    return this._author;
  }
}

class TweetCollection {
  constructor(tws = []) {
    this._user = 'User';
    this._tws = tws;
  }

  get user() {
    return this._user;
  }

  set user(user) {
    if (typeof user === 'string') {
      this._user = user;
    }
  }

  get tws() {
    return this._tws;
  }

  getPage(skip = 0, top = 10, filterConfig = null) {
    const filterKeys = filterConfig ? Object.keys(filterConfig) : null;
    let filterTweets = [...this.tws];
    if (filterKeys !== null) {
      filterKeys.forEach((filter) => {
        switch (filter) {
          case 'author':
            filterTweets = filterTweets.filter((tweet) => tweet.author === filterConfig.author);
            break;
          case 'dateTo':
            filterTweets = filterTweets.filter((tweet) => tweet.createAt < filterConfig.dateTo);
            break;
          case 'dateFrom':
            filterTweets = filterTweets.filter((tweet) => tweet.createAt > filterConfig.dateFrom);
            break;
          case 'hashtags':
            filterTweets = filterTweets.filter((tweet) => tweet.text.split('#').find((item) => item === filterConfig.hashtags) === filterConfig.hashtags);
            break;
          case 'text':
            filterTweets = filterTweets.filter((tweet) => tweet.text === filterConfig.text);
            break;
          default:
            break;
        }
      });
    }

    filterTweets = filterTweets.splice(skip, top);
    this._tws = filterTweets;
    return filterTweets;
  }

  get(id) {
    return this._tws.find((tweet) => tweet.id === id);
  }

  static createNewId() {
    return String(Math.random());
  }

  add(text) {
    const newTweet = new Tweet(TweetCollection.createNewId(), text, this.user);
    if (Tweet.validate(newTweet)) {
      this._tws.push(newTweet);
      TweetCollection.tweetIsSort(this.tws);
      return true;
    }
    return false;
  }

  edit(id, text) {
    const correctUser = this.get(id);
    const newCorr = {
      id: correctUser._id, text: correctUser.text, author: correctUser._author, comments: correctUser.comments, createAt: correctUser._createAt,
    };
    if (Tweet.validate(newCorr)) {
      correctUser.text = text;
      return true;
    }
    return false;
  }

  remove(id) {
    const indexForDelete = this.tws
      .findIndex((elem) => elem.id === id);
    if (indexForDelete !== -1) {
      this._tws.splice(indexForDelete, 1);
      return true;
    }
    return false;
  }

  addComment(id, text) {
    const newComment = this.get(id);
    const com = new Comment(TweetCollection.createNewId(), text, (JSON.parse(this.user)).login);
    const comment = {
      id: com._id, text: com.text, createAt: com._createAt, author: com._author,
    };
    console.log(comment);
    if (Comment.validateComment(comment)) {
      if (localStorage.getItem('curentTweet')) {
        const addNewComm = JSON.parse(localStorage.getItem('curentTweet'));
        addNewComm.comments.push(comment);
        localStorage.setItem('curentTweet', JSON.stringify(addNewComm));
      }
      newComment.comments.push(comment);
      return true;
    }
    return false;
  }

  static tweetIsSort(tweetCollection) {
    tweetCollection.sort((a, b) => b.createAt - a.createAt);
  }

  addAll(tws) {
    const notValid = [];
    tws.forEach((elem) => {
      let newElem;
      if (elem._id === undefined) {
        newElem = new Tweet(elem.id, elem.text, elem.author, elem.comments, elem.createdAt);
      } else if (elem.id === undefined) {
        newElem = new Tweet(elem._id, elem.text, elem._author, elem.comments, elem._createdAt);
      }
      if (Tweet.validate(newElem)) {
        this._tws.push(newElem);
      } else {
        notValid.push(elem);
      }
    });
    TweetCollection.tweetIsSort(this.tws);
    return notValid;
  }

  clear() {
    this._tws = [];
  }
}

const t = new TweetCollection();

class HeaderView {
  constructor(id) {
    this._containerId = id;
    this.display(JSON.parse(localStorage.getItem('current User')));
  }

  get id() {
    return this._containerId;
  }

  display(userName = null) {
    const userInHead = document.querySelector(`.${this.id}`);
    const buttonLogIn = document.querySelector('.logInButton');
    const newContainer = document.createElement('div');
    if (userName !== null && userName !== 'null') {
      const userNameWithout = userName.login;
      newContainer.classList.add('headerUserBlock');
      newContainer.insertAdjacentHTML(
        'afterbegin',
        `<img src="./assets/UserFoto.svg" alt="userFoto"/>
            <h4 id="userName">${userNameWithout}</h4>
            <a class="buttonLoginOut">
                <img src="./assets/buttonLogOut.svg" alt="logOut">
            </a>`,
      );
      userInHead?.append(newContainer);
      userInHead?.replaceChild(newContainer, userInHead.childNodes[0]);
      buttonLogIn?.classList.add('hidden');
    } else {
      buttonLogIn?.classList.remove('hidden');
      userInHead?.append(buttonLogIn);
      userInHead?.replaceChild(buttonLogIn, userInHead.childNodes[0]);
    }
  }
}

class TweetFeedView {
  constructor(containerId) {
    this._containerId = containerId;
  }

  get containerId() {
    return this._containerId;
  }

  display(tws) {
    const wrapperForTrotterList = document.querySelector(`#${this.containerId}`);
    const newContainer = document.createElement('div');
    const currentUser = document.querySelector('#userName')?.innerHTML;
    if (tws?.length === 0) {
      const trottersUndefined = document.createElement('h2');
      trottersUndefined.innerHTML = 'Ups, trotters is undefined';
      trottersUndefined.classList.add('styleForUndefined');
      wrapperForTrotterList?.appendChild(trottersUndefined);
      wrapperForTrotterList?.replaceChild(trottersUndefined, wrapperForTrotterList.childNodes[0]);
      const seeMore = document.querySelector('.moreTrotter');
      seeMore?.classList.add('hidden');
    } else {
      tws?.forEach((elem) => {
        let tweetOwner;
        if (elem.author !== currentUser) {
          tweetOwner = 'unvisibleBlock';
        } else { tweetOwner = 'correctTrotter'; }

        function hashtags(whatNeed) {
          const hashtag = [];
          const withoutHashtags = [];
          elem.text.split('#').forEach((item, index) => {
            if (index > 0) {
              hashtag.push(`#${item}`);
            } else if (index === 0) {
              withoutHashtags.push(item);
            }
          });
          let result;
          if (whatNeed === 'hashtags') {
            result = hashtag.join('');
          } else if (whatNeed === 'text') {
            result = withoutHashtags;
          }
          return result;
        }
        newContainer?.insertAdjacentHTML(
          'beforeend',
          `<div class="mainBlockTrotteListTrotter" id=${elem.id}>
                <div class="container">
                    <div class="wrapperUserPhoto">
                        <img src="./assets/UserFoto.svg" alt="user photo">
                    </div>
                    <div class="trotter">
                        <div class="userInfo">
                            <h3>${elem.author}</h3>
                            <h4>@${elem.author}</h4>
                            <h4>${Tweet.dateLabel(elem)}</h4>
                            <button class="${tweetOwner}">...
                              <div class="correctTrotterBlock">
                                  <ul>
                                      <li> 
                                          <img src="./assets/editTrotterIcon.svg" alt="edit trotter">
                                          <p class="editCurrentTweet">Edit</p>
                                      </li>
                                      <li>
                                          <img src="./assets/deleteTrotterIcon.svg" alt="delete trotter">
                                          <p class="deleteCurrentTweet">Delete</p>
                                      </li>
                                  </ul>
                              </div>
                            </button>

                        </div>
                        <p class=trotterText>${hashtags('text')}<span>${hashtags('hashtags')}</span></p>
                        <div class="response">
                            <ul>
                                <li class="commentToTweet">${elem.comments.length}</li>
                                <li>${Math.round(Math.random() * 100)}</li>
                                <li>${Math.round(Math.random() * 100)}</li>
                            </ul>
                        </div>
                    </div>
                </div>
             </div>`,
        );
        if (wrapperForTrotterList?.childNodes[0]) {
          wrapperForTrotterList?.replaceChild(newContainer, wrapperForTrotterList.childNodes[0]);
          return;
        }
        wrapperForTrotterList?.append(newContainer);
      });
    }
  }
}

class TweetView {
  constructor(containerId) {
    this._containerId = containerId;
    this.display(JSON.parse(localStorage.getItem('curentTweet')));
  }

  get id() {
    return this._containerId;
  }

  display(curTweet) {
    const mainTrotter = document.querySelector(`#${this.id}`);
    const newContainer = document.createElement('div');
    let currentTrott;
    if (curTweet?._id === undefined) {
      currentTrott = {
        id: curTweet?.id,
        text: curTweet?.text,
        createAt: curTweet?.createAt,
        comments: curTweet?.comments,
        author: curTweet?.author,
      };
    } else {
      currentTrott = {
        id: curTweet._id,
        text: curTweet.text,
        createAt: curTweet._createAt,
        comments: curTweet.comments,
        author: curTweet._author,
      };
    }
    const currentUser = document.querySelector('#userName')?.innerHTML;
    newContainer.classList.add('trotterList');

    function editFunction(item) {
      let tweetOwner;
      if (item.author !== currentUser) {
        tweetOwner = 'unvisibleBlock';
      } else if (item.author === currentUser) {
        tweetOwner = 'correctTrotter';
      }
      return tweetOwner;
    }

    function hashtags(whatNeed, input) {
      const hashtag = [];
      const withoutHashtags = [];
      input.text.split('#').forEach((item, index) => {
        if (index > 0) {
          hashtag.push(`#${item}`);
        } else if (index === 0) {
          withoutHashtags.push(item);
        }
      });
      let result;
      if (whatNeed === 'hashtags') {
        result = hashtag.join('');
      } else if (whatNeed === 'text') {
        result = withoutHashtags;
      } else {
        result = '';
      }
      return result;
    }

    if (curTweet === null) {
      const trottersUndefined = document.createElement('h2');
      trottersUndefined.innerHTML = 'Ups, trotters is undefined';
      trottersUndefined.classList.add('styleForUndefined');
      mainTrotter?.append(trottersUndefined);
    } else {
      mainTrotter?.insertAdjacentHTML(
        'afterbegin',
        `<div class="container" id="${currentTrott.id}">
        <div class="wrapperUserPhoto">
            <img src="./assets/UserFoto.svg" alt="user photo">
        </div>
            <div class="trotter">
                <div class="userInfo">
                    <h3>${currentTrott?.author}</h3>
                    <h4>@${currentTrott?.author}</h4>
                    <h4>${Tweet.dateLabel(currentTrott)}</h4>
                    <button class="correctTrotter" ></button>
                    <button class="correctTrotter">
                              <div class="correctTrotterBlock">
                                  <ul>
                                      <li> 
                                          <img src="./assets/editTrotterIcon.svg" alt="edit trotter">
                                          <p class="editCurrentTweet">Edit</p>
                                      </li>
                                      <li>
                                          <img src="./assets/deleteTrotterIcon.svg" alt="delete trotter">
                                          <p class="deleteCurrentTweet">Delete</p>
                                      </li>
                                  </ul>
                              </div>
                            </button>
                </div>
                <p class="trotterText">${hashtags('text', currentTrott)} <span>${hashtags('hashtags', currentTrott)}</span></p>
                <div class="response">
                    <ul>
                        <li>${currentTrott.comments.length}</li>
                        <li>${Math.round(Math.random() * 100)}</li>
                        <li>${Math.round(Math.random() * 100)}</li>
                    </ul>
                </div>
            </div>
      </div>`,
        currentTrott.comments.forEach((elem) => {
          newContainer.insertAdjacentHTML(
            'afterbegin',
            `<div class="container" id=${elem.id}>
            <div class="wrapperUserPhoto">
                <img src="./assets/userImgCommentstwo.svg" alt="user photo">
            </div>
            <div class="trotter">
                <div class="userInfo">
                    <h3>${elem.author}</h3>
                    <h4>@${elem.author}</h4>
                    <h4>${Tweet.dateLabel(elem)}</h4>
                    <button class="${editFunction(elem)}">...
                              <div class="correctTrotterBlock">
                                  <ul>
                                      <li> 
                                          <img src="./assets/editTrotterIcon.svg" alt="edit trotter">
                                          <p class="editCurrentTweet">Edit</p>
                                      </li>
                                      <li>
                                          <img src="./assets/deleteTrotterIcon.svg" alt="delete trotter">
                                          <p class="deleteCurrentTweet">Delete</p>
                                      </li>
                                  </ul>
                              </div>
                    </button>
                    
                </div>
                <p class="reTrott">Reply to <span>@${hashtags('hashtags', currentTrott)}</span></p>
                <p class="trotterText">${elem.text}</p>
                <div class="response">
                    <ul>
                        <li style="display: none"></li>
                        <li>${Math.round(Math.random() * 10)}</li>
                        <li>${Math.round(Math.random() * 10)}</li>
                    </ul>
                </div>
            </div>
          </div>`,
          );
        }),
      );
      if (mainTrotter?.childNodes[1]) {
        mainTrotter?.replaceChild(newContainer, mainTrotter.childNodes[1]);
      } else mainTrotter?.append(newContainer);
    }
  }
}

class FilterView {
  constructor(containerId) {
    this._id = containerId;
  }

  get id() {
    return this._id;
  }

  display(param, tweets) {
    const serchContainer = document.querySelectorAll(`.${this.id}`);
    const filterElement = document.createElement('select');
    const startFilterByAuthor = document.createElement('option');
    startFilterByAuthor.innerHTML = 'People';
    filterElement.append(startFilterByAuthor);
    const filterAuthors = [];
    if (param === 'author') {
      tweets.forEach((elem, index) => {
        const itemIsSearch = elem[param];
        if (!filterAuthors.includes(itemIsSearch)) {
          filterAuthors.push(itemIsSearch);
        } else if (filterAuthors.includes(itemIsSearch)) {
          return;
        }
        filterElement?.insertAdjacentHTML(
          'afterbegin',
          `<option value="${elem.author}">${itemIsSearch}</option>`,
        );
      });
      if (serchContainer[0]?.childNodes) {
        serchContainer[0]?.replaceChild(filterElement, serchContainer[0].childNodes[0]);
      }
      filterElement.classList.add('authorSearch');
      serchContainer[0]?.append(filterElement);
    } else if (param === 'text') {
      const hashtags = [];
      tweets.forEach((elem) => {
        const text = elem[param].split(' ');
        text.forEach((e) => {
          const smallHash = e.split('');
          if (smallHash.some((one) => one === '#')) {
            const r = smallHash.join('');
            if (!hashtags.includes(r)) {
              hashtags.push(r);
            } else if (hashtags.includes(r)) {

            }
          }
        });
      });
      hashtags.forEach((elem, index) => {
        const elemWithoutHash = elem.split('#')[1];
        filterElement?.insertAdjacentHTML(
          'afterbegin',
          `<option value="${elemWithoutHash}">${elemWithoutHash}</option>`,
        );
      });
      filterElement.classList.add('hashSearch');
      if (serchContainer[1]?.childNodes) {
        serchContainer[1]?.replaceChild(filterElement, serchContainer[1].childNodes[0]);
      }
      serchContainer[1]?.append(filterElement);
    }
  }
}

class TweetsController {
  constructor() {
    this.newAllCollectionOfTweet = new TweetCollection();
    this.newList = new TweetFeedView('trotterList');
    this.headerView = new HeaderView('wrapperForHeaderButton');
    this.selectTweet = new TweetView('mainblocktoAddTrot');
    this.filter = new FilterView('humanSearch');
    this.restore();
  }

  async restore() {
    await requestToBack.getTweet(10);
    await this.newList.display(this.newAllCollectionOfTweet.tws);
  }

  static save(tws) {
    const jsonTws = tws.map((el) => ({
      id: el.id, text: el.text, createAt: el.createAt, author: el.author, comments: el.comments,
    }));
    const users = [];
    tws.forEach((elem) => {
      if (users.includes(elem.author)) {
        return true;
      } users.push(elem.author);
    });
    const jsonUsers = JSON.stringify(users);
    localStorage.setItem('tweetUSers', jsonUsers);

    return localStorage.setItem('allTws', JSON.stringify(jsonTws));
  }

  static saveComment(id) {
    const jsonCom = JSON.parse(localStorage.getItem('curentTweet'));
    const hell = allTweetControl.newAllCollectionOfTweet.get(id);
    jsonCom.comments.forEach((elem) => {
      const haveComments = hell.comments.map((item) => item.id !== elem.id);
      if (haveComments) {
        jsonCom.comments.concat(haveComments);
      }
    });

    console.log(jsonCom);
    localStorage.setItem('curentTweet', JSON.stringify(jsonCom));
  }

  getTws() {
    return this.newAllCollectionOfTweet.tws;
  }

  setCurrentUSer(user) {
    this.newAllCollectionOfTweet.user = user;
    this.headerView.display(this.newAllCollectionOfTweet.user);
    this.newList.display(this.newAllCollectionOfTweet.tws);
  }

  async addTweet(text) {
    await requestToBack.createTweet(text)
      .then((res) => res.json())
      .then((res) => {
        if (res.text) {
          this.newAllCollectionOfTweet.addAll([res]);
          this.newList.display(this.newAllCollectionOfTweet.tws.slice(0, 10));
        } else if (res.statusCode === 401) {
          document.location.href = 'logIn.html';
        } else if (res.statusCode === 400) {
          localStorage.setItem('error', JSON.stringify({ statusCode: res.statusCode, error: res.message }));
          document.location.href = 'errorPage.html';
        }
      })
      .catch((error) => error.message);
  }

  async addTweetComment(id, text) {
    await requestToBack.addcom(text, id)
      .then((res) => res.json())
      .then((res) => {
        if (res.text) {
          this.selectTweet.display(res);
          localStorage.setItem('curentTweet', JSON.stringify(res));
        } else if (res.statusCode === 401) {
          document.location.href = 'logIn.html';
        } else if (res.statusCode) {
          localStorage.setItem('error', JSON.stringify({ statusCode: res.statusCode, error: res.message }));
          document.location.href = 'errorPage.html';
        }
      })
      .catch((error) => console.log(error.message));
  }

  async editTweet(id, text) {
    await requestToBack.correctTweet(text, id)
      .then((res) => res.json())
      .then((res) => {
        if (res.text) {
          this.newAllCollectionOfTweet.edit(id, text);
          this.newList.display(this.newAllCollectionOfTweet.tws.slice(0, 10));
        } else if (res.statusCode === 401) {
          document.location.href = 'logIn.html';
        } else if (res.statusCode) {
          localStorage.setItem('error', JSON.stringify({ statusCode: res.statusCode, error: res.message }));
          document.location.href = 'errorPage.html';
        }
      })
      .catch((error) => console.log(error.message));
  }

  async removeTweet(id) {
    await requestToBack.deleteTweet(id)
      .then((res) => {
        if (res.status === 204) {
          this.newAllCollectionOfTweet.remove(id);
          this.newList.display(this.newAllCollectionOfTweet.tws.slice(0, 10));
        } else if (res.statusCode === 401) {
          document.location.href = 'logIn.html';
        } else if (res.statusCode) {
          localStorage.setItem('error', JSON.stringify({ statusCode: res.statusCode, error: res.message }));
          document.location.href = 'errorPage.html';
        }
      });
  }

  getFeed(skip, top, filterConfig) {
    if (this.newAllCollectionOfTweet.getPage(skip, top, filterConfig)) {
      this.newList.display(this.newAllCollectionOfTweet.tws);
      TweetsController.save(this.newAllCollectionOfTweet.tws);
    }
  }

  showTweet(id) {
    if (this.newAllCollectionOfTweet.get(id)) {
      this.selectTweet.display(this.newAllCollectionOfTweet.get(id));
    } else {
      this.selectTweet.display(null);
    }
  }
}

class TweetFeedApiService {
  constructor(url) {
    this._url = url;
  }

  get url() {
    return this._url;
  }

  _headers(method, tok, info) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const head = {
      method,
      headers: myHeaders,
    };
    if (tok) {
      const { token } = JSON.parse(localStorage.getItem('current User'));
      myHeaders.append('Authorization', `Bearer ${token}`);
    }
    if (info) {
      head.body = info;
    }
    return head;
  }

  _fetchElement(endpoint) {
    return fetch(`${this.url}/${endpoint}`);
  }

  getTweet(number) {
    const tweets = fetch(`${this.url}/tweet?count=${number}`)
      .then((res) => res.json())
      .then((data) => {
        allTweetControl.newAllCollectionOfTweet.addAll(data);
      });
    return tweets;
  }

  registration(log, pas) {
    const user = JSON.stringify({
      login: `${log}`,
      password: `${pas}`,
    });
    return fetch(
      `${this.url}/registration`,
      requestToBack._headers('POST', false, user),
    );
  }

  loginStep(log, pas) {
    const user = JSON.stringify({
      login: `${log}`,
      password: `${pas}`,
    });
    return fetch(
      `${this.url}/login`,
      requestToBack._headers('POST', false, user),
    );
  }

  createTweet(text) {
    const tweetText = JSON.stringify({
      text: `${text}`,
    });
    return fetch(
      `${this.url}/tweet`,
      requestToBack._headers('POST', true, tweetText),
    );
  }

  correctTweet(text, id) {
    const correctableText = JSON.stringify({
      text: `${text}`,
    });
    return fetch(
      `${this.url}/tweet/${id}`,
      requestToBack._headers('PUT', true, correctableText),
    );
  }

  deleteTweet(id) {
    return fetch(
      `${this.url}/tweet/${id}`,
      requestToBack._headers('DELETE', true),
    );
  }

  addcom(text, id) {
    const comment = JSON.stringify({
      text: `${text}`,
    });
    return fetch(
      `${this.url}/tweet/${id}/comment`,
      requestToBack._headers('POST', true, comment),
    );
  }

  webSocket() {
    const conn = new WebSocket('wss://jslabapi.datamola.com');
    conn.onopen = function handleConnOpen(event) {
      console.log('connection is open');
    };
    conn.onclose = function handleConnClose(event) {
      console.warn('connection is close');
    };
    conn.onerror = function handleConnError(event) {
      console.error(event);
    };
    conn.onmessage = function onSocketMessage(event) {
      const { data } = event;
      console.log(data);
    };
  }
}

const requestToBack = new TweetFeedApiService('https://jslabapi.datamola.com');
const allTweetControl = new TweetsController();

async function filtr() {
  allTweetControl.filter.display('author', allTweetControl.newAllCollectionOfTweet.tws);
  allTweetControl.filter.display('text', allTweetControl.newAllCollectionOfTweet.tws);
  const takeAuthorFiltration = document.querySelector('.authorSearch');
  const takeHashtagFiltration = document.querySelector('.hashSearch');
  const dateFromFiltration = document.querySelector('.dateFrom');
  const dateToFiltration = document.querySelector('.dateTo');
  takeAuthorFiltration?.addEventListener('change', filtrationAuthor);
  takeHashtagFiltration?.addEventListener('change', filtrationHashtag);
  dateFromFiltration?.addEventListener('change', filtrationDateFrom);
  dateToFiltration?.addEventListener('change', filtrationDateTo);
}

function asyncFilter() {
  setTimeout(() => {
    filtr();
  }, 1000);
}
asyncFilter();
function filtrationAuthor() {
  const backup = JSON.stringify(allTweetControl.newAllCollectionOfTweet.tws);
  localStorage.setItem('buckupTws', backup);
  allTweetControl.getFeed(0, 10, { author: this.value });
  // allTweetControl.newAllCollectionOfTweet.addAll(JSON.parse(localStorage.getItem('allTws')));
  allTweetControl.filter.display('text', allTweetControl.newAllCollectionOfTweet.tws);
  allTweetControl.filter.display('author', allTweetControl.newAllCollectionOfTweet.tws);
}

function filtrationHashtag() {
  const backup = JSON.stringify(allTweetControl.newAllCollectionOfTweet.tws);
  localStorage.setItem('buckupTws', backup);
  allTweetControl.getFeed(0, 10, { hashtags: this.value });
  allTweetControl.filter.display('text', allTweetControl.newAllCollectionOfTweet.tws);
  allTweetControl.filter.display('author', allTweetControl.newAllCollectionOfTweet.tws);
}

function filtrationDateFrom() {
  const backup = JSON.stringify(allTweetControl.newAllCollectionOfTweet.tws);
  localStorage.setItem('buckupTws', backup);
  return allTweetControl.getFeed(0, 10, { dateFrom: new Date(this.value) });
}

function filtrationDateTo() {
  const backup = JSON.stringify(allTweetControl.newAllCollectionOfTweet.tws);
  localStorage.setItem('buckupTws', backup);
  return allTweetControl.getFeed(0, 10, { dateTo: new Date(this.value) });
}

const clearFilter = document.querySelector('.clearFilter');
clearFilter?.addEventListener('click', () => {
  allTweetControl.restore();
  asyncFilter();
});

const moreTweets = document.querySelector('.moreTrotter');
moreTweets?.addEventListener('click', addTweets);

function pagination() {
  let amount = 10;
  return function () {
    amount += 10;
    return amount;
  };
}
const closure = pagination();
function addTweets() {
  const a = closure();
  const b = requestToBack.getTweet(a);
  allTweetControl.newList.display(allTweetControl.newAllCollectionOfTweet.tws);
  asyncFilter();
}

const mainBlockTrotteListWrapper = document.querySelector('.mainBlockTrotteListWrapper');

if (localStorage.getItem('current User') === null) {
  mainBlockTrotteListWrapper?.classList.add('hidden');
} else {
  allTweetControl.newAllCollectionOfTweet.user = localStorage.getItem('current User');
}

const logoBlockInHeader = document.querySelector('.logoBlockInHeader');
logoBlockInHeader?.addEventListener('click', () => {
  document.location.href = 'main.html';
});

const backInMain = document.querySelector('.backInMain');
backInMain?.addEventListener('click', () => {
  document.location.href = 'main.html';
});

function callTweet(curTw) {
  const currentTweeter = allTweetControl.newAllCollectionOfTweet.get(curTw);
  console.log(currentTweeter);
  allTweetControl.showTweet(curTw);
  const jsonCurTwr = JSON.stringify(currentTweeter);
  localStorage.setItem('curentTweet', jsonCurTwr);
}

class UserController {
  constructor() {
    this._users = JSON.parse(localStorage.getItem('users'));
    UserController.setUserInStore();
  }

  static setUserInStore() {
    if (JSON.parse(localStorage.getItem('users')) === null) {
      const constatnUsers = JSON.stringify([{ Administrator: '111' }]);
      localStorage.setItem('users', constatnUsers);
    }
  }

  static getUserInStorage() {
    return localStorage.getItem('users');
  }

  static checkLogIn(login, password) {
    let allow;
    const warnInLogin = document.querySelector('.badRequest');
    requestToBack.loginStep(login, password)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.statusCode === 403) {
          warnInLogin.innerHTML = res.message;
          warnInLogin.classList.add('visibleBlock');
          setTimeout(() => {
            warnInLogin.classList.toggle('visibleBlock');
          }, 10000);
          allow = false;
        } if (res.statusCode === 400) {
          warnInLogin.innerHTML = 'Ошибка при входе';
          warnInLogin.classList.add('visibleBlock');
          setTimeout(() => {
            warnInLogin.classList.toggle('visibleBlock');
          }, 10000);
          allow = false;
        } else if (res.token) {
          localStorage.setItem('current User', JSON.stringify({
            login,
            token: res.token,
          }));
          warnInLogin.innerHTML = 'Вход выполнен успешно';
          warnInLogin.classList.add('accessReg');
          warnInLogin.classList.add('visibleBlock');
          setTimeout(() => {
            warnInLogin.classList.toggle('visibleBlock');
          }, 5000);
          allTweetControl.setCurrentUSer((JSON.parse(localStorage.getItem('current User'))).login);
          allow = true;
        }
      })
      .catch((error) => error.message);
  }

  static logOut() {
    allTweetControl.headerView.display(null);
    document.location.href = 'logIn.html';
    return localStorage.removeItem('current User');
  }

  static registration(login, password) {
    requestToBack.registration(login, password)
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode) {
          const badRes = document.querySelector('.badRequest');
          badRes.classList.add('visibleBlock');
          setTimeout(() => {
            badRes.classList.toggle('visibleBlock');
          }, 10000);
        } else if ('login' in res) {
          console.log('work');
          const accessReg = document.querySelector('.accessReg');
          accessReg.classList.add('visibleBlock');
          setTimeout(() => {
            accessReg.classList.toggle('visibleBlock');
          }, 10000);
        }
      })
      .catch((error) => error.message);
  }
}

const accessReg = document.querySelector('.accessReg');
const usControll = new UserController();

const login = document.querySelector('#myLogin');
const password = document.querySelector('#password');
const form = document.querySelector('.formInLoginPage');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  await UserController.checkLogIn(login.value, password.value);
  setTimeout(() => {
    if (localStorage.getItem('current User')) {
      document.location.href = 'main.html';
    }
  }, 2000);
});

const logInButton = document.querySelector('.logInButton');
logInButton?.addEventListener('click', redirectToLogin);
const toLogInInRegistration = document.querySelector('.toLogInInRegistration');
toLogInInRegistration?.addEventListener('click', redirectToLogin);

function redirectToLogin() {
  document.location.href = 'logIn.html';
}

const redirectToRegistration = document.querySelector('.redirectToRegistration');
redirectToRegistration?.addEventListener('click', () => {
  document.location.href = 'Registration.html';
});

const logOut = document.querySelector('.buttonLoginOut');
logOut?.addEventListener('click', UserController.logOut);

const loginInReg = document.querySelector('#loginInReg');
const passwordInReg = document.querySelector('#passwordInReg');
const repeatPass = document.querySelector('#repeatPass');
const regForm = document.querySelector('.formInRegPage');
regForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (passwordInReg.value === repeatPass.value && loginInReg.value !== '' && passwordInReg.value !== '') {
    UserController.registration(loginInReg.value, passwordInReg.value);
    passwordInReg.value = null;
    repeatPass.value = null;
    loginInReg.value = null;
  } else if (passwordInReg.value !== repeatPass.value && passwordInReg.value !== '') {
    alert('пароли не совпадают');
  }
});

const correctTrotter = document.querySelector('#trotterList');
correctTrotter?.addEventListener('click', (e) => {
  const currentTweet = e.target.closest('.mainBlockTrotteListTrotter').getAttribute('id');
  if (e.target.classList.contains('correctTrotter')) {
    const editMenu = e.target.children;
    editMenu[0].classList.toggle('visibleBlock');
  }
  if (e.target.classList.contains('deleteCurrentTweet')) {
    allTweetControl.removeTweet(currentTweet);
  }
  if (e.target.classList.contains('editCurrentTweet')) {
    const changeText = prompt('Введите новый текст твита');
    allTweetControl.editTweet(currentTweet, changeText);
  }
  if (e.target.classList.contains('commentToTweet')) {
    callTweet(currentTweet);
    document.location.href = 'twit.html';
  }
});

const correctComment = document.querySelector('.trotterList');
correctComment?.addEventListener('click', (e) => {
  const currentTweet = e.target.closest('.container').getAttribute('id');
  if (e.target.classList.contains('correctTrotter')) {
    const editMenu = e.target.children;
    editMenu[0].classList.toggle('visibleBlock');
  }
  if (e.target.classList.contains('editCurrentTweet')) {
    const changeText = prompt('Введите новый комментарий твита');
    allTweetControl.addTweetComment(currentTweet, changeText);
  }
});

const formForAddNewTweet = document.querySelector('.photoInput');
const addNewTweetInList = document.querySelector('.addNewTweetInList');
formForAddNewTweet?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (localStorage.getItem('current User') !== null) {
    allTweetControl.addTweet(addNewTweetInList.value);
    addNewTweetInList.value = '';
  } else {
    alert('необходимо зарегистрироваться ');
  }
});

const formForAddNewComment = document.querySelector('.addComment');
const valueToAddInComment = document.querySelector('.valueToAddInComment');
formForAddNewComment?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (valueToAddInComment.value !== '') {
    const idTweet = JSON.parse(localStorage.getItem('curentTweet'))._id;
    allTweetControl.addTweetComment(idTweet, valueToAddInComment.value);
    valueToAddInComment.value = '';
  } else alert('введите хоть что-нибудь');
});

const wrapperForBackError = document.querySelector('.wrapperForBackError');
const containerForError = document.createElement('p');
const error = document.createElement('p');
containerForError.classList.add('styleForError');
error.classList.add('styleForError');
error.innerHTML = JSON.parse(localStorage.getItem('error')).statusCode;
containerForError.innerHTML = JSON.parse(localStorage.getItem('error')).error;
wrapperForBackError?.append(error);
wrapperForBackError?.append(containerForError);

requestToBack.webSocket();

/* All

 test create new element with class Tweet
const newTweet = new Tweet('1', 'Hello world', 'John', []);
console.log(newTweet)

test validate method in class
console.log(Tweet.validate({author:'паввп', text: 'asdasd', createAt: new Date(), id: '22222', comments:[]}))
console.log(Tweet.validate({author:'паввп', text: 'asdasd', createAt: new Date(), id: '22222'}))

test validateComment method in Comment class
console.log(Comment.validateComment({author: 'Pol', id: '21312312', createAt: new Date('2022-12-21T15:21:11'),text: 'Buy Buy John'}))

console.log(
Comment.validateComment({
author: 'Pol', id: '21312312', createAt: new Date('2022-12-21T15:21:11')
})
)

console.log(newAllCollectionOfTweet.addAll([{ author: 'Bill' }]));

test change user name
newAllCollectionOfTweet.user = 'Петр Иванов'
console.log(newAllCollectionOfTweet.user)
console.log(newAllCollectionOfTweet)

test getPage method
console.log(newAllCollectionOfTweet.getPage(0, 7, { dateFrom: new Date('2022-02-23T13:12:11') }));
console.log(newAllCollectionOfTweet.getPage(0, 10));
console.log(newAllCollectionOfTweet.getPage(0, 10, { author: 'snow' }));
console.log(newAllCollectionOfTweet.getPage(0, 3, { author: 'Иван Иванов', hashtags: 'hi' }));
console.log(newAllCollectionOfTweet.getPage(0, 2, { author: 'Иван Иванов' }));
console.log(newAllCollectionOfTweet.getPage(0, 3, { author: 'Иван Иванов', hashtags: 'by' }));
console.log(newAllCollectionOfTweet.getPage(0, 3, { author: 'Иван Иванов', dateFrom: new Date('2022-02-22T12:21:11') }));
console.log(newAllCollectionOfTweet.getPage(0, 3, { dateFrom: new Date('2022-02-22T12:21:11') }));
console.log(newAllCollectionOfTweet.getPage(0, 3));
console.log(newAllCollectionOfTweet.getPage(0, 10, { dateTo: new Date('2022-02-23T10:10:11') }));
console.log(newAllCollectionOfTweet.getPage(0, 3));
console.log(newAllCollectionOfTweet.getPage(1, 3));

test get method
console.log(newAllCollectionOfTweet.get('13'));

test add method
newAllCollectionOfTweet.add('hello bro');
newAllCollectionOfTweet.add('hello new world');

test edit
newAllCollectionOfTweet.edit('1', 'Change text of tweet')
console.log(newAllCollectionOfTweet.edit('2', 'Change text of tweet'))
console.log(newAllCollectionOfTweet.edit('1', 'Change the text'));

test remote
newAllCollectionOfTweet.remove('1');

test addComment
console.log(newAllCollectionOfTweet.addComment('1', 'Create new comment'));
newAllCollectionOfTweet.addComment('1', 'Create new comment');
console.log(newAllCollectionOfTweet.addComment('1'));

test addAll method
console.log(newAllCollectionOfTweet.addAll([{
  id: '20',
  createAt: new Date('2022-02-23T13:12:11'),
  author: 'Махатма Ганди',
  comments: [],
}]));
newAllCollectionOfTweet.addAll([{
  id: '5',
  text: 'Поехали #поехали#datamola',
  createAt: new Date('1961-04-12T12:00:00'),
  author: 'Юрий Гагарин',
  comments: [{
    id: '1212',
    text: 'Ну наконец!!!',
    createAt: new Date('1961-04-12T13:00:01'),
    author: 'Сергей Королев',
  }],
}]);

// test setCurrentUser method
// setCurrentUSer('джим Керри');
// setCurrentUSer('John Pol');
// setCurrentUSer('John');

// test addTweet method
// addTweet('Hello world');
// addTweet();

// test edit method
// editTweet('1', 'Edited tweet text');

removeTweet('1');
// removeTweet('11');

// test getFeed method
// getFeed(0, 2);
// getFeed(0, 10, { dateTo: new Date('2022-02-01T12:12:12') });
// getFeed();

showTweet('12');
// // showTweet('1');
Tests */
