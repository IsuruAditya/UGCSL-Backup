import "dotenv/config";
import mongoose from "mongoose";
import Program from "./models/Program";
import News from "./models/News";
import ResearchDirector from "./models/ResearchDirector";

const seedPrograms = [
  {
    title: "Human Rights",
    title_si: "මානව හිමිකම්",
    slug: "human-rights",
    faculty: "Faculty of Law and Human Rights",
    faculty_si: "නීතිය සහ මානව හිමිකම් පීඨය",
    degree: "Foundation Diploma",
    degree_si: "පදනම් ඩිප්ලෝමා",
    duration: "6 months",
    duration_si: "මාස 6",
    description:
      "A focused study on legal frameworks, civil liberties, and the protection of human rights within judicial systems.",
    description_si:
      "නීතිමය රාමූන්, සිවිල් නිදහස සහ අධිකරණ පද්ධතීන් තුළ මානව හිමිකම් ආරක්ෂා කිරීම පිළිබඳ විශේෂ අධ්‍යයනයක්.",
    icon: "⚖️",
    featured: true,
    overview:
      "This diploma provides a comprehensive understanding of human rights laws and their application in legal contexts.",
    overview_si:
      "මෙම ඩිප්ලෝමාව මගින් මානව හිමිකම් නීති සහ නීතිමය සන්දර්භයන් තුළ ඒවායේ භාවිතය පිළිබඳ පුළුල් අවබෝධයක් ලබා දෙයි.",
    modules: [
      "Introduction to Legal Systems",
      "Constitutional Law",
      "Civil and Political Rights",
    ],
    modules_si: [
      "නීති පද්ධති පිළිබඳ හැඳින්වීම",
      "ආණ්ඩුක්‍රම ව්‍යවස්ථා නීතිය",
      "සිවිල් සහ දේශපාලන අයිතිවාසිකම්",
    ],
    outcomes: [
      "Analyze legal implications of human rights violations",
      "Support legal advocacy efforts",
    ],
    outcomes_si: [
      "මානව හිමිකම් උල්ලංඝනය කිරීම්වල නීතිමය බලපෑම් විශ්ලේෂණය කිරීම",
      "නීතිමය උපදේශන ප්‍රයත්නයන්ට සහාය වීම",
    ],
    careers: ["Legal Assistant", "Human Rights Consultant"],
    careers_si: ["නීති සහායක", "මානව හිමිකම් උපදේශක"],
    requirements: ["O/L or equivalent qualification"],
    requirements_si: ["අපොස සාමාන්‍ය පෙළ හෝ ඊට සමාන සුදුසුකම්"],
    fees: "LKR 25,000",
    fees_si: "රු. 25,000 කි",
    intake: "2026",
    intake_si: "2026",
  },
  {
    title: "Natural Beauticulture",
    title_si: "ස්වාභාවික රූපලාවණ්‍ය ශිල්පය",
    slug: "natural-beauticulture",
    faculty: "Faculty of Cosmetology and Aesthetic Science",
    faculty_si: "රූපලාවණ්ය හා සෞන්දර්ය විද්යා පීඨය",
    degree: "Foundation Diploma",
    degree_si: "පදනම් ඩිප්ලෝමා",
    duration: " 6 months",
    duration_si: "මාස 6",
    description:
      "Learn the principles of natural beauty treatments, organic products, and aesthetic care techniques.",
    description_si:
      "ස්වාභාවික රූපලාවණ්‍ය ප්‍රතිකාර, කාබනික නිෂ්පාදන සහ සෞන්දර්යාත්මක සත්කාර ශිල්පීය ක්‍රම පිළිබඳ මූලධර්ම ඉගෙන ගන්න.",
    icon: "🌿",
    featured: true,
    overview:
      "This course introduces students to the science and art of natural skin and hair care using holistic approaches.",
    overview_si:
      "මෙම පාඨමාලාව පරිපූර්ණ ප්‍රවේශයන් භාවිතා කරමින් ස්වාභාවික සම සහ හිසකෙස් රැකවරණය පිළිබඳ විද්‍යාව සහ කලාව සිසුන්ට හඳුන්වා දෙයි.",
    modules: [
      "Skin Care Essentials",
      "Herbal Cosmetology",
      "Aesthetic Science Basics",
    ],
    modules_si: [
      "සම රැකවරණයේ අත්‍යවශ්‍ය කරුණු",
      "ඖෂධීය රූපලාවණ්‍ය විද්‍යාව",
      "සෞන්දර්ය විද්‍යාවේ මූලික කරුණු",
    ],
    outcomes: [
      "Develop natural beauty products",
      "Provide basic aesthetic consultations",
    ],
    outcomes_si: [
      "ස්වාභාවික රූපලාවණ්‍ය නිෂ්පාදන නිපදවීම",
      "මූලික සෞන්දර්යාත්මක උපදේශන ලබා දීම",
    ],
    careers: ["Beautician", "Beauty Product Developer"],
    careers_si: ["රූපලාවණ්‍ය ශිල්පී", "රූපලාවණ්‍ය නිෂ්පාදන සංවර්ධක"],
    requirements: ["O/L or equivalent qualification"],
    requirements_si: ["අපොස සාමාන්‍ය පෙළ හෝ ඊට සමාන සුදුසුකම්"],
    fees: "LKR 30,000",
    fees_si: "රු. 30,000 කි",
    intake: "2026",
    intake_si: "2026",
  },
];

const tba = (id: string, role: string, faculty: string, order: number) => ({
  directorId: id,
  name: 'To Be Announced',
  role,
  faculty,
  specialization: 'Appointment pending',
  bio: 'Appointment pending.',
  photo: null,
  order,
});

const seedResearchDirectors = Array.from({ length: 25 }, (_, i) =>
  tba(`RD-${String(i + 1).padStart(3, '0')}`, 'Research Director', 'To Be Announced', i + 1)
);

const seedNews = [
  {
    title: "UGCSL Opens Admissions for 2026 Intake",
    slug: "ugcsl-opens-admissions-2026-intake",
    category: "Admissions",
    excerpt:
      "United Global Campus of Sri Lanka is now accepting applications for the 2026 intake. Apply before December 31, 2026.",
    content: `<p>United Global Campus of Sri Lanka (UGCSL) is pleased to announce that applications for the 2026 intake are now officially open. This marks an exciting milestone as we welcome our inaugural cohort of students to join our innovative online learning community.</p>

<h3>Available Programs</h3>
<p>We are currently accepting applications for two Foundation Diploma programs:</p>
<ul>
<li><strong>Foundation Diploma in Human Rights</strong> - A comprehensive 6-month program focusing on legal frameworks, civil liberties, and human rights protection within judicial systems.</li>
<li><strong>Foundation Diploma in Natural Beauticulture</strong> - A specialized 6-month program covering natural beauty treatments, organic products, and aesthetic care techniques.</li>
</ul>

<h3>Application Process</h3>
<p>Our streamlined application process makes it easy to take the next step in your academic journey:</p>
<ol>
<li>Browse our diploma programs and choose the right fit for your career goals</li>
<li>Review entry requirements and prepare supporting documents</li>
<li>Submit your complete application via our contact page</li>
<li>Receive your admission decision within 2-3 weeks</li>
</ol>

<h3>Entry Requirements</h3>
<p>For our Foundation Diploma programs, applicants need:</p>
<ul>
<li>O/L or equivalent qualification</li>
<li>Minimum credits in relevant subjects</li>
<li>Basic English proficiency</li>
<li>Completed application form</li>
<li>Copy of NIC or passport</li>
</ul>

<h3>Important Dates</h3>
<p><strong>Application Deadline:</strong> December 31, 2026<br>
<strong>Program Start:</strong> January 2027<br>
<strong>Duration:</strong> 6 months (100% online)</p>

<h3>Why Choose UGCSL?</h3>
<p>As Sri Lanka's newest higher education institution, UGCSL offers:</p>
<ul>
<li>Fully online, flexible learning designed for working professionals</li>
<li>Nationally and internationally recognized qualifications</li>
<li>Expert faculty committed to your success</li>
<li>Affordable, transparent fee structure</li>
<li>Career-ready education bridging theory and practice</li>
</ul>

<p>Don't miss this opportunity to be part of our founding student cohort. <a href="/admissions">Apply now</a> or <a href="/contact">contact us</a> for more information.</p>`,
    date: new Date("2026-03-01"),
    image: "https://res.cloudinary.com/dxkfytlpu/image/upload/f_auto,q_auto,w_900/AdmissonOpen_dsfsya",
    author: "UGCSL Admissions Office",
  },
  {
    title: "UGCSL Officially Established as a Higher Education Institution",
    slug: "ugcsl-officially-established",
    category: "Announcement",
    excerpt:
      "United Global Campus (Pvt) Ltd. has been officially established in Sri Lanka.",
    content: `<p>We are proud to announce that United Global Campus (Pvt) Ltd. has been officially established and registered under the Companies Act No. 07 of 2007 in Sri Lanka. This historic milestone marks the beginning of a new era in accessible, quality higher education in the country.</p>

<h3>Our Vision</h3>
<p>UGCSL was founded with a clear vision: to become a globally recognized center of higher education by delivering innovative, quality-driven academic programs that develop knowledgeable, skilled, and socially responsible global citizens.</p>

<h3>Mission and Objectives</h3>
<p>Our mission is to deliver nationally and internationally recognized higher education programs that integrate academic excellence, practical skills, research, innovation, and leadership development. We aim to empower students to achieve professional success and contribute meaningfully to society.</p>

<p>Key objectives include:</p>
<ul>
<li>Designing and delivering recognized certificates, diplomas, and professional programs</li>
<li>Creating a comprehensive learning environment integrating knowledge, skills, and innovation</li>
<li>Promoting quality education based on research and societal needs</li>
<li>Expanding global opportunities through partnerships with universities and industries</li>
<li>Strengthening the link between education, training, and employability</li>
<li>Providing inclusive, equitable, and globally competitive education for all</li>
</ul>

<h3>Initial Program Offerings</h3>
<p>UGCSL launches with two Foundation Diploma programs across our Faculty of Law and Human Rights and Faculty of Cosmetology and Aesthetic Science. These programs are designed to be 100% online, making quality education accessible to students across Sri Lanka and beyond.</p>

<h3>Leadership</h3>
<p>Under the leadership of our Founder and CEO, Dr. W.A.A. Sampath Indrajit, along with our dedicated management team, UGCSL is committed to maintaining the highest standards of academic excellence and institutional integrity.</p>

<h3>Looking Ahead</h3>
<p>This is just the beginning. As we welcome our first cohort of students in 2026, we are already planning to expand our program offerings, establish partnerships with international universities, and launch research initiatives that will contribute to Sri Lanka's position as a leading higher education hub in South Asia.</p>

<p>We invite you to be part of this exciting journey. <a href="/about">Learn more about UGCSL</a> or <a href="/admissions">apply for our 2026 intake</a>.</p>`,
    date: new Date("2026-01-15"),
    image: "https://res.cloudinary.com/dxkfytlpu/image/upload/f_auto,q_auto,w_900/debut_wmtlo6",
    author: "UGCSL Communications",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");

    await Program.deleteMany({});
    await Program.insertMany(seedPrograms);
    console.log(`Seeded ${seedPrograms.length} programs`);

    await News.deleteMany({});
    await News.insertMany(seedNews);
    console.log(`Seeded ${seedNews.length} news items`);

    await ResearchDirector.deleteMany({});
    await ResearchDirector.insertMany(seedResearchDirectors);
    console.log(`Seeded ${seedResearchDirectors.length} research directors`);

    await mongoose.disconnect();
    console.log("Database seeding completed successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seed();
