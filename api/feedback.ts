import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { stars, message } = req.body as { stars: number; message: string };

    if (!stars || !message) {
        return res.status(400).json({ error: 'Missing stars or message' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: 'ericrwblanchette@gmail.com',
            subject: `Free My Query Feedback — ${stars}/5 stars`,
            text: `Rating: ${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}\n\n${message}`
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ error: 'Failed to send feedback' });
    }
}