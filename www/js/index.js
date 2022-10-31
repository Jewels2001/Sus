var app = new Framework7({
    el: '#app',

    routes: [
        {
            path: '/',
            url: 'index.html',
        },
    ],
});

var mainView = app.views.create('.view-main');