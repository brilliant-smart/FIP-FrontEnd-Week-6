import React from "react";
import { Modal, Button } from "react-bootstrap";

const SummaryModal = ({ show, handleClose, handleConfirm, formData = {} }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Review Your Information Before Submitting</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Personal Information */}
        <p>
          <strong>Last Name:</strong> {formData.lastName || "N/A"}
        </p>
        <p>
          <strong>Other Names:</strong> {formData.otherNames || "N/A"}
        </p>
        <p>
          <strong>Date of Birth:</strong> {formData.dob || "N/A"}
        </p>
        <p>
          <strong>Gender:</strong> {formData.gender || "N/A"}
        </p>
        <p>
          <strong>Phone Number (Main):</strong> {formData.phoneNumber1 || "N/A"}
        </p>
        <p>
          <strong>Phone Number (Other):</strong>{" "}
          {formData.phoneNumber2 || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {formData.email || "N/A"}
        </p>

        {/* Address & Ward Details */}
        <p>
          <strong>Home Address:</strong> {formData.homeAddress || "N/A"}
        </p>
        <p>
          <strong>Ward:</strong> {formData.ward || "N/A"} (
          {formData.lga || "N/A"})
        </p>
        <p>
          <strong>Code:</strong> {formData.code || "N/A"}
        </p>
        <p>
          <strong>Town:</strong> {formData.town || "N/A"}
        </p>
        <p>
          <strong>Latitude:</strong> {formData.latitude || "N/A"}
        </p>
        <p>
          <strong>Longitude:</strong> {formData.longitude || "N/A"}
        </p>

        {/* Education & Training */}
        <p>
          <strong>Highest Qualification:</strong>{" "}
          {formData.highestQualification || "N/A"}
        </p>
        <p>
          <strong>Course Studied:</strong> {formData.areaOfStudy || "N/A"}
        </p>
        <p>
          <strong>Computer Training:</strong>{" "}
          {formData.computerTraining || "N/A"}
        </p>
        {formData.computerTraining === "Yes" && (
          <>
            <p>
              <strong>Training Duration:</strong>{" "}
              {formData.trainingDuration || "N/A"}
            </p>
            <p>
              <strong>Training Title:</strong> {formData.trainingTitle || "N/A"}
            </p>
          </>
        )}

        {/* Bank Details */}
        <p>
          <strong>Bank Name:</strong> {formData.bankName || "N/A"}
        </p>
        <p>
          <strong>Account Name:</strong> {formData.accountName || "N/A"}
        </p>
        <p>
          <strong>Account Number:</strong> {formData.accountNumber || "N/A"}
        </p>
        <p>
          <strong>BVN:</strong> {formData.bvn || "N/A"}
        </p>

        {/* Uploaded Documents */}
        <p>
          <strong>Uploaded Documents:</strong>
        </p>
        <ul>
          {Object.entries({
            "Recent Photograph": formData.recentPhoto,
            "Indigene Certificate": formData.indigeneCertificate,
            "Birth Certificate": formData.birthCertificate,
            "Academic Certificate": formData.academicCertificate,
            "Computer Training Certificate":
              formData.computerTrainingCertificate,
            "BVN Slip": formData.bvnSlip,
            "Bank Statement": formData.bankStatement,
          }).map(([label, file]) => (
            <li key={label}>
              {label}: {file ? file.name : "Not Uploaded"}
            </li>
          ))}
        </ul>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Edit
        </Button>
        <Button variant="success" onClick={handleConfirm}>
          Confirm Submission
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SummaryModal;
