import { Routes, Route } from 'react-router-dom'
import { Layout } from '../core/layout'
import { HomePage } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import { RegisterPage } from '../pages/Register'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}
