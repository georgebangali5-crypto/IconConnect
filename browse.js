/* =====================================================
   ICONCONNECT - BROWSE CELEBRITIES
===================================================== */


/* =====================================================
   1. GET ELEMENTS
===================================================== */

const browseContainer =
    document.getElementById(
        "CelebrityContainer"
    );


const searchInput =
    document.getElementById(
        "searchCelebrity"
    );


const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


/* =====================================================
   2. GET CELEBRITIES FROM LOCAL STORAGE
===================================================== */

let celebrities =
    JSON.parse(
        localStorage.getItem("celebrities")
    ) || [];


/* =====================================================
   3. DISPLAY CELEBRITIES
===================================================== */

function displayCelebrities(list) {

    if (!browseContainer) {
        return;
    }


    browseContainer.innerHTML = "";


    /* NO CELEBRITIES */

    if (list.length === 0) {

        browseContainer.innerHTML = `
            <div class="no-results">

                <h3>
                    No celebrities found
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>
        `;

        return;
    }


    /* DISPLAY CELEBRITY CARDS */

    list.forEach(function (celebrity) {

        const card =
            document.createElement("div");


        card.className =
            "browse-celebrity-card";


        card.innerHTML = `

            <img
                src="${celebrity.image}"
                alt="${celebrity.name}"
            >


            <div class="celebrity-info">

                <h3>
                    ${celebrity.name}
                </h3>


                <p class="celebrity-category">
                    ${celebrity.category}
                </p>


                <p class="celebrity-description">
                    ${celebrity.description}
                </p>


                <p class="celebrity-price">
                    ₦${Number(
                        celebrity.price
                    ).toLocaleString()}
                </p>


                <button
                    type="button"
                    class="browse-book-btn"
                >
                    Book Now
                </button>

            </div>

        `;


        browseContainer.appendChild(card);


        /* =================================================
           BOOK NOW BUTTON
        ================================================= */

        const bookButton =
            card.querySelector(
                ".browse-book-btn"
            );


        bookButton.addEventListener(
            "click",
            function () {

                /*
                 Save selected celebrity
                 */

                localStorage.setItem(
                    "selectedCelebrity",
                    celebrity.name
                );


                /*
                 Go to booking page
                 */

                window.location.href =
                    "booking.html";

            }
        );

    });

}


/* =====================================================
   4. SEARCH AND FILTER
===================================================== */

function filterCelebrities() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCategory =
        categoryFilter.value;


    const filtered =
        celebrities.filter(
            function (celebrity) {

                const matchesSearch =
                    celebrity.name
                        .toLowerCase()
                        .includes(searchText);


                const matchesCategory =
                    selectedCategory === "all" ||
                    celebrity.category ===
                    selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    displayCelebrities(filtered);

}


/* =====================================================
   5. SEARCH EVENT
===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterCelebrities
    );

}


/* =====================================================
   6. CATEGORY FILTER EVENT
===================================================== */

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterCelebrities
    );

}


/* =====================================================
   7. LOAD CELEBRITIES
===================================================== */

displayCelebrities(
    celebrities
);// ===============================
// LOAD SELECTED CELEBRITY
// ===============================

const selectedCelebrity = localStorage.getItem("selectedCelebrity");

if (selectedCelebrity) {
    const celebrityInput = document.getElementById("selectedCelebrity");

    if (celebrityInput) {
        celebrityInput.value = selectedCelebrity;
    }
}