// 

const modal = document.getElementById("modal");
const enquireBtn = document.getElementById("enquireBtn");
const closeModal = document.getElementById("closeModal");
const enquiryForm = document.getElementById("enquiryForm");
const exploreBtn = document.getElementById("exploreBtn");

function openModal(){
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}
function hideModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
}

// Enquiry button 

enquireBtn.addEventListener("click", openModal);
closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", (e) => {
  if(e.target === modal) hideModal();
});
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape") hideModal();
});

exploreBtn.addEventListener("click", () => {
  document.querySelector(".bottom-strip").scrollIntoView({behavior:"smooth"});
});

// Enquiry Form  

enquiryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you! Our Konark Estates team will contact you shortly.");
  enquiryForm.reset();
  hideModal();
});
