import os
import json
import time
import requests
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from werkzeug.datastructures import FileStorage

# URL of your Flask API
api_url = "http://127.0.0.1:5000/predict"

# Path to the JSON file to store data
json_file_path = "./diseaseList.json"
prediction=None
contentt=None
res=None
def post_data(image_path):
    time.sleep(2)
    files = {'image': open(image_path, 'rb')}
    response = requests.post(api_url, files=files)
    if response.status_code == 200:
        print("Data sent successfully")
        content=google_api_remedy(response.json()['prediction'],image_path)
        # res=response.json()
        save_prediction(response.json(), image_path,content)
    else:
        print("Failed to send data")

def google_api_remedy(prediction_label,image_path):
    import pathlib
    import textwrap

    import google.generativeai as genai

    from IPython.display import display
    from IPython.display import Markdown


    def to_markdown(text):
        text = text.replace('•', '  *')
        return text
        # return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

    # Used to securely store your API key
    # from google.colab import userdata

    genai.configure(api_key="AIzaSyCOpRsBGsVWDkcGtmTgMAVmSlCqRxIg7ew")
    
    #opering image  
    import PIL.Image

    img = PIL.Image.open(image_path)
    img

    model = genai.GenerativeModel('gemini-pro-vision')

    # response = model.generate_content(img)
    # print("1st text",response.text)
    # to_markdown(response.text)

    response = model.generate_content([f"our ml model has predicted  it is {prediction_label}, Now u do check if it is correct and enlist the possible solution/cure for this disease (only give four points which should be short and crisp)", img], stream=True)
    response.resolve()
    # print("1st text",response.text)
    return to_markdown(response.text)
    

def save_prediction(prediction_data, image_path,content_in):
    plant_id = 1  # Assuming a constant plant ID for all predictions
    prediction = prediction_data['prediction']
    logits = prediction_data['logits']
    content = content_in  # You can modify this based on your requirements
    
    # Create a dictionary for the new prediction
    new_prediction = {
        "plant_id": plant_id,
        "image_path": image_path,
        "prediction": prediction,
        "logits": logits,
        "content": content
    }
    
    # Read the existing JSON file
    with open(json_file_path, "r") as json_file:
        data = json.load(json_file)
    
    # Append the new prediction to the existing diseaseList
    data["diseaseList"].append(new_prediction)
    
    # Write the updated data back to the JSON file
    with open(json_file_path, "w") as json_file:
        json.dump(data, json_file, indent=4)


# Event handler for filesystem events
class MyHandler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory:
            if event.src_path.endswith(".jpg") or event.src_path.endswith(".png") or event.src_path.endswith(".jpeg"):
                print(f"New image detected: {event.src_path}")
                post_data(event.src_path)
                # contentt=google_api_remedy(prediction,event.src_path)
                # save_prediction(res,event.src_path,)
                # print("the following is the content")
                # print(contentt)

# Path to the directory to monitor
directory_to_watch = "./"

# Create the observer and start monitoring the directory
event_handler = MyHandler()
observer = Observer()
observer.schedule(event_handler, directory_to_watch, recursive=True)
observer.start()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    observer.stop()

observer.join()
