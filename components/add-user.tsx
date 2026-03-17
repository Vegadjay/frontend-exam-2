'use client'
import { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { baseUrl } from '@/lib/url'
import { routerPush } from '@/lib/router-push'

export function AddUserForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [role, setRole] = useState("receptionist")
  const [authToken, setAuthToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    setAuthToken(authToken || "");
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });
    if (!data.name || !data.email || !data.password || !data.phonenumber || !role) {
      setError("Please fill all fields.");
      return;
    }
    if (!authToken) {
      setError("You are not logged in.");
      return;
    }
    data["role"] = role;
    setLoading(true);
    const response = await fetch(`${baseUrl}/admin/users`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phonenumber
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
    });
    const resData = await response.json();
    setLoading(false);
    if (!(resData.error)) {
      routerPush("admin/get-users")
    } else {
      setError(resData.error || "Could not create user.");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John does"
                  name="name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" type="password" name="password" placeholder="********"
                  required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="role">Role</FieldLabel>
                </div>
                <Tabs value={role} onValueChange={setRole} className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="doctor">Doctor</TabsTrigger>
                    <TabsTrigger value="patient">Patient</TabsTrigger>
                    <TabsTrigger value="receptionist">Receptionist</TabsTrigger>
                  </TabsList>
                </Tabs>
              </Field>
              <Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="phonenumber">Phone Number</FieldLabel>
                  </div>
                  <Input id="phonenumber" type="text" name="phonenumber" placeholder="8822991100"
                    required />
                </Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save user"}
                </Button>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
