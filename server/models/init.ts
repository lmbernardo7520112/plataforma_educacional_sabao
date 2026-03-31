// server/models/init.ts

import './Classroom.ts';
import './Squad.ts';
import './JourneyState.ts';

/**
 * Initializes all Mongoose models.
 * Importing each model file ensures they are registered with Mongoose
 * before any query attempts to reference them.
 */
export default async function dbInit(): Promise<void> {
  console.log('✅ All Mongoose models registered (Classroom, Squad, JourneyState)');
}
