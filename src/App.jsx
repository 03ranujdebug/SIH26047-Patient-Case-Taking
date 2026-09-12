import { useState } from "react";

function App() {
const [screen, setScreen] = useState("login");
const [listening, setListening] = useState(false);

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [selectedCase, setSelectedCase] = useState(null);
const [selectedHospital, setSelectedHospital] = useState("");
const [selectedDoctor, setSelectedDoctor] = useState("");
const [selectedDate, setSelectedDate] = useState("");
const [selectedTime, setSelectedTime] = useState("");
const [appointmentId, setAppointmentId] = useState("");
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    language: "",
  });

  const [caseData, setCaseData] = useState({
    caseId: "",
    complaint: "",
    duration: "",
    severity: "",
    symptoms: "",
    medicalHistory: "",
    medicines: "",
    allergies: "",
  });
  const [redFlagDetected, setRedFlagDetected] = useState(false);
  const [redFlagSymptom, setRedFlagSymptom] = useState("");
const [ayushData, setAyushData] = useState({
  prakriti: "",
  vikriti: "",
  sara: "",
  samhanana: "",
  height: "",
  weight: "",
  satmya: "",
  satmyaNotes: "",
  satva: "",
  aharaShakti: "",
  vaya: "",
  bala: "",
});
  function handlePatientChange(e) {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  }

 function handleCaseChange(e) {
  const { name, value } = e.target;

  const updatedCaseData = {
    ...caseData,
    [name]: value,
  };

  setCaseData(updatedCaseData);

  const textToCheck =
    updatedCaseData.complaint + " " + updatedCaseData.symptoms;

  setRedFlagDetected(checkRedFlags(textToCheck));
} 
function handleLogin() {
  const users = [
    {
      id: "DOC001",
      password: "doc123",
      role: "doctor",
    },
    {
      id: "DOC002",
      password: "doc456",
      role: "doctor",
    },
    {
      id: "PAT001",
      password: "pat123",
      role: "patient",
    },
    {
      id: "PAT002",
      password: "pat456",
      role: "patient",
    },
    {
      id: "ADMIN001",
      password: "admin123",
      role: "admin",
    },
  ];

  const user = users.find(
    (account) =>
      account.id === username &&
      account.password === password
  );

  if (user) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userRole", user.role);

    setScreen("role");
  } else {
    alert("Invalid User ID or Password");
  }
}
function generateCaseId() {
  const year = new Date().getFullYear();

  const lastNumber =
    Number(localStorage.getItem("lastCaseNumber")) || 0;

  const newNumber = lastNumber + 1;

  localStorage.setItem(
    "lastCaseNumber",
    newNumber.toString()
  );

  return `CASE-${year}-${String(newNumber).padStart(4, "0")}`;
}
function generateAppointmentId() {
  const year = new Date().getFullYear();
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `APT-${year}-${randomNumber}`;
}


const hospitals = [
  {
    name: "City Care Hospital",
    doctors: [
      {
        name: "Dr. Sharma",
        specialization: "General Physician",
        days: ["Monday", "Wednesday", "Friday"],
        times: ["10:00 AM", "10:30 AM", "11:00 AM"]
      },
      {
        name: "Dr. Verma",
        specialization: "Dermatologist",
        days: ["Tuesday", "Thursday"],
        times: ["11:00 AM", "11:30 AM", "12:00 PM"]
      }
    ]
  },

  {
    name: "Ayush Wellness Hospital",
    doctors: [
      {
        name: "Dr. Singh",
        specialization: "Ayurveda Specialist",
        days: ["Monday", "Tuesday", "Thursday"],
        times: ["9:00 AM", "9:30 AM", "10:00 AM"]
      },
      {
        name: "Dr. Gupta",
        specialization: "General Physician",
        days: ["Wednesday", "Friday", "Saturday"],
        times: ["2:00 PM", "2:30 PM", "3:00 PM"]
      }
    ]
  },

  {
    name: "MedLife Hospital",
    doctors: [
      {
        name: "Dr. Patel",
        specialization: "Cardiologist",
        days: ["Monday", "Wednesday", "Saturday"],
        times: ["4:00 PM", "4:30 PM", "5:00 PM"]
      }
    ]
  }
];

function smartExtract(text) {
  const lowerText = text.toLowerCase();

  let extracted = {
    complaint: "",
    duration: "",
    symptoms: "",
    severity: "",
  };

  // Detect complaint
  if (lowerText.includes("fever")) {
    extracted.complaint = "Fever";
  } else if (lowerText.includes("cough")) {
    extracted.complaint = "Cough";
  } else if (lowerText.includes("headache")) {
    extracted.complaint = "Headache";
  } else if (lowerText.includes("stomach pain")) {
    extracted.complaint = "Stomach Pain";
  }

  // Detect duration
  const durationMatch = lowerText.match(
    /(\d+)\s*(day|days|week|weeks|month|months)/
  );

  if (durationMatch) {
    extracted.duration =
      durationMatch[1] + " " + durationMatch[2];
  }

  // Detect severity
  if (lowerText.includes("severe")) {
    extracted.severity = "Severe";
  } else if (lowerText.includes("moderate")) {
    extracted.severity = "Moderate";
  } else if (lowerText.includes("mild")) {
    extracted.severity = "Mild";
  }

  // Detect symptoms
  const symptoms = [];

  if (lowerText.includes("headache")) {
    symptoms.push("Headache");
  }

  if (lowerText.includes("weakness")) {
    symptoms.push("Weakness");
  }

  if (lowerText.includes("vomiting")) {
    symptoms.push("Vomiting");
  }

  if (lowerText.includes("nausea")) {
    symptoms.push("Nausea");
  }

  if (lowerText.includes("cold")) {
    symptoms.push("Cold");
  }

  extracted.symptoms = symptoms.join(", ");

  return extracted;
}
function checkRedFlags(text) {
  const lowerText = text.toLowerCase();

  const redFlags = [
    "chest pain",
    "difficulty breathing",
    "shortness of breath",
    "severe bleeding",
    "unconscious",
    "loss of consciousness",
    "seizure",
    "stroke",
    "paralysis",
    "severe abdominal pain",
    "vomiting blood",
    "blood in vomit",
    "suicidal",
    "suicide",
  ];

 const matchedFlag = redFlags.find((flag) => lowerText.includes(flag));

setRedFlagSymptom(matchedFlag || "");

return Boolean(matchedFlag);
}
  function startVoiceInput() {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Speech recognition is not supported in this browser. Please use Google Chrome."
    );
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang =
    patient.language === "Hindi" ? "hi-IN" : "en-IN";

  recognition.interimResults = false;

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.onerror = () => {
    setListening(false);
    alert("Could not hear you. Please try again.");
  };

recognition.onresult = (event) => {
  const speechText =
    event.results[0][0].transcript.trim();

  const extracted = smartExtract(speechText);

  setCaseData((previous) => ({
    ...previous,
    complaint: extracted.complaint || speechText,
    duration: extracted.duration,
    severity: extracted.severity,
    symptoms: extracted.symptoms,
  }));
};

  recognition.start();
}

  /* =========================
     WELCOME SCREEN
  ========================= */

  /* ========================
   LOGIN SCREEN
======================== */

if (screen === "login") {
  return (
    <div style={styles.page}>

      <main style={styles.hero}>
        <div
  style={{
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(25,169,139,0.16), rgba(25,169,139,0))",
    top: "40px",
    left: "-80px",
    pointerEvents: "none",
  }}
/>

<div
  style={{
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(7,59,92,0.13), rgba(7,59,92,0))",
    top: "180px",
    right: "-120px",
    pointerEvents: "none",
  }}
/>
        <div style={styles.icon}>
          🩺
        </div>

        <h1 style={styles.title}>
          SMART MEDICAL HEALTHCARE SYSTEM
        </h1>

        <p style={styles.description}>
          Secure Patient Case Management System
        </p>

        <div style={styles.form}>
          <label>
            Username
          </label>

          <input
    type="text"
    placeholder="Enter username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    style={styles.input}
/>

          <label>
            Password
          </label>

<input
    type="password"
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={styles.input}
/>

          <button
            style={styles.primaryButton}
           onClick={handleLogin}
          >
            Login to dashboard→
          </button>
        </div>
<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "22px",
  }}
>
  <div
    style={{
      padding: "10px 18px",
      borderRadius: "30px",
      background: "rgba(255,255,255,0.75)",
      border: "1px solid rgba(7,59,92,0.08)",
      boxShadow: "0 6px 18px rgba(7,59,92,0.08)",
      fontSize: "14px",
      fontWeight: "600",
      color: "#275b70",
    }}
  >
    🔒 Secure
  </div>

  <div
    style={{
      padding: "10px 18px",
      borderRadius: "30px",
      background: "rgba(255,255,255,0.75)",
      border: "1px solid rgba(7,59,92,0.08)",
      boxShadow: "0 6px 18px rgba(7,59,92,0.08)",
      fontSize: "14px",
      fontWeight: "600",
      color: "#275b70",
    }}
  >
    🌿 AYUSH Ready
  </div>

  <div
    style={{
      padding: "10px 18px",
      borderRadius: "30px",
      background: "rgba(255,255,255,0.75)",
      border: "1px solid rgba(7,59,92,0.08)",
      boxShadow: "0 6px 18px rgba(7,59,92,0.08)",
      fontSize: "14px",
      fontWeight: "600",
      color: "#275b70",
    }}
  >
    🩺 Patient Centric
  </div>
</div>
        <p style={styles.formSubtitle}>
          🔒 Your patient information is handled securely
        </p>
      </main>
    </div>
  );
}
if (screen === "role") {
  return (
    <div style={styles.page}>
      <Header setScreen={setScreen} screen={screen} />

      <main style={styles.hero}>
        <div style={styles.card}>
          <h1 style={styles.title}>
            Who are you?
          </h1>

          <div
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(7,59,92,0.08)",
    boxShadow: "0 6px 18px rgba(7,59,92,0.06)",
    marginBottom: "28px",
  }}
>
  <span>✨</span>
  <span
    style={{
      fontSize: "15px",
      fontWeight: "600",
      color: "#35677c",
    }}
  >
    Please select your role to continue
  </span>
</div>

          <div style={styles.roleContainer}>

            <button
              style={{
  ...styles.roleButton,
  borderLeft: "6px solid #087f73",
}}
              onClick={() => {
  const userRole = localStorage.getItem("userRole");

  if (userRole === "doctor") {
    localStorage.setItem("selectedRole", "doctor");
    setScreen("doctor");
  } else {
    alert("This account is not registered as a Doctor.");
  }
}}
            >
  <div style={styles.roleIcon}>
  🩺
</div>

  <div style={{ textAlign: "left", flex: 1 }}>
    <div style={{ fontSize: "22px", fontWeight: "700" }}>
      I am a Doctor
    </div>

    <div style={{ fontSize: "14px", marginTop: "6px", opacity: 0.75 }}>
      Access patient cases, red flags and clinical information
    </div>
  </div>

  <span style={{ fontSize: "24px" }}>→</span>
</button>

            <button
              style={{
  ...styles.roleButton,
  borderLeft: "6px solid #19a98b",
}}
              onClick={() => {
  const userRole = localStorage.getItem("userRole");

  if (userRole === "patient") {
    localStorage.setItem("selectedRole", "patient");
    setScreen("patient");
  } else {
    alert("This account is not registered as a Patient.");
  }
}}
            >
  <div style={styles.roleIcon}>
  👤
</div>

  <div style={{ textAlign: "left", flex: 1 }}>
    <div style={{ fontSize: "22px", fontWeight: "700" }}>
      I am a Patient
    </div>

    <div style={{ fontSize: "14px", marginTop: "6px", opacity: 0.75 }}>
      Create your health case, AYUSH assessment and appointments
    </div>
  </div>

  <span style={{ fontSize: "24px" }}>→</span>
</button>

          </div>
        </div>
      </main>
    </div>
  );
}
// PATIENT DASHBOARD
if (screen === "patient") {
  return (
    <div style={styles.page}>
      <Header setScreen={setScreen} screen={screen} />

      <main style={styles.hero}>
        <div style={styles.card}>

          <h1 style={styles.title}>
            👤 Patient Dashboard
          </h1>

          <div
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 18px",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(7,59,92,0.08)",
    boxShadow: "0 6px 18px rgba(7,59,92,0.06)",
    margin: "10px auto 20px",
  }}
>
  <span style={{ fontSize: "20px" }}>🌿</span>

  <span
    style={{
      fontSize: "15px",
      fontWeight: "600",
      color: "#35677c",
    }}
  >
    Welcome! Manage your health information and start your case.
  </span>
</div>

          <div style={styles.patientActions}>

            <button
              style={{
  ...styles.patientActionButton,
  gridColumn: "1 / -1",
  minHeight: "125px",
  background: "linear-gradient(135deg, #e8f8f4, #ffffff)",
  border: "1px solid #ed0a0a",
  boxShadow: "0 12px 28px rgba(7, 127, 115, 0.14)",
}}
              onClick={() => setScreen("registration")}
            >
              📝
              <div>
                <strong>Start Patient Case</strong>
                <p>Enter your symptoms and health information.</p>
              </div>
            </button>

            <button
             style={{
  ...styles.patientActionButton,
  borderLeft: "6px solid #5b8def",
}}
            >
              📄
              <div>
                <strong>My Medical Reports</strong>
                <p>View your uploaded medical reports.</p>
              </div>
            </button>

            <button
              style={{
  ...styles.patientActionButton,
  borderLeft: "6px solid #8b6fd6",
}}
            >
              📋
              <div>
                <strong>My Case History</strong>
                <p>View your previous patient cases.</p>
              </div>
            </button>
<button
  style={{
  ...styles.patientActionButton,
  borderLeft: "6px solid #19a98b",
}}
  onClick={() => setScreen("appointments")}
>
  📅
  <div>
    <strong>Book an Appointment</strong>
    <p>Choose a hospital, doctor and available time slot.</p>
  </div>
</button>
<button
  style={{
  ...styles.patientActionButton,
  borderLeft: "6px solid #f2a93b",
}}
  onClick={() => setScreen("myAppointments")}
>
  📋
  <div>
    <strong>My Appointments</strong>
    <p>View your booked appointments and appointment details.</p>
  </div>
</button>
          </div>

          <button
            style={styles.logoutButton}
            onClick={() => {
              localStorage.removeItem("loggedIn");
              localStorage.removeItem("userId");
              localStorage.removeItem("selectedRole");
              setScreen("login");
            }}
          >
            Logout
          </button>

        </div>
      </main>
    </div>
  );
}
// APPOINTMENTS SCREEN
if (screen === "appointments") {
  const currentHospital = hospitals.find(
    (hospital) => hospital.name === selectedHospital
  );

  const currentDoctor = currentHospital?.doctors.find(
    (doctor) => doctor.name === selectedDoctor
  );

  const selectedDay = selectedDate
    ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
      })
    : "";

  const availableTimes =
    currentDoctor && selectedDay && currentDoctor.days.includes(selectedDay)
      ? currentDoctor.times
      : [];

  return (
    <div style={styles.page}>
      <Header setScreen={setScreen} screen={screen} />

      <main style={styles.hero}>
        <div style={styles.card}>

          <h1 style={styles.title}>
            📅 Book an Appointment
          </h1>

          <p style={styles.description}>
            Choose a hospital, doctor and available appointment time.
          </p>

          <div style={styles.appointmentCard}>

            <h2>🏥 Select Hospital</h2>

            <select
  style={styles.appointmentSelect}
  value={selectedHospital}
  onChange={(e) => {
    setSelectedHospital(e.target.value);
    setSelectedDoctor("");
  }}
>
  <option value="">Select Hospital</option>
  <option value="City Care Hospital">City Care Hospital</option>
  <option value="Ayush Wellness Hospital">Ayush Wellness Hospital</option>
  <option value="MedLife Hospital">MedLife Hospital</option>
</select>

            <h2>👨‍⚕️ Select Doctor</h2>

            <select
  style={styles.appointmentSelect}
  value={selectedDoctor}
  onChange={(e) => setSelectedDoctor(e.target.value)}
  disabled={!selectedHospital}
>
  <option value="">Select Doctor</option>

  {selectedHospital &&
    hospitals
      .find((hospital) => hospital.name === selectedHospital)
      ?.doctors.map((doctor) => (
        <option key={doctor.name} value={doctor.name}>
          {doctor.name} - {doctor.specialization}
        </option>
      ))}
</select>

            <h2>📅 Select Date</h2>

            <input
  type="date"
  style={styles.appointmentSelect}
  value={selectedDate}
  onChange={(e) => {
  setSelectedDate(e.target.value);
  setSelectedTime("");
}}
/>

            <h2>🕐 Available Time</h2>

            <select
  style={styles.appointmentSelect}
  value={selectedTime}
  onChange={(e) => setSelectedTime(e.target.value)}
>
  <option value="">Select Time Slot</option>

  {availableTimes.map((time) => (
    <option key={time} value={time}>
      {time}
    </option>
  ))}
</select>
{selectedDate && selectedDoctor && availableTimes.length === 0 && (
  <p style={{ color: "#c62828", fontWeight: "600" }}>
    ❌ {selectedDoctor} is not available on {selectedDay}.
  </p>
)}

            <button
              style={styles.button}
              onClick={() => {
  if (!selectedHospital || !selectedDoctor || !selectedDate || !selectedTime) {
    alert("Please select hospital, doctor, date and time.");
    return;
  }

  const newAppointmentId = generateAppointmentId();

  const newAppointment = {
    appointmentId: newAppointmentId,
    patientId: localStorage.getItem("userId"),
    hospital: selectedHospital,
    doctor: selectedDoctor,
    date: selectedDate,
    time: selectedTime,
  };

  const existingAppointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

  existingAppointments.push(newAppointment);

  localStorage.setItem(
    "appointments",
    JSON.stringify(existingAppointments)
  );

  setAppointmentId(newAppointmentId);
}}
            >
              Confirm Appointment →
            </button>
            {appointmentId && (
  <div style={styles.summaryCard}>
    <h2>✅ Appointment Confirmed</h2>

    <p>
      <strong>Appointment ID:</strong> {appointmentId}
    </p>

    <p>
      <strong>Hospital:</strong> {selectedHospital}
    </p>

    <p>
      <strong>Doctor:</strong> {selectedDoctor}
    </p>

    <p>
      <strong>Date:</strong> {selectedDate}
    </p>

    <p>
      <strong>Time:</strong> {selectedTime}
    </p>
  </div>
)}

          </div>

          <button
            style={styles.logoutButton}
            onClick={() => setScreen("patient")}
          >
            ← Back to Patient Dashboard
          </button>

        </div>
      </main>
    </div>
  );
}
// DOCTOR COMPLETE CASE
if (screen === "doctorCase" && selectedCase) {
  return (
    <div style={styles.page}>
      <Header setScreen={setScreen} screen={screen} />

      <main style={styles.hero}>
        <div style={styles.card}>

          <h1 style={styles.title}>
            🩺 Complete Patient Case
          </h1>

          <p style={styles.description}>
            Detailed patient information for healthcare professional review.
          </p>

          <div style={styles.summaryCard}>

            <h2>
              Case ID: {selectedCase.caseId}
            </h2>

            <hr />

            <h2>Patient Information</h2>

            <p>
              <strong>Name:</strong>{" "}
              {selectedCase.patient?.name || "Not provided"}
            </p>

            <p>
              <strong>Age:</strong>{" "}
              {selectedCase.patient?.age || "Not provided"}
            </p>

            <p>
              <strong>Gender:</strong>{" "}
              {selectedCase.patient?.gender || "Not provided"}
            </p>

            <hr />

            <h2>Chief Complaint</h2>

            <p>
              {selectedCase.caseData?.complaint || "Not provided"}
            </p>

            <h2
  style={{
    color: "#073b5c",
    fontSize: "26px",
    textAlign: "center",
    marginBottom: "15px",
  }}
>
  Duration
</h2>

            <p
  style={{
    fontSize: "18px",
    fontWeight: "600",
    color: "#260649",
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  {selectedCase.caseData?.duration || "Not provided"}
</p>

            <h2
  style={{
    color: "#073b5c",
    fontSize: "26px",
    textAlign: "center",
    marginBottom: "15px",
  }}
>
  Severity
</h2>
            <p
  style={{
    fontSize: "18px",
    fontWeight: "600",
    color: "#e08a2e",
    textAlign: "center",
    marginBottom: "25px",
  }}
>
  {selectedCase.caseData?.severity || "Not provided"}
</p>

            <h2>Other Symptoms</h2>

            <p>
              {selectedCase.caseData?.symptoms || "None reported"}
            </p>

            <h2>Medical History</h2>

            <p>
              {selectedCase.caseData?.medicalHistory || "None reported"}
            </p>

            <h2>Current Medicines</h2>

            <p>
              {selectedCase.caseData?.medicines || "None reported"}
            </p>

            <h2>Allergies</h2>

            <p>
              {selectedCase.caseData?.allergies || "None reported"}
            </p>
<h2>🌿 AYUSH Assessment — Dashavidha Pariksha</h2>

<h3>1. Prakriti</h3>
<p>
  {selectedCase.ayushData?.prakriti || "Not assessed"}
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Your natural body constitution
</p>

<h3>2. Vikriti</h3>
<p>
  {selectedCase.ayushData?.vikriti || "Not assessed"}
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Your current health condition or imbalance
</p>

<h3>3. Sara</h3>
<p>
  {selectedCase.ayushData?.sara || "Not assessed"}
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Quality and strength of body tissues
</p>

<h3>4. Samhanana</h3>
<p>
  {selectedCase.ayushData?.samhanana || "Not assessed"}
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Body build and compactness
</p>

<h3>5. Pramana</h3>
<p>
  Height: {selectedCase.ayushData?.height || "Not provided"} cm
</p>
<p>
  Weight: {selectedCase.ayushData?.weight || "Not provided"} kg
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Body measurements and proportions
</p>

<h3>6. Satmya</h3>
<p>
  {selectedCase.ayushData?.satmya || "Not assessed"}
</p>
<p>
  {selectedCase.ayushData?.satmyaNotes || "No additional notes"}
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  What food, lifestyle and environment suit you
</p>

<h3>7. Satva</h3>
<p>
  {selectedCase.ayushData?.satva || "Not assessed"}
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Mental strength and stability
</p>

<h3>8. Ahara Shakti</h3>
<p>
  {selectedCase.ayushData?.aharaShakti || "Not assessed"}
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Appetite and ability to handle food
</p>

<h3>9. Vaya</h3>
<p>
  {selectedCase.ayushData?.vaya || "Not assessed"}
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Age and stage of life
</p>

<h3>10. Bala</h3>
<p>
  {selectedCase.ayushData?.bala || "Not assessed"}
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Physical strength
</p>
          </div>

          <button
            style={styles.logoutButton}
            onClick={() => setScreen("doctor")}
          >
            ← Back to Doctor Dashboard
          </button>

        </div>
      </main>
    </div>
  );
}
// MY APPOINTMENTS SCREEN
if (screen === "myAppointments") {
  const savedAppointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

  const myAppointments = savedAppointments.filter(
    (appointment) =>
      appointment.patientId === localStorage.getItem("userId")
  );

  return (
    <div style={styles.page}>
      <Header setScreen={setScreen} screen={screen} />

      <main style={styles.hero}>
        <div style={styles.card}>
          <h1 style={styles.title}>📋 My Appointments</h1>

          <p style={styles.description}>
            View your booked appointments and appointment details.
          </p>

          {myAppointments.length === 0 ? (
            <div style={styles.summaryCard}>
              <h2>No Appointments</h2>
              <p>You have not booked any appointments yet.</p>
            </div>
          ) : (
            myAppointments.map((appointment) => (
              <div
                key={appointment.appointmentId}
                style={styles.summaryCard}
              >
                <h2>🆔 {appointment.appointmentId}</h2>

                <p>
                  <strong>Hospital:</strong> {appointment.hospital}
                </p>

                <p>
                  <strong>Doctor:</strong> {appointment.doctor}
                </p>

                <p>
                  <strong>Date:</strong> {appointment.date}
                </p>

                <p>
                  <strong>Time:</strong> {appointment.time}
                </p>
              </div>
            ))
          )}

          <button
            style={styles.logoutButton}
            onClick={() => setScreen("patient")}
          >
            ← Back to Patient Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

// DOCTOR DASHBOARD
if (screen === "doctor") {
  const savedCases =
  JSON.parse(localStorage.getItem("patientCases")) || [];
  const normalCases = savedCases.filter(
  (item) => !item.redFlagDetected
);

const redFlagCases = savedCases.filter(
  (item) => item.redFlagDetected
);
  return (
    <div style={styles.page}>
      <Header setScreen={setScreen} screen={screen} />

      <main style={styles.hero}>
        <div style={styles.card}>

          <h1 style={styles.title}>
            👨‍⚕️ Doctor Dashboard
          </h1>

          <div
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 18px",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(7,59,92,0.08)",
    boxShadow: "0 6px 18px rgba(7,59,92,0.06)",
    marginTop: "8px",
  }}
>
  <span>🩺</span>
  <span style={{ fontSize: "15px", fontWeight: "600", color: "#35677c" }}>
    Welcome, Doctor
  </span>
</div>
          

          <div style={styles.doctorGrid}>

            <div
  style={{
  ...styles.dashboardCard,
  borderLeft: "6px solid #19a98b",
}}
 onClick={() => setScreen("doctorCases")}
>
              <div style={styles.dashboardIcon}>📋</div>
              <h2 style={{ color: "#073b5c", fontSize: "28px", marginBottom: "12px" }}>
  Patient Cases
</h2>
              <p>View and manage patient case information.</p>
            </div>

            <div
  style={{
  ...styles.dashboardCard,
  borderLeft: "6px solid #e74c3c",
}}
  onClick={() => setScreen("doctorRedFlags")}
>
              <div style={styles.dashboardIcon}>🚨</div>
              <h2 style={{ color: "#073b5c", fontSize: "28px", marginBottom: "12px" }}>
  Red Flag Cases
</h2>
              <p>Review patients requiring special attention.</p>
            </div>

            <div style={{
  ...styles.dashboardCard,
  borderLeft: "6px solid #8b6fd6",
}}>
              <div style={styles.dashboardIcon}>🤖</div>
              <h2 style={{ color: "#073b5c", fontSize: "28px", marginBottom: "12px" }}>
  AI Case Summaries
</h2>
              <p>Review structured AI-assisted case drafts.</p>
            </div>

            <div style={{
  ...styles.dashboardCard,
  borderLeft: "6px solid #5b8def",
}}>
              <div style={styles.dashboardIcon}>📄</div>
              <h2 style={{ color: "#073b5c", fontSize: "28px", marginBottom: "12px" }}>
  Medical Reports
</h2>
              <p>Access uploaded patient reports.</p>
            </div>

          </div>

          <button
            style={styles.logoutButton}
            onClick={() => {
              localStorage.removeItem("loggedIn");
              localStorage.removeItem("userId");
              localStorage.removeItem("userRole");
              localStorage.removeItem("selectedRole");
              setScreen("login");
            }}
          >
            Logout
          </button>

        </div>
      </main>
    </div>
  );
}
if (screen === "doctorCases") {
  const savedCases =
    JSON.parse(localStorage.getItem("patientCases")) || [];

  const normalCases = savedCases.filter(
    (item) => !item.redFlagDetected
  );

  return (
    <div style={styles.page}>
      <Header setScreen={setScreen} screen={screen} />

      <main style={styles.hero}>
        <div style={styles.card}>
          <h1 style={styles.title}>📋 Patient Cases</h1>

          <p style={styles.description}>
            Normal patient cases for healthcare professional review.
          </p>

          {normalCases.length === 0 ? (
            <div style={styles.summaryCard}>
              <h2>No Patient Cases</h2>
              <p>No normal patient cases are available yet.</p>
            </div>
          ) : (
            normalCases.map((item) => (
              <div
                key={item.caseId}
                style={styles.summaryCard}
              >
                <h2
  style={{
    color: "#073b5c",
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center",
  }}
>
  {item.caseId}
</h2>

                <p>
  <strong style={{ color: "#087f73" }}>Patient:</strong>{" "}
  <span style={{ fontWeight: "600" }}>
    {item.patient?.name || "Not provided"}
  </span>
</p>

                <p>
                  <strong style={{ color: "#073b5c" }}>Age:</strong>{" "}
<span style={{ fontWeight: "600" }}>
  {item.patient?.age || "Not provided"}
</span>
                </p>

                <p>
  <strong style={{ color: "#073b5c" }}>Gender:</strong>{" "}
  <span style={{ fontWeight: "600" }}>
    {item.patient?.gender || "Not provided"}
  </span>
</p>
                <p>
  <strong style={{ color: "#073b5c" }}>Complaint:</strong>{" "}
  <span style={{ fontWeight: "600", color: "#087f73" }}>
    {item.caseData?.complaint || "Not provided"}
  </span>
</p>

                <p style={{ color: "#718391", fontSize: "14px" }}>
  <strong style={{ color: "#607585" }}>Created:</strong>{" "}
  {item.createdAt}
</p>

                <button
                  style={styles.viewCaseButton}
                  onClick={() => {
                    setSelectedCase(item);
                    setScreen("doctorCase");
                  }}
                >
                  🔍 View Complete Case →
                </button>
              </div>
            ))
          )}

          <button
            style={styles.logoutButton}
            onClick={() => setScreen("doctor")}
          >
            ← Back to Doctor Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}
if (screen === "doctorRedFlags") {
  const savedCases =
    JSON.parse(localStorage.getItem("patientCases")) || [];

  const redFlagCases = savedCases.filter(
    (item) => item.redFlagDetected
  );

  return (
    <div style={styles.page}>
      <Header setScreen={setScreen} screen={screen} />

      <main style={styles.hero}>
        <div style={styles.card}>
          <h1 style={styles.title}>🚨 Red Flag Cases</h1>

          <p style={styles.description}>
            Patients requiring special attention.
          </p>

          {redFlagCases.length === 0 ? (
            <div style={styles.summaryCard}>
              <h2>No Red Flag Cases</h2>
              <p>No red flag cases are available yet.</p>
            </div>
          ) : (
            redFlagCases.map((item) => (
              <div
                key={item.caseId}
                style={{
  ...styles.summaryCard,
  borderLeft: "6px solid #e74c3c",
}}
              >
                <h2
  style={{
    color: "#c0392b",
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center",
  }}
>
  ⚠️ {item.caseId}
</h2>

                <p>
  <strong style={{ color: "#e74c3c" }}>Patient:</strong>{" "}
  <span style={{ fontWeight: "600" }}>
    {item.patient?.name || "Not provided"}
  </span>
</p>

                <p>
  <strong style={{ color: "#073b5c" }}>Age:</strong>{" "}
  <span style={{ fontWeight: "600" }}>
    {item.patient?.age || "Not provided"}
  </span>
</p>

                <p>
  <strong style={{ color: "#073b5c" }}>Gender:</strong>{" "}
  <span style={{ fontWeight: "600" }}>
    {item.patient?.gender || "Not provided"}
  </span>
</p>

                <p>
  <strong style={{ color: "#e74c3c" }}>🚨 Red Flag:</strong>{" "}
  <span style={{ fontWeight: "700", color: "#c0392b" }}>
    {item.redFlagSymptom || "Warning symptom detected"}
  </span>
</p>
                <p>
  <strong style={{ color: "#073b5c" }}>Complaint:</strong>{" "}
  <span style={{ fontWeight: "600", color: "#087f73" }}>
    {item.caseData?.complaint || "Not provided"}
  </span>
</p>

                <p>
                  <strong>Created:</strong>{" "}
                  {item.createdAt}
                </p>

                <button
                  style={styles.viewCaseButton}
                  onClick={() => {
                    setSelectedCase(item);
                    setScreen("doctorCase");
                  }}
                >
                  🔍 View Complete Case →
                </button>
              </div>
            ))
          )}

          <button
            style={styles.logoutButton}
            onClick={() => setScreen("doctor")}
          >
            ← Back to Doctor Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}
  if (screen === "welcome") {
    return (
      <div style={styles.page}>

        <Header setScreen={setScreen} screen={screen} />

        <main style={styles.hero}>

          <div style={styles.icon}>
            🏥
          </div>

          <h1 style={styles.title}>
            Patient Case-Taking
            <br />
            Software
          </h1>

          <p style={styles.description}>
            A smart digital system that helps collect,
            organize and summarize patient information
            for healthcare professionals.
          </p>

          <button
            style={styles.button}
            onClick={() => setScreen("registration")}
          >
            Start Case Taking →
          </button>

          <p style={styles.security}>
            🔒 Your information is handled securely
          </p>

        </main>

      </div>
    );
  }

  /* =========================
     PATIENT REGISTRATION
  ========================= */

  if (screen === "registration") {
    return (
      <div style={styles.page}>

        <Header setScreen={setScreen} screen={screen} />

        <main style={styles.formContainer}>

          <h1
  style={{
    ...styles.heading,
    fontSize: "42px",
    fontWeight: "800",
    letterSpacing: "-1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "18px",
    textAlign: "center",
  }}
>
  <span>🧑‍⚕️</span>
  <span>Patient Registration</span>
</h1>

          <p
  style={{
    ...styles.formSubtitle,
    fontSize: "18px",
    textAlign: "center",
    marginBottom: "30px",
  }}
>
  Let's begin by collecting some basic information.
</p>
<div
  style={{
    width: "70px",
    height: "4px",
    background: "linear-gradient(90deg, #087f73, #19a98b)",
    borderRadius: "10px",
    margin: "0 auto 25px",
  }}
/>
          <div style={styles.form}>

            <label
  style={{
    fontWeight: "600",
    color: "#073b5c",
    fontSize: "16px",
  }}
>
  Patient Name
</label>

            <input
  style={styles.input}
  name="name"
  type="text"
              placeholder="Enter patient name"
              value={patient.name}
              onChange={handlePatientChange}
            />

            <label
  style={{
    fontWeight: "600",
    color: "#073b5c",
    fontSize: "16px",
  }}
>
  Age
</label>

            <input
  style={styles.input}
              name="age"
              type="number"
              placeholder="Enter age"
              value={patient.age}
              onChange={handlePatientChange}
            />

            <label
  style={{
    fontWeight: "600",
    color: "#073b5c",
    fontSize: "16px",
  }}
>
  Gender
</label>

            <select
  style={styles.input}
  name="gender"
              value={patient.gender}
              onChange={handlePatientChange}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label
  style={{
    fontWeight: "600",
    color: "#073b5c",
    fontSize: "16px",
  }}
>
  Preferred Language
</label>

            <select
  style={styles.input}
  name="language"
              value={patient.language}
              onChange={handlePatientChange}
            >
              <option value="">Select language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>

            <button
              style={styles.primaryButton}
              onClick={() => setScreen("case")}
            >
              Continue →
            </button>

          </div>

        </main>

      </div>
    );
  }

  /* =========================
     CASE TAKING SCREEN
  ========================= */

  if (screen === "case") {
    return (
      <div style={styles.page}>

        <Header setScreen={setScreen} screen={screen} />

        <main style={styles.caseContainer}>

          <div style={styles.patientBanner}>
            <div>
              <h2 style={{ margin: 0 }}>
                👤 {patient.name || "Patient"}
              </h2>

              <p style={{ margin: "5px 0 0" }}>
                Age: {patient.age || "--"} &nbsp; | &nbsp;
                Gender: {patient.gender || "--"} &nbsp; | &nbsp;
                Language: {patient.language || "--"}
              </p>
            </div>

            <div style={styles.progress}>
              Step 2 of 3
            </div>
          </div>

          <h1 style={styles.heading}>
            Patient Case Taking
          </h1>

          <p style={styles.formSubtitle}>
            Please provide information about the patient's current condition.
          </p>

          <div style={styles.form}>

<label>
  1. What is the main problem?
</label>

<div style={styles.voiceBox}>

  <textarea
    name="complaint"
    placeholder="Type your problem or use the microphone..."
    value={caseData.complaint}
    onChange={handleCaseChange}
  />

  <button
    type="button"
    style={{
      ...styles.voiceButton,
      background: listening ? "#e74c3c" : "#09ff00",
    }}
    onClick={startVoiceInput}
  >
    {listening ? "🔴 Listening..." : "🎙️ Speak"}
  </button>

</div>
{redFlagDetected && (
  <div
    style={{
      marginTop: "15px",
      padding: "15px",
      background: "#fff3f3",
      border: "2px solid #d32f2f",
      borderRadius: "10px",
      color: "#b71c1c",
      fontWeight: "600",
    }}
  >
    ⚠️ Urgent Attention Required

<p style={{ margin: "8px 0 0", fontWeight: "normal" }}>
  Possible warning symptom detected:{" "}
  <strong>{redFlagSymptom}</strong>
</p>

<p style={{ margin: "8px 0 0", fontWeight: "normal" }}>
  The reported symptoms may require immediate medical evaluation.
  Please consult a healthcare professional or seek emergency care.
</p>
  </div>
)}

            <label>
              2. How long have you had this problem?
            </label>

            <input
              name="duration"
              type="text"
              placeholder="Example: 3 days"
              value={caseData.duration}
              onChange={handleCaseChange}
            />

            <label>
              3. How severe is the problem?
            </label>

            <select
              name="severity"
              value={caseData.severity}
              onChange={handleCaseChange}
            >
              <option value="">Select severity</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>

            <label>
              4. Other symptoms
            </label>

            <textarea
              name="symptoms"
              placeholder="Example: Headache, cough, weakness..."
              value={caseData.symptoms}
              onChange={handleCaseChange}
            />

            <label>
              5. Previous medical history
            </label>

            <textarea
              name="medicalHistory"
              placeholder="Any previous illness, surgery or condition?"
              value={caseData.medicalHistory}
              onChange={handleCaseChange}
            />

            <label>
              6. Current medicines
            </label>

            <textarea
              name="medicines"
              placeholder="Enter current medicines, if any"
              value={caseData.medicines}
              onChange={handleCaseChange}
            />

            <label>
              7. Known allergies
            </label>

            <textarea
              name="allergies"
              placeholder="Enter allergies, if any"
              value={caseData.allergies}
              onChange={handleCaseChange}
            />
    

    <div style={styles.inputGroup}>
      <label style={styles.label}>
        1. Prakriti{" "}
        <span style={{ fontWeight: "normal" }}>
          (Your natural body constitution)
        </span>
      </label>

      <select
        name="prakriti"
        value={ayushData.prakriti}
        onChange={(e) =>
          setAyushData({
            ...ayushData,
            prakriti: e.target.value,
          })
        }
        style={styles.input}
      >
        <option value="">Select Prakriti</option>
        <option value="Vata">Vata</option>
        <option value="Pitta">Pitta</option>
        <option value="Kapha">Kapha</option>
        <option value="Vata-Pitta">Vata-Pitta</option>
        <option value="Pitta-Kapha">Pitta-Kapha</option>
        <option value="Vata-Kapha">Vata-Kapha</option>
        <option value="Tridosha">Tridosha</option>
        <option value="Not assessed">Not assessed</option>
      </select>
    </div>
<div style={styles.inputGroup}>
  <label style={styles.label}>
    2. Vikriti{" "}
    <span style={{ fontWeight: "normal" }}>
      (Your current health condition or imbalance)
    </span>
  </label>

  <textarea
    name="vikriti"
    placeholder="Describe your current health condition or imbalance"
    value={ayushData.vikriti}
    onChange={(e) =>
      setAyushData({
        ...ayushData,
        vikriti: e.target.value,
      })
    }
    style={styles.input}
  />
</div>

<div style={styles.inputGroup}>
  <label style={styles.label}>
    3. Sara{" "}
    <span style={{ fontWeight: "normal" }}>
      (Quality and strength of body tissues)
    </span>
  </label>

  <select
    value={ayushData.sara}
    onChange={(e) =>
      setAyushData({
        ...ayushData,
        sara: e.target.value,
      })
    }
    style={styles.input}
  >
    <option value="">Select</option>
    <option value="Good">Good</option>
    <option value="Moderate">Moderate</option>
    <option value="Needs assessment">Needs assessment</option>
  </select>
</div>

<div style={styles.inputGroup}>
  <label style={styles.label}>
    4. Samhanana{" "}
    <span style={{ fontWeight: "normal" }}>
      (Body build and compactness)
    </span>
  </label>

  <select
    value={ayushData.samhanana}
    onChange={(e) =>
      setAyushData({
        ...ayushData,
        samhanana: e.target.value,
      })
    }
    style={styles.input}
  >
    <option value="">Select</option>
    <option value="Well-built">Well-built</option>
    <option value="Moderately built">Moderately built</option>
    <option value="Needs assessment">Needs assessment</option>
  </select>
</div>

<div style={styles.inputGroup}>
  <label style={styles.label}>
    5. Pramana{" "}
    <span style={{ fontWeight: "normal" }}>
      (Body measurements and proportions)
    </span>
  </label>

  <input
    type="number"
    placeholder="Height (cm)"
    value={ayushData.height}
    onChange={(e) =>
      setAyushData({
        ...ayushData,
        height: e.target.value,
      })
    }
    style={styles.input}
  />

  <input
    type="number"
    placeholder="Weight (kg)"
    value={ayushData.weight}
    onChange={(e) =>
      setAyushData({
        ...ayushData,
        weight: e.target.value,
      })
    }
    style={{ ...styles.input, marginTop: "10px" }}
  />
</div>

<div style={styles.inputGroup}>
  <label style={styles.label}>
    6. Satmya{" "}
    <span style={{ fontWeight: "normal" }}>
      (What food, lifestyle and environment suit you)
    </span>
  </label>

  <select
    value={ayushData.satmya}
    onChange={(e) =>
      setAyushData({
        ...ayushData,
        satmya: e.target.value,
      })
    }
    style={styles.input}
  >
    <option value="">Select</option>
    <option value="Good">Good</option>
    <option value="Moderate">Moderate</option>
    <option value="Needs assessment">Needs assessment</option>
  </select>

  <textarea
    placeholder="Optional notes about food, lifestyle or environment"
    value={ayushData.satmyaNotes}
    onChange={(e) =>
      setAyushData({
        ...ayushData,
        satmyaNotes: e.target.value,
      })
    }
    style={{ ...styles.input, marginTop: "10px" }}
  />
</div>

<div style={styles.inputGroup}>
  <label style={styles.label}>
    7. Satva{" "}
    <span style={{ fontWeight: "normal" }}>
      (Mental strength and stability)
    </span>
  </label>

  <select
    value={ayushData.satva}
    onChange={(e) =>
      setAyushData({
        ...ayushData,
        satva: e.target.value,
      })
    }
    style={styles.input}
  >
    <option value="">Select</option>
    <option value="Strong">Strong</option>
    <option value="Moderate">Moderate</option>
    <option value="Needs assessment">Needs assessment</option>
  </select>
</div>

<div style={styles.inputGroup}>
  <label style={styles.label}>
    8. Ahara Shakti{" "}
    <span style={{ fontWeight: "normal" }}>
      (Appetite and ability to handle food)
    </span>
  </label>

  <select
    value={ayushData.aharaShakti}
    onChange={(e) =>
      setAyushData({
        ...ayushData,
        aharaShakti: e.target.value,
      })
    }
    style={styles.input}
  >
    <option value="">Select</option>
    <option value="Good">Good</option>
    <option value="Moderate">Moderate</option>
    <option value="Low">Low</option>
  </select>
</div>

<div style={styles.inputGroup}>
  <label style={styles.label}>
    9. Vaya{" "}
    <span style={{ fontWeight: "normal" }}>
      (Age and stage of life)
    </span>
  </label>

  <select
    value={ayushData.vaya}
    onChange={(e) =>
      setAyushData({
        ...ayushData,
        vaya: e.target.value,
      })
    }
    style={styles.input}
  >
    <option value="">Select</option>
    <option value="Child">Child</option>
    <option value="Young adult">Young adult</option>
    <option value="Middle-aged">Middle-aged</option>
    <option value="Older adult">Older adult</option>
    <option value="Not assessed">Not assessed</option>
  </select>
</div>

<div style={styles.inputGroup}>
  <label style={styles.label}>
    10. Bala{" "}
    <span style={{ fontWeight: "normal" }}>
      (Physical strength)
    </span>
  </label>

  <select
    value={ayushData.bala}
    onChange={(e) =>
      setAyushData({
        ...ayushData,
        bala: e.target.value,
      })
    }
    style={styles.input}
  >
    <option value="">Select</option>
    <option value="Strong">Strong</option>
    <option value="Moderate">Moderate</option>
    <option value="Weak">Weak</option>
    <option value="Needs assessment">Needs assessment</option>
  </select>
</div>
    <button
      
              style={styles.button}
             onClick={() => {
  const newCaseId = generateCaseId();

  const newCase = {
  caseId: newCaseId,
  patient: { ...patient },
  redFlagDetected: redFlagDetected,
  redFlagSymptom: redFlagSymptom,
  ayushData: { ...ayushData },
  caseData: {
    ...caseData,
    caseId: newCaseId,
  },
  createdAt: new Date().toLocaleString(),
};

  const existingCases =
    JSON.parse(localStorage.getItem("patientCases")) || [];

  localStorage.setItem(
    "patientCases",
    JSON.stringify([...existingCases, newCase])
  );

  setCaseData((previous) => ({
    ...previous,
    caseId: newCaseId,
  }));

  setScreen("summary");
}}
            >
              Generate Case Summary →
            </button>

          </div>

        </main>

      </div>
    );
  }

  /* =========================
     SUMMARY SCREEN
  ========================= */

  return (
    <div style={styles.page}>

      <Header setScreen={setScreen} screen={screen} />

      <main style={styles.caseContainer}>

        <div style={styles.summaryHeader}>
          <div>
            <h1 style={styles.heading}>
              Case Summary
            </h1>

            <p style={styles.formSubtitle}>
              AI-ready structured patient information
            </p>
          </div>

          <div style={styles.aiBadge}>
            🤖 AI DRAFT
          </div>
        </div>

        <div style={styles.summaryCard}>

  <h2
  style={{
    color: "#073b5c",
    fontSize: "30px",
    textAlign: "center",
    marginBottom: "25px",
  }}
>
  Case ID: {caseData.caseId}
</h2>

  <h2
  style={{
    color: "#073b5c",
    fontSize: "28px",
    textAlign: "center",
    marginBottom: "25px",
  }}
>
  Patient Information
</h2>
          <p>
            <strong>Name:</strong> {patient.name || "Not provided"}
          </p>

          <p>
            <strong>Age:</strong> {patient.age || "Not provided"}
          </p>

          <p>
            <strong>Gender:</strong> {patient.gender || "Not provided"}
          </p>

          <hr />

          <h2
  style={{
    color: "#087f73",
    fontSize: "28px",
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  Chief Complaint
</h2>

          <p
  style={{
    fontSize: "20px",
    fontWeight: "600",
    color: "#d91b1b",
    textAlign: "center",
    marginBottom: "25px",
  }}
>
  {caseData.complaint || "Not provided"}
</p>

          <h2>Duration</h2>

          <p>
            {caseData.duration || "Not provided"}
          </p>

          <h2>Severity</h2>

          <p>
            {caseData.severity || "Not provided"}
          </p>

          <h2>Other Symptoms</h2>

          <p>
            {caseData.symptoms || "None reported"}
          </p>

          <h2>Medical History</h2>

          <p>
            {caseData.medicalHistory || "None reported"}
          </p>

          <h2>Current Medicines</h2>

          <p>
            {caseData.medicines || "None reported"}
          </p>

          <h2>Allergies</h2>

          <p>
            {caseData.allergies || "None reported"}
          </p>
<h2>🌿 AYUSH Assessment — Dashavidha Pariksha</h2>

<h3>1. Prakriti</h3>
<p>{ayushData.prakriti || "Not assessed"}</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Your natural body constitution
</p>

<h3>2. Vikriti</h3>
<p>{ayushData.vikriti || "Not assessed"}</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Your current health condition or imbalance
</p>

<h3>3. Sara</h3>
<p>{ayushData.sara || "Not assessed"}</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Quality and strength of body tissues
</p>

<h3>4. Samhanana</h3>
<p>{ayushData.samhanana || "Not assessed"}</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Body build and compactness
</p>

<h3>5. Pramana</h3>
<p>
  Height: {ayushData.height || "Not provided"} cm
</p>
<p>
  Weight: {ayushData.weight || "Not provided"} kg
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Body measurements and proportions
</p>

<h3>6. Satmya</h3>
<p>{ayushData.satmya || "Not assessed"}</p>
<p>
  {ayushData.satmyaNotes || "No additional notes"}
</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  What food, lifestyle and environment suit you
</p>

<h3>7. Satva</h3>
<p>{ayushData.satva || "Not assessed"}</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Mental strength and stability
</p>

<h3>8. Ahara Shakti</h3>
<p>{ayushData.aharaShakti || "Not assessed"}</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Appetite and ability to handle food
</p>

<h3>9. Vaya</h3>
<p>{ayushData.vaya || "Not assessed"}</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Age and stage of life
</p>

<h3>10. Bala</h3>
<p>{ayushData.bala || "Not assessed"}</p>
<p style={{ fontSize: "14px", color: "#666" }}>
  Physical strength
</p>

<p>
  {ayushData.prakriti || "Not assessed"}
</p>

<p style={{ fontSize: "14px", color: "#666" }}>
  Your natural body constitution
</p>
          </div>

{/* AI CASE DRAFT */}
<div style={styles.aiDraft}>

  <div style={styles.aiDraftTitle}>
    🤖 AI Case Draft
  </div>

  <p>
    {patient.age}-year-old {patient.gender.toLowerCase()} patient
    presents with{" "}
    <strong>{caseData.complaint || "an unspecified complaint"}</strong>{" "}
    for{" "}
    <strong>{caseData.duration || "an unspecified duration"}</strong>.
    The reported severity is{" "}
    <strong>{caseData.severity || "not specified"}</strong>.
    Associated symptoms include{" "}
    <strong>{caseData.symptoms || "none reported"}</strong>.
  </p>

  <p>
    Previous medical history:{" "}
    <strong>{caseData.medicalHistory || "None reported"}</strong>.
    Current medicines:{" "}
    <strong>{caseData.medicines || "None reported"}</strong>.
    Known allergies:{" "}
    <strong>{caseData.allergies || "None reported"}</strong>.
  </p>

  <div style={styles.aiNote}>
    ⚠️ AI-generated draft — for healthcare professional review.
  </div>

</div>

<div style={styles.warning}>
          ⚠️ This is a draft summary for healthcare professional
          review. It is not an autonomous diagnosis.
        </div>

        <button
          style={styles.secondaryButton}
          onClick={() => setScreen("registration")}
        >
          ← Edit Patient Information
        </button>

      </main>

    </div>
  );
}



/* =========================
   HEADER
========================= */

function Header({ setScreen, screen }) {

  const goBack = () => {
    if (screen === "role") {
      setScreen("login");
    } else if (screen === "patient") {
      setScreen("role");
      } else if (screen === "welcome") {
  setScreen("patient");
      } else if (screen === "registration") {
  setScreen("patient");
 } else if (screen === "case") {
  setScreen("patient");
  } else if (screen === "summary") {
  setScreen("appointments");
} else if (screen === "case") {
  setScreen("patient");
} else if (screen === "summary") {
  setScreen("case");

    } else if (screen === "appointments") {
      setScreen("patient");
    } else if (screen === "myAppointments") {
  setScreen("patient");
    } else if (screen === "doctor") {
      setScreen("role");
    } else if (screen === "doctorCase") {
      setScreen("doctor");
    }
  };

  const goNext = () => {
    if (screen === "role") {
      const role = localStorage.getItem("userRole");

      if (role === "patient") {
        setScreen("patient");
      } else if (role === "doctor") {
        setScreen("doctor");
      }
    } else if (screen === "patient") {
      setScreen("registration");
    } else if (screen === "appointments") {
      setScreen("myAppointments");
    } else if (screen === "myAppointments") {
      setScreen("patient");
    } else if (screen === "doctor") {
      setScreen("doctorCase");
    } else if (screen === "doctorCase") {
      setScreen("doctor");
    }
  };

  return (
    <>
    <header style={styles.header}>

      <div>
        <h2 style={styles.logo}>
          SMART MEDICAL HEALTHCARE
        </h2>

        <p style={styles.logoText}>
          Secure Patient Case Management System
        </p>
      </div>

      <div style={styles.headerRight}>
  <span style={styles.userId}>
    👤 {localStorage.getItem("userId")}
  </span>

  <button
    style={styles.headerLogout}
    onClick={() => {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("selectedRole");
      setScreen("login");
    }}
  >
    Logout
  </button>
</div>

    </header>
        <div style={styles.navigationBar}>
      <button
        style={styles.navigationButton}
        onClick={goBack}
      >
        ← Back
      </button>

      <button
        style={styles.navigationButton}
        onClick={goNext}
      >
        Next →
      </button>
    </div>
  </>
);
}


/* =========================
   STYLES
========================= */

const styles = {

  page: {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at 10% 10%, rgba(25, 169, 139, 0.12), transparent 30%), radial-gradient(circle at 90% 20%, rgba(7, 59, 92, 0.12), transparent 30%), linear-gradient(135deg, #f4fbfa 0%, #eef7fb 50%, #f8fcfa 100%)",
  fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif",
  color: "#173b4d",
  position: "relative",
  overflow: "hidden",
},
  header: {
  minHeight: "76px",
  background:
    "linear-gradient(135deg, #073b5c 0%, #0b5875 55%, #087f73 100%)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 6%",
  boxShadow: "0 8px 25px rgba(7, 59, 92, 0.18)",
  position: "relative",
  zIndex: 10,
},

  logo: {
    margin: 0,
    fontSize: "24px",
  },

  logoText: {
    margin: 0,
    fontSize: "12px",
    opacity: 0.8,
  },

  badge: {
    background: "#19a98b",
    padding: "10px 18px",
    borderRadius: "20px",
    fontSize: "14px",
  },

  hero: {
  maxWidth: "900px",
  margin: "0 auto",
  textAlign: "center",
  padding: "55px 25px 40px",
  position: "relative",
  zIndex: 1,
},

  icon: {
  width: "88px",
  height: "88px",
  margin: "0 auto 20px",
  borderRadius: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "48px",
  background:
    "linear-gradient(135deg, #e2f7f2 0%, #dff1fa 100%)",
  boxShadow:
    "0 12px 30px rgba(7, 59, 92, 0.12)",
  border: "1px solid rgba(7, 59, 92, 0.08)",
},

  title: {
  fontSize: "44px",
  lineHeight: "1.1",
  margin: "10px auto 15px",
  color: "#073b5c",
  fontWeight: "800",
  letterSpacing: "-1px",
  maxWidth: "800px",
},

  description: {
    fontSize: "18px",
    lineHeight: "1.7",
    color: "#607585",
    maxWidth: "700px",
    margin: "25px auto",
  },

  button: {
    background: "#19a98b",
    color: "white",
    border: "none",
    padding: "15px 30px",
    borderRadius: "10px",
    fontSize: "17px",
    cursor: "pointer",
    marginTop: "20px",
  },

  security: {
    marginTop: "25px",
    color: "#718391",
    fontSize: "14px",
  },

  formContainer: {
    maxWidth: "720px",
    margin: "auto",
    padding: "55px 20px",
  },

  caseContainer: {
    maxWidth: "850px",
    margin: "auto",
    padding: "45px 20px",
  },

  heading: {
    fontSize: "38px",
    color: "#073b5c",
    marginBottom: "10px",
  },

  formSubtitle: {
    color: "#687b88",
    fontSize: "17px",
    marginBottom: "25px",
  },

  form: {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(247,252,251,0.98))",
  padding: "42px 48px",
  borderRadius: "28px",
  border: "1px solid rgba(7, 59, 92, 0.10)",
  boxShadow:
  "0 18px 45px rgba(20, 1, 3, 0.88)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "680px",
  margin: "0 auto",
},
primaryButton: {
  width: "100%",
  padding: "16px 20px",
  border: "none",
  borderRadius: "14px",
  background:
    "linear-gradient(135deg, #087f73 0%, #19a98b 100%)",
  color: "white",
  fontSize: "17px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 10px 24px rgba(25, 169, 139, 0.25)",
  transition: "all 0.25s ease",
},
input: {
  width: "100%",
  padding: "16px 14px",
  border: "1px solid #cbdde5",
  borderRadius: "14px",
  background: "#ffffff",
  color: "#173b4d",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
  transition: "all 0.2s ease",
},
  patientBanner: {
    background: "#073b5c",
    color: "white",
    padding: "20px 25px",
    borderRadius: "14px",
    marginBottom: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progress: {
    background: "#19a98b",
    padding: "8px 15px",
    borderRadius: "20px",
    fontSize: "13px",
  },

  summaryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  aiBadge: {
    background: "#e9f7f3",
    color: "#087e69",
    padding: "10px 16px",
    borderRadius: "20px",
    fontWeight: "bold",
  },

  summaryCard: {
    background: "white",
    padding: "28px",
    border: "1px solid #3a0bf5",
    borderRadius: "20px",
    boxShadow: "0 14px 32px rgba(7,59,92,0.10)",
    marginTop: "20px",
    lineHeight: "1.6",
  },

  warning: {
    background: "#fff7e6",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
    color: "#765400",
  },

secondaryButton: {
  background: "transparent",
  color: "#073b5c",
  border: "2px solid #073b5c",
  padding: "12px 22px",
  borderRadius: "10px",
  fontSize: "15px",
  cursor: "pointer",
  marginTop: "20px",
},

voiceBox: {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
},

voiceButton: {
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  fontSize: "15px",
  cursor: "pointer",
  alignSelf: "flex-start",
},
 aiDraft: {
   marginTop: "30px",
   padding: "25px",
   background: "#eef8f6",
   border: "1px solid #b7e4dc",
   borderRadius: "15px",
   lineHeight: "1.7",
   boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
 },

 aiDraftTitle: {
   fontSize: "22px",
   fontWeight: "700",
   color: "#073b5c",
   marginBottom: "15px",
 },

aiNote: {
  marginTop: "18px",
  padding: "12px",
  background: "#fff7e6",
  borderRadius: "8px",
  color: "#765400",
  fontSize: "14px",
},
savedCasesSection: {
  marginTop: "30px",
  padding: "25px",
  background: "white",
  borderRadius: "15px",
  border: "1px solid #d6e4ea",
  boxShadow: "0 5px 15px rgba(0,0,0,0.06)",
},

caseItem: {
  marginTop: "20px",
  padding: "20px",
  background: "#f4f9fc",
  borderRadius: "12px",
  border: "1px solid #d6e4ea",
},
roleContainer: {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginTop: "30px",
},

roleButton: {
  width: "100%",
  minHeight: "120px",
  padding: "24px 30px",
  border: "1px solid rgba(7, 59, 92, 0.12)",
  borderRadius: "20px",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(244,251,250,0.92))",
  fontSize: "20px",
  fontWeight: "600",
  color: "#073b5c",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  gap: "28px",
  boxShadow: "0 10px 30px rgba(7, 59, 92, 0.10)",
  transition: "all 0.25s ease",
  transform: "translateY(0)",
},
roleIcon: {
  width: "72px",
  height: "72px",
  minWidth: "72px",
  borderRadius: "22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "38px",
  background:
    "linear-gradient(135deg, #e8f7f3 0%, #dff1fa 100%)",
  boxShadow: "inset 0 0 0 1px rgba(7, 59, 92, 0.08)",
},
doctorGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
  marginTop: "30px",
},

dashboardCard: {
  background: "white",
  padding: "25px",
  minHeight: "210px",
  borderRadius: "20px",
  border: "1px solid #d6e4ea",
  boxShadow: "0 12px 28px rgba(7,59,92,0.10)",
  textAlign: "left",
},

dashboardIcon: {
  width: "58px",
  height: "58px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "32px",
  borderRadius: "16px",
  background: "#eef7fb",
  marginBottom: "18px",
},
viewCaseButton: {
  padding: "13px 24px",
  border: "none",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #073b5c, #087f73)",
  color: "white",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(7,59,92,0.15)",
},
headerRight: {
  display: "flex",
  alignItems: "center",
  gap: "15px",
},

userId: {
  fontSize: "16px",
  fontWeight: "600",
},

headerLogout: {
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  background: "white",
  color: "#073b5c",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
},
navigationBar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 30px",
  background: "white",
  borderBottom: "1px solid #d6e4ea",
},

navigationButton: {
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  background: "#073b5c",
  color: "white",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
},
logoutButton: {
  marginTop: "30px",
  padding: "12px 30px",
  border: "none",
  borderRadius: "8px",
  background: "#073b5c",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
},
appointmentCard: {
  marginTop: "25px",
  padding: "30px",
  background: "white",
  borderRadius: "15px",
  border: "1px solid #d6e4ea",
  boxShadow: "0 5px 15px rgba(0,0,0,0.06)",
},

appointmentSelect: {
  width: "100%",
  padding: "14px",
  marginBottom: "20px",
  border: "1px solid #b8ccd6",
  borderRadius: "8px",
  fontSize: "16px",
  background: "white",
},

patientActions: {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
  marginTop: "35px",
},

patientActionButton: {
  width: "100%",
  minHeight: "105px",
  padding: "22px 25px",
  border: "1px solid #d6e7ed",
  borderRadius: "20px",
  background: "linear-gradient(135deg, #ffffff, #f4fbfc)",
  fontSize: "18px",
  color: "#073b5c",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  textAlign: "left",
  boxShadow: "0 8px 22px rgba(7,59,92,0.08)",
  transition: "all 0.25s ease",
}
};

export default App;