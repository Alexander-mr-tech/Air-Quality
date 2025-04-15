#include <DHT.h>
#include <WiFi.h>
#include <FirebaseESP32.h>
#define DHTPIN 4       // Pin where the DHT11 is connected (adjust as needed)
#define DHTTYPE DHT11 
#define D0_PIN 2  // Digital pin for MQ-7
DHT dht(DHTPIN, DHTTYPE);
#define FIREBASE_HOST "air-quality-bce7b-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "sUJoJ7TA7kUGTvSTXkpRA6nylRHLQTnacSOqal4T"
 #define WIFI_SSID "BROSKI"
 #define WIFI_PASSWORD "haseeb12345"
//Define FirebaseESP32 data object
FirebaseData firebaseData;

void setup() {
  Serial.begin(115200);
  dht.begin();          // Initialize the DHT sensor
  pinMode(D0_PIN, INPUT);
  Serial.println("DHT11 Sensor Initialized");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("Connecting to Wi-Fi");
  delay(2000);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Searching for Network ");
    delay(500);
  }
  Serial.println();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Serial.println("------------------------------------");
  Serial.println("Connected...");
  delay(2000);
}
void loop() {
  MQ2();
  Temp_Humidity_Sensor();
  
}

void MQ2(){
   float MQValue = analogRead(D0_PIN); // Digital threshold output

  // Print to Serial Monitor
  Serial.print("MQValue: ");
  Serial.println(MQValue);
  // Prepare data for Firebase
  String path = "/Sensor_Data"; // Path in your Firebase database
  String MQPath = path + "/Gas_Sensor";
  // Send data to Firebase
  if (Firebase.setInt(firebaseData, MQPath, MQValue)) {
    Serial.println("Digital value sent to Firebase");
  } else {
    Serial.print("Error sending digital value: ");
    Serial.println(firebaseData.errorReason());
  }

  // Add a delay for stability
  delay(1000);
  }

  void Temp_Humidity_Sensor(){
    float humidity = dht.readHumidity();
  float temperature = dht.readTemperature(); // Celsius by default

  // Check if any reads failed
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Prepare data for Firebase
  String path = "/Sensor_Data"; // Path in your Firebase database
  String tempPath = path + "/Temperature_Sensor";
  String humPath = path + "/Humidity_Sensor";

  // Send data to Firebase
  if (Firebase.setFloat(firebaseData, tempPath, temperature)) {
    Serial.println("Temperature sent successfully: " + String(temperature));
  } else {
    Serial.println("Failed to send temperature: " + firebaseData.errorReason());
  }

  if (Firebase.setFloat(firebaseData, humPath, humidity)) {
    Serial.println("Humidity sent successfully: " + String(humidity));
  } else {
    Serial.println("Failed to send humidity: " + firebaseData.errorReason());
  }

  // Delay before the next reading
  delay(1000); // 1 seconds
    }
