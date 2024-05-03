import serial
import json 

with open("serialtest.json", "r") as f:
	data = json.load(f)

time = 1
# ser = serial.Serial(port='/dev/ttyACM0',baudrate=9600)
ser = serial.Serial(port='COM3',baudrate=9600)

while True:
	if ser.in_waiting:
		packet = ser.readline()
		val = packet.decode('latin-1').rstrip('\n')
		#print(val)
		data[str(time)] = val.rstrip('\r')
		f = open("serialtest.json", "w")
		json.dump(data, f)
		f.close()
		time += 1 
		if time > 12:
			time = 1 
