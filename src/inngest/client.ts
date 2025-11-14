import { realtimeMiddleware } from "@inngest/realtime/middleware";
import { Inngest } from "inngest";

import appConfig from "@/config/app.config";

export const inngest = new Inngest({
  id: appConfig.name,
  middleware: [realtimeMiddleware()],
});
