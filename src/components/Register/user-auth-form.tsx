"use client";
import { useState } from "react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const server = 'https://fastbio-backend.onrender.com';
  async function checkUsernameAvailability(username: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${server}/auth/check-username/${username}`
      );
      return !response.data.exists;
    } catch (error) {
      console.error(error);
      return true;
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const isUsernameAvailable = await checkUsernameAvailability(username);

      if (!isUsernameAvailable) {
        setError("Username already exists. Please choose a different one.");
        toast({
          title: "Registration Failed",
          description:
            "Username already exists. Please choose a different one.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      await axios.post(`${server}/auth/register`, {
        username,
        password,
      });

      toast({
        title: "Registration Completed",
        description: "Redirecting to login page.",
        variant: "success",
      });

      setUsername("");
      setPassword("");
      setError(null);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("An error occurred during registration. Please try again.");
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              required
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              required
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="text-white">
            {isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            )}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
