import EmptyState from "@/components/EmptyState";

export const metadata = { title: "পেজ পাওয়া যায়নি" };

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <EmptyState
        code="৪০৪"
        title="দুঃখিত, এই পেজটি পাওয়া যায়নি"
        message="আপনি যে পণ্য বা বিভাগটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।"
      />
    </div>
  );
}
