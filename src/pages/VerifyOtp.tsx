import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import useAuthStore from '../stores/authStore'

const schema = z.object({
  email: z.string().email(),
  otp: z.string().length(6)
})

type FormData = z.infer<typeof schema>

const verifyOtp = async (data: FormData) => {
  const res = await axios.post('/api/auth/verify-otp', data)
  return res.data
}

const VerifyOtp = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore(state => state.setAuth)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const mutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      setAuth(data.token, data.user)
      navigate('/')
    }
  })

  const onSubmit = (data: FormData) => mutation.mutate(data)

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register('email')} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <Input {...register('otp')} placeholder="OTP" />
        {errors.otp && <p>{errors.otp.message}</p>}
        <Button type="submit">Verify</Button>
      </form>
    </div>
  )
}

export default VerifyOtp