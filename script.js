document.addEventListener("DOMContentLoaded", function () {
    const chatWidget = document.getElementById("chatWidget");
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const minimizeBtn = document.querySelector(".minimize-btn");
    const expandBtn = document.querySelector(".expand-btn");
    const refreshBtn = document.querySelector(".refresh-btn");
    const answerCount = document.getElementById("answerCount");

    let botResponses = 0; // Track the number of responses

    // Handle sending messages
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        displayMessage(message, "user");
        userInput.value = "";

        // Reset the answer count when the user sends a new message
        botResponses = 0;
        answerCount.textContent = botResponses;
        answerCount.style.display = "none"; // Hide the badge when no responses

        fetchResponse(message);
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender === "ai" ? "ai-message" : "user-message");

        if (sender === "ai") {
            const avatar = document.createElement("div");
            avatar.classList.add("ai-avatar");
            avatar.innerHTML = '<img src="Chat_bot_logo.png" alt="Chat Avatar" />';
            messageElement.appendChild(avatar);
        }

        const messageText = document.createElement("div");
        messageText.classList.add("message-text");
        messageText.innerHTML = `<p>${message}</p>`;
        messageElement.appendChild(messageText);

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function fetchResponse(userMessage) {
        fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        })
            .then(response => response.json())
            .then(data => {
                if (data.response) {
                    displayMessage(data.response, "ai");
                    // Increment and update the answer count
                    botResponses++;
                    answerCount.textContent = botResponses;
                    answerCount.style.display = "block"; // Ensure the badge is visible
                }
            })
            .catch(error => {
                console.error("Error fetching response:", error);
                displayMessage("Sorry, I am having trouble responding right now.", "ai");
            });
    }

    // Handle widget minimize
    minimizeBtn.addEventListener("click", function () {
        chatWidget.classList.toggle("minimized");
    });

    // Handle widget expand
    expandBtn.addEventListener("click", function () {
        chatWidget.classList.toggle("expanded");
    });

    // Handle widget refresh
    refreshBtn.addEventListener("click", function () {
        chatBox.innerHTML = "";
        botResponses = 0; // Reset the answer count
        answerCount.textContent = botResponses;
        displayMessage("Hello! I’m your friendly chat bot. How can I help you?", "ai");
    });
});
