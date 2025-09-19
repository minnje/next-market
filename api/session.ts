import { sessionOptions } from "@/lib/sessionOptions";
import { SessionOptions } from "iron-session";

export default withIronSessionApiRoute((req, res) => {
     const session = req.session;
     res.status(200).json({ user: session.userId ? session : null });
}, sessionOptions);
function withIronSessionApiRoute(
     arg0: (req: any, res: any) => void,
     sessionOptions: SessionOptions
) {
     throw new Error("Function not implemented.");
}
