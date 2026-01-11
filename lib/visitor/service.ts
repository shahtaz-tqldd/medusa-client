import { VisitorStorage } from './storage';
import { initializeVisitorOnBackend } from './api';
import { VisitorSession } from './types';

/**
 * Main Visitor Service
 * Handles the complete visitor tracking lifecycle
 */
export class VisitorService {
  private static initializationPromise: Promise<void> | null = null;

  /**
   * Initialize visitor tracking
   * - Idempotent: safe to call multiple times
   * - Only runs once per session
   * - Handles both new and returning visitors
   */
  static async initialize(): Promise<void> {
    // Prevent multiple simultaneous initializations
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    // Check if already initialized in this session
    if (VisitorStorage.isSessionInitialized()) {
      return;
    }

    this.initializationPromise = this.performInitialization();
    
    try {
      await this.initializationPromise;
    } finally {
      this.initializationPromise = null;
    }
  }

  /**
   * Perform the actual initialization
   */
  private static async performInitialization(): Promise<void> {
    try {
      const existingVisitorId = VisitorStorage.getVisitorId();
      
      // Call backend to initialize or update visitor
      const response = await initializeVisitorOnBackend(existingVisitorId);

      if (!response.success) {
        throw new Error('Backend returned unsuccessful response');
      }

      // Store visitor ID for new visitors
      if (!existingVisitorId && response.data.visitor_id) {
        VisitorStorage.setVisitorId(response.data.visitor_id);
      }

      // Create session data
      const session: VisitorSession = {
        visitor_id: response.data.visitor_id,
        initialized_at: Date.now(),
        visit_count: response.data.visit_count,
      };

      VisitorStorage.setSessionData(session);

    } catch (error) {
      console.error('Visitor initialization failed:', error);
      // Don't throw - allow the app to continue even if tracking fails
    }
  }

  /**
   * Get current visitor ID
   */
  static getVisitorId(): string | null {
    return VisitorStorage.getVisitorId();
  }

  /**
   * Get current session data
   */
  static getSession(): VisitorSession | null {
    return VisitorStorage.getSessionData();
  }

  /**
   * Check if visitor is initialized
   */
  static isInitialized(): boolean {
    return VisitorStorage.isSessionInitialized();
  }

  /**
   * Reset visitor data (for testing/debugging)
   */
  static reset(): void {
    VisitorStorage.clear();
  }
}
