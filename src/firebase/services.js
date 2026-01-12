import { db } from './config'
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore'

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
