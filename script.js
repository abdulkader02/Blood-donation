
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {
    const isActive = navMenu.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", isActive);
    menuBtn.textContent = isActive ? "✕" : "☰";
});


const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    });
});




let donors = JSON.parse(localStorage.getItem("donors")) || [];

const donorForm = document.getElementById("donorForm");

donorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const city = document.getElementById("city").value.trim();
    const blood = document.getElementById("blood").value;

    const donor = {
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


const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
    const bloodGroup = document.getElementById("searchBlood").value;
    const result = document.getElementById("result");

    result.innerHTML = "";

    if (bloodGroup === "") {
        result.innerHTML = `
            <div class="card">
                <h3>Please Select a Blood Group</h3>
                <p>
                    Please choose a blood group before searching.
                </p>
            </div>
        `;

        return;
    }

    const found = donors.filter(function (donor) {
        return donor.blood === bloodGroup;
    });

    if (found.length === 0) {
        result.innerHTML = `
            <div class="card">
                <h3>No Donor Found</h3>
                <p>
                    No registered donor is available
                    for ${escapeHTML(bloodGroup)} blood group.
                </p>
            </div>
        `;

        return;
    }

    found.forEach(function (donor) {
        result.innerHTML += `
            <div class="card">
                <h3>${escapeHTML(donor.name)}</h3>

                <p>
                    <strong>Blood Group:</strong>
                    ${escapeHTML(donor.blood)}
                </p>

                <p>
                    <strong>City:</strong>
                    ${escapeHTML(donor.city)}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${escapeHTML(donor.phone)}
                </p>
            </div>
        `;
    });
});


const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");

                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});


function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}