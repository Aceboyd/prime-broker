import React, { useState } from 'react';
import { Shield, Upload, CheckCircle, FileText } from 'lucide-react';

const KYCVerification = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    documents: {
      idDocument: null,
      proofOfAddress: null,
      selfie: null
    }
  });

  const steps = [
    { id: 1, title: 'Document Upload', icon: FileText, status: 'current' },
    { id: 2, title: 'Verification Review', icon: Shield, status: 'pending' }
  ];

  const handleFileUpload = (field, file) => {
    if (file && ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type) && file.size <= 10 * 1024 * 1024) {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [field]: file
        }
      }));
    } else {
      alert('Please upload a PNG, JPG, or PDF file up to 10MB.');
    }
  };

  const renderDocumentUpload = () => (
    <div className="space-y-8">
      {/* ID Document */}
      <div className="glass-effect bg-gray-800 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-400" />
          Government-issued ID
        </h4>
        <p className="text-gray-400 mb-4">
          Upload a clear photo of your passport, driver's license, or national ID card
        </p>
        <label className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer block">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500">PNG, JPG, PDF up to 10MB</p>
          <input
            type="file"
            className="hidden"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(e) => handleFileUpload('idDocument', e.target.files[0])}
          />
        </label>
        {formData.documents.idDocument && (
          <div className="mt-4 p-3 bg-green-400/20 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-400">{formData.documents.idDocument.name}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="text-center py-8">
      <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">Verification Submitted!</h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Your documents have been submitted for review. We'll notify you once the verification process is complete, typically within 1-3 business days.
      </p>
      <div className="glass-effect bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-300">Status</span>
          <span className="text-yellow-400 font-medium">Under Review</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Estimated Time</span>
          <span className="text-white font-medium">1-3 Days</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">KYC Verification</h2>
        <p className="text-gray-400 text-sm">Upload documents to verify your identity and unlock all features</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep >= step.id;

          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center space-x-3 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-green-600' : 'bg-gray-700'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium hidden md:block">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? 'bg-green-600' : 'bg-gray-700'}`}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="glass-effect bg-gray-800 rounded-lg p-8">
        {currentStep === 1 && renderDocumentUpload()}
        {currentStep === 2 && renderReview()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          disabled={currentStep === 1}
          className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          disabled={!formData.documents.idDocument || !formData.documents.proofOfAddress || !formData.documents.selfie}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Submit for Review
        </button>
      </div>
    </div>
  );
};

export default KYCVerification;