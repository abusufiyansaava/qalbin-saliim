// src/sanity/schemaTypes/index.ts
import { cause } from './cause'
import { galleryImage } from './galleryImage'
import { teamMember } from './teamMember'
import { post } from './post'
import { transformation } from './transformation'
import { videoTestimonial } from './videoTestimonial'
import { report } from './report' // ✅ Added
import { homeSettings } from './homeSettings'
import { partner } from './partner'
import { volunteerApplication } from './volunteerApplication'
import { newsletterSubscription } from './newsletterSubscription'
import { faq } from './faq'

import { bankDonation } from './bankDonation'
export const schemaTypes = [cause, galleryImage, teamMember, post, transformation, videoTestimonial, report, homeSettings, partner, volunteerApplication, newsletterSubscription, faq, bankDonation]
