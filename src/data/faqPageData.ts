import type { AccordionItem } from '../components/ui/Accordion'

export const FAQ_PARENTS: AccordionItem[] = [
  {
    id: 'parent-1',
    question: 'How do I find childcare near me?',
    answer:
      'Enter your city, neighbourhood, or postal code in the search bar to explore childcare providers near you. Filter by age group, program type, availability, and more to find options that fit your family. Listings in this prototype are sample data only — always confirm details with providers.',
  },
  {
    id: 'parent-2',
    question: 'What is the difference between licensed and private care?',
    answer:
      'Licensed care is labelled as meeting provincial licensing requirements in a profile. Private care is shown separately and is not presented as licensed. Kiddly does not independently verify licensing in this demo — check status directly with providers and your provincial rules.',
  },
  {
    id: 'parent-3',
    question: 'How can I check availability?',
    answer:
      'Look for availability labels such as spots available now, upcoming openings, or waitlist on each sample profile. Labels use text and colour and reflect what a provider would choose to display — they are not verified or live in this prototype.',
  },
  {
    id: 'parent-4',
    question: 'How do I contact a provider?',
    answer:
      'Open a provider profile and use Contact provider or Ask about a spot to complete the demo inquiry form. Submissions show a frontend confirmation only; no message is delivered in this prototype.',
  },
]

export const FAQ_EDUCATORS: AccordionItem[] = [
  {
    id: 'educator-1',
    question: 'How do I create a provider profile?',
    answer:
      'Use the contact form and choose Provider profile as the topic. Share your city, program type, ages served, hours, and licensing status. This demo does not include live onboarding — we will show a confirmation only.',
  },
  {
    id: 'educator-2',
    question: 'Can I claim an existing listing?',
    answer:
      'If a sample listing represents your program, contact us through the provider profile flow and note that you would like to claim it. In a full product, verification steps would apply — not available in this prototype.',
  },
  {
    id: 'educator-3',
    question: 'How do I update hours and age groups?',
    answer:
      'In this prototype, send updates through the contact form. A live Kiddly experience would let verified owners edit profiles online. Sample profiles are marked as illustrative data.',
  },
  {
    id: 'educator-4',
    question: 'How do I report available spots?',
    answer:
      'Use the contact form or provider inquiry and describe current availability (spots now, upcoming, or waitlist). Families see labels on your profile — availability is not automatically synced in this demo.',
  },
]
