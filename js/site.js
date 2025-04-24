const DEFAULT_EVENTS = [
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];
//generate the drop menu items  
// 
function buildDropDown() {

    let currentEvents = DEFAULT_EVENTS; // todo: add new events???
    //get a list of all the events we know about

    let cities = [];
    //get a list of just the city names for each event 
    for (let i = 0; i < currentEvents.length; i = i + 1) {
        let event = currentEvents[i];
        cities.push(event.city);
    }
    //de-duplicate that list of city names / aka just the UNIQUE cities
    let uniqueCities = new Set(cities);

    //turn the set into an array
    let dropDownOptions = ['All', ...uniqueCities];
    //this removes the duplicate 

    // make a dropdown item (for) each unique city name
    // for each unique city name...
    let itemTemplate = document.getElementById('dropdown-item-template');
    let dropdownMenu = document.getElementById('city-dropdown');


    for (let i = 0; i < dropDownOptions.length; i = i + 1) {
        //for loop allows you to do something alot of times 

        let cityName = dropDownOptions[i];

        let dropdownItem = itemTemplate.content.cloneNode(true);

        let dropdownButton = dropdownItem.querySelector('button.dropdown-item');
        //always find the css selector everytime
        dropdownButton.innerText = cityName;
        // stick that drop down item on the page
        dropdownMenu.appendChild(dropdownItem);
    }

    //make a dropdown item
    // then stick those dropdown items on the page
    /* <template id="dropdown-item-template">
        <li><button class="dropdown-item"></button></li>
    </template> */
    displayStats(currentEvents);
}


function displayStats(events) {
    //parameter events is an array of event objects 
    let sum = 0;
    let max = 0;
    let min = events[0].attendance;




    for (let i = 0; i < events.length; i++) {
        let eventObject = events[i];
        sum += eventObject.attendance;

        if (eventObject.attendance > max) {
            max = eventObject.attendance;
        }
        if (eventObject.attendance < min) {
            min = eventObject.attendance;
        }

    }
    let avg = Math.round(sum / events.length);



    document.getElementById('stats-total').innerText = sum.toLocaleString();
    document.getElementById('stats-max').innerText = max.toLocaleString();
    document.getElementById('stats-min').innerText = min.toLocaleString();
    document.getElementById('stats-avg').innerText = avg.toLocaleString();
}


/* given an array of event objects, create a new array
of just the city names for each event.
//let cities = currentEvents.map(event => event.city); is another code you can write
// for a for loop that shows map as a function
getting things out of the array will take a for loop to get the answer
if you see for or each and its being specific or when you get insied of.
to access any data you need a for loop*/
/*html is like an array*/
//events[i] is a part of the for loop that will take out 
// one thing out of the array of "objects" in this case
// first you have your loop that will target whatever you want
// and under the loop 


