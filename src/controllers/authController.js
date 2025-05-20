import { loginUser, signupUser } from '../services/authService.js';

export async function loginController(req, res) {
    try {
        const result = await loginUser(req.body);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

export async function signupController(req, res) {
    try {
        const result = await signupUser(req.body);

        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
