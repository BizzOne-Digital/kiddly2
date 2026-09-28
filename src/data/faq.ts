import type { AccordionItem } from '../components/ui/Accordion'

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'search-1',
    question: 'How do I search for childcare near me?',
    answer:
      'Enter a Canadian city or postal code on the home page or search page, optionally choose your child’s age group, then open results on the map and list. Adjust filters for care type, licensing, availability, and schedule. Sample listings in this prototype illustrate the experience — they are not live provider data.',
  },
  {
    id: 'search-2',
    question: 'What do the distance and sort options mean?',
    answer:
      'Distance is calculated from an approximate centre point based on your city or postal code prefix in this demo — not from your device’s GPS. Sort by distance, name, or availability label to organize sample results. Always confirm location and commute with the provider.',
  },
  {
    id: 'filters-1',
    question: 'What is the difference between licensed and private care?',
    answer:
      'Licensed care means the sample profile is marked as meeting provincial licensing requirements. Private care (sometimes called unlicensed) is labelled separately and is not presented as licensed. Kiddly does not independently verify licensing in this prototype — parents should confirm status directly with providers and understand provincial rules.',
  },
  {
    id: 'filters-2',
    question: 'What do “Spots available now”, “Upcoming”, and “Waitlist” mean?',
    answer:
      'These labels reflect what a provider chooses to display on their profile. “Spots available now” suggests immediate openings in the sample data. “Upcoming openings” means care may start soon. “Waitlist” means families may need to join a list. Labels are shown with text and colour — availability is not guaranteed or verified by Kiddly in this demo.',
  },
  {
    id: 'contact-1',
    question: 'How do I contact a provider?',
    answer:
      'Open a provider profile and use “Contact provider” or “Ask about a spot” to complete the inquiry form. In this prototype, submissions show a demo confirmation only — no message is delivered. In a full product, inquiries would route to the provider according to their preferences.',
  },
  {
    id: 'contact-2',
    question: 'Does Kiddly charge parents to search?',
    answer:
      'This prototype does not include pricing for families. There is no payment flow here. If fees ever apply in a live service, they would be described clearly on kiddly.ca — not in this demo.',
  },
  {
    id: 'educator-1',
    question: 'How can educators create or claim a profile?',
    answer:
      'Educators and centres can request a listing through the contact form — choose “Provider profile” as the topic. Claiming helps families find accurate hours, ages served, and availability. This demo does not include account login or live profile editing.',
  },
  {
    id: 'educator-2',
    question: 'How do I update hours, availability, or program details?',
    answer:
      'In a full Kiddly experience, verified profile owners could update details online. In this prototype, use the contact form and note what should change. We will not display “last updated” as live unless it comes from a connected system — sample profiles are marked as sample data.',
  },
  {
    id: 'trust-1',
    question: 'Are reviews or licences verified by Kiddly?',
    answer:
      'No. This frontend prototype does not verify reviews, licences, or identity. Information is sample or provider-supplied. Parents should visit providers, ask questions, and check provincial registries where applicable.',
  },
  {
    id: 'account-1',
    question: 'Can I create an account or book care through Kiddly?',
    answer:
      'Authentication, booking, and payments are outside this prototype. You can search, compare sample listings, and practice sending inquiries in demo mode only.',
  },
]
