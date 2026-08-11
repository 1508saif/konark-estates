/* =========================================================
   KONNARK ESTATES - TOWERS PAGE
   Ye file page ki interactive functionality handle karti hai.
   ========================================================= */


/* =========================================================
   1. Elements ko select kar rahe hain
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const enquireBtn = document.getElementById("enquireBtn");
const mobileEnquire = document.getElementById("mobileEnquire");
const enquiryModal = document.getElementById("enquiryModal");
const closeModal = document.getElementById("closeModal");
const enquiryForm = document.getElementById("enquiryForm");


/* =========================================================
   2. MOBILE MENU
   Menu button click hone par mobile navigation open/close.
   ========================================================= */

function toggleMobileMenu() {
    mobileMenu.classList.toggle("open");
    const isOpen = mobileMenu.classList.contains("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
}


/* Menu button click */

menuBtn.addEventListener("click", toggleMobileMenu);


/* Mobile menu ka link click hone par menu close */

document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});


/* =========================================================
   3. ENQUIRY MODAL OPEN
   ========================================================= */

function openEnquiryModal() {
    enquiryModal.classList.add("open");
    enquiryModal.setAttribute("aria-hidden", "false");
    /*
       Modal open hone ke baad body scroll lock kar rahe hain.
       Isse mobile par background page accidentally scroll nahi hoga.
    */
    document.body.style.overflow = "hidden";

}

/* =========================================================
   4. ENQUIRY MODAL CLOSE
   ========================================================= */

function closeEnquiryModal() {
    enquiryModal.classList.remove("open");
    enquiryModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

}

/* Desktop Enquire button */
enquireBtn.addEventListener("click", openEnquiryModal);

/* Mobile Enquire button */

mobileEnquire.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    openEnquiryModal();

});


/* Close icon */
closeModal.addEventListener("click", closeEnquiryModal);
/* Modal ke bahar click karne par close */
enquiryModal.addEventListener("click", (event) => {
    if (event.target === enquiryModal) {
        closeEnquiryModal();
    }
});


/* =========================================================
   5. ESCAPE KEY
   Keyboard se Escape press karne par modal/menu close.
   ========================================================= */
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeEnquiryModal();
        mobileMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
    }
});


/* =========================================================
   6. WHATSAPP FOR PRICE BUTTONS
   Abhi demo number hai.
   Real WhatsApp number baad mein yahan replace karna.
   ========================================================= */

document.querySelectorAll(".price-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const towerName = button.dataset.tower;
        const message =
            `Hello, I am interested in ${towerName} at Konark Estates. Please share the price details.`;
        /*
           IMPORTANT:
           Yahan apna actual WhatsApp number add karna.
           Example:
           const phone = "919876543210";

           Phir:
           window.open(
               `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
               "_blank"
           );
        */

        console.log(message);

        alert(
            `${towerName} ke price ke liye WhatsApp enquiry ready hai.\n\nActual WhatsApp number JS mein add karna hai.`
        );

    });

});


/* =========================================================
   7. FLOOR PLAN BUTTON
   Abhi demo interaction hai.
   Actual PDF/plan link baad mein add kar sakte ho.
   ========================================================= */

document.querySelectorAll(".floor-btn").forEach((button) => {

    button.addEventListener("click", () => {
        const towerName = button.dataset.tower;
        alert(
            `${towerName} ka floor plan yahan open hoga.\n\nActual PDF/link baad mein connect kar sakte hai.`
        );
    });
});


/* =========================================================
   8. ENQUIRY FORM
   Abhi frontend demo submission.
   Backend/API connect karne ke baad yahan actual form submit hoga.
   ========================================================= */

enquiryForm.addEventListener("submit", (event) => {

    event.preventDefault();
    const name = enquiryForm
        .querySelector('input[type="text"]')
        .value
        .trim();
    const phone = enquiryForm
        .querySelector('input[type="tel"]')
        .value
        .trim();
    if (!name || !phone) {
        alert("Please apna naam aur mobile number enter karein.");
        return;
    }

    alert(
        `Thank you ${name}!\n\nAapki enquiry successfully receive ho gayi hai.`
    );
    enquiryForm.reset();
    closeEnquiryModal();
});
