const flights = [
  { airline: "IndiGo", depart: "06:00", arrive: "08:10", duration: "2h 10m", price: 3499, stops: "Non-stop" },
  { airline: "Air India", depart: "09:30", arrive: "12:00", duration: "2h 30m", price: 4199, stops: "Non-stop" },
  { airline: "SpiceJet", depart: "13:15", arrive: "16:45", duration: "3h 30m", price: 2999, stops: "1 Stop" },
  { airline: "Vistara", depart: "18:00", arrive: "20:05", duration: "2h 05m", price: 4899, stops: "Non-stop" },
  { airline: "GoFirst", depart: "21:20", arrive: "23:50", duration: "2h 30m", price: 3199, stops: "1 Stop" },
];

const form = document.getElementById("search-form");
const resultsEl = document.getElementById("results");
const modal = document.getElementById("booking-modal");
const modalDetails = document.getElementById("modal-details");
const passengerNameInput = document.getElementById("passenger-name");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");

let selectedFlight = null;
let searchInfo = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;
  const passengers = document.getElementById("passengers").value;

  if (from === to) {
    alert("Departure and destination cities cannot be the same.");
    return;
  }

  searchInfo = { from, to, date, passengers };
  renderResults(from, to, date);
});

function renderResults(from, to, date) {
  resultsEl.innerHTML = `<h2>${from} → ${to} on ${date}</h2>`;

  const list = document.createElement("div");
  list.className = "flight-list";

  flights.forEach((flight) => {
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
      <div class="airline">${flight.airline}</div>
      <div class="timing">
        <span>${flight.depart}</span> → <span>${flight.arrive}</span>
        <p>${flight.duration} • ${flight.stops}</p>
      </div>
      <div class="price">₹${flight.price}</div>
      <button class="book-btn">Book</button>
    `;

    card.querySelector(".book-btn").addEventListener("click", () => openModal(flight));
    list.appendChild(card);
  });

  resultsEl.appendChild(list);
}

function openModal(flight) {
  selectedFlight = flight;
  modalDetails.textContent = `${searchInfo.from} → ${searchInfo.to} | ${flight.airline} | ${flight.depart} - ${flight.arrive} | ₹${flight.price} x ${searchInfo.passengers} passenger(s)`;
  modal.classList.remove("hidden");
}

confirmBtn.addEventListener("click", () => {
  const name = passengerNameInput.value.trim();
  if (!name) {
    alert("Please enter the passenger name.");
    return;
  }
  alert(`Booking confirmed for ${name} on ${selectedFlight.airline}. Total: ₹${selectedFlight.price * searchInfo.passengers}`);
  modal.classList.add("hidden");
  passengerNameInput.value = "";
});

cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  passengerNameInput.value = "";
});