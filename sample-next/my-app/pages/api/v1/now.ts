import type { NextApiRequest, NextApiResponse } from 'next';

type TimeDetailType = {
    id: string;
    name: number;
};

const start = Date.now();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const response: TimeDetailType[] = [
        {
            id: "now",
            name: start
        }
    ];

    res.status(200).json(response);
}