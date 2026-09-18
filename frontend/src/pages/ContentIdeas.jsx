import { useState } from "react";
import {
  Check,
  Clipboard,
  Gift,
  Lightbulb,
  Megaphone,
  MessageSquareQuote,
  PackagePlus,
  PartyPopper,
  RefreshCw,
  Send,
  Sparkles,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contentTypes = [
  "New Product",
  "Special Offer",
  "Festival",
  "Business Announcement",
  "Customer Review",
  "Educational Post",
];

const typeIcons = {
  "New Product": PackagePlus,
  "Special Offer": Gift,
  Festival: PartyPopper,
  "Business Announcement": Megaphone,
  "Customer Review": MessageSquareQuote,
  "Educational Post": Lightbulb,
};

function createCaption(contentType, businessName, productService, offer) {
  const business = businessName.trim();
  const product = productService.trim();
  const offerText = offer.trim();

  const templates = {
    "New Product": `✨ New at ${business}!

Explore our latest ${product}. We are excited to share it with you.

📍 Visit us today
📞 Contact us for more information`,
    "Special Offer": `🎉 Special Offer from ${business}!

Get ${offerText || `a special offer on ${product}`}.

⏳ Available for a limited time
📞 Contact us for details`,
    Festival: `🎊 Celebrate with ${business}!

Make the occasion special with our ${product}.

✨ Wishing you and your family a joyful celebration
📞 Contact us to know more`,
    "Business Announcement": `📢 An update from ${business}

We have an important update about our ${product}.

Thank you for supporting our business.
📞 Contact us if you have any questions`,
    "Customer Review": `⭐ Thank you for choosing ${business}!

We are happy to help our customers with ${product}. Your honest feedback helps our small business improve and grow.

💬 Share your experience with us`,
    "Educational Post": `💡 A useful tip from ${business}

Here is something helpful to know about ${product}: keep your message simple, check the details and choose what fits your needs.

Follow us for more useful tips.`,
  };

  return templates[contentType];
}

export default function ContentIdeasPage() {
  const [contentType, setContentType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [productService, setProductService] = useState("");
  const [offer, setOffer] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generateAndShowCaption = (
    selectedType,
    selectedBusiness,
    selectedProduct,
    selectedOffer = "",
  ) => {
    const generated = createCaption(
      selectedType,
      selectedBusiness,
      selectedProduct,
      selectedOffer,
    );
    setContentType(selectedType);
    setBusinessName(selectedBusiness);
    setProductService(selectedProduct);
    setOffer(selectedOffer);
    setCaption(generated);
    setError("");
    setCopied(false);
    localStorage.setItem(
      "marketmentor.lastContentIdea",
      JSON.stringify({
        contentType: selectedType,
        businessName: selectedBusiness,
        productService: selectedProduct,
        offer: selectedOffer,
        caption: generated,
      }),
    );
    return generated;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!contentType || !businessName.trim() || !productService.trim()) {
      setError("Please select a content type and enter your business and product details.");
      return;
    }

    generateAndShowCaption(contentType, businessName, productService, offer);
  };

  const copyCaption = async () => {
    if (!caption) return;
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const ActiveIcon = contentType ? typeIcons[contentType] : Sparkles;

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <SiteHeader active="content" />

      <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#FFF8D8] px-3.5 py-2 text-sm font-semibold text-[#8A5A00]">
            <Lightbulb aria-hidden="true" className="size-4" />
            Social Media Content Ideas
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
            Turn Business Updates into Simple Posts
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6E6E73]">
            Select what you want to share, enter a few details and get a clear caption template that you can edit before posting.
          </p>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-[420px_1fr] lg:items-start">
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-[#E5E5EA] bg-white p-6 shadow-[0_16px_40px_rgba(29,29,31,0.08)] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[#FFF8D8] text-[#A66B00]">
                <ActiveIcon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.025em]">Create your caption</h2>
                <p className="mt-1 text-sm text-[#6E6E73]">No AI account or API key is needed.</p>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3A3A3C]">
                  What do you want to post?
                </label>
                <Select value={contentType} onValueChange={(value) => setContentType(value)}>
                  <SelectTrigger
                    aria-label="Content type"
                    className="h-12 w-full rounded-xl border-[#D1D1D6] bg-[#F8F8FA] px-4 text-base shadow-none"
                  >
                    <SelectValue placeholder="Select a content type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {contentTypes.map((type) => {
                      const Icon = typeIcons[type];
                      return (
                        <SelectItem key={type} value={type} className="py-2.5 text-base">
                          <Icon aria-hidden="true" className="size-4" />
                          {type}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="business-name" className="mb-2 block text-sm font-semibold text-[#3A3A3C]">
                  Business name
                </label>
                <Input
                  id="business-name"
                  value={businessName}
                  onChange={(event) => setBusinessName(event.target.value)}
                  placeholder="Example: Ayaan Mobile"
                  className="h-12 rounded-xl border-[#D1D1D6] bg-[#F8F8FA] px-4 text-base shadow-none"
                />
              </div>

              <div>
                <label htmlFor="product-service" className="mb-2 block text-sm font-semibold text-[#3A3A3C]">
                  Product or service
                </label>
                <Input
                  id="product-service"
                  value={productService}
                  onChange={(event) => setProductService(event.target.value)}
                  placeholder="Example: wireless earphones"
                  className="h-12 rounded-xl border-[#D1D1D6] bg-[#F8F8FA] px-4 text-base shadow-none"
                />
              </div>

              <div>
                <label htmlFor="offer" className="mb-2 block text-sm font-semibold text-[#3A3A3C]">
                  Offer <span className="font-normal text-[#8E8E93]">(if applicable)</span>
                </label>
                <Input
                  id="offer"
                  value={offer}
                  onChange={(event) => setOffer(event.target.value)}
                  placeholder="Example: 10% off until Sunday"
                  className="h-12 rounded-xl border-[#D1D1D6] bg-[#F8F8FA] px-4 text-base shadow-none"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-5 rounded-xl bg-[#FFF1F0] px-4 py-3 text-sm font-medium text-[#C7322B]">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="mt-7 h-12 w-full rounded-xl bg-[#007AFF] text-base font-semibold text-white shadow-[0_10px_24px_rgba(0,122,255,0.2)] hover:bg-[#006FE6]"
            >
              {caption ? (
                <RefreshCw aria-hidden="true" className="size-4" />
              ) : (
                <Sparkles aria-hidden="true" className="size-4" />
              )}
              {caption ? "Generate Again" : "Generate Caption"}
            </Button>
          </form>

          <section
            aria-live="polite"
            aria-label="Generated social media caption"
            className="min-h-[510px] rounded-[28px] border border-[#E5E5EA] bg-[#F8F8FA] p-6 shadow-[inset_3px_3px_8px_rgba(29,29,31,0.05),inset_-3px_-3px_8px_rgba(255,255,255,0.9)] sm:p-8"
          >
            {caption ? (
              <>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#007AFF]">Caption Template</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                      Ready to personalise
                    </h2>
                  </div>
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#007AFF] shadow-[0_5px_14px_rgba(29,29,31,0.08)]">
                    <Send aria-hidden="true" className="size-5" />
                  </span>
                </div>

                <div className="mt-6 rounded-[22px] border border-[#E5E5EA] bg-white p-6 shadow-[0_10px_24px_rgba(29,29,31,0.05)]">
                  <p className="whitespace-pre-wrap text-base leading-8 text-[#3A3A3C]">{caption}</p>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    onClick={copyCaption}
                    className="h-11 rounded-xl bg-[#1D1D1F] px-5 text-sm font-semibold text-white hover:bg-black"
                  >
                    {copied ? (
                      <Check aria-hidden="true" className="size-4" />
                    ) : (
                      <Clipboard aria-hidden="true" className="size-4" />
                    )}
                    {copied ? "Copied" : "Copy Caption"}
                  </Button>
                  <p className="self-center text-sm leading-6 text-[#6E6E73]">
                    Review names, prices and dates before posting.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex min-h-[445px] flex-col items-center justify-center px-4 text-center">
                <span className="flex size-16 items-center justify-center rounded-[22px] bg-white text-[#A66B00] shadow-[0_10px_28px_rgba(29,29,31,0.09)]">
                  <MessageSquareQuote aria-hidden="true" className="size-7" />
                </span>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
                  Your caption will appear here
                </h2>
                <p className="mt-3 max-w-md text-base leading-7 text-[#6E6E73]">
                  MarketMentor uses reusable templates, so the result is quick, predictable and easy to edit.
                </p>
              </div>
            )}
          </section>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
