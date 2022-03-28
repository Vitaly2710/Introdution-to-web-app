/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line max-classes-per-file
const tweets = [
  {
    id: '1',
    text: 'Привет! #js #datamola',
    createAt: new Date('2022-03-09T23:00:00'),
    author: 'Иван Иванов',
    comments: [],
  },
  {
    id: '2',
    text: 'Какие дела?',
    createAt: new Date('2022-03-09T23:00:01'),
    author: 'Петров Петр',
    comments: [{
      id: '912',
      text: 'Хорошо, а у тебя?',
      createAt: new Date('2022-03-09T23:00:05'),
      author: 'Иван ИВанов',
    }],
  },
  {
    id: '3',
    text: 'Как тебе погода?#погода#погода#погода#погода',
    createAt: new Date('2022-04-10T11:03:00'),
    author: 'Семен Семенов',
    comments: [{
      id: '1002',
      text: 'Мне нравится, но могла быть теплее',
      createAt: new Date('2022-04-11:06:00'),
      author: 'Иван Петров',
    }],
  },
  {
    id: '4',
    text: 'Ну где же 3-е сентября#сентябрь#datamola',
    createAt: new Date('2022-04-10T12:00:12'),
    author: 'Михаил Шуфутинский',
    comments: [{
      id: '143343',
      text: 'Нужно потерпеть',
      createAt: new Date('2022-04-11T12:22:22'),
      author: 'Григорий Лепс',
    }],
  },
  {
    id: '5',
    text: 'Поехали #поехали#datamola',
    createAt: new Date('1961-04-12T12:00:00'),
    author: 'Юрий Гагарин',
    comments: [{
      id: '1212',
      text: 'Ну наконец!!!',
      createAt: new Date('1961-04-12T13:00:01'),
      author: 'Сергей Королев',
    },
    {
      id: '1414',
      text: 'Ура',
      createAt: new Date('1961-04-12T14:02:01'),
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
    createAt: new Date('2022-03-01T15:00:00'),
    author: 'Конфуций',
    comments: [{
      id: '9191',
      text: 'Сила и труд все перетрут',
      createAt: new Date('2022-03-12T12:22:17'),
      author: 'Даль',
    },
    {
      id: '9898',
      text: 'Понедельник начинается в субботу',
      createAt: new Date('2022-03-21T19:00:00'),
      author: 'Трудолюбивый Человек',
    },
    ],
  },
  {
    id: '10',
    text: 'Победи себя и выиграешь тысячи битв#самссобой',
    createAt: new Date('2022-03-12T22:00:01'),
    author: 'Будда',
    comments: [{
      id: '4545',
      text: 'Это самая главная победа',
      createAt: new Date('2022-03-13T10:10:10'),
      author: 'Cын Будды',
    }],
  },
  {
    id: '11',
    text: 'Прежде чем диагностировать у себя депрессию и заниженную самооценку, убедитесь, что вы не окружены идиотами.#оглянись',
    createAt: new Date('2022-03-05T03:00:11'),
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
      createAt: new Date('2022-02-22T15:04:22'),
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
    createAt: new Date('2022-02-22T12:21:11'),
    author: 'Уильям Шекспир',
    comments: [{
      id: '666',
      text: 'Любовь иногда очень зла',
      createAt: new Date('2022-02-23T11:11:11'),
    }],
  },
  {
    id: '15',
    text: 'Безнадёжно — это когда на крышку гроба падает земля. Остальное можно исправить.#не отчаивайся',
    createAt: new Date('2022-02-12T12:12:12'),
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
      createAt: new Date('2022-01-22T18:02:10'),
      author: 'Федор Федоров',
    },
    ],
  },
  {
    id: '17',
    text: 'Человека делают счастливым три вещи: любовь, интересная работа и возможность путешествовать.#счастье',
    createAt: new Date('2022-02-27T14:02:11'),
    author: 'Иван Бунин',
    comments: [],
  },
  {
    id: '18',
    text: 'Ни в коем случае нельзя отчитывать тех, кто старался изо всех сил, но совершил ошибку.#ошибки',
    createAt: new Date('2022-03-11T12:11:10'),
    author: 'Ричард Брэнсон',
    comments: [{
      id: '191817',
      text: 'Со мной в детстве так и было!!',
      createAt: new Date('2022-03-12T19:03:12'),
      author: 'Сэм Брэнсон',
    }],
  },
  {
    id: '19',
    text: 'Ошибки — это знаки препинания жизни, без которых, как и в тексте, не будет смысла.#смысл',
    createAt: new Date('2022-03-06T18:00:09'),
    author: 'Харуки Мураками',
    comments: [],
  },
  {
    id: '20',
    text: 'Человек — это продукт своих собственных мыслей. О чем он думает, тем он и становится.#человек',
    createAt: new Date('2022-02-23T13:12:11'),
    author: 'Махатма Ганди',
    comments: [{
      id: '777',
      text: 'Лучше и не скажешь',
      createAt: new Date('2022-02-23T16:01:11'),
      author: 'Антон Чехов',
    }],
  },
  {
    id: '21',
    text: 'В падающем самолёте нет атеистов.#вера',
    createAt: new Date('2022-03-08T12:21:12'),
    author: 'Михаил Задорнов',
    comments: [],
  },
];

// eslint-disable-next-line no-unused-vars
const myModule = (function () {
  const user = 'Юрий Гагарин';

  // eslint-disable-next-line default-param-last
  function getTweets(top = 0, skip = 10, filterConfig) {
    const filterKeys = filterConfig ? Object.keys(filterConfig) : null;
    let filterTweets;

    if (filterKeys !== null) {
      filterKeys.forEach((filter) => {
        // eslint-disable-next-line default-case
        switch (filter) {
          case 'author':
            filterTweets = tweets.filter((tweet) => tweet.author === filterConfig.author);
            break;
          case 'dateTo':
            filterTweets = tweets.filter((tweet) => tweet.createAt > filterConfig.dateFrom);
            break;
          case 'dateFrom':
            filterTweets = tweets.filter((tweet) => tweet.createAt > filterConfig.dateFrom);
            break;
          case 'hashtags':
            filterTweets = tweets.filter((tweet) => tweet.text.split('#').find((item) => item === filterConfig.hashtags) === filterConfig.hashtags);
            break;
          case 'text':
            filterTweets = tweets.filter((tweet) => tweet.text === filterConfig.text);
            break;
        }
      });
    }

    if (filterKeys === null) {
      tweets.sort((a, b) => b.createAt - a.createAt);
    }
    // eslint-disable-next-line max-len
    filterTweets = filterTweets ? filterTweets.splice(top, skip) : JSON.parse(JSON.stringify(tweets)).splice(top, skip);
    filterTweets.sort((a, b) => b.createAt - a.createAt);
    console.log(filterTweets);
    return filterTweets;
  }

  function getTweet(id) {
    return tweets.find((tweet) => tweet.id === id);
  }

  const commonTemplate = {
    id: (id) => id.length && typeof id === 'string',
    text: (text) => typeof text === 'string' && text.length < 280,
    createAt: (date) => date instanceof Date,
    author: (author) => author.length && typeof author === 'string',
  };

  function validateTweet(tweet) {
    const template = {
      ...commonTemplate,
      comments: (array) => Array.isArray(array),
    };
    const keysTemplate = Object.keys(template);
    const result = keysTemplate.every((key) => template[key](tweet[key]));
    return !!result;
  }

  function addTweet(text) {
    const newTweet = {
      id: String(Math.random()),
      text,
      createAt: new Date(),
      author: user,
      comments: [],
    };

    if (validateTweet(newTweet)) {
      tweets.push(newTweet);
      return true;
    }
    return false;
  }

  function editTweet(id, text) {
    const correctUser = getTweet(id);
    if (validateTweet(correctUser)) {
      correctUser.text = text;
      return true;
    }
    return false;
  }

  function removeTweet(id) {
    const indexForDelete = tweets.findIndex((elem) => elem.id === id && elem.author === user);
    if (indexForDelete !== -1) {
      tweets.splice(indexForDelete, 1);
      return true;
    }
    return false;
  }

  function validateComment(com) {
    const templateKeys = Object.keys(commonTemplate);
    return templateKeys.every((key) => commonTemplate[key](com[key]));
  }

  function addComment(id, text) {
    const newComment = getTweet(id);
    const comment = {
      id: String(Math.random()),
      text,
      author: user,
      createAt: new Date(),
    };
    if (newComment && validateComment(comment)) {
      newComment.comments.push(comment);
      return true;
    }
    return false;
  }

  return {
    user,
    getTweets,
    getTweet,
    validateTweet,
    addTweet,
    editTweet,
    removeTweet,
    validateComment,
    addComment,
    changeUser(usr) {
      this.user = usr;
    },
  };
}());

// test getTweet method
// console.log(myModule.getTweet('5'))

// tests getTweets method
// console.log(myModule.getTweets(0,1,{author:'snow'}))
// console.log(myModule.getTweets(0,4,{hashtags:'datamola'}))
// console.log(myModule.getTweets(0,5,{dateFrom: new Date('2022-02-23T13:12:11')}))
// console.log(myModule.getTweets(10,10))

// test changeUser method
// console.log(myModule.user)
// myModule.changeUser('John')
// console.log(myModule.user)

// test validateTweet method
// console.log(myModule.validateTweet({id:'hello'}))
// myModule.validateTweet({
//     id:'18',
// eslint-disable-next-line max-len
//     text: 'Ни в коем случае нельзя отчитывать тех, кто старался изо всех сил, но совершил ошибку.#ошибки',
//     createAt: new Date('2022-03-11T12:11:10'),
//     author: 'Ричард Брэнсон',
//     comments: []
// })

// test addTweet method
// myModule.addTweet('hello world')
// myModule.addTweet('how are you')
// console.log(tweets)

// test editTweet method
// myModule.editTweet('3','Change tweeter text')
// // console.log(myModule.editTweet('3','Change tweeter text'))
// myModule.editTweet('4','mistake')
// console.log(tweets)

// test removeTweet method
// console.log(myModule.removeTweet('5'))
// console.log(tweets)

// test validateComment method
// console.log(myModule.validateComment({
//     id:'777',
//     text: 'Лучше и не скажешь',
//     createAt: new Date('2022-02-23T16:01:11'),
//     author: 'Антон Чехов'
// }))
// console.log(myModule.validateComment({id:'1919'}))

// test addComment method - not the best implementation and result!!!!!!!!!!!!!!!!!!!!
// myModule.addComment('16','Получилось создать новый коментарий')
// console.log(tweets)

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
// eslint-disable-next-line max-len
// console.log(Tweet.validate({author:'паввп', text: 'asdasd', createAt: new Date(), id: '22222', comments:[]}))
// console.log(Tweet.validate({author:'паввп', text: 'asdasd', createAt: new Date(), id: '22222'}))

class Comment {
  constructor(id, text, createAt, author) {
    this._id = id;
    this.text = text;
    this._createAt = createAt;
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
// eslint-disable-next-line max-len
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
        // eslint-disable-next-line default-case
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
    const newTweet = {
      id: TweetCollection.#createNewId(),
      text,
      createAt: new Date(),
      author: this.user,
      comments: [],
    };

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
    const comment = {
      id: TweetCollection.#createNewId(),
      text,
      author: this.user,
      createAt: new Date(),
    };
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
console.log(newElem);
newElem.addAll([
  {
    id: '1',
    text: 'Привет! #js #datamola #hi',
    createAt: new Date('2022-03-09T23:00:00'),
    author: 'Иван Иванов',
    comments: [],
  },
  {
    id: '2',
    text: 'Какие дела?',
    createAt: new Date('2022-03-09T23:00:01'),
    author: 'Петров Петр',
    comments: [{
      id: '912',
      text: 'Хорошо, а у тебя?',
      createAt: new Date('2022-03-09T23:00:05'),
      author: 'Иван ИВанов',
    }],
  },
  {
    id: '3',
    text: 'Как тебе погода?#погода#погода#погода#погода',
    createAt: new Date('2022-04-10T11:03:00'),
    author: 'Семен Семенов',
    comments: [{
      id: '1002',
      text: 'Мне нравится, но могла быть теплее',
      createAt: new Date('2022-04-11:06:00'),
      author: 'Иван Петров',
    }],
  },
  {
    id: '4',
    text: 'Ну где же 3-е сентября#сентябрь#datamola',
    createAt: new Date('2022-04-10T12:00:12'),
    author: 'Михаил Шуфутинский',
    comments: [{
      id: '143343',
      text: 'Нужно потерпеть',
      createAt: new Date('2022-04-11T12:22:22'),
      author: 'Григорий Лепс',
    }],
  },
  {
    id: '5',
    text: 'Поехали #поехали#datamola',
    createAt: new Date('1961-04-12T12:00:00'),
    author: 'Юрий Гагарин',
    comments: [{
      id: '1212',
      text: 'Ну наконец!!!',
      createAt: new Date('1961-04-12T13:00:01'),
      author: 'Сергей Королев',
    },
    {
      id: '1414',
      text: 'Ура',
      createAt: new Date('1961-04-12T14:02:01'),
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
    createAt: new Date('2022-03-01T15:00:00'),
    author: 'Конфуций',
    comments: [{
      id: '9191',
      text: 'Сила и труд все перетрут',
      createAt: new Date('2022-03-12T12:22:17'),
      author: 'Даль',
    },
    {
      id: '9898',
      text: 'Понедельник начинается в субботу',
      createAt: new Date('2022-03-21T19:00:00'),
      author: 'Трудолюбивый Человек',
    },
    ],
  },
  {
    id: '10',
    text: 'Победи себя и выиграешь тысячи битв#самссобой',
    createAt: new Date('2022-03-12T22:00:01'),
    author: 'Будда',
    comments: [{
      id: '4545',
      text: 'Это самая главная победа',
      createAt: new Date('2022-03-13T10:10:10'),
      author: 'Cын Будды',
    }],
  },
  {
    id: '11',
    text: 'Прежде чем диагностировать у себя депрессию и заниженную самооценку, убедитесь, что вы не окружены идиотами.#оглянись',
    createAt: new Date('2022-03-05T03:00:11'),
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
      createAt: new Date('2022-02-22T15:04:22'),
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
    createAt: new Date('2022-02-22T12:21:11'),
    author: 'Уильям Шекспир',
    comments: [{
      id: '666',
      text: 'Любовь иногда очень зла',
      createAt: new Date('2022-02-23T11:11:11'),
    }],
  },
  {
    id: '15',
    text: 'Безнадёжно — это когда на крышку гроба падает земля. Остальное можно исправить.#не отчаивайся',
    createAt: new Date('2022-02-12T12:12:12'),
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
      createAt: new Date('2022-01-22T18:02:10'),
      author: 'Федор Федоров',
    },
    ],
  },
  {
    id: '17',
    text: 'Человека делают счастливым три вещи: любовь, интересная работа и возможность путешествовать.#счастье',
    createAt: new Date('2022-02-27T14:02:11'),
    author: 'Иван Бунин',
    comments: [],
  },
  {
    id: '18',
    text: 'Ни в коем случае нельзя отчитывать тех, кто старался изо всех сил, но совершил ошибку.#ошибки',
    createAt: new Date('2022-03-11T12:11:10'),
    author: 'Ричард Брэнсон',
    comments: [{
      id: '191817',
      text: 'Со мной в детстве так и было!!',
      createAt: new Date('2022-03-12T19:03:12'),
      author: 'Сэм Брэнсон',
    }],
  },
  {
    id: '19',
    text: 'Ошибки — это знаки препинания жизни, без которых, как и в тексте, не будет смысла.#смысл',
    createAt: new Date('2022-03-06T18:00:09'),
    author: 'Харуки Мураками',
    comments: [],
  },
  {
    id: '20',
    text: 'Человек — это продукт своих собственных мыслей. О чем он думает, тем он и становится.#человек',
    createAt: new Date('2022-02-23T13:12:11'),
    author: 'Махатма Ганди',
    comments: [{
      id: '777',
      text: 'Лучше и не скажешь',
      createAt: new Date('2022-02-23T16:01:11'),
      author: 'Антон Чехов',
    }],
  },
  {
    id: '21',
    text: 'В падающем самолёте нет атеистов.#вера',
    createAt: new Date('2022-03-08T12:21:12'),
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
// newElem.add('hello bro')
// newElem.add('hello new world');

// test edit
// newElem.edit('1', 'Change text of tweet')
// console.log(newElem.edit('2', 'Change text of tweet'))
// console.log(newElem.edit('1', 'Change the text'));

// test remote
// newElem.remove('1');

// test addComment
// newElem.addComment('1', 'Create new comment')

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
