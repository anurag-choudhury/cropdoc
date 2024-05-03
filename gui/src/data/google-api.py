import pathlib
import textwrap

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown


def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

# Used to securely store your API key
# from google.colab import userdata

genai.configure(api_key="AIzaSyCOpRsBGsVWDkcGtmTgMAVmSlCqRxIg7ew")
 
#opering image  
import PIL.Image

img = PIL.Image.open('frame0.jpg')
img

model = genai.GenerativeModel('gemini-pro-vision')

# response = model.generate_content(img)
# print("1st text",response.text)
# to_markdown(response.text)

response = model.generate_content(["our ml model has prediction it is leaf powdery mildew predict which type of disease is there on the leaf also give solutions to how to cure them", img], stream=True)
response.resolve()
print("1st text",response.text)
to_markdown(response.text)
