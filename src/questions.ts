export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string; // "A", "B", "C", "D" or "" if blank
  correctIndex: number;  // 0, 1, 2, 3 or -1 if blank
  justification: string;
}

export const CATEGORIES = {
  ENT: "Special Sense / ENT / Ophthalmology",
  IM: "Internal Medicine",
  SURG: "Surgery / Ortho / Urology",
  HEM: "Hematology / Oncology",
  GYN: "Gynecology & Obstetrics",
  NEURO: "Neuro & Psychiatry",
  PH: "Primary Care / Public Health / ID / Derm",
  PED: "Pediatrics"
};

export const questions: Question[] = [
  {
    id: 1,
    category: CATEGORIES.ENT,
    question: "Regarding diabetic retinopathy, which statement is wrong?",
    options: [
      "A. Occurs in both type 1 and type 2 diabetes",
      "B. Can cause blindness",
      "C. Initially it is symptomatic",
      "D. Involves the retinal veins"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Early diabetic retinopathy is typically asymptomatic, making routine screening essential."
  },
  {
    id: 2,
    category: CATEGORIES.ENT,
    question: "A patient with proptosis and fever presents to the clinic. What is the most likely diagnosis?",
    options: [
      "A. [blank]",
      "B. Orbital cellulitis",
      "C. Pott puffy tumor",
      "D. [blank]"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Key features are painful proptosis, high fever, and decreased/painful extraocular movements."
  },
  {
    id: 3,
    category: CATEGORIES.ENT,
    question: "In acute rhinosinusitis, which is the most useful diagnostic test?",
    options: [
      "A. CT scan",
      "B. Nasal endoscopy",
      "C. X-ray",
      "D. MRI"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Routine acute rhinosinusitis is a clinical diagnosis; among the listed tests, nasal endoscopy is the most useful direct visualization tool."
  },
  {
    id: 4,
    category: CATEGORIES.ENT,
    question: "In severe epistaxis, what is the initial step in management?",
    options: [
      "A. Nasal packing",
      "B. Stabilization of vital signs",
      "C. Cauterization",
      "D. Surgical ligation"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Always manage the Airway, Breathing, and Circulation (ABCs) first in severe bleeding."
  },
  {
    id: 5,
    category: CATEGORIES.ENT,
    question: "Presence of an ulcer on the edge of the vocal cord with a \"mouse-nibbled\" appearance is most typical of:",
    options: [
      "A. Tuberculosis",
      "B. Scleroma",
      "C. Syphilis",
      "D. Sarcoidosis"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Classic description for tertiary syphilitic ulcer of the larynx."
  },
  {
    id: 6,
    category: CATEGORIES.ENT,
    question: "Malignant otitis externa can damage cranial nerve IX through:",
    options: [
      "A. Erosion of the jugular foramen",
      "B. [blank]",
      "C. [blank]",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "The infection spreads skull-base-ward and erodes the jugular foramen, which houses CN IX, X, and XI."
  },
  {
    id: 7,
    category: CATEGORIES.ENT,
    question: "Laryngeal abscess",
    options: [
      "A. [blank]",
      "B. [blank]",
      "C. [blank]",
      "D. [blank]"
    ],
    correctAnswer: "",
    correctIndex: -1,
    justification: "Incomplete laryngeal abscess question stem from the source exam."
  },
  {
    id: 8,
    category: CATEGORIES.IM,
    question: "On physical examination, which finding is most likely in acute heart failure due to acute coronary syndrome?",
    options: [
      "A. Gallop rhythm (S3)",
      "B. [other options to be filled]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "An S3 gallop is highly indicative of acute volume overload / systolic dysfunction in the setting of ACS."
  },
  {
    id: 9,
    category: CATEGORIES.IM,
    question: "All of the following are characteristics of alveoli, except:",
    options: [
      "A. Thin-walled",
      "B. Poor blood supply",
      "C. Large surface area",
      "D. Contain chemical surfactant"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Alveoli have an extremely rich capillary network to maximize gas exchange efficiency."
  },
  {
    id: 10,
    category: CATEGORIES.IM,
    question: "Which glomerular disease is characterized by active urinary sediment?",
    options: [
      "A. Membranous nephropathy",
      "B. Focal segmental glomerulosclerosis",
      "C. Membranoproliferative glomerulonephritis",
      "D. Minimal change disease"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Proliferative glomerulonephritis processes (like MPGN) typically lead to an \"active\" nephritic sediment (RBC casts, dysmorphic RBCs)."
  },
  {
    id: 11,
    category: CATEGORIES.IM,
    question: "Which of the following drugs is not nephrotoxic?",
    options: [
      "A. ACE inhibitor",
      "B. NSAID",
      "C. Gentamicin",
      "D. Prednisone"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "Prednisone (corticosteroid) is generally not direct-nephrotoxic; ACE inhibitors, NSAIDs, and aminoglycosides (gentamicin) can all cause renal injury."
  },
  {
    id: 12,
    category: CATEGORIES.IM,
    question: "Which of the following is a common feature of diabetic autonomic neuropathy?",
    options: [
      "A. Arthropathy",
      "B. Motor weakness",
      "C. Gastroparesis",
      "D. Cataract"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Gastroparesis is a classic manifestation of diabetic autonomic neuropathy affecting gastrointestinal motility."
  },
  {
    id: 13,
    category: CATEGORIES.IM,
    question: "Dry bronchiectasis is best described as:",
    options: [
      "A. Bronchiectasis without infection",
      "B. Bronchiectasis with recurrent hemoptysis",
      "C. [blank]",
      "D. [blank]"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Dry bronchiectasis is characterized by little to no sputum production but features recurrent hemoptysis."
  },
  {
    id: 14,
    category: CATEGORIES.IM,
    question: "Which antihypertensive may help prevent new-onset atrial fibrillation?",
    options: [
      "1. Amlodipine",
      "2. Bisoprolol",
      "3. Atenolol",
      "4. Losartan"
    ],
    correctAnswer: "4",
    correctIndex: 3,
    justification: "RAAS blockers, such as angiotensin receptor blockers (Losartan), reduce atrial remodeling and the incidence of AF."
  },
  {
    id: 15,
    category: CATEGORIES.IM,
    question: "A farmer who keeps pigeons presents with pneumonia. Two of his pigeons recently died. What is the most likely causative organism?",
    options: [
      "A. Chlamydia psittaci",
      "B. Mycoplasma pneumoniae",
      "C. Legionella pneumophila",
      "D. Streptococcus pneumoniae"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Exposure to infected birds (pigeons, parrots) is the classic vector for Chlamydia psittaci (psittacosis)."
  },
  {
    id: 16,
    category: CATEGORIES.IM,
    question: "In a patient with chronic coronary syndrome, what is the target LDL-C level (mg/dL)?",
    options: [
      "A. < 55",
      "B. < 75",
      "C. < 95",
      "D. < 115"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "High-risk or very-high-risk ASCVD targets necessitate an aggressive LDL-C level of < 55 mg/dL."
  },
  {
    id: 17,
    category: CATEGORIES.IM,
    question: "The gene most commonly associated with familial pulmonary arterial hypertension is:",
    options: [
      "A. BMPR1",
      "B. BMPR2",
      "C. KCNK3",
      "D. ACVRL1"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Heterozygous mutations in the Bone Morphogenetic Protein Receptor Type 2 (BMPR2) gene account for the majority of familial PAH."
  },
  {
    id: 18,
    category: CATEGORIES.IM,
    question: "In right upper lobe pneumonia, which physical examination finding is most likely?",
    options: [
      "A. Fine crackles",
      "B. Coarse crackles",
      "C. Increased vocal fremitus",
      "D. Decreased vocal resonance"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Lobar consolidation increases transmission of sound/vibration through the lung tissue, leading to increased tactile/vocal fremitus."
  },
  {
    id: 19,
    category: CATEGORIES.IM,
    question: "Which of the following does not cause hyponatremia?",
    options: [
      "A. Congenital adrenal hyperplasia",
      "B. Biliary atresia",
      "C. Diabetes insipidus",
      "D. Diabetes mellitus"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "Diabetes mellitus causes pseudohyponatremia due to hyperosmolar translocation of water, but in terms of pure salt/water handling, diabetes insipidus leads to hypernatremia unless excess water is consumed."
  },
  {
    id: 20,
    category: CATEGORIES.IM,
    question: "Which of the following does not cause cirrhosis?",
    options: [
      "A. Acute paracetamol (acetaminophen) poisoning",
      "B. Wilson disease",
      "C. Chronic alcohol use",
      "D. Chronic hepatitis B infection"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Acute paracetamol toxicity causes acute fulminant hepatic necrosis, not chronic fibrotic cirrhosis."
  },
  {
    id: 21,
    category: CATEGORIES.IM,
    question: "Infection with which virus can lead to hepatocellular carcinoma even without cirrhosis?",
    options: [
      "A. HAV",
      "B. HBV",
      "C. HCV",
      "D. HEV"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Hepatitis B Virus (HBV) is a DNA virus that integrates into the host genome, allowing it to drive oncogenesis directly even in the absence of preceding cirrhosis."
  },
  {
    id: 22,
    category: CATEGORIES.IM,
    question: "Regarding ascites, which statement is true?",
    options: [
      "A. Shifting dullness can be detected with 150 mL of ascitic fluid",
      "B. SAAG < 1.1 g/dL indicates portal hypertension",
      "C. Treatment always includes water restriction",
      "D. SAAG < 1.1 g/dL suggests malignancy"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "A low Serum-Ascites Albumin Gradient (SAAG < 1.1 g/dL) rules out portal hypertension and suggests non-portal causes like peritoneal carcinomatosis, tuberculosis, or pancreatitis."
  },
  {
    id: 23,
    category: CATEGORIES.IM,
    question: "In hypovolemic shock, which statement is correct?",
    options: [
      "A. Jugular venous pressure is low even in the supine position",
      "B. Postural decrease in heart rate",
      "C. Increased pulse pressure",
      "D. Systolic blood pressure decreases by 20 mm Hg"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Severe intravascular volume depletion prevents elevation of the JVP, even when flat."
  },
  {
    id: 24,
    category: CATEGORIES.IM,
    question: "A 65-year-old man with hypertension is taking lisinopril and a beta-blocker. He is scheduled for elective non-cardiac surgery tomorrow. What is the most appropriate management of his antihypertensive medications on the day of surgery?",
    options: [
      "A. Continue both lisinopril and the beta-blocker",
      "B. Stop both lisinopril and the beta-blocker",
      "C. Continue the beta-blocker but withhold lisinopril",
      "D. Continue lisinopril but withhold the beta-blocker"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Withholding ACE inhibitors (Lisinopril) on the day of surgery prevents severe intraoperative refractory hypotension, while beta-blockers must be continued to avoid rebound tachycardia or ischemia."
  },
  {
    id: 25,
    category: CATEGORIES.IM,
    question: "Regarding acute kidney injury (AKI), which statement is correct?",
    options: [
      "A. Defined by a rise in serum creatinine of >=0.3 mg/dL",
      "B. Defined by urine output < 0.5 mL/kg/day",
      "C. Usually reversible",
      "D. Decline in renal function occurs within 1 week"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "AKI is characterized by an abrupt decline in renal function that is typically reversible once the underlying insult is addressed."
  },
  {
    id: 26,
    category: CATEGORIES.IM,
    question: "A patient with ESRD develops a moderate pericardial effusion. What is the best management?",
    options: [
      "A. Intensify dialysis",
      "B. Give NSAIDs",
      "C. Pericardiocentesis",
      "D. Switch to peritoneal dialysis"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Uremic pericarditis and effusion in a dialysis patient are treated by intensifying hemodialysis sessions unless signs of tamponade exist."
  },
  {
    id: 27,
    category: CATEGORIES.IM,
    question: "In a non-invasive stress test, which finding represents a high-risk profile and indicates the need for invasive coronary angiography?",
    options: [
      "A. LV ejection fraction of 55% during stress",
      "B. Myocardial ischemia >= 10% of the myocardium on perfusion scintigraphy",
      "C. New right bundle branch block during stress echocardiography",
      "D. Ischemia involving 2 of 16 LV segments on stress echocardiography"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Large perfusion defects (>= 10%) on myocardial perfusion imaging denote high risk for major adverse cardiac events, necessitating invasive catheterization."
  },
  {
    id: 28,
    category: CATEGORIES.IM,
    question: "Regarding the acid-fast bacillus (AFB) smear in pulmonary tuberculosis, which is correct?",
    options: [
      "A. In about 2-4% of active TB cases, the smear is negative",
      "B. [Stem about \"most rapid test\"]",
      "C. The smear requires 10,000-100,000 AFB/mL of sputum to be positive",
      "D. The smear is always negative in non-TB lung diseases"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "High bacterial load is required for microscopic visualization of acid-fast bacilli on a direct smear."
  },
  {
    id: 29,
    category: CATEGORIES.IM,
    question: "Refractory ascites is best managed by:",
    options: [
      "A. [blank]",
      "B. Albumin infusion alone",
      "C. Large-volume paracentesis with albumin replacement",
      "D. [blank]"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Large-volume paracentesis combined with intravenous albumin infusion is the primary therapeutic choice for diuretic-resistant ascites."
  },
  {
    id: 30,
    category: CATEGORIES.IM,
    question: "Thyroid storm is most commonly precipitated by:",
    options: [
      "A. Infection",
      "B. Poorly controlled hyperthyroidism",
      "C. [others you may add]",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Systemic infections are the most common acute triggers pushing a hyperthyroid patient into a hypermetabolic thyroid storm."
  },
  {
    id: 31,
    category: CATEGORIES.IM,
    question: "Regarding management of thyroid storm, which statement is correct?",
    options: [
      "A. Amiodarone is contraindicated in thyroid storm",
      "B. Carbimazole is given parenterally",
      "C. Sodium ipodate normalizes T3 within 48-72 hours",
      "D. Mortality rate is 50%"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Iodinated contrast agents like sodium ipodate rapidly inhibit peripheral conversion of T4 to T3 and block thyroid hormone release."
  },
  {
    id: 32,
    category: CATEGORIES.IM,
    question: "In hepatocellular vs obstructive jaundice, which laboratory pattern favors hepatocellular jaundice?",
    options: [
      "A. Markedly elevated ALT/AST",
      "B. Increased bilirubin",
      "C. Bilirubin in urine",
      "D. Dark urine"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Severe hepatocyte damage releases vast amounts of intracellular transaminases (ALT/AST), far higher than cholestatic/obstructive patterns."
  },
  {
    id: 33,
    category: CATEGORIES.IM,
    question: "To differentiate hepatocellular from obstructive jaundice, which is most helpful?",
    options: [
      "A. Level of total bilirubin",
      "B. Presence of dark urine",
      "C. Presence of bilirubin in urine",
      "D. AST/ALT much higher than cholestatic enzymes"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "A high transaminase-to-alkaline-phosphatase ratio strongly points to hepatocellular injury rather than direct biliary tract obstruction."
  },
  {
    id: 34,
    category: CATEGORIES.IM,
    question: "Hypovolemia: which statement is true?",
    options: [
      "A. Even when supine, JVP does not rise",
      "B. [blank]",
      "C. [blank]",
      "D. Increased pulse pressure"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Due to decreased blood volume, there is not enough venous pressure to distend the jugular veins even in the supine position."
  },
  {
    id: 35,
    category: CATEGORIES.IM,
    question: "A patient has undergone bariatric surgery and a few days later develops abdominal pain. What is the most likely complication?",
    options: [
      "A. Anastomotic leak",
      "B. Dumping syndrome",
      "C. [blank]",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Anastomotic leaks present early post-operatively with abdominal pain, fever, and tachycardia, requiring immediate diagnosis and intervention."
  },
  {
    id: 36,
    category: CATEGORIES.SURG,
    question: "Best modality to diagnose small peritoneal metastases:",
    options: [
      "A. CT scan",
      "B. MRI",
      "C. Diagnostic laparoscopy",
      "D. PET scan"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Diagnostic laparoscopy allows direct visualization and biopsy of small peritoneal implants that are often below the resolution limit of standard imaging."
  },
  {
    id: 37,
    category: CATEGORIES.SURG,
    question: "Best imaging modality for gallstones:",
    options: [
      "A. CT scan",
      "B. MRCP",
      "C. X-ray",
      "D. Ultrasound"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "Transabdominal ultrasound has extremely high sensitivity and specificity for detecting cholelithiasis and is the gold standard initial test."
  },
  {
    id: 38,
    category: CATEGORIES.SURG,
    question: "Which muscle is most commonly involved in shoulder impingement?",
    options: [
      "A. Supraspinatus",
      "B. Infraspinatus",
      "C. Subscapularis",
      "D. Teres minor"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "The supraspinatus tendon is located directly beneath the acromion, making it the most vulnerable structure in subacromial impingement syndrome."
  },
  {
    id: 39,
    category: CATEGORIES.SURG,
    question: "Which of the following indicates severe acute pancreatitis?",
    options: [
      "A. Pain radiating to the back",
      "B. Nausea and vomiting",
      "C. Organ failure lasting > 48 hours",
      "D. Increased serum amylase"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "According to the Atlanta Classification, persistent organ failure lasting more than 48 hours is the defining criterion for severe acute pancreatitis."
  },
  {
    id: 40,
    category: CATEGORIES.SURG,
    question: "Regarding acute appendicitis, which statement is true?",
    options: [
      "A. Anorexia is uncommon",
      "B. It is usually due to obstruction of the lumen by a fecalith",
      "C. Morphine is contraindicated until diagnosis is confirmed",
      "D. Vomiting typically precedes abdominal pain"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Obstruction of the appendiceal lumen by a fecalith (or lymphoid hyperplasia) is the main inciting cause of acute appendicitis."
  },
  {
    id: 41,
    category: CATEGORIES.SURG,
    question: "The most common site of peptic ulcer perforation:",
    options: [
      "A. Anterior wall of the duodenum",
      "B. Lesser curvature of the stomach",
      "C. Posterior wall of the duodenum",
      "D. Posterior wall of the stomach"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Ulcers on the anterior wall of the first part of the duodenum perforate into the peritoneal cavity, while posterior duodenal ulcers are more likely to erode into the gastroduodenal artery and bleed."
  },
  {
    id: 42,
    category: CATEGORIES.SURG,
    question: "The typical gait in developmental dysplasia of the hip (DDH):",
    options: [
      "A. Ataxic gait",
      "B. Trendelenburg gait",
      "C. Antalgic gait",
      "D. High-stepping gait"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Abductor muscle weakness due to hip dislocation leads to a Trendelenburg gait (waddling gait if bilateral)."
  },
  {
    id: 43,
    category: CATEGORIES.SURG,
    question: "Best initial management for massive hemothorax:",
    options: [
      "A. Chest tube insertion",
      "B. Thoracotomy",
      "C. Needle decompression",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Large-bore chest tube (tube thoracostomy) insertion is required initially to drain the blood, assess the volume of bleeding, and expand the lung."
  },
  {
    id: 44,
    category: CATEGORIES.SURG,
    question: "Which colorectal polyp has the highest risk of malignancy?",
    options: [
      "A. Hyperplastic polyp",
      "B. Juvenile polyp",
      "C. Tubular adenoma",
      "D. Villous adenoma"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "Among adenomatous polyps, villous architecture has a significantly higher rate of progression to invasive carcinoma than tubular adenomas."
  },
  {
    id: 45,
    category: CATEGORIES.SURG,
    question: "Most common presentation of bladder cancer:",
    options: [
      "A. Dysuria",
      "B. Frequency",
      "C. Painless hematuria",
      "D. [blank]"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Intermittent, painless, gross hematuria in an older adult is highly suspicious for transitional cell carcinoma of the bladder."
  },
  {
    id: 46,
    category: CATEGORIES.SURG,
    question: "Which hereditary condition has almost 100% risk of malignancy?",
    options: [
      "A. Lynch syndrome",
      "B. Familial adenomatous polyposis (FAP)",
      "C. Cowden syndrome",
      "D. HBOP syndrome"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Without prophylactic colectomy, nearly 100% of patients with Familial Adenomatous Polyposis will develop colorectal cancer by age 40."
  },
  {
    id: 47,
    category: CATEGORIES.SURG,
    question: "Occupational exposure most strongly associated with malignant mesothelioma:",
    options: [
      "A. Asbestos",
      "B. Arsenic",
      "C. Benzene",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Asbestos inhalation is the classical and strongest industrial exposure trigger for malignant pleural and peritoneal mesothelioma."
  },
  {
    id: 48,
    category: CATEGORIES.SURG,
    question: "Goal of resuscitation in trauma before hemorrhage control (permissive hypotension):",
    options: [
      "A. Systolic BP 80-100 mm Hg",
      "B. HR 70-100/min",
      "C. Hemoglobin > 8 g/dL",
      "D. Urine output > 0.5 mL/kg/hour"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Permissive hypotension aims to maintain a mean arterial pressure or systolic blood pressure sufficient to sustain brain/heart perfusion while avoiding blowing out active clots before definitive hemostasis."
  },
  {
    id: 49,
    category: CATEGORIES.SURG,
    question: "Which of the following is regarded as non-obstructive hydronephrosis?",
    options: [
      "A. Endometriosis",
      "B. [blank]",
      "C. Neurogenic (nephrogenic) bladder",
      "D. [blank]"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "A neurogenic bladder is a functional voiding dysfunction resulting in backpressure hydronephrosis without a physical, mechanical blockage."
  },
  {
    id: 50,
    category: CATEGORIES.SURG,
    question: "Which duplex ultrasound criterion best indicates significant great saphenous vein reflux?",
    options: [
      "A. Vein diameter > 3 mm",
      "B. Reflux duration > 0.5 seconds",
      "C. [blank]",
      "D. [blank]"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "A retrograde flow duration of > 0.5 seconds in the superficial venous system (GSV) is the diagnostic standard for venous reflux."
  },
  {
    id: 51,
    category: CATEGORIES.SURG,
    question: "A patient with BMI > 35 has a 10-mm renal stone. What is the best treatment?",
    options: [
      "A. Shock-wave lithotripsy (SWL)",
      "B. Flexible ureteroscopy",
      "C. Percutaneous nephrolithotomy (PCNL)",
      "D. Open surgery"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "In obese patients (BMI > 35), the skin-to-stone distance is too high for effective Shock-Wave Lithotripsy, making retrograde flexible ureteroscopy the preferred modality."
  },
  {
    id: 52,
    category: CATEGORIES.SURG,
    question: "Regarding rectal disease, which statement is true?",
    options: [
      "A. A solitary rectal ulcer should always be biopsied",
      "B. Full-thickness rectal prolapse is usually < 4 cm",
      "C. In young, fit patients, the abdominal approach is preferred for prolapse repair",
      "D. Ulcerative colitis has skip lesions in the colon"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Solitary rectal ulcers require biopsy to exclude malignant disease, even though they represent a benign condition associated with internal mucosal prolapse."
  },
  {
    id: 53,
    category: CATEGORIES.SURG,
    question: "In disaster triage, tension pneumothorax should be labeled:",
    options: [
      "A. Red (immediate)",
      "B. Green (minor)",
      "C. Yellow (delayed)",
      "D. Black (non-salvageable)"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Tension pneumothorax is a rapidly reversible, life-threatening injury that is categorized as Red (Immediate) priority."
  },
  {
    id: 54,
    category: CATEGORIES.SURG,
    question: "Secondary blast injury is due to:",
    options: [
      "A. Projectiles",
      "B. Pressure wave",
      "C. Gas inhalation",
      "D. Whole-body displacement"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Primary blast injury is from the overpressure wave; secondary blast injury is from debris and shrapnel flying as projectiles."
  },
  {
    id: 55,
    category: CATEGORIES.SURG,
    question: "Regarding anal canal tumors, which statement is correct?",
    options: [
      "A. Adenocarcinoma is the most common histologic type",
      "B. Above the dentate line is squamous carcinoma",
      "C. Often diagnosed early because they are superficial",
      "D. May be malignant lymphoma"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "Anal canal cancers are primarily squamous cell carcinomas; however, non-epithelial tumors like malignant lymphoma can rarely occur."
  },
  {
    id: 56,
    category: CATEGORIES.SURG,
    question: "Best diagnostic modality for peptic ulcer disease:",
    options: [
      "A. Barium meal",
      "B. CT scan",
      "C. Flexible upper endoscopy",
      "D. Ultrasound"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Esophagogastroduodenoscopy (EGD) provides direct visualization, allows biopsy of gastric ulcers to rule out malignancy, and can test for Helicobacter pylori."
  },
  {
    id: 57,
    category: CATEGORIES.SURG,
    question: "A patient 2 days after gastric bypass surgery develops abdominal pain, fever, and tachycardia. Most likely diagnosis:",
    options: [
      "A. Anastomotic leak",
      "B. Dumping syndrome",
      "C. Gallstones",
      "D. Iron deficiency anemia"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Persistent tachycardia and abdominal pain within 48-72 hours of a gastric bypass are classic signs of an anastomotic leak."
  },
  {
    id: 58,
    category: CATEGORIES.SURG,
    question: "Regarding ulcerative colitis, which statement is correct?",
    options: [
      "A. Most cancers occur in the sigmoid and rectum, like sporadic CRC",
      "B. Cystic lesions are diagnostic for UC",
      "C. Most patients have a chronic relapsing course; fulminant colitis occurs in about 10-15%",
      "D. [blank]"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Most patients experience a chronic relapsing-remitting course, while severe fulminant colitis complicates about 10-15% of cases."
  },
  {
    id: 59,
    category: CATEGORIES.SURG,
    question: "Regarding femoral hernia, which is true?",
    options: [
      "A. More common in males than females",
      "B. More common than inguinal hernia",
      "C. Always requires mesh repair",
      "D. May be mistaken for an enlarged lymph node"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "Because they present below the inguinal ligament and medial to the femoral vein, femoral hernias can easily mimic an enlarged lymph node (Cloquet's node) or lipoma."
  },
  {
    id: 60,
    category: CATEGORIES.SURG,
    question: "In pure seminoma, which tumor marker typically remains within normal range?",
    options: [
      "A. AFP",
      "B. LDH",
      "C. beta-hCG",
      "D. LDH and beta-hCG"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Alpha-fetoprotein (AFP) is never elevated in pure seminoma. Elevation of AFP indicates a non-seminomatous germ cell component."
  },
  {
    id: 61,
    category: CATEGORIES.SURG,
    question: "A diabetic patient presents with pain far out of proportion to examination findings. Most likely diagnosis:",
    options: [
      "A. Necrotizing fasciitis",
      "B. Abscess",
      "C. Cellulitis",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Severe pain out of proportion to skin findings in an immunocompromised/diabetic patient suggests deep tissue necrosis and necrotizing fasciitis."
  },
  {
    id: 62,
    category: CATEGORIES.SURG,
    question: "A man with obstructive jaundice due to gallstones has INR 1.8 and bilirubin 15 mg/dL. What is the best next step?",
    options: [
      "A. Give vitamin K (e.g., 10 mg IV) and monitor",
      "B. Preoperative relief of obstruction by ERCP",
      "C. Antibiotics only",
      "D. Immediate open surgery"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Biliary decompression (such as ERCP) is the priority to relieve obstructive jaundice and biliary backpressure, while correcting any associated coagulopathy."
  },
  {
    id: 63,
    category: CATEGORIES.SURG,
    question: "Post-recovery diuresis (diuretic phase after AKI): which is correct?",
    options: [
      "A. Vital signs guide fluid replacement",
      "B. It is a poor prognostic factor",
      "C. [blank]",
      "D. Associated with tubulointerstitial disease"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "During the post-AKI polyuric phase, vast fluid and electrolyte losses can occur, requiring vital signs and volume status to guide fluid replacement."
  },
  {
    id: 64,
    category: CATEGORIES.SURG,
    question: "Best imaging modality for early avascular necrosis (AVN) of bone:",
    options: [
      "A. MRI",
      "B. CT scan",
      "C. X-ray",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "MRI is highly sensitive and is the gold standard for diagnosing early-stage osteonecrosis before changes are visible on plain radiographs."
  },
  {
    id: 65,
    category: CATEGORIES.SURG,
    question: "A patient with septic arthritis of the knee presents to the emergency department. Why must this condition be treated promptly?",
    options: [
      "A. It is caused by fungi that can infect the whole ward",
      "B. [blank]",
      "C. It does not require urgent treatment",
      "D. It can destroy the joint within 2-3 days"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "Proteolytic enzymes released by inflammatory cells can destroy articular cartilage within 48 to 72 hours, risking permanent joint damage."
  },
  {
    id: 66,
    category: CATEGORIES.SURG,
    question: "Which of the following suggests an irreversibly damaged limb in acute limb ischemia?",
    options: [
      "A. Delayed capillary refill",
      "B. Absence of pulses",
      "C. Profound weakness and paralysis with anesthesia",
      "D. [blank]"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Sensation loss (anesthesia) and muscle paralysis are signs of irreversible neuromuscular damage in late-stage acute ischemia (Rutherford Category III)."
  },
  {
    id: 67,
    category: CATEGORIES.SURG,
    question: "In which malignancy is bone the most common site of the first distant metastasis?",
    options: [
      "A. Hepatocellular carcinoma",
      "B. Prostate cancer",
      "C. Lung cancer",
      "D. Colorectal cancer"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Prostate cancer has a strong osteoblastic affinity, with bone (especially the spine and pelvis) being the primary site of metastatic spread."
  },
  {
    id: 68,
    category: CATEGORIES.SURG,
    question: "Lambert-Eaton myasthenic syndrome is most commonly associated with:",
    options: [
      "A. Ovarian cancer",
      "B. Breast cancer",
      "C. Small cell lung cancer",
      "D. [blank]"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "LEMS is a paraneoplastic syndrome caused by antibodies against presynaptic voltage-gated calcium channels, strongly associated with SCLC."
  },
  {
    id: 69,
    category: CATEGORIES.SURG,
    question: "Minimum fasting time for solid food before elective surgery:",
    options: [
      "A. 2 hours",
      "B. 4 hours",
      "C. 6 hours",
      "D. 8 hours"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Standard ASA guidelines recommend a minimum fasting time of 6 hours for a light meal/solids before induction of anesthesia."
  },
  {
    id: 70,
    category: CATEGORIES.SURG,
    question: "Regarding pelvi-ureteric junction (PUJ) obstruction:",
    options: [
      "A. More common in males 3:1",
      "B. More common on the right side 5:2",
      "C. Bilateral in 10-15% of cases",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Congenital PUJ obstruction is significantly more common in infant males (approx 3:1 ratio) and on the left side."
  },
  {
    id: 71,
    category: CATEGORIES.SURG,
    question: "Which is a contraindication to regional (neuraxial) anesthesia?",
    options: [
      "A. Valvular heart disease",
      "B. Previous back surgery",
      "C. History of allergy to local anesthetics",
      "D. Preexisting neurologic disease"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "A true history of severe systemic allergy to local anesthetics precludes the safe performance of neuraxial blockade."
  },
  {
    id: 72,
    category: CATEGORIES.SURG,
    question: "The parotid duct (Stensen duct) pierces which muscle?",
    options: [
      "A. Buccinator",
      "B. Masseter",
      "C. [blank]",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "The Stensen duct crosses the masseter and pierces the buccinator muscle to open into the oral cavity opposite the upper second molar."
  },
  {
    id: 73,
    category: CATEGORIES.SURG,
    question: "A patient presents with an open tibial Gustilo type IIIA fracture. Best initial management:",
    options: [
      "A. Debridement and IV antibiotics",
      "B. Bone grafting",
      "C. Primary closure",
      "D. Rigid internal fixation"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Open fractures are surgical emergencies; the primary goals are immediate administration of intravenous antibiotics and surgical debridement."
  },
  {
    id: 74,
    category: CATEGORIES.SURG,
    question: "The most common organism causing surgical site infection:",
    options: [
      "A. Streptococcus spp.",
      "B. Escherichia coli",
      "C. Staphylococcus aureus",
      "D. [blank]"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Staphylococcus aureus (including MRSA) remains the most frequently isolated pathogen in post-operative wound infections."
  },
  {
    id: 75,
    category: CATEGORIES.SURG,
    question: "A postoperative patient develops fever (38°C) 24 hours after surgery; the wound looks clean. Most likely cause:",
    options: [
      "A. Deep abscess",
      "B. Wound infection",
      "C. Urinary tract infection",
      "D. Atelectasis"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "Early post-operative fever (within 24-48 hours) is classically attributed to pulmonary atelectasis and splinting."
  },
  {
    id: 76,
    category: CATEGORIES.SURG,
    question: "Which type of lung cancer most commonly produces PTH or PTH-related peptide leading to hypercalcemia?",
    options: [
      "A. Squamous cell carcinoma of lung/head and neck",
      "B. Small cell carcinoma",
      "C. [blank]",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Squamous cell carcinomas frequently produce parathyroid hormone-related protein (PTHrP), causing severe paraneoplastic hypercalcemia."
  },
  {
    id: 77,
    category: CATEGORIES.HEM,
    question: "A 9-month-old exclusively breastfed infant of a vegan mother presents with anemia and hypotonia. Which peripheral blood smear finding is most likely?",
    options: [
      "A. Spherocytes",
      "B. Bite cells",
      "C. Hypersegmented neutrophils",
      "D. Target cells"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Vegan mothers lack dietary vitamin B12, causing megaloblastic anemia in breastfed infants, characterized by hypersegmented neutrophils."
  },
  {
    id: 78,
    category: CATEGORIES.HEM,
    question: "Which laboratory test assesses the extrinsic coagulation pathway?",
    options: [
      "A. Prothrombin time (PT)",
      "B. Partial thromboplastin time (PTT)",
      "C. Hess test",
      "D. Bleeding time"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Prothrombin time (PT/INR) assesses the extrinsic and common pathways of coagulation, primarily factor VII."
  },
  {
    id: 79,
    category: CATEGORIES.GYN,
    question: "Most appropriate drug for active management of the third stage of labor:",
    options: [
      "A. Magnesium sulfate",
      "B. Misoprostol",
      "C. Oxytocin"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Intramuscular or intravenous oxytocin is the global gold standard for preventing postpartum hemorrhage during the third stage of labor."
  },
  {
    id: 80,
    category: CATEGORIES.GYN,
    question: "Strongest modifiable risk factor for endometrial cancer:",
    options: [
      "A. Premature menopause",
      "B. Multiparity",
      "C. Obesity",
      "D. Smoking"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Obesity leads to excess peripheral conversion of androgens to estrogens, driving endometrial proliferation."
  },
  {
    id: 81,
    category: CATEGORIES.GYN,
    question: "Best type of uterine scar in cesarean section:",
    options: [
      "A. T-shaped incision",
      "B. Longitudinal upper segment incision",
      "C. Transverse lower segment incision",
      "D. Transverse upper segment incision"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "A low transverse lower segment incision carries the lowest risk of rupture in subsequent pregnancies."
  },
  {
    id: 82,
    category: CATEGORIES.GYN,
    question: "Assuming no contraindications, which is the first-line, most effective contraceptive method?",
    options: [
      "A. Copper IUD",
      "B. Levonorgestrel (progestin-only pill)",
      "C. Combined oral contraceptive pills",
      "D. Withdrawal (coitus interruptus)"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Long-acting reversible contraceptives (LARCs), like the copper IUD, are the most effective listed method due to extremely low typical-use failure rates."
  },
  {
    id: 83,
    category: CATEGORIES.GYN,
    question: "Safe use of instrumental vaginal delivery is allowed when:",
    options: [
      "A. In any emergency situation",
      "B. Estimated fetal weight > 4.5 kg",
      "C. Fetal head at +2 station or lower",
      "D. Fully dilated cervix in a primigravida with prolonged labor"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "An instrumental delivery requires the fetal head to be engaged and ideally at +2 station or lower to avoid maternal or fetal trauma."
  },
  {
    id: 84,
    category: CATEGORIES.GYN,
    question: "Ten minutes after delivery of a healthy baby, a woman has a sudden gush of blood and apparent lengthening of the umbilical cord. Most likely diagnosis:",
    options: [
      "A. Placental separation",
      "B. Postpartum hemorrhage",
      "C. Retained placenta",
      "D. Uterine rupture"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Sudden gush of blood, lengthening of the cord, and a globoid rise of the uterus are the classic signs of placental separation."
  },
  {
    id: 85,
    category: CATEGORIES.GYN,
    question: "The Kleihauer-Betke test is used to assess:",
    options: [
      "A. Maternal anti-D antibody titer",
      "B. Fetomaternal hemorrhage",
      "C. [blank]",
      "D. [blank]"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "The Kleihauer-Betke test quantifies the amount of fetal red blood cells in maternal circulation to calculate necessary Rhogam dosing."
  },
  {
    id: 86,
    category: CATEGORIES.GYN,
    question: "All are indications for hysterosalpingography, except:",
    options: [
      "A. Infertility evaluation",
      "B. Ectopic pregnancy",
      "C. Assessment of tubal patency",
      "D. Recurrent spontaneous miscarriage"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "HSG is strictly contraindicated in active or suspected ectopic pregnancy; it is used for checking tubal patency in infertility."
  },
  {
    id: 87,
    category: CATEGORIES.GYN,
    question: "Leading cause of maternal death in pregnancy:",
    options: [
      "A. Renal failure",
      "B. Obstetric hemorrhage",
      "C. Gestational diabetes",
      "D. Toxemia/preeclampsia"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Severe obstetric hemorrhage remains the leading cause of maternal mortality worldwide."
  },
  {
    id: 88,
    category: CATEGORIES.GYN,
    question: "If a follicular ovarian cyst continues to secrete estrogen, the endometrial change is:",
    options: [
      "A. Endometrial hyperplasia",
      "B. Ovarian torsion",
      "C. [blank]",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Unopposed persistent estrogen secretion leads to proliferation and potential endometrial hyperplasia."
  },
  {
    id: 89,
    category: CATEGORIES.GYN,
    question: "Migraine is differentiated from tension headache by:",
    options: [
      "A. Bilateral pain",
      "B. Pulsating quality of pain",
      "C. Photophobia",
      "D. Duration > 4 hours"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Migraines are typically characterized by unilateral, throbbing/pulsating pain, unlike the band-like non-pulsating tension headache."
  },
  {
    id: 90,
    category: CATEGORIES.GYN,
    question: "Regarding infertility, which statement is correct?",
    options: [
      "A. Defined after 7 months of regular unprotected intercourse",
      "B. Infertile couples can conceive spontaneously",
      "C. [blank]",
      "D. [blank]"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Many couples meeting clinical criteria for subfertility or infertility can still go on to conceive spontaneously without intervention."
  },
  {
    id: 91,
    category: CATEGORIES.GYN,
    question: "Regarding shoulder dystocia:",
    options: [
      "A. Fetal weight measurement can reliably predict dystocia",
      "B. It is predictable and preventable",
      "C. Recurrence risk in the next pregnancy is about 16%",
      "D. [blank]"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Shoulder dystocia is mostly unpredictable, but a history of shoulder dystocia increases the recurrence risk to around 10-16%."
  },
  {
    id: 92,
    category: CATEGORIES.GYN,
    question: "Hormone responsible for milk ejection:",
    options: [
      "A. Oxytocin",
      "B. Prolactin"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Oxytocin stimulates myoepithelial cell contraction for milk letdown (ejection), while prolactin drives milk production."
  },
  {
    id: 93,
    category: CATEGORIES.NEURO,
    question: "Which personality disorder carries the highest suicide risk?",
    options: [
      "A. Avoidant",
      "B. Borderline",
      "C. Dependent",
      "D. Schizotypal"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Borderline Personality Disorder is highly associated with self-harm behaviors and has a suicide completion rate of up to 10%."
  },
  {
    id: 94,
    category: CATEGORIES.NEURO,
    question: "Which is a positive symptom of schizophrenia?",
    options: [
      "A. Anhedonia",
      "B. Flat affect",
      "C. Thought insertion",
      "D. Alogia"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Thought insertion is a delusion (positive symptom); flat affect, anhedonia, and alogia are negative symptoms."
  },
  {
    id: 95,
    category: CATEGORIES.NEURO,
    question: "Which feature best differentiates migraine from tension headache?",
    options: [
      "1. Photophobia",
      "2. Pulsating pain"
    ],
    correctAnswer: "1",
    correctIndex: 0,
    justification: "Photophobia (and phonophobia) are highly specific diagnostic criteria for migraines that are absent in tension-type headaches."
  },
  {
    id: 96,
    category: CATEGORIES.NEURO,
    question: "Which of the following is classified as an arousal disorder in sexual dysfunction?",
    options: [
      "A. Female sexual interest/arousal disorder",
      "B. Male hypoactive sexual desire disorder",
      "C. Genito-pelvic pain/penetration disorder",
      "D. Premature ejaculation"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Female sexual interest/arousal disorder directly combines desire and arousal deficits under DSM-5."
  },
  {
    id: 97,
    category: CATEGORIES.NEURO,
    question: "Conservative management of delirium includes which measure?",
    options: [
      "A. Frequent visits from family and friends",
      "B. Frequent changes of nursing staff",
      "C. Quiet, well-lit room with orientation aids",
      "D. Adequate but minimal sedative use"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Non-pharmacological reorientation, consistent environment, and sensory aids are the gold standard first steps for managing delirium."
  },
  {
    id: 98,
    category: CATEGORIES.NEURO,
    question: "Decerebrate posturing indicates a lesion at the level of the:",
    options: [
      "A. Cerebral cortex",
      "B. Thalamus",
      "C. Midbrain",
      "D. Pons"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Decerebrate (extensor) posturing indicates a brainstem lesion at or below the level of the red nucleus (midbrain)."
  },
  {
    id: 99,
    category: CATEGORIES.NEURO,
    question: "Which clinical course is most common in multiple sclerosis?",
    options: [
      "A. Aggressive tumor-like MS",
      "B. Primary progressive MS",
      "C. Relapsing-remitting MS",
      "D. Secondary progressive MS"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Relapsing-Remitting MS (RRMS) is the initial presentation in approximately 85% of multiple sclerosis patients."
  },
  {
    id: 100,
    category: CATEGORIES.NEURO,
    question: "Melancholic depression is characterized by:",
    options: [
      "A. Empty mood",
      "B. [other options if needed]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "An \"empty\" or flat/profoundly depressed mood with severe anhedonia is a core feature of melancholic depression."
  },
  {
    id: 101,
    category: CATEGORIES.NEURO,
    question: "Pinpoint pupils are most classically seen in:",
    options: [
      "A. Thalamic lesion",
      "B. Midbrain lesion",
      "C. Uncal herniation",
      "D. Pontine hemorrhage"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "Disruption of sympathetic pathways in a pontine hemorrhage leaves parasympathetic ocular pathways unopposed, producing pinpoint (\"pinhead\") pupils."
  },
  {
    id: 102,
    category: CATEGORIES.NEURO,
    question: "Which is a symptom of anorexia nervosa but not typical of bulimia nervosa?",
    options: [
      "A. Amenorrhea",
      "B. Dental erosion",
      "C. Gastrointestinal disturbances",
      "D. Mood disturbance"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Amenorrhea resulting from hypogonadotropic hypogonadism is highly characteristic of the severe weight loss seen in anorexia."
  },
  {
    id: 103,
    category: CATEGORIES.NEURO,
    question: "Which is correct regarding arousal disorders?",
    options: [
      "A. Female sexual interest/arousal disorder",
      "B. Hypoactive desire disorder",
      "C. Penetration disorder",
      "D. Premature ejaculation"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Female sexual interest/arousal disorder is classified as a sexual arousal/desire dysfunction."
  },
  {
    id: 104,
    category: CATEGORIES.NEURO,
    question: "Personality disorder with increased suicide risk:",
    options: [
      "A. Borderline personality disorder",
      "B. Paranoid personality disorder"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Borderline personality disorder features chronic suicidal behavior, gestures, and self-mutilation."
  },
  {
    id: 105,
    category: CATEGORIES.NEURO,
    question: "How to differentiate migraine from tension headache?",
    options: [
      "A. Pulsating pain",
      "B. Bilateral location",
      "C. Photophobia",
      "D. [blank]"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Pulsating/throbbing character is a hallmark of migraine; tension headaches are typically dull, non-pulsatile bands."
  },
  {
    id: 106,
    category: CATEGORIES.PH,
    question: "Which pathogen is primarily spread by the airborne route?",
    options: [
      "A. Influenza virus",
      "B. Mycobacterium tuberculosis",
      "C. Rubella virus",
      "D. MRSA"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Mycobacterium tuberculosis is transmitted via tiny droplet nuclei that remain suspended in the air (airborne transmission)."
  },
  {
    id: 107,
    category: CATEGORIES.PH,
    question: "Regarding breastfeeding, which hormone is responsible for milk ejection?",
    options: [
      "A. Cortisol",
      "B. Estrogen",
      "C. Oxytocin",
      "D. Prolactin"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Oxytocin stimulates myoepithelial cells in the breast to contract and eject milk."
  },
  {
    id: 108,
    category: CATEGORIES.PH,
    question: "Regarding innate immunity, which statement is least appropriate?",
    options: [
      "A. Unlimited diversity",
      "B. Nonspecific response",
      "C. Does not require previous exposure",
      "D. Acts within minutes"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Adaptive immunity features virtually unlimited antigen receptor diversity; innate immunity has limited, germline-encoded pattern recognition."
  },
  {
    id: 109,
    category: CATEGORIES.PH,
    question: "Which is true about live attenuated vaccines?",
    options: [
      "A. Not given to children",
      "B. Not given to immunocompromised patients",
      "C. Not affected by preexisting antibodies",
      "D. [blank]"
    ],
    correctAnswer: "B",
    correctIndex: 1,
    justification: "Live vaccines can replicate uncontrollably in immunocompromised hosts, causing severe or fatal vaccine-strain disease."
  },
  {
    id: 110,
    category: CATEGORIES.PH,
    question: "In mumps meningitis, which finding is typical?",
    options: [
      "A. High fever",
      "B. Ataxia",
      "C. Low CSF glucose",
      "D. [blank]"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Mumps virus is an exception among viral causes of meningitis because it can produce a low CSF glucose level mimicking bacterial infection."
  },
  {
    id: 111,
    category: CATEGORIES.PH,
    question: "Appropriate management of a deep bite wound suspected for rabies:",
    options: [
      "A. Antiviral treatment",
      "B. Antibiotics only",
      "C. Active immunization with HDCV or RABV vaccine +- immunoglobulin",
      "D. Suturing and debridement of the wound only"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Rabies post-exposure prophylaxis (PEP) consists of passive immunization with rabies immunoglobulin (RIG) and active vaccination."
  },
  {
    id: 112,
    category: CATEGORIES.PH,
    question: "Treatment of pityriasis rubra pilaris (PRP):",
    options: [
      "A. Acitretin",
      "B. Doxycycline",
      "C. Hydroxychloroquine",
      "D. Prednisolone"
    ],
    correctAnswer: "A",
    correctIndex: 0,
    justification: "Oral retinoids, specifically acitretin, are the first-line systemic agents for severe pityriasis rubra pilaris."
  },
  {
    id: 113,
    category: CATEGORIES.PED,
    question: "Regarding antiepileptic drugs in children, which is true?",
    options: [
      "A. Chosen according to age and sex of the patient",
      "B. Start with maximum dose, then taper to minimum effective dose",
      "C. Two low-dose drugs are better than a single high-dose drug",
      "D. If toxicity appears, stop the drug and switch to an alternative"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "Development of severe toxicity requires immediate discontinuance of the offending antiepileptic agent and transition to an alternative."
  },
  {
    id: 114,
    category: CATEGORIES.PED,
    question: "Which type of cerebral palsy is most commonly caused by birth asphyxia?",
    options: [
      "A. Spastic hemiplegia",
      "B. Spastic diplegia",
      "C. Spastic quadriplegia",
      "D. Choreoathetoid CP"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "Spastic quadriplegia is the most severe form of spastic CP and is heavily linked to severe intrapartum hypoxic-ischemic insults."
  },
  {
    id: 115,
    category: CATEGORIES.PED,
    question: "Typical presentation of immune thrombocytopenic purpura (ITP) in children:",
    options: [
      "A. [blank]",
      "B. Petechiae, purpura, ecchymoses",
      "C. Post-viral purpura with mucosal bleeding",
      "D. [blank]"
    ],
    correctAnswer: "C",
    correctIndex: 2,
    justification: "ITP in children typically occurs 1-4 weeks after a viral infection, presenting with sudden onset of petechiae/purpura and mild mucosal bleeding."
  },
  {
    id: 116,
    category: CATEGORIES.PED,
    question: "In IgA nephropathy, which statement is incorrect?",
    options: [
      "A. Gross hematuria often occurs with GI or respiratory infections",
      "B. Some patients have microscopic hematuria with or without proteinuria",
      "C. May present with nephrotic, nephritic, or mixed picture",
      "D. Always diagnosed clinically (no biopsy needed)"
    ],
    correctAnswer: "D",
    correctIndex: 3,
    justification: "A definitive diagnosis of IgA nephropathy cannot be made purely clinically; a renal biopsy showing mesangial IgA deposition is required."
  }
];
