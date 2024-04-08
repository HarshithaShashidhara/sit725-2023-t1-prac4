const cardList = [
    {
        title: "Kitten 2",
        image: "images/card-image-1.jpg",
        link: "About Kitten 2",
        description: "Demo description about kitten 2"
    },
    {
        title: "Kitten 3",
        image: "images/card-image-2.jpg",
        link: "About Kitten 3",
        description: "Demo description about kitten 3"
    },

];

const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
};

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#link').val();
    formData.description = $('#description').val();
    
    $.ajax({
        url: '/api/cards',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.log("Card added successfully:", response);
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error("Error adding card:", error);
            alert("Error adding card. Please try again.");
        }
    });
};

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `
            <div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more</i></span>
                        <p><a href="#">${item.link}</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
                        <p class="card-text">${item.description}</p>
                    </div>
                </div>
            </div>`;
        $("#card-section").append(itemToAppend);
    });
};

$(document).ready(function(){
    $('.materialboxed').materialbox();
    
    // Add an event listener to the "Click Me" button
    $('#clickMeButton').click(function() {
        clickMe();
    });
    
    // Function to handle form submission
    $('#formSubmit').click(function() {
        submitForm();
    });
    
    // Function to show the modal
    $('#clickMeButton').click(function() {
        $('#modal1').modal('open');
    });
    
    // Display existing cards
    addCards(cardList);
    $('.modal').modal();
});
