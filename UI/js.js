/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line max-classes-per-file

class Tweet {
  constructor(id, text, author, comments = []) {
    this._id = id;
    this.text = text;
    this._createAt = new Date();
    this._author = author;
    this.comments = comments;
  }

  static dateLabel(item) {
    const day = item.createAt.getDate();
    const month = item.createAt.getMonth();
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
    const comment = new Comment(TweetCollection.createNewId(), text, this.user);
    if (newComment && Comment.validateComment(comment)) {
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
      if (Tweet.validate(elem)) {
        this._tws.push(elem);
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
  }

  get id() {
    return this._containerId;
  }

  display(userName = null) {
    const userInHead = document.querySelector(`.${this.id}`);
    const buttonLogIn = document.querySelector('.logInButton');
    const newContainer = document.createElement('div');
    if (userName !== null && userName && allTweetControl.newAllCollectionOfTweet.user === userName) {
      newContainer.classList.add('headerUserBlock');
      newContainer.insertAdjacentHTML(
        'afterbegin',
        `<img src="./assets/UserFoto.svg" alt="userFoto"/>
            <h4 id="userName">${userName}</h4>
            <a class="buttonLoginOut">
                <img src="./assets/buttonLogOut.svg" alt="logOut">
            </a>`,
      );
      userInHead?.append(newContainer);
      userInHead?.replaceChild(newContainer, userInHead.childNodes[0]);
      buttonLogIn?.classList.add('hidden');
    } else {
      alert('Необходимо ввойти');
      buttonLogIn.classList.remove('hidden');
      userInHead.append(buttonLogIn);
      userInHead.replaceChild(buttonLogIn, userInHead.childNodes[0]);
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
        if (elem.author !== allTweetControl.newAllCollectionOfTweet.user || elem.author !== currentUser) {
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
                                <li>${elem.comments.length}</li>
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
  }

  get id() {
    return this._containerId;
  }

  display(curTweet) {
    const mainTrotter = document.querySelector(`#${this.id}`);
    const newContainer = document.createElement('div');
    const currentTrott = allTweetControl.newAllCollectionOfTweet.get(curTweet);
    const currentUser = document.querySelector('#userName')?.innerHTML;

    function editFunction(item) {
      let tweetOwner;
      if (item.author !== allTweetControl.newAllCollectionOfTweet.user || item.author !== currentUser) {
        tweetOwner = 'none';
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

    if (allTweetControl.newAllCollectionOfTweet.tws.length === 0 || curTweet === null) {
      const trottersUndefined = document.createElement('h2');
      trottersUndefined.innerHTML = 'Ups, trotters is undefined';
      trottersUndefined.classList.add('styleForUndefined');
      mainTrotter?.append(trottersUndefined);
    } else {
      mainTrotter?.insertAdjacentHTML(
        'afterbegin',
        `<div class="container">
        <div class="wrapperUserPhoto">
            <img src="./assets/UserFoto.svg" alt="user photo">
        </div>
            <div class="trotter">
                <div class="userInfo">
                    <h3>${currentTrott?.author}</h3>
                    <h4>@${currentTrott?.author}</h4>
                    <h4>${Tweet.dateLabel(currentTrott)}</h4>
                    <button class="correctTrotter" >...</button>
                    <div class="correctTrotterBlock">
                        <ul>
                            <li>
                                <img src="./assets/editTrotterIcon.svg" alt="edit trotter">
                                <p>Edit</p>
                            </li>
                            <li>
                                <img src="./assets/deleteTrotterIcon.svg" alt="delete trotter">
                                <p>Delete</p>
                            </li>
                        </ul>
                    </div>
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
                    <div class="correctTrotterBlock">
                        <ul>
                            <li>
                                <img src="./assets/editTrotterIcon.svg" alt="edit trotter">
                                <p>Edit</p>
                            </li>
                            <li>
                                <img src="./assets/deleteTrotterIcon.svg" alt="delete trotter">
                                <p>Delete</p>
                            </li>
                        </ul>
                    </div>
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
      mainTrotter?.append(newContainer);
      mainTrotter?.replaceChild(newContainer, mainTrotter.childNodes[1]);
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
      serchContainer[1]?.append(filterElement);
      const select = document.querySelector('.hashSearch');
    }
    // serchContainer?.replaceChild(filterElement, serchContainer.childNodes[0]);
  }
}

class TweetsController {
  constructor() {
    this.newAllCollectionOfTweet = new TweetCollection();
    this.newList = new TweetFeedView('trotterList');
    this.headerView = new HeaderView('wrapperForHeaderButton');
    this.selectTweet = new TweetView('mainblocktoAddTrot');
    this.filter = new FilterView('humanSearch');
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
    } else console.log('Валидация не пройдена');
  }

  editTweet(id, text) {
    if (this.newAllCollectionOfTweet.edit(id, text)) {
      this.newList.display(this.newAllCollectionOfTweet.tws);
    } else console.log('Нет прав на редактирование твита');
  }

  removeTweet(id) {
    if (this.newAllCollectionOfTweet.remove(id)) {
      this.newAllCollectionOfTweet.remove(id);
      this.newList.display(this.newAllCollectionOfTweet.tws);
    } else console.log('Нет прав на удаление твита');
  }

  getFeed(skip, top, filterConfig) {
    if (this.newAllCollectionOfTweet.getPage(skip, top, filterConfig)) {
      this.newList.display(this.newAllCollectionOfTweet.tws);
    }
  }

  showTweet(id) {
    if (this.newAllCollectionOfTweet.get(id)) {
      this.selectTweet.display(id);
    } else this.selectTweet.display(null);
  }
}

const allTweetControl = new TweetsController();
allTweetControl.newAllCollectionOfTweet.addAll([
  {
    id: '1',
    text: 'Привет! #js #datamola #hi',
    createAt: new Date('2022-02-09T23:00:00'),
    author: 'Иван Иванов',
    comments: [],
  },
  {
    id: '2',
    text: 'Какие дела?',
    createAt: new Date('2022-02-09T23:00:01'),
    author: 'Петров Петр',
    comments: [{
      id: '912',
      text: 'Хорошо, а у тебя?',
      createAt: new Date('2022-02-09T23:00:05'),
      author: 'Иван ИВанов',
    }],
  },
  {
    id: '3',
    text: 'Как тебе погода? #погода #погода #погода #погода',
    createAt: new Date('2022-02-10T11:03:00'),
    author: 'Семен Семенов',
    comments: [{
      id: '1002',
      text: 'Мне нравится, но могла быть теплее',
      createAt: new Date('2022-03-12:06:00'),
      author: 'Иван Петров',
    }],
  },
  {
    id: '4',
    text: 'Ну где же 3-е сентября #сентябрь #datamola',
    createAt: new Date('2022-02-10T12:01:45'),
    author: 'Михаил Петров',
    comments: [{
      id: '143343',
      text: 'Нужно потерпеть',
      createAt: new Date('2022-03-11T12:22:22'),
      author: 'Григорий Лепс',
    }],
  },
  {
    id: '5',
    text: 'Поехали #поехали #datamola',
    createAt: new Date('1961-03-12T12:00:00'),
    author: 'Юрий Гагарин',
    comments: [{
      id: '1212',
      text: 'Ну наконец!!!',
      createAt: new Date('1961-03-12T13:00:01'),
      author: 'Сергей Королев',
    },
    {
      id: '1414',
      text: 'Ура',
      createAt: new Date('1961-03-12T14:02:01'),
      author: 'Леонид Брежнев',
    }],
  },
  {
    id: '6',
    text: 'Если у тебя получилось обмануть человека, это не значит, что он дурак, это значит, что тебе доверяли больше, чем ты этого заслуживаешь. #обман #datamola',
    createAt: new Date('2022-02-22T09:45:03'),
    author: 'Чарльз Буковски',
    comments: [{
      id: '1616',
      text: 'Хорошо сказано',
      createAt: new Date('2022-02-22T10:01:11'),
      author: 'Джон Буковски',
    }],
  },
  {
    id: '7',
    text: 'Настоящий друг — это человек, который выскажет тебе в глаза все, что о тебе думает, а всем скажет, что ты — замечательный человек. #друг',
    createAt: new Date('2022-01-12T15:03:11'),
    author: 'Омар Хайям',
    comments: [],
  },
  {
    id: '8',
    text: 'Мы в жизни любим только раз, а после ищем лишь похожих.',
    createAt: new Date('2022-02-22T16:00:11'),
    author: 'Сергей Есенин',
    comments: [{
      id: '100009',
      text: 'Очень глубоко',
      createAt: new Date('2022-02-22T16:56:11'),
      author: 'Имя Фамилия',
    }],
  },
  {
    id: '9',
    text: 'Не тот велик, кто никогда не падал, а тот велик — кто падал и вставал! #борись',
    createAt: new Date('2022-02-01T15:00:00'),
    author: 'Конфуций',
    comments: [{
      id: '9191',
      text: 'Сила и труд все перетрут',
      createAt: new Date('2022-02-12T12:22:17'),
      author: 'Даль',
    },
    {
      id: '9898',
      text: 'Понедельник начинается в субботу',
      createAt: new Date('2022-02-21T19:00:00'),
      author: 'Трудолюбивый Человек',
    },
    ],
  },
  {
    id: '10',
    text: 'Победи себя и выиграешь тысячи битв #самссобой',
    createAt: new Date('2022-02-12T22:00:01'),
    author: 'Будда',
    comments: [{
      id: '4545',
      text: 'Это самая главная победа',
      createAt: new Date('2022-02-13T10:10:10'),
      author: 'Cын Будды',
    }],
  },
  {
    id: '11',
    text: 'Прежде чем диагностировать у себя депрессию и заниженную самооценку, убедитесь, что вы не окружены идиотами. #оглянись',
    createAt: new Date('2022-02-05T03:00:11'),
    author: 'Зигмунд Фрейд',
    comments: [],
  },
  {
    id: '12',
    text: 'Если вы уходите и вас никто не зовёт обратно – вы идете в верном направлении. #всеправильно',
    createAt: new Date('2022-02-17T10:17:11'),
    author: 'джим Керри',
    comments: [{
      id: '987',
      text: 'Иногда кажется, что я в тупике',
      createAt: new Date('2022-01-22T15:04:22'),
      author: 'Тупак Шакур',
    }],
  },
  {
    id: '12',
    text: 'Если Вы нарушаете правила, Вас штрафуют; если Вы соблюдаете правила, Вас облагают налогами! #будьхорошим',
    createAt: new Date('2022-01-21T14:34:25'),
    author: 'Лоуренс Питер',
    comments: [{
      id: '412',
      text: 'И как быть?',
      createAt: new Date('2022-01-22T12:00:21'),
      author: 'Злостный Нарушитель',
    }],
  },
  {
    id: '13',
    text: 'Боишься — не делай, делаешь — не бойся, а сделал — не сожалей. #уверенность',
    createAt: new Date('2022-01-12T14:03:29'),
    author: 'Чингисхан',
    comments: [{
      id: '9996',
      text: 'Дать уголовный кодекс почитать?',
      createAt: new Date('2022-01-13T12:00:21'),
      author: 'Неизвестный пользователь',
    }],
  },
  {
    id: '14',
    text: 'Влюбиться можно в красоту, но полюбить – лишь только душу! #любовь',
    createAt: new Date('2022-01-22T12:21:11'),
    author: 'Уильям Шекспир',
    comments: [{
      id: '666',
      text: 'Любовь иногда очень зла',
      createAt: new Date('2022-01-23T11:11:11'),
      author: 'Пол Уокер',
    }],
  },
  {
    id: '15',
    text: 'Безнадёжно — это когда на крышку гроба падает земля. Остальное можно исправить. #не отчаивайся',
    createAt: new Date('2022-01-12T12:12:12'),
    author: 'Джейсон Стэтхэм',
    comments: [],
  },
  {
    id: '16',
    text: 'Мечтай так, как будто будешь жить вечно. Живи так, как будто завтра умрешь. #живи',
    createAt: new Date('2022-01-12T14:03:11'),
    author: 'Виктор Цой',
    comments: [{
      id: '65443',
      text: 'Цой жив!!!',
      createAt: new Date('2022-01-14T10:10:01'),
      author: 'Фан Клуб Цоя',
    },
    {
      id: '1387',
      text: 'Легко сказать',
      createAt: new Date('2022-00-22T18:02:10'),
      author: 'Федор Федоров',
    },
    ],
  },
  {
    id: '17',
    text: 'Человека делают счастливым три вещи: любовь, интересная работа и возможность путешествовать. #счастье',
    createAt: new Date('2022-01-27T14:02:11'),
    author: 'Иван Бунин',
    comments: [],
  },
  {
    id: '18',
    text: 'Ни в коем случае нельзя отчитывать тех, кто старался изо всех сил, но совершил ошибку. #ошибки',
    createAt: new Date('2022-01-11T12:11:10'),
    author: 'Ричард Брэнсон',
    comments: [{
      id: '191817',
      text: 'Со мной в детстве так и было!!',
      createAt: new Date('2022-01-12T19:03:12'),
      author: 'Сэм Брэнсон',
    }],
  },
  {
    id: '19',
    text: 'Ошибки — это знаки препинания жизни, без которых, как и в тексте, не будет смысла. #смысл',
    createAt: new Date('2022-01-06T18:00:09'),
    author: 'Харуки Мураками',
    comments: [],
  },
  {
    id: '20',
    text: 'Человек — это продукт своих собственных мыслей. О чем он думает, тем он и становится. #человек',
    createAt: new Date('2022-01-23T01:12:11'),
    author: 'Махатма Ганди',
    comments: [{
      id: '777',
      text: 'Лучше и не скажешь',
      createAt: new Date('2022-01-23T16:01:11'),
      author: 'Антон Чехов',
    }],
  },
  {
    id: '21',
    text: 'В падающем самолёте нет атеистов. #вера',
    createAt: new Date('2022-02-08T12:21:12'),
    author: 'Михаил Задорнов',
    comments: [],
  },
]);
allTweetControl.filter.display('author', allTweetControl.getTws());
allTweetControl.filter.display('text', allTweetControl.getTws());
allTweetControl.showTweet('1');
allTweetControl.addTweet('hello world');
if (localStorage.getItem('current User')) {
  allTweetControl.setCurrentUSer(localStorage.getItem('current User'));
}

allTweetControl.addTweet('heelllooo');

const takeAuthorFiltration = document.querySelector('.authorSearch');
const takeHashtagFiltration = document.querySelector('.hashSearch');
const dateFromFiltration = document.querySelector('.dateFrom');
const dateToFiltration = document.querySelector('.dateTo');

takeAuthorFiltration?.addEventListener('change', filtrationAuthor);
takeHashtagFiltration?.addEventListener('change', filtrationHashtag);
dateFromFiltration?.addEventListener('change', filtrationDateFrom);
dateToFiltration?.addEventListener('change', filtrationDateTo);

function filtrationAuthor() {
  return allTweetControl.getFeed(0, 10, { author: this.value });
}

function filtrationHashtag() {
  return allTweetControl.getFeed(0, 10, { hashtags: this.value });
}

function filtrationDateFrom() {
  return allTweetControl.getFeed(0, 10, { dateFrom: new Date(this.value) });
}

function filtrationDateTo() {
  return allTweetControl.getFeed(0, 10, { dateTo: new Date(this.value) });
}

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
  console.log(a);
  return allTweetControl.getFeed(0, a);
}

class UserController {
  constructor() {
    this._users = [{ иван: '123' }, { пётр: '321' }, { 'Сергей Есенин': '12345' }, { 'Чарльз Буковски': '12345' }];
    this.usersInStorage = this.setUserInStore();
  }

  setUserInStore() {
    localStorage.setItem('users', JSON.stringify(this._users));
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
    return localStorage.removeItem('current User');
  }

  static registration(login, password) {
    const users = JSON.parse(UserController.getUserInStorage());
    const existen = users.find((elem) => {
      const key = Object.keys(elem)[0];
      if (key === login) {
        alert('такой логин уже существует');
      }
      return key;
    });
    if (existen === undefined) {
      const newUser = {
        [login]: password,
      };
      users.push(newUser);
      localStorage.removeItem('users');
      localStorage.setItem('users', JSON.stringify(users));
      alert('регистрация произошла успешно');
    }
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
    return UserController.checkLogIn(login.value, password.value);
  } if (!UserController.checkLogIn(login.value, password.value)) {
    alert('не верный логин или пароль');
  }
  return e.preventDefault();
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
    UserController.registration(loginInReg.value, passwordInReg.value);
  } else alert('пароли не совпадают');
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
});

const formForAddNewTweet = document.querySelector('.photoInput');
const addNewTweetInList = document.querySelector('.addNewTweetInList');
formForAddNewTweet?.addEventListener('submit', (e) => {
  e.preventDefault();
  allTweetControl.addTweet(addNewTweetInList.value);
  addNewTweetInList.value = '';
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
