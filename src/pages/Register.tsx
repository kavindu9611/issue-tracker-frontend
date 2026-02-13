import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Shadcn
import { Input } from "@/components/ui/input"; // Shadcn
import api from "@/api/axios";

const schema = z
  .object({
    fullName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const registerUser = async (data: FormData) => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => navigate("/login"),
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register("fullName")} placeholder="Full Name" />
        {errors.fullName && <p>{errors.fullName.message}</p>}
        <Input {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <Input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <Input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
