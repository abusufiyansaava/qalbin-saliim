// src/sanity/schemaTypes/bankDonation.ts
import { defineField, defineType } from 'sanity'

export const bankDonation = defineType({
  name: 'bankDonation',
  title: 'Bank Donation Record',
  type: 'document',
  fields: [
    defineField({ name: 'donorName', title: 'Donor Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'donorEmail', title: 'Donor Email', type: 'string', validation: Rule => Rule.required().email() }),
    defineField({ name: 'amount', title: 'Amount (USD)', type: 'number', validation: Rule => Rule.required().min(1) }),
    defineField({ name: 'currency', title: 'Currency', type: 'string', options: { list: ['USD', 'UGX'] }, initialValue: 'USD' }),
    defineField({ name: 'bankName', title: 'Bank Used', type: 'string', options: { list: ['Stanbic Bank', 'Centenary Bank', 'DFCU Bank', 'MTN Mobile Money', 'Airtel Money', 'Other'] } }),
    defineField({ name: 'transactionRef', title: 'Transaction Reference', type: 'string', description: 'e.g., MTN Txn ID, Bank Transfer Ref' }),
    defineField({ name: 'causeId', title: 'Cause (Optional)', type: 'reference', to: [{ type: 'cause' }] }),
    defineField({ name: 'message', title: 'Message (Optional)', type: 'text', rows: 3 }),
    defineField({ name: 'proofOfPayment', title: 'Proof of Payment (Optional)', type: 'image' }),
    defineField({ name: 'submittedAt', title: 'Submission Date', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'status', title: 'Verification Status', type: 'string', options: { list: ['Pending', 'Verified', 'Received', 'Issue'] }, initialValue: 'Pending' }),
    defineField({ name: 'notes', title: 'Admin Notes', type: 'text', rows: 3 }),
  ],
  orderings: [{ title: 'Newest First', name: 'dateDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }],
})