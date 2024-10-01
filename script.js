const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
const heartRateDisplay = document.getElementById("heartRate");
const co2StatusDisplay = document.getElementById("co2Status");
const plugStatusDisplay = document.getElementById("plugStatus");
const spo2Display = document.getElementById("spo2");
const temperatureDisplay = document.getElementById("temperature");
const respiratoryRateDisplay = document.getElementById("respiratoryRate");
const flatlineStatusDisplay = document.getElementById("flatlineStatus");

let monitoring = false;
let intervalId;
let heartRate = 92; // Initial heart rate
let flatlineActive = false;

function startMonitoring() {
    monitoring = true;
    heartRateDisplay.textContent = heartRate;
    drawHeartbeat();
    setRandomValues();
    startBPMChanges(); // Start the BPM changes
}

function stopMonitoring() {
    monitoring = false;
    clearInterval(intervalId);
    flatline();
}

function drawHeartbeat() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Check if flatline is active
    if (flatlineActive) {
        drawFlatline();
        return;
    }

    // Draw heart rate pulse
    drawPulses();
}

function drawPulses() {
    const pulseCount = 5; // Number of pulses to draw
    const pulseHeight = 60; // Height of each pulse

    // Calculate pulse width
    const pulseWidth = canvas.width / pulseCount;

    for (let i = 0; i < pulseCount; i++) {
        const x = i * pulseWidth + (pulseWidth / 2);
        const y = canvas.height / 2 - pulseHeight;
        const opacity = i % 2 === 0 ? 1 : 0.5; // Alternate opacity
        ctx.fillStyle = `rgba(0, 123, 255, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height / 2);
        ctx.lineTo(x + 20, y);
        ctx.lineTo(x + 40, canvas.height / 2);
        ctx.lineTo(x + 20, canvas.height / 2 + pulseHeight);
        ctx.fill();
    }

    setTimeout(drawHeartbeat, 500); // Draw heartbeat every half second
}

function drawFlatline() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#ff0000"; // Red color for flatline
    ctx.stroke();
}

function flatline() {
    flatlineActive = true;
    flatlineStatusDisplay.textContent = "Yes";
    heartRateDisplay.textContent = "0"; // Display 0 BPM
    drawFlatline(); // Draw flatline immediately
}

function setRandomValues() {
    // Set random values for the info panel
    co2StatusDisplay.textContent = "True";
    plugStatusDisplay.textContent = "True";
    spo2Display.textContent = Math.floor(Math.random() * (100 - 90 + 1)) + 90; // Oxygen saturation between 90 and 100
    temperatureDisplay.textContent = (Math.random() * (37 - 36) + 36).toFixed(1); // Temperature between 36°C and 37°C
    respiratoryRateDisplay.textContent = Math.floor(Math.random() * (20 - 12 + 1)) + 12; // Respiratory rate between 12 and 20
}

function startBPMChanges() {
    setInterval(() => {
        if (!monitoring) return;

        // Randomly change BPM every 30 seconds, 1 minute, or 2 minutes
        heartRate = getRandomHeartRate();
        heartRateDisplay.textContent = heartRate;
        updateOtherValues();

        // Check if we should flatline
        if (heartRate === 0) {
            flatline();
        }
    }, getRandomTimeInterval());
}

function getRandomHeartRate() {
    // Return a specific heart rate or 0 for flatline
    const rates = [60, 70, 80, 90, 92, 99, 100, 87, 0]; // Include 0 for flatline
    return rates[Math.floor(Math.random() * rates.length)];
}

function getRandomTimeInterval() {
    return Math.floor(Math.random() * (120000 - 30000 + 1)) + 30000; // Random time between 30 seconds and 2 minutes
}

