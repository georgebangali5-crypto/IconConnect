/* =====================================================
   ICONCONNECT - BOOKING STATUS
===================================================== */

const statusForm =
    document.getElementById("statusForm");

const statusResults =
    document.getElementById("statusResults");


/* =====================================================
   CHECK BOOKING STATUS
===================================================== */

statusForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Get customer email
        const email =
            document
                .getElementById("statusEmail")
                .value
                .trim()
                .toLowerCase();


        // Get saved bookings
        const bookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        // Find bookings using email
        const customerBookings =
            bookings.filter(
                function (booking) {

                    return (
                        booking.email &&
                        booking.email
                            .trim()
                            .toLowerCase() === email
                    );

                }
            );


        // Clear previous results
        statusResults.innerHTML = "";


        // No booking found
        if (
            customerBookings.length === 0
        ) {

            statusResults.innerHTML = `

                <div class="no-booking">

                    <h2>
                        No Booking Found
                    </h2>

                    <p>
                        We could not find any booking
                        associated with this email address.
                    </p>

                </div>

            `;

            return;
        }


        // Display each booking
        customerBookings.forEach(
            function (booking) {


                // Get booking status
                const status =
                    booking.status || "Pending";


                // Create status class
                const statusClass =
                    status.toLowerCase();


                statusResults.innerHTML += `

                    <div class="booking-result">

                        <h2>
                            Booking Details
                        </h2>


                        <div class="booking-info">


                            <div>

                                <strong>
                                    Customer
                                </strong>

                                <span>
                                    ${booking.name || "N/A"}
                                </span>

                            </div>


                            <div>

                                <strong>
                                    Celebrity
                                </strong>

                                <span>
                                    ${booking.celebrity || "N/A"}
                                </span>

                            </div>


                            <div>

                                <strong>
                                    Event
                                </strong>

                                <span>
                                    ${booking.event || "N/A"}
                                </span>

                            </div>


                            <div>

                                <strong>
                                    Event Date
                                </strong>

                                <span>
                                    ${booking.date || "N/A"}
                                </span>

                            </div>


                            <div>

                                <strong>
                                    Booking Status
                                </strong>

                                <span
                                    class="
                                        status-badge
                                        status-${statusClass}
                                    "
                                >
                                    ${status}
                                </span>

                            </div>


                        </div>

                    </div>

                `;

            }
        );

    }
);