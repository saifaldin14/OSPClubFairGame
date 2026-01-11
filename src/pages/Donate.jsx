import { useState } from 'react'

function Donate() {
  const [amount, setAmount] = useState('')
  const [donationType, setDonationType] = useState('one-time')
  const [selectedProgram, setSelectedProgram] = useState('general')

  const predefinedAmounts = [25, 50, 100, 250, 500]

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you for your ${donationType} donation of $${amount} to ${selectedProgram}!`)
  }

  return (
    <div className="page donate-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Make a Donation</h1>
          <p className="page-subtitle">Your generosity changes lives</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="donate-content">
            <div className="donate-info">
              <h2>Why Your Donation Matters</h2>
              <p>
                Every donation to OSP directly impacts the life of an orphan. Your support provides:
              </p>
              <ul className="donation-impact-list">
                <li>✓ Nutritious meals and clean water</li>
                <li>✓ Safe shelter and clothing</li>
                <li>✓ Quality education and school supplies</li>
                <li>✓ Healthcare and medical treatment</li>
                <li>✓ Emotional and psychological support</li>
                <li>✓ A chance at a brighter future</li>
              </ul>
              
              <div className="donation-examples">
                <h3>What Your Donation Provides</h3>
                <div className="example-item">
                  <strong>$25</strong> - One week of nutritious meals
                </div>
                <div className="example-item">
                  <strong>$50</strong> - School supplies for one semester
                </div>
                <div className="example-item">
                  <strong>$100</strong> - Complete healthcare checkup
                </div>
                <div className="example-item">
                  <strong>$250</strong> - One month of comprehensive support
                </div>
                <div className="example-item">
                  <strong>$500</strong> - Full educational sponsorship for one year
                </div>
              </div>
            </div>

            <div className="donate-form-container">
              <form className="donate-form" onSubmit={handleSubmit}>
                <h3>Choose Your Donation</h3>
                
                <div className="form-group">
                  <label>Donation Type</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        value="one-time"
                        checked={donationType === 'one-time'}
                        onChange={(e) => setDonationType(e.target.value)}
                      />
                      One-Time
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        value="monthly"
                        checked={donationType === 'monthly'}
                        onChange={(e) => setDonationType(e.target.value)}
                      />
                      Monthly
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Select Program</label>
                  <select 
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="form-select"
                  >
                    <option value="general">General Fund (Where Most Needed)</option>
                    <option value="sponsorship">Orphan Sponsorship</option>
                    <option value="education">Education Fund</option>
                    <option value="medical">Medical Care</option>
                    <option value="ramadan">Ramadan Support</option>
                    <option value="emergency">Emergency Relief</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Donation Amount</label>
                  <div className="amount-buttons">
                    {predefinedAmounts.map(amt => (
                      <button
                        key={amt}
                        type="button"
                        className={`amount-btn ${amount === amt.toString() ? 'active' : ''}`}
                        onClick={() => setAmount(amt.toString())}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Or enter custom amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-input"
                    min="1"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  Donate ${amount || '0'} {donationType === 'monthly' ? 'Monthly' : 'Now'}
                </button>

                <p className="form-note">
                  🔒 Your donation is secure and tax-deductible. 100% of your donation 
                  goes directly to supporting orphans.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Other Ways to Give</h2>
          <div className="giving-options">
            <div className="option-card">
              <h3>Zakat</h3>
              <p>Your Zakat is eligible and can make a tremendous difference in the lives of orphans.</p>
            </div>
            <div className="option-card">
              <h3>Sadaqah Jariyah</h3>
              <p>Invest in ongoing charity that continues to benefit orphans for years to come.</p>
            </div>
            <div className="option-card">
              <h3>Corporate Giving</h3>
              <p>Partner with us through corporate sponsorship programs and employee matching.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Donate
