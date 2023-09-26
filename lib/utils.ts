import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



// const sections = [
//   {
//       title: "Summary of the Company",
//       content:
//           "Midas Furniture is a reputable furniture company known for its high-quality and stylish furniture offerings. With a focus on providing both residential and commercial customers with top-tier furniture solutions, Midas Furniture has established itself as a trusted name in the industry.",
//   },
//   {
//       title: "Buyer Persona:",
//       content:
//           "Midas Furniture's typical buyer persona is the discerning consumer who values aesthetics, durability, and functionality in their furniture choices. This persona appreciates well-crafted furniture that complements their interior design and lifestyle preferences. They may be homeowners looking to furnish their living spaces or business owners seeking furniture solutions for offices and commercial spaces.",
//   },
//   {
//       title: "Pain Points",
//       content:
//           "Quality Assurance Buyers are concerned about the quality of furniture, wanting assurance that their investment will stand the test of time.  Compatibility: Customers often face challenges in finding furniture that perfectly matches their interior design and style. Budget Considerations: Some customers may have budget constraints and seek cost-effective yet quality furniture options. Delivery and Assembly: Concerns about the delivery process and furniture assembly can be pain points for buyers. Sustainability: There is a growing demand for eco-friendly and sustainable furniture options, and customers may look for these choices.",
//   },
//   {
//       title: "Target Market",
//       content:
//           "Homeowners: Individuals and families looking to furnish their homes with stylish and functional furniture. Interior Designers: Professionals in need of high-quality furniture to enhance their interior design projects.  Clients: Businesses, offices, and hospitality industry clients seeking durable and aesthetically pleasing furniture for their spaces. Eco-Conscious Consumers: Buyers who prioritize sustainable and environmentally friendly furniture options.",
//   },
// ];

// const dummyData = [
//   {
//       full_name: "John Doe",
//       job_title: "Software Engineer",
//       job_title_role: "Frontend Developer",
//       job_company_name: "Tech Co.",
//   },
//   {
//       full_name: "Jane Smith",
//       job_title: "Data Scientist",
//       job_title_role: "Machine Learning Engineer",
//       job_company_name: "Data Corp.",
//   },
//   {
//       full_name: "Bob Johnson",
//       job_title: "Product Manager",
//       job_title_role: "Product Owner",
//       job_company_name: "Product Inc.",
//   },
//   {
//       full_name: "John Doe",
//       job_title: "Software Engineer",
//       job_title_role: "Frontend Developer",
//       job_company_name: "Tech Co.",
//   },
//   {
//       full_name: "Jane Smith",
//       job_title: "Data Scientist",
//       job_title_role: "Machine Learning Engineer",
//       job_company_name: "Data Corp.",
//   },
//   {
//       full_name: "Bob Johnson",
//       job_title: "Product Manager",
//       job_title_role: "Product Owner",
//       job_company_name: "Product Inc.",
//   },
// ];