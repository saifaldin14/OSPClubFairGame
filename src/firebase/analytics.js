import { analytics } from './config'
import { logEvent } from 'firebase/analytics'

/**
 * Track when user starts the game
 */
export const trackGameStart = () => {
  if (analytics) {
    logEvent(analytics, 'game_started', {
      timestamp: new Date().toISOString()
    })
  }
}

/**
 * Track when user completes the game
 * @param {Object} consequences - Final consequence values
 * @param {Array} choices - Choices made during the game
 */
export const trackGameComplete = (consequences, choices) => {
  if (analytics) {
    const totalScore = Object.values(consequences).reduce((a, b) => a + b, 0)
    
    logEvent(analytics, 'game_completed', {
      total_score: totalScore,
      stress_level: consequences.stress,
      hunger_level: consequences.hunger,
      education_level: consequences.education,
      health_level: consequences.health,
      choices_count: choices.length,
      timestamp: new Date().toISOString()
    })
  }
}

/**
 * Track when user makes a choice
 * @param {string} stage - Game stage (choice1, choice2, choice3)
 * @param {Object} choice - The choice object
 */
export const trackChoice = (stage, choice) => {
  if (analytics) {
    logEvent(analytics, 'choice_made', {
      stage,
      choice_id: choice.id,
      choice_text: choice.text,
      impact: choice.impact,
      timestamp: new Date().toISOString()
    })
  }
}

/**
 * Track when user clicks donate button
 * @param {string} source - Where the button was clicked (game_end, navbar, etc.)
 */
export const trackDonateClick = (source = 'unknown') => {
  if (analytics) {
    logEvent(analytics, 'donate_click', {
      source,
      timestamp: new Date().toISOString()
    })
  }
}

/**
 * Track when user shares the game
 * @param {string} method - Share method (social_media, friends, etc.)
 */
export const trackShare = (method) => {
  if (analytics) {
    logEvent(analytics, 'game_shared', {
      method,
      timestamp: new Date().toISOString()
    })
  }
}

/**
 * Track page views
 * @param {string} pageName - Name of the page
 */
export const trackPageView = (pageName) => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_name: pageName,
      timestamp: new Date().toISOString()
    })
  }
}

/**
 * Track when user resets/restarts the game
 */
export const trackGameReset = () => {
  if (analytics) {
    logEvent(analytics, 'game_reset', {
      timestamp: new Date().toISOString()
    })
  }
}

/**
 * Track contact form submission
 */
export const trackContactSubmit = () => {
  if (analytics) {
    logEvent(analytics, 'contact_form_submitted', {
      timestamp: new Date().toISOString()
    })
  }
}
