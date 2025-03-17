
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
    description: "A comprehensive health checkup package designed for routine health monitoring. Ideal for individuals aged 18-40 who want to ensure they're in good health. This package covers essential parameters to give you a clear picture of your overall health status.",
    shortDescription: "Essential tests for routine health monitoring",
    tests: [
      { name: "Complete Blood Count (CBC)", description: "Measures different components of blood including RBC, WBC, and platelets" },
      { name: "Blood Glucose Fasting", description: "Measures blood sugar levels after fasting to screen for diabetes" },
      { name: "Lipid Profile", description: "Measures cholesterol levels to assess heart health" },
      { name: "Liver Function Test", description: "Assesses liver health by measuring enzymes and proteins" },
      { name: "Kidney Function Test", description: "Evaluates kidney function by measuring waste products in blood" },
      { name: "Urine Routine Examination", description: "Analyzes urine to detect various disorders" },
      { name: "Chest X-Ray", description: "Examines the chest area to check heart, lungs and bones" },
      { name: "ECG", description: "Records electrical activity of the heart" }
    ],
    fasting: true,
    fastingHours: 8,
    tags: ["Routine", "Prevention", "Basic"],
    popular: true,
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "comprehensive-health-checkup",
    name: "Comprehensive Health Checkup",
    price: 3999,
    description: "An advanced health assessment package that includes all basic tests plus additional screenings. Recommended for individuals above 40 or those with family history of chronic diseases. This complete evaluation helps in early detection of common health conditions affecting different body systems.",
    shortDescription: "Advanced assessment with additional screenings",
    tests: [
      { name: "All tests in Basic Health Checkup" },
      { name: "Thyroid Profile", description: "Measures thyroid hormones to assess thyroid function" },
      { name: "Vitamin B12 & D3", description: "Checks for vitamin deficiencies common in adults" },
      { name: "HbA1c", description: "Measures average blood glucose levels over past 3 months" },
      { name: "Ultrasound Abdomen", description: "Examines internal organs in the abdomen" },
      { name: "PSA (for males)/Mammography (for females)", description: "Cancer screening tests based on gender" },
      { name: "Bone Density Scan", description: "Measures bone mineral density to assess risk of fractures" },
      { name: "Treadmill Test (TMT)", description: "Stress test to evaluate heart function during physical activity" }
    ],
    fasting: true,
    fastingHours: 12,
    tags: ["Comprehensive", "Advanced", "Seniors"],
    popular: true,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1480&auto=format&fit=crop"
  },
  {
    id: "cardiac-health-checkup",
    name: "Cardiac Health Checkup",
    price: 4500,
    description: "A specialized package focused on heart health assessment. Ideal for individuals with family history of heart diseases or those experiencing symptoms like chest pain, shortness of breath. This package helps identify risk factors and early signs of heart disease before they become serious.",
    shortDescription: "Specialized assessment for heart health",
    tests: [
      { name: "Lipid Profile", description: "Comprehensive cholesterol panel to assess cardiovascular risk" },
      { name: "ECG", description: "Records the heart's electrical activity to detect abnormalities" },
      { name: "Echocardiogram", description: "Ultrasound of the heart to check structure and function" },
      { name: "Treadmill Test (TMT)", description: "Exercise stress test to evaluate heart function under exertion" },
      { name: "Chest X-Ray", description: "Examines heart size and lungs" },
      { name: "Homocysteine", description: "Measures amino acid levels linked to heart disease" },
      { name: "hs-CRP", description: "High-sensitivity test to measure inflammation in blood vessels" },
      { name: "BNP", description: "Measures hormone released when heart is under stress" }
    ],
    fasting: true,
    fastingHours: 8,
    tags: ["Cardiac", "Heart", "Specialized"],
    popular: false,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "diabetes-health-checkup",
    name: "Diabetes Health Checkup",
    price: 2500,
    description: "A targeted package for diabetes screening and monitoring. Essential for individuals with family history of diabetes or those experiencing symptoms like frequent urination, excessive thirst. This package helps in early detection and management of diabetes and related complications.",
    shortDescription: "Targeted screening for diabetes monitoring",
    tests: [
      { name: "Blood Glucose Fasting", description: "Measures blood sugar levels after overnight fasting" },
      { name: "Blood Glucose PP", description: "Measures blood sugar levels 2 hours after a meal" },
      { name: "HbA1c", description: "Shows average blood sugar control over past 3 months" },
      { name: "Insulin", description: "Measures insulin levels to assess insulin resistance" },
      { name: "Urine Microalbumin", description: "Checks for early signs of kidney damage" },
      { name: "Kidney Function Test", description: "Evaluates how well kidneys are functioning" },
      { name: "Lipid Profile", description: "Assesses cardiovascular risk associated with diabetes" },
      { name: "Fundus Examination", description: "Eye examination to check for diabetic retinopathy" }
    ],
    fasting: true,
    fastingHours: 12,
    tags: ["Diabetes", "Monitoring", "Specialized"],
    popular: true,
    image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "women-health-checkup",
    name: "Women's Health Checkup",
    price: 4999,
    description: "A comprehensive package designed specifically for women's health needs. Covers general health parameters with additional focus on reproductive and hormonal health. Ideal for women of all ages to monitor overall health and detect gender-specific conditions early.",
    shortDescription: "Complete assessment tailored for women's health",
    tests: [
      { name: "Complete Blood Count (CBC)", description: "Screens for anemia, common in women" },
      { name: "Thyroid Profile", description: "Thyroid disorders are more common in women" },
      { name: "Vitamin B12, D3 & Calcium", description: "Essential for bone health and preventing osteoporosis" },
      { name: "Pap Smear", description: "Screens for cervical cancer" },
      { name: "Mammography", description: "Breast cancer screening" },
      { name: "Pelvic Ultrasound", description: "Examines reproductive organs" },
      { name: "Bone Density Scan", description: "Assesses risk of osteoporosis" },
      { name: "Hormonal Assay", description: "Measures female hormone levels" }
    ],
    fasting: true,
    fastingHours: 8,
    tags: ["Women", "Specialized", "Comprehensive"],
    popular: false,
    image: "https://images.unsplash.com/photo-1584516150454-e1ab362c3e1d?q=80&w=1374&auto=format&fit=crop"
  },
  {
    id: "men-health-checkup",
    name: "Men's Health Checkup",
    price: 4999,
    description: "A comprehensive package designed specifically for men's health needs. Covers general health parameters with additional focus on prostate and hormonal health. This package is designed to address the unique health concerns that affect men throughout their lives.",
    shortDescription: "Complete assessment tailored for men's health",
    tests: [
      { name: "Complete Blood Count (CBC)", description: "Assesses overall blood health" },
      { name: "Testosterone", description: "Measures male hormone levels" },
      { name: "PSA (Prostate Specific Antigen)", description: "Screens for prostate cancer" },
      { name: "Thyroid Profile", description: "Checks thyroid function" },
      { name: "Vitamin B12 & D3", description: "Essential vitamins for energy and immunity" },
      { name: "Ultrasound Prostate", description: "Examines prostate size and structure" },
      { name: "Lipid Profile", description: "Men have higher risk of heart disease" },
      { name: "Liver Function Test", description: "Assesses liver health" }
    ],
    fasting: true,
    fastingHours: 8,
    tags: ["Men", "Specialized", "Comprehensive"],
    popular: false,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop"
  }
];

export function getPackageById(id: string): Package | undefined {
  return packages.find(pkg => pkg.id === id);
}

export function getPopularPackages(): Package[] {
  return packages.filter(pkg => pkg.popular);
}
