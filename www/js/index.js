var app = new Framework7({
    el: '#app',

    routes: [
        {
            path: '/',
            url: 'index.html',
        },
        {
            path: 'about',
            url: 'about.html'
        },
        {
            path: 'game1',
            url: 'game1.html',
        },
    ],
});

var mainView = app.views.create('.view-main');


var people = ["John", "Amy", "May", "Emily", "Ryan", "Jack"];
var rooms = ["Entrance Hall", "Dining Room", "Master Bedroom", "Kids Room", "Statutory Corridor", "Statuary Corridor", "Kitchen", "Computer Room", "Bathroom", "Backyard"];
var candy = ["M&Ms", "Jolly Ranchers", "Snickers", "Smarties", "Candy Corn", "Caramilk Bars"];


var currentGameAns = {person:"No one", location:"No where", candy:"Nothing"};



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

    // waterLevel += 10;
    // $('#water').fadeIn().delay(3000).fadeOut()
    // var watering = setTimeout(, 100);
});


$('#vote').on("click", function () {
    console.log("voted!")
    // waterLevel += 10;
    // $('#water').fadeIn().delay(3000).fadeOut()
    // var watering = setTimeout(, 100);
});