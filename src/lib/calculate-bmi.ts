
/**
 * Calculates Body Mass Index (BMI) based on weight and height
 * @param weight Weight in kilograms
 * @param height Height in centimeters
 * @returns BMI value
 */
export const calculateBMI = (weight: number, height: number): number => {
  // Convert height from cm to meters
  const heightInMeters = height / 100;
  
  // BMI formula: weight (kg) / (height (m))²
  return weight / (heightInMeters * heightInMeters);
};

/**
 * Gets the BMI category based on the BMI value
 * @param bmi BMI value
 * @returns Category description
 */
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
};
