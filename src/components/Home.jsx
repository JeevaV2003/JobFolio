import React, { useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import JobList from "./JobList";
import Spinner from "./Spinner";

export default function Home() {
  const [query, setQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // ✅ Dropdown options
  const jobTitles = [
    "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "React Developer", "Python Developer", "Java Developer", "UI/UX Designer",
    "DevOps Engineer", "Data Analyst", "Data Scientist", "Machine Learning Engineer",
    "Marketing Executive", "Sales Manager", "HR Executive", "Content Writer",
    "Graphic Designer", "Digital Marketing Specialist", "Product Manager"
  ];

  const mainCities = [
    "Bangalore", "Hyderabad", "Chennai", "Pune", "Mumbai", 
    "Delhi", "Noida", "Gurgaon", "Kolkata", "Ahmedabad"
  ];

  const handleSearch = async (e) => {
    e?.preventDefault();
    const searchQuery = [query.trim(), skillFilter.trim(), locationFilter.trim()]
      .filter(Boolean)
      .join(" ");

    if (!searchQuery) {
      setJobs([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setActiveFilter("all"); // Reset filter on new search
    
    try {
      const searchStrategies = [
        { query: searchQuery, num_pages: 3, page: 1 },
        ...(query.trim() ? [{ query: query.trim(), num_pages: 2, page: 1 }] : [])
      ].filter(strategy => strategy.query.trim());

      const apiPromises = searchStrategies.map(async (strategy) => {
        try {
          const res = await axios.get("https://jsearch.p.rapidapi.com/search", {
            params: strategy,
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
              "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
            },
          });
          return res.data?.data ?? res.data?.results ?? [];
        } catch (strategyErr) {
          console.warn(`Strategy "${strategy.query}" failed:`, strategyErr.message);
          return [];
        }
      });

      const results = await Promise.all(apiPromises);
      let allJobs = results.flat();
      
      const uniqueJobs = allJobs.filter((job, index, self) => {
        const identifier = job.job_id ?? job.id ?? job.job_id_raw ?? job.url;
        return identifier && index === self.findIndex(j => 
          (j.job_id ?? j.id ?? j.job_id_raw ?? j.url) === identifier
        );
      });
      
      setJobs(uniqueJobs);
    } catch (err) {
      console.error("Search error:", err);
      setError(
        err.response?.data?.message ??
          err.message ??
          "Something went wrong while fetching jobs."
      );
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  const filteredJobs = useMemo(() => {
    if (activeFilter === "all") return jobs;
    
    return jobs.filter(job => {
      const jobDate = new Date(job.job_posted_at_datetime_utc).getTime();
      const now = new Date().getTime();
      const diffHours = (now - jobDate) / (1000 * 60 * 60);
      const diffDays = diffHours / 24;

      if (activeFilter === "last24h") return diffHours <= 24;
      if (activeFilter === "last3days") return diffDays <= 3;
      if (activeFilter === "lastweek") return diffDays <= 7;
      
      if (activeFilter === "remote") return job.job_is_remote;
      if (activeFilter === "fulltime") return job.job_employment_type?.toLowerCase().includes("full");
      if (activeFilter === "parttime") return job.job_employment_type?.toLowerCase().includes("part");
      return true;
    }).sort((a, b) => {
      // Always sort by date for better UX
      const dateA = new Date(a.job_posted_at_datetime_utc).getTime();
      const dateB = new Date(b.job_posted_at_datetime_utc).getTime();
      return dateB - dateA;
    });
  }, [jobs, activeFilter]);

  return (
    <div className="min-vh-100">
      <header className="hero-section-modern">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="display-3 fw-bold mb-4 hero-title-modern">
                  Discover Your <br/>
                  <span className="text-gradient-modern">Next Career Move</span>
                </h1>
                <p className="lead mb-5 text-secondary">
                  Connect with top employers and find opportunities that match your skills and aspirations.
                </p>
                <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                  <div className="stat-pill">
                    <span className="fw-bold text-primary">10k+</span> Jobs
                  </div>
                  <div className="stat-pill">
                    <span className="fw-bold text-primary">500+</span> Companies
                  </div>
                  <div className="stat-pill">
                    <span className="fw-bold text-primary">100%</span> Free
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="search-card-modern"
              >
                <form onSubmit={handleSearch}>
                  <h3 className="mb-4 fw-bold">Find your perfect job</h3>
                  
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-uppercase text-muted">Role</label>
                    <select
                      className="form-select form-select-lg"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    >
                      <option value="">Select Job Title...</option>
                      {jobTitles.map((title, idx) => (
                        <option key={idx} value={title}>{title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-uppercase text-muted">Skills</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="e.g. React, Python"
                      value={skillFilter}
                      onChange={(e) => setSkillFilter(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-uppercase text-muted">Location</label>
                    <select
                      className="form-select form-select-lg"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    >
                      <option value="">Select Location...</option>
                      {mainCities.map((city, idx) => (
                        <option key={idx} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-lg w-100 fw-bold search-btn-modern"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Searching...' : 'Search Jobs'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <main className="container my-5">
        {loading && (
          <div className="my-5">
            <Spinner />
          </div>
        )}

        {error && (
          <div className="alert alert-danger shadow-sm border-0 rounded-3">
            {error}
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <div className="filter-sidebar sticky-top" style={{ top: '100px' }}>
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold mb-0">Filters</h5>
                      {activeFilter !== 'all' && (
                        <button 
                          className="btn btn-link btn-sm text-decoration-none p-0"
                          onClick={() => setActiveFilter('all')}
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="filter-group mb-4">
                      <label className="small fw-bold text-uppercase text-muted mb-3">Date Posted</label>
                      <div className="d-flex flex-column gap-2">
                        <label className="filter-radio-item">
                          <input 
                            type="radio" 
                            name="filter" 
                            checked={activeFilter === 'last24h'}
                            onChange={() => setActiveFilter('last24h')}
                          />
                          <span className="ms-2">Last 24 Hours</span>
                        </label>
                        <label className="filter-radio-item">
                          <input 
                            type="radio" 
                            name="filter" 
                            checked={activeFilter === 'last3days'}
                            onChange={() => setActiveFilter('last3days')}
                          />
                          <span className="ms-2">Last 3 Days</span>
                        </label>
                        <label className="filter-radio-item">
                          <input 
                            type="radio" 
                            name="filter" 
                            checked={activeFilter === 'lastweek'}
                            onChange={() => setActiveFilter('lastweek')}
                          />
                          <span className="ms-2">Last Week</span>
                        </label>
                      </div>
                    </div>

                    <div className="filter-group mb-4">
                      <label className="small fw-bold text-uppercase text-muted mb-3">Job Type</label>
                      <div className="d-flex flex-column gap-2">
                        <label className="filter-radio-item">
                          <input 
                            type="radio" 
                            name="filter" 
                            checked={activeFilter === 'fulltime'}
                            onChange={() => setActiveFilter('fulltime')}
                          />
                          <span className="ms-2">Full Time</span>
                        </label>
                        <label className="filter-radio-item">
                          <input 
                            type="radio" 
                            name="filter" 
                            checked={activeFilter === 'parttime'}
                            onChange={() => setActiveFilter('parttime')}
                          />
                          <span className="ms-2">Part Time</span>
                        </label>
                      </div>
                    </div>

                    <div className="filter-group">
                      <label className="small fw-bold text-uppercase text-muted mb-3">Remote</label>
                      <div className="d-flex flex-column gap-2">
                        <label className="filter-radio-item">
                          <input 
                            type="radio" 
                            name="filter" 
                            checked={activeFilter === 'remote'}
                            onChange={() => setActiveFilter('remote')}
                          />
                          <span className="ms-2">Remote Only</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="col-lg-9">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">
                  Found <span className="text-primary">{filteredJobs.length}</span> Jobs
                </h4>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <JobList jobs={filteredJobs} onRetry={handleSearch} query={query} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
