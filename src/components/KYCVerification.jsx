import React, { useState } from 'react';
import { Shield, Upload, CheckCircle, FileText } from 'lucide-react';

const KYCVerification = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    documents: {
      idDocument: null,
      proofOfAddress: null,
      selfie: null,
    },
  });

  const steps = [
    { id: 1, title: 'Document Upload', icon: FileText },
    { id: 2, title: 'Verification Review', icon: Shield },
  ];

  const handleFileUpload = (field, file) => {
    if (
      file &&
      ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type) &&
      file.size <= 10 * 1024 * 1024
    ) {
      setFormData((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [field]: file,
        },
      }));
    } else {
      alert('Please upload a PNG, JPG, or PDF file up to 10MB.');
    }
  };

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      {/* ID Document */}
      <div className="glass-effect bg-gray-800 rounded-lg p-4 sm:p-6">
        <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-400" />
          Government-issued ID
        </h4>
        <p className="text-gray-400 text-sm mb-4">
          Upload a clear photo of your passport, driver’s license, or national ID card
        </p>
        <label className="border-2 border-dashed border-gray-600 rounded-lg p-6 sm:p-8 text-center hover:border-green-500 transition-colors cursor-pointer block">
          <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-300 mb-1 text-sm sm:text-base">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
          <input
            type="file"
            className="hidden"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(e) => handleFileUpload('idDocument', e.target.files[0])}
          />
        </label>
        {formData.documents.idDocument && (
          <div className="mt-3 p-3 bg-green-400/20 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-400 text-sm truncate">
              {formData.documents.idDocument.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="text-center py-6 sm:py-8">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Verification Submitted!</h3>
      <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-md mx-auto">
        Your documents have been submitted for review. We'll notify you once the verification
        process is complete, typically within 1–3 business days.
      </p>
      <div className="glass-effect bg-gray-800 rounded-lg p-4 sm:p-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-300 text-sm">Status</span>
          <span className="text-yellow-400 font-medium text-sm">Under Review</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Estimated Time</span>
          <span className="text-white font-medium text-sm">1–3 Days</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">KYC Verification</h2>
        <p className="text-gray-400 text-xs sm:text-sm">
          Upload documents to verify your identity and unlock all features
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 mb-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep >= step.id;

          return (
            <div key={step.id} className="flex flex-col sm:flex-row items-center">
              <div
                className={`flex items-center space-x-2 sm:space-x-3 ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-green-600' : 'bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="font-medium text-xs sm:text-sm">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`hidden sm:block w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-700'
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="glass-effect bg-gray-800 rounded-lg p-5 sm:p-8">
        {currentStep === 1 && renderDocumentUpload()}
        {currentStep === 2 && renderReview()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          disabled={currentStep === 1}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          disabled={
            !formData.documents.idDocument ||
            !formData.documents.proofOfAddress ||
            !formData.documents.selfie
          }
          className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
        >
          Submit for Review
        </button>
      </div>
    </div>
  );
};

export default KYCVerification;
