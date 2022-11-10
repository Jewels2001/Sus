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
            beforeEnter: function({ resolve, reject }) {
                const router = this;
                if(gameStarted) {
                    console.log("Game exists");
                    app.dialog.confirm('A game has already been started - If you hit OK, you will overwrite an old game. Proceed?',
                        'Overwrite?',
                        function() {
                            // proceed
                            resolve();
                        },
                        function() {
                            
                            //stay on page
                            //reject();
                            app.dialog.confirm("Okay, last chance. If you hit OK, you will overwrite an old game. Proceed?",
                                "Double check overwrite?",
                                function () {
                                    app.dialog.alert("Sounds good. Goodbye, " + userName, "Overwritten.");
                                    resetGame();
                                    resolve();
                                },
                                function () {
                                    //stay
                                    reject();
                                    app.dialog.alert("Continuing progress, " + userName, "Continuing");
                                    router.navigate('/game1_evidence/');
                                    return;
                                }
                            );

                        })
                } else {
                    resolve();
                }
            },
            on: {
                pageInit: function (e, page) {
                    $('#submit-candy').on("click", function () {
                        console.log("click");
                        inputWarn();
                        setTimeout(5000);
                    });
                    resetGame();
                    quickGame();
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
            path: '/game1_map/',
            url: 'pages/game1_map.html',
        },
        {
            path: '/1/',
            url: 'pages/rooms/backyard',
            on: {

            }
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
var evidenceLeft = 7;
var infoFound = "";


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

        if(candy[i] != currentGameAns.candy) {
            let c2 = ".randomCandy" + i;
            $(c2).text(candy[i]);
        }
        if (people[i] != currentGameAns.person) {
            let p2 = ".randomPerson" + i;
            $(p2).text(people[i]);
        }

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
    $('.numGuesses').text(guessesLeft);

    if(evidenceFound) {
        $('#evidence-text').text("When searching for the culprit, you deduce these things: ");
        $('info-text').text(infoFound);
        console.log("found");
    }
}

function updateGuesses() {
    $('.numGuesses').text(guessesLeft);
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
        won();
        resetGame();
        returnMainMenu();

    }
    console.log("Finished Guess");
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

function resetGame() {
    userName = "J";
    favCandy = "Smarties";
    friend1 = "Johnny";
    friend2 = "Abby";
    
    currentGameAns = { person: "No one", location: "No where", candy: "Nothing" };
    currentGuess = { person: "NA", location: "NW", candy: "NO" };
    gameStarted = false;
    evidenceFound = false;
    guessesLeft = 5;
    evidenceLeft = 7;
    infoFound = "";
}

function won() {
    var toast = app.toast.create({
        icon: "<img src='img/logo3.png'>",
        text: 'Congrats, you solved the murder!',
        position: 'center',
        closeTimeout: 5000,
        closeButton: true,
    });
    toast.open();
}

function returnMainMenu() {
    app.dialog.alert(
        "Return to main menu.",
        "Congrats!",
        function() {
            window.location.replace('/SusPlaceHolderA1/www/');
        }
    )
}


$(".person1").text(people[0]);
$(".loc").text(currentGameAns.location);
$(".candy").text(currentGameAns.candy);




/*
  I tried this way, and it only worked on the first page load. I think this is because the js only runs once.
*/

// $('#quick-game').on("click", function () {
//     checkOverwrite();
//     console.log("game started!");
//     var ans1 = Math.floor(Math.random() * 6);
//     var ans2 = Math.floor(Math.random() * 10);
//     var ans3 = Math.floor(Math.random() * 6);
//     if(currentGameAns.length != 0) {
//         currentGameAns.length = 0;
//     }
//     console.log(currentGameAns);
//     currentGameAns.person = people[ans1];
//     currentGameAns.location = rooms[ans2];
//     currentGameAns.candy = candy[ans3];
//     console.log(currentGameAns);
//     gameStarted = true;

//     // $(".person").text(currentGameAns.person);
//     // $(".loc").text(currentGameAns.location);
//     // $(".candy").text(currentGameAns.candy);
// });

function quickGame() {
    console.log("game started!");
    var ans1 = Math.floor(Math.random() * 6);
    var ans2 = Math.floor(Math.random() * 10);
    var ans3 = Math.floor(Math.random() * 6);
    if (currentGameAns.length != 0) {
        currentGameAns.length = 0;
    }
    console.log(currentGameAns);
    currentGameAns.person = people[ans1];
    currentGameAns.location = rooms[ans2];
    currentGameAns.candy = candy[ans3];
    console.log(currentGameAns);
}

function inputWarn() {
    app.dialog.alert(
        "You will not be able to change your name/candy again! Proceed?",
        "Warning",
    );
    setTimeout(5000);
    gameStarted = true;
    console.log("GAME STARTED");
}





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
