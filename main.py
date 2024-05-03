import os
from flask import Flask, request, jsonify
import torch
from transformers import ViTFeatureExtractor, ViTForImageClassification ,AutoModelForImageClassification
import cv2
import numpy as np
import json
import uuid

app = Flask(__name__)

# Load the pre-trained model and feature extractor
feature_extractor = ViTFeatureExtractor.from_pretrained('stanghong/leaf-disease-id')
model = AutoModelForImageClassification.from_pretrained('./model/')

# Map class indices to their corresponding labels
id2label = model.config.id2label

@app.route('/predict', methods=['POST'])
def predict():
    # Get the image file from the request
    file = request.files['image']
    # Read the image file
    img_bytes = file.read()
    img_array = np.frombuffer(img_bytes, np.uint8)
    image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    # Preprocess the image
    inputs = feature_extractor(images=image, return_tensors="pt")
    pixel_values = inputs["pixel_values"]
    
    # Perform prediction
    with torch.no_grad():
        outputs = model(pixel_values)
        logits = outputs.logits
        numpy_logits=logits.numpy()
        # Convert the NumPy array to a list
        json_serializable_list = numpy_logits.tolist()

        # Convert the list to JSON
        json_data = json.dumps(json_serializable_list)
        predicted_class_idx = logits.argmax(-1).item()
        predicted_class = id2label[predicted_class_idx]
        print(predicted_class)
    # Return the prediction as a JSON response
    return jsonify({'prediction': predicted_class,'logits':json_data})

if __name__ == '__main__':
    app.run(port=5000, debug=True)