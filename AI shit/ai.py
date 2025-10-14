import cv2
from pytesseract import image_to_string

def tabulateFromImage(image = "test.png"):
    im = cv2.imread(image)
    if im is None:
        return "Error: Image not found or could not be read."
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    _, binary_image = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    cv2.imwrite('temp_image.png', binary_image)
    text = image_to_string(binary_image)
    with open('output.txt', 'w') as f:
        f.write(text)
    print("Text extracted and saved to output.txt")
    col = text.split('\n')
    columns = []
    for i in range(len(col)):
        rows = []
        if col[i].strip() != '':
            rows = [c for c in  col[i].split()  if c != '|' and c != '/' and c != '\\']
        if len(rows) > 0:
            columns.append(rows)
    # print("Columns extracted:", columns)
    for row in columns:
        print("\n",len(row))
    return text

tabulateFromImage("test.png")