from flask import Flask, request, jsonify, send_from_directory
from langchain_community.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, AIMessage
from langchain.memory import ConversationBufferMemory
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load API key
load_dotenv("api.env")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("Missing OpenAI API Key. Make sure it's set in api.env")

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Initialize LangChain OpenAI model
chat_model = ChatOpenAI(openai_api_key=OPENAI_API_KEY, model="gpt-4o-mini")

# Initialize conversation memory
memory = ConversationBufferMemory(return_messages=True)

# Main chat function
@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "").strip()

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Store user message in memory
        memory.save_context({"input": user_message}, {"output": ""})

        # Generate response using LangChain with memory
        response = chat_model.invoke(memory.load_memory_variables({})["history"])
        ai_message = response.content  # Extract the message text

        # Store AI response in memory
        memory.save_context({"input": ""}, {"output": ai_message})

        return jsonify({"response": ai_message})

    except Exception as e:
        print("error", str(e))
        return jsonify({"error": str(e)}), 500
    
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.getcwd(), filename)

if __name__ == '__main__':
    app.run(debug=True)
