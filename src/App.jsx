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

  function handlePatientChange(e) {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  }

  function handleCaseChange(e) {
    setCaseData({
      ...caseData,
      [e.target.name]: e.target.value,
    });
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
      <Header setScreen={setScreen} />

      <main style={styles.hero}>
        <div style={styles.icon}>
          🏥
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
/>

          <label>
            Password
          </label>

<input
    type="password"
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
/>

          <button
            style={styles.primaryButton}
           onClick={handleLogin}
          >
            Login to dashboard→
          </button>
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
      <Header setScreen={setScreen} />

      <main style={styles.hero}>
        <div style={styles.card}>
          <h1 style={styles.title}>
            Who are you?
          </h1>

          <p style={styles.description}>
            Please select your role to continue
          </p>

          <div style={styles.roleContainer}>

            <button
              style={styles.roleButton}
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
              👨‍⚕️
              <span>I am a Doctor</span>
            </button>

            <button
              style={styles.roleButton}
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
              👤
              <span>I am a Patient</span>
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
      <Header setScreen={setScreen} />

      <main style={styles.hero}>
        <div style={styles.card}>

          <h1 style={styles.title}>
            👤 Patient Dashboard
          </h1>

          <p style={styles.description}>
            Welcome! Manage your health information and start your case.
          </p>

          <div style={styles.patientActions}>

            <button
              style={styles.patientActionButton}
              onClick={() => setScreen("registration")}
            >
              📝
              <div>
                <strong>Start Patient Case</strong>
                <p>Enter your symptoms and health information.</p>
              </div>
            </button>

            <button
              style={styles.patientActionButton}
            >
              📄
              <div>
                <strong>My Medical Reports</strong>
                <p>View your uploaded medical reports.</p>
              </div>
            </button>

            <button
              style={styles.patientActionButton}
            >
              📋
              <div>
                <strong>My Case History</strong>
                <p>View your previous patient cases.</p>
              </div>
            </button>
<button
  style={styles.patientActionButton}
  onClick={() => setScreen("appointments")}
>
  📅
  <div>
    <strong>Book an Appointment</strong>
    <p>Choose a hospital, doctor and available time slot.</p>
  </div>
</button>
<button
  style={styles.patientActionButton}
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
      <Header setScreen={setScreen} />

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
      <Header setScreen={setScreen} />

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

            <h2>Duration</h2>

            <p>
              {selectedCase.caseData?.duration || "Not provided"}
            </p>

            <h2>Severity</h2>

            <p>
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
      <Header setScreen={setScreen} />

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
  return (
    <div style={styles.page}>
      <Header setScreen={setScreen} />

      <main style={styles.hero}>
        <div style={styles.card}>

          <h1 style={styles.title}>
            👨‍⚕️ Doctor Dashboard
          </h1>

          <p style={styles.description}>
            Welcome, Doctor
          </p>
          <div style={styles.savedCasesSection}>
  <h2>Patient Cases</h2>

  {savedCases.length === 0 ? (
    <p>No patient cases available yet.</p>
  ) : (
    savedCases.map((item) => (
      <div key={item.caseId} style={styles.caseItem}>
        <h3>{item.caseId}</h3>

        <p>
          <strong>Patient:</strong>{" "}
          {item.patient?.name || "Not provided"}
        </p>

        <p>
          <strong>Age:</strong>{" "}
          {item.patient?.age || "Not provided"}
        </p>

        <p>
          <strong>Gender:</strong>{" "}
          {item.patient?.gender || "Not provided"}
        </p>

        <p>
          <strong>Complaint:</strong>{" "}
          {item.caseData?.complaint || "Not provided"}
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
</div>

          <div style={styles.doctorGrid}>

            <div style={styles.dashboardCard}>
              <div style={styles.dashboardIcon}>📋</div>
              <h2>Patient Cases</h2>
              <p>View and manage patient case information.</p>
            </div>

            <div style={styles.dashboardCard}>
              <div style={styles.dashboardIcon}>🚨</div>
              <h2>Red Flag Cases</h2>
              <p>Review patients requiring special attention.</p>
            </div>

            <div style={styles.dashboardCard}>
              <div style={styles.dashboardIcon}>🤖</div>
              <h2>AI Case Summaries</h2>
              <p>Review structured AI-assisted case drafts.</p>
            </div>

            <div style={styles.dashboardCard}>
              <div style={styles.dashboardIcon}>📄</div>
              <h2>Medical Reports</h2>
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
  if (screen === "welcome") {
    return (
      <div style={styles.page}>

        <Header setScreen={setScreen} />

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

        <Header setScreen={setScreen} />

        <main style={styles.formContainer}>

          <h1 style={styles.heading}>
            Patient Registration
          </h1>

          <p style={styles.formSubtitle}>
            Let's begin by collecting some basic information.
          </p>

          <div style={styles.form}>

            <label>Patient Name</label>

            <input
              name="name"
              type="text"
              placeholder="Enter patient name"
              value={patient.name}
              onChange={handlePatientChange}
            />

            <label>Age</label>

            <input
              name="age"
              type="number"
              placeholder="Enter age"
              value={patient.age}
              onChange={handlePatientChange}
            />

            <label>Gender</label>

            <select
              name="gender"
              value={patient.gender}
              onChange={handlePatientChange}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label>Preferred Language</label>

            <select
              name="language"
              value={patient.language}
              onChange={handlePatientChange}
            >
              <option value="">Select language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>

            <button
              style={styles.button}
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

        <Header setScreen={setScreen} />

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

            <button
              style={styles.button}
             onClick={() => {
  const newCaseId = generateCaseId();

  const newCase = {
    caseId: newCaseId,
    patient: { ...patient },
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

      <Header setScreen={setScreen} />

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

  <h2>Case ID: {caseData.caseId}</h2>

  <h2>Patient Information</h2>
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

          <h2>Chief Complaint</h2>

          <p>
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

function Header({ setScreen }) {
  return (
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
  );
}


/* =========================
   STYLES
========================= */

const styles = {

  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef8ff, #f5fffb)",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#123047",
  },

  header: {
    height: "75px",
    background: "#073b5c",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8%",
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
    maxWidth: "850px",
    margin: "auto",
    textAlign: "center",
    paddingTop: "80px",
  },

  icon: {
    fontSize: "70px",
    marginBottom: "20px",
  },

  title: {
    fontSize: "52px",
    margin: "10px 0",
    color: "#073b5c",
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
    maxWidth: "750px",
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
    background: "white",
    padding: "35px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
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
    padding: "35px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    marginTop: "20px",
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
  padding: "20px",
  border: "1px solid #d6e4ea",
  borderRadius: "12px",
  background: "white",
  fontSize: "20px",
  fontWeight: "600",
  color: "#073b5c",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
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
  borderRadius: "15px",
  border: "1px solid #d6e4ea",
  boxShadow: "0 5px 15px rgba(0,0,0,0.06)",
  textAlign: "left",
},

dashboardIcon: {
  fontSize: "35px",
  marginBottom: "10px",
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
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  marginTop: "30px",
},

patientActionButton: {
  width: "100%",
  padding: "20px",
  border: "1px solid #d6e4ea",
  borderRadius: "15px",
  background: "white",
  fontSize: "18px",
  color: "#073b5c",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "18px",
  textAlign: "left",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
},
};

export default App;