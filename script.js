/* =====================================================
   1. LOAD CELEBRITIES
===================================================== */

function loadCelebrities() {

    const celebrityContainer =
        document.getElementById("celebrityContainer");

    // Get celebrity selected from Browse page
const savedCelebrity =
    localStorage.getItem("selectedCelebrity");


// Fill Celebrity Name automatically
if (selectedCelebrity && savedCelebrity) {

    selectedCelebrity.value =
        savedCelebrity;

}

    celebrityContainer.innerHTML = "";

    const celebrities =
        JSON.parse(localStorage.getItem("celebrities")) || [];


    if (celebrities.length === 0) {

        celebrityContainer.innerHTML = `
            <p>No celebrities are available for booking yet.</p>
        `;

        return;
    }


    celebrities.forEach(function (celebrity) {

        const card =
            document.createElement("div");

        card.className =
            "celebrity-card";


        card.innerHTML = `

            <img
                src="${celebrity.image}"
                alt="${celebrity.name}"
            >

            <h3>
                ${celebrity.name}
            </h3>

            <p>
                ${celebrity.category}
            </p>

            <p>
                ₦${Number(celebrity.price).toLocaleString()}
            </p>

            <p>
                ${celebrity.description}
            </p>

            <button
                type="button"
                class="book-now-btn"
            >
                Book Now
            </button>

        `;


        celebrityContainer.appendChild(card);


        /* ================================
           BOOK NOW BUTTON
        ================================= */

        const bookButton =
            card.querySelector(".book-now-btn");


        bookButton.addEventListener(
            "click",
            function () {

                const celebrityInput =
                    document.getElementById(
                        "selectedCelebrity"
                    );


                if (celebrityInput) {

                    celebrityInput.value =
                        celebrity.name;


                    celebrityInput.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            }
        );

    });

}

/* =====================================================
   2. SELECT CELEBRITY
===================================================== */

function selectCelebrity(name) {

    const celebrityInput =
        document.getElementById("selectedCelebrity");


    // Check if the Celebrity Name field exists
    if (!celebrityInput) {

        alert(
            "Celebrity Name field was not found."
        );

        return;
    }


    // Put the celebrity name in the form
    celebrityInput.value =
        name;


    // Scroll down to the booking form
    celebrityInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}/* =====================================================
   LOAD SELECTED CELEBRITY FROM BROWSE PAGE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const celebrityInput =
            document.getElementById(
                "selectedCelebrity"
            );


        const savedCelebrity =
            localStorage.getItem(
                "selectedCelebrity"
            );


        if (
            celebrityInput &&
            savedCelebrity
        ) {

            celebrityInput.value =
                savedCelebrity;

        }

    }
);


/* =====================================================
   3. BOOKING FORM
===================================================== */

const bookingForm =
    document.getElementById("bookingForm");


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Get customer name
            const name =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            // Get email
            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            // Get phone
            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            // Get celebrity
            const celebrity =
                document
                    .getElementById("selectedCelebrity")
                    .value
                    .trim();


            // Get event type
            const eventType =
                document
                    .getElementById("eventType")
                    .value;


            // Get event date
            const date =
                document
                    .getElementById("eventDate")
                    .value;            // Check if a celebrity was selected
            if (celebrity === "") {

                alert(
                    "Please select a celebrity by clicking Book Now."
                );

                return;
            }


            // Create booking object
            const booking = {

                name: name,

                email: email,

                phone: phone,

                celebrity: celebrity,

                event: eventType,

                date: date,

                status: "Pending"

            };


            // Get existing bookings
            let bookings =
                JSON.parse(
                    localStorage.getItem("bookings")
                ) || [];


            // Add new booking
            bookings.push(booking);


            // Save bookings
localStorage.setItem(
    "bookings",
    JSON.stringify(bookings)
);


// Show booking confirmation
alert(
    "Booking Request Submitted Successfully!\n\n" +
    "Celebrity: " + celebrity + "\n" +
    "Event: " + eventType + "\n" +
    "Date: " + date + "\n\n" +
    "Status: Pending\n\n" +
    "Your booking request has been sent to IconConnect."
);


// Clear the booking form
bookingForm.reset();
        }
    );

}/* =====================================================
   4. LOAD CELEBRITIES WHEN PAGE OPENS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadCelebrities();

    }
);const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "1234") {
            alert("Login Successful!");
            window.location.href = "admin.html";
        } else {
            document.getElementById("loginMessage").textContent =
                "Invalid username or password.";
            document.getElementById("loginMessage").style.color = "red";
        }
    });
}