const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routers/router');
const path = require("path");

const app = express();
const pathRootApp = path.dirname(path.dirname(require.main.filename || process.mainModule.filename));
app.use(express.static(path.join(pathRootApp, '/client_app/dist')));
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(path.join('/client_app/dist/index.html'));
});

app.use('/api', router); 
app.use((req, res, next) => {
    const err = new Error('Not found');
    res.status(404);
    res.json({
        status: 'Page not found!!!'
    })
    next(err);
})
app.use((req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = error.status || 500;
    res.status(status).json({
        error: {
            message: error.message
        } 
    })
})

module.exports = app;