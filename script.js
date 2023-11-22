document.addEventListener("DOMContentLoaded", function () {
    const eventListContainer = document.getElementById("eventList");
    const searchInput = document.getElementById("searchInput");
    const dateFilter = document.getElementById("dateFilter");
    const categoryFilter = document.getElementById("categoryFilter");
    const locationFilter = document.getElementById("locationFilter");

    // Sample events data 
    const events = [
        { title: "Event 1", date: "2023-12-01", category: "seminar", location: "Venue A", ticketsAvailable: 100 },
        { title: "Event 2", date: "2023-12-15", category: "workshop", location: "Venue B", ticketsAvailable: 50 },
        // Add more events as needed
    ];

    // Function to render events with filters
    function renderEvents() {
        eventListContainer.innerHTML = "";
        const searchTerm = searchInput.value.toLowerCase();
        const selectedDate = dateFilter.value;
        const selectedCategory = categoryFilter.value.toLowerCase();
        const selectedLocation = locationFilter.value.toLowerCase();

        events.forEach((event, index) => {
            const eventDate = new Date(event.date).toISOString().split('T')[0];

            // Check if the event matches the filters
            if (
                (event.title.toLowerCase().includes(searchTerm) || event.location.toLowerCase().includes(searchTerm)) &&
                (selectedDate === "" || eventDate === selectedDate) &&
                (selectedCategory === "" || event.category.toLowerCase() === selectedCategory) &&
                (selectedLocation === "" || event.location.toLowerCase().includes(selectedLocation))
            ) {
                const eventCard = document.createElement("div");
                eventCard.className = "eventCard";
                eventCard.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s`;
                eventCard.innerHTML = `
                    <h2>${event.title}</h2>
                    <p>Date: ${event.date}</p>
                    <p>Category: ${event.category}</p>
                    <p>Location: ${event.location}</p>
                    <p>Tickets Available: ${event.ticketsAvailable}</p>
                `;
                eventListContainer.appendChild(eventCard);
            }
        });
    }

    // Initial rendering
    renderEvents();

    // Event listeners for filters with debounce functions
    let debounceTimeout;
    searchInput.addEventListener("input", function () {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(renderEvents, 300);
    });

    dateFilter.addEventListener("change", renderEvents);
    categoryFilter.addEventListener("change", renderEvents);
    locationFilter.addEventListener("input", function () {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(renderEvents, 300);
    });
});
