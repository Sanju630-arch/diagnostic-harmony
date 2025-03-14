
export interface TestItem {
  name: string;
  description?: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  tests: TestItem[];
  fasting: boolean;
  fastingHours?: number;
  tags: string[];
  popular: boolean;
  image: string;
}

export const packages: Package[] = [
  {
    id: "basic-health-checkup",
    name: "Basic Health Checkup",
    price: 1999,
    description: "A comprehensive health checkup package designed for routine health monitoring. Ideal for individuals aged 18-40 who want to ensure they're in good health.",
    shortDescription: "Essential tests for routine health monitoring",
    tests: [
      { name: "Complete Blood Count (CBC)" },
      { name: "Blood Glucose Fasting" },
      { name: "Lipid Profile" },
      { name: "Liver Function Test" },
      { name: "Kidney Function Test" },
      { name: "Urine Routine Examination" },
      { name: "Chest X-Ray" },
      { name: "ECG" }
    ],
    fasting: true,
    fastingHours: 8,
    tags: ["Routine", "Prevention", "Basic"],
    popular: true,
    image: "/placeholder.svg"
  },
  {
    id: "comprehensive-health-checkup",
    name: "Comprehensive Health Checkup",
    price: 3999,
    description: "An advanced health assessment package that includes all basic tests plus additional screenings. Recommended for individuals above 40 or those with family history of chronic diseases.",
    shortDescription: "Advanced assessment with additional screenings",
    tests: [
      { name: "All tests in Basic Health Checkup" },
      { name: "Thyroid Profile" },
      { name: "Vitamin B12 & D3" },
      { name: "HbA1c" },
      { name: "Ultrasound Abdomen" },
      { name: "PSA (for males)/Mammography (for females)" },
      { name: "Bone Density Scan" },
      { name: "Treadmill Test (TMT)" }
    ],
    fasting: true,
    fastingHours: 12,
    tags: ["Comprehensive", "Advanced", "Seniors"],
    popular: true,
    image: "/placeholder.svg"
  },
  {
    id: "cardiac-health-checkup",
    name: "Cardiac Health Checkup",
    price: 4500,
    description: "A specialized package focused on heart health assessment. Ideal for individuals with family history of heart diseases or those experiencing symptoms like chest pain, shortness of breath.",
    shortDescription: "Specialized assessment for heart health",
    tests: [
      { name: "Lipid Profile" },
      { name: "ECG" },
      { name: "Echocardiogram" },
      { name: "Treadmill Test (TMT)" },
      { name: "Chest X-Ray" },
      { name: "Homocysteine" },
      { name: "hs-CRP" },
      { name: "BNP" }
    ],
    fasting: true,
    fastingHours: 8,
    tags: ["Cardiac", "Heart", "Specialized"],
    popular: false,
    image: "/placeholder.svg"
  },
  {
    id: "diabetes-health-checkup",
    name: "Diabetes Health Checkup",
    price: 2500,
    description: "A targeted package for diabetes screening and monitoring. Essential for individuals with family history of diabetes or those experiencing symptoms like frequent urination, excessive thirst.",
    shortDescription: "Targeted screening for diabetes monitoring",
    tests: [
      { name: "Blood Glucose Fasting" },
      { name: "Blood Glucose PP" },
      { name: "HbA1c" },
      { name: "Insulin" },
      { name: "Urine Microalbumin" },
      { name: "Kidney Function Test" },
      { name: "Lipid Profile" },
      { name: "Fundus Examination" }
    ],
    fasting: true,
    fastingHours: 12,
    tags: ["Diabetes", "Monitoring", "Specialized"],
    popular: true,
    image: "/placeholder.svg"
  },
  {
    id: "women-health-checkup",
    name: "Women's Health Checkup",
    price: 4999,
    description: "A comprehensive package designed specifically for women's health needs. Covers general health parameters with additional focus on reproductive and hormonal health.",
    shortDescription: "Complete assessment tailored for women's health",
    tests: [
      { name: "Complete Blood Count (CBC)" },
      { name: "Thyroid Profile" },
      { name: "Vitamin B12, D3 & Calcium" },
      { name: "Pap Smear" },
      { name: "Mammography" },
      { name: "Pelvic Ultrasound" },
      { name: "Bone Density Scan" },
      { name: "Hormonal Assay" }
    ],
    fasting: true,
    fastingHours: 8,
    tags: ["Women", "Specialized", "Comprehensive"],
    popular: false,
    image: "/placeholder.svg"
  },
  {
    id: "men-health-checkup",
    name: "Men's Health Checkup",
    price: 4999,
    description: "A comprehensive package designed specifically for men's health needs. Covers general health parameters with additional focus on prostate and hormonal health.",
    shortDescription: "Complete assessment tailored for men's health",
    tests: [
      { name: "Complete Blood Count (CBC)" },
      { name: "Testosterone" },
      { name: "PSA (Prostate Specific Antigen)" },
      { name: "Thyroid Profile" },
      { name: "Vitamin B12 & D3" },
      { name: "Ultrasound Prostate" },
      { name: "Lipid Profile" },
      { name: "Liver Function Test" }
    ],
    fasting: true,
    fastingHours: 8,
    tags: ["Men", "Specialized", "Comprehensive"],
    popular: false,
    image: "/placeholder.svg"
  }
];

export function getPackageById(id: string): Package | undefined {
  return packages.find(pkg => pkg.id === id);
}

export function getPopularPackages(): Package[] {
  return packages.filter(pkg => pkg.popular);
}
