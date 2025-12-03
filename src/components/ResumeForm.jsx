import React from 'react';
import { motion } from 'framer-motion';

export default function ResumeForm({ data, updateData }) {
  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      const newSection = [...data[section]];
      newSection[index] = { ...newSection[index], [field]: value };
      updateData({ ...data, [section]: newSection });
    } else {
      updateData({
        ...data,
        [section]: { ...data[section], [field]: value }
      });
    }
  };

  const addItem = (section, initialItem) => {
    updateData({
      ...data,
      [section]: [...data[section], initialItem]
    });
  };

  const removeItem = (section, index) => {
    const newSection = data[section].filter((_, i) => i !== index);
    updateData({ ...data, [section]: newSection });
  };

  return (
    <div className="resume-form">
      {/* Personal Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-4"
      >
        <div className="card-header bg-white py-3">
          <h4 className="mb-0 text-primary">Personal Information</h4>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={data.personal.fullName}
                onChange={(e) => handleChange('personal', 'fullName', e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={data.personal.email}
                onChange={(e) => handleChange('personal', 'email', e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={data.personal.phone}
                onChange={(e) => handleChange('personal', 'phone', e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">LinkedIn URL</label>
              <input
                type="text"
                className="form-control"
                value={data.personal.linkedin}
                onChange={(e) => handleChange('personal', 'linkedin', e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">GitHub URL</label>
              <input
                type="text"
                className="form-control"
                value={data.personal.github}
                onChange={(e) => handleChange('personal', 'github', e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={data.personal.address}
                onChange={(e) => handleChange('personal', 'address', e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Professional Summary</label>
              <textarea
                className="form-control"
                rows="4"
                value={data.personal.summary}
                onChange={(e) => handleChange('personal', 'summary', e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mb-4"
      >
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0 text-primary">Experience</h4>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => addItem('experience', { title: '', company: '', startDate: '', endDate: '', description: '' })}
          >
            + Add Position
          </button>
        </div>
        <div className="card-body">
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4 pb-4 border-bottom last-no-border">
              <div className="d-flex justify-content-end mb-2">
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeItem('experience', index)}
                >
                  Remove
                </button>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={exp.title}
                    onChange={(e) => handleChange('experience', 'title', e.target.value, index)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    value={exp.company}
                    onChange={(e) => handleChange('experience', 'company', e.target.value, index)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={exp.startDate}
                    onChange={(e) => handleChange('experience', 'startDate', e.target.value, index)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={exp.endDate}
                    onChange={(e) => handleChange('experience', 'endDate', e.target.value, index)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={exp.description}
                    onChange={(e) => handleChange('experience', 'description', e.target.value, index)}
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card mb-4"
      >
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0 text-primary">Education</h4>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => addItem('education', { institute: '', degree: '', year: '', grade: '' })}
          >
            + Add Education
          </button>
        </div>
        <div className="card-body">
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4 pb-4 border-bottom last-no-border">
              <div className="d-flex justify-content-end mb-2">
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeItem('education', index)}
                >
                  Remove
                </button>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Institute / College Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edu.institute}
                    onChange={(e) => handleChange('education', 'institute', e.target.value, index)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Degree</label>
                  <input
                    type="text"
                    className="form-control"
                    value={edu.degree}
                    onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Passing Year</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 2024"
                    value={edu.year}
                    onChange={(e) => handleChange('education', 'year', e.target.value, index)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">CGPA / Percentage</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 9.5 CGPA or 85%"
                    value={edu.grade}
                    onChange={(e) => handleChange('education', 'grade', e.target.value, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Projects */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card mb-4"
      >
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0 text-primary">Projects</h4>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => addItem('projects', { title: '', link: '', technologies: '', description: '' })}
          >
            + Add Project
          </button>
        </div>
        <div className="card-body">
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4 pb-4 border-bottom last-no-border">
              <div className="d-flex justify-content-end mb-2">
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeItem('projects', index)}
                >
                  Remove
                </button>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Project Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={project.title}
                    onChange={(e) => handleChange('projects', 'title', e.target.value, index)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Project Link (GitHub/Live)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={project.link}
                    onChange={(e) => handleChange('projects', 'link', e.target.value, index)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Technologies Used</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. React, Node.js, MongoDB"
                    value={project.technologies}
                    onChange={(e) => handleChange('projects', 'technologies', e.target.value, index)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={project.description}
                    onChange={(e) => handleChange('projects', 'description', e.target.value, index)}
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certificates */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card mb-4"
      >
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0 text-primary">Certificates</h4>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => addItem('certificates', { name: '', issuer: '', date: '' })}
          >
            + Add Certificate
          </button>
        </div>
        <div className="card-body">
          {data.certificates.map((cert, index) => (
            <div key={index} className="mb-4 pb-4 border-bottom last-no-border">
              <div className="d-flex justify-content-end mb-2">
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeItem('certificates', index)}
                >
                  Remove
                </button>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Certificate Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cert.name}
                    onChange={(e) => handleChange('certificates', 'name', e.target.value, index)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Issuing Organization</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cert.issuer}
                    onChange={(e) => handleChange('certificates', 'issuer', e.target.value, index)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={cert.date}
                    onChange={(e) => handleChange('certificates', 'date', e.target.value, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card mb-4"
      >
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0 text-primary">Skills</h4>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => addItem('skills', { name: '' })}
          >
            + Add Skill
          </button>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="col-md-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Skill name"
                    value={skill.name}
                    onChange={(e) => handleChange('skills', 'name', e.target.value, index)}
                  />
                  <button 
                    className="btn btn-outline-danger"
                    onClick={() => removeItem('skills', index)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
