import mongoose from 'mongoose'

declare global {
  var mongoose: { conn: any; promise: any } | undefined
}

let cached = global.mongoose || { conn: null, promise: null }
global.mongoose = cached

export default async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable not defined')
  }

  if (cached.conn) return cached.conn
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    })
  }
  
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }
  
  return cached.conn
}
