import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { usePathname } from 'next/navigation'

// to add conditions to styles 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// to get initials to display as profile image
export function getInitials(name: string) {
  const nameParts = name.split(' ');
  return nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
};

// for handling text items in the list of analysis result 
// currently not used
export function mapDataByKey(data: any, key: any) {
  if (data[key] && Array.isArray(data[key])) {
      const dataByKey = data[key].map((item: any) => item);
      return dataByKey.join('\n');
  } else {
      return ''; 
  }
}

// filter analysis result to extract items 
// i.e Problems Identified Behaviourial Traits
export function extractItems(data:any, targetKey:any) {
  const items:any = [];

  function recursiveSearch(obj:any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === targetKey) {
          items.push(...obj[key]);
        } else if (typeof obj[key] === "object") {
          recursiveSearch(obj[key]);
        }
      }
    }
  }

  recursiveSearch(data);
  return items;
}
