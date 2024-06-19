from flask import Flask, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # Permitir solicitudes CORS desde cualquier origen

def read_text_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Configura tu cliente OpenAI

@app.route('/get_response')
def get_response():
    user_message = read_text_file('../front/files/prueba.txt')
    # Obtén la respuesta del modelo
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "responde unicamente con un si o con un no"},
            {"role": "user", "content": user_message}
        ]
    )
    content = completion.choices[0].message.content
    return jsonify({'response': content})

if __name__ == '__main__':
    app.run(debug=True)
