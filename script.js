const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});

async function sendMessage() {
    const userText = userInput.value.trim();
    if (!userText) return;

    addMessage(userText, "user-message");
    userInput.value = "";

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();
        addMessage(data.response || "Error: No response", "ai-message");
    } catch (error) {
        addMessage("Error connecting to the server.", "ai-message");
    }
}

function addMessage(text, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
}

async function fetchChatGPTResponse(userText) {
    const response = await fetch("http://127.0.0.1:5000/chat", {  // Call Flask API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
    });

    if (!response.ok) {
        throw new Error("Failed to fetch AI response");
    }

    const data = await response.json();
    return data.response;  // Adjusting to match Flask API response
}
