import React, { useState, useRef } from 'react';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import './JobPostForm.css';

const JobPostForm = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [step, setStep] = useState(1);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const tags = ['Photoshop', 'HTML', 'Essay Writing', 'CSS', 'JavaScript'];

  // Scroll to top when going from step 1 to step 2
  const nextStep = () => {
    setStep((prev) => {
      const next = Math.min(prev + 1, 4);
      if (prev === 1 && next === 2) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10);
      }
      return next;
    });
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleAttachmentChange = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Job Submitted!');
  };

  return (
    <div className="job-form-wrapper">
      <form className="job-form-container" onSubmit={handleSubmit}>
        <div className="post-job-actions-bar">
          <div className="post-job-actions-inner">
            <div className="post-job-gradient-text">Create a job </div>
          </div>
        </div>
        {/* Step 1: Job Details, Description, Attachment */}
        {step === 1 && (
          <div className="job-form-card">
            <SectionTitle title="Add Job Details & Description" />
            <div className="job-form-grid">
              <InputField label="Job Title" placeholder="e.g., Design a University Event Poster" />
              <SelectField label="Category" options={['Graphic Design', 'Writing', 'Web Development', 'Tutoring']} />
              <InputField label="Deadline" type="date" />
              <SelectField label="Estimated Duration" options={['Less than 1 hour', '1–5 hours', '1 day', '2–3 days', '1 week']} />
            </div>
            <div className="job-form-column">
              <TextAreaField label="Detailed Job Description" placeholder="Clear instructions, deliverables, references..." />
              <div className="custom-attachment-wrapper">
                <Label text="Attachments" />
                <button
                  type="button"
                  className="custom-attachment-btn"
                  onClick={handleAttachmentClick}
                >
                  + Add Attachments
                </button>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleAttachmentChange}
                />
                {attachments.length > 0 && (
                  <ul className="attachment-list">
                    {Array.from(attachments).map((file, idx) => (
                      <li key={idx}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Skills & Experience */}
        {step === 2 && (
          <div className="job-form-card">
            <SectionTitle title="Skills & Experience" />
            <div className="job-form-column">
              <div>
                <Label text="Required Skills" />
                <div className="tag-list">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`tag ${selectedTags.includes(tag) ? 'tag-selected' : ''}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <Label text="Preferred Experience Level" />
                <div className="job-form-radio">
                  <RadioButton name="experience" value="beginner" label="Beginner" />
                  <RadioButton name="experience" value="intermediate" label="Intermediate" />
                  <RadioButton name="experience" value="expert" label="Expert" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Budget & Payment */}
        {step === 3 && (
          <div className="job-form-card">
            <SectionTitle title="Budget & Payment" />
            <div className="job-form-grid">
              <InputField label="Budget (in BDT)" type="number" placeholder="Enter amount" />
              <div>
                <Label text="Budget Type" />
                <div className="job-form-radio">
                  <RadioButton name="budgetType" value="fixed" label="Fixed Price" />
                  <RadioButton name="budgetType" value="hourly" label="Hourly Rate" />
                </div>
              </div>
              <div className="job-form-grid-full">
                <p className="job-form-note">
                  <strong>Escrow Notice:</strong> You will pay now. Funds will be held securely by SETU until the work is marked as complete.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Location & Final Confirmation */}
        {step === 4 && (
          <div className="job-form-card">
            <SectionTitle title="Preferred Location & Final Confirmation" />
            <div className="job-form-grid">
              <SelectField label="Preferred Region" options={['Dhaka', 'Chittagong', 'Online Only']} />
              <div>
                <Label text="Time Commitment Preference" />
                <div className="job-form-column">
                  <RadioButton name="time" value="flexible" label="Flexible" />
                  <RadioButton name="time" value="daily" label="Needs daily updates" />
                  <RadioButton name="time" value="specific" label="Specific working hours" />
                </div>
              </div>
            </div>
            <div className="job-form-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to SETU’s Terms of Use and understand that communication must stay within the platform.
              </label>
            </div>
          </div>
        )}

        {/* Step Navigation Buttons */}
        <div className="submit-container nav-right">
          {step > 1 && (
            <button type="button" className="submit-btn secondary" onClick={prevStep}>
              Back
            </button>
          )}
          {step < 4 ? (
            <button type="button" className="submit-btn" onClick={nextStep}>
              Next
            </button>
          ) : (
            <button type="submit" className="submit-btn">
              Submit Job
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// Reusable Components
const SectionTitle = ({ title }) => <h2 className="section-title">{title}</h2>;

const InputField = ({ label, type = 'text', placeholder, multiple }) => (
  <div>
    <Label text={label} />
    <input type={type} placeholder={placeholder} multiple={multiple} className="input-field" />
  </div>
);

const SelectField = ({ label, options }) => (
  <div>
    <Label text={label} />
    <select className="input-field">
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt.toLowerCase().replace(/\s+/g, '')}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, placeholder }) => (
  <div>
    <Label text={label} />
    <textarea placeholder={placeholder} rows={5} className="input-field"></textarea>
  </div>
);

const RadioButton = ({ name, value, label }) => (
  <label className="radio-label">
    <input type="radio" name={name} value={value} />
    <span>{label}</span>
  </label>
);

const Label = ({ text }) => <label className="field-label">{text}</label>;

export default JobPostForm;