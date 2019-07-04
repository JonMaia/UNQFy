import { Request, Response } from "express";

export class MonitorController {

    private static enabled: boolean = true;

    public static activate(req: Request, res: Response): Response {
        MonitorController.enabled = true;
        return res.status(200).json();
    }

    public static desactivate(req: Request, res: Response): Response {
        MonitorController.enabled = false;
        return res.status(200).json();
    }

    public static status(req: Request, res: Response): Response {
        return res.status(200).json({
            service: 'Monitor',
            status: (MonitorController.enabled ? 'Online' : 'Offline')
        });
    }
}