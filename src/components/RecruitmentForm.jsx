import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import FileUploadSection from "./fileUploadSection";
import SummaryModal from "./SummaryModal";

const RecruitmentForm = () => {
  // ✅ State for storing form data
  const [formData, setFormData] = useState({
    lastName: "",
    otherNames: "",
    dob: "",
    gender: "",
    phoneNumber1: "",
    phoneNumber2: "",
    email: "",
    nin: "",
    bvn: "",
    homeAddress: "",
    ward: "",
    lga: "",
    code: "",
    town: "",
    latitude: "",
    longitude: "",
    highestQualification: "",
    areaOfStudy: "",
    computerTraining: "",
    trainingDuration: "",
    trainingTitle: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    recentPhoto: null,
    indigeneCertificate: null,
    birthCertificate: null,
    academicCertificate: null,
    computerTrainingCertificate: null,
    bvnSlip: null,
    bankStatement: null,
  });

  // ✅ State for error & success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ State for wards data (from JSON)
  const [wards, setWards] = useState([]);

  // ✅ State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // ────────────────────────────────────────────────
  // 🟢 Fetch Wards Data on Component Mount
  // ────────────────────────────────────────────────
  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get("/wards.json"); // Adjust path if needed
        setWards(response.data);
      } catch (err) {
        console.error("Error fetching wards:", err);
      }
    };
    fetchWards();
  }, []);

  // ────────────────────────────────────────────────
  // 🟢 Handle Input Change (Updates formData state)
  // ────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => {
      let updatedData = {
        ...prevData,
        [name]: files && files.length > 0 ? files[0] : value, // ✅ Ensure file is stored correctly
      };

      // Auto-fill LGA & Code when Ward is selected
      if (name === "ward") {
        const selectedWard = wards.find((ward) => ward.ward === value);
        if (selectedWard) {
          updatedData.lga = selectedWard.lga;
          updatedData.code = selectedWard.code;
        }
      }

      console.log("Updated Form Data:", updatedData); // Debugging
      return updatedData;
    });
  };

  // ────────────────────────────────────────────────
  // 🟢 Get User's Location (Latitude & Longitude)
  // ────────────────────────────────────────────────
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        () =>
          alert(
            "Geolocation is not available. Use a smartphone or another computer."
          )
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // ────────────────────────────────────────────────
  // 🟢 Handle Opening Summary Modal (Validation)
  // ────────────────────────────────────────────────
  const handleOpenModal = () => {
    setError(""); // Clear previous errors

    // Basic validation before opening the modal
    if (!formData.lastName || !formData.email || !formData.nin) {
      setError("Please fill in all required fields.");
      return;
    }

    setShowModal(true); // Show modal if all fields are valid
  };

  // ────────────────────────────────────────────────
  // 🟢 Handle Closing Summary Modal
  // ────────────────────────────────────────────────
  const handleCloseModal = () => setShowModal(false);

  // ────────────────────────────────────────────────
  // 🟢 Final Submission (After Modal Confirmation)
  // ────────────────────────────────────────────────
  const handleFinalSubmit = async () => {
    setError("");
    setSuccess("");

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post("https://mockapi.io/endpoint", data);
      setSuccess("Application submitted successfully!");
      console.log("Success:", response.data);
      setShowModal(false); // Close modal after submission
    } catch (err) {
      setError("Failed to submit application. Please try again.");
      console.error("Error:", err);
    }
  };

  // ────────────────────────────────────────────────
  // 🟢 Bank Options (Used for Datalist)
  // ────────────────────────────────────────────────
  const bankOptions = [
    "Access Bank",
    "Access(Diamond) Bank",
    "Citi Bank",
    "Eco Bank",
    "Fcmb Bank",
    "Fidelity Bank",
    "First Bank",
    "Globus Bank",
    "Guaranty Trust Bank(GT)",
    "Heritage Bank",
    "Jaiz Bank",
    "Keystone Bank",
    "Lotus Bank",
    "Parallex Bank",
    "Polaris Bank",
    "Premium Trust Bank",
    "Providus Bank",
    "Stanbic Ibtc Bank",
    "Standard Chartered Bank",
    "Sterling Bank",
    "Suntrust Bank",
    "Taj Bank",
    "Titan Trust Bank",
    "Union Bank",
    "United Bank Of Africa (UBA)",
    "Unity Bank",
    "Wema Bank",
    "Zenith Bank",
  ];

  // ────────────────────────────────────────────────
  // 🟢 Return JSX (Form & Modal)
  // ────────────────────────────────────────────────
  return (
    <Form>
      {/* Display Error Messages */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Form Fields (Example) */}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Other Names</Form.Label>
            <Form.Control
              type="text"
              name="otherNames"
              value={formData.otherNames}
              onChange={handleChange}
              placeholder="Other Names"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {/* Date of Birth */}
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        {/* Gender (Now properly left-aligned) */}
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            {" "}
            {/* Ensures left alignment */}
            <Form.Label>Gender</Form.Label>
            <div className="d-flex flex-column align-items-start">
              {" "}
              {/* Keeps buttons left-aligned */}
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Phone Number (Main)</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber1"
              value={formData.phoneNumber1}
              onChange={handleChange}
              placeholder="Phone Number"
              pattern="[0-9]{11}"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Phone Number (Other)</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber2"
              value={formData.phoneNumber2}
              onChange={handleChange}
              placeholder="Phone Number"
              pattern="[0-9]{11}"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Confirm Email Address</Form.Label>
            <Form.Control
              type="email"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleChange}
              placeholder="Confirm Email Address"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>NIN (National Identification Number)</Form.Label>
            <Form.Control
              type="text"
              name="nin"
              value={formData.nin}
              onChange={handleChange}
              placeholder="NIN"
              pattern="[0-9]{11}"
              maxLength={11}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>BVN (Bank Verification Number)</Form.Label>
            <Form.Control
              type="text"
              name="bvn"
              value={formData.bvn}
              onChange={handleChange}
              placeholder="BVN"
              pattern="[0-9]{11}"
              maxLength={11}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Ward, LGA, and Code Fields */}
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Home Address</Form.Label>
            <Form.Control
              as="textarea" // text area is not valid in react-bootstrap but as="textarea" is
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleChange}
              placeholder="Home Address"
              required
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Ward</Form.Label>
            <Form.Control
              as="select"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              required
            >
              <option value="">Select Ward</option>
              {wards.map((ward) => (
                <option key={ward.ward} value={ward.ward}>
                  {ward.ward}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>LGA</Form.Label>
            <Form.Control
              type="text"
              name="lga"
              value={formData.lga}
              readOnly
              required
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              value={formData.code}
              readOnly
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {/* Town Input */}
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Town</Form.Label>
            <Form.Control
              type="text"
              name="town"
              value={formData.town}
              onChange={handleChange}
              placeholder="Town"
              required
            />
          </Form.Group>
        </Col>

        {/* Latitude Input */}
        <Col md={2}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              required
            />
          </Form.Group>
        </Col>

        {/* Longitude Input */}
        <Col md={2}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              required
            />
          </Form.Group>
        </Col>

        {/* Get Location Button */}
        <Col md={2}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Click here to get your</Form.Label>
            <Button variant="success" className="w-100" onClick={getLocation}>
              Latitude & Longitude
            </Button>
          </Form.Group>
        </Col>
      </Row>

      {/* Note */}
      <small className="text-muted">
        <strong>Note:</strong> The Latitude and Longitude (coordinates) should
        be taken from your home address which is within the ward you selected
        above. Use a mobile phone if your computer does not have GPS.
      </small>

      <h2 className="text-center my-5">Educational Qualification</h2>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Highest Qualification</Form.Label>
            <Form.Control
              as="select"
              name="highestQualification"
              value={formData.highestQualification}
              onChange={handleChange}
              required
            >
              <option value="None">None</option>
              <option value="PSC">PSC</option>
              <option value="NCE">NCE</option>
              <option value="OND">OND</option>
              <option value="HND">HND</option>
              <option value="FirstDegree">First Degree</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Course Studied</Form.Label>
            <Form.Control
              type="text"
              name="areaOfStudy"
              value={formData.areaOfStudy}
              onChange={handleChange}
              placeholder="Course of Study"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      {/* Computer Training */}
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Have you had any computer training?</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="Yes"
                name="computerTraining"
                value="Yes"
                id="computerTrainingYes"
                checked={formData.computerTraining === "Yes"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="computerTraining"
                value="No"
                id="computerTrainingNo"
                checked={formData.computerTraining === "No"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      {/* Conditional Rendering: Computer Training Details */}
      {formData.computerTraining === "Yes" && (
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Duration of the computer training</Form.Label>
              <Form.Control
                as="select"
                name="trainingDuration"
                value={formData.trainingDuration}
                onChange={handleChange}
                required
              >
                <option value="lessThan3">Less than 3 months</option>
                <option value="3To6">3-6 months</option>
                <option value="6To12">6-12 months</option>
                <option value="moreThan12">More than 12 months</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Title of the computer training</Form.Label>
              <Form.Control
                type="text"
                name="trainingTitle"
                value={formData.trainingTitle}
                onChange={handleChange}
                placeholder="Title of training"
                required
              />
            </Form.Group>
          </Col>
        </Row>
      )}

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label htmlFor="bankName">Bank Name</Form.Label>
            <Form.Control
              type="text"
              name="bankName"
              id="bankName"
              placeholder="Bank Name"
              required
              list="bankList"
              value={formData.bankName}
              onChange={handleChange}
            />
            <datalist id="bankList">
              {bankOptions.map((bank, index) => (
                <option key={index} value={bank} />
              ))}
            </datalist>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label htmlFor="accountName">Account Name</Form.Label>
            <Form.Control
              type="text"
              name="accountName"
              id="accountName"
              placeholder="Account Name"
              required
              value={formData.accountName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group className="mb-3 text-start">
            <Form.Label htmlFor="accountNumber">Account Number</Form.Label>
            <Form.Control
              type="text"
              name="accountNumber"
              id="accountNumber"
              pattern="[0-9]{10}"
              maxLength="10"
              required
              placeholder="Enter 10-digit Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      {/* File Upload Section */}
      <FileUploadSection handleChange={handleChange} />
      {/* Summary Modal */}
      <SummaryModal />
      {/* BUTTON TO OPEN MODAL */}
      <Button variant="success" onClick={handleOpenModal}>
        Review & Submit
      </Button>

      {/* SUMMARY MODAL */}
      <SummaryModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleFinalSubmit}
        formData={formData}
      />
    </Form>
  );
};

export default RecruitmentForm;
