# 🗨️ ChatGPT Web Application (Begginer Friendly)

Welcome! This is a simple web-based chatbot application that uses **Flask** as the backend and integrates with **OpenAI's ChatGPT API**. The frontend is a user-friendly chat interface built with **HTML, CSS, and JavaScript**. 

---

## 🚀 Features
- 🔹 **Chat with OpenAI's GPT-4o mini** via a web interface.
- 🔹 **Flask API Backend** to handle chat requests securely.
- 🔹 **Secure API Key Handling** using environment variables (`api.env`).
- 🔹 **CORS Enabled** for smooth frontend-backend communication.
- 🔹 **Minimal Dependencies** – lightweight and easy to deploy.

---

### **Overview**

- **Frontend**: HTML, CSS, and JavaScript, providing a simple yet elegant chat interface.
- **Backend**: Python’s Flask framework, handling chat requests and forwarding them to OpenAI.
- **AI Integration**: GPT-4o-mini model via OpenAI’s API.
- **Secure Config**: Environment variables for secret management (`api.env` + `.gitignore`).

---

### **File Structure**

1. **`app.py`**: Contains the Flask server setup. Loads the API key from `api.env` and queries GPT-4o-mini.
2. **`index.html`**: Houses the chat interface (input box, send button, chat display).
3. **`style.css`**: Adds styling to the chat container, buttons, and message bubbles.
4. **`script.js`**: Handles asynchronous requests to the Flask server, appends responses to the chat UI.
5. **`api.env`**: Stores your **OpenAI API Key**. Never commit this file—`.gitignore` is set up to exclude it.

---

### **Requirements**

Below is a detailed table outlining each requirement, its purpose, and how to install it (if needed):
Note: If you plan to **run this locally**, you must have **your own Python environment** (e.g., a virtual environment) before running the code.


| Dependency        | Purpose                                                  | Installation Command                 |
|-------------------|----------------------------------------------------------|--------------------------------------|
| **Python 3.8+**   | Required language runtime (3.10 recommended).            | [Download/Install from python.org](https://www.python.org/downloads/) |
| **Flask**         | A minimalistic web framework for Python.                 | `pip install flask`                  |
| **Flask-CORS**    | Enables Cross-Origin requests for the frontend.          | `pip install flask-cors`             |
| **OpenAI**        | Official Python library to call OpenAI's API.            | `pip install openai`                 |
| **python-dotenv** | Loads environment variables from `.env` or `api.env`.    | `pip install python-dotenv`          |

**Alternatively**, install all Python dependencies at once:

```bash 
pip install flask flask-cors openai python-dotenv 
```
---

## Usage 

#### 1. Clone or Download
```bash 
git clone https://github.com/yourusername/chatgpt-web-app.git
cd chatgpt-web-app
```
#### 2. Environment Setup
This project uses a Python environment created with conda, but feel free to set up your own environment by any other method you prefer.
<div style="margin-left: 3em;">

##### Creating a Python 3.10 Conda Environment
This document describes how to create and manage a **Python 3.10** environment using **conda**.

##### 1. Install Conda 

If you haven’t already installed conda (via Anaconda or Miniconda), follow one of these links:
- [Miniconda Installation Guide](https://docs.conda.io/en/latest/miniconda.html)
- [Anaconda Installation Guide](https://www.anaconda.com/products/distribution)

Once installed, you’ll have access to the `conda` command.

##### 2.  Open a Terminal or Anaconda Prompt

On Windows, open the Anaconda Prompt (included with Anaconda or Miniconda). You can also use Command Prompt or PowerShell if conda is accessible in your PATH.
On macOS or Linux, open your regular Terminal. Ensure conda is installed and available by running:
```bash 
conda --version
```
If conda is not found, verify that you’ve installed it and that your shell initialization files are set up correctly.

##### 3.  Create a New Conda Environment
Use the following command to create an environment named `myenv` with **Python 3.10**:
```bash
conda create --name myenv python=3.10
```
- add images of explanation 

##### 4.  Activate Your New Environment
```bash
conda activate myenv 
```
- add an image 
Now your shell should indicate (myenv) at the beginning of the prompt. At this projects case its (okxyenv).

##### 5.  Verify Python Version
```bash
python --version 
```
It should display 3.10.x (e.g., Python 3.10.8).

##### 6.  Install Additional Packages (Optional)

For example, to install Flask, run:
```bash
conda install flask
```
Or install from pip if a package isn’t available through conda:
```bash
pip install flask
```
##### 7. Deactivate the Environment (When Done)
```bash
conda deactivate
```
</div>

#### 3. Configure the API Key 
Create a file named api.env or just a .env

```bash 
OPENAI_API_KEY=sk-your-real-key
```
Before creating this file make sure you have your own API Key, by firstly creating an account through this link https://platform.openai.com/docs/models/gpt-4o-mini then subscribe for a plan suitable for you. 

Make sure your api.env is never committed to version control (GIT). Your .gitignore should contain api.env 

#### 4. Install Dependencies
```bash 
pip install flask flask-cors openai python-dotenv
```

#### 5. Run the Flask Server
```bash 
python app.py
```
The server will listen on http://127.0.0.1:5000 
To open an web page through terminal "Go Live" at the right bottom of the terminal. 

#### 6. Open the Frontend Web Application

If you’re using **VS Code (Visual Studio Code)** and have the **Live Server extension installed,** you can right-click on index.html and select **“Open with Live Server.”** This will automatically start a local server and open your browser to serve the file.

#### 7. Testing with cURL

You can test the `/chat` endpoint via cURL:

```bash
curl -X POST "http://127.0.0.1:5000/chat" \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello"}'
```
Expected response (JSON):
```bash 
{
  "response": "Hi there! How can I assist you today?"
}
```
This helps ensure that any developer can **verify the API** without needing a full frontend setup.