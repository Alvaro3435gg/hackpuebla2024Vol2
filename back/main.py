from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # Permitir solicitudes CORS desde cualquier origen

# Configura tu cliente OpenAI
client = OpenAI(api_key="sk-proj-ICzHe8jbnGYQWDNzJqJ2T3BlbkFJEwjlFwtKF4Hqdp7aWdro")

@app.route('/get_response', methods=['POST'])
def get_response():
    data = request.get_json()
    summary = data.get('summary', '')

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "dame un resumen de diez palabras"},
            {"role": "user", "content": summary}
        ]
    )
    content = completion.choices[0].message.content
    return jsonify({'response': content})


@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.get_json()
    question = data.get('feedback', '')
    content = data.get('content', '')

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Responde la pregunta del usuario sobre el resumen con el siguiente contexto: " + content},
            {"role": "user", "content": question}
        ]
    )
    content = completion.choices[0].message.content
    return jsonify({'response': content})


if __name__ == '__main__':
    app.run(debug=True)
