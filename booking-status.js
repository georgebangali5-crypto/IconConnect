/* =========================================
   ICONCONNECT - BOOKING STATUS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const statusForm = document.getElementById("statusForm");
    const statusResults = document.getElementById("statusResults");

    if (!statusForm || !statusResults) return;

    statusForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document
            .getElementById("statusEmail")
            .value
            .trim()
            .toLowerCase();

        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

        const userBookings = bookings.filter(function (booking) {
            return booking.email &&
                booking.email.toLowerCase() === email;
        });

        statusResults.innerHTML = "";

        if (userBookings.length === 0) {

            statusResults.innerHTML = `
                <div class="card">
                    <h2>No Booking Found</h2>
                    <p>No booking exists for this email address.</p>
                </div>
            `;

            return;
        }

        userBookings.forEach(function (booking) {

            statusResults.innerHTML += `
                <div class="card">
                    <h2>${booking.celebrity}</h2>

                    <p><strong>Name:</strong> ${booking.name}</p>

                    <p><strong>Email:</strong> ${booking.email}</p>

                    <p><strong>Event:</strong> ${booking.event}</p>

                    <p><strong>Date:</strong> ${booking.date}</p>

                    <p><strong>Location:</strong> ${booking.location}</p>

                    <p>
                        <strong>Status:</strong>
                        <span class="status ${booking.status || "Pending"}">
                            ${booking.status || "Pending"}
                        </span>
                    </p>
                </div>
            `;
        });

    });

});