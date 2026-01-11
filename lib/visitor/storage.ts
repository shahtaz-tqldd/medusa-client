import { VisitorSession } from './types';

// Storage keys
const STORAGE_KEYS = {
  VISITOR_ID: 'visitor_id',
  SESSION_DATA: 'visitor_session',
} as const;

/**
 * Visitor Storage Manager
 * Handles all localStorage/sessionStorage operations for visitor tracking
 */
export class VisitorStorage {
  /**
   * Get visitor ID from localStorage
   */
  static getVisitorId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
  }

  /**
   * Store visitor ID in localStorage (persistent)
   */
  static setVisitorId(visitorId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.VISITOR_ID, visitorId);
  }

  /**
   * Get current session data
   */
  static getSessionData(): VisitorSession | null {
    if (typeof window === 'undefined') return null;
    
    const data = sessionStorage.getItem(STORAGE_KEYS.SESSION_DATA);
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  /**
   * Store session data (cleared when browser tab closes)
   */
  static setSessionData(session: VisitorSession): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(STORAGE_KEYS.SESSION_DATA, JSON.stringify(session));
  }

  /**
   * Check if visitor has been initialized in current session
   */
  static isSessionInitialized(): boolean {
    const session = this.getSessionData();
    return session !== null;
  }

  /**
   * Clear all visitor data (for testing/debugging)
   */
  static clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.VISITOR_ID);
    sessionStorage.removeItem(STORAGE_KEYS.SESSION_DATA);
  }
}
