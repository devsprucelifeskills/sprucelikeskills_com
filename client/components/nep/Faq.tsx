import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqs } from "@/lib/faq";

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-y border-gray-100">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-[#111827]">
            Frequently Asked Questions
          </h2>
          <p className="mt-5 text-base text-gray-500 leading-relaxed">
            Find answers to common questions about our courses, NEP 2020 compliance, and career opportunities.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full divide-y divide-gray-200 border-t border-gray-200">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 border-0">
              <AccordionTrigger className="text-left text-base font-medium text-[#111827] py-5 hover:no-underline hover:text-[#13523f] transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
