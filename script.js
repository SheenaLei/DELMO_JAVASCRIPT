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

// Optional download feature helper
downloadBtn.addEventListener('click', () => {
    if (qrImage.src) {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});