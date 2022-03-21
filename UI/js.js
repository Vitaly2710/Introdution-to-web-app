const tweets = [
  {
    id:`1`,
    text: 'Привет! #js #datamola',
    createAt: new Date('2022-03-09T23:00:00'),
    author:'Иван Иванов',
    comments:[]
  },
  {
    id:'2',
    text:'Какие дела?',
    createAt: new Date('2022-03-09T23:00:01'),
    author: 'Петров Петр',
    comments: [{
      id:'912',
      text: 'Хорошо, а у тебя?',
      createAt: new Date ('2022-03-09T23:00:05'),
      author:'Иван ИВанов'
    }]
  },
  {
    id:'3',
    text: 'Как тебе погода?#погода#погода#погода#погода',
    createAt: new Date ('2022-04-10T11:03:00'),
    author: 'Семен Семенов',
    comments: [{
      id:'1002',
      text: 'Мне нравится, но могла быть теплее',
      createAt: new Date('2022-04-11:06:00'),
      author: 'Иван Петров'
    }]
  },
  {
    id: '4',
    text: 'Ну где же 3-е сентября#сентябрь#datamola',
    createAt: new Date('2022-04-10T12:00:12'),
    author: 'Михаил Шуфутинский',
    comments: [{
      id:'143343',
      text: 'Нужно потерпеть',
      createAt: new Date('2022-04-11T12:22:22'),
      author: 'Григорий Лепс'
    }]
  },
  {
    id:'5',
    text: 'Поехали #поехали#datamola',
    createAt: new Date('1961-04-12T12:00:00'),
    author: 'Юрий Гагарин',
    comments: [{
      id:'1212',
      text:'Ну наконец!!!',
      createAt: new Date('1961-04-12T13:00:01'),
      author: 'Сергей Королев'
    },
      {
        id:'1414',
        text: 'Ура',
        createAt: new Date('1961-04-12T14:02:01'),
        author: 'Леонид Брежнев'
      }]
  },
  {
    id:'6',
    text: 'Если у тебя получилось обмануть человека, это не значит, что он дурак, это значит, что тебе доверяли больше, чем ты этого заслуживаешь.#обман#datamola',
    createAt: new Date('2022-02-22T09:45:03'),
    author: 'Чарльз Буковски',
    comments: [{
      id: '1616',
      text: 'Хорошо сказано',
      createAt: new Date('2022-02-22T10:01:11'),
      author: 'Джон Буковски'
    }]
  },
  {
    id:'7',
    text: 'Настоящий друг — это человек, который выскажет тебе в глаза все, что о тебе думает, а всем скажет, что ты — замечательный человек.#друг',
    createAt: new Date('2022-01-12T15:03:11'),
    author: 'Омар Хайям',
    comments: []
  },
  {
    id:'8',
    text: 'Мы в жизни любим только раз, а после ищем лишь похожих.',
    createAt: new Date('2022-02-22T16:00:11'),
    author: 'Сергей Есенин',
    comments: [{
      id:'100009',
      text: 'Очень глубоко',
      createAt: new Date('2022-02-22T16:56:11'),
      author: 'Имя Фамилия'
    }]
  },
  {
    id:'9',
    text: 'Не тот велик, кто никогда не падал, а тот велик — кто падал и вставал!#борись',
    createAt: new Date('2022-03-01T15:00:00'),
    author: 'Конфуций',
    comments: [{
      id:'9191',
      text: 'Сила и труд все перетрут',
      createAt: new Date('2022-03-12T12:22:17'),
      author: 'Даль'
    },
      {
        id:'9898',
        text: 'Понедельник начинается в субботу',
        createAt: new Date('2022-03-21T19:00:00'),
        author: 'Трудолюбивый Человек'
      }
    ]
  },
  {
    id:'10',
    text: 'Победи себя и выиграешь тысячи битв#самссобой',
    createAt: new Date('2022-03-12T22:00:01'),
    author: 'Будда',
    comments: [{
      id:'4545',
      text: 'Это самая главная победа',
      createAt: new Date('2022-03-13T10:10:10'),
      author: 'Cын Будды'
    }]
  },
  {
    id:'11',
    text: 'Прежде чем диагностировать у себя депрессию и заниженную самооценку, убедитесь, что вы не окружены идиотами.#оглянись',
    createAt: new Date('2022-03-05T03:00:11'),
    author: 'Зигмунд Фрейд',
    comments: []
  },
  {
    id:'12',
    text: 'Если вы уходите и вас никто не зовёт обратно – вы идете в верном направлении.#всеправильно',
    createAt: new Date('2022-02-17T10:17:11'),
    author: 'джим Керри',
    comments: [{
      id:'987',
      text: 'Иногда кажется, что я в тупике',
      createAt: new Date('2022-02-22T15:04:22'),
      author: 'Тупак Шакур'
    }]
  },
  {
    id:'12',
    text: 'Если Вы нарушаете правила, Вас штрафуют; если Вы соблюдаете правила, Вас облагают налогами!#будьхорошим',
    createAt: new Date('2022-01-21T14:34:25'),
    author: 'Лоуренс Питер',
    comments: [{
      id:'412',
      text: 'И как быть?',
      createAt: new Date('2022-01-22T12:00:21'),
      author: 'Злостный Нарушитель'
    }]
  },
  {
    id:'13',
    text: 'Боишься — не делай, делаешь — не бойся, а сделал — не сожалей.#уверенность',
    createAt: new Date('2022-01-12T14:03:29'),
    author: 'Чингисхан',
    comments: [{
      id:'9996',
      text: 'Дать уголовный кодекс почитать?',
      createAt: new Date('2022-01-13T12:00:21'),
      author: 'Неизвестный пользователь'
    }]
  },
  {
    id:'14',
    text: 'Влюбиться можно в красоту, но полюбить – лишь только душу!#любовь',
    createAt: new Date('2022-02-22T12:21:11'),
    author: 'Уильям Шекспир',
    comments: [{
      id:'666',
      text: 'Любовь иногда очень зла',
      createAt: new Date('2022-02-23T11:11:11'),
    }]
  },
  {
    id:'15',
    text: 'Безнадёжно — это когда на крышку гроба падает земля. Остальное можно исправить.#не отчаивайся',
    createAt: new Date('2022-02-12T12:12:12'),
    author: 'Джейсон Стэтхэм',
    comments: []
  },
  {
    id:'16',
    text: 'Мечтай так, как будто будешь жить вечно. Живи так, как будто завтра умрешь.#живи',
    createAt: new Date('2022-01-12T14:03:11'),
    author: 'Виктор Цой',
    comments: [{
      id:'65443',
      text: 'Цой жив!!!',
      createAt: new Date('2022-01-14T10:10:01'),
      author: 'Фан Клуб Цоя'
    },
      {
        id:'1387',
        text: 'Легко сказать',
        createAt: new Date('2022-01-22T18:02:10'),
        author: 'Федор Федоров'
      }
    ]
  },
  {
    id:'17',
    text: 'Человека делают счастливым три вещи: любовь, интересная работа и возможность путешествовать.#счастье',
    createAt: new Date('2022-02-27T14:02:11'),
    author: 'Иван Бунин',
    comments: []
  },
  {
    id:'18',
    text: 'Ни в коем случае нельзя отчитывать тех, кто старался изо всех сил, но совершил ошибку.#ошибки',
    createAt: new Date('2022-03-11T12:11:10'),
    author: 'Ричард Брэнсон',
    comments: [{
      id:'191817',
      text: 'Со мной в детстве так и было!!',
      createAt: new Date('2022-03-12T19:03:12'),
      author: 'Сэм Брэнсон'
    }]
  },
  {
    id:'19',
    text: 'Ошибки — это знаки препинания жизни, без которых, как и в тексте, не будет смысла.#смысл',
    createAt: new Date('2022-03-06T18:00:09'),
    author: 'Харуки Мураками',
    comments: []
  },
  {
    id:'20',
    text: 'Человек — это продукт своих собственных мыслей. О чем он думает, тем он и становится.#человек',
    createAt: new Date('2022-02-23T13:12:11'),
    author: 'Махатма Ганди',
    comments: [{
      id:'777',
      text: 'Лучше и не скажешь',
      createAt: new Date('2022-02-23T16:01:11'),
      author: 'Антон Чехов'
    }]
  },
  {
    id:'21',
    text: 'В падающем самолёте нет атеистов.#вера',
    createAt: new Date('2022-03-08T12:21:12'),
    author: 'Михаил Задорнов',
    comments: []
  }
]


const myModule = (function (){
  const user = 'Юрий Гагарин'
  function getTweets(top=0,skip=10,filterConfig) {
    let filterKeys = filterConfig ? Object.keys(filterConfig): null
    let filterTweets;

    if(filterKeys !== null){
      filterKeys.forEach((filter) => {
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
            filterTweets = tweets.filter((tweet) =>  tweet.text.split('#').find((item) => item === filterConfig.hashtags) === filterConfig.hashtags)
            break;
          case 'text':
            filterTweets = tweets.filter((tweet) => tweet.text === filterConfig.text)
            break;
        }
      })
    }

    if(filterKeys === null) {
      tweets.sort((a,b) => b.createAt - a.createAt)
    }
    filterTweets = filterTweets ? filterTweets.splice(top, skip) : JSON.parse(JSON.stringify(tweets)).splice(top,skip);
    filterTweets.sort((a,b) => b.createAt - a.createAt)
    console.log(filterTweets)
    return filterTweets
  }

  function getTweet (id) {
    return tweets.find((tweet) => tweet.id === id)
  }

  const commonTemplate = {
    id:(id) => id.length && typeof id === 'string',
    text:(text) => typeof text === 'string' && text.length < 280 ,
    createAt: (date) => date instanceof Date,
    author: (author) => author.length && typeof author === 'string',
  }

  function validateTweet (tweet) {
    const template = {
     ...commonTemplate,
      comments: (array) => Array.isArray(array)
    }
    const keysTemplate = Object.keys(template)
    const result = keysTemplate.every((key) => template[key](tweet[key]));
    if(result){
      return true
    } return false

  }

  function addTweet(text){
    let newTweet = {
      id: String(Math.random()),
      text,
      createAt:new Date(),
      author: user,
      comments:[]
    }

    if(validateTweet(newTweet)){
      tweets.push(newTweet);
      return true
    } return false
  }

  function editTweet (id, text){
    let correctUser = getTweet(id)
    if (validateTweet(correctUser)) {
      correctUser.text = text
      return true
    } return false

  }

  function removeTweet (id) {
    let indexForDelete = tweets.findIndex((elem) => elem.id === id && elem.author === user)
    if(indexForDelete != -1){
      tweets.splice(indexForDelete,1)
      return true
    } return false
  }

  function validateComment (com) {
    let templateKeys = Object.keys(commonTemplate)
    console.log(templateKeys)
    console.log(com)
    let result = templateKeys.every((key) => commonTemplate[key](com[key]))
    return result
  }


  function addComment (id, text) {

    let tweetComment = tweets.filter((tweet) => tweet.comments[0] && tweet.id === id)
    console.log(validateComment(tweetComment[0].comments[0]))
    if(tweetComment && validateComment(tweetComment[0].comments[0])){
      tweetComment[0].comments[0].text = text
      return true
    } else {
      return false
    }
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
    changeUser: function (usr){
      this.user = usr
    }
  };
})()

// test getTweet method
// console.log(myModule.getTweet('5'))

// tests getTweets method
// console.log(myModule.getTweets(0,1,{author:'snow'}))
// console.log(myModule.getTweets(0,4,{hashtags:'datamola'}))
// console.log(myModule.getTweets(0,5,{dateFrom: new Date('2022-02-23T13:12:11')}))
// console.log(myModule.getTweets(10,10))



//test changeUser method
// console.log(myModule.user)
// myModule.changeUser('John')
// console.log(myModule.user)


// test validateTweet method
// console.log(myModule.validateTweet({id:'hello'}))
// myModule.validateTweet({
//     id:'18',
//     text: 'Ни в коем случае нельзя отчитывать тех, кто старался изо всех сил, но совершил ошибку.#ошибки',
//     createAt: new Date('2022-03-11T12:11:10'),
//     author: 'Ричард Брэнсон',
//     comments: []
// })

//test addTweet method
// myModule.addTweet('hello world')
// myModule.addTweet('how are you')
// console.log(tweets)



//test editTweet method
// myModule.editTweet('3','Change tweeter text')
// // console.log(myModule.editTweet('3','Change tweeter text'))
// myModule.editTweet('4','mistake')
// console.log(tweets)

//test removeTweet method
// console.log(myModule.removeTweet('5'))
// console.log(tweets)

// test validateComment method
console.log(myModule.validateComment({
    id:'777',
    text: 'Лучше и не скажешь',
    createAt: new Date('2022-02-23T16:01:11'),
    author: 'Антон Чехов'
}))
console.log(myModule.validateComment({id:'1919'}))


// test addComment method - not the best implementation and result!!!!!!!!!!!!!!!!!!!!
// console.log(myModule.addComment('16','Получилось поменять комментарий'))
// console.log(tweets)

