document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const menuToggle = document.querySelector(".menu-toggle");
  const modal = document.getElementById("enquiryModal");
  const openButtons = document.querySelectorAll("[data-open-modal]");
  const closeButtons = document.querySelectorAll("[data-close-modal]");
  const form = document.getElementById("enquiryForm");
  const success = document.getElementById("formSuccess");
  const downloadButton = document.getElementById("downloadCostSheet");

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
    });
  });

  // Modal
  const openModal = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => document.getElementById("name")?.focus(), 100);
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openButtons.forEach(button => button.addEventListener("click", openModal));
  closeButtons.forEach(button => button.addEventListener("click", closeModal));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  // Enquiry form -> WhatsApp message
  form?.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const configuration = document.getElementById("configuration").value;

    if (!/^\d{10}$/.test(phone)) {
      success.textContent = "Please enter a valid 10-digit mobile number.";
      success.style.color = "#b00020";
      return;
    }

    const message =
      `Hi Konark Estates,%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Mobile: ${encodeURIComponent(phone)}%0A` +
      `Preferred configuration: ${encodeURIComponent(configuration)}%0A%0A` +
      `Please share the full cost sheet and project details.`;

    success.textContent = "Thanks! Opening WhatsApp with your enquiry...";
    success.style.color = "#118b45";

    window.open(`https://wa.me/919999999999?text=${message}`, "_blank", "noopener");

    setTimeout(() => {
      form.reset();
      closeModal();
      success.textContent = "";
    }, 900);
  });

  // Cost sheet download - no server required
  downloadButton?.addEventListener("click", () => {
    const rows = [
      ["Tower", "Configuration", "Carpet Area", "Indicative Price"],
      ["High Castle", "1 BHK", "360 sq.ft", "₹44,00,000"],
      ["High Castle", "2 BHK", "606 sq.ft", "₹70,00,000"],
      ["Stellar", "1 BHK", "380 sq.ft", "₹46,50,000"],
      ["Stellar", "2 BHK", "625 sq.ft", "₹73,20,000"],
      ["Astra", "1 BHK", "365 sq.ft", "₹42,80,000"],
      ["Astra", "2 BHK", "610 sq.ft", "₹68,90,000"],
      ["Orion", "2 BHK", "606 sq.ft", "₹78,79,870"],
      [],
      ["Note", "Final amount includes flat cost, development charges, club house charges, stamp duty, registration & GST."]
    ];

    const csv = rows.map(row =>
      row.map(cell => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")
    ).join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Konark-Estates-Cost-Sheet.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  });

  // Active navigation state
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const updateActiveNav = () => {
    const y = window.scrollY + 150;
    let current = sections[0]?.id;

    sections.forEach(section => {
      if (section.offsetTop <= y) current = section.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();
});
