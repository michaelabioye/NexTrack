function displayMessage() {

    //get the <input/> element from html. you get the element by adding = 
    // document to your javascript
    let inputElement = document.getElementById('messageinput');


    //then get the text out of the input element 
    let message = inputElement.value;

    //then use alert() to show the text that was typed
    Swal.fire(
        {
            backdrop: false,
            title: 'App Name',
            text: message,
        }
    )

}

