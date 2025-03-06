import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const FileUploadSection = ({ handleChange }) => {
  const [fileErrors, setFileErrors] = useState({});

  // Allowed file types and max file size (5MB)
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes

  // Handle file validation
  const handleFileValidation = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setFileErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Only JPG, JPEG, and PNG files are allowed.",
        }));
        e.target.value = ""; // Reset input if invalid
        return;
      }

      if (file.size > maxSize) {
        setFileErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "File size must be less than 5MB.",
        }));
        e.target.value = ""; // Reset input if invalid
        return;
      }

      // If valid, clear error and pass to handleChange
      setFileErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      handleChange(e); // ✅ Call the passed `handleChange` function
    }
  };

  return (
    <>
      <div className="text-center my-4">
        <h2>Upload the following documents:</h2>
        <small className="text-muted">
          Accepted formats: JPG, JPEG, PNG. Max file size: 5MB
        </small>
      </div>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3 text-start">
            <Form.Label htmlFor="recentPhoto">Recent Photograph:</Form.Label>
            <Form.Control
              type="file"
              name="recentPhoto"
              id="recentPhoto"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileValidation}
              required
            />
            {fileErrors.recentPhoto && (
              <small className="text-danger">{fileErrors.recentPhoto}</small>
            )}
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3 text-start">
            <Form.Label htmlFor="indigeneCertificate">
              Indigene Certificate:
            </Form.Label>
            <Form.Control
              type="file"
              name="indigeneCertificate"
              id="indigeneCertificate"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileValidation}
              required
            />
            {fileErrors.indigeneCertificate && (
              <small className="text-danger">
                {fileErrors.indigeneCertificate}
              </small>
            )}
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3 text-start">
            <Form.Label htmlFor="birthCertificate">
              Birth Certificate:
            </Form.Label>
            <Form.Control
              type="file"
              name="birthCertificate"
              id="birthCertificate"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileValidation}
              required
            />
            {fileErrors.birthCertificate && (
              <small className="text-danger">
                {fileErrors.birthCertificate}
              </small>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3 text-start">
            <Form.Label htmlFor="academicCertificate">
              Academic Certificate:
            </Form.Label>
            <Form.Control
              type="file"
              name="academicCertificate"
              id="academicCertificate"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileValidation}
              required
            />
            {fileErrors.academicCertificate && (
              <small className="text-danger">
                {fileErrors.academicCertificate}
              </small>
            )}
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3 text-start">
            <Form.Label htmlFor="computerTrainingCertificate">
              Computer Training Certificate:
            </Form.Label>
            <Form.Control
              type="file"
              name="computerTrainingCertificate"
              id="computerTrainingCertificate"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileValidation}
              required
            />
            {fileErrors.computerTrainingCertificate && (
              <small className="text-danger">
                {fileErrors.computerTrainingCertificate}
              </small>
            )}
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3 text-start">
            <Form.Label htmlFor="bvnSlip">BVN Slip:</Form.Label>
            <Form.Control
              type="file"
              name="bvnSlip"
              id="bvnSlip"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileValidation}
              required
            />
            {fileErrors.bvnSlip && (
              <small className="text-danger">{fileErrors.bvnSlip}</small>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Form.Group className="mb-3 text-start">
            <Form.Label htmlFor="bankStatement">Bank Statement:</Form.Label>
            <Form.Control
              type="file"
              name="bankStatement"
              id="bankStatement"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileValidation}
              required
            />
            {fileErrors.bankStatement && (
              <small className="text-danger">{fileErrors.bankStatement}</small>
            )}
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default FileUploadSection;
