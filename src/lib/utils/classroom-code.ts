/**
 * Generates a random classroom code of 6-8 characters
 * @returns A random classroom code (uppercase alphanumeric)
 */
export function generateClassroomCode(): string {
  // Define characters to use in the code (avoiding similar looking chars like O/0, I/1, etc.)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const codeLength = 6; // 6 character code
  
  let code = '';
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars.charAt(randomIndex);
  }
  
  return code;
}

/**
 * Validates if a classroom code is in the correct format
 * @param code The code to validate
 * @returns True if the code is valid, false otherwise
 */
export function isValidClassroomCode(code: string): boolean {
  // Code should be 6-8 characters, uppercase alphanumeric
  const codeRegex = /^[A-Z0-9]{6,8}$/;
  return codeRegex.test(code);
} 