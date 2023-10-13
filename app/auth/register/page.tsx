import { RegisterForm } from '@/components/auth/register-form'
import { AuthLayout } from '@/components/auth/auth-layout'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your journey with ReasonAAI"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/auth/login"
    >
      <RegisterForm />
    </AuthLayout>
  )
}
