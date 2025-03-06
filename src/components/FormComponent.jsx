import { useState } from "react";
import SummaryModal from "./SummaryModal";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    computerTraining: "",
    bvn: "",
    files: {},
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Handle Text Inputs
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle File Inputs
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      files: { ...prev.files, [e.target.name]: e.target.files[0] },
    }));
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate Form Before Opening Modal
  const validateForm = () => {
    let newErrors = {};
    if (!formData.bankName) newErrors.bankName = "Bank Name is required";
    if (!formData.accountName)
      newErrors.accountName = "Account Name is required";
    if (!formData.accountNumber.match(/^\d{10}$/))
      newErrors.accountNumber = "Account Number must be exactly 10 digits";
    if (!formData.computerTraining)
      newErrors.computerTraining = "Computer Training field is required";
    if (!formData.bvn.match(/^\d{11}$/))
      newErrors.bvn = "BVN must be exactly 11 digits";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  // Open Modal After Validation
  const handleOpenModal = () => {
    if (validateForm()) setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = () => {
    console.log("✅ Final Submission Data:", formData);
    handleCloseModal();
  };

  return (
    <div className="container">
      <h2>Form</h2>
      <div className="mb-3">
        <label>Bank Name</label>
        <input
          type="text"
          name="bankName"
          className="form-control"
          onChange={handleInputChange}
        />
        {errors.bankName && (
          <small className="text-danger">{errors.bankName}</small>
        )}
      </div>

      <div className="mb-3">
        <label>Account Name</label>
        <input
          type="text"
          name="accountName"
          className="form-control"
          onChange={handleInputChange}
        />
        {errors.accountName && (
          <small className="text-danger">{errors.accountName}</small>
        )}
      </div>

      <div className="mb-3">
        <label>Account Number</label>
        <input
          type="text"
          name="accountNumber"
          className="form-control"
          maxLength="10"
          onChange={handleInputChange}
        />
        {errors.accountNumber && (
          <small className="text-danger">{errors.accountNumber}</small>
        )}
      </div>

      <div className="mb-3">
        <label>Computer Training</label>
        <select
          name="computerTraining"
          className="form-control"
          onChange={handleInputChange}
        >
          <option value="">Select...</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.computerTraining && (
          <small className="text-danger">{errors.computerTraining}</small>
        )}
      </div>

      <div className="mb-3">
        <label>BVN</label>
        <input
          type="text"
          name="bvn"
          className="form-control"
          maxLength="11"
          onChange={handleInputChange}
        />
        {errors.bvn && <small className="text-danger">{errors.bvn}</small>}
      </div>

      <div className="mb-3">
        <label>Recent Photograph</label>
        <input
          type="file"
          name="recent_photo"
          className="form-control"
          onChange={handleFileChange}
        />
        {errors.recent_photo && (
          <small className="text-danger">{errors.recent_photo}</small>
        )}
      </div>

      <button className="btn btn-primary" onClick={handleOpenModal}>
        Review & Submit
      </button>

      <SummaryModal
        show={showModal}
        handleClose={handleCloseModal}
        formData={formData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormComponent;
