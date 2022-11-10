var app = new Framework7({
    el: '#app',

    routes: [
        {
            path: '/',
            url: 'index.html',
        },
        {
            path: '/about/',
            url: 'pages/about.html',
        },
        {
            path: '/contact/',
            url: 'pages/contact.html',
        },
        {
            path: '/resources/',
            url: 'pages/resources.html',
        },
        {
            path: '/game1/',
            url: 'pages/game1.html',
            // beforeEnter: function({ resolve, reject }) {
                
            // },
            on: {
                pageInit: function (e, page) {
                    inputs();
                },
                pageBeforeRemove: function (e, page) {
                    
                },
            },
        },
        {
            path: '/game1_story/',
            url: 'pages/game1_story.html',
            on: {
                pageInit: function (e, page) {
                    // do something when page initialized
                    console.log("page loaded :)");
                    $(".friend-display").text(friend1);
                    $(".candy-display").text(favCandy);
                },
            },
        },
        {
            path: '/game1_evidence/',
            url: 'pages/game1_evidence.html',
            on: {
                pageInit: function (e, page) {
                    console.log("evidence page");
                    checkLabels();
                }
            }
        },
        {
            path: '/game1_guess/',
            url: 'pages/game1_guess.html',
            on: {
                pageInit: function (e, page) {
                    checkLabels();
                    $('#vote').on("click", function () {
                        console.log("clicked!");
                        vote();
                    });
                },
            },
        },
        {
            path: '(.*)',
            url: 'pages/404.html',
        },
    ],
});

var mainView = app.views.create('.view-main');

// not sure why this doesn't just work
// working theory is that it's not on the *main page* so it doesn't load the js 
$("#vote").on("click", function () {
    console.log("voted here");
});

 
var people = ["John", "Amy", "May", "Emily", "Ryan", "Jack"];
var rooms = ["Entrance Hall", "Dining Room", "Master Bedroom", "Kids Room", "Statutory Corridor", "Statuary Corridor", "Kitchen", "Computer Room", "Bathroom", "Backyard"];
var candy = ["M&Ms", "Jolly Ranchers", "Snickers", "Smarties", "Candy Corn", "Caramilk Bars"];

var userName = "J";
var favCandy = "Smarties";
var friend1 = "Johnny";
var friend2 = "Abby";

var currentGameAns = {person:"No one", location:"No where", candy:"Nothing"};
var currentGuess = { person: "NA", location: "NW", candy: "NO" };
var gameStarted = false;
var evidenceFound = false;
var guessesLeft = 5;


function checkLabels() {
    for(let i=0; i<6; i++) {
        let p = "#person" + i;
        let c = "#candy" + i;
        let p1 = ".person" + i;
        let c1 = ".candy" + i;
        console.log(c);
        $(p).text(people[i]);
        $(c).text(candy[i]);
        $(p1).text(people[i]);
        $(c1).text(candy[i]);

        //console.log($(p).text(people[i]));
    }
    for (let i = 0; i < 10; i++) {
        let l = "#loc" + i;
        let l1 = ".loc" + i;
        //console.log(l);
        $(l).text(rooms[i]);
        $(l1).text(rooms[i]);
        //console.log($(p).text(people[i]));
    }

    $(".candy-display").text(favCandy);
    $('#numGuesses').text(guessesLeft);
}

function updateGuesses() {
    $('#numGuesses').text(guessesLeft);
}

function vote() {
    console.log("test :) ");
    guessesLeft--;
    updateGuesses();
    if(guessesLeft <= 0) {
        window.location.replace('/SusPlaceHolderA1/www/');
    }
    // set guess
    console.log(currentGuess);
    currentGuess.location = $('#location-guess').val();
    currentGuess.candy = $('#candy-guess').val();
    currentGuess.person = $('#person-guess').val();
    console.log(currentGuess);
    // check location guess
    if(currentGuess.location == currentGameAns.location && currentGuess.candy == currentGameAns.candy && currentGuess.person == currentGameAns.person) {
        console.log("WOW");
    }
    console.log("Here1");
}

function inputs() {
    $("#name-input").on("change", function () {
        console.log("name inputted");
        userName = $(this).val();
        $(".name-display").text(userName);
    });
    $("#candy-input").on("change", function () {
        console.log("candy inputted");
        favCandy = $(this).val();
        $(".candy-display").text(favCandy);
    });
    $("#friend1-input").on("change", function () {
        console.log("friend1 inputted");
        friend1 = $(this).val();
        $(".friend1-display").text(friend1);
    });
    $("#friend2-input").on("change", function () {
        console.log("friend2 inputted");
        friend2 = $(this).val();
        $(".friend2-display").text(friend2);
    });
}



// function vote() {

//     setTimeout(vote, 100);
// }
// //checkLabels();
// vote();
for(let i=0; i<10; i++) {
    let l = ".loc" + i;
}

$(".person1").text(people[0]);
$(".loc").text(currentGameAns.location);
$(".candy").text(currentGameAns.candy);

$("location-guess").select(function() {
    console.log("selected!");

})


function test2() {
}


function checkGameExists() {
    if(gameStarted) {
        console.log("Game exists");
        var dialogOverwrite = app.dialgo.create({ });
        app.dialog.confirm("You will overwrite an old game. Proceed?", function (dialogOverwrite) {
            app.dialog.alert("Sounds good, " + userName);
        });
    }
}


$('#quick-game').on("click", function () {
    checkGameExists();
    console.log("game started!");
    var ans1 = Math.floor(Math.random() * 6);
    var ans2 = Math.floor(Math.random() * 10);
    var ans3 = Math.floor(Math.random() * 6);
    if(currentGameAns.length != 0) {
        currentGameAns.length = 0;
    }
    console.log(currentGameAns);
    currentGameAns.person = people[ans1];
    currentGameAns.location = rooms[ans2];
    currentGameAns.candy = candy[ans3];
    console.log(currentGameAns);
    gameStarted = true;

    // $(".person").text(currentGameAns.person);
    // $(".loc").text(currentGameAns.location);
    // $(".candy").text(currentGameAns.candy);
});




// $('#vote').on("click", function () {
//     console.log("Here2");
// });

// $("#name-input").on("change", function () {
//     console.log("name inputted");
//     var userName = $(this).val();
//     $(".name-display").text(userName);
// });




// $('.vote').on("click", function () {
//     console.log("voted!");
//     var guessPerson = $(this).val();
//     var guessLoc = $(this).val();
//     var guessCandy = $(this).val();
//     var won = 0;

//     if(guessPerson == currentGameAns.person && guessLoc == currentGameAns.location && guessCandy == currentGameAns.candy) {
//         won = 1;
//         console.log("Won!");
//     } else {
//         console.log("Wrong guess :(");
//         console.log("Maybe you were the killer :scream: !");
//     }
// });


// $('#submit-candy').on("click", function () {
//     console.log("HI");
//     console.log(userName);
//     console.log(favCandy);

//     if(userName == "J" || favCandy == "smarties") {
//         app.dialog.confirm("You did not enter a name/candy! Proceed?", function (dialogLogIn) {
//             app.dialog.alert("Sounds good, " + userName);
//         });
//     }
// });

// var dialogLogIn = app.dialog.create({
//     text: "You did not enter a name/candy! Proceed?",
//     title: "Warning!",
//     on: {
//         opened: function () {
//             console.log('Dialog opened')
//         }
//     }
//  });

// app.dialog.confirm("You did not enter a name/candy! Proceed?", function (dialogLogIn) {
//     app.dialog.alert("Sounds good, " + userName);
//  });


// app.picker.create({
//     inputEl: '#people-picker',
//     cols: [
//         {
//             textAlign: 'center',
//             values: people,
//         }
//     ]
// });



