/**
 * =====================================================
 *   Appointy - Full Database Seed Script
 * =====================================================
 *
 * Seeds the database with:
 *   - 10 Doctors (across all specialities)
 *   - 3 Test Users
 *   - 5 Sample Appointments
 *
 * Usage:
 *   node scripts/seed.js          → seed everything
 *   node scripts/seed.js --clear  → wipe DB then seed
 *
 * Test Credentials:
 *   User:  user1@appointy.com / test@1234
 *   Admin: admin@appointy.com  / admin@123  (from .env)
 * =====================================================
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import connectDB from '../config/mongodb.js'
import doctorModel from '../models/doctorModel.js'
import userModel from '../models/userModel.js'
import appointmentModel from '../models/appointmentModel.js'

// ─── Helpers ────────────────────────────────────────

const hash = async (plain) => bcrypt.hash(plain, 10)

/** Returns a random slot date string (today + N days, "DD_MM_YYYY") */
const futureSlotDate = (daysAhead) => {
  const d = new Date()
  d.setDate(d.getDate() + daysAhead)
  return `${d.getDate()}_${d.getMonth() + 1}_${d.getFullYear()}`
}

/** Placeholder avatar via UI Avatars */
const avatar = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=5f6FFF&color=fff&size=200`

// ─── Doctor Data ─────────────────────────────────────

const DOCTORS = [
  {
    name: 'Dr. Aarav Sharma',
    email: 'aarav.sharma@appointy.com',
    speciality: 'General physician',
    degree: 'MBBS, MD',
    experience: '7 Years',
    fees: 400,
    about:
      'Dr. Aarav Sharma is a dedicated general physician with 7 years of experience in primary care, preventive medicine, and chronic disease management.',
    address: { line1: '12, MG Road', line2: 'Connaught Place, New Delhi' },
  },
  {
    name: 'Dr. Priya Mehta',
    email: 'priya.mehta@appointy.com',
    speciality: 'Gynecologist',
    degree: 'MBBS, MS (OBG)',
    experience: '9 Years',
    fees: 600,
    about:
      'Dr. Priya Mehta specialises in women\'s health, obstetrics, and gynaecological disorders, providing compassionate and evidence-based care.',
    address: { line1: '45, Bandra West', line2: 'Mumbai, Maharashtra' },
  },
  {
    name: 'Dr. Rohan Verma',
    email: 'rohan.verma@appointy.com',
    speciality: 'Dermatologist',
    degree: 'MBBS, MD (Dermatology)',
    experience: '5 Years',
    fees: 500,
    about:
      'Dr. Rohan Verma is a skilled dermatologist focused on skin, hair, and nail conditions, offering both medical and cosmetic dermatology services.',
    address: { line1: '8, Koregaon Park', line2: 'Pune, Maharashtra' },
  },
  {
    name: 'Dr. Sneha Iyer',
    email: 'sneha.iyer@appointy.com',
    speciality: 'Pediatricians',
    degree: 'MBBS, DCH, MD',
    experience: '11 Years',
    fees: 450,
    about:
      'Dr. Sneha Iyer is a compassionate paediatrician with over a decade of experience in child health, nutrition, and developmental medicine.',
    address: { line1: '23, Anna Salai', line2: 'Chennai, Tamil Nadu' },
  },
  {
    name: 'Dr. Karan Bose',
    email: 'karan.bose@appointy.com',
    speciality: 'Neurologist',
    degree: 'MBBS, MD, DM (Neurology)',
    experience: '14 Years',
    fees: 900,
    about:
      'Dr. Karan Bose is a senior neurologist specialising in stroke, epilepsy, headache disorders, and neurodegenerative diseases.',
    address: { line1: '5, Park Street', line2: 'Kolkata, West Bengal' },
  },
  {
    name: 'Dr. Ananya Kapoor',
    email: 'ananya.kapoor@appointy.com',
    speciality: 'Gastroenterologist',
    degree: 'MBBS, MD, DM (Gastro)',
    experience: '8 Years',
    fees: 700,
    about:
      'Dr. Ananya Kapoor is an expert gastroenterologist managing disorders of the digestive system, liver, and pancreas with precision.',
    address: { line1: '90, Jubilee Hills', line2: 'Hyderabad, Telangana' },
  },
  {
    name: 'Dr. Vikram Nair',
    email: 'vikram.nair@appointy.com',
    speciality: 'General physician',
    degree: 'MBBS, MD (Internal Medicine)',
    experience: '6 Years',
    fees: 350,
    about:
      'Dr. Vikram Nair provides comprehensive primary care with an emphasis on lifestyle medicine, diabetes, and hypertension management.',
    address: { line1: '17, Marine Drive', line2: 'Kochi, Kerala' },
  },
  {
    name: 'Dr. Divya Rajput',
    email: 'divya.rajput@appointy.com',
    speciality: 'Dermatologist',
    degree: 'MBBS, DVD',
    experience: '4 Years',
    fees: 450,
    about:
      'Dr. Divya Rajput focuses on acne, eczema, psoriasis, and aesthetic procedures. She believes in personalised treatment plans for every patient.',
    address: { line1: '33, Civil Lines', line2: 'Jaipur, Rajasthan' },
  },
  {
    name: 'Dr. Arjun Malhotra',
    email: 'arjun.malhotra@appointy.com',
    speciality: 'Pediatricians',
    degree: 'MBBS, MD (Pediatrics)',
    experience: '10 Years',
    fees: 500,
    about:
      'Dr. Arjun Malhotra is a trusted paediatrician providing expert care in newborn health, vaccinations, growth monitoring, and childhood illnesses.',
    address: { line1: '60, Sector 17', line2: 'Chandigarh, Punjab' },
  },
  {
    name: 'Dr. Meera Pillai',
    email: 'meera.pillai@appointy.com',
    speciality: 'Gynecologist',
    degree: 'MBBS, DGO, FRCOG',
    experience: '16 Years',
    fees: 800,
    about:
      'Dr. Meera Pillai is a highly experienced gynaecologist and obstetrician, known for her expertise in high-risk pregnancies and laparoscopic surgeries.',
    address: { line1: '2, Indiranagar', line2: 'Bengaluru, Karnataka' },
  },
]

// ─── User Data ───────────────────────────────────────

const USERS = [
  {
    name: 'Rahul Gupta',
    email: 'user1@appointy.com',
    phone: '9876543210',
    gender: 'Male',
    dob: '1995-08-14',
    address: { line1: 'A-12, Saket', line2: 'New Delhi' },
  },
  {
    name: 'Simran Kaur',
    email: 'user2@appointy.com',
    phone: '9123456780',
    gender: 'Female',
    dob: '1998-03-22',
    address: { line1: '55, Salt Lake', line2: 'Kolkata' },
  },
  {
    name: 'Amit Joshi',
    email: 'user3@appointy.com',
    phone: '9001234567',
    gender: 'Male',
    dob: '1990-11-05',
    address: { line1: '7, FC Road', line2: 'Pune' },
  },
]

// ─── Main Seed Function ───────────────────────────────

const seed = async () => {
  const args = process.argv.slice(2)
  const shouldClear = args.includes('--clear')

  console.log('\n🌱  Appointy Seeder Starting...\n')
  await connectDB()

  // ── Optional wipe ──
  if (shouldClear) {
    console.log('🗑️   --clear flag detected. Wiping existing data...')
    await doctorModel.deleteMany({})
    await userModel.deleteMany({})
    await appointmentModel.deleteMany({})
    console.log('    ✔ Collections cleared.\n')
  }

  const docPassword = await hash('doc@1234')
  const userPassword = await hash('test@1234')

  // ── Seed Doctors ──
  console.log('👨‍⚕️  Seeding doctors...')
  const insertedDoctors = []

  for (const doc of DOCTORS) {
    const exists = await doctorModel.findOne({ email: doc.email })
    if (exists) {
      console.log(`    ⚠ Skipped (already exists): ${doc.name}`)
      insertedDoctors.push(exists)
      continue
    }
    const created = await doctorModel.create({
      ...doc,
      password: docPassword,
      image: avatar(doc.name),
      available: true,
      slots_booked: {},
      date: Date.now(),
    })
    insertedDoctors.push(created)
    console.log(`    ✔ Created: ${doc.name} (${doc.speciality})`)
  }

  // ── Seed Users ──
  console.log('\n👤  Seeding users...')
  const insertedUsers = []

  for (const u of USERS) {
    const exists = await userModel.findOne({ email: u.email })
    if (exists) {
      console.log(`    ⚠ Skipped (already exists): ${u.name}`)
      insertedUsers.push(exists)
      continue
    }
    const created = await userModel.create({
      ...u,
      password: userPassword,
    })
    insertedUsers.push(created)
    console.log(`    ✔ Created: ${u.name} (${u.email})`)
  }

  // ── Seed Appointments ──
  console.log('\n📅  Seeding appointments...')

  const APPOINTMENTS = [
    {
      user: insertedUsers[0],
      doctor: insertedDoctors[0], // General Physician
      slotDate: futureSlotDate(1),
      slotTime: '10:00 am',
      cancelled: false,
      payment: true,
      isCompleted: false,
    },
    {
      user: insertedUsers[1],
      doctor: insertedDoctors[2], // Dermatologist
      slotDate: futureSlotDate(2),
      slotTime: '11:30 am',
      cancelled: false,
      payment: false,
      isCompleted: false,
    },
    {
      user: insertedUsers[2],
      doctor: insertedDoctors[4], // Neurologist
      slotDate: futureSlotDate(3),
      slotTime: '2:00 pm',
      cancelled: false,
      payment: true,
      isCompleted: true,
    },
    {
      user: insertedUsers[0],
      doctor: insertedDoctors[1], // Gynecologist
      slotDate: futureSlotDate(-2), // past appointment
      slotTime: '9:00 am',
      cancelled: false,
      payment: true,
      isCompleted: true,
    },
    {
      user: insertedUsers[1],
      doctor: insertedDoctors[3], // Pediatrician
      slotDate: futureSlotDate(5),
      slotTime: '4:30 pm',
      cancelled: true,
      payment: false,
      isCompleted: false,
    },
  ]

  for (const appt of APPOINTMENTS) {
    const { user, doctor, slotDate, slotTime, cancelled, payment, isCompleted } = appt

    // Build minimal userData & docData snapshots (as stored in DB)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      gender: user.gender,
      dob: user.dob,
      image: user.image,
    }

    const docData = {
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      speciality: doctor.speciality,
      degree: doctor.degree,
      experience: doctor.experience,
      fees: doctor.fees,
      image: doctor.image,
      address: doctor.address,
    }

    // Check duplicate (same user + doctor + slot)
    const exists = await appointmentModel.findOne({
      userId: String(user._id),
      docId: String(doctor._id),
      slotDate,
      slotTime,
    })
    if (exists) {
      console.log(`    ⚠ Skipped duplicate appointment: ${user.name} → ${doctor.name}`)
      continue
    }

    await appointmentModel.create({
      userId: String(user._id),
      docId: String(doctor._id),
      slotDate,
      slotTime,
      userData,
      docData,
      amount: doctor.fees,
      date: Date.now(),
      cancelled,
      payment,
      isCompleted,
    })
    console.log(`    ✔ ${user.name} → ${doctor.name} on ${slotDate} at ${slotTime}`)
  }

  // ── Summary ──
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Seeding complete!

📋  Test Credentials
    ─────────────────────────────────────
    👤 User Login
       Email:    user1@appointy.com
       Password: test@1234

    👤 User Login (alt)
       Email:    user2@appointy.com
       Password: test@1234

    🔧 Admin Login (from .env)
       Email:    ${process.env.ADMIN_EMAIL}
       Password: ${process.env.ADMIN_PASSWORD}

    👨‍⚕️ Doctor Login (any seeded doctor)
       Password: doc@1234

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌  Seeding failed:', err.message)
  process.exit(1)
})
