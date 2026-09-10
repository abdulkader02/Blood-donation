script.js :


/* =========================
Hamburger Menu
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {

navMenu.classList.toggle("active");

});

/* Close menu after clicking a navigation link */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {

link.addEventListener("click", function () {

    navMenu.classList.remove("active");

});

});

/* =========================
Get saved donors from Local Storage
========================= */

let donors = JSON.parse(localStorage.getItem("donors")) || [];

/* =========================
Register Donor
========================= */

const donorForm = document.getElementById("donorForm");

donorForm.addEventListener("submit", function (event) {

event.preventDefault();

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let city = document.getElementById("city").value;
let blood = document.getElementById("blood").value;

let donor = {
    name: name,
    phone: phone,
    city: city,
    blood: blood
};

donors.push(donor);

localStorage.setItem("donors", JSON.stringify(donors));

alert("Donor Registered Successfully!");

donorForm.reset();

});

/* =========================
Search Donor
========================= */

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {

let bloodGroup = document.getElementById("searchBlood").value;

let result = document.getElementById("result");

result.innerHTML = "";

if (bloodGroup === "") {

    result.innerHTML = "<p>Please select a blood group.</p>";

    return;
}

let found = donors.filter(function (donor) {

    return donor.blood === bloodGroup;

});


if (found.length === 0) {

    result.innerHTML = `
        <div class="card">
            <h3>No Donor Found</h3>
            <p>No registered donor for this blood group.</p>
        </div>
    `;

} else {

    found.forEach(function (donor) {

        result.innerHTML += `
            <div class="card">
                <h3>${donor.name}</h3>
                <p><strong>Blood Group:</strong> ${donor.blood}</p>
                <p><strong>City:</strong> ${donor.city}</p>
                <p><strong>Phone:</strong> ${donor.phone}</p>
            </div>
        `;

    });

}

});