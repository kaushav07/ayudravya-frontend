/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { Upload, File, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { prescriptionService } from "../services/prescriptionService";
import { Button } from "./Button";

export const PrescriptionUpload = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedId, setUploadedId] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files);
      addFiles(filesArr);
    }
  };

  const addFiles = (files) => {
    setError(null);
    const validExtensions = ["image/jpeg", "image/png", "application/pdf"];
    const filteredFiles = files.filter((file) => {
      const isValid = validExtensions.includes(file.type);
      if (!isValid) {
        setError("Only JPG, PNG, and PDF documents are supported.");
      }
      return isValid;
    });

    const newFilesList = [...selectedFiles, ...filteredFiles];
    if (newFilesList.length > 5) {
      setError("You can upload a maximum of 5 files.");
      setSelectedFiles(newFilesList.slice(0, 5));
    } else {
      setSelectedFiles(newFilesList);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    if (selectedFiles.length <= 5) {
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleUploadSubmit = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one prescription document.");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      const res = await prescriptionService.uploadPrescription(selectedFiles);
      setUploadedId(res.id);
      onUploadSuccess(res.id);
    } catch (err) {
      setError(err.message || "Prescription upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="card border-0 shadow-sm rounded-4 p-4 bg-white"
      id="prescription-upload-component"
    >
      <h4 className="h5 fw-bold text-dark display-font mb-3">
        Upload Doctor Prescription
      </h4>

      {uploadedId ? (
        <div className="text-center py-4 bg-success-subtle rounded-3 p-3">
          <CheckCircle2 size={40} className="text-success mb-2" />
          <h5 className="fw-semibold text-success mb-1">Prescription Loaded</h5>
          <p className="text-secondary small mb-3">
            Your document has been registered securely (ID: {uploadedId}). It
            will be audited by a pharmacist.
          </p>
          <button
            type="button"
            className="btn btn-sm btn-outline-success font-mono small"
            onClick={() => {
              setUploadedId(null);
              setSelectedFiles([]);
            }}
          >
            Upload New Document
          </button>
        </div>
      ) : (
        <div>
          {/* Drag and drop region */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-light-subtle rounded-4 p-4 text-center cursor-pointer mb-3 bg-light hover-bg-light-subtle"
            style={{ cursor: "pointer", transition: "all 0.2s ease-in-out" }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="d-none"
              accept=".jpg,.jpeg,.png,.pdf"
            />

            <Upload
              size={32}
              className="text-success mb-2.5"
              style={{ color: "var(--primary-color)" }}
            />
            <h6 className="fw-semibold text-dark small mb-1">
              Drag and drop documents here
            </h6>
            <p className="text-muted small mb-0">
              or click to browse local files
            </p>
            <div
              className="text-muted mt-2 font-mono"
              style={{ fontSize: "0.72rem" }}
            >
              Supported: JPG, PNG, PDF • Max 5 files
            </div>
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="mb-3">
              <h6 className="fw-semibold text-dark small mb-2">
                Attached Documents ({selectedFiles.length}/5)
              </h6>
              <div className="d-flex flex-column gap-2">
                {selectedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-center justify-content-between p-2.5 bg-light border rounded-3 small"
                  >
                    <div className="d-flex align-items-center gap-2 text-truncate">
                      <File size={15} className="text-secondary" />
                      <span
                        className="text-dark text-truncate"
                        style={{ maxWidth: "240px" }}
                      >
                        {file.name}
                      </span>
                      <span
                        className="text-muted font-mono"
                        style={{ fontSize: "0.7rem" }}
                      >
                        ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="btn p-1 text-danger d-flex align-items-center justify-content-center"
                      title="Remove file"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div
              className="alert alert-danger border-0 p-3 rounded-3 d-flex gap-2 mb-3"
              style={{ fontSize: "0.82rem" }}
            >
              <AlertTriangle size={16} className="text-danger mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          <Button
            type="button"
            onClick={handleUploadSubmit}
            loading={uploading}
            loadingText="Securing Prescription Documents..."
            disabled={selectedFiles.length === 0}
            className="w-100 py-2.5"
          >
            Submit Prescription File
          </Button>
        </div>
      )}
    </div>
  );
};
