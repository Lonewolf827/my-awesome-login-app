// app/auth/page.tsx
import { signin, signup } from './actions'
import Link from 'next/link'

export default function AuthPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Sign In / Sign Up</h2>
        
        {searchParams.message && (
          <p className="mt-4 p-3 rounded-md text-sm text-center bg-yellow-100 text-yellow-700">
            {searchParams.message}
          </p>
        )}

        {/* --- Login Form --- */}
        <form className="space-y-4" action={signin}>
          <h3 className="text-xl font-semibold">Sign In</h3>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* --- Signup Form (Sederhana) --- */}
        <form className="space-y-4" action={signup}>
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name (for profile)</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="signupEmail"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="newuser@example.com"
            />
          </div>
          <div>
            <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="signupPassword"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
