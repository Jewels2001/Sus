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
        },
        {
            path: '/game1_story/',
            url: 'pages/game1_story.html',
        },
        {
            path: '/game1_evidence/',
            url: 'pages/game1_evidence.html',
        },
        {
            path: '/game1_guess/',
            url: 'pages/game1_guess.html',
        },
        {
            path: '(.*)',
            url: 'pages/404.html',
        },
    ],
});

var mainView = app.views.create('.view-main');


var people = ["John", "Amy", "May", "Emily", "Ryan", "Jack"];
var rooms = ["Entrance Hall", "Dining Room", "Master Bedroom", "Kids Room", "Statutory Corridor", "Statuary Corridor", "Kitchen", "Computer Room", "Bathroom", "Backyard"];
var candy = ["M&Ms", "Jolly Ranchers", "Snickers", "Smarties", "Candy Corn", "Caramilk Bars"];

var userName = "J";
var favCandy = "Smarties";

var currentGameAns = {person:"No one", location:"No where", candy:"Nothing"};


function checkLabels() {
    for(let i=0; i<6; i++) {
        let p = "#person" + i;
        let c = "#candy" + i;
        //console.log(c);
        $(p).text(people[i]);
        $(c).text(candy[i]);

        //console.log($(p).text(people[i]));
    }
    for (let i = 0; i < 10; i++) {
        let l = "#loc" + i;
        //console.log(l);
        $(l).text(rooms[i]);
        //console.log($(p).text(people[i]));
    }
    setTimeout(checkLabels, 1000);
}
checkLabels();
// for(let i=0; i<10; i++) {
//     let l = ".loc" + i;
// }

// $(".person1").text(people[0]);
// $(".loc").text(currentGameAns.location);
// $(".candy").text(currentGameAns.candy);



$('#submitCandy').on("click", function () {
    console.log("Here");
});

$('#quick-game').on("click", function () {
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

    // $(".person").text(currentGameAns.person);
    // $(".loc").text(currentGameAns.location);
    // $(".candy").text(currentGameAns.candy);

    // waterLevel += 10;
    // $('#water').fadeIn().delay(3000).fadeOut()
    // var watering = setTimeout(, 100);
});


$('#vote').on("click", function () {
    console.log("voted!");
    var guessPerson = $(this).val();
    var guessLoc = $(this).val();
    var guessCandy = $(this).val();
    var won = 0;

    if(guessPerson == currentGameAns.person && guessLoc == currentGameAns.location && guessCandy == currentGameAns.candy) {
        won = 1;
        console.log("Won!");
    } else {
        console.log("Wrong guess :(");
        console.log("Maybe you were the killer :scream: !");
    }

    // waterLevel += 10;
    // $('#water').fadeIn().delay(3000).fadeOut()
    // var watering = setTimeout(, 100);
});

// $("#name-input").on("change", function () {
//     console.log("name inputted");
//     var userName = $(this).val();
//     $(".name-display").text(userName);
// });

$("#candy-input").on("change", function () {
    console.log("candy inputted");
    var favCandy = $(this).val();
    $(".candy-display").text(favCandy);
});

$('#submit-candy').on("click", function () {
    console.log("HI");
    console.log(userName);
    console.log(favCandy);

    if(userName == "J" || favCandy == "smarties") {
        app.dialog.confirm("You did not enter a name/candy! Proceed?", function (dialogLogIn) {
            app.dialog.alert("Sounds good, " + userName);
        });
    }
});

var dialogLogIn = app.dialog.create({
    text: "You did not enter a name/candy! Proceed?",
    title: "Warning!",
    on: {
        opened: function () {
            console.log('Dialog opened')
        }
    }
 });

// app.dialog.confirm("You did not enter a name/candy! Proceed?", function (dialogLogIn) {
//     app.dialog.alert("Sounds good, " + userName);
//  });