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


@app.route('/veracity', methods=['POST'])
def get_veracity():
    data = request.get_json()
    summary = data.get('summary', '')
    print("Esto es summary: " + summary)

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "dame un número del uno al 100 en el que me digas que tan confiable es la página que te dirá el usuario mediante una URL para para ellos considerarás 5 parámetros, si tiene texto +20, si tiene fuentes bibliográficas +20, si tiene texto legible +20, si tiene en algún lado que viene de una publicadora de artículos científicos +20, y si tú consideras que es confiable +20, solo puedes responder con un número y su respectivo simbolo de porcentaje, ejemplo (numero)%, ese formato es tu unica respuesta permitida."},
            {"role": "user", "content": summary}
        ]
    )
    print("Esto es summary: " + summary)
    content = completion.choices[0].message.content
    print("Este es el contenido: "  + content)
    return jsonify({'response': content})


if __name__ == '__main__':
    app.run(debug=True)

