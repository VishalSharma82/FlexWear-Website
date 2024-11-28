const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", this.window.scrollY > 0);
})

let menu = document.querySelector('#menu-icon');
let navmenu = document.querySelector('.navmenu');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navmenu.classList.toggle('open');
}
// JavaScript for the index.html file
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');
const searchIcon = document.getElementById('search-icon');

// Toggle the navigation menu
menuIcon.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Search functionality
searchIcon.addEventListener('click', () => {
  const searchBar = document.createElement('div');
  searchBar.innerHTML = `
    <div id="search-bar" style="position: fixed; top: 20px; right: 20px; background: #fff; padding: 10px; border: 1px solid #ccc; border-radius: 8px; z-index: 1000;">
      <input type="text" placeholder="Search..." style="padding: 5px; width: 200px;" />
      <button id="close-search" style="margin-left: 10px; padding: 5px;">Close</button>
    </div>
  `;
  document.body.appendChild(searchBar);

  document.getElementById('close-search').addEventListener('click', () => {
    searchBar.remove();
  });
});
document.getElementById("user-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        e.target.reset(); // Reset form fields
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    }
  });