import { Product } from './types';

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const products: Product[] = [
  {
    id: "0070835c-7390-4d29-bf9e-1b19f28d21f8",
    status: "PUBLISHED",
    tagNumber: "PS-NJ-876",
    itemName: "Fashioner Pendant Set",
    thumbnail: "/jewellery_images/jewellery1.jpeg",
    itemPhotos: [
      {
        title: "Fashioner Pendant Set",
        src: "/jewellery_images/jewellery1.jpeg",
        type: "image"
      },
      {
        title: "Fashioner Pendant Set Secondary",
        src: "/jewellery_images/jewellery2.jpeg",
        type: "image"
      }
    ],
    itemVideo: null,
    itemDescription: "This pendant set often comes with matching earrings, further enhancing its stunning appeal. The diamonds used in the set are selected for their clarity, cut, and brilliance, ensuring that the set exudes elegance and a timeless beauty.",
    itemCategory: "Diamond Jewellery",
    itemSubCategory: "Diamond Pendant Set",
    byStyle: "",
    gender: "Ladies",
    stamp: "14",
    goldStampRate: 5460,
    tunch: 60,
    itemStock: 1,
    grossWeight: 13.67,
    lessWeight: 2.66,
    netWeight: 11.01,
    wastage: 0,
    fine: 6.6,
    diamondWeight: 2.35,
    coloredStoneWeight: 10.97,
    laborPercentage: 0,
    laborRate: 700,
    others: 0,
    totalLabor: 7704.2,
    totalDiamondCost: 65800,
    totalColoredStoneCost: 3839.5,
    totalGoldCost: 60114.6,
    itemMRP: 129754.1,
    createdDate: "2025-03-22T10:28:42Z",
    coloredStonePresent: true,
    updatedDate: "2025-03-22T11:56:34Z",
    ownerId: "e980d9f8-5ed7-44cf-891b-7861fd227f54",
    publishDate: "2025-03-22T10:28:42Z",
    slug: createSlug("Fashioner Pendant Set")
  },
  {
    id: "0133b7bc-486b-4c41-8388-18733ee82234",
    status: "PUBLISHED",
    tagNumber: "LR-NJ-3069",
    itemName: "Pure Essence Diamond Ring",
    thumbnail: "/jewellery_images/jewellery2.jpeg",
    itemPhotos: [
      {
        title: "Pure Essence Diamond Ring",
        src: "/jewellery_images/jewellery2.jpeg",
        type: "image"
      },
      {
        title: "Pure Essence Diamond Ring Secondary",
        src: "/jewellery_images/jewellery3.jpeg",
        type: "image"
      }
    ],
    itemVideo: null,
    itemDescription: "A stunning diamond ring that captures pure elegance and sophistication.",
    itemCategory: "Diamond Jewellery",
    itemSubCategory: "Ladies Ring",
    byStyle: "",
    gender: "Ladies",
    stamp: "14",
    goldStampRate: 5430,
    tunch: 60,
    itemStock: 1,
    grossWeight: 5.38,
    lessWeight: 0.24,
    netWeight: 5.14,
    wastage: 0,
    fine: 3.08,
    diamondWeight: 1.21,
    coloredStoneWeight: 0,
    laborPercentage: 0,
    laborRate: 700,
    others: 0,
    totalLabor: 3596.6,
    totalDiamondCost: 33880,
    totalColoredStoneCost: 0,
    totalGoldCost: 27910.2,
    itemMRP: 61790.2,
    createdDate: "2025-02-01T07:49:11Z",
    coloredStonePresent: false,
    updatedDate: "2025-03-13T13:57:34Z",
    ownerId: "e980d9f8-5ed7-44cf-891b-7861fd227f54",
    publishDate: "2025-02-01T07:49:11Z",
    slug: createSlug("Pure Essence Diamond Ring")
  },
  {
    id: "021aa3fc-5b3c-45d8-b0c6-75a9783111ad",
    status: "PUBLISHED",
    tagNumber: "LR-NJ-6506",
    itemName: "Vintage Engagement Ring",
    thumbnail: "/jewellery_images/jewellery3.jpeg",
    itemPhotos: [
      {
        title: "Vintage Engagement Ring",
        src: "/jewellery_images/jewellery3.jpeg",
        type: "image"
      },
      {
        title: "Vintage Engagement Ring Secondary",
        src: "/jewellery_images/jewellery1.jpeg",
        type: "image"
      }
    ],
    itemVideo: null,
    itemDescription: "The central stone is the focal point of the ring, cut to perfection in an elegant shape like emerald cut, showcasing its intense red hue and brilliance.",
    itemCategory: "Diamond Jewellery",
    itemSubCategory: "Diamond Ring",
    byStyle: "",
    gender: "Ladies",
    stamp: "14",
    goldStampRate: 5322,
    tunch: 60,
    itemStock: 1,
    grossWeight: 5.09,
    lessWeight: 1.72,
    netWeight: 3.37,
    wastage: 0,
    fine: 2.02,
    diamondWeight: 0.51,
    coloredStoneWeight: 8.1,
    laborPercentage: 0,
    laborRate: 700,
    others: 0,
    totalLabor: 2357.6,
    totalDiamondCost: 14280,
    totalColoredStoneCost: 2835,
    totalGoldCost: 17924.5,
    itemMRP: 37397.096,
    createdDate: "2025-02-26T14:07:03Z",
    coloredStonePresent: true,
    updatedDate: "2025-03-13T14:26:51Z",
    ownerId: "e980d9f8-5ed7-44cf-891b-7861fd227f54",
    publishDate: "2025-02-26T14:07:03Z",
    slug: createSlug("Vintage Engagement Ring")
  },
  {
    id: "0324a602-476a-4a85-a457-6b920c3ed2b2",
    status: "PUBLISHED",
    tagNumber: "LR-NJ-6687",
    itemName: "Dual-Ton Diamond Band",
    thumbnail: "/jewellery_images/jewellery1.jpeg",
    itemPhotos: [
      {
        title: "Dual-Ton Diamond Band",
        src: "/jewellery_images/jewellery1.jpeg",
        type: "image"
      },
      {
        title: "Dual-Ton Diamond Band Secondary",
        src: "/jewellery_images/jewellery2.jpeg",
        type: "image"
      }
    ],
    itemVideo: null,
    itemDescription: "A perfect fusion of elegance and contemporary design, this Diamond Band Ring is crafted in a stunning dual-tone combination of rose and white gold. The warm blush of rose gold contrasts beautifully with the cool brilliance of white gold, creating a sophisticated and timeless look. Adorned with brilliant-cut diamonds, this ring is a symbol of refined luxury and modern charm.",
    itemCategory: "Diamond Jewellery",
    itemSubCategory: "Diamond Ladies Ring",
    byStyle: "",
    gender: "Ladies",
    stamp: "14",
    goldStampRate: 5700,
    tunch: 60,
    itemStock: 1,
    grossWeight: 3.87,
    lessWeight: 0.25,
    netWeight: 3.62,
    wastage: 0,
    fine: 2.17,
    diamondWeight: 1.25,
    coloredStoneWeight: 0,
    laborPercentage: 0,
    laborRate: 700,
    others: 0,
    totalLabor: 2534,
    totalDiamondCost: 35000,
    totalColoredStoneCost: 0,
    totalGoldCost: 20634,
    itemMRP: 55634,
    createdDate: "2025-04-03T09:23:24Z",
    coloredStonePresent: false,
    updatedDate: "2025-04-30T09:06:08Z",
    ownerId: "e980d9f8-5ed7-44cf-891b-7861fd227f54",
    publishDate: "2025-04-03T09:23:24Z",
    slug: createSlug("Dual-Ton Diamond Band")
  },
  {
    id: "058bde9c-3639-4b4d-a8d1-36155c74c11f",
    status: "PUBLISHED",
    tagNumber: "LR-NJ-6434",
    itemName: "Eye-Catching Fancy Ring",
    thumbnail: "/jewellery_images/jewellery3.jpeg",
    itemPhotos: [
      {
        title: "Eye-Catching Fancy Ring",
        src: "/jewellery_images/jewellery3.jpeg",
        type: "image"
      },
      {
        title: "Eye-Catching Fancy Ring Secondary",
        src: "/jewellery_images/jewellery1.jpeg",
        type: "image"
      }
    ],
    itemVideo: null,
    itemDescription: "A Diamond Unique Ring with Fancy Diamonds and Six Blue Oval-Shaped Colour Stones is a luxurious and eye-catching piece, designed to captivate with its rich colour palette and sophisticated craftsmanship.",
    itemCategory: "Diamond Jewellery",
    itemSubCategory: "Diamond Ladies Ring",
    byStyle: "",
    gender: "Ladies",
    stamp: "14",
    goldStampRate: 5550,
    tunch: 60,
    itemStock: 1,
    grossWeight: 6.04,
    lessWeight: 0.71,
    netWeight: 5.33,
    wastage: 0,
    fine: 3.2,
    diamondWeight: 1.18,
    coloredStoneWeight: 2.35,
    laborPercentage: 0,
    laborRate: 700.01,
    others: 0,
    totalLabor: 3733.85,
    totalDiamondCost: 76700,
    totalColoredStoneCost: 1175,
    totalGoldCost: 29581.5,
    itemMRP: 107456.5,
    createdDate: "2025-03-25T10:35:00Z",
    coloredStonePresent: true,
    updatedDate: "2025-04-01T10:24:14Z",
    ownerId: "e980d9f8-5ed7-44cf-891b-7861fd227f54",
    publishDate: "2025-03-25T10:35:00Z",
    slug: createSlug("Eye-Catching Fancy Ring")
  }
];
