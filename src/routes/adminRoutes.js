var express = require('express');

var adminRouter = express.Router();

var routes = function(dbConfig) {

    //console.log(__dirname);
    adminRouter.route('/initDb')
        .get(function(req, res) {
            var execsql = require('execsql'),
                // dbConfig = {
                //     host: 'localhost',
                //     user: 'root',
                //     password: '',
                //     name: 'splitterdb'
                // },
                //sql = 'use splitterdb;',
                sqlFile = __dirname + '/db.sql';

            execsql.config(dbConfig)
                .execFile(sqlFile, function(err, results) {
                    execsql.end();
                    if (err) {
                        res.status(500).send('Erro ao iniciar o banco: ' + err);
                    } else {
                        res.send('Banco iniciado');
                    }
                });

        });

    return adminRouter;
}

module.exports = routes;