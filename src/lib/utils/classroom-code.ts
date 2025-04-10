/**
 * Generates a random classroom code of the specified length
 * @param length The length of the code, defaults to 6
 * @returns A random alphanumeric code (uppercase letters and numbers only)
 */
export function generateClassroomCode(length = 6): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluding confusing characters like 0, 1, I, O
  let code = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
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