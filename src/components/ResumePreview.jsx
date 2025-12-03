import React, { forwardRef } from 'react';

const ResumePreview = forwardRef(({ data }, ref) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div ref={ref} className="resume-preview-content bg-white p-5">
      {/* Header */}
      <div className="border-bottom pb-4 mb-4">
        <h1 className="fw-bold text-uppercase mb-2" style={{ color: '#0f172a' }}>
          {data.personal.fullName || 'Your Name'}
        </h1>
        <div className="d-flex flex-wrap gap-3 text-muted small">
          {data.personal.email && (
            <span>📧 {data.personal.email}</span>
          )}
          {data.personal.phone && (
            <span>📱 {data.personal.phone}</span>
          )}
          {data.personal.address && (
            <span>📍 {data.personal.address}</span>
          )}
          {data.personal.linkedin && (
            <span>🔗 {data.personal.linkedin}</span>
          )}
          {data.personal.github && (
            <span>💻 {data.personal.github}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personal.summary && (
        <div className="mb-4">
          <h5 className="text-uppercase fw-bold border-bottom pb-2 mb-3" style={{ color: '#3b82f6' }}>
            Professional Summary
          </h5>
          <p>{data.personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-4">
          <h5 className="text-uppercase fw-bold border-bottom pb-2 mb-3" style={{ color: '#3b82f6' }}>
            Experience
          </h5>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="d-flex justify-content-between align-items-baseline">
                <h6 className="fw-bold mb-1">{exp.title}</h6>
                <span className="text-muted small">
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                </span>
              </div>
              <div className="text-muted mb-2 fw-medium">{exp.company}</div>
              <p className="small mb-0">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-4">
          <h5 className="text-uppercase fw-bold border-bottom pb-2 mb-3" style={{ color: '#3b82f6' }}>
            Education
          </h5>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="d-flex justify-content-between align-items-baseline">
                <h6 className="fw-bold mb-1">{edu.institute}</h6>
                <span className="text-muted small">{edu.year}</span>
              </div>
              <div className="fw-medium">{edu.degree}</div>
              {edu.grade && (
                <div className="small text-muted">Grade: {edu.grade}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-4">
          <h5 className="text-uppercase fw-bold border-bottom pb-2 mb-3" style={{ color: '#3b82f6' }}>
            Projects
          </h5>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="d-flex justify-content-between align-items-baseline">
                <h6 className="fw-bold mb-1">
                  {project.title}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="ms-2 small text-decoration-none">
                      🔗 Link
                    </a>
                  )}
                </h6>
              </div>
              {project.technologies && (
                <div className="small text-muted mb-1">
                  <strong>Tech Stack:</strong> {project.technologies}
                </div>
              )}
              <p className="small mb-0">{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certificates */}
      {data.certificates.length > 0 && (
        <div className="mb-4">
          <h5 className="text-uppercase fw-bold border-bottom pb-2 mb-3" style={{ color: '#3b82f6' }}>
            Certificates
          </h5>
          {data.certificates.map((cert, index) => (
            <div key={index} className="mb-2">
              <div className="d-flex justify-content-between align-items-baseline">
                <h6 className="fw-bold mb-1">{cert.name}</h6>
                <span className="text-muted small">{formatDate(cert.date)}</span>
              </div>
              <div className="small text-muted">{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-4">
          <h5 className="text-uppercase fw-bold border-bottom pb-2 mb-3" style={{ color: '#3b82f6' }}>
            Skills
          </h5>
          <div className="d-flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span 
                key={index} 
                className="badge bg-light text-dark border"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default ResumePreview;
