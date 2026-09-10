import { useState } from "react";

function App() {
const [screen, setScreen] = useState(
  localStorage.getItem("loggedIn") === "true" ? "welcome" : "login"
);
const [listening, setListening] = useState(false);

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    language: "",
  });

  const [caseData, setCaseData] = useState({
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
  if (username === "admin" && password === "1234") {
    localStorage.setItem("loggedIn", "true");
    setScreen("welcome");
  } else {
    alert("Invalid username or password");
  }
}
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
      <Header />

      <main style={styles.hero}>
        <div style={styles.icon}>
          🏥
        </div>

        <h1 style={styles.title}>
          SIH26047
          <br />
          Smart Healthcare
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
            Login →
          </button>
        </div>

        <p style={styles.formSubtitle}>
          🔒 Your patient information is handled securely
        </p>
      </main>
    </div>
  );
}
  if (screen === "welcome") {
    return (
      <div style={styles.page}>

        <Header />

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

        <Header />

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

        <Header />

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
              onClick={() => setScreen("summary")}
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

      <Header />

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

function Header() {
  return (
    <header style={styles.header}>

      <div>
        <h2 style={styles.logo}>
          SIH26047
        </h2>

        <p style={styles.logoText}>
          Smart Healthcare
        </p>
      </div>

      <div style={styles.badge}>
        Patient Case-Taking
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

   };

export default App;