// Simple frontend script for Mile High Rentals

// Update footer year automatically
document.getElementById("year").textContent = new Date().getFullYear();

// Example: load listings dynamically (placeholder for now)
const listingsEl = document.getElementById("listings");
if (listingsEl) {
  listingsEl.innerHTML = `
    <div class="listing">
      <h3>123 Main St</h3>
      <p>2 Bed • 1 Bath • $1,200/mo</p>
    </div>
    <div class="listing">
      <h3>456 Oak Ave</h3>
      <p>3 Bed • 2 Bath • $1,800/mo</p>
    </div>
  `;
}
