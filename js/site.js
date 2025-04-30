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

    let currentEvents = getEvents(); // todo: add new events???
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
    dropdownMenu.innerHTML = ''


    for (let i = 0; i < dropDownOptions.length; i = i + 1) {
        //for loop allows you to do something alot of times 

        let cityName = dropDownOptions[i];

        let dropdownItem = itemTemplate.content.cloneNode(true);

        let dropdownButton = dropdownItem.querySelector('button.dropdown-item');
        //always find the css selector everytime
        dropdownButton.innerText = cityName;
        dropdownButton.addEventListener('click', filterByCity);


        // stick that drop down item on the page
        dropdownMenu.appendChild(dropdownItem);
    }

    //make a dropdown item
    // then stick those dropdown items on the page
    /* <template id="dropdown-item-template">
        <li><button class="dropdown-item"></button></li>
    </template> */
    document.getElementById('stats-city').innerText = 'All'
    document.getElementById('dropdown-btn').innerText = 'All Events';


    displayStats(currentEvents);
    displayEvents(currentEvents);

}
function filterByCity(clickEvent) {
    let selectedCity = clickEvent.currentTarget.innerText
    //now get an array of all the eevnts you know about
    document.getElementById('stats-city').innerText = selectedCity;
    document.getElementById('dropdown-btn').innerText = `${selectedCity} Events`;
    //back tick uses dollarsign and curly bracket to substitue part of the variabvle



    let allEvents = getEvents();

    //make a new array of only the events from selectCity
    let filteredEvents = [];

    if (selectedCity == 'All') {
        filteredEvents = allEvents;
    }
    else {
        for (let i = 0; i < allEvents.length; i++) {
            let event = allEvents[i];

            if (event.city == selectedCity) {
                filteredEvents.push(event);
            }

        }

        //pass the filtered array to displaystats
    }
    displayStats(filteredEvents);
    displayEvents(filteredEvents);
}






function displayStats(events) {
    //parameter events is an array of event objects 
    let sum = 0;
    let max = 0;
    let min = events[0].attendance;




    for (let i = 0; i < events.length; i++) {
        let eventObject = events[i];
        sum = sum + eventObject.attendance;

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
function displayEvents(events) {
    let template = document.getElementById("event-row-template")
    let eventsTable = document.getElementById('events-table')
    //this deletes what was in the table before
    eventsTable.innerHTML = '';

    for (let i = 0; i < events.length; i = i + 1) {
        let event = events[i];

        let tableRowEl = template.content.cloneNode(true);



        let eventNameCell = tableRowEl.querySelector('.evt-name');
        eventNameCell.innerText = event.event;

        let eventCityCell = tableRowEl.querySelector('.evt-city');
        eventCityCell.innerText = event.city;

        let eventStateCell = tableRowEl.querySelector('.evt-state')
        eventStateCell.innerText = event.state;

        let eventDateCell = tableRowEl.querySelector('.evt-date')
        let eventDate = new Date(event.date);
        eventDateCell.innerText = eventDate.toLocaleDateString();

        let eventAttendCell = tableRowEl.querySelector('.evt-attendance')
        eventAttendCell.innerText = event.attendance




        eventsTable.appendChild(tableRowEl);

    }


}
function saveNewEvent(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    //after form is submitted we want to get the data that was entered on the form
    let newEventForm = document.getElementById('new-Event-Form');
    //this code below helps us take all of the elements and properties in an input form and turn them into an object
    let formData = new FormData(newEventForm);
    let newEvent = Object.fromEntries(formData.entries());

    // then turn it into an object that matches our other event objects. convert attendance from string to #
    //format date like it supposed to be 
    newEvent.attendance = parseInt(newEvent.attendance)
    newEvent.date = new Date(newEvent.date).toLocaleDateString();

    let allEvents = getEvents();
    allEvents.push(newEvent);
    saveEvents(allEvents);


    // then we need to clear out the form
    //then reset the form 
    newEventForm.reset();
    //this sets things back to default value its only for form elements

    // then update the dropdown, statics, and table

    let modalElement = document.getElementById('new-Event-Modal');
    bootstrap.Modal.getInstance(modalElement).hide();
    //this hides a modal after submitting

    buildDropDown();



}

function getEvents() {
    let eventsAsJson = localStorage.getItem('ma-events');

    let storedEvents = [];
    if (eventsAsJson == null) {
        storedEvents = DEFAULT_EVENTS;
        saveEvents(DEFAULT_EVENTS);
    } else {
        storedEvents = JSON.parse(eventsAsJson);
    }

    return storedEvents

}

function saveEvents(events) {
    let eventsAsJson = JSON.stringify(events);

    localStorage.setItem('ma-events', eventsAsJson);

}
/* Local Storage Notes
this means that it will only be stored in the specific browser
that you saved the info in. its also only stored on that URL.
-local storage is INsecure storage
-local storage is Not Permanent
-local storage is key value pairs of only strings its like objects
but not objects key=time value=3:50pm*/


/*<template id"event-row-template"=>
<tr>
    <td class="evt-name"></td>
    <td class="evt-city"></td>
    <td class="evt-state"></td>
    <td class="evt-date"></td>
    <td class="evt-attendance text-end"></td>
</tr>
</template >*/

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


