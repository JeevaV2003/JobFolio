import React from "react";
import { motion } from "framer-motion";
import JobCard from "./JobCard";

export default function JobList({ jobs, onRetry, query }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="no-results"
      >
        {query ? (
          <>
            <div className="mb-4">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted mb-3">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
                <path d="M8 11l3 3 5-5"/>
              </svg>
            </div>
            <h3>No jobs found</h3>
            <p className="lead mb-4">
              We couldn't find any jobs matching your search criteria. 
              Try adjusting your filters or using different keywords.
            </p>
            <motion.button 
              className="retry-button" 
              onClick={onRetry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                <polyline points="23 4 23 10 17 10"/>
                <polyline points="1 20 1 14 7 14"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
              Try Again
            </motion.button>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted mb-3">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3>Ready to find your next job?</h3>
            <p className="lead">
              Use the search form above to discover thousands of job opportunities 
              across various industries and locations.
            </p>
          </div>
        )}
      </motion.div>
    );
  }

  return ( 
    <div className="jobs-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="results-header mb-4"
      >
        <h3 className="results-title">
          Found <span className="text-gradient-primary">{jobs.length}</span> job{jobs.length !== 1 ? 's' : ''}
        </h3>
        <p className="results-subtitle text-muted">
          {query && `Search results for "${query}"`}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="row g-4"
      >
        {jobs.map((job, index) => (
          <motion.div 
            key={job.job_id ?? job.id ?? job.job_id_raw ?? job.url} 
            className="col-sm-12 col-md-6 col-lg-4"
            variants={itemVariants}
          >
            <JobCard job={job} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
