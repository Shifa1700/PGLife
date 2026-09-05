window.addEventListener("load", function () {
    var book_now_button = document.getElementById("book-now-button");
    if (book_now_button) {
        book_now_button.addEventListener("click", function (event) {
            event.preventDefault();
            window.jQuery("#booking-construction-modal").modal("show");
        });
    }

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const property_id = params.get('property_id');

    var is_interested_image = document.getElementsByClassName("is-interested-image")[0];
    if (!is_interested_image || !property_id) {
        return;
    }
    is_interested_image.addEventListener("click", function (event) {
        var XHR = new XMLHttpRequest();

        // On success
        XHR.addEventListener("load", toggle_interested_success);

        // On error
        XHR.addEventListener("error", on_error);

        // Set up request
        XHR.open("POST", "api/toggle_interested.php");
        XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // Initiate the request
        XHR.send("property_id=" + encodeURIComponent(property_id));

        document.getElementById("loading").style.display = 'block';
        event.preventDefault();
    });
});

var toggle_interested_success = function (event) {
    document.getElementById("loading").style.display = 'none';

    var response;
    try {
        response = JSON.parse(event.target.responseText);
    } catch (error) {
        on_error();
        return;
    }
    if (response.success) {
        var is_interested_image = document.getElementsByClassName("is-interested-image")[0];
        var interested_user_count = document.getElementsByClassName("interested-user-count")[0];

        if (!is_interested_image || !interested_user_count) {
            return;
        }

        if (response.is_interested) {
            is_interested_image.classList.add("fas");
            is_interested_image.classList.remove("far");
            interested_user_count.innerHTML = parseFloat(interested_user_count.innerHTML) + 1;
        } else {
            is_interested_image.classList.add("far");
            is_interested_image.classList.remove("fas");
            interested_user_count.innerHTML = parseFloat(interested_user_count.innerHTML) - 1;
        }
    } else if (!response.success && !response.is_logged_in) {
        window.$("#login-modal").modal("show");
    }
};

var on_error = function () {
    document.getElementById("loading").style.display = 'none';
    alert('Network error: Could not reach the server.');
};
