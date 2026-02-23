
import os
os.environ["DISABLE_MODEL_SOURCE_CHECK"] = "True"
import cv2
import pandas as pd
import io
from paddleocr import PPStructureV3
import numpy as np
from bs4 import BeautifulSoup
# 
ocr = PPStructureV3(
    use_doc_orientation_classify=True,
    use_doc_unwarping=True,      # Flattens the image if the book is curved
    device="gpu"                 # Change to "gpu" if you have a GPU
)

def imagePreProcess(image):
    nparr = np.frombuffer(image, np.uint8)
    im = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if im is None:
        return "Error: Image not found or could not be read."
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    _, binary_image = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    return im

def extract(json_data):
    # 1. Navigate to the HTML content inside the JSON structure
    # PP-StructureV3 stores it in table_res_list -> pred_html
    html_content = json_data['table_res_list'][0]['pred_html']
    
    # 2. Use Pandas to read the HTML table
    # io.StringIO is used to wrap the string so pandas can read it like a file
    df_list = pd.read_html(io.StringIO(html_content))
    
    if not df_list:
        return []
    
    df = df_list[0]
    
    # 3. Optional: Clean up the data (remove NaN, fix OCR noise)
    df = df.fillna('')
    
    # 4. Convert to 2D Array (List of Lists)
    two_d_array = df.values.tolist()
    
    # Optional: Include headers if you need them
    headers = df.columns.tolist()
    
    return headers, two_d_array

def imageToText(image):
    result = ocr.predict(image)
    # print(result)
    for res in result:
        # res.save_to_json(save_path="output")
        # res.save_to_markdown(save_path="output")
        headers, data = extract(res)
        print(f"Headers: {headers}")
        print("Data Array:")
        for row in data:
            print(row)
        return {
            "headers": headers,
            "data" : data
        }


# im = imagePreProcess("test.png")
# imageToText(im)
