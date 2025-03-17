async function trackIP() {
    const ip = document.getElementById("ipAddress").value.trim();
    const resultDiv = document.getElementById("result");

    if (!ip) {
        resultDiv.innerHTML = `<p style="color:red;">Please enter an IP address!</p>`;
        return;
    }

    try {
        const response = await fetch(`/track?ip=${ip}&nocache=${Date.now()}`);
        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
        } else {
            resultDiv.innerHTML = `
                <div class="result-box">
                    <h3>IP Details</h3>
                    <p><strong>IP:</strong> ${data.ip}</p>
                    <p><strong>City:</strong> ${data.city}</p>
                    <p><strong>Region:</strong> ${data.region}</p>
                    <p><strong>Country:</strong> ${data.country}</p>
                    <p><strong>ISP:</strong> ${data.isp}</p>
                    <p><strong>Latitude:</strong> ${data.lat}</p>
                    <p><strong>Longitude:</strong> ${data.lon}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error fetching IP data:", error);
        resultDiv.innerHTML = `<p style="color:red;">Failed to fetch data.</p>`;
    }
}
