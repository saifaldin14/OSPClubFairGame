import { db, realtimeDb } from './config'
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore'
import {
  ref,
  push,
  set,
  get,
  remove,
  update,
  serverTimestamp as rtdbServerTimestamp
} from 'firebase/database'

/**
 * Save game result to Firestore
 * @param {Array} choices - Array of choices made during the game
 * @param {Object} consequences - Object with stress, hunger, education, health values
 * @returns {Promise<string>} Document ID of saved game
 */
export const saveGameResult = async (choices, consequences) => {
  try {
    const totalScore = Object.values(consequences).reduce((a, b) => a + b, 0)
    
    const docRef = await addDoc(collection(db, 'gameResults'), {
      choices: choices.map(c => ({
        id: c.id,
        text: c.text,
        emoji: c.emoji,
        impact: c.impact
      })),
      consequences,
      totalScore,
      timestamp: new Date(),
      userAgent: navigator.userAgent
    })
    
    console.log('Game result saved with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Error saving game result:', error)
    throw error
  }
}

/**
 * Get recent game results
 * @param {number} limitCount - Number of results to fetch
 * @returns {Promise<Array>} Array of game results
 */
export const getRecentGameResults = async (limitCount = 10) => {
  try {
    const q = query(
      collection(db, 'gameResults'),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    )
    
    const querySnapshot = await getDocs(q)
    const results = []
    
    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    return results
  } catch (error) {
    console.error('Error getting game results:', error)
    throw error
  }
}

/**
 * Save contact form submission
 * @param {Object} contactData - Contact form data
 * @returns {Promise<string>} Document ID
 */
export const saveContactForm = async (contactData) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...contactData,
      timestamp: new Date(),
      status: 'new'
    })
    
    console.log('Contact form saved with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Error saving contact form:', error)
    throw error
  }
}

/**
 * Save donation interest
 * @param {Object} donationData - Donation form data
 * @returns {Promise<string>} Document ID
 */
export const saveDonationInterest = async (donationData) => {
  try {
    const docRef = await addDoc(collection(db, 'donations'), {
      ...donationData,
      timestamp: new Date(),
      status: 'pending'
    })
    
    console.log('Donation interest saved with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Error saving donation interest:', error)
    throw error
  }
}

/**
 * Get game statistics
 * @returns {Promise<Object>} Statistics object
 */
export const getGameStatistics = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'gameResults'))
    
    let totalGames = 0
    let totalStress = 0
    let totalHunger = 0
    let totalEducation = 0
    let totalHealth = 0
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      totalGames++
      totalStress += data.consequences.stress || 0
      totalHunger += data.consequences.hunger || 0
      totalEducation += data.consequences.education || 0
      totalHealth += data.consequences.health || 0
    })
    
    return {
      totalGames,
      averageStress: totalGames > 0 ? Math.round(totalStress / totalGames) : 0,
      averageHunger: totalGames > 0 ? Math.round(totalHunger / totalGames) : 0,
      averageEducation: totalGames > 0 ? Math.round(totalEducation / totalGames) : 0,
      averageHealth: totalGames > 0 ? Math.round(totalHealth / totalGames) : 0
    }
  } catch (error) {
    console.error('Error getting statistics:', error)
    throw error
  }
}

/**
 * RAFFLE SERVICES (using Realtime Database)
 */

/**
 * Create a new raffle
 * @param {Object} raffleData - Raffle data (name, prize)
 * @returns {Promise<Object>} Created raffle with ID
 */
export const createRaffle = async (raffleData) => {
  try {
    const rafflesRef = ref(realtimeDb, 'raffles')
    const newRaffleRef = push(rafflesRef)
    
    const raffle = {
      ...raffleData,
      entries: [],
      winner: null,
      status: 'active',
      createdAt: Date.now()
    }
    
    await set(newRaffleRef, raffle)
    
    return {
      id: newRaffleRef.key,
      ...raffle
    }
  } catch (error) {
    console.error('Error creating raffle:', error)
    throw error
  }
}

/**
 * Get all raffles
 * @returns {Promise<Array>} Array of raffles
 */
export const getRaffles = async () => {
  try {
    const rafflesRef = ref(realtimeDb, 'raffles')
    const snapshot = await get(rafflesRef)
    
    if (!snapshot.exists()) {
      return []
    }
    
    const raffles = []
    snapshot.forEach((childSnapshot) => {
      raffles.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      })
    })
    
    // Sort by createdAt descending
    raffles.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    
    return raffles
  } catch (error) {
    console.error('Error getting raffles:', error)
    throw error
  }
}

/**
 * Add entry to a raffle
 * @param {string} raffleId - Raffle ID
 * @param {Object} entry - Entry data (name, email)
 * @returns {Promise<Object>} New entry
 */
export const addRaffleEntry = async (raffleId, entry) => {
  try {
    const raffleRef = ref(realtimeDb, `raffles/${raffleId}`)
    const snapshot = await get(raffleRef)
    
    if (!snapshot.exists()) {
      throw new Error('Raffle not found')
    }
    
    const raffle = snapshot.val()
    const currentEntries = raffle.entries || []
    
    const newEntry = {
      ...entry,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }
    
    await update(raffleRef, {
      entries: [...currentEntries, newEntry]
    })
    
    return newEntry
  } catch (error) {
    console.error('Error adding entry:', error)
    throw error
  }
}

/**
 * Delete entry from a raffle
 * @param {string} raffleId - Raffle ID
 * @param {number} entryId - Entry ID to delete
 * @returns {Promise<void>}
 */
export const deleteRaffleEntry = async (raffleId, entryId) => {
  try {
    const raffleRef = ref(realtimeDb, `raffles/${raffleId}`)
    const snapshot = await get(raffleRef)
    
    if (!snapshot.exists()) {
      throw new Error('Raffle not found')
    }
    
    const raffle = snapshot.val()
    const currentEntries = raffle.entries || []
    const updatedEntries = currentEntries.filter(entry => entry.id !== entryId)
    
    await update(raffleRef, {
      entries: updatedEntries
    })
  } catch (error) {
    console.error('Error deleting entry:', error)
    throw error
  }
}

/**
 * Update raffle with winner
 * @param {string} raffleId - Raffle ID
 * @param {Object} winner - Winner entry object
 * @returns {Promise<void>}
 */
export const setRaffleWinner = async (raffleId, winner) => {
  try {
    const raffleRef = ref(realtimeDb, `raffles/${raffleId}`)
    
    await update(raffleRef, {
      winner: winner,
      status: 'drawn'
    })
  } catch (error) {
    console.error('Error setting winner:', error)
    throw error
  }
}

/**
 * Reset raffle (clear winner)
 * @param {string} raffleId - Raffle ID
 * @returns {Promise<void>}
 */
export const resetRaffle = async (raffleId) => {
  try {
    const raffleRef = ref(realtimeDb, `raffles/${raffleId}`)
    
    await update(raffleRef, {
      winner: null,
      status: 'active'
    })
  } catch (error) {
    console.error('Error resetting raffle:', error)
    throw error
  }
}

/**
 * Delete a raffle
 * @param {string} raffleId - Raffle ID
 * @returns {Promise<void>}
 */
export const deleteRaffle = async (raffleId) => {
  try {
    const raffleRef = ref(realtimeDb, `raffles/${raffleId}`)
    await remove(raffleRef)
  } catch (error) {
    console.error('Error deleting raffle:', error)
    throw error
  }
}
