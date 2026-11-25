export const shop = {
  instagram: "https://www.instagram.com/phinandfoam/",
  facebook: "https://www.facebook.com/profile.php?id=61595317752229",
  tiktok: "https://www.tiktok.com/@phinandfoam",
  contactEmail: "phinandfoam@gmail.com",
};

// Public announcement only. Keep home addresses off the website.
export const nextDrop = {
  dateTime: "2026-12-05",
  date: "Saturday, December 5",
  year: "2026",
  hours: "10 AM – 3 PM",
  location: "North Austin · 78728",
  orderingNote:
    "Ordering details are coming soon. Follow us on Instagram for the announcement.",
};

export const eventInquiry = `mailto:${shop.contactEmail}?subject=${encodeURIComponent("Let’s bring Phin & Foam to our event")}&body=${encodeURIComponent("Hi Son & Tina!\n\nI’d love to have Phin & Foam at our event.\n\nName:\nEvent type:\nDate and time:\nLocation:\nEstimated guest count:\nAnything else you’d like us to know:\n")}`;
