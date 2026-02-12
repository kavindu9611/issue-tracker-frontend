import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from "@/api/axios";

const schema = z.object({
  email: z.string().email()
})

type FormData = z.infer<typeof schema>

const forgotPassword = async (data: FormData) => {
  const res = await api.post('/api/auth/forgot-password', data)
  return res.data
}

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => navigate('/reset-password')
  })

  const onSubmit = (data: FormData) => mutation.mutate(data)

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register('email')} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <Button type="submit">Send Reset OTP</Button>
      </form>
    </div>
  )
}

export default ForgotPassword