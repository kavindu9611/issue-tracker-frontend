import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const schema = z
  .object({
    email: z.string().email(),
    otp: z.string().length(6),
    newPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type FormData = z.infer<typeof schema>;

const resetPassword = async (data: FormData) => {
  const res = await axios.post("/api/auth/reset-password", data);
  return res.data;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => navigate("/login"),
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <Input {...register("otp")} placeholder="OTP" />
        {errors.otp && <p>{errors.otp.message}</p>}
        <Input
          type="password"
          {...register("newPassword")}
          placeholder="New Password"
        />
        {errors.newPassword && <p>{errors.newPassword.message}</p>}
        <Input
          type="password"
          {...register("confirmNewPassword")}
          placeholder="Confirm New Password"
        />
        {errors.confirmNewPassword && (
          <p>{errors.confirmNewPassword.message}</p>
        )}
        <Button type="submit">Reset Password</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
