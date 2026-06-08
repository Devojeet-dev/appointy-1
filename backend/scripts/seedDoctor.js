import 'dotenv/config'
import connectDB from '../config/mongodb.js'
import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'

const run = async () => {
  try {
    await connectDB()
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash('docpassword', salt)

    const doctorData = {
      name: 'Dr Test',
      email: `drtest+${Date.now()}@example.com`,
      password: hashed,
      speciality: 'General Physician',
      degree: 'MBBS',
      experience: '5 years',
      about: 'Seeded test doctor',
      fees: 500,
      available: true,
      slots_booked: {},
      address: { line1: '123 Test St', line2: 'Test City' },
      image: '',
      date: Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()
    console.log('Created doctor with id:', newDoctor._id)
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
