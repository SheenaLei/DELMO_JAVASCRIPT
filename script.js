const textInput = document.getElementById('textInput');
const generateBtn = document.getElementById('generateBtn');
const qrImage = document.getElementById('qrImage');
const placeholderText = document.getElementById('placeholderText');
const downloadBtn = document.getElementById('downloadBtn');

// Function to generate QR Code via API
function generateQRCode() {
    const textValue = textInput.value.trim();

    if (!textValue) {
        alert("Please enter some text or a URL first!");
        return;
    }

    // Using the goqr.me API
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(textValue)}`;

    // Show loading state
    placeholderText.textContent = "Generating QR Code... ⏳";
    placeholderText.style.display = "block";
    qrImage.style.display = "none";
    downloadBtn.style.display = "none";

    // Set image source from API
    qrImage.src = qrApiUrl;

    // Once image loads successfully
    qrImage.onload = function() {
        placeholderText.style.display = "none";
        qrImage.style.display = "block";
        downloadBtn.style.display = "block";
    };
}

// Event Listeners
generateBtn.addEventListener('click', generateQRCode);

textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateQRCode();
    }
});

// Fixed Download Feature using fetch & Blob
downloadBtn.addEventListener('click', async () => {
    if (!qrImage.src) return;

    try {
        // Fetch image data as Blob
        const response = await fetch(qrImage.src);
        const blob = await response.blob();
        
        // Create local Object URL
        const blobUrl = URL.createObjectURL(blob);

        // Trigger Download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        alert("Failed to download image. Try right-clicking the QR code and selecting 'Save Image As'.");
        console.error("Download Error:", error);
    }
});