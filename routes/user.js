module.exports = function(app) {
  app.get('/', (req, res) => {
    res.status(200).send({
      message: 'lol'
    })
  })
  app.route('/sign_up')
    .post((req, res) => {
      const email = req.body.email
      const password = req.body.password
      if (!email || !password) {
        res.status(400).send({
          error: 'нет email или password'
        })
      } else {
        res.status(200).send({
          email: email,
          password: password
        })
      }
    })
  app.route('/sign_in')
    .get((req, res) => {
      const email = req.query.email
      const password = req.query.password
      if (!email || !password) {
        res.status(400).send({
          error: 'not email or password'
        })
      } else {
        res.status(200).send({
          email: email,
          password: password
        })
      }
    })
  app.route('/user')
    .get((req, res) => {
      const id = req.query.id
      if (!id) {
        res.status(400).send({
          message: 'error id not found'
        })
      } else {
        res.status(200).send({
          message: 'get user  ' + id
        })
      }
    })

  app.route('/users')
    .get((req, res) => {
      //  GET запрос для списку. В таких GET запросах ми зазвичай вказуємо
      //query параметри "limit" і "offset"
      //  "limit" вказує, скільки обьєктів (в данному випадку - користувачів) ми хочемо отримати
      //  "offset" вказує, скільки ми відступимо позицій відносно першого елементу,
      //щоб отримати список.
      //  Тобто http://127.0.0.1:3000/api/users?limit=2&offset=2 буде означати
      //що ми хочемо отримати 2 користувача, починаючи з 3 (третього) користувача
      //Візуально це виглядає так:
      //////////////////////////////////
      // 0. User 0
      // 1. User 1
      // --> 2. User 2
      // --> 3. User 3
      // 4. User 4
      //////////////////////////////////

      //Така конструкція дозволяє отримати відразу декілька змінних,
      //в які ми відразу записуємо данні
      var {
        limit,
        offset,
        page
      } = req.query

      //У випадку, якщо користувач не вказав скільки він хоче об"єктів,
      //або кількість об"єктів менше одного,
      //то ми встановлюємо значення за замовчуванням. В данному випадку - 20 об"єктів
      //При бажанні ми можемо встановити будь яке інше число
      if (!limit || limit < 1) {
        limit = 20
      }
      if (!offset) {
        offset = limit * page
      }
      //У випадку, якщо користувач не вказав починаючи якого об"єкту він хоче,
      //отримати список, або зміщення менше за нуль,
      //то ми встановлюємо значення за замовчуванням, яке ОБОВ"ЯЗКОВО повинне дорівнювати 0!
      if (!offset || offset < 0) {
        offset = 0
      }


      var users = []
      var i;
      for (i = Number(offset); i < (Number(limit) + Number(offset)); i++) {
        users.push("user_" + i)
      }

      res.status(200).send({
        message: "users list with offset: " + offset + ", and limit: " + limit,
        users: users
      })
    });

};
