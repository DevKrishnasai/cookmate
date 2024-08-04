import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChefHat, Star, Clock, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default function Home() {
  const { userId } = auth();
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-600">CookMate</h1>
        <nav>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </header>

      <main className="container mx-auto py-12">
        <section className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-5xl font-bold mb-4">
              Your Personal Recipe Hub
            </h2>
            <p className="text-xl mb-8">
              Create, share, and discover amazing recipes with CookMate
            </p>
            <Link href="/home">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/dashboard.png"
              alt="Delicious food spread"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {feature.icon}
                  <span className="ml-2">{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="italic mb-4">&quot;{testimonial.quote}&quot;</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-orange-500 text-white rounded-lg p-8 mb-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Cooking?</h3>
          <p className="text-xl mb-6">
            Join CookMate today and unleash your culinary creativity!
          </p>
          {userId ? (
            <Link href="/home">
              <Button size="lg" variant="secondary">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <SignInButton>
              <Button size="lg" variant="secondary">
                Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignInButton>
          )}
          {/* <Button size="lg" variant="secondary" >
            Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button> */}
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      {/* <footer className="bg-orange-600 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">CookMate</h4>
            <p>Your go-to platform for all things cooking and recipes.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {/* Add social media icons here
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-orange-400 text-center">
          <p>&copy; 2024 CookMate. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}

const features = [
  {
    title: "Create Recipes",
    description: "Easily create and publish your own unique recipes.",
    icon: <ChefHat className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Rate & Review",
    description: "Rate recipes and read reviews from other food enthusiasts.",
    icon: <Star className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Detailed Information",
    description:
      "View comprehensive recipe details including ingredients, steps, calories, and more.",
    icon: <Clock className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Save Favorites",
    description:
      "Build your personal cookbook by saving your favorite recipes.",
    icon: <Users className="h-6 w-6 text-orange-500" />,
  },
];

const testimonials = [
  {
    quote:
      "CookMate has transformed my cooking experience. I love how easy it is to create and share recipes!",
    name: "L.Vignesh",
    title: "Home Cook Enthusiast",
  },
  {
    quote:
      "As a professional chef, I find CookMate invaluable for organizing my recipes and connecting with food lovers.",
    name: "Manoj",
    title: "Executive Chef",
  },
  {
    quote:
      "The detailed nutritional information helps me stay on track with my diet while enjoying delicious meals.",
    name: "Talent",
    title: "Fitness Trainer",
  },
];

const faqs = [
  {
    question: "Is CookMate free to use?",
    answer:
      "Yes, CookMate offers a free basic plan. We also have premium features available for a small monthly fee but for now its free.",
  },
  {
    question: "Can I import recipes from other websites?",
    answer:
      "Currently, you can manually input recipes. We're working on an import feature for the future.",
  },
  {
    question: "How accurate is the nutritional information?",
    answer:
      "We use a comprehensive database for nutritional calculations, but always recommend consulting with a nutritionist for precise dietary needs.",
  },
  {
    question: "Can I make my recipes private?",
    answer:
      "Absolutely! You have full control over the privacy settings of your recipes.",
  },
];
