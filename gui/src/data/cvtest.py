import cv2

address = 'http://192.168.1.34:4747/video'
webCam = cv2.VideoCapture(2)
currentframe = 0 

while True:
    k = cv2.waitKey(1)
    success,frame = webCam.read()
    cv2.imshow("Output", frame)

    if k%256 == 32:
        cv2.imwrite('frame'+str(currentframe)+ '.jpg', frame)
        currentframe += 1

    if k%256 == 27:
        break

webCam.release()

cv2.destroyAllWindows()