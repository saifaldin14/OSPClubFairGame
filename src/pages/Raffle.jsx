 import { useState, useEffect } from 'react'
import { Ticket, Users, Trophy, Play, RotateCcw, Download, Image as ImageIcon, Info, X } from 'lucide-react'
import { 
  createRaffle, 
  getRaffles, 
  addRaffleEntry, 
  deleteRaffleEntry,
  setRaffleWinner,
  resetRaffle as resetRaffleService,
  deleteRaffle as deleteRaffleService 
} from '../firebase/services'

function Raffle() {
  const [raffles, setRaffles] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeRaffle, setActiveRaffle] = useState(null)
  const [newRaffleName, setNewRaffleName] = useState('')
  const [newRafflePrize, setNewRafflePrize] = useState('')
  const [prizeImage, setPrizeImage] = useState(null)
  const [prizeImagePreview, setPrizeImagePreview] = useState(null)
  const [newEntryName, setNewEntryName] = useState('')
  const [newEntryEmail, setNewEntryEmail] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [activeTab, setActiveTab] = useState('add-entry')
  const [isDrawing, setIsDrawing] = useState(false)
  const [winner, setWinner] = useState(null)

  // Load raffles from Firebase on mount
  useEffect(() => {
    loadRaffles()
  }, [])

  const loadRaffles = async () => {
    try {
      setLoading(true)
      const data = await getRaffles()
      setRaffles(data)
    } catch (error) {
      console.error('Error loading raffles:', error)
      alert('Failed to load raffles. Please check your Firebase configuration.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('Image size should be less than 5MB')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setPrizeImage(reader.result)
        setPrizeImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const createNewRaffle = async (e) => {
    e.preventDefault()
    if (!newRaffleName || !newRafflePrize) return

    try {
      const newRaffle = await createRaffle({
        name: newRaffleName,
        prize: newRafflePrize,
        prizeImage: prizeImage || null
      })

      setRaffles([newRaffle, ...raffles])
      setNewRaffleName('')
      setNewRafflePrize('')
      setPrizeImage(null)
      setPrizeImagePreview(null)
      setShowCreateForm(false)
    } catch (error) {
      console.error('Error creating raffle:', error)
      alert('Failed to create raffle. Please try again.')
    }
  }

  const addEntry = async (e) => {
    e.preventDefault()
    if (!newEntryName || !newEntryEmail || !activeRaffle) return

    try {
      const entry = await addRaffleEntry(activeRaffle.id, {
        name: newEntryName,
        email: newEntryEmail
      })

      const updatedRaffles = raffles.map(raffle => {
        if (raffle.id === activeRaffle.id) {
          return {
            ...raffle,
            entries: [...(raffle.entries || []), entry]
          }
        }
        return raffle
      })

      setRaffles(updatedRaffles)
      setActiveRaffle({ ...activeRaffle, entries: [...(activeRaffle.entries || []), entry] })
      setNewEntryName('')
      setNewEntryEmail('')
    } catch (error) {
      console.error('Error adding entry:', error)
      alert('Failed to add entry. Please try again.')
    }
  }

  const drawWinner = async () => {
    if (!activeRaffle || (activeRaffle.entries || []).length === 0) return

    setIsDrawing(true)
    setWinner(null)

    // Simulate drawing animation
    let count = 0
    const maxCount = 20
    const interval = setInterval(() => {
      const entries = activeRaffle.entries || []
      const randomIndex = Math.floor(Math.random() * entries.length)
      setWinner(entries[randomIndex])
      count++

      if (count >= maxCount) {
        clearInterval(interval)
        const entries = activeRaffle.entries || []
        const finalWinner = entries[Math.floor(Math.random() * entries.length)]
        setWinner(finalWinner)
        
        // Update raffle with winner in Firebase
        setRaffleWinner(activeRaffle.id, finalWinner)
          .then(() => {
            const updatedRaffles = raffles.map(raffle => {
              if (raffle.id === activeRaffle.id) {
                return {
                  ...raffle,
                  winner: finalWinner,
                  status: 'drawn'
                }
              }
              return raffle
            })
            
            setRaffles(updatedRaffles)
            setActiveRaffle({ ...activeRaffle, winner: finalWinner, status: 'drawn' })
            setIsDrawing(false)
          })
          .catch(error => {
            console.error('Error saving winner:', error)
            alert('Winner drawn but failed to save. Please try again.')
            setIsDrawing(false)
          })
      }
    }, 100)
  }

  const handleResetRaffle = async (raffleId) => {
    try {
      await resetRaffleService(raffleId)
      
      const updatedRaffles = raffles.map(raffle => {
        if (raffle.id === raffleId) {
          return {
            ...raffle,
            winner: null,
            status: 'active'
          }
        }
        return raffle
      })
      
      setRaffles(updatedRaffles)
      if (activeRaffle && activeRaffle.id === raffleId) {
        setActiveRaffle({ ...activeRaffle, winner: null, status: 'active' })
        setWinner(null)
      }
    } catch (error) {
      console.error('Error resetting raffle:', error)
      alert('Failed to reset raffle. Please try again.')
    }
  }

  const handleDeleteRaffle = async (raffleId) => {
    if (!confirm('Are you sure you want to delete this raffle?')) return
    
    // PIN code verification
    const pinCode = prompt('Please enter PIN code to confirm deletion:')
    if (pinCode !== '1221') {
      alert('Incorrect PIN code. Deletion cancelled.')
      return
    }
    
    try {
      await deleteRaffleService(raffleId)
      
      setRaffles(raffles.filter(raffle => raffle.id !== raffleId))
      if (activeRaffle && activeRaffle.id === raffleId) {
        setActiveRaffle(null)
        setWinner(null)
      }
      alert('Raffle deleted successfully.')
    } catch (error) {
      console.error('Error deleting raffle:', error)
      alert('Failed to delete raffle. Please try again.')
    }
  }

  const handleDeleteEntry = async (entryId) => {
    if (!activeRaffle) return

    try {
      await deleteRaffleEntry(activeRaffle.id, entryId)
      
      const updatedRaffles = raffles.map(raffle => {
        if (raffle.id === activeRaffle.id) {
          return {
            ...raffle,
            entries: (raffle.entries || []).filter(entry => entry.id !== entryId)
          }
        }
        return raffle
      })

      setRaffles(updatedRaffles)
      setActiveRaffle({
        ...activeRaffle,
        entries: (activeRaffle.entries || []).filter(entry => entry.id !== entryId)
      })
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('Failed to delete entry. Please try again.')
    }
  }

  const exportEntries = (raffle) => {
    const csv = [
      ['Name', 'Email', 'Timestamp'],
      ...(raffle.entries || []).map(entry => [
        entry.name,
        entry.email,
        new Date(entry.timestamp).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${raffle.name.replace(/\s+/g, '_')}_entries.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="page raffle-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Enter for a Chance to Win!</h1>
          <p className="page-subtitle">Help support our causes and enter for a chance to win awesome prizes</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="raffle-content">
            
            {/* Raffle Management Section */}
            <div className="raffle-sidebar">
              <div className="sidebar-header">
                <h2>Raffles</h2>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  disabled={loading}
                >
                  {showCreateForm ? 'Cancel' : '+ New Raffle'}
                </button>
              </div>

              {showCreateForm && (
                <form onSubmit={createNewRaffle} className="create-raffle-form">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Raffle Name"
                      value={newRaffleName}
                      onChange={(e) => setNewRaffleName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Prize Description"
                      value={newRafflePrize}
                      onChange={(e) => setNewRafflePrize(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="image-upload-label">
                      <ImageIcon size={20} />
                      <span>{prizeImagePreview ? 'Change Prize Image' : 'Upload Prize Image (Optional)'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {prizeImagePreview && (
                      <div className="image-preview">
                        <img src={prizeImagePreview} alt="Prize preview" />
                        <button 
                          type="button" 
                          className="remove-image-btn"
                          onClick={() => {
                            setPrizeImage(null)
                            setPrizeImagePreview(null)
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">
                    Create Raffle
                  </button>
                </form>
              )}

              <div className="raffles-list">
                {loading ? (
                  <div className="empty-state">
                    <p>Loading raffles...</p>
                  </div>
                ) : raffles.length === 0 ? (
                  <div className="empty-state">
                    <Ticket size={48} />
                    <p>No raffles yet. Create your first raffle to get started!</p>
                  </div>
                ) : (
                  raffles.map(raffle => (
                    <div 
                      key={raffle.id}
                      className={`raffle-card ${activeRaffle?.id === raffle.id ? 'active' : ''}`}
                      onClick={() => setActiveRaffle(raffle)}
                    >
                      <div className="raffle-card-header">
                        <h3>{raffle.name}</h3>
                        <span className={`status-badge status-${raffle.status}`}>
                          {raffle.status}
                        </span>
                      </div>
                      <p className="raffle-prize">🏆 {raffle.prize}</p>
                      <div className="raffle-stats">
                        <span><Users size={16} /> {(raffle.entries || []).length} entries</span>
                        {raffle.winner && (
                          <span><Trophy size={16} /> Winner: {raffle.winner.name}</span>
                        )}
                      </div>
                      <div className="raffle-card-actions">
                        {raffle.status === 'drawn' && (
                          <button 
                            className="btn-icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleResetRaffle(raffle.id)
                            }}
                            title="Reset Raffle"
                          >
                            <RotateCcw size={16} />
                          </button>
                        )}
                        <button 
                          className="btn-icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            exportEntries(raffle)
                          }}
                          title="Export Entries"
                        >
                          <Download size={16} />
                        </button>
                        <button 
                          className="btn-icon btn-danger"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteRaffle(raffle.id)
                          }}
                          title="Delete Raffle"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Main Raffle Area */}
            <div className="raffle-main">
              {!activeRaffle ? (
                <div className="empty-state-large">
                  <Ticket size={80} />
                  <h2>Select a raffle to get started</h2>
                  <p>Choose a raffle from the list or create a new one</p>
                </div>
              ) : (
                <>
                  <div className="raffle-header">
                    <div>
                      <h2>{activeRaffle.name}</h2>
                      <p className="raffle-prize-large">Prize: {activeRaffle.prize}</p>
                    </div>
                    <div className="raffle-info">
                      <div className="info-card">
                        <Users size={24} />
                        <div>
                          <strong>{(activeRaffle.entries || []).length}</strong>
                          <span>Total Entries</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Winner Display */}
                  {activeRaffle.status === 'drawn' && activeRaffle.winner && (
                    <div className="winner-announcement">
                      <Trophy size={48} />
                      <h2>🎉 Winner 🎉</h2>
                      <div className="winner-details">
                        <h3>{activeRaffle.winner.name}</h3>
                        <p>{activeRaffle.winner.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Drawing Animation */}
                  {isDrawing && winner && (
                    <div className="drawing-animation">
                      <div className="drawing-card">
                        <h3>Drawing...</h3>
                        <div className="drawing-name">{winner.name}</div>
                      </div>
                    </div>
                  )}

                  {/* Tabs Navigation */}
                  <div className="tabs-container">
                    <div className="tabs-nav">
                      <button 
                        className={`tab-btn ${activeTab === 'add-entry' ? 'active' : ''}`}
                        onClick={() => setActiveTab('add-entry')}
                      >
                        <Users size={18} />
                        Add New Entry
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                      >
                        <Info size={18} />
                        Raffle Details
                      </button>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                      {/* Add Entry Tab */}
                      {activeTab === 'add-entry' && activeRaffle.status === 'active' && (
                        <div className="add-entry-section">
                          <div className="section-header">
                            <div className="header-icon">
                              <Users size={24} />
                            </div>
                            <div>
                              <h3>Add New Entry</h3>
                              <p>Enter participant information to join the raffle</p>
                            </div>
                          </div>
                          <form onSubmit={addEntry} className="entry-form">
                            <div className="form-grid">
                              <div className="input-wrapper">
                                <label htmlFor="entry-name">Full Name</label>
                                <input
                                  id="entry-name"
                                  type="text"
                                  placeholder="Enter full name"
                                  value={newEntryName}
                                  onChange={(e) => setNewEntryName(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="input-wrapper">
                                <label htmlFor="entry-email">Email Address</label>
                                <input
                                  id="entry-email"
                                  type="email"
                                  placeholder="Enter email address"
                                  value={newEntryEmail}
                                  onChange={(e) => setNewEntryEmail(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            <button type="submit" className="btn btn-add-entry">
                              <Users size={18} />
                              Add Entry to Raffle
                            </button>
                          </form>
                        </div>
                      )}

                      {activeTab === 'add-entry' && activeRaffle.status !== 'active' && (
                        <div className="tab-message">
                          <Trophy size={48} />
                          <p>This raffle has ended. You cannot add new entries.</p>
                        </div>
                      )}

                      {/* Details Tab */}
                      {activeTab === 'details' && (
                        <div className="details-section">
                          {activeRaffle.prizeImage && (
                            <div className="prize-image-container">
                              <img src={activeRaffle.prizeImage} alt={activeRaffle.prize} />
                            </div>
                          )}
                          <div className="detail-row">
                            <span className="detail-label">Raffle Name:</span>
                            <span className="detail-value">{activeRaffle.name}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Prize:</span>
                            <span className="detail-value">{activeRaffle.prize}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Status:</span>
                            <span className={`status-badge status-${activeRaffle.status}`}>
                              {activeRaffle.status}
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Total Entries:</span>
                            <span className="detail-value">{(activeRaffle.entries || []).length}</span>
                          </div>
                          {activeRaffle.winner && (
                            <>
                              <div className="detail-row">
                                <span className="detail-label">Winner:</span>
                                <span className="detail-value">{activeRaffle.winner.name}</span>
                              </div>
                              <div className="detail-row">
                                <span className="detail-label">Winner Email:</span>
                                <span className="detail-value">{activeRaffle.winner.email}</span>
                              </div>
                            </>
                          )}
                          <div className="detail-row">
                            <span className="detail-label">Created:</span>
                            <span className="detail-value">
                              {new Date(activeRaffle.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Draw Winner Button */}
                  {activeRaffle.status === 'active' && (activeRaffle.entries || []).length > 0 && (
                    <div className="draw-section">
                      <button 
                        className="btn btn-success btn-large"
                        onClick={drawWinner}
                        disabled={isDrawing}
                      >
                        <Play size={24} />
                        {isDrawing ? 'Drawing Winner...' : 'Draw Winner'}
                      </button>
                    </div>
                  )}

                  {/* Entries List */}
                  <div className="entries-section">
                    <h3>Entries ({(activeRaffle.entries || []).length})</h3>
                    {(activeRaffle.entries || []).length === 0 ? (
                      <div className="empty-state">
                        <Users size={48} />
                        <p>No entries yet. Add participants to start the raffle!</p>
                      </div>
                    ) : (
                      <div className="entries-list">
                        {(activeRaffle.entries || []).map((entry, index) => (
                          <div key={entry.id} className="entry-card">
                            <div className="entry-number">#{index + 1}</div>
                            <div className="entry-details">
                              <strong>{entry.name}</strong>
                              <span>{entry.email}</span>
                              <small>{new Date(entry.timestamp).toLocaleString()}</small>
                            </div>
                            {activeRaffle.status === 'active' && (
                              <button 
                                className="btn-icon btn-danger"
                                onClick={() => handleDeleteEntry(entry.id)}
                                title="Remove Entry"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Raffle
