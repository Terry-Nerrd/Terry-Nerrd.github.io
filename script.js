let allProducts = [];

// 1. Fetch and Display Catalog
async function loadCatalog() {
    try {
        const res = await fetch('catalog.json');
        allProducts = await res.json();
        renderProducts(allProducts);
    } catch (e) { console.error("Load error", e); }
}

function renderProducts(items) {
    const container = document.getElementById('cologne-catalog');
    const myPhone = "27682541764"; // Your SA number in international format

    container.innerHTML = items.map(item => {
        // Creates a clean WhatsApp order message
        const orderText = encodeURIComponent(`Hi Terry-Nerrds! 🧴 I'd like to order:\n\n*Product:* ${item.name}\n*Price:* ${item.price}\n\nPlease let me know how to pay! 🌊`);
        const whatsappLink = `https://wa.me{myPhone}?text=${orderText}`;

        return `
            <div class="product-card">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">${item.price}</span>
                <a href="${whatsappLink}" target="_blank" class="buy-btn" style="text-decoration:none; display:block;">
                    ORDER ON WHATSAPP 🛒
                </a>
            </div>
        `;
    }).join('');
}

// 2. Search Logic
const searchInput = document.getElementById('cologne-search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });
}

// 3. Formspree Ajax Fix (Stops the redirect)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // This stops the page from redirecting
        
        const status = document.getElementById('form-status');
        const btn = document.getElementById('submit-btn');
        const formData = new FormData(contactForm);
        
        btn.disabled = true;
        btn.innerText = "Sending...";

        try {
            const response = await fetch("https://formspree.io", {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.style.display = "block";
                contactForm.reset();
                btn.innerText = "Sent!";
            } else {
                alert("Oops! There was a problem submitting your form.");
                btn.disabled = false;
                btn.innerText = "Send Message";
            }
        } catch (error) {
            alert("Connection error. Please try again.");
            btn.disabled = false;
            btn.innerText = "Send Message";
        }
    });
}

loadCatalog();
