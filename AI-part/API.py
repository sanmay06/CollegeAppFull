from flask import Flask, request
from flask_cors import CORS
from ImagePipeline import imagePreProcess, imageToText

app = Flask(__name__)
CORS(app)

@app.get("table_to_text")
def imageToText():
    file = request.files["image"]
    image_bytes = file.read()
    im = imagePreProcess(image_bytes)
    return imageToText(im)
    pass

if __name__ == "__main__":
    app.run(debug=True)
