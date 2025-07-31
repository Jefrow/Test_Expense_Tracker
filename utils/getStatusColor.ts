// src/utils/getStatusColor.ts

const getStatusColor = (percentage: number): string => {
  if (percentage >= 90) return "text-red-600 bg-red-50";
  if (percentage >= 70) return "text-yellow-600 bg-yellow-50";
  return "text-green-600 bg-green-50";
};

export default getStatusColor;
