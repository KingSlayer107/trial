'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialProof } from '@/designSystem/landing/LandingSocialProof'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  CarOutlined,
  DollarOutlined,
  SettingOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: `Streamlined Booking Process`,
      description: `Effortlessly manage reservations with our intuitive interface, saving time and reducing errors.`,
      icon: <CarOutlined />,
    },
    {
      heading: `Real-Time Analytics`,
      description: `Make data-driven decisions with comprehensive insights into your rental business performance.`,
      icon: <ThunderboltOutlined />,
    },
    {
      heading: `Dynamic Pricing`,
      description: `Maximize revenue with intelligent pricing strategies that adapt to market demands.`,
      icon: <DollarOutlined />,
    },
    {
      heading: `Multi-Location Support`,
      description: `Easily manage multiple rental locations from a single, centralized platform.`,
      icon: <SettingOutlined />,
    },
    {
      heading: `Customer Loyalty Programs`,
      description: `Build lasting relationships and encourage repeat business with customizable rewards.`,
      icon: <TrophyOutlined />,
    },
    {
      heading: `Vendor Community`,
      description: `Connect with other rental businesses, share insights, and grow together in our thriving ecosystem.`,
      icon: <TeamOutlined />,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Thompson`,
      designation: `Owner, City Rides`,
      content: `RentWheels transformed our small rental business into a thriving enterprise. The analytics tools helped us optimize our fleet, and our revenue has increased by 40% in just six months!`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Chen`,
      designation: `CEO, GreenMove Rentals`,
      content: `The dynamic pricing feature is a game-changer. We've seen a 25% boost in profitability since implementing RentWheels, and our customers love the transparent, competitive rates.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emily Rodriguez`,
      designation: `Operations Manager, Sunset Scooters`,
      content: `Managing multiple locations used to be a nightmare. With RentWheels, we've streamlined our operations across 5 cities, saving countless hours and reducing overhead costs.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for small rental businesses just getting started`,
      monthly: 49,
      yearly: 529,
      features: [`Up to 50 vehicles`, `Basic analytics`, `Standard support`],
    },
    {
      title: `Growth`,
      description: `Ideal for expanding businesses with multiple locations`,
      monthly: 99,
      yearly: 1069,
      features: [
        `Up to 200 vehicles`,
        `Advanced analytics`,
        `Priority support`,
        `Multi-location management`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Tailored solutions for large-scale rental operations`,
      monthly: 249,
      yearly: 2689,
      features: [
        `Unlimited vehicles`,
        `Custom analytics`,
        `24/7 dedicated support`,
        `API access`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How does RentWheels help me manage my rental inventory?`,
      answer: `RentWheels provides a comprehensive inventory management system that allows you to track vehicle availability, maintenance schedules, and utilization rates in real-time. This ensures you always have the right vehicles available to meet customer demand.`,
    },
    {
      question: `Can I integrate RentWheels with my existing booking system?`,
      answer: `Yes, RentWheels offers API access for seamless integration with your current booking systems and third-party applications, ensuring a smooth transition and enhanced functionality for your rental business.`,
    },
    {
      question: `How does the dynamic pricing feature work?`,
      answer: `Our dynamic pricing algorithm analyzes market trends, competitor rates, and demand patterns to suggest optimal pricing for your rentals. You can set parameters and rules to automate pricing adjustments, maximizing your revenue potential.`,
    },
    {
      question: `What kind of support does RentWheels offer?`,
      answer: `We provide tiered support based on your subscription plan, ranging from standard email support to 24/7 dedicated assistance for enterprise clients. Our team of experts is always ready to help you make the most of RentWheels' features.`,
    },
  ]

  const logos = [
    { url: 'https://i.imgur.com/afwBIFK.png' },
    { url: 'https://i.imgur.com/LlloOPa.png' },
    { url: 'https://i.imgur.com/j8jPb4H.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  const steps = [
    {
      heading: `Sign Up`,
      description: `Create your RentWheels account and input your business details.`,
    },
    {
      heading: `Upload Inventory`,
      description: `Add your vehicles and set initial pricing and availability.`,
    },
    {
      heading: `Customize Settings`,
      description: `Configure your dashboard, analytics, and customer-facing options.`,
    },
    {
      heading: `Go Live`,
      description: `Launch your optimized rental platform and start growing your business!`,
    },
  ]

  const painPoints = [
    {
      emoji: `😓`,
      title: `Struggling with inefficient booking systems`,
    },
    {
      emoji: `📉`,
      title: `Losing revenue due to suboptimal pricing`,
    },
    {
      emoji: `🔍`,
      title: `Lacking visibility into business performance`,
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Revolutionize Your Rental Business with RentWheels`}
        subtitle={`Empower your vehicle rental company with cutting-edge technology. Streamline operations, boost revenue, and delight customers with our all-in-one platform.`}
        buttonText={`Start Your Journey`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/eoL1Pd-bike-J8GR`}
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={1000}
            suffixText={`from thriving rental businesses`}
          />
        }
      />
      <LandingSocialProof logos={logos} title={`Trusted by Industry Leaders`} />
      <LandingPainPoints
        title={`The $214 Billion Problem: Is Your Rental Business Being Left Behind?`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Accelerate Your Success in 4 Simple Steps`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Unlock Your Rental Business Potential`}
        subtitle={`Discover how RentWheels empowers you to overcome challenges and drive growth`}
        features={features}
      />
      <LandingTestimonials
        title={`Success Stories: Hear from Rental Businesses That Transformed with RentWheels`}
        subtitle={`Join the ranks of satisfied customers who have revolutionized their operations`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Your Rental Business's Future`}
        subtitle={`Choose the perfect plan to elevate your operations and maximize profitability`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Got Questions? We've Got Answers`}
        subtitle={`Learn more about how RentWheels can transform your rental business`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Revolutionize Your Rental Business?`}
        subtitle={`Join thousands of successful rental companies and start your RentWheels journey today.`}
        buttonText={`Get Started Now`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
