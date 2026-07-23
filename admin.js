/* =====================================================
   ICONCONNECT - CELEBRITY MANAGEMENT
===================================================== */

const celebrityForm =
    document.getElementById("celebrityForm");


if (celebrityForm) {

    celebrityForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("celebName")
                .value
                .trim();


            const category =
                document.getElementById("category")
                .value;


            const price =
                document.getElementById("price")
                .value;


            const description =
                document.getElementById("description")
                .value
                .trim();


            const imageInput =
                document.getElementById("image");


            const imageFile =
                imageInput.files[0];


            /* CHECK REQUIRED FIELDS */

            if (
                name === "" ||
                category === "" ||
                price === "" ||
                description === ""
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;
            }


            /* CHECK IMAGE */

            if (!imageFile) {

                alert(
                    "Please choose a celebrity image."
                );

                return;
            }


            /* CONVERT IMAGE */

            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const celebrity = {

                        name: name,

                        category: category,

                        price: price,

                        description: description,

                        image: event.target.result

                    };


                    /* GET EXISTING CELEBRITIES */

                    let celebrities =
                        JSON.parse(
                            localStorage.getItem(
                                "celebrities"
                            )
                        ) || [];


                    /* ADD NEW CELEBRITY */

                    celebrities.push(
                        celebrity
                    );


                    /* SAVE CELEBRITY */

                    localStorage.setItem(
                        "celebrities",
                        JSON.stringify(
                            celebrities
                        )
                    );


                    alert(
                        "Celebrity added successfully!"
                    );


                    /* CLEAR FORM */

                    celebrityForm.reset();

                };


            reader.readAsDataURL(
                imageFile
            );

        }
    );

}/* =====================================================
   ICONCONNECT - ADMIN BOOKING REQUESTS
===================================================== */

function loadBookingRequests() {

    const bookingTableBody =
        document.getElementById("bookingTableBody");

    // Stop if we are not on the Admin page
    if (!bookingTableBody) {
        return;
    }


    // Clear the table
    bookingTableBody.innerHTML = "";


    // Get saved booking requests
    const bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];


    // Show message if there are no bookings
    if (bookings.length === 0) {

        bookingTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No booking requests yet.
                </td>
            </tr>
        `;

        return;
    }


    // Display every booking
    bookings.forEach(function (booking, index) {

        const row =
            document.createElement("tr");


        // Default status
        const status =
            booking.status || "N/A";


        row.innerHTML = `

            <td>
                ${booking.name || "N/A"}
            </td>

            <td>
                ${booking.celebrity || "N/A"}
            </td>

            <td>
                ${booking.event || "N/A"}
            </td>

            <td>
                ${booking.date || "N/A"}
            </td>

            <td>

                <select
                    class="status-select"
                    onchange="updateBookingStatus(${index}, this.value)"
                >

                    <option
                        value="Pending"
                        ${status === "Pending" ? "selected" : ""}
                    >
                        Pending
                    </option>

                    <option
                        value="Approved"
                        ${status === "Approved" ? "selected" : ""}
                    >
                        Approved
                    </option>

                    <option
                        value="Rejected"
                        ${status === "Rejected" ? "selected" : ""}
                    >
                        Rejected
                    </option>

                </select>

            </td>

        `;


        bookingTableBody.appendChild(row);

    });

}


/* =====================================================
   UPDATE BOOKING STATUS
===================================================== */

function updateBookingStatus(index, newStatus) {

    // Get existing bookings
    let bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];


    // Update selected booking
    if (bookings[index]) {

        bookings[index].status =
            newStatus;

    }


    // Save updated bookings
    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );


    // Reload booking list
    loadBookingRequests();

}


/* =====================================================
   LOAD BOOKINGS WHEN ADMIN PAGE OPENS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadBookingRequests();

    }
);