const searchBtn = document.getElementById("searchBtn");
const vehicleInput = document.getElementById("vehicleInput");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
searchBtn.addEventListener("click", searchVehicle);

vehicleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchVehicle();
});

async function searchVehicle() {
    const vehicleNo = vehicleInput.value
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "");

    if (!vehicleNo) {
        alert("Enter vehicle number");
        return;
    }

    loading.classList.remove("hidden");
    result.innerHTML = "";

    try {
        const response = await fetch("/api/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ vehicleNo })
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(data.error || "Search failed");
        }

        result.innerHTML = `
<div class="result-card">

    <div class="section">
        <h3>🚛 Vehicle Summary</h3>
        <div class="grid">
            <div class="item">
                <div class="label">Vehicle Number</div>
                <div class="value">${data.vehicleNo}</div>
            </div>

            <div class="item">
                <div class="label">Vehicle Type</div>
                <div class="value">${data.vehicleType}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>📄 Pass Information</h3>
        <div class="grid">
            <div class="item">
                <div class="label">Challan Number</div>
                <div class="value">${data.challanNo}</div>
            </div>

            <div class="item">
                <div class="label">UID Number</div>
                <div class="value">${data.uidNo}</div>
            </div>

            <div class="item">
                <div class="label">Challan Date</div>
                <div class="value">${data.challanDate}</div>
            </div>

            <div class="item">
                <div class="label">Validity</div>
                <div class="value">${data.validity}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>⛏ Material Info</h3>
        <div class="grid">
            <div class="item">
                <div class="label">Mineral</div>
                <div class="value">${data.mineral}</div>
            </div>

            <div class="item">
                <div class="label">Quantity</div>
                <div class="value">${data.quantity}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>📍 Route</h3>
        <div class="grid">
            <div class="item">
                <div class="label">Source</div>
                <div class="value">${data.location}</div>
            </div>

            <div class="item">
                <div class="label">Destination</div>
                <div class="value">${data.destination}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>👤 Parties</h3>
        <div class="grid">
            <div class="item">
                <div class="label">Consigner</div>
                <div class="value">${data.consignerName}</div>
            </div>

            <div class="item">
                <div class="label">Consignee</div>
                <div class="value">${data.consigneeName}</div>
            </div>
        </div>
    </div>

</div>
`;
    } catch (error) {
        result.innerHTML = `
        <div class="card">
            <h2>Error</h2>
            <p>${error.message}</p>
        </div>`;
    } finally {
        loading.classList.add("hidden");
    }
}