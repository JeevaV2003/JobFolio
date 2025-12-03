import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import html2pdf from 'html2pdf.js';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState('edit');
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      summary: ''
    },
    education: [],
    experience: [],
    projects: [],
    certificates: [],
    skills: []
  });

  const previewRef = useRef();

  const handleDownload = () => {
    const element = previewRef.current;
    const opt = {
      margin: [10, 10, 10, 10], // Top, Left, Bottom, Right
      filename: `${resumeData.personal.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="page-container resume-builder">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="display-5 fw-bold">Resume Builder</h1>
            <p className="text-muted">Create a professional resume in minutes</p>
          </div>
          <div className="d-flex gap-3">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${activeTab === 'edit' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('edit')}
              >
                Edit
              </button>
              <button
                type="button"
                className={`btn ${activeTab === 'preview' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </button>
            </div>
            {activeTab === 'preview' && (
              <button className="btn btn-success" onClick={handleDownload}>
                Download PDF
              </button>
            )}
          </div>
        </div>

        <div className="row">
          <div className={activeTab === 'edit' ? 'col-12' : 'd-none'}>
            <ResumeForm data={resumeData} updateData={setResumeData} />
          </div>
          <div className={activeTab === 'preview' ? 'col-12' : 'd-none'}>
            <div className="preview-container shadow-lg">
              <ResumePreview ref={previewRef} data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
