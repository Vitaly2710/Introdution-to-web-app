/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line max-classes-per-file

class Tweet {
  constructor(id, text, author, comments = [], createAt = new Date()) {
    this._id = id;
    this.text = text;
    this._createAt = createAt;
    this._author = author;
    this.comments = comments;
  }

  static dateLabel(item) {
    const day = new Date(item.createAt).getDate();
    const month = new Date(item.createAt).getMonth();
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
    if (Tweet.validate(correctUser) && correctUser.author === this._user) {
      correctUser.text = text;
      return true;
    }
    return false;
  }

  remove(id) {
    const indexForDelete = this.tws
      .findIndex((elem) => elem.id === id && elem.author === this._user);
    if (indexForDelete !== -1) {
      this._tws.splice(indexForDelete, 1);
      return true;
    }
    return false;
  }

  addComment(id, text) {
    const newComment = this.get(id);
    const com = new Comment(TweetCollection.createNewId(), text, this.user);
    const comment = {
      id: com._id, text: com.text, createAt: com._createAt, author: com._author,
    };
    if (newComment && Comment.validateComment(comment)) {
      console.log('wwwwwwwwwwwwwwww');
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
        newElem = new Tweet(elem.id, elem.text, elem.author, elem.comments, new Date(elem.createAt));
      } else if (elem.id === undefined) {
        newElem = new Tweet(elem._id, elem.text, elem._author, elem.comments, new Date(elem._createAt));
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
    this.display(JSON.stringify(localStorage.getItem('current User')));
  }

  get id() {
    return this._containerId;
  }

  display(userName = null) {
    const userInHead = document.querySelector(`.${this.id}`);
    const buttonLogIn = document.querySelector('.logInButton');
    const newContainer = document.createElement('div');
    if (userName !== null && userName !== 'null') {
      const userNameWithout = userName.replace(/"/g, '');
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
      alert('Необходимо ввойти');
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
        id: curTweet?.id, text: curTweet?.text, createAt: curTweet?.createAt, comments: curTweet?.comments, author: curTweet?.author,
      };
    } else {
      currentTrott = {
        id: curTweet._id, text: curTweet.text, createAt: curTweet._createAt, comments: curTweet.comments, author: curTweet._author,
      };
    }
    const currentUser = document.querySelector('#userName')?.innerHTML;
    newContainer.classList.add('trotterList');

    function editFunction(item) {
      let tweetOwner;
      console.log(item.author, currentUser);
      if (item.author !== currentTrott) {
        tweetOwner = 'unvisibleBlock';
      } else { tweetOwner = 'correctTrotter'; }
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
      mainTrotter?.replaceChild(newContainer, mainTrotter.childNodes[1]);
      mainTrotter?.append(newContainer);
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
    if (param === 'author') {
      tweets.forEach((elem, index) => {
        const itemIsSearch = elem[param];
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
            hashtags.push(r);
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
        console.log('ssss');
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

  restore() {
    if (localStorage.getItem('allTws') === null || localStorage.getItem('allTws') === 'null') {
      console.log('work');
      const allTws = [
        {
          _id: '1',
          text: 'Привет! #js #datamola #hi',
          _createAt: '2022-02-09T23:00:00',
          _author: 'Иван Иванов',
          comments: [],
        },
        {
          _id: '2',
          text: 'Какие дела?',
          _createAt: new Date('2022-02-09T23:00:01'),
          _author: 'Петров Петр',
          comments: [{
            id: '912',
            text: 'Хорошо, а у тебя?',
            createAt: new Date('2022-02-09T23:00:05'),
            author: 'Иван ИВанов',
          }],
        },
        {
          _id: '3',
          text: 'Как тебе погода? #погода #погода #погода #погода',
          _createAt: new Date('2022-02-10T11:03:00'),
          _author: 'Семен Семенов',
          comments: [{
            id: '1002',
            text: 'Мне нравится, но могла быть теплее',
            createAt: new Date('2022-03-12:06:00'),
            author: 'Иван Петров',
          }],
        },
        {
          _id: '4',
          text: 'Ну где же 3-е сентября #сентябрь #datamola',
          _createAt: new Date('2022-02-10T12:01:45'),
          _author: 'Михаил Петров',
          comments: [{
            id: '143343',
            text: 'Нужно потерпеть',
            createAt: new Date('2022-03-11T12:22:22'),
            author: 'Григорий Лепс',
          }],
        },
        {
          _id: '5',
          text: 'Поехали #поехали #datamola',
          _createAt: new Date('1961-03-12T12:00:00'),
          _author: 'Юрий Гагарин',
          comments: [{
            id: '1212',
            text: 'Ну наконец!!!',
            createAt: new Date('1961-03-12T13:00:01'),
            author: 'Сергей Королев',
          },
          {
            _id: '1414',
            text: 'Ура',
            _createAt: new Date('1961-03-12T14:02:01'),
            _author: 'Леонид Брежнев',
          }],
        },
        {
          _id: '6',
          text: 'Если у тебя получилось обмануть человека, это не значит, что он дурак, это значит, что тебе доверяли больше, чем ты этого заслуживаешь. #обман #datamola',
          _createAt: new Date('2022-02-22T09:45:03'),
          _author: 'Чарльз Буковски',
          comments: [{
            id: '1616',
            text: 'Хорошо сказано',
            createAt: new Date('2022-02-22T10:01:11'),
            author: 'Джон Буковски',
          }],
        },
        {
          _id: '7',
          text: 'Настоящий друг — это человек, который выскажет тебе в глаза все, что о тебе думает, а всем скажет, что ты — замечательный человек. #друг',
          _createAt: new Date('2022-01-12T15:03:11'),
          _author: 'Омар Хайям',
          comments: [],
        },
        {
          _id: '8',
          text: 'Мы в жизни любим только раз, а после ищем лишь похожих.',
          _createAt: new Date('2022-02-22T16:00:11'),
          _author: 'Сергей Есенин',
          comments: [{
            id: '100009',
            text: 'Очень глубоко',
            createAt: new Date('2022-02-22T16:56:11'),
            author: 'Имя Фамилия',
          }],
        },
        {
          _id: '9',
          text: 'Не тот велик, кто никогда не падал, а тот велик — кто падал и вставал! #борись',
          _createAt: new Date('2022-02-01T15:00:00'),
          _author: 'Конфуций',
          comments: [{
            id: '9191',
            text: 'Сила и труд все перетрут',
            createAt: new Date('2022-02-12T12:22:17'),
            author: 'Даль',
          },
          {
            _id: '9898',
            text: 'Понедельник начинается в субботу',
            _createAt: new Date('2022-02-21T19:00:00'),
            _author: 'Трудолюбивый Человек',
          },
          ],
        },
        {
          _id: '10',
          text: 'Победи себя и выиграешь тысячи битв #самссобой',
          _createAt: new Date('2022-02-12T22:00:01'),
          _author: 'Будда',
          comments: [{
            id: '4545',
            text: 'Это самая главная победа',
            createAt: new Date('2022-02-13T10:10:10'),
            author: 'Cын Будды',
          }],
        },
        {
          _id: '11',
          text: 'Прежде чем диагностировать у себя депрессию и заниженную самооценку, убедитесь, что вы не окружены идиотами. #оглянись',
          _createAt: new Date('2022-02-05T03:00:11'),
          _author: 'Зигмунд Фрейд',
          comments: [],
        },
        {
          _id: '12',
          text: 'Если вы уходите и вас никто не зовёт обратно – вы идете в верном направлении. #всеправильно',
          _createAt: new Date('2022-02-17T10:17:11'),
          _author: 'джим Керри',
          comments: [{
            id: '987',
            text: 'Иногда кажется, что я в тупике',
            createAt: new Date('2022-01-22T15:04:22'),
            author: 'Тупак Шакур',
          }],
        },
        {
          _id: '12',
          text: 'Если Вы нарушаете правила, Вас штрафуют; если Вы соблюдаете правила, Вас облагают налогами! #будьхорошим',
          _createAt: new Date('2022-01-21T14:34:25'),
          _author: 'Лоуренс Питер',
          comments: [{
            id: '412',
            text: 'И как быть?',
            createAt: new Date('2022-01-22T12:00:21'),
            author: 'Злостный Нарушитель',
          }],
        },
        {
          _id: '13',
          text: 'Боишься — не делай, делаешь — не бойся, а сделал — не сожалей. #уверенность',
          _createAt: new Date('2022-01-12T14:03:29'),
          _author: 'Чингисхан',
          comments: [{
            id: '9996',
            text: 'Дать уголовный кодекс почитать?',
            createAt: new Date('2022-01-13T12:00:21'),
            author: 'Неизвестный пользователь',
          }],
        },
        {
          _id: '14',
          text: 'Влюбиться можно в красоту, но полюбить – лишь только душу! #любовь',
          _createAt: new Date('2022-01-22T12:21:11'),
          _author: 'Уильям Шекспир',
          comments: [{
            id: '666',
            text: 'Любовь иногда очень зла',
            createAt: new Date('2022-01-23T11:11:11'),
            author: 'Пол Уокер',
          }],
        },
        {
          _id: '15',
          text: 'Безнадёжно — это когда на крышку гроба падает земля. Остальное можно исправить. #не отчаивайся',
          _createAt: new Date('2022-01-12T12:12:12'),
          _author: 'Джейсон Стэтхэм',
          comments: [],
        },
        {
          _id: '16',
          text: 'Мечтай так, как будто будешь жить вечно. Живи так, как будто завтра умрешь. #живи',
          _createAt: new Date('2022-01-12T14:03:11'),
          _author: 'Виктор Цой',
          comments: [{
            id: '65443',
            text: 'Цой жив!!!',
            createAt: new Date('2022-01-14T10:10:01'),
            author: 'Фан Клуб Цоя',
          },
          {
            _id: '1387',
            text: 'Легко сказать',
            _createAt: new Date('2022-00-22T18:02:10'),
            _author: 'Федор Федоров',
          },
          ],
        },
        {
          _id: '17',
          text: 'Человека делают счастливым три вещи: любовь, интересная работа и возможность путешествовать. #счастье',
          _createAt: new Date('2022-01-27T14:02:11'),
          _author: 'Иван Бунин',
          comments: [],
        },
        {
          _id: '18',
          text: 'Ни в коем случае нельзя отчитывать тех, кто старался изо всех сил, но совершил ошибку. #ошибки',
          _createAt: new Date('2022-01-11T12:11:10'),
          _author: 'Ричард Брэнсон',
          comments: [{
            id: '191817',
            text: 'Со мной в детстве так и было!!',
            createAt: new Date('2022-01-12T19:03:12'),
            author: 'Сэм Брэнсон',
          }],
        },
        {
          _id: '19',
          text: 'Ошибки — это знаки препинания жизни, без которых, как и в тексте, не будет смысла. #смысл',
          _createAt: new Date('2022-01-06T18:00:09'),
          _author: 'Харуки Мураками',
          comments: [],
        },
        {
          _id: '20',
          text: 'Человек — это продукт своих собственных мыслей. О чем он думает, тем он и становится. #человек',
          _createAt: new Date('2022-01-23T01:12:11'),
          _author: 'Махатма Ганди',
          comments: [{
            id: '777',
            text: 'Лучше и не скажешь',
            createAt: new Date('2022-01-23T16:01:11'),
            author: 'Антон Чехов',
          }],
        },
        {
          _id: '21',
          text: 'В падающем самолёте нет атеистов. #вера',
          _createAt: new Date('2022-02-08T12:21:12'),
          _author: 'Михаил Задорнов',
          comments: [],
        },
      ];
      localStorage.setItem('allTws', JSON.stringify(allTws));
    }
    this.newAllCollectionOfTweet.addAll(JSON.parse(localStorage.getItem('allTws')));
    this.newList.display(this.newAllCollectionOfTweet.tws);
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

  addTweet(text) {
    if (this.newAllCollectionOfTweet.add(text)) {
      this.newList.display(this.newAllCollectionOfTweet.tws);
      TweetsController.save(this.newAllCollectionOfTweet.tws);
    } else console.log('Валидация не пройдена');
  }

  addTweetComment(id, text) {
    if (this.newAllCollectionOfTweet.addComment(id, text)) {
      this.selectTweet.display(this.newAllCollectionOfTweet.get(id));
      const newCom = this.newAllCollectionOfTweet.get(id);
      const hell = JSON.parse(localStorage.getItem('curentTweet'));
      TweetsController.saveComment(id);
    } else this.selectTweet.display(null);
  }

  editTweet(id, text) {
    if (this.newAllCollectionOfTweet.edit(id, text)) {
      this.newList.display(this.newAllCollectionOfTweet.tws);
      TweetsController.save(this.newAllCollectionOfTweet.tws);
    } else console.log('Нет прав на редактирование твита');
  }

  removeTweet(id) {
    if (this.newAllCollectionOfTweet.remove(id)) {
      this.newAllCollectionOfTweet.remove(id);
      this.newList.display(this.newAllCollectionOfTweet.tws);
      TweetsController.save(this.newAllCollectionOfTweet.tws);
    } else console.log('Нет прав на удаление твита');
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
      console.log('qqqq');
    } else {
      this.selectTweet.display(null);
    }
  }
}

const allTweetControl = new TweetsController();
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
  const comebackTws = JSON.parse(localStorage.getItem('buckupTws'));
  localStorage.setItem('allTws', localStorage.getItem('buckupTws'));
  localStorage.removeItem('buckupTws');

  allTweetControl.newAllCollectionOfTweet.addAll(JSON.parse(localStorage.getItem('allTws')));
  allTweetControl.newList.display(allTweetControl.newAllCollectionOfTweet.tws);
  allTweetControl.filter.display('author', allTweetControl.newAllCollectionOfTweet.tws);
  allTweetControl.filter.display('text', allTweetControl.newAllCollectionOfTweet.tws);
});

const moreTweets = document.querySelector('.moreTrotter');
moreTweets?.addEventListener('click', addTweets);

function pagination() {
  let amount = 0;
  return function () {
    amount += 10;
    return amount;
  };
}
const closure = pagination();
function addTweets() {
  const a = closure();
  const b = allTweetControl.newAllCollectionOfTweet.tws.slice(0, a);
  allTweetControl.newList.display(b);
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
    const users = JSON.parse(UserController.getUserInStorage());
    let check = false;
    users.forEach((element) => {
      const key = Object.keys(element)[0];
      const value = Object.values(element)[0];
      if (key === login) {
        if (value === password) {
          check = true;
          allTweetControl.setCurrentUSer(login);
          return localStorage.setItem('current User', `${login}`);
        }
      }
      return check;
    });

    return check;
  }

  static logOut() {
    alert('выполнен выход');
    allTweetControl.headerView.display(null);
    document.location.href = 'logIn.html';
    return localStorage.removeItem('current User');
  }

  static registration(login, password) {
    const users = JSON.parse(UserController.getUserInStorage());
    const existen = users.every(checkUsers);
    function checkUsers(element) {
      console.log(Object.keys(element)[0]);
      if (Object.keys(element)[0] === login) {
        return false;
      }
      return true;
    }
    console.log(existen);
    if (existen) {
      const newUser = {
        [login]: password,
      };
      console.log(newUser);
      users.push(newUser);
      localStorage.removeItem('users');
      localStorage.setItem('users', JSON.stringify(users));
      alert('регистрация произошла успешно');
    } else alert('такой пользователь существует');
  }
}
const usControll = new UserController();

const login = document.querySelector('#myLogin');
const password = document.querySelector('#password');
const form = document.querySelector('.formInLoginPage');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (UserController.checkLogIn(login.value, password.value)) {
    alert('вход выполнен успешно');
    UserController.checkLogIn(login.value, password.value);
    document.location.href = 'main.html';
    return;
  } if (!UserController.checkLogIn(login.value, password.value)) {
    alert('не верный логин или пароль');
  }
  return e.preventDefault();
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
  if (passwordInReg.value === repeatPass.value) {
    document.location.href = 'logIn.html';
    return UserController.registration(loginInReg.value, passwordInReg.value);
  } alert('пароли не совпадают');
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
