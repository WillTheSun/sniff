import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import ReactMarkdown from 'react-markdown';

const faqData = {
    "faqs": [
        {
            "question": "what's vibe check mate?",
            "answer": "**vibe check mate** analyzes your matches to save you time and make dating safer. \n\n### online dating can be full of landmines, like:\n- 😫 cereal killers\n- 🎭 getting catfished\n- 🤔 mismatched intentions\n\n### **vibe check mate** helps you:\n- 🚩 instantly spot red flags\n- 🔍 get insight into their intentions\n- 💡 make more informed decisions before going on a date."
        },
        {
            "question": "how does it work?",
            "answer": "vibe check mate uses advanced ai models to analyze dating profiles. here's how it works:\n\n1. 📸 **upload:** you grab a screenshot of a dating profile\n2. 🧠 **analyze:** our ai processes it in real-time\n3. 📊 **results:** you get a detailed breakdown of potential red and green flags\n\n### what you'll see:\n- 🚩 red flags to watch out for\n- ✅ green flags that look promising\n- 💯 overall compatibility score"
        },
        {
            "question": "which dating apps work with it?",
            "answer": "**all of them!** vibe check mate works with any dating app you use. just grab a screenshot and let our ai do its thing."
        },
        {
            "question": "how do i start?",
            "answer": "it's super simple:\n\n1. sign up\n2. upload a profile screenshot\n3. get a detailed analysis in seconds\n\nboom - you're ready to make smarter dating decisions!"
        },
        {
            "question": "is my data safe?",
            "answer": "**totally.** we take your privacy seriously:\n\n- we don't store any of your uploads or data\n- everything's processed on the fly\n- once analyzed, it's gone from our servers\n\nyour data's safety is our top priority."
        },
        {
            "question": "can matches see i used this?",
            "answer": "**nope, it's your little secret.** matches have no clue you're using vibe check mate to scope them out. your dating strategy stays private!"
        },
        {
            "question": "how accurate is it?",
            "answer": "our ai is designed to be extra sensitive, giving you all the possible flags. here's what you need to know:\n\n- we're working on an accuracy-based version for future updates\n- for now, it's better to have too much info than too little\n- always use your own judgment alongside our insights"
        },
        {
            "question": "is it free? what's in the paid version?",
            "answer": "* **free for the first 100 sign-ups!**\n* after that, we'll roll out a paid version with cool features like:\n  * custom flags\n  * personalized preferences\n  * deeper analyses\n\nget in early to enjoy all the benefits!"
        },
        {
            "question": "can i set my own red flags?",
            "answer": "not yet, but it's coming soon! we're working on letting you add your own dealbreakers to the mix. stay tuned for updates!"
        },
        {
            "question": "is this ethical?",
            "answer": "we believe so, when used responsibly. here's our take:\n\n- vibe check mate gives you all the info to make smart choices\n- ai tools are meant to empower you, not decide for you \n - use your common sense \n\n **remember: always trust your gut**"
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
