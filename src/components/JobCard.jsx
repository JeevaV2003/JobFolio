import React from "react";
import { motion } from "framer-motion";

function safe(field, fallback = "—") {
  return field || field === 0 ? field : fallback;
}

export default function JobCard({ job }) {

  const title = job.title ?? job.job_title ?? job.position ?? job.job_title_raw ?? "Unknown title";
  const company = job.company_name ?? job.company ?? job.employer_name ?? job.employer?.name ?? job.job_company ?? "Unknown company";
  const location = job.job_city ?? job.location ?? job.job_location ?? job.job_city_raw ?? "Remote / Unknown";
  const type = job.job_employment_type ?? job.job_type ?? job.employment_type ?? job.job_schedule_type ?? "N/A";
  const applyUrl = job.job_apply_link ?? job.url ?? job.apply_url ?? job.job_link ?? "#";

  // Get company logo or use default
  const companyLogo = job.company_logo ?? job.logo_url ?? job.employer_logo ?? job.company_logo_url ?? null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="job-card"
    >
      <div className="d-flex flex-column h-100">
        {/* Company Logo and Info */}
        <div className="d-flex align-items-start mb-3">
          {companyLogo && (
            <img 
              src={companyLogo} 
              alt={`${safe(company)} logo`}
              className="company-logo me-3"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <div className="flex-grow-1">
            <h5 className="job-title">{safe(title)}</h5>
            <h6 className="job-company">{safe(company)}</h6>
          </div>
        </div>

        {/* Job Details */}
        <div className="job-details mb-3">
          <div className="job-badges">
            <span className="job-badge type">{safe(type)}</span>
            <span className="job-badge location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-1">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {safe(location)}
            </span>
          </div>
        </div>

        {/* Job Description Preview */}
        {job.job_description && (
          <div className="job-description-preview mb-3">
            <p className="small text-muted mb-0">
              {job.job_description.substring(0, 120)}
              {job.job_description.length > 120 ? "..." : ""}
            </p>
          </div>
        )}

        {/* Apply Button */}
        <div className="mt-auto">
          <motion.a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="job-apply-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            Apply Now
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
