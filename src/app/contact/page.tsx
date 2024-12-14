"use client";

import { CalendarIcon, Check, MoveRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);
  setSubmitSuccess(false);

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  const templateParams = {
    from_name: `${firstname} ${lastname}`,
    from_email: email,
    subject: "New Client",
    message: `Selected meeting date: ${date ? format(date, "PPP") : "No date selected"}

Message: ${message}`
  };

  emailjs
    .send(serviceId, templateId, templateParams, publicKey)
    .then((response) => {
      console.log("Email sent successfully", response);
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setDate(undefined);
      setSubmitSuccess(true);
    })
    .catch((error) => {
      console.error("Error sending mail:", error);
      setSubmitError("Failed to send email. Please try again.");
    })
    .finally(() => {
      setIsSubmitting(false);
    });
};

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container max-w-6xl mx-auto">
        <div className="justify-center grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <Badge>Contact</Badge>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  Something Amazing
                </h4>
                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-sm text-left">
                  Have a bold vision or a creative challenge in mind? I
                  specialize in crafting visually stunning, user-friendly
                  interfaces that bring ideas to life. Let’s collaborate to turn
                  your concepts into impactful digital experiences.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Intuitive Design</p>
                <p className="text-muted-foreground text-sm w-[80%]">
                  Crafted with a user-first approach, ensuring seamless
                  navigation and functionality.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Optimized for Performance</p>
                <p className="text-muted-foreground text-sm">
                  Lightning-fast and reliable, built to handle any challenge
                  with ease.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Stunning Aesthetics</p>
                <p className="text-muted-foreground text-sm">
                  A visually striking and modern design that enhances user
                  engagement.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="justify-center flex items-center w-full"
          >
            <div className="rounded-md w-full flex flex-col border p-8 gap-4">
              <p className="text-2xl">Book a meeting</p>
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="picture">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="Your first name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Your last name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  className="w-full border rounded-md p-2 resize-none"
                  rows={4}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              {submitError && (
                <p className="text-red-500 text-sm">{submitError}</p>
              )}
              {submitSuccess && (
                <p className="text-green-500 text-sm">
                  Email sent successfully!
                </p>
              )}

              <Button
                type="submit"
                className="gap-4 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Book the meeting"}{" "}
                <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

