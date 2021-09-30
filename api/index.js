//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Genre } = require("./src/db");
const axios = require("axios");

// Syncing all the models at once.
conn
  .sync({ force: false })
  .then(() => {
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  })
  .then(async () => {
    try {
      let verif = await Genre.findAll();
      if (!verif.length) {
        try {
          let dataGenre = await axios.get(
            "https://api.rawg.io/api/genres?key=b93baff03b7f4a6b91cbfad06b264509"
          );
          dataGenre = dataGenre.data.results;
          await Genre.bulkCreate(dataGenre, {
            name: dataGenre.name,
          });
        } catch (e) {
          console.log("Error con los GENEROS:", e);
        }
      }
    } catch (e) {
      console.log("Error en la base de datos:", e);
    }
  });
