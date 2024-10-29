import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import ReactMarkdown from 'react-markdown';

const faqData = {
    "faqs": [
        {
            "question": "what's sniff?",
            "answer": "**Sniff** is your dog's personal food safety assistant. \n\n### it helps protect your dog from common food dangers like:\n- 🚫 toxic ingredients\n- 🍫 harmful human foods\n- 🥜 dangerous nuts and seeds\n\n### **Sniff** helps you:\n- 🔍 instantly check if foods are safe\n- ⚡️ get quick answers about ingredients\n- 🐕 make informed decisions about your dog's diet"
        },
        {
            "question": "how does it work?",
            "answer": "Sniff makes checking food safety super simple:\n\n1. 📝 **type:** enter any food or ingredient\n2. 🧠 **check:** our system checks against our database\n3. ✨ **results:** get instant safety information\n\n### you'll learn:\n- ✅ if the food is safe\n- ⚠️ potential risks\n- 📋 serving recommendations"
        },
        {
            "question": "is the information reliable?",
            "answer": "**absolutely.** our data comes from:\n\n- veterinary research\n- scientific studies\n- expert veterinarians\n- trusted pet health organizations\n\nwe regularly update our database with the latest pet safety information."
        },
        {
            "question": "what if my dog already ate something?",
            "answer": "if your dog has eaten something potentially harmful:\n\n1. check the food in Sniff\n2. follow any emergency instructions provided\n3. contact your vet if recommended\n\n**remember: in emergencies, always call your vet first!**"
        },
        {
            "question": "is it free?",
            "answer": "* **free for basic food checks!**\n* premium features coming soon:\n  * detailed nutritional info\n  * personalized portion sizes\n  * breed-specific recommendations\n\nstart protecting your pup for free today!"
        }
    ]
};

export default function FAQ() {
    return (
        <Accordion.Root
            className="w-full max-w-3xl mx-auto rounded-2xl shadow-md overflow-hidden"
            type="single"
            collapsible
        >
            {faqData.faqs.map((faq, index) => (
                <Accordion.Item
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-[#FFD0BA] last:border-b-0"
                >
                    <Accordion.Header>
                        <Accordion.Trigger className="flex justify-between items-center w-full py-4 px-6 text-left text-[#333333] bg-[#FFE5D9] bg-opacity-30 hover:bg-[#FFD0BA] focus:outline-none transition-colors duration-200">
                            <span className="font-medium">{faq.question}</span>
                            <ChevronDownIcon className="h-5 w-5 text-[#333333] transition-transform duration-300 ease-in-out" />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="bg-[#FFE5D9]">
                        <div className="px-6 py-4 text-sm text-[#333333]">
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => <p className="mb-4 whitespace-pre-line">{children}</p>,
                                    ul: ({ children }) => <ul className="list-disc pl-5 space-y-2 mb-4">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal pl-5 space-y-2 mb-4">{children}</ol>,
                                    li: ({ children }) => <li className="ml-4">{children}</li>,
                                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                    h3: ({ children }) => <p className="mb-4 font-bold">{children}</p>,
                                }}
                            >
                                {faq.answer}
                            </ReactMarkdown>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
}
