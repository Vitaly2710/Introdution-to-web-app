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

// test create new element with class Tweet
// const newTweet = new Tweet('1', 'Hello world', 'John', []);
// console.log(newTweet)

// test validate method in class
// console.log(Tweet.validate({author:'паввп', text: 'asdasd', createAt: new Date(), id: '22222', comments:[]}))
// console.log(Tweet.validate({author:'паввп', text: 'asdasd', createAt: new Date(), id: '22222'}))

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

// test validateComment method in Comment class
// console.log(Comment.validateComment({author: 'Pol', id: '21312312', createAt: new Date('2022-12-21T15:21:11'),text: 'Buy Buy John'}))

// console.log(
// Comment.validateComment({
// author: 'Pol', id: '21312312', createAt: new Date('2022-12-21T15:21:11')
// })
// )

class TweetCollection {
  constructor(tws = []) {
    this._user = 'Иван Иванов';
    this._tws = tws;
  }

  get user() {
    return this._user;
  }

  set user(user) {
    if (typeof user === 'string' && this._user) {
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
    return filterTweets;
  }

  get(id) {
    return this._tws.find((tweet) => tweet.id === id);
  }

  static #createNewId() {
    return String(Math.random());
  }

  add(text) {
    const newTweet = new Tweet(TweetCollection.#createNewId(), text, this.user);
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
    const comment = new Comment(TweetCollection.#createNewId(), text, this.user);
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

// create new element
const newElem = new TweetCollection();
newElem.addAll([
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
    text: 'Ну где же 3-е сентября#сентябрь#datamola',
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
    text: 'Поехали #поехали#datamola',
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
    text: 'Если у тебя получилось обмануть человека, это не значит, что он дурак, это значит, что тебе доверяли больше, чем ты этого заслуживаешь.#обман#datamola',
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
    text: 'Настоящий друг — это человек, который выскажет тебе в глаза все, что о тебе думает, а всем скажет, что ты — замечательный человек.#друг',
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
    text: 'Не тот велик, кто никогда не падал, а тот велик — кто падал и вставал!#борись',
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
    text: 'Победи себя и выиграешь тысячи битв#самссобой',
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
    text: 'Прежде чем диагностировать у себя депрессию и заниженную самооценку, убедитесь, что вы не окружены идиотами.#оглянись',
    createAt: new Date('2022-02-05T03:00:11'),
    author: 'Зигмунд Фрейд',
    comments: [],
  },
  {
    id: '12',
    text: 'Если вы уходите и вас никто не зовёт обратно – вы идете в верном направлении.#всеправильно',
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
    text: 'Если Вы нарушаете правила, Вас штрафуют; если Вы соблюдаете правила, Вас облагают налогами!#будьхорошим',
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
    text: 'Боишься — не делай, делаешь — не бойся, а сделал — не сожалей.#уверенность',
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
    text: 'Влюбиться можно в красоту, но полюбить – лишь только душу!#любовь',
    createAt: new Date('2022-01-22T12:21:11'),
    author: 'Уильям Шекспир',
    comments: [{
      id: '666',
      text: 'Любовь иногда очень зла',
      createAt: new Date('2022-01-23T11:11:11'),
    }],
  },
  {
    id: '15',
    text: 'Безнадёжно — это когда на крышку гроба падает земля. Остальное можно исправить.#не отчаивайся',
    createAt: new Date('2022-01-12T12:12:12'),
    author: 'Джейсон Стэтхэм',
    comments: [],
  },
  {
    id: '16',
    text: 'Мечтай так, как будто будешь жить вечно. Живи так, как будто завтра умрешь.#живи',
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
    text: 'Человека делают счастливым три вещи: любовь, интересная работа и возможность путешествовать.#счастье',
    createAt: new Date('2022-01-27T14:02:11'),
    author: 'Иван Бунин',
    comments: [],
  },
  {
    id: '18',
    text: 'Ни в коем случае нельзя отчитывать тех, кто старался изо всех сил, но совершил ошибку.#ошибки',
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
    text: 'Ошибки — это знаки препинания жизни, без которых, как и в тексте, не будет смысла.#смысл',
    createAt: new Date('2022-01-06T18:00:09'),
    author: 'Харуки Мураками',
    comments: [],
  },
  {
    id: '20',
    text: 'Человек — это продукт своих собственных мыслей. О чем он думает, тем он и становится.#человек',
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
    text: 'В падающем самолёте нет атеистов.#вера',
    createAt: new Date('2022-02-08T12:21:12'),
    author: 'Михаил Задорнов',
    comments: [],
  },
]);

// console.log(newElem.addAll([{ author: 'Bill' }]));

// test change user name
// newElem.user = 'Петр Иванов'
// console.log(newElem.user)
// console.log(newElem)

// test getPage method
// console.log(newElem.getPage(0, 7, { dateFrom: new Date('2022-02-23T13:12:11') }));
// console.log(newElem.getPage(0, 10));
// console.log(newElem.getPage(0, 10, { author: 'snow' }));
// console.log(newElem.getPage(0, 3, { author: 'Иван Иванов', hashtags: 'hi' }));
// console.log(newElem.getPage(0, 2, { author: 'Иван Иванов' }));
// console.log(newElem.getPage(0, 3, { author: 'Иван Иванов', hashtags: 'by' }));
// console.log(newElem.getPage(0, 3, { author: 'Иван Иванов', dateFrom: new Date('2022-02-22T12:21:11') }));
// console.log(newElem.getPage(0, 3, { dateFrom: new Date('2022-02-22T12:21:11') }));
// console.log(newElem.getPage(0, 3));
// console.log(newElem.getPage(0, 10, { dateTo: new Date('2022-02-23T10:10:11') }));
// console.log(newElem.getPage(0, 3));
// console.log(newElem.getPage(1, 3));

// test get method
// console.log(newElem.get('13'));

// test add method
// newElem.add('hello bro');
// newElem.add('hello new world');

// test edit
// newElem.edit('1', 'Change text of tweet')
// console.log(newElem.edit('2', 'Change text of tweet'))
// console.log(newElem.edit('1', 'Change the text'));

// test remote
// newElem.remove('1');

// test addComment
// console.log(newElem.addComment('1', 'Create new comment'));
// newElem.addComment('1', 'Create new comment');
// console.log(newElem.addComment('1'));

// test addAll method
// console.log(newElem.addAll([{
//   id: '20',
//   createAt: new Date('2022-02-23T13:12:11'),
//   author: 'Махатма Ганди',
//   comments: [],
// }]));
// newElem.addAll([{
//   id: '5',
//   text: 'Поехали #поехали#datamola',
//   createAt: new Date('1961-04-12T12:00:00'),
//   author: 'Юрий Гагарин',
//   comments: [{
//     id: '1212',
//     text: 'Ну наконец!!!',
//     createAt: new Date('1961-04-12T13:00:01'),
//     author: 'Сергей Королев',
//   }],
// }]);

class HeaderView {
  constructor(id) {
    this._containerId = id;
  }

  get id() {
    return this._containerId;
  }

  display(params = null) {
    if (params !== null) {
      const userInHead = document.querySelector(`.${this.id}`);
      userInHead.classList.toggle('headerUserBlock');
      const buttonLogIn = document.querySelector('.logInButton');
      buttonLogIn.classList.toggle(`${this.id}`);
      const changeNAme = document.querySelector('#userName');
      changeNAme.innerHTML = `${params}`;
    } else {
      alert('Необходимо ввойти');
    }
  }
}

const headerView = new HeaderView('hidden');
headerView.display('John Palansky');
headerView.display();

class TweetFeedView {
  constructor(containerId) {
    this._containerId = containerId;
  }

  get containerId() {
    return this._containerId;
  }

  display(params) {
    const wrapperForTrotterList = document.querySelector(`#${this.containerId}`);
    newElem.tws.forEach((elem) => {
      const time = () => {
        const day = elem.createAt.getDate();
        const month = elem.createAt.getMonth();
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
      };

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
      wrapperForTrotterList.insertAdjacentHTML(
        'beforeend',
        `<div class="mainBlockTrotteListTrotter">
                <div class="container">
                    <div class="wrapperUserPhoto">
                        <img src="./assets/UserFoto.svg" alt="user photo">
                    </div>
                    <div class="trotter">
                        <div class="userInfo">
                            <h3>${elem.author}</h3>
                            <h4>@${elem.author}</h4>
                            <h4>${time()}</h4>
                            <button class=correctTrotter>...</button>
                            <div class="correctTrotterBlock">
                                <ul>
                                    <li>
                                        <img src=".assetseditTrotterIcon.svg" alt="edit trotter">
                                        <p>Edit</p>
                                    </li>
                                    <li>
                                        <img src=".assetsdeleteTrotterIcon.svg" alt="delete trotter">
                                        <p>Delete</p>
                                    </li>
                                </ul>>
                            </div>
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
    });
    wrapperForTrotterList.classList.add(params);
  }
}

const newList = new TweetFeedView('trotterList');
newList.display('allTrotts');
