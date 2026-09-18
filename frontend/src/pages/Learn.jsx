import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  BadgeIndianRupee,
  BookOpen,
  Check,
  CheckCircle2,
  Globe2,
  MapPin,
  Megaphone,
  MessageCircle,
  Search,
  Share2,
  Star,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { syncLearningProgress } from "@/services/api";

const lessons = [
  {
    id: "digital-marketing-basics",
    title: "Digital Marketing Basics",
    summary: "Understand what digital marketing is and why it helps small businesses.",
    icon: Globe2,
    tone: "bg-[#EAF3FF] text-[#007AFF]",
    introduction:
      "Digital marketing means using the internet to tell people about your business. It can help local customers discover you, understand what you offer and contact you.",
    points: [
      "Traditional marketing uses posters, newspapers and printed leaflets.",
      "Digital marketing uses Google, social media, websites and messaging apps.",
      "Online marketing can be updated quickly and its results are easier to observe.",
    ],
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    summary: "Use Instagram, Facebook and YouTube to stay visible to customers.",
    icon: Share2,
    tone: "bg-[#F2ECFF] text-[#7B4FC6]",
    introduction:
      "Social media gives your business a place to show products, answer questions and stay connected with people who may buy from you.",
    points: [
      "Use Instagram for photos, Reels and product updates.",
      "Use Facebook to reach local groups and a wider age range.",
      "Use YouTube for demonstrations, explanations and longer videos.",
      "Post useful content regularly instead of posting many times on one day.",
    ],
  },
  {
    id: "google-business-profile",
    title: "Google Business Profile",
    summary: "Help nearby customers find your location and business information.",
    icon: MapPin,
    tone: "bg-[#EAF8EE] text-[#248A3D]",
    introduction:
      "A Google Business Profile can show your business when people search on Google or Google Maps. It is especially useful for local shops and services.",
    points: [
      "Add the correct business name, address, phone number and opening hours.",
      "Upload clear photos of your shop, products or services.",
      "Keep information updated so customers know how to reach you.",
      "Ask genuine customers to leave honest reviews.",
    ],
  },
  {
    id: "seo",
    title: "Search Engine Optimization — SEO",
    summary: "Make your website or profile easier to find in online searches.",
    icon: Search,
    tone: "bg-[#FFF3E3] text-[#D97200]",
    introduction:
      "SEO means improving your online content so search engines can understand it and show it to the right people. It does not give instant results, but good content can improve visibility over time.",
    points: [
      "Keywords are words people type when searching for a product or service.",
      "Use clear words in page titles, descriptions and useful website content.",
      "Local SEO includes your area or city, such as “salon in Bhiwandi.”",
      "Keep your information accurate across your website and business profiles.",
    ],
  },
  {
    id: "whatsapp-marketing",
    title: "WhatsApp Marketing",
    summary: "Communicate with customers and share useful business updates.",
    icon: MessageCircle,
    tone: "bg-[#E8F8F0] text-[#1B8A55]",
    introduction:
      "WhatsApp Business can make customer communication easier. Use it to answer enquiries, show products and share important updates with people who want to hear from you.",
    points: [
      "Create a professional WhatsApp Business profile.",
      "Add products or services to the catalogue.",
      "Use quick replies for common customer questions.",
      "Share relevant offers only with customers who agreed to receive updates.",
    ],
    note: "Avoid repeated or unwanted messages. Helpful communication builds trust; spam damages it.",
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    summary: "Create useful photos, videos and posts that explain your business.",
    icon: BookOpen,
    tone: "bg-[#FFF8D8] text-[#A66B00]",
    introduction:
      "Content marketing means sharing useful information that helps people understand your products, services or experience before they decide to buy.",
    points: [
      "Use clear product photos and short demonstration videos.",
      "Create Reels that show how a product is used or prepared.",
      "Share educational tips related to your business.",
      "Tell real customer stories only with their permission.",
    ],
  },
  {
    id: "online-reviews",
    title: "Online Reviews",
    summary: "Build trust by collecting and responding to genuine feedback.",
    icon: Star,
    tone: "bg-[#FFEBF1] text-[#D92B59]",
    introduction:
      "Reviews help new customers understand other people’s experience with your business. Honest reviews can improve trust and help you notice areas that need improvement.",
    points: [
      "Politely ask satisfied customers for an honest review.",
      "Make the review link easy to open.",
      "Thank customers for positive feedback.",
      "Reply calmly and professionally to negative feedback.",
    ],
  },
  {
    id: "paid-advertising",
    title: "Paid Advertising",
    summary: "Understand basic online ads, budgets and target audiences.",
    icon: BadgeIndianRupee,
    tone: "bg-[#EEF0FF] text-[#4C5BD4]",
    introduction:
      "Paid advertising lets you pay to show a message to a selected audience. Common options include Instagram and Facebook ads, and Google ads.",
    points: [
      "Choose the location, interests or search terms of your target audience.",
      "Begin with a small budget that your business can comfortably afford.",
      "Use a clear photo, simple message and one useful action.",
      "Review results before spending more money.",
    ],
    note: "Paid advertising can increase reach, but it does not guarantee enquiries or sales.",
  },
];

const storageKey = "marketmentor.completedLessons";

export default function LearningHubPage() {
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
        if (Array.isArray(saved)) {
          const validIds = new Set(lessons.map((lesson) => lesson.id));
          setCompletedLessons(
            saved.filter((id) => typeof id === "string" && validIds.has(id)),
          );
        }
      } catch {
        // Keep the empty initial state when saved browser data is invalid.
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const setLessonCompletion = (lessonId, completed) => {
    setCompletedLessons((current) => {
      const next = completed
        ? Array.from(new Set([...current, lessonId]))
        : current.filter((id) => id !== lessonId);
      localStorage.setItem(storageKey, JSON.stringify(next));
      syncLearningProgress(next);
      return next;
    });
  };

  const completedCount = completedLessons.length;
  const progressValue = useMemo(
    () => Math.round((completedCount / lessons.length) * 100),
    [completedCount],
  );

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <SiteHeader active="learn" />

      <section className="border-b border-[#E5E5EA] bg-white">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_360px] lg:items-end lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#EAF3FF] px-3.5 py-2 text-sm font-semibold text-[#0064D8]">
              <BookOpen aria-hidden="true" className="size-4" />
              Digital Marketing Learning Hub
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
              Learn Digital Marketing Step by Step
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6E6E73]">
              Small businesses do not need advanced marketing knowledge to start promoting themselves online. Begin with one short lesson and apply what is useful for your business.
            </p>
          </div>

          <aside className="rounded-[26px] border border-[#E5E5EA] bg-[#F8F8FA] p-6 shadow-[7px_7px_18px_rgba(29,29,31,0.06),-7px_-7px_18px_rgba(255,255,255,0.9)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#6E6E73]">Learning Progress</p>
                <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
                  {completedCount} / {lessons.length}
                </p>
              </div>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[#EAF8EE] text-[#248A3D]">
                <CheckCircle2 aria-hidden="true" className="size-6" />
              </span>
            </div>
            <Progress
              value={progressValue}
              aria-label={`${completedCount} of ${lessons.length} lessons completed`}
              className="mt-5 h-3 bg-[#E5E5EA] [&_[data-slot=progress-indicator]]:bg-[#34C759]"
            />
            <p className="mt-3 text-sm text-[#6E6E73]">
              {completedCount === lessons.length
                ? "You completed every lesson. Well done!"
                : `${lessons.length - completedCount} lessons remaining`}
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-2">
          {lessons.map((lesson, index) => {
            const Icon = lesson.icon;
            const isCompleted = completedLessons.includes(lesson.id);

            return (
              <article
                key={lesson.id}
                className={`rounded-[26px] border bg-white p-6 shadow-[0_12px_30px_rgba(29,29,31,0.06)] transition sm:p-7 ${
                  isCompleted ? "border-[#BEE8C8]" : "border-[#E5E5EA]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${lesson.tone}`}>
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[#8E8E93]">
                        Lesson {index + 1}
                      </p>
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF8EE] px-2.5 py-1 text-xs font-semibold text-[#248A3D]">
                          <Check aria-hidden="true" className="size-3.5" />
                          Completed
                        </span>
                      )}
                    </div>
                    <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                      {lesson.title}
                    </h2>
                    <p className="mt-2 text-base leading-7 text-[#6E6E73]">{lesson.summary}</p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="mt-5">
                  <AccordionItem value={lesson.id} className="rounded-2xl border border-[#E5E5EA] bg-[#F8F8FA] px-4">
                    <AccordionTrigger className="py-4 text-base font-semibold text-[#1D1D1F] hover:no-underline">
                      Learn More
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-base leading-7 text-[#6E6E73]">
                      <p>{lesson.introduction}</p>
                      <ul className="mt-4 space-y-2.5">
                        {lesson.points.map((point) => (
                          <li key={point} className="flex gap-2.5">
                            <Check
                              aria-hidden="true"
                              className="mt-1.5 size-4 shrink-0 text-[#34C759]"
                              strokeWidth={2.6}
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      {lesson.note && (
                        <div className="mt-4 rounded-2xl border border-[#FFD8A3] bg-[#FFF7EA] p-4 text-[#7A4A00]">
                          {lesson.note}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button
                  type="button"
                  onClick={() => setLessonCompletion(lesson.id, !isCompleted)}
                  variant={isCompleted ? "outline" : "default"}
                  className={`mt-5 h-11 w-full rounded-xl text-sm font-semibold ${
                    isCompleted
                      ? "border-[#BEE8C8] bg-white text-[#248A3D] hover:bg-[#F2FBF4]"
                      : "bg-[#007AFF] text-white hover:bg-[#006FE6]"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 aria-hidden="true" className="size-4" />
                      Completed — Mark as Not Completed
                    </>
                  ) : (
                    <>
                      <Check aria-hidden="true" className="size-4" />
                      Mark as Completed
                    </>
                  )}
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            to="/planner"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-6 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(29,29,31,0.15)] transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/20"
          >
            Create your marketing plan
            <Megaphone aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
